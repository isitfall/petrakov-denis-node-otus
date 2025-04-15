import * as fs from "node:fs";
import path from "node:path";
import { pipeline, Transform } from "node:stream";
import { fileURLToPath } from "node:url";

// next three lines needs to resolve es path
const __filename = fileURLToPath(import.meta.url);
const __srcDirname = path.dirname(__filename);
const __dirname = path.resolve(__srcDirname, '..');

const readFullFile = async (readStream: fs.ReadStream): Promise<Buffer> => {
    let fileContent = '';

    readStream.on('data', (chunk) => {
        fileContent += chunk;
    });

    return await new Promise<Buffer>((resolve, reject) => {
        readStream.on('end', () => {
            console.log(`File has read.`);
            resolve(Buffer.from(fileContent));
        });
        readStream.on('error', (err) => {
            reject(err);
        });
    });
}


const writeFileViaStream = async (inputPath: string) => {
    const encoding = 'utf-8';

    const filename = path.basename(inputPath);

    const readStream = fs.createReadStream(inputPath, {encoding, highWaterMark: 1});

    try {
        const fullFileBuffer = await readFullFile(readStream);

        const writeStream = fs.createWriteStream(__dirname + '/files/output/' + filename, {encoding});

        const filterTransform = new Transform({
            transform(chunk, encoding, callback) {
                const filtered = chunk.toString().replace(/\s+/g, ' ');

                callback(null, filtered);
            }
        });

        const sortTransform = new Transform({
            transform(chunk, encoding, callback) {
                const words = chunk.toString().replace(/[^a-zA-Z\s]/g, '');
                const sorted = words.split(' ').sort().join(' ');

                callback(null, sorted);
            }
        });

        const reduceTransform = new Transform({
            transform: (chunk, encoding, callback) => {
                const words = chunk.toString();

                const reduced = words.split(" ").reduce((acc: Record<string, number>, currentValue: string) => {
                    const value = acc[currentValue];
                    acc[currentValue] = (value ?? 0) + 1;

                    return acc
                }, {});

                callback(null, Buffer.from(JSON.stringify(reduced)));
            }
        });

        const mapTransform = new Transform({
            transform: (chunk, encoding, callback) => {
                const json = chunk.toString();
                const data = JSON.parse(json);

                const arr = Object.values(data);

                callback(null, `[${arr.toString()}]`);
            }
        })

        pipeline(
            [fullFileBuffer],
            filterTransform,
            sortTransform,
            reduceTransform,
            mapTransform,
            writeStream,
            (err) => {
                if (err) {
                    console.log(`Error:`, err);
                }
            });
    } catch (e) {
        throw e;
    }


}

writeFileViaStream(__dirname + '/files/input/1-letters.txt');
writeFileViaStream(__dirname + '/files/input/2-syllables.txt');
writeFileViaStream(__dirname + '/files/input/3-syllables.txt');
writeFileViaStream(__dirname + '/files/input/4-words.txt');
writeFileViaStream(__dirname + '/files/input/5-syllables.txt');
