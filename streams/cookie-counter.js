import { Transform } from 'stream';

export default class CookieCounter extends Transform {
  constructor(date) {
    super({ objectMode: true });
    this.date = date;
    this.cookieCounts = new Map();
  }

  _transform([cookie, timestamp], encoding, callback) {
    if (timestamp.includes(this.date)) {
      const count = this.cookieCounts.get(cookie) || 0;
      this.cookieCounts.set(cookie, count + 1);
    }
    callback();
  }

  _flush(callback) {
    let mostActiveCookie = '';
    let maxCount = 0;

    for (const [cookie, count] of this.cookieCounts.entries()) {
      if (count > maxCount) {
        mostActiveCookie = cookie;
        maxCount = count;
      }
    }

    if (mostActiveCookie) {
      this.push(`Most active cookie on ${this.date}: ${mostActiveCookie}\n`);
    } else {
      this.push(`No data found for ${this.date}\n`);
    }

    callback();
  }
}
