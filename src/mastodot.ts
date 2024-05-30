import 'dotenv/config'
import Mastodon from 'mastodon-api'
import * as fs from 'node:fs';
import { OUTDIR } from './util';
import { Toot } from './types';

// you need a .env file with ACCESS_TOKEN="youraccesstoken" in it
const M = new Mastodon({
    access_token: process.env.ACCESS_TOKEN,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    api_url: 'https://chaos.social/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
});

print_text("Mastodot - The Mastodon Dot Matrix Printer\nBy Matt Gray | mattg.co.uk\n")

if (!fs.existsSync(OUTDIR)) {
    console.error("🚨 no out folder.")
    process.exit(1);
}

const hashTags = ['emfcamp', 'emf2024', 'mastodot'];
const streams = hashTags.map(tag => M.stream('streaming/hashtag', { tag }));

streams.push(M.stream('streaming/user'))

streams.forEach(stream => {
    stream.on('connected', process_connected);
    stream.on('message', process_message);
    stream.on('error', process_error);
    stream.on('reconnect', process_reconnect);
    stream.on('disconnect', process_disconnect);
});

function process_message(msg) {
    switch (msg.event) {
        case "update":
            disp(msg.data)
            //console.log(msg.data)
            break;
        case "delete":
        case "status.update":
        default:
            break;
    }
}

function process_connected(msg) {
    print_text('connected ' + msg.req.path)
}

function process_reconnect(msg) {
    console.log('reconnect ', msg)
}

function process_disconnect(msg) {
    console.log('disconnect ', msg)
}

function process_error(err) {
    console.log('error', err)
}

function disp(toot: Toot) {
    var atts = ""
    if (toot.media_attachments.length > 0) {
        for (const att of toot.media_attachments) {
            atts = atts + att.type
            if (att.description) {
                atts = atts + " - " + att.description
            }
            atts = atts + "\n"
        }
    }
    //console.log(toot.account.display_name + " (" + toot.account.acct + ")\n" + convert(toot.content, convert_options) + "\n"+atts+"\n\n")
    console.log(toot.account.display_name + " (" + toot.account.acct + ")\n" + toot.content + "\n" + atts + "\n\n")
    print_toot(toot)
}

// saves toot object as json string to out folder as .json file
function print_toot(toot: Toot) {
    fs.writeFile(`${OUTDIR}/${Date.now()}.json`, JSON.stringify(toot), err => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    });
}

// saves string to out folder as .txt file
function print_text(text) {
    console.log(text)

    fs.writeFile(`${OUTDIR}/${Date.now()}.txt`, text, err => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    });
}