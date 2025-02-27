import { Point, Shape } from "./base/shape";
declare class Matrix3 {
    static transformTo2D(point: Point, A: Point, position: any): {
        x: any;
        y: any;
    };
    static rotateX(point: Point, angle: number): [x: number, y: number, z: number];
    static rotateZ(point: Point, angle: number): [x: number, y: number, z: number];
    static rotateY(point: Point, angle: number): [x: number, y: number, z: number];
}
declare class Matrix3All {
    static PI: number;
    static rotateX(shape: Shape, angle: number): void;
    static rotateY(shape: Shape, angle: number): void;
    static rotateZ(shape: Shape, angle: number): void;
}
export default Matrix3All;
export { Matrix3 };
//# sourceMappingURL=matrix3.d.ts.map