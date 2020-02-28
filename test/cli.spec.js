import cli from '../src/cli';
import chai from 'chai';

describe('CLI', () => {
  it('should start', async () => {
    const response = await cli('--help');
  });
});
