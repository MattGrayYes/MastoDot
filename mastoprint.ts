import * as fs  from 'node:fs';
import { Printer, Image, BitmapDensity } from "@node-escpos/core";
import USB from "@node-escpos/usb-adapter";

if (!fs.existsSync('done/')) {
    console.error("🚨 no done folder.")
    process.exit(1);
}

if (!fs.existsSync('out/')) {
    console.error("🚨 no out folder.")
    process.exit(1);
}


(async () => {

    console.log("It's printing time!");
    
    const device = new USB();
    console.log("USB Device created...");
    
    device.open(async (err) => {
        if (err) {
          console.error("Error opening device:", err);
          return;
        }
        
        console.log("Device opened successfully.");
        const printer = new Printer(device, { encoding: "GB18030" });
        
        printer.initialise = () => {
            printer.buffer.write("\x1B@");
            return printer;
        };
        
        // Epson LX-350 compatible 9-pin ESC/P Escape Codes
        styles = {
            "initialise": "\x1B@",
            "clear": "\x1B@",
            "dw": "\x1BW1",
            "dw_cancel": "\x1BW0",
            "dh": "\x1Bw1",
            "dh_cancel": "\x1Bw0",
            "condensed_cancel": "\x1BP",
            "condensed": "\x1BM",
            "very_condensed": "\x1Bg",
            "proportional": "\x1Bp1",
            "fixed": "\x1Bp0",
            "bold": "\x1BE",
            "bold_cancel": "\x1BF",
            "italic": "\x1B4",
            "italic_cancel": "\x1B5"
            }
            
        
        printer.initialise()
        printer
            .text("MastoPrint Started")
            .flush()            
        
        
        while(true) {
            var filenames = fs.readdirSync("out/"); 
        
            filenames.forEach(async file => 
            { 
                
                console.log("\n\n📄 "+file);

                var filetype = file.split(".").pop();
                console.log("filetype:", filetype)
        
                try {
                    var filestats = fs.statSync('out/'+file);
        
                } catch (err) {
                    console.error(err);
                    return
                }
        
                var filetime = new Date(filestats.ctime).getTime() + 10000;
                var now = new Date().getTime();
        
                printer.initialise()
                
                // if the file's been sat there for 10s
                if(now > filetime) {
                    var file_contents = fs.readFileSync('out/'+file, 'utf8');
                    
                    if(filetype == "txt") {
                        // print the string
                        console.log("TEXT", file_contents)
                        printer.text(file_contents)
                        
                        if(await printer.flush()) { // IF ITS SUCCESSFULLY PRINTED THE STRING
                            console.log('moving: out/'+file+' to done/'+file)
                            fs.renameSync('out/'+file, 'done/'+file);
                        }
                        else
                            console.error('not printed. not moving.')
                    }
                    else if (filetype == "json") {
                        var toot = JSON.parse(file_contents)
                        
                        console.log(toot.account.display_name)
                        console.log(toot.account.acct)
                        console.log(toot.account.avatar)
                        console.log(toot.created_at)
                        console.log(toot.content)

                        printer.initialise()
                        printer
                            .lineSpace(48)
                            .feed()
                            .pureText(styles.dw)
                            .pureText(styles.dh)
                            .pureText(styles.bold)
                                .pureText(toot.account.display_name)
                            .pureText(styles.bold_cancel)
                            .pureText(styles.dw_cancel)
                            .pureText(styles.dh_cancel)
                            .pureText(styles.italic)
                                .text(toot.account.acct)
                            .pureText(styles.italic_cancel)
                            .lineSpace()
                            .drawLine()
                            .pureText(styles.proportional)
                                .text(splitLines(toot.content,83))
                            .feed()

                        if(toot.media_attachments.length >= 1) {
                            toot.media_attachments.forEach( async (item) => {
                                console.log(item.type)
                                console.log(item.preview_url)
                                console.log(item.description)
                                if(item.type == "image")
                                {
                                    const image = await Image.load(item.preview_url);
                                    console.log("Image loaded, size:", image.size);
                                    
                                    await imageWithLineSpacing(printer, image, "D24");
                                    
                                    printer.feed()
                                }
                                else
                                    printer.pureText("Attachment: "+item.type+" ")
                                
                                printer
                                    .pureText(styles.very_condensed)
                                    .text(item.description)
                                    .pureText(styles.condensed_cancel)
                                    .flush()
                            })
                        }

                        if(toot.poll == true)
                            printer.text("Toot contains a poll.")

                        if(await printer.flush()) { // IF ITS SUCCESSFULLY PRINTED THE TOOT
                            console.log('moving: out/'+file+' to done/'+file)
                            fs.renameSync('out/'+file, 'done/'+file);
                        }
                        else
                            console.error('not printed. not moving.')
                    }
                    else
                        console.error("I have no idea what to do with this file, it's not txt or json",file)
                    
                }
                else
                    console.log("file not old enough yet")
            
            }); 
        
            console.log("\n\n⏰ pause")
            await new Promise(r => setTimeout(r, 5000));

        } // while true

        printer.feed().close();
    }); //device.open
  
    device.close();
  
  })();
  



  async function imageWithLineSpacing(printer: Printer<[]>, image: Image, density?: BitmapDensity | undefined) {
    const defaultLineSpace = printer.lineSpace;
    const lineSpace24 = (n?: number | null) => {
      printer.buffer.write("\x1B\x33");
      printer.buffer.writeUInt8(24);
      return printer;
    }
  
    printer.lineSpace = lineSpace24;
    await printer.image(image, density);
  
    printer.lineSpace = defaultLineSpace;
  }
  
  
  
/*
* Ths function is taken from https://liza.io/splitting-text-into-lines-according-to-maximum-width-vertical-text-scroll-in-javascript-and-html5/
* and has been slightly modified to output a string separated by newlines
*/
function splitLines(text: string, maxTextWidth: number) {
    // Split text into words by spaces
    var words = text.split(' ');
    var lastWord = words[words.length - 1];
    var lineWidth = 0;
    var wordWidth = 0;
    var thisLine = '';
    var allLines = new Array();

    // For every element in the array of words
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        // Add current word to current line
        thisLine = thisLine.concat(word + ' ');
        // Get width of the entire current line
        lineWidth = thisLine.length;
        // If word is not the last element in the array
        if (word !== lastWord) {
            // Find out what the next upcoming word is
            var nextWord = words[i + 1];

            // Check if the current line + the next word would go over width limit
            if (lineWidth + nextWord.length >= maxTextWidth) {
                // If so, add the current line to the allLines array
                // without adding the next word
                addToAllLines(thisLine);
            } 

            // '~' indicates inserting a blank line, if required
            else if (word === '~') {
                addToAllLines(' ');
            }

            // If the next word is a line break, end line now
            else if (nextWord === '~') {
                addToAllLines(thisLine);
            }
        }

        // If this IS the last word in the array
        else {
            // Add this entire line to the array and return allLines
            addToAllLines(thisLine);
            
            return allLines.join("\n");
        }
    }

    // Function that adds text to the array of all lines
    function addToAllLines(text) {
        allLines.push(text);
        thisLine = '';
        lineWidth = 0;
    }
}