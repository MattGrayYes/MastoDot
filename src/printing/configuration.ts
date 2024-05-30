export const convert_options = {
    wordwrap: false, //130
    selectors: [{ selector: 'a', options: { ignoreHref: true } }]
}

// Epson LX-350 compatible 9-pin ESC/P Escape Codes
export const styles = {
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
};