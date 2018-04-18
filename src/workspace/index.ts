import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  externalSchematic,
} from '@angular-devkit/schematics';

import { MonacaWorkspaceOptions } from './schema';

export function workspace(options: MonacaWorkspaceOptions): Rule {
  return (host: Tree, _context: SchematicContext) => {
    return chain([
      externalSchematic('@schematics/angular', 'workspace', options),
    ])(host, _context);
  };
}
