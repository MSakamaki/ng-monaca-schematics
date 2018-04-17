import { Init, ngBuild, ngE2e, ngLint, ngTest } from '../utils';

describe('create Schema Workspace', () => {
  it(
    'should build',
    () => {
      Init();
      const buildMessage = ngBuild();
      expect(buildMessage).toContain(
        'chunk {main} main.js, main.js.map (main)',
      );
      expect(buildMessage).toContain(
        'chunk {polyfills} polyfills.js, polyfills.js.map (polyfills)',
      );
      expect(buildMessage).toContain(
        'chunk {runtime} runtime.js, runtime.js.map (runtime)',
      );
      expect(buildMessage).toContain(
        'chunk {scripts} scripts.js, scripts.js.map (scripts)',
      );
      expect(buildMessage).toContain(
        'chunk {styles} styles.js, styles.js.map (styles)',
      );
      expect(buildMessage).toContain(
        'chunk {vendor} vendor.js, vendor.js.map (vendor)',
      );
    },
    3000000,
  );
  it(
    'should lint',
    () => {
      Init();
      expect(ngLint()).toContain('All files pass linting.');
    },
    3000000,
  );
  it(
    'should test',
    () => {
      Init();
      expect(ngTest('--browsers ChromeHeadless')).toContain(
        'Executed 3 of 3 SUCCESS',
      );
    },
    3000000,
  );
  // TODO: https://github.com/angular/protractor/issues/4657
  // it(
  //   'should e2e',
  //   () => {
  //     Init();
  //     expect(ngE2e()).toContain('should display welcome message');
  //   },
  //   3000000,
  // );
});
