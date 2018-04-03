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

function updateGitIgnore(options: MonacaWorkspaceOptions) {
  const filePath = '.gitignore';

  return (host: Tree, context: SchematicContext) => {
    context.logger.info('updateGitIgnore Action: ' + JSON.stringify(options));

    host.overwrite(filePath, fileReadText(host, filePath) + appendGitIgnore);
    return host;
  };
}

function overwriteMonaca(options: MonacaWorkspaceOptions) {
  return mergeWith(apply(url('./files'), [
    template({
      ...strings,
      dot: '.',
      ...options,
    }),
  ]), MergeStrategy.Overwrite);
}

export function workspace(options: MonacaWorkspaceOptions): Rule {
  return (host: Tree, _context: SchematicContext) => {
    // const workspace = getWorkspace(host);
    return chain([
      externalSchematic('@schematics/angular', 'workspace', options),
      branchAndMerge(chain([
        overwriteMonaca(options),
      ]), MergeStrategy.Overwrite),
      updateGitIgnore(options),
    ])(host, _context);
  };

}
