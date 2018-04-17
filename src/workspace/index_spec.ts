import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
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
];

const workspaceOptions: WorkspaceOptions = {
  name: 'workspace',
  newProjectRoot: 'projects',
  version: '6.0.0',
};

describe('workspace', () => {
  it('works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic(
      'workspace',
      workspaceOptions,
      Tree.empty(),
    );

    expect(tree.files).toEqual(exp);
  });
});
