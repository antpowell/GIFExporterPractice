"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
function GIFExporter(engine, options) {
    this._canvas = engine.getRenderingCanvas();
    this._delay = options.delay;
    this._duration = options.duration;
    this._width = this._canvas.width;
    this._height = this._canvas.height;
    // const url = URL.createObjectURL(new Blob([worker], { type: 'application/javascript' }));
    this._worker = new Worker('./gif.creator.service.ts');
    this.canvasSetup();
}
exports.default = GIFExporter;
GIFExporter.prototype.start = function () {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var intervalRef;
        var _this = this;
        return __generator(this, function (_a) {
            this.init();
            console.log('record canvas');
            intervalRef = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                var frame, newFrame, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getFrame()];
                        case 1:
                            frame = _a.sent();
                            return [4 /*yield*/, this.flipAndRotate(new Uint8Array(frame))];
                        case 2:
                            newFrame = _a.sent();
                            message = {
                                job: 'collectFrames',
                                params: {
                                    frame: newFrame,
                                },
                            };
                            this._worker.postMessage(message, [message.params.frame]);
                            return [2 /*return*/];
                    }
                });
            }); }, this._delay);
            setTimeout(function () {
                clearInterval(intervalRef);
                var message = {
                    job: 'createGIF',
                    params: { width: _this._resizeCanvas.width, height: _this._resizeCanvas.height },
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
    }); });
};
GIFExporter.prototype.stop = function () { };
GIFExporter.prototype.cancle = function () { };
GIFExporter.prototype.download = function (filename) {
    if (filename === void 0) { filename = 'canvasGIF.gif'; }
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var gif, url, download;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.start()];
                case 1:
                    gif = _a.sent();
                    url = URL.createObjectURL(new Blob([new Uint8Array(gif)], {
                        type: 'image/gif',
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
    }); });
};
GIFExporter.prototype.getFrame = function () {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var gl, pixels;
        return __generator(this, function (_a) {
            gl = this._canvas.getContext('webgl2') || this._canvas.getContext('webgl');
            pixels = new Uint8Array(this._width * this._height * 4);
            gl.readPixels(0, 0, this._width, this._height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            resolve(pixels.buffer);
            return [2 /*return*/];
        });
    }); });
};
GIFExporter.prototype.canvasSetup = function () {
    _this._holdingCanvas = document.createElement('canvas');
    _this._holdingCanvas2D = _this._holdingCanvas.getContext('2d');
    _this._holdingCanvas.width = _this._width;
    _this._holdingCanvas.height = _this._height;
    _this._resizeCanvas = document.createElement('canvas');
    _this._resizeCanvas2D = _this._resizeCanvas.getContext('2d');
};
GIFExporter.prototype.flipAndRotate = function (frame) {
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
GIFExporter.prototype.resize = function () {
    return new Promise(function (resolve, rejct) {
        var baseSize = 256;
        var imageAspectRatio = _this._width / _this._height;
        if (imageAspectRatio < 1) {
            _this._canvas.width = baseSize * imageAspectRatio;
            _this._canvas.height = baseSize;
        }
        else if (imageAspectRatio > 1) {
            _this._canvas.width = baseSize;
            _this._canvas.height = baseSize / imageAspectRatio;
        }
        else {
            _this._canvas.width = baseSize;
            _this._canvas.height = baseSize;
        }
        _this._canvas.width = Math.max(_this._canvas.width, 1);
        _this._canvas.height = Math.max(_this._canvas.height, 1);
        resolve();
    });
};
GIFExporter.prototype.flip = function (resizeContext, holdingCanvas, resizeCanvas) {
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
