import { latestVersions } from '../utility/latest-versions';

export const updatePakageJson = (originPakageJson: any, appname: string) => ({
  ...originPakageJson,
  name: 'monaca-app',
  displayName: 'Monaca Template Application',
  scripts: {
    ...originPakageJson.scripts,
    'ng.build': `ng build --prod && node ./scripts/replace.index.html.js ${appname}`,
    login: 'monaca login',
    upload: 'npm run ng.build && monaca upload',
    build: 'npm run ng.build && monaca remote build --browser || true',
  },

  dependencies: {
    ...originPakageJson.dependencies,
    'cordova-custom-config': latestVersions.cordovaCustomConfig,
    'cordova-plugin-splashscreen': latestVersions.cordovaPluginSplashscreen,
    'cordova-plugin-whitelist': latestVersions.cordovaPluginWhitelist,
    'monaca-plugin-monaca-core': latestVersions.monacaPluginMonacaCore,
    onsenui: latestVersions.onsenui,
    'ngx-onsenui': latestVersions.ngxOnsenui,
  },
  cordova: {
    plugins: {
      'cordova-plugin-whitelist': {},
      'cordova-plugin-splashscreen': {},
      'cordova-custom-config': {},
      'monaca-plugin-monaca-core': {},
    },
  },
  devDependencies: {
    ...originPakageJson.devDependencies,
    monaca: latestVersions.monacaCli,
    cheerio: latestVersions.cheerio,
    puppeteer: latestVersions.puppeteer,
  },
});
