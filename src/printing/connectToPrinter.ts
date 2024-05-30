import USB from "@node-escpos/usb-adapter";
import { EpsonLX350CompatiblePrinter, IEpsonLX350CompatiblePrinter } from './EpsonLX350CompatiblePrinter';
import DebuggingPrinter from './DebuggingPrinter';
import USBAdapter from '@node-escpos/usb-adapter';

export async function connectToPrinter() {
    let device: USBAdapter | null;
    let printer: IEpsonLX350CompatiblePrinter;

    try {
        device = await openUsbDevice();
        printer = new EpsonLX350CompatiblePrinter(device);
    } catch (e) {
        console.error(`Error opening device because '${e.message}', using debugging stub...`);
        device = null;
        printer = new DebuggingPrinter();
    }

    return { device, printer };
}

export async function openUsbDevice(): Promise<USB> {
    const device = new USB();

    return await new Promise((resolve, reject) => {
        device.open((err) => {
            if (err) {
                console.error("Error opening device:", err);
                reject(err);
                return;
            }

            console.log("Device opened successfully.");
            resolve(device);
        });
    });
}