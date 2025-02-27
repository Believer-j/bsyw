import { Shape } from "./base/shape";
import CanvasRender from "./renderer";
declare class ConfettiEjector {
    shapeTypes: Array<number | Shape>;
    canvasRender: CanvasRender;
    PI: number;
    count: number;
    limitAngle: [limitx: number, limity: number];
    constructor(canvasRender: CanvasRender, params?: {
        limitAngle?: [limitx: number, limity: number];
        count?: number;
        shapeTypes?: Array<number | Shape>;
        colors?: Array<string | Array<number>>;
    });
    getRandomClamp([min, max]: [any, any]): any;
    create(params: {
        x: number;
        y: number;
        clampforce: [min: number, max: number];
        radius: number;
    }): Promise<Shape[]>;
    fire(_shapes: any): Promise<void>;
}
export default ConfettiEjector;
//# sourceMappingURL=confettiEjector.d.ts.map