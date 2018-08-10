declare namespace BABYLON.GIFExporter {
	let worker: string;
	class GIFExporter {
		private _canvas: HTMLCanvasElement;
		private _delay: number;
		private _duration: number;
		private _width: number;
		private _height: number;
		private _worker: Worker;
		private _holdingCanvas: HTMLCanvasElement;
		private _holdingCanvas2D: CanvasRenderingContext2D;
		private _resizeCanvas: HTMLCanvasElement;
		private _resizeCanvas2D: CanvasRenderingContext2D;

		constructor(engine: BABYLON.Engine, options?: { delay?: number; duration?: number });

		public start(): Promise<number[]>;

		public stop(): void;

		public cancel(): void;

		public download(filename = 'canvasGIF.gif'): Promise<{}>;

		private getFrame(): Promise<ArrayBuffer>;

		private init(): void;

		private canvasSetup(): void;

		private flipAndRotate(frame: Uint8Array): Promise<ArrayBuffer>;

		private resize(canvas: HTMLCanvasElement): void;

		private flip(resizeContext: CanvasRenderingContext2D, holdingCanvas: HTMLCanvasElement, resizeCanvas: HTMLCanvasElement): void;
	}
}
