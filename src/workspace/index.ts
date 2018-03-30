import { Rule, SchematicContext, Tree, externalSchematic, chain } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function workspace(options: any): Rule {
  return chain([
    (_tree: Tree, context: SchematicContext) => {
      console.log(JSON.stringify(options));
      context.logger.info('workspace Action: ' + JSON.stringify(options));
    },
    externalSchematic('@schematics/angular', 'workspace', options),
    (tree: Tree, _context: SchematicContext) => {
      tree.getDir(options.sourceDir)
          .visit(filePath => {
            if (!filePath.endsWith('.ts')) {
              return;
            }
            const content = tree.read(filePath);
            if (!content) {
              return;
            }

          });
      return tree;
    },
  ]);
}
