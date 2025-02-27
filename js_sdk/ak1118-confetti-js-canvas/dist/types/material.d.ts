import Painter from "./painter";
import { Point, Shape } from "./base/shape";
import Vector from "./vector";
declare class Material {
    A: Point;
    points: Array<Point>;
    _color: Array<number>;
    _color_key: number;
    opacity: number;
    constructor(points: Array<Point>);
    update(paint: Painter, position: Vector, shape: Shape): void;
    draw(paint: Painter, position: Vector): void;
}
declare class Styles {
    static _colors: Array<Array<number>>;
    /**
     * @param {Array<String|Array>} colors
     * @description 自定义颜色转换
     */
    static setColors(colors: Array<Array<number> | string>): void;
    static get RandomColor(): {
        key: number;
        color: number[];
    };
    static rgba(color: Array<number>): string;
}
export { Styles, };
export default Material;
//# sourceMappingURL=material.d.ts.map