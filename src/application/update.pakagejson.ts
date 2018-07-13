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
    postinstall:
      'cordova plugin add cordova-custom-config cordova-plugin-splashscreen cordova-plugin-whitelist',
  },

  dependencies: {
    ...originPakageJson.dependencies,
    'monaca-plugin-monaca-core': '3.2.0',
    onsenui: latestVersions.onsenui,
    'ngx-onsenui': latestVersions.ngxOnsenui,
  },
  cordova: {
    plugins: {
      'monaca-plugin-monaca-core': {},
    },
  },
  devDependencies: {
    ...originPakageJson.devDependencies,
    monaca: latestVersions.monacaCli,
    cheerio: latestVersions.cheerio,
    puppeteer: latestVersions.puppeteer,
    cordova: latestVersions.cordovaVersion,
  },
});
