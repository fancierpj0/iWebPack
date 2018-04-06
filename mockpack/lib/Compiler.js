const {SyncHook} = require('tapable');
const path = require('path');
const fs = require('fs');
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
const ejs = require('ejs');

class Compiler{
  constructor(options){
    this.options = options;
    this.hooks = {
      entryOption:new SyncHook(['config'])
      ,afterPlugins:new SyncHook(['config'])
      ,run:new SyncHook(['config'])
      ,compile:new SyncHook(['config'])
      ,afterCompile:new SyncHook(['config'])
      ,emit:new SyncHook(['config'])
      ,done:new SyncHook(['config'])
    };

    let plugins = options.plugins;
    if(plugins&&plugins.length>0){
      plugins.forEach(plugin=>{
        plugin.apply(this);
      });
    }
    // 触发插件挂载完成事件
    this.hooks.afterPlugins.call(this);
  }
  // 找到入口文件进行编译
  run(){
    this.hooks.run.call(this);
    let {entry,output:{path:dist,filename},module:{rules},resolveLoaders:{modules:loaderPath}} = this.options; //module.exports
    let root = process.cwd();
    let entryPath = path.join(root,entry);
    let modules = {}; //存放着所有的模块
    this.hooks.compile.call(this);
    let entryId;
    parseModule(entryPath,true);
    this.hooks.afterCompile.call(this);

    let bundle = ejs.compile(fs.readFileSync(path.join(__dirname,'main.ejs'),'utf8'))({modules,entryId});
    this.hooks.emit.call(this);
    fs.writeFileSync(path.join(dist,filename),bundle);

    function parseModule(modulePath,isEntry) {
      // 第一次进入是取得入口文件的文件内容，后面递归时获取的是入口文件所依赖的内容
      let source = fs.readFileSync(modulePath,'utf8');

      /* ===loader Start=== */
      for(let i=0;i<rules.length;++i){
        let rule = rules[i];
        if(rule.test.test(modulePath)){
          let loaders = rule.use||rule.loader;
          if(loaders instanceof Array){
            for(let j=loaders.length-1;j>=0;--j){
              let loader = loaders[j]; //less-loader
              loader = require(path.join(root,loaderPath,loader));
              source = loader(source) //less-loader => css
            }
          }else if(typeof loaders == 'string'){

          }else if(typeof loaders == 'object'){

          }
        }
      }
      /* ===loader End=== */

      // 第一次取得src入口的相对路径（entry的） 这里为 src/index.js(注意前面没有./)
      let srcPath = path.relative(root,modulePath);
      let result = parse(source,path.dirname(srcPath)/* src */); //会返回依赖的模块的相对路径以及文件内容，这部分稍后展开

      /* ===parseModule的最终目的=== */
      modules['./'+srcPath] = result.source;  //之所以是./src的形式是为了迎合后面模板进行拼接
      /* ===End=== */

      if(isEntry)entryId = './'+srcPath; //如果是入口文件 就将其相对路径作为entryId以供模板拼接使用

      //看是否有依赖需要递归解析
      let requires = result.requires;
      if(requires&&requires.length>0){
        requires.forEach(require=>parseModule(path.join(root,require)));
      }
    }

    // 遍历抽象语法树
    //1.找到此模块依赖的模块
    //2.替换掉老的加载路径
    function parse(source,srcPath){
      let ast = esprima.parse(source);
      let requires = [];
      estraverse.replace(ast,{
        enter(node,parent){
          if(node.type == 'CallExpression'&&node.callee.name == 'require'){
            let name = node.arguments[0].value; //假设此时拿到的是原模块路径 ./a/a，我们想要转换成./src/a/a.js
            name += (name.lastIndexOf('.')>0?'':'.js'); //没有后缀则加上后缀
            let moduleId = './' + path.join(srcPath,name); // ./src/a/a.js
            requires.push(moduleId); //moduleId即为被依赖的文件的相对路径
            node.arguments = [{type:'Literal',value:moduleId}];
            return node; //需要返回node才会替换
          }
        }
      });
      source = escodegen.generate(ast); //将ast转换回源码
      return {requires,source}; //返回依赖的模块和源码
    }

  }
}
module.exports = Compiler;