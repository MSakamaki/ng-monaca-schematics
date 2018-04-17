import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  externalSchematic,
} from '@angular-devkit/schematics';

import { MonacaWorkspaceOptions } from './schema';

export function workspace(options: MonacaWorkspaceOptions): Rule {
  // SEE: https://github.com/angular/devkit/pull/699
  // options.commit = {
  //   name: '@monaca/chematic',
  //   email: 'chematic@monaca.com',
  // };

  return (host: Tree, _context: SchematicContext) => {
    return chain([
      externalSchematic('@schematics/angular', 'workspace', options),
    ])(host, _context);
  };
}
