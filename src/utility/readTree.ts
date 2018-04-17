import { SchematicsException } from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';

export const fileReadJsonText = (host: Tree, path: string): JSON =>
  JSON.parse(fileReadText(host, path));

export const fileReadText = (host: Tree, path: string): string =>
  fileReadSource(host, path).toString('utf-8');

export const fileReadSource = (host: Tree, path: string): Buffer => {
  const source = host.read(path);
  if (source === null) {
    throw new SchematicsException(`File ${path} does not exist.`);
  }
  return source;
};
