class EntryOptionPlugin{
  apply(compiler){
    compiler.hooks.entryOption.tap('EntryOptionPlugin',function(options){
      console.log('参数解析完毕');
    })
  }
}
module.exports = EntryOptionPlugin;