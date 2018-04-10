import {
  Init,
  ngLint,
  ngBuild,
} from '../utils';

import {
  ngLintMessage,
} from '../messages';

describe('create Schema Workspace', () => {
  it(
    'should build',
    () => {
      Init();
      ngBuild();
    },
    1000000
  );
  it(
    'should lint',
    () => {
      Init();
      expect(ngLint()).toBe(ngLintMessage);
    },
    1000000
  );
});