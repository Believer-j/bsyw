import { Shape } from "./base/shape";
declare class Confetti {
    private render;
    constructor(options: {
        paint: CanvasRenderingContext2D | UniNamespace.CanvasContext;
        canvasWidth: number;
        canvasHeight: number;
        displayFps?: boolean;
    });
    run(options?: {
        x?: number;
        y?: number;
        shapeTypes?: Array<number | Shape>;
        radius?: number;
        clampforce?: [min: number, max: number];
        count?: number;
    }): void;
}
export default Confetti;
//# sourceMappingURL=confetti.d.ts.map