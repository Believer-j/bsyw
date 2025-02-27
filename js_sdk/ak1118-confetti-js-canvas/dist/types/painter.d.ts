declare class Painter {
    paint: CanvasRenderingContext2D | UniNamespace.CanvasContext;
    constructor(paint: CanvasRenderingContext2D | UniNamespace.CanvasContext);
    set fillStyle(style: string);
    set lineWidth(width: number);
    set strokeStyle(style: string);
    draw(): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    fillRect(x: number, y: number, w: number, h: number): void;
    stroke(): void;
    clearRect(x: number, y: number, w: number, h: number): void;
    save(): void;
    rotate(angle: number): void;
    beginPath(): void;
    closePath(): void;
    restore(): void;
    translate(x: number, y: number): void;
    fill(): void;
    arc(x: number, y: number, radius: number, start: number, end: number): void;
    scale(a: number, b: number): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    update(): void;
}
export default Painter;
//# sourceMappingURL=painter.d.ts.map