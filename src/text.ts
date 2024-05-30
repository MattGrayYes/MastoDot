import { splitLines } from "./util";
import { styles } from "./printing/configuration";
import { connectToPrinter } from "./printing/connectToPrinter";

console.log("It's printing time!");

const { device, printer } = await connectToPrinter();

printer
    .lineSpace(48)
    .pureText(styles.dw)
    .pureText(styles.dh)
    .pureText(styles.bold)
    .pureText("Matt Gray")
    .pureText(styles.bold_cancel)
    .pureText(styles.dw_cancel)
    .pureText(styles.dh_cancel)
    .pureText(styles.italic)
    .text(" @MattGrayYes@Chaos.Social")
    .pureText(styles.italic_cancel)
    .lineSpace()
    .drawLine()
    .pureText(styles.proportional)
    .text(splitLines("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..", 83))
    .feed()
    .feed()
    .close();


device?.close();

