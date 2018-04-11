import {
  Rule,
  SchematicContext,
  Tree,
  externalSchematic,
  chain,
  mergeWith,
  apply,
  url,
  template,
  MergeStrategy,
  branchAndMerge
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
  return mergeWith(apply(url('./files'), [
    template({
      utils: strings,
      dot: '.',
      ...options,
    }),
  ]), MergeStrategy.Overwrite);
}

export function workspace(options: MonacaWorkspaceOptions): Rule {
  // TODO: correct val
  options.commit = {
    name: '@monaca/schema',
    email: 'schema@monaca.com',
  };
  return (host: Tree, _context: SchematicContext) => {
    return chain([
      externalSchematic('@schematics/angular', 'workspace', options),
      branchAndMerge(chain([
        overwriteMonaca(options),
      ]), MergeStrategy.Overwrite),
      updateGitIgnore(options),
    ])(host, _context);
  };

}
