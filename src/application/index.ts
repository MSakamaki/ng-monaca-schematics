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
import { Schema as ApplicationOptions } from '@schematics/angular/application/schema';
import { latestVersions } from '../utility/latest-versions';
import { join } from 'path';
import { updatePakageJson } from './update.pakagejson';
import { fileReadJsonText } from '../utility/readTree';
import { updateAppModueTs } from './update.app.module';
import { updateNgJson } from './update.angular.json';


function overrideWith(options: ApplicationOptions, workspace: WorkspaceSchema) {
  const filePath = {
    packageJson: join('package.json'),
    ngJson: join('angular.json'),
    ts: {
      vendor: join('src', 'vendor.ts'),
      mainApp: join(workspace.newProjectRoot||'', options.name||'' , 'src/app', 'app.module.ts')
    }
  };


  return (host: Tree, context: SchematicContext) => {
    context.logger.info('overrideWith Action: ' + JSON.stringify(options));

    const dataPkgJSON = JSON.stringify(updatePakageJson(fileReadJsonText(host, filePath.packageJson)), null, 2);
    host.overwrite(filePath.packageJson, dataPkgJSON);
    // angular.json update
    const dataNgJson =  JSON.stringify(updateNgJson(fileReadJsonText(host, filePath.ngJson), workspace.newProjectRoot, options.name), null, 2);
    host.overwrite(filePath.ngJson, dataNgJson);

    updateAppModueTs(host, filePath.ts.mainApp);
    return host;
  };
}

function injectMonaca(options: ApplicationOptions, workspace: WorkspaceSchema) {
  return mergeWith(apply(url('./files'), [
    template({
      ...strings,
      // 'if-flat': (s: string) => options.flat ? '' : s,
      dot: '.',
      ...options,
      cordova_version: latestVersions.cordovaVersion,
      framework_version: latestVersions.frameworkVersion,
      xcode_version: latestVersions.xcodeVersion,
    }),
    move(join(workspace.newProjectRoot||'', options.name||''))
  ]), MergeStrategy.Overwrite);
}

function OverwriteOthersFile(options: ApplicationOptions, workspace: WorkspaceSchema) {
  return mergeWith(apply(url('./other-files'), [
    template({
      ...strings,
      // 'if-flat': (s: string) => options.flat ? '' : s,
      dot: '.',
      ...options
    }),
    move(join(workspace.newProjectRoot||'', options.name||'', 'src/app')),
  ]), MergeStrategy.Overwrite);
}



export function application(options: ApplicationOptions): Rule {

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