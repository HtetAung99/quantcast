import { exec } from 'child_process';
import { expect } from 'chai';

describe('Cookie Counter', () => {
  it('should handle valid input', (done) => {
    exec(
      './index.js -f cookie_log.csv -d 2018-12-09',
      (error, stdout, stderr) => {
        expect(error).to.be.null;
        expect(stderr).to.equal('');

        const expectedOutput =
          'Most active cookie on 2018-12-09: AtY0laUfhglK3lC7';
        expect(stdout.trim()).to.equal(expectedOutput.trim());
        done();
      }
    );
  });

  it('should handle missing filename', (done) => {
    exec('./index.js -d 2024-01-01', (error, stdout, stderr) => {
      expect(error.code).to.equal(1);
      expect(stderr).to.include(
        'Please provide a filename using the -f or --filename option.'
      );
      done();
    });
  });

  it('should handle missing date', (done) => {
    exec('./index.js -f cookie_log.csv', (error, stdout, stderr) => {
      expect(error.code).to.equal(1);
      expect(stderr).to.include(
        'Please provide a date using the -d or --date option.'
      );
      done();
    });
  });

  it('should handle not found date', (done) => {
    exec(
      './index.js -f cookie_log.csv -d 2018-01-09',
      (error, stdout, stderr) => {
        expect(error).to.be.null;
        expect(stderr).to.equal('');

        const expectedOutput = 'No data found for 2018-01-09';
        expect(stdout.trim()).to.equal(expectedOutput.trim());
        done();
      }
    );
  });
});
