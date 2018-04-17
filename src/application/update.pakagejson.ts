import { latestVersions } from '../utility/latest-versions';

export const updatePakageJson = (originPakageJson: any, appname: string) => ({
  ...originPakageJson,
  name: 'monaca-app',
  displayName: 'Monaca Template Application',
  scripts: {
    ...originPakageJson.scripts,
    build: `ng build --prod && node ./scripts/replace.index.html.js ${appname}`,
    [`monaca.init`]: `node ./scripts/create.js`,
    [`monaca.upload`]: `node ./scripts/upload.js`,
    [`monaca.build`]: `node ./scripts/build.js`,
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
    'monaca-lib': latestVersions.monacaLib,
    cheerio: latestVersions.cheerio,
  },
});
