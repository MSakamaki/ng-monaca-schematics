import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions } from '@schematics/angular/application/schema';
import { latestVersions } from '@schematics/angular/utility/latest-versions';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

const exp = [
  '/README.md',
  '/angular.json',
  '/package.json',
  '/tsconfig.json',
  '/tslint.json',
  '/.editorconfig',
  '/.gitignore',
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
];

fdescribe('application', () => {
  const runner = new SchematicTestRunner('schematics', collectionPath);
  let workspaceTree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: latestVersions.Angular,
  };

  const defaultOptions: ApplicationOptions = {
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
  });

  it('works', () => {
    const tree = runner.runSchematic('application', defaultOptions, workspaceTree);
    
    // expect(tree.files).toEqual(exp);
    console.log('expect it:', tree.files);

    const treeOnly = tree.files.filter(file => exp.findIndex(e => e === file) === -1);
    const expOnly = exp.filter(e => tree.files.findIndex(file => e === file) === -1);
    expect(treeOnly).toEqual([]);
    expect(expOnly).toEqual([]);

  });
});
