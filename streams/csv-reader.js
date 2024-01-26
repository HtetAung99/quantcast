import { Readable } from 'stream';
import fs from 'fs';
import readline from 'readline';

export default class CSVReader extends Readable {
  constructor(filename) {
    super({ objectMode: true });
    this.readlineStream = readline.createInterface({
      input: fs.createReadStream(filename),
    });

    this.readlineStream.on('line', (line) => {
      this.push(line.split(','));
    });

    this.readlineStream.on('close', () => {
      this.push(null);
    });
  }

  _read() {}
}
