
import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  apply,
  chain,
  empty,
  mergeWith,
  move,
  schematic,
} from '@angular-devkit/schematics';
import {
  NodePackageInstallTask,
  NodePackageLinkTask,
  RepositoryInitializerTask,
} from '@angular-devkit/schematics/tasks';

import { NgNewMonacaOptions } from './schema';
import { MonacaApplicationOptions } from '../application/schema';
import { MonacaWorkspaceOptions } from '../workspace/schema';

export function ngNew(options: NgNewMonacaOptions): Rule {
  if (!options.name) {
    throw new SchematicsException(`Invalid options, "name" is required.`);
  }

  if (!options.directory) {
    options.directory = options.name;
  }

  const workspaceOptions: MonacaWorkspaceOptions = {
    name: options.name,
    version: options.version,
    newProjectRoot: options.newProjectRoot || 'projects',
  };
  const applicationOptions: MonacaApplicationOptions = {
    name: options.name,
    inlineStyle: options.inlineStyle,
    inlineTemplate: options.inlineTemplate,
    viewEncapsulation: options.viewEncapsulation,
    routing: options.routing,
    style: options.style,
    skipTests: options.skipTests,
    skipPackageJson: false,
  };

  return chain([
    mergeWith(
      apply(empty(), [
        schematic('workspace', workspaceOptions),
        schematic('application', applicationOptions),
        move(options.directory || options.name),
        tree => Tree.optimize(tree),
      ]),
    ),
    (_host: Tree, context: SchematicContext) => {
      let packageTask;
      if (!options.skipInstall) {
        packageTask = context.addTask(new NodePackageInstallTask(options.directory));
        if (options.linkCli) {
          packageTask = context.addTask(
            new NodePackageLinkTask('@angular/cli', options.directory),
            [packageTask],
          );
        }
      }
      if (!options.skipGit) {
        const commit = typeof options.commit == 'object'
          ? options.commit
          : (!!options.commit ? {} : false);

        context.addTask(
          new RepositoryInitializerTask(
            options.directory,
            commit,
          ),
          packageTask ? [packageTask] : [],
        );
      }
    },
  ]);
}
