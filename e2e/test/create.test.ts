import {
  Init,
  ngLint,
  ngBuild,
  ngTest,
} from '../utils';

describe('create Schema Workspace', () => {
  it(
    'should build',
    () => {
      Init();
      const buildMessage = ngBuild();
      expect(buildMessage).toContain('chunk {main} main.js, main.js.map (main)');
      expect(buildMessage).toContain('chunk {polyfills} polyfills.js, polyfills.js.map (polyfills)');
      expect(buildMessage).toContain('chunk {runtime} runtime.js, runtime.js.map (runtime)');
      expect(buildMessage).toContain('chunk {scripts} scripts.js, scripts.js.map (scripts)');
      expect(buildMessage).toContain('chunk {styles} styles.js, styles.js.map (styles)');
      expect(buildMessage).toContain('chunk {vendor} vendor.js, vendor.js.map (vendor)');
    },
    1000000
  );
  it(
    'should lint',
    () => {
      Init();
      expect(ngLint()).toContain('All files pass linting.');
    },
    1000000
  );
  it(
    'should test',
    () => {
      Init();
      expect(ngTest()).toContain('Executed 3 of 3 SUCCESS');
    },
    1000000
  );
});