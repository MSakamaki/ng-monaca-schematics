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
  template
} from '@angular-devkit/schematics';
import { Schema as ApplicationOptions } from '@schematics/angular/application/schema';

function overrideWith(options: ApplicationOptions) {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info('overrideWith Action: ' + JSON.stringify(options));
  };
}


function injectMonaca(options: ApplicationOptions, _host: Tree) {
  console.log('injectMonaca rerutn');
  return mergeWith(apply(url('./files'), [
    template({
      ...strings,
      // 'if-flat': (s: string) => options.flat ? '' : s,
      dot: '.',
      ...options,
    }),
    move(options.name)
  ]), MergeStrategy.Overwrite);
}


export function application(options: ApplicationOptions): Rule {
  return chain([
    branchAndMerge(chain([
      externalSchematic('@schematics/angular', 'application', options),
      overrideWith(options),
      (host: Tree, context: SchematicContext) => injectMonaca(options, host)(host, context),
    ]), MergeStrategy.ContentOnly),
  ],);
}
