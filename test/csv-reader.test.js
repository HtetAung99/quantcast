import { expect } from 'chai';
import CSVReader from '../streams/csv-reader.js';

describe('CSVReader', () => {
  it('should read and parse CSV lines', (done) => {
    const csvReader = new CSVReader('./test/test1.csv');
    const expectedData = [
      ['Cookie', 'Timestamp'],
      ['cookie1', 'timestamp1'],
      ['cookie2', 'timestamp2'],
    ];

    let rowCount = 0;

    csvReader.on('data', (row) => {
      expect(row).to.deep.equal(expectedData[rowCount]);
      rowCount++;
    });

    csvReader.on('end', () => {
      expect(rowCount).to.equal(expectedData.length);
      done();
    });

    csvReader.on('error', (err) => {
      done(err);
    });
  });

  it('should read and parse CSV lines for a large log file', (done) => {
    const csvReader = new CSVReader('./test/test2.csv');
    let rowCount = 0;

    csvReader.on('data', (row) => {
      rowCount++;
    });

    csvReader.on('end', () => {
      expect(rowCount).to.equal(305);
      done();
    });

    csvReader.on('error', (err) => {
      done(err);
    });
  });

  it('should handle an empty CSV file', (done) => {
    let rowCount = 0;
    const csvReader = new CSVReader('./test/empty.csv');

    csvReader.on('data', (line) => {
      rowCount++;
    });

    csvReader.on('end', () => {
      expect(rowCount).to.equal(0);
      done();
    });

    csvReader.on('error', (err) => {
      done(err);
    });
  });
});
