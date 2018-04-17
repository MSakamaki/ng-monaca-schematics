import { strings } from '@angular-devkit/core';
import {
  MergeStrategy,
  Rule,
  SchematicContext,
  Tree,
  apply,
  branchAndMerge,
  chain,
  externalSchematic,
  mergeWith,
  move,
  template,
  url,
} from '@angular-devkit/schematics';
import {
  WorkspaceSchema,
  getWorkspace,
} from '@schematics/angular/utility/config';
import { join } from 'path';

import { latestVersions } from '../utility/latest-versions';
import { updatePakageJson } from './update.pakagejson';

import { fileReadJsonText } from '../utility/readTree';
import { updateAppModueTs } from './update.app.module';

import { updateNgJson } from './update.angular.json';

import { MonacaApplicationOptions } from './schema';
import { updateAppComponentSpecTs } from './update.app.component.spec';
import { updateE2eProtractorConf } from './update.e2e.protractor.conf';

function overrideWith(
  options: MonacaApplicationOptions,
  workspace: WorkspaceSchema,
) {
  const filePath = {
    packageJson: join('package.json'),
    ngJson: join('angular.json'),
    ts: {
      vendor: join('src', 'vendor.ts'),
      mainApp: join('src/app', 'app.module.ts'),
      mainAppComponentSpec: join('src/app', '/app.component.spec.ts'),
    },
  };

  return (host: Tree) => {
    const dataPkgJSON = JSON.stringify(
      updatePakageJson(
        fileReadJsonText(host, filePath.packageJson),
        options.name,
      ),
      null,
      2,
    );
    host.overwrite(filePath.packageJson, dataPkgJSON);
    // angular.json update
    const dataNgJson = JSON.stringify(
      updateNgJson(
        fileReadJsonText(host, filePath.ngJson),
        workspace.newProjectRoot,
        options.name,
      ),
      null,
      2,
    );
    host.overwrite(filePath.ngJson, dataNgJson);

    updateAppModueTs(host, filePath.ts.mainApp);

    updateAppComponentSpecTs(host, filePath.ts.mainAppComponentSpec);

    updateE2eProtractorConf(host);

    return host;
  };
}

function injectMonaca(
  options: MonacaApplicationOptions,
  workspace: WorkspaceSchema,
) {
  const monacaLib = mergeWith(
    apply(url('../../node_modules/monaca-lib/src/template/components'), [
      template({
        utils: strings,
        ...options,
      }),
      move(join('src/components')),
    ]),
    MergeStrategy.Overwrite,
  );

  const local = mergeWith(
    apply(url('./files'), [
      template({
        utils: strings,
        dot: '.',
        ...options,
        cordova_version: latestVersions.cordovaVersion,
        framework_version: latestVersions.frameworkVersion,
        xcode_version: latestVersions.xcodeVersion,
        projectDirectory: join(
          workspace.newProjectRoot || '',
          options.name || '',
        ),
      }),
    ]),
    MergeStrategy.Overwrite,
  );

  return branchAndMerge(chain([monacaLib, local]), MergeStrategy.Overwrite);
}

function OverwriteOthersFile(
  options: MonacaApplicationOptions,
  _workspace: WorkspaceSchema,
) {
  return mergeWith(
    apply(url('./other-files'), [
      template({
        utils: strings,
        dot: '.',
        ...options,
      }),
      move('src/app'),
    ]),
    MergeStrategy.Overwrite,
  );
}

export function application(options: MonacaApplicationOptions): Rule {
  return (host: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(host);

    return chain([
      externalSchematic('@schematics/angular', 'application', options),
      branchAndMerge(
        chain([injectMonaca(options, workspace)]),
        MergeStrategy.Overwrite,
      ),
      overrideWith(options, workspace),
      branchAndMerge(
        chain([OverwriteOthersFile(options, workspace)]),
        MergeStrategy.Overwrite,
      ),
    ])(host, _context);
  };
}
