import { Shape } from "./base/shape";
import Size from "./size";
declare var CanvasSize: Size;
interface RenderConfigInterface {
    grivity?: number;
}
declare var RenderConfig: RenderConfigInterface;
type animationFinishedCallback = () => void;
declare class CanvasRender {
    private paint;
    private canvasSize;
    private animationState;
    private onFinished;
    private shapeList;
    private hasBeenDispose;
    private revoveryShape;
    private fpsUtil;
    private displayFPS;
    constructor();
    /**
     * @description 初始化渲染器时必须传入 画笔
     * @param paint
     * @param size
     * @param params
     */
    init(paint: CanvasRenderingContext2D | UniNamespace.CanvasContext, size?: {
        width: number;
        height: number;
    }, option?: {
        onFinished?: animationFinishedCallback;
        displayFps?: boolean;
        gravity?: number;
    }): void;
    private update;
    private animationFinished;
    /**
      * @description 回收彩纸对象
      */
    recovery(): void;
    /**
     * @description 在回收栈里面拿重复利用对象
     * @param {number} count //拿多少个
     */
    recover(count: number): Promise<Array<Shape>>;
    /**
     * @description 销毁渲染器，释放所有内存，无法再继续使用
     * @returns void
     */
    dispose(): void;
    /**
     * @description 运行
     * @returns
     */
    run(): void;
    add(shapes: Array<Shape>): void;
}
export { CanvasSize, RenderConfig, };
export default CanvasRender;
//# sourceMappingURL=renderer.d.ts.map