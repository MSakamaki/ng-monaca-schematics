import { Rule, SchematicContext, Tree, externalSchematic, chain } from '@angular-devkit/schematics';

import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function workspace(options: WorkspaceOptions): Rule {
  return chain([
    (_tree: Tree, context: SchematicContext) => {
      context.logger.info('workspace Action: ' + JSON.stringify(options));
    },
    externalSchematic('@schematics/angular', 'workspace', options),
  ]);
}
