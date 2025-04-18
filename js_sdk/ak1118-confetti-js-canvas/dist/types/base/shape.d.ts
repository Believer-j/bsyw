import Painter from "../painter";
import Material from "../material";
import Vector from "../vector";
declare class Point extends Vector {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number);
    setPoint(point: [x: number, y: number, z: number]): void;
    toArray(): Array<number>;
}
/**
 * 纸屑类基类
 */
declare abstract class Shape {
    points: Array<Point>;
    material: Material;
    position: Vector;
    vector: Vector;
    private _alive;
    private gravity;
    get alive(): boolean;
    relive(): void;
    disable(): void;
    update(paint: Painter): void;
    abstract createPosints(value: any): void;
    move(): void;
    reset(reset: {
        position: Vector;
        vector: Vector;
    }): void;
}
export { Shape, Point, };
//# sourceMappingURL=shape.d.ts.map