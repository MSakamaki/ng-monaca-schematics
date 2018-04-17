import { execSync } from 'child_process';
import { statSync } from 'fs';
import { join } from 'path';

// tslint:disable-next-line:max-line-length
const replaceCmdColorExp = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

const projectName = 'myapp';

const conf = {
  global: {
    ng: 'ng',
  },
  root: {
    _: '.',
    del: join('.', 'node_modules', '.bin', 'del-cli'),
  },
  tmp: {
    _: join('.', 'e2e', '_tmp'),
    ng: join('..', '..', 'node_modules', '.bin', 'ng'),
  },
  app: {
    _: join('.', 'e2e', '_tmp', projectName),
    ng: join('.', 'node_modules', '.bin', 'ng'),
  },
};

/** test init */
export function Init() {
  clean();

  if (!exists(conf.app._)) {
    postinstall();

    return ngNew(`${projectName} --collection=@monaca/schematics`);
  } else {
    throw `exests e2e/_tmp${projectName} directory!`;
  }
}

/** run angular/cli command line */
export const ngCli = (command: string) =>
  execSync(`${conf.tmp.ng} ${command}`, { cwd: conf.tmp._ })
    .toString()
    .replace(replaceCmdColorExp, '');

/** run create app project building */
export const ngBuild = (args = '') =>
  execSync(`${conf.app.ng} build ${args}`, { cwd: conf.app._ })
    .toString()
    .replace(replaceCmdColorExp, '');

/** run linting project building */
export const ngLint = (args = '') =>
  execSync(`${conf.app.ng} lint ${args}`, { cwd: conf.app._ })
    .toString()
    .replace(replaceCmdColorExp, '');

/** run unit testing project building */
export const ngTest = (args = '') =>
  execSync(`${conf.app.ng} test ${args}`, { cwd: conf.app._ })
    .toString()
    .replace(replaceCmdColorExp, '');

/** run command line */
export const projectCli = (command: string) =>
  execSync(command, { cwd: conf.app._ })
    .toString()
    .replace(replaceCmdColorExp, '');

const ngNew = (command: string) =>
  execSync(
    `${process.env.APPVEYOR ? conf.global.ng : conf.tmp.ng} new ${command}`,
    { cwd: conf.tmp._ },
  ).toString();

const postinstall = () => execSync(`npm run postinstall`, { cwd: conf.root._ });

const clean = () =>
  execSync(`${conf.root.del} ${conf.app._}`, { cwd: conf.root._ });

const exists = (path: string) => {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
};
