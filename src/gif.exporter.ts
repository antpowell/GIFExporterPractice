var ENV_WORKER;
const GIFExporter = (engine: BABYLON.Engine, options?: { delay?: number; duration?: number }) => {
	console.log('inside GIF Exporter');
	let _canvas: HTMLCanvasElement;
	let _delay: number;
	let _duration: number;
	let _width: number;
	let _height: number;
	let _worker: Worker;
	let _holdingCanvas: HTMLCanvasElement;
	let _holdingCanvas2D: CanvasRenderingContext2D;
	let _resizeCanvas: HTMLCanvasElement;
	let _resizeCanvas2D: CanvasRenderingContext2D;
	let worker = 'gif.creator.service.ts';

	const canvasSetup = () => {
		_holdingCanvas = document.createElement('canvas');
		_holdingCanvas2D = _holdingCanvas.getContext('2d');
		_holdingCanvas.width = _width;
		_holdingCanvas.height = _height;
		_resizeCanvas = document.createElement('canvas');
		_resizeCanvas2D = _resizeCanvas.getContext('2d');
	};
	canvasSetup();

	const init = () => {
		_width = _canvas.width;
		_height = _canvas.height;
		const url = URL.createObjectURL(new Blob([ENV_WORKER], { type: 'application/javascript' }));
		_worker = new Worker('./gif.creator.service.ts');
		canvasSetup();
	};

	const start = (): Promise<number[]> => {
		return new Promise(async (resolve, reject) => {
			init();
			console.log('record canvas');
			let intervalRef = setInterval(async () => {
				const frame = await getFrame();
				const newFrame = await flipAndRotate(new Uint8Array(frame));

				const message = {
					job: 'collectFrames',
					params: {
						frame: newFrame,
					},
				};
				_worker.postMessage(message, [message.params.frame]);
			}, _delay);
			setTimeout(() => {
				clearInterval(intervalRef);
				const message = {
					job: 'createGIF',
					params: { width: _resizeCanvas.width, height: _resizeCanvas.height },
				};
				_worker.postMessage(message);
				_worker.onmessage = ({ data }: { data: number[] }) => {
					console.log('complete', data);
					resolve(data);
				};
			}, _duration);
		});
	};
	const stop = (): void => {};
	const cancel = (): void => {};
	const download = (GIFExporter.prototype.download = (filename = 'canvasGIF.gif') => {
		return new Promise(async (resolve, reject) => {
			const gif = await start();
			const url = URL.createObjectURL(
				new Blob([new Uint8Array(gif)], {
					type: 'image/gif',
				})
			);
			const download: HTMLAnchorElement = document.getElementById('download') as HTMLAnchorElement;
			document.body.appendChild(download);
			download.target = '_blank';
			download.style.display = 'none';
			download.href = url;
			download.download = filename;
			download.click();
			download.remove();
			_worker.terminate();

			resolve();
		});
	});
	const getFrame = (): Promise<ArrayBuffer> => {
		return new Promise(async (resolve, reject) => {
			const gl = _canvas.getContext('webgl2') || _canvas.getContext('webgl');
			let pixels = new Uint8Array(_width * _height * 4);
			gl.readPixels(0, 0, _width, _height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

			resolve(pixels.buffer);
		});
	};

	const flipAndRotate = (frame: Uint8Array): Promise<ArrayBuffer> => {
		return new Promise((resolve, reject) => {
			const imageData = _holdingCanvas2D.createImageData(_width, _height);
			imageData.data.set(frame);
			_holdingCanvas2D.putImageData(imageData, 0, 0);
			resize(_resizeCanvas);
			flip(_resizeCanvas2D, _holdingCanvas, _resizeCanvas);
			const data = _resizeCanvas2D.getImageData(0, 0, _resizeCanvas.width, _resizeCanvas.height).data;

			resolve(data.buffer);
		});
	};

	const resize = (canvas: HTMLCanvasElement) => {
		return new Promise((resolve, rejct) => {
			const baseSize = 256;
			const imageAspectRatio = _width / _height;
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

	const flip = (resizeContext: CanvasRenderingContext2D, holdingCanvas: HTMLCanvasElement, resizeCanvas: HTMLCanvasElement) => {
		return new Promise((resolve, reject) => {
			// Scale and draw to flip Y to reorient readPixels.
			resizeContext.globalCompositeOperation = 'copy';
			resizeContext.scale(1, -1); // Y flip
			resizeContext.translate(0, -resizeCanvas.height); // so we can draw at 0,0
			resizeContext.drawImage(holdingCanvas, 0, 0, _width, _height, 0, 0, resizeCanvas.width, resizeCanvas.height);
			resizeContext.setTransform(1, 0, 0, 1, 0, 0);
			resizeContext.globalCompositeOperation = 'source-over';
		});
	};
	return GIFExporter;
};
