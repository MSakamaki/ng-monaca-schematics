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
    'cordova-custom-config': '5.0.2',
    'cordova-plugin-camera': '4.0.1',
    'cordova-plugin-contacts': '3.0.1',
    'cordova-plugin-device': '2.0.1',
    'cordova-plugin-device-motion': '1.2.5',
    'cordova-plugin-device-orientation': '1.0.7',
    'cordova-plugin-geolocation': '4.0.1',
    'cordova-plugin-network-information': '2.0.1',
    'cordova-plugin-splashscreen': '5.0.1',
    'cordova-plugin-vibration': '2.1.6',
    'cordova-plugin-whitelist': '1.3.3',
    'monaca-plugin-monaca-core': '3.2.0',
    onsenui: latestVersions.onsenui,
    'ngx-onsenui': latestVersions.ngxOnsenui,
  },
  cordova: {
    plugins: {
      'cordova-custom-config': {},
      'cordova-plugin-camera': {},
      'cordova-plugin-contacts': {},
      'cordova-plugin-device': {},
      'cordova-plugin-device-motion': {},
      'cordova-plugin-device-orientation': {},
      'cordova-plugin-geolocation': {},
      'cordova-plugin-network-information': {},
      'cordova-plugin-splashscreen': {},
      'cordova-plugin-vibration': {},
      'cordova-plugin-whitelist': {},
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
