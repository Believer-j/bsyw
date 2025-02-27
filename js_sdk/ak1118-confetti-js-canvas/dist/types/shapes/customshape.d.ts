import { Shape } from "../base/shape";
import Vector from "../vector";
declare class CustomShape extends Shape {
    private _originPoints;
    scale: number;
    constructor(params: {
        points: Array<[x: number, y: number]>;
        scale?: number;
        position?: Vector;
        vector?: Vector;
    });
    get originPoints(): [x: number, y: number][];
    createPosints(points?: Array<[x: number, y: number]>): void;
}
export default CustomShape;
//# sourceMappingURL=customshape.d.ts.map