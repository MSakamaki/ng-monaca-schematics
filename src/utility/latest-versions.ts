import { latestVersions as originLatestVersion } from '@schematics/angular/utility/latest-versions';

const packageJSON = require('../../package.json');

export const latestVersions = {
  ...originLatestVersion,
  cordovaVersion: '7.1',
  frameworkVersion: '3.5',
  xcodeVersion: '9',

  cordovaCustomConfig: '5.0.2',
  cordovaPluginSplashscreen: '5.0.1',
  cordovaPluginWhitelist: '1.3.3',
  monacaPluginMonacaCore: '3.2.0',
  onsenui: '~2.9.2',
  ngxOnsenui: '~4.1.0',

  // dev
  monacaCli: '2.6.2',
  monacaLib: packageJSON.dependencies['monaca-lib'],
  cheerio: packageJSON.devDependencies['cheerio'],
};
