// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src\\gif.exporter.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var GIFExporter = /** @class */function () {
    function GIFExporter(engine, options) {
        this.worker = 'gif.creator.service.ts';
        this._canvas = engine.getRenderingCanvas();
        this._delay = options.delay;
        this._duration = options.duration;
    }
    GIFExporter.prototype.start = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return __awaiter(_this, void 0, void 0, function () {
                var intervalRef;
                var _this = this;
                return __generator(this, function (_a) {
                    this.init();
                    console.log('record canvas');
                    intervalRef = setInterval(function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            var frame, newFrame, message;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4 /*yield*/, this.getFrame()];
                                    case 1:
                                        frame = _a.sent();
                                        return [4 /*yield*/, this.flipAndRotate(new Uint8Array(frame))];
                                    case 2:
                                        newFrame = _a.sent();
                                        message = {
                                            job: 'collectFrames',
                                            params: {
                                                frame: newFrame
                                            }
                                        };
                                        this._worker.postMessage(message, [message.params.frame]);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    }, this._delay);
                    setTimeout(function () {
                        clearInterval(intervalRef);
                        var message = {
                            job: 'createGIF',
                            params: { width: _this._resizeCanvas.width, height: _this._resizeCanvas.height }
                        };
                        _this._worker.postMessage(message);
                        _this._worker.onmessage = function (_a) {
                            var data = _a.data;
                            console.log('complete', data);
                            resolve(data);
                        };
                    }, this._duration);
                    return [2 /*return*/];
                });
            });
        });
    };
    GIFExporter.prototype.stop = function () {};
    GIFExporter.prototype.cancel = function () {};
    GIFExporter.prototype.download = function (filename) {
        var _this = this;
        if (filename === void 0) {
            filename = 'canvasGIF.gif';
        }
        return new Promise(function (resolve, reject) {
            return __awaiter(_this, void 0, void 0, function () {
                var gif, url, download;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.start()];
                        case 1:
                            gif = _a.sent();
                            url = URL.createObjectURL(new Blob([new Uint8Array(gif)], {
                                type: 'image/gif'
                            }));
                            download = document.getElementById('download');
                            document.body.appendChild(download);
                            download.target = '_blank';
                            download.style.display = 'none';
                            download.href = url;
                            download.download = filename;
                            download.click();
                            download.remove();
                            this._worker.terminate();
                            resolve();
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    GIFExporter.prototype.getFrame = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return __awaiter(_this, void 0, void 0, function () {
                var gl, pixels;
                return __generator(this, function (_a) {
                    gl = this._canvas.getContext('webgl2') || this._canvas.getContext('webgl');
                    pixels = new Uint8Array(this._width * this._height * 4);
                    gl.readPixels(0, 0, this._width, this._height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
                    resolve(pixels.buffer);
                    return [2 /*return*/];
                });
            });
        });
    };
    GIFExporter.prototype.init = function () {
        this._width = this._canvas.width;
        this._height = this._canvas.height;
        // const url = URL.createObjectURL(new Blob([worker], { type: 'application/javascript' }));
        this._worker = new Worker("/gif.creator.service.e5173224.js");
        this.canvasSetup();
    };
    GIFExporter.prototype.canvasSetup = function () {
        this._holdingCanvas = document.createElement('canvas');
        this._holdingCanvas2D = this._holdingCanvas.getContext('2d');
        this._holdingCanvas.width = this._width;
        this._holdingCanvas.height = this._height;
        this._resizeCanvas = document.createElement('canvas');
        this._resizeCanvas2D = this._resizeCanvas.getContext('2d');
    };
    GIFExporter.prototype.flipAndRotate = function (frame) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var imageData = _this._holdingCanvas2D.createImageData(_this._width, _this._height);
            imageData.data.set(frame);
            _this._holdingCanvas2D.putImageData(imageData, 0, 0);
            _this.resize(_this._resizeCanvas);
            _this.flip(_this._resizeCanvas2D, _this._holdingCanvas, _this._resizeCanvas);
            var data = _this._resizeCanvas2D.getImageData(0, 0, _this._resizeCanvas.width, _this._resizeCanvas.height).data;
            resolve(data.buffer);
        });
    };
    GIFExporter.prototype.resize = function (canvas) {
        var _this = this;
        return new Promise(function (resolve, rejct) {
            var baseSize = 256;
            var imageAspectRatio = _this._width / _this._height;
            if (imageAspectRatio < 1) {
                canvas.width = baseSize * imageAspectRatio;
                canvas.height = baseSize;
            } else if (imageAspectRatio > 1) {
                canvas.width = baseSize;
                canvas.height = baseSize / imageAspectRatio;
            } else {
                canvas.width = baseSize;
                canvas.height = baseSize;
            }
            canvas.width = Math.max(canvas.width, 1);
            canvas.height = Math.max(canvas.height, 1);
            resolve();
        });
    };
    GIFExporter.prototype.flip = function (resizeContext, holdingCanvas, resizeCanvas) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Scale and draw to flip Y to reorient readPixels.
            resizeContext.globalCompositeOperation = 'copy';
            resizeContext.scale(1, -1); // Y flip
            resizeContext.translate(0, -resizeCanvas.height); // so we can draw at 0,0
            resizeContext.drawImage(holdingCanvas, 0, 0, _this._width, _this._height, 0, 0, resizeCanvas.width, resizeCanvas.height);
            resizeContext.setTransform(1, 0, 0, 1, 0, 0);
            resizeContext.globalCompositeOperation = 'source-over';
        });
    };
    return GIFExporter;
}();
exports.GIFExporter = GIFExporter;
},{"./gif.creator.service.ts":[["gif.creator.service.e5173224.js","src\\gif.creator.service.ts"],"gif.creator.service.e5173224.map","src\\gif.creator.service.ts"]}],"src\\game.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var gif_exporter_1 = require("./gif.exporter");
var Game = /** @class */function () {
    function Game(canvasElement) {
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true, {
            preserveDrawingBuffer: true
        });
        this._gifExporter = new gif_exporter_1.GIFExporter(this._engine, {
            delay: 60,
            duration: 5000
        });
    }
    Game.prototype.createScene = function () {
        // Create a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._engine);
        // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
        this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this._scene);
        // Target the camera to scene origin.
        this._camera.setTarget(BABYLON.Vector3.Zero());
        // Attach the camera to the canvas.
        this._camera.attachControl(this._canvas, false);
        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
        // Create a built-in "sphere" shape; with 16 segments and diameter of 2.
        var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {
            segments: 16,
            diameter: 2
        }, this._scene);
        // Move the sphere upward 1/2 of its height.
        sphere.position.y = 1;
        // Create a built-in "ground" shape.
        var ground = BABYLON.MeshBuilder.CreateGround('ground', {
            width: 6,
            height: 6,
            subdivisions: 2
        }, this._scene);
    };
    Game.prototype.doRender = function () {
        var _this = this;
        // Run the render loop.
        this._engine.runRenderLoop(function () {
            _this._scene.render();
        });
        // The canvas/window resize event handler.
        window.addEventListener('resize', function () {
            _this._engine.resize();
        });
    };
    Game.prototype.downloadGIF = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this._gifExporter.download()];
                        case 1:
                            _a.sent();
                            resolve();
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    return Game;
}();
exports.Game = Game;
window.addEventListener('DOMContentLoaded', function () {
    var recordBtn = document.getElementById('recordBtn');
    var stopBtn = document.getElementById('recStopBtn');
    // Setup GIF generator
    // Create the game using the 'renderCanvas'.
    var game = new Game('renderCanvas');
    // Create the scene.
    game.createScene();
    // Start render loop.
    game.doRender();
    recordBtn.addEventListener('click', function () {
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        recordBtn.disabled = true;
                        return [4 /*yield*/, game.downloadGIF()];
                    case 1:
                        _a.sent();
                        recordBtn.disabled = false;
                        return [2 /*return*/];
                }
            });
        });
    });
});
},{"./gif.exporter":"src\\gif.exporter.ts"}],"node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '52633' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","src\\game.ts"], null)
//# sourceMappingURL=/game.afa6cc3c.map