import { strings } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  externalSchematic,
  apply,
  url,
  mergeWith,
  move,
  branchAndMerge,
  MergeStrategy,
  template,
} from '@angular-devkit/schematics';
import { getWorkspace, WorkspaceSchema } from '@schematics/angular/utility/config';
import { latestVersions } from '../utility/latest-versions';
import { join } from 'path';
import { updatePakageJson } from './update.pakagejson';
import { fileReadJsonText, fileReadText } from '../utility/readTree';
import { updateAppModueTs } from './update.app.module';
import { updateNgJson } from './update.angular.json';
import { MonacaApplicationOptions } from './schema';
import { updateAppComponentSpecTs } from './update.app.component.spec';


function overrideWith(options: MonacaApplicationOptions, workspace: WorkspaceSchema) {
  const filePath = {
    packageJson: join('package.json'),
    ngJson: join('angular.json'),
    ts: {
      vendor: join('src', 'vendor.ts'),
      mainApp: join(workspace.newProjectRoot || '', options.name || '', 'src/app', 'app.module.ts'),
      mainAppComponentSpec: join(workspace.newProjectRoot || '', options.name || '', 'src/app', '/app.component.spec.ts')
    }
  };


  return (host: Tree) => {
    const dataPkgJSON = JSON.stringify(updatePakageJson(fileReadJsonText(host, filePath.packageJson), options.name), null, 2);
    host.overwrite(filePath.packageJson, dataPkgJSON);
    // angular.json update
    const dataNgJson = JSON.stringify(updateNgJson(fileReadJsonText(host, filePath.ngJson), workspace.newProjectRoot, options.name), null, 2);
    host.overwrite(filePath.ngJson, dataNgJson);

    updateAppModueTs(host, filePath.ts.mainApp);

    updateAppComponentSpecTs(host, filePath.ts.mainAppComponentSpec);

    console.log(filePath.ts.mainAppComponentSpec, fileReadText(host, filePath.ts.mainAppComponentSpec));

    return host;
  };
}

function injectMonaca(options: MonacaApplicationOptions, workspace: WorkspaceSchema) {

  const monacaLib = mergeWith(apply(url('../../node_modules/monaca-lib/src/template/components'), [
    template({
      ...strings,
      ...options,
    }),
    move(join(workspace.newProjectRoot || '', options.name || '', 'src/components')),
  ]), MergeStrategy.Overwrite);

  const local = mergeWith(apply(url('./files'), [
    template({
      ...strings,
      dot: '.',
      ...options,
      cordova_version: latestVersions.cordovaVersion,
      framework_version: latestVersions.frameworkVersion,
      xcode_version: latestVersions.xcodeVersion,
      projectDirectory: join(workspace.newProjectRoot || '', options.name || ''),
    }),
    move(join(workspace.newProjectRoot || '', options.name || ''))
  ]), MergeStrategy.Overwrite);

  return branchAndMerge(chain([monacaLib, local]), MergeStrategy.Overwrite);
}

function OverwriteOthersFile(options: MonacaApplicationOptions, workspace: WorkspaceSchema) {
  return mergeWith(apply(url('./other-files'), [
    template({
      ...strings,
      // 'if-flat': (s: string) => options.flat ? '' : s,
      dot: '.',
      ...options,
    }),
    move(join(workspace.newProjectRoot || '', options.name || '', 'src/app')),
  ]), MergeStrategy.Overwrite);
}



export function application(options: MonacaApplicationOptions): Rule {

  return (host: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(host);
    return chain([
      externalSchematic('@schematics/angular', 'application', options),
      branchAndMerge(chain([
        injectMonaca(options, workspace),
      ]), MergeStrategy.Overwrite),
      overrideWith(options, workspace),
      branchAndMerge(chain([
        OverwriteOthersFile(options, workspace),
      ]), MergeStrategy.Overwrite),
    ])(host, _context);
  };

}