#!/usr/bin/env node

import { program } from 'commander';
import CSVReader from './streams/csv-reader.js';
import CookieCounter from './streams/cookie-counter.js';

program.option('-f, --filename <filename>').option('-d, --date <date>');
program.parse();

try {
  const options = program.opts();
  const filename = options.filename;
  const date = options.date;

  if (!filename) {
    throw new Error(
      'Please provide a filename using the -f or --filename option.'
    );
  }

  if (!date) {
    throw new Error('Please provide a date using the -d or --date option.');
  }

  const csvReader = new CSVReader(filename);
  const cookieCounter = new CookieCounter(date);

  csvReader.on('error', (error) => {
    console.error('Error reading CSV file:', error.message);
    process.exit(1);
  });

  cookieCounter.on('error', (error) => {
    console.error('Error counting cookies:', error.message);
    process.exit(1);
  });

  csvReader.pipe(cookieCounter).pipe(process.stdout);
} catch (error) {
  console.error('An error occurred:', error.message);
  process.exit(1);
}
