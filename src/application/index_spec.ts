import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

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
  '/.editorconfig',
  '/.gitignore',
  '/example.monaca.config.json',
  '/projects/sample-test/browserslist',
  '/projects/sample-test/karma.conf.js',
  '/projects/sample-test/src/environments/environment.prod.ts',
  '/projects/sample-test/src/environments/environment.ts',
  '/projects/sample-test/src/favicon.ico',
  '/projects/sample-test/src/index.html',
  '/projects/sample-test/src/main.ts',
  '/projects/sample-test/src/polyfills.ts',
  '/projects/sample-test/src/test.ts',
  '/projects/sample-test/tsconfig.app.json',
  '/projects/sample-test/tsconfig.spec.json',
  '/projects/sample-test/src/assets/.gitkeep',
  '/projects/sample-test/src/styles.css',
  '/projects/sample-test/src/app/app.module.ts',
  '/projects/sample-test/src/app/app.component.css',
  '/projects/sample-test/src/app/app.component.html',
  '/projects/sample-test/src/app/app.component.spec.ts',
  '/projects/sample-test/src/app/app.component.ts',
  '/projects/sample-test-e2e/protractor.conf.js',
  '/projects/sample-test-e2e/src/app.e2e-spec.ts',
  '/projects/sample-test-e2e/src/app.po.ts',
  '/projects/sample-test-e2e/tsconfig.e2e.json',
  '/projects/sample-test/config.xml',
  '/projects/sample-test/res/android/icon/hdpi.png',
  '/projects/sample-test/res/android/icon/ldpi.png',
  '/projects/sample-test/res/android/icon/mdpi.png',
  '/projects/sample-test/res/android/icon/xhdpi.png',
  '/projects/sample-test/res/android/icon/xxhdpi.png',
  '/projects/sample-test/res/android/icon/xxxhdpi.png',
  '/projects/sample-test/res/android/screen/splash-port-hdpi.9.png',
  '/projects/sample-test/res/android/screen/splash-port-ldpi.9.png',
  '/projects/sample-test/res/android/screen/splash-port-mdpi.9.png',
  '/projects/sample-test/res/android/screen/splash-port-xhdpi.9.png',
  '/projects/sample-test/res/android/screen/splash-port-xxhdpi.9.png',
  '/projects/sample-test/res/android/screen/splash-port-xxxhdpi.9.png',
  '/projects/sample-test/res/ios/icon/icon-1024.png',
  '/projects/sample-test/res/ios/icon/icon-40.png',
  '/projects/sample-test/res/ios/icon/icon-40@2x.png',
  '/projects/sample-test/res/ios/icon/icon-50.png',
  '/projects/sample-test/res/ios/icon/icon-50@2x.png',
  '/projects/sample-test/res/ios/icon/icon-60.png',
  '/projects/sample-test/res/ios/icon/icon-60@2x.png',
  '/projects/sample-test/res/ios/icon/icon-60@3x.png',
  '/projects/sample-test/res/ios/icon/icon-72.png',
  '/projects/sample-test/res/ios/icon/icon-72@2x.png',
  '/projects/sample-test/res/ios/icon/icon-76.png',
  '/projects/sample-test/res/ios/icon/icon-76@2x.png',
  '/projects/sample-test/res/ios/icon/icon-83.5@2x~ipad.png',
  '/projects/sample-test/res/ios/icon/icon-small.png',
  '/projects/sample-test/res/ios/icon/icon-small@2x.png',
  '/projects/sample-test/res/ios/icon/icon-small@3x.png',
  '/projects/sample-test/res/ios/icon/icon.png',
  '/projects/sample-test/res/ios/icon/icon@2x.png',
  '/projects/sample-test/res/ios/screen/Default-568h@2x~iphone.png',
  '/projects/sample-test/res/ios/screen/Default-667h.png',
  '/projects/sample-test/res/ios/screen/Default-736h.png',
  '/projects/sample-test/res/ios/screen/Default-Landscape-736h.png',
  '/projects/sample-test/res/ios/screen/Default-Landscape@2x~ipad.png',
  '/projects/sample-test/res/ios/screen/Default-Landscape~ipad.png',
  '/projects/sample-test/res/ios/screen/Default-Portrait@2x~ipad.png',
  '/projects/sample-test/res/ios/screen/Default-Portrait~ipad.png',
  '/projects/sample-test/res/ios/screen/Default@2x~iphone.png',
  '/projects/sample-test/res/ios/screen/Default@2x~universal~anyany.png',
  '/projects/sample-test/res/ios/screen/Default~iphone.png',
  '/projects/sample-test/res/winrt/icon/app_logo_winrt.png',
  '/projects/sample-test/res/winrt/icon/app_small_logo_winrt.png',
  '/projects/sample-test/res/winrt/icon/app_tile_wide_logo_winrt.png',
  '/projects/sample-test/res/winrt/icon/package_logo_winrt.png',
  '/projects/sample-test/res/winrt/screen/app_splash_screen_winrt.png',
  '/projects/sample-test/script/build.js',
  '/projects/sample-test/script/upload.js',
  '/projects/sample-test/script/create.js',
  '/projects/sample-test/src/components/loader.css',
  '/projects/sample-test/src/components/loader.js',
  '/projects/sample-test/src/components/monaca-cordova-loader/bower.json',
  '/projects/sample-test/src/components/monaca-cordova-loader/cordova-loader.js',
  '/projects/sample-test/src/components/monaca-core-utils/bower.json',
  '/projects/sample-test/src/components/monaca-core-utils/monaca-core-utils.js',
  '/projects/sample-test/src/css/style.css',
  '/projects/sample-test/.monaca/project_info.json',
  '/projects/sample-test/src/components/monaca-cordova-loader/.bower.json',
  '/projects/sample-test/src/components/monaca-core-utils/.bower.json',
];

fdescribe('application', () => {
  const runner = new SchematicTestRunner('schematics', collectionPath);
  let workspaceTree: UnitTestTree;
  let tree: UnitTestTree;

  const workspaceOptions: MonacaWorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: latestVersions.Angular,
  };

  const defaultOptions: MonacaApplicationOptions = {
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
    workspaceTree = runner.runSchematic('workspace', workspaceOptions) as UnitTestTree;
    tree = runner.runSchematic('application', defaultOptions, workspaceTree);
  });

  describe('works', () => {

    it('treeOnly', () => {
      const treeOnly = tree.files.filter(file => exp.findIndex(e => e === file) === -1);
      expect(treeOnly).toEqual([]);
    });

    it('expOnly', () => {
      const expOnly = exp.filter(e => tree.files.findIndex(file => e === file) === -1);
      expect(expOnly).toEqual([]);
    });

  });


  it('package.json check', () => {
    const text = tree.readContent('/package.json');
    const json = JSON.parse(text);
    expect(json.name).toBe('monaca-app');
    expect(json.displayName).toBe('Monaca Template Application');
    expect(json.dependencies['cordova-custom-config']).toBe(latestVersions.cordovaCustomConfig);
    expect(json.devDependencies['monaca-lib']).toBe(latestVersions.monacaLib);
  });

});
