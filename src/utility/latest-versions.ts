import { latestVersions as originLatestVersion } from '@schematics/angular/utility/latest-versions';

const packageJSON = require('../../package.json');

export const latestVersions = {
  ...originLatestVersion,
  cordovaVersion: '7.1',
  frameworkVersion: '3.5',
  xcodeVersion: '9',

  onsenui: '~2.10.1',
  ngxOnsenui: '~4.2.2',
  puppeteer: '^1.5.0',

  // dev
  monacaCli: packageJSON.dependencies['monaca'],
  monacaLib: packageJSON.dependencies['monaca-lib'],
  cheerio: packageJSON.devDependencies['cheerio'],
};
