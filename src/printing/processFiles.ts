import fs from 'fs';
import { IEpsonLX350CompatiblePrinter } from './EpsonLX350CompatiblePrinter';
import { DONEDIR, OUTDIR } from '../util';
import printToot from './printToot';

export async function processFiles(printer: IEpsonLX350CompatiblePrinter) {
    const now = new Date().getTime();

    const filenames = fs.readdirSync(OUTDIR);
    const filesThatAreTextOrJson = filenames.filter(file => file.endsWith(".txt") || file.endsWith(".json"));
    const fileNamesAndStats = filesThatAreTextOrJson.map(file => {
        return { file, stats: fs.statSync(`${OUTDIR}/${file}`) }
    });

    const filesOlderThanTenSeconds = fileNamesAndStats.filter(({ stats }) => {
        return now > new Date(stats.ctime).getTime() + 10000
    });

    console.log(`${new Date().toISOString()}: Found ${filesOlderThanTenSeconds.length} files older than 10 seconds to process.`);

    if (filesOlderThanTenSeconds.length === 0) {
        return;
    }

    printer.initialise();

    for (const { file } of filesOlderThanTenSeconds) {
        try {
            const filetype = file.split('.').pop();
            const contents = fs.readFileSync(`${OUTDIR}/${file}`, 'utf8');

            console.log(`Processing file: ${file}`);
            console.log("Filetype: ", filetype);
            console.log("Contents: ", contents);

            filetype === "txt"
                ? await printer.text(contents).flush()
                : await printToot(printer, contents);

        } catch (e) {
            console.error(`Error processing file ${file}: `, e);
        } finally {
            fs.renameSync(`${OUTDIR}/${file}`, `${DONEDIR}/${file}`);
            console.log(`Moved file: ${OUTDIR}/${file} to ${DONEDIR}/${file}`);
        }
    }
}
