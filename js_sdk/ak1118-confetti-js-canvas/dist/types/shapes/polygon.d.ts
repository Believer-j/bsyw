import { Shape } from "../base/shape";
import Vector from "../vector";
declare class Polygon extends Shape {
    private size;
    constructor(params: {
        size: Size;
        position: Vector;
        count: number;
        vector: Vector;
    });
    createPosints(count: number): void;
}
export default Polygon;
//# sourceMappingURL=polygon.d.ts.map