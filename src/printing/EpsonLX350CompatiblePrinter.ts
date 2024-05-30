import { BitmapDensity, Printer, Image } from "@node-escpos/core";
import { Adapter } from "@node-escpos/adapter";

export interface IEpsonLX350CompatiblePrinter extends Printer<[]> {
    initialise(): void;
    imageWithLineSpacing(image: Image, density?: BitmapDensity | undefined): Promise<void>;
}

export class EpsonLX350CompatiblePrinter extends Printer<[]> implements IEpsonLX350CompatiblePrinter {
    constructor(adapter: Adapter<[]>) {
        super(adapter, { encoding: "GB18030" });
        this.initialise();
    }

    public initialise() {
        this.buffer.write("\x1B@");
        return this;
    }

    public async imageWithLineSpacing(image: Image, density?: BitmapDensity | undefined) {
        const defaultLineSpace = this.lineSpace;

        const lineSpace24 = (n?: number | null) => {
            this.buffer.write("\x1B\x33");
            this.buffer.writeUInt8(24);
            return this;
        }

        this.lineSpace = lineSpace24;
        await this.image(image, density);

        this.lineSpace = defaultLineSpace;
    }
}