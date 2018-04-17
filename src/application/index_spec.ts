import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';

import * as path from 'path';
import { latestVersions } from '../utility/latest-versions';
import { MonacaApplicationOptions } from './schema';

import { MonacaWorkspaceOptions } from '../workspace/schema';

const collectionPath = path.join(__dirname, '../collection.json');

const exp = [
  '/README.md',
  '/angular.json',
  '/package.json',
  '/tsconfig.json',
  '/tslint.json',
  '/src/tslint.json',
  '/.editorconfig',
  '/.gitignore',
  '/src/environments/environment.prod.ts',
  '/src/environments/environment.ts',
  '/src/favicon.ico',
  '/src/index.html',
  '/src/main.ts',
  '/src/polyfills.ts',
  '/src/test.ts',
  '/src/assets/.gitkeep',
  '/src/styles.css',
  '/src/browserslist',
  '/src/karma.conf.js',
  '/src/tsconfig.app.json',
  '/src/tsconfig.spec.json',
  '/src/app/app.module.ts',
  '/src/app/app.component.css',
  '/src/app/app.component.html',
  '/src/app/app.component.spec.ts',
  '/src/app/app.component.ts',
  '/e2e/protractor.conf.js',
  '/e2e/src/app.e2e-spec.ts',
  '/e2e/src/app.po.ts',
  '/e2e/tsconfig.e2e.json',
  '/src/components/loader.css',
  '/src/components/loader.js',
  '/src/components/monaca-cordova-loader/.bower.json',
  '/src/components/monaca-cordova-loader/bower.json',
  '/src/components/monaca-cordova-loader/cordova-loader.js',
  '/src/components/monaca-core-utils/.bower.json',
  '/src/components/monaca-core-utils/bower.json',
  '/src/components/monaca-core-utils/monaca-core-utils.js',
  '/config.xml',
  '/res/android/icon/hdpi.png',
  '/res/android/icon/ldpi.png',
  '/res/android/icon/mdpi.png',
  '/res/android/icon/xhdpi.png',
  '/res/android/icon/xxhdpi.png',
  '/res/android/icon/xxxhdpi.png',
  '/res/android/screen/splash-port-hdpi.9.png',
  '/res/android/screen/splash-port-ldpi.9.png',
  '/res/android/screen/splash-port-mdpi.9.png',
  '/res/android/screen/splash-port-xhdpi.9.png',
  '/res/android/screen/splash-port-xxhdpi.9.png',
  '/res/android/screen/splash-port-xxxhdpi.9.png',
  '/res/ios/icon/icon-1024.png',
  '/res/ios/icon/icon-40.png',
  '/res/ios/icon/icon-40@2x.png',
  '/res/ios/icon/icon-50.png',
  '/res/ios/icon/icon-50@2x.png',
  '/res/ios/icon/icon-60.png',
  '/res/ios/icon/icon-60@2x.png',
  '/res/ios/icon/icon-60@3x.png',
  '/res/ios/icon/icon-72.png',
  '/res/ios/icon/icon-72@2x.png',
  '/res/ios/icon/icon-76.png',
  '/res/ios/icon/icon-76@2x.png',
  '/res/ios/icon/icon-83.5@2x~ipad.png',
  '/res/ios/icon/icon-small.png',
  '/res/ios/icon/icon-small@2x.png',
  '/res/ios/icon/icon-small@3x.png',
  '/res/ios/icon/icon.png',
  '/res/ios/icon/icon@2x.png',
  '/res/ios/screen/Default-568h@2x~iphone.png',
  '/res/ios/screen/Default-667h.png',
  '/res/ios/screen/Default-736h.png',
  '/res/ios/screen/Default-Landscape-736h.png',
  '/res/ios/screen/Default-Landscape@2x~ipad.png',
  '/res/ios/screen/Default-Landscape~ipad.png',
  '/res/ios/screen/Default-Portrait@2x~ipad.png',
  '/res/ios/screen/Default-Portrait~ipad.png',
  '/res/ios/screen/Default@2x~iphone.png',
  '/res/ios/screen/Default@2x~universal~anyany.png',
  '/res/ios/screen/Default~iphone.png',
  '/res/winrt/icon/app_logo_winrt.png',
  '/res/winrt/icon/app_small_logo_winrt.png',
  '/res/winrt/icon/app_tile_wide_logo_winrt.png',
  '/res/winrt/icon/package_logo_winrt.png',
  '/res/winrt/screen/app_splash_screen_winrt.png',
  '/scripts/replace.index.html.js',
  '/scripts/build.js',
  '/scripts/create.js',
  '/scripts/upload.js',
  '/src/css/style.css',
  '/.monaca/project_info.json',
];

fdescribe('application', () => {
  const runner = new SchematicTestRunner('schematics', collectionPath);
  let workspaceTree: UnitTestTree;
  let tree: UnitTestTree;

  const workspaceOptions: MonacaWorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: '',
    version: latestVersions.Angular,
    commit: {
      message: 'string',
      name: 'string',
      email: 'hoge@foo.bar',
    },
  };

  const defaultOptions: MonacaApplicationOptions = {
    projectRoot: '',
    name: 'sample-test',
    inlineStyle: false,
    inlineTemplate: false,
    viewEncapsulation: 'Emulated',
    routing: false,
    style: 'css',
    skipTests: false,
    skipPackageJson: false,
  };

  beforeEach(() => {
    workspaceTree = runner.runSchematic(
      'workspace',
      workspaceOptions,
    ) as UnitTestTree;
    tree = runner.runSchematic('application', defaultOptions, workspaceTree);
  });

  describe('works', () => {
    it('treeOnly', () => {
      const treeOnly = tree.files.filter(
        file => exp.findIndex(e => e === file) === -1,
      );
      expect(treeOnly).toEqual([]);
    });

    it('expOnly', () => {
      const expOnly = exp.filter(
        e => tree.files.findIndex(file => e === file) === -1,
      );
      expect(expOnly).toEqual([]);
    });
  });

  it('package.json check', () => {
    const text = tree.readContent('/package.json');
    const json = JSON.parse(text);
    expect(json.name).toBe('monaca-app');
    expect(json.displayName).toBe('Monaca Template Application');
    expect(json.dependencies['cordova-custom-config']).toBe(
      latestVersions.cordovaCustomConfig,
    );
    expect(json.devDependencies['monaca']).toBe(latestVersions.monacaCli);
  });
});
