const path = require('path');
const entryOptionPlugin = require('./src/plugins/entry-option-plugin.js');

module.exports = {
  entry:'./src/index.js'
  ,output:{
    path:path.resolve('dist')
    ,filename:'bundle.js'
    , publicPath: 'http://img.zhufengpeixun.cn'
  }
  , resolveLoaders: {
    modules:'./src/loaders'
  }
  ,module:{
    rules:[
      {
        test:/\.less$/
        ,loader:['style-loader','less-loader']
      }
    ]
  }
  ,plugins:[
    new entryOptionPlugin()
  ]
}