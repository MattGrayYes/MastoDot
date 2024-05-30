import { Image } from "@node-escpos/core";
import { connectToPrinter } from "./printing/connectToPrinter";

console.log("It's printing time!");

const image = await Image.load("./blessed.jpg");
console.log("Image loaded, size:", image.size);

const { device, printer } = await connectToPrinter();

await printer.imageWithLineSpacing(image, "s8");

printer.feed().close();
device?.close();
