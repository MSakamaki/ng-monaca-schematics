import { latestVersions } from "../utility/latest-versions";

export const updatePakageJson = (originPakageJson: any) => ({
  ...originPakageJson,
  name: 'monaca-app',
  displayName: 'Monaca Template Application',
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

