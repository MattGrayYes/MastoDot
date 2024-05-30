import { initialiseFileSystem } from './util';
import { processFiles } from './printing/processFiles';
import { connectToPrinter } from './printing/connectToPrinter';

console.log("-----------------------------");
console.log("🖨️    It's printing time!    ");
console.log("-----------------------------");

initialiseFileSystem();

const { device, printer } = await connectToPrinter();

await printer.text("MastoPrint Started").flush();

async function startProcessing() {
    try {
        await processFiles(printer);
    } catch (e) {
        console.error("Error processing files: ", e);
    } finally {
        setTimeout(startProcessing, 5000);
    }
}

startProcessing();

process.on('SIGINT', () => {
    printer?.feed().close();
    device?.close();
    process.exit();
});
