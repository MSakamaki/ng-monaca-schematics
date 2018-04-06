import { latestVersions } from "../utility/latest-versions";

export const updatePakageJson = (originPakageJson: any, appname: string) => ({
  ...originPakageJson,
  name: 'monaca-app',
  displayName: 'Monaca Template Application',
  scripts: {
    ...originPakageJson.scripts,
    build: 'ng build --prod',
    [`${appname}.init`]: `node ./projects/${appname}/script/create.js`,
    [`${appname}.upload`]: `node ./projects/${appname}/script/upload.js`,
    [`${appname}.build`]: `node ./projects/${appname}/script/build.js`,
  },
  dependencies: {
    ...originPakageJson.dependencies,
    'cordova-custom-config': latestVersions.cordovaCustomConfig,
    'cordova-plugin-splashscreen': latestVersions.cordovaPluginSplashscreen,
    'cordova-plugin-whitelist': latestVersions.cordovaPluginWhitelist,
    'monaca-plugin-monaca-core': latestVersions.monacaPluginMonacaCore,
    'onsenui': latestVersions.onsenui,
    'ngx-onsenui': latestVersions.ngxOnsenui,
  },
  cordova: {
    plugins: {
      'cordova-plugin-whitelist': {},
      'cordova-plugin-splashscreen': {},
      'cordova-custom-config': {},
      'monaca-plugin-monaca-core': {}
    }
  },
  devDependencies: {
    ...originPakageJson.devDependencies,
    'monaca-lib': latestVersions.monacaLib,
  }
});

