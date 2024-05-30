import fs from 'fs';
export const OUTDIR = './out';
export const DONEDIR = './done';

export function initialiseFileSystem() {
    if (!fs.existsSync(OUTDIR)) {
        console.warn(`🚨 No ${OUTDIR} folder. Creating one now...`);
        fs.mkdirSync(OUTDIR);
    }

    if (!fs.existsSync(DONEDIR)) {
        console.warn(`🚨 No ${DONEDIR} folder. Creating one now...`);
        fs.mkdirSync(DONEDIR);
    }
}

/*
* Ths function is taken from https://liza.io/splitting-text-into-lines-according-to-maximum-width-vertical-text-scroll-in-javascript-and-html5/
* and has been slightly modified to output a string separated by newlines
*/
export function splitLines(text: string, maxTextWidth: number) {
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

    return "";

    // Function that adds text to the array of all lines
    function addToAllLines(text) {
        allLines.push(text);
        thisLine = '';
        lineWidth = 0;
    }
}