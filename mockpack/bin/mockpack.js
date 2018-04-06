#! /usr/bin/env node

const path = require('path');
const fs = require('fs');

const root = process.cwd(); //取得当前的工作目录(命令行执行命令时的所处位置)
let configPath = path.join(root,'mockpack.config.js');
let config = require(configPath); //module.exports

const Compiler = require('../lib/Compiler.js');
let compiler = new Compiler(config);
// 发射entryOption事件
compiler.hooks.entryOption.call(config); // compiler.hooks.entryOption.tap();//监听
compiler.run();
