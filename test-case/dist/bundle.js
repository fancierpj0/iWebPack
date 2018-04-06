/******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  /******/
  /******/ 	// The require function
  /******/ 	function require(moduleId) {
    /******/
    /******/ 		// Check if module is in cache
    /******/ 		if(installedModules[moduleId]) {
      /******/ 			return installedModules[moduleId].exports;
      /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
      /******/ 			i: moduleId,
      /******/ 			l: false,
      /******/ 			exports: {}
      /******/ 		};
    /******/
    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, require);
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.l = true;
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	require.m = modules;
  /******/
  /******/ 	// expose the module cache
  /******/ 	require.c = installedModules;
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	require.d = function(exports, name, getter) {
    /******/ 		if(!require.o(exports, name)) {
      /******/ 			Object.defineProperty(exports, name, {
        /******/ 				configurable: false,
        /******/ 				enumerable: true,
        /******/ 				get: getter
        /******/ 			});
      /******/ 		}
    /******/ 	};
  /******/
  /******/ 	// define __esModule on exports
  /******/ 	require.r = function(exports) {
    /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    /******/ 	};
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	require.n = function(module) {
    /******/ 		var getter = module && module.__esModule ?
      /******/ 			function getDefault() { return module['default']; } :
      /******/ 			function getModuleExports() { return module; };
    /******/ 		require.d(getter, 'a', getter);
    /******/ 		return getter;
    /******/ 	};
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	require.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	require.p = "";
  /******/
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return require(require.s = "./src\index.js");
  /******/ })
/************************************************************************/
/******/ ({
  
      /***/ "./src\index.js":
      /***/ (function(module, exports, require) {

        eval(`let msg = require('./src\\a\\a.js');
require('./src\\index.less');
alert(msg);`);

        /***/ }),
    
      /***/ "./src\a\a.js":
      /***/ (function(module, exports, require) {

        eval(`let a = require('./src\\a\\b.js');
module.exports = a;`);

        /***/ }),
    
      /***/ "./src\a\b.js":
      /***/ (function(module, exports, require) {

        eval(`module.exports = '恭喜你\uFF0C在死磕的路上成功1步\uFF01';`);

        /***/ }),
    
      /***/ "./src\index.less":
      /***/ (function(module, exports, require) {

        eval(`let style = document.createElement('style');
style.innerHTML = 'body {\\n  color: red;\\n}\\n';
document.head.appendChild(style);`);

        /***/ }),
    
});