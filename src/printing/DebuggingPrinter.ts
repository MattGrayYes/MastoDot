import Printer, { Image, BitmapDensity, PrinterOptions, PrinterModel, CustomTableOptions, CustomTableItem, FeedControlSequence, Alignment, FontFamily, StyleString, BarcodeOptions, BarcodeType, HardwareCommand, QrImageOptions, QRLevel, RasterMode } from "@node-escpos/core";
import { MutableBuffer } from "mutable-buffer";
import { EpsonLX350CompatiblePrinter, IEpsonLX350CompatiblePrinter } from "./EpsonLX350CompatiblePrinter";

export default class DebuggingPrinter extends EpsonLX350CompatiblePrinter implements IEpsonLX350CompatiblePrinter {
    constructor() {
        super({} as any);
    }

    adapter;
    buffer: MutableBuffer = new MutableBuffer();
    options: PrinterOptions | undefined;
    encoding: string;
    width: number;
    _model: PrinterModel;

    model(model: PrinterModel): this {
        throw new Error("Method not implemented.");
    }
    setCharacterCodeTable(codeTable: number): this {
        throw new Error("Method not implemented.");
    }
    setCharset(charset?: number): this {
        throw new Error("Method not implemented.");
    }
    marginBottom(size: number): this {
        throw new Error("Method not implemented.");
    }
    marginLeft(size: number): this {
        throw new Error("Method not implemented.");
    }
    setMarginLeft(size: number): Printer<[]> {
        throw new Error("Method not implemented.");
    }
    marginRight(size: number): this {
        throw new Error("Method not implemented.");
    }
    print(content: string | Buffer): this {
        throw new Error("Method not implemented.");
    }
    println(content: string): this {
        console.log("DebuggingPrinter", content);
        return this;
    }
    newLine(count?: number): this {
        throw new Error("Method not implemented.");
    }
    text(content: string, encoding?: string): this {
        this.buffer.write(content);
        console.log("DebuggingPrinter", content);
        return this;
    }
    drawLine(character?: Buffer | string): this {
        throw new Error("Method not implemented.");
    }
    table(data: (string | number)[], encoding?: string): this {
        throw new Error("Method not implemented.");
    }
    tableCustom(data: CustomTableItem[], options?: CustomTableOptions): this {
        throw new Error("Method not implemented.");
    }
    pureText(content: string, encoding?: string): this {
        throw new Error("Method not implemented.");
    }
    encode(encoding: string): this {
        throw new Error("Method not implemented.");
    }
    feed(n?: number): this {
        return this;
    }
    control(ctrl: FeedControlSequence): this {
        throw new Error("Method not implemented.");
    }
    align(align: Alignment): this {
        throw new Error("Method not implemented.");
    }
    font(family: FontFamily): this {
        throw new Error("Method not implemented.");
    }
    _getStyle(string: StyleString): string;
    _getStyle(bold: boolean, italic: boolean, underline: boolean | 0 | 1 | 2): string;
    _getStyle(bold: unknown, italic?: unknown, underline?: unknown): string {
        throw new Error("Method not implemented.");
    }
    style(string: StyleString): this;
    style(bold: boolean, italic: boolean, underline: boolean | 0 | 1 | 2): this;
    style(bold: unknown, italic?: unknown, underline?: unknown): this {
        throw new Error("Method not implemented.");
    }
    size(width: number, height: number): this {
        throw new Error("Method not implemented.");
    }
    spacing(n?: number | null): this {
        throw new Error("Method not implemented.");
    }
    lineSpace(n?: number | null): this {
        throw new Error("Method not implemented.");
    }
    hardware(hw: HardwareCommand): this {
        throw new Error("Method not implemented.");
    }
    barcode(code: number | string, type: BarcodeType, options: BarcodeOptions): this {
        throw new Error("Method not implemented.");
    }
    qrcode(content: string, version?: number | undefined, level?: QRLevel | undefined, size?: number | undefined): this {
        throw new Error("Method not implemented.");
    }
    qrimage(text: string, options?: QrImageOptions): Promise<this> {
        throw new Error("Method not implemented.");
    }
    image(image: Image, density?: BitmapDensity): Promise<this> {
        throw new Error("Method not implemented.");
    }
    raster(image: Image, mode?: RasterMode): this {
        throw new Error("Method not implemented.");
    }
    cashdraw(pin?: 2 | 5): this {
        throw new Error("Method not implemented.");
    }
    beep(n: number, t: number): this {
        throw new Error("Method not implemented.");
    }
    flush(): Promise<this> {
        this.buffer.flush();
        return Promise.resolve(this);
    }
    cut(partial?: boolean, feed?: number): this {
        throw new Error("Method not implemented.");
    }
    close(): Promise<this> {
        return Promise.resolve(this);
    }
    color(color: 0 | 1): this {
        throw new Error("Method not implemented.");
    }
    setReverseColors(reverse: boolean): this {
        throw new Error("Method not implemented.");
    }
    raw(data: Buffer | string): this {
        throw new Error("Method not implemented.");
    }
    getStatus(StatusClass: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getStatuses(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    setTopLogoPrinting(kc1: number, kc2: number, align?: Alignment, space?: number): Printer<[]> {
        throw new Error("Method not implemented.");
    }
    setBottomLogoPrinting(kc1: number, kc2: number, align?: Alignment): Printer<[]> {
        throw new Error("Method not implemented.");
    }
    enableTopLogoPrinting(enable?: boolean): Printer<[]> {
        throw new Error("Method not implemented.");
    }
    enableBottomLogoPrinting(enable?: boolean): Printer<[]> {
        throw new Error("Method not implemented.");
    }
    starFullCut(): this {
        throw new Error("Method not implemented.");
    }
    emphasize(): this {
        throw new Error("Method not implemented.");
    }
    cancelEmphasize(): this {
        throw new Error("Method not implemented.");
    }
    eventNames(): (string | symbol)[] {
        throw new Error("Method not implemented.");
    }
    listeners<T extends string | symbol>(event: T): ((...args: any[]) => void)[] {
        throw new Error("Method not implemented.");
    }
    listenerCount(event: string | symbol): number {
        throw new Error("Method not implemented.");
    }
    emit<T extends string | symbol>(event: T, ...args: any[]): boolean {
        throw new Error("Method not implemented.");
    }
    on<T extends string | symbol>(event: T, fn: (...args: any[]) => void, context?: any): this {
        throw new Error("Method not implemented.");
    }
    addListener<T extends string | symbol>(event: T, fn: (...args: any[]) => void, context?: any): this {
        throw new Error("Method not implemented.");
    }
    once<T extends string | symbol>(event: T, fn: (...args: any[]) => void, context?: any): this {
        throw new Error("Method not implemented.");
    }
    removeListener<T extends string | symbol>(event: T, fn?: ((...args: any[]) => void) | undefined, context?: any, once?: boolean): this {
        throw new Error("Method not implemented.");
    }
    off<T extends string | symbol>(event: T, fn?: ((...args: any[]) => void) | undefined, context?: any, once?: boolean): this {
        throw new Error("Method not implemented.");
    }
    removeAllListeners(event?: string | symbol | undefined): this {
        throw new Error("Method not implemented.");
    }
}