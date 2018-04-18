import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  externalSchematic,
} from '@angular-devkit/schematics';
import { join } from 'path';
import { ComponentMonacaOptions } from './schema';

import { updateAppComponentSpecTs } from '../utility/update.app.component.spec';

function overrideWith(options: ComponentMonacaOptions) {
  return (host: Tree) => {
    updateAppComponentSpecTs(
      host,
      join('/src/app', options.name, `${options.name}.component.spec.ts`),
    );

    return host;
  };
}

/**
 * creta monaca component
 * @param _options MonacaConponentOption
 */
export function monacaComponent(options: ComponentMonacaOptions): Rule {
  return (host: Tree, _context: SchematicContext) => {
    return chain([
      externalSchematic('@schematics/angular', 'component', options),
      overrideWith(options),
    ])(host, _context);
  };
}
