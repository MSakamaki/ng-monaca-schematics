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
  template,
  url,
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';
import { MonacaWorkspaceOptions } from './schema';

import { fileReadText } from '../utility/readTree';

const appendGitIgnore = `
# monaca settings
monaca.config.json
`;

function updateGitIgnore(_options: MonacaWorkspaceOptions) {
  const filePath = '.gitignore';

  return (host: Tree, _context: SchematicContext) => {
    host.overwrite(filePath, fileReadText(host, filePath) + appendGitIgnore);

    return host;
  };
}

function overwriteMonaca(options: MonacaWorkspaceOptions) {
  return mergeWith(
    apply(url('./files'), [
      template({
        utils: strings,
        dot: '.',
        ...options,
      }),
    ]),
    MergeStrategy.Overwrite,
  );
}

export function workspace(options: MonacaWorkspaceOptions): Rule {
  // SEE: https://github.com/angular/devkit/pull/699
  options.commit = {
    name: '@monaca/chematic',
    email: 'chematic@monaca.com',
  };

  return (host: Tree, _context: SchematicContext) => {
    return chain([
      externalSchematic('@schematics/angular', 'workspace', options),
      branchAndMerge(
        chain([overwriteMonaca(options)]),
        MergeStrategy.Overwrite,
      ),
      updateGitIgnore(options),
    ])(host, _context);
  };
}
