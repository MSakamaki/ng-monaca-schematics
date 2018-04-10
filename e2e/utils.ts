import { execSync } from 'child_process';
import { statSync } from 'fs';

const replaceCmdColorExp = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
const projectName = 'myapp';
const conf = {
  workDir: './e2e/_tmp',
  projectDir: `./e2e/_tmp/${projectName}`,
  ng: '../../node_modules/.bin/ng',
  iNg: './node_modules/.bin/ng'
};

/** test init */
export function Init() {

  clean();

  if (!exists(conf.projectDir)) {
    return ngNew(`${projectName} --collection=@monaca/schematics`);
  } else {
    throw `exests e2e/_tmp${projectName} directory!`;
  }
}

/** run angular/cli command line */
export const ngCli = (command: string) => execSync(`${conf.ng} ${command}`, { cwd: conf.workDir }).toString().replace(replaceCmdColorExp, '');

/** run create app project building */
export const ngBuild = (args: string = '') => execSync(`${conf.iNg} build ${args}`, { cwd: conf.projectDir }).toString().replace(replaceCmdColorExp, '');

/** run linting project building */
export const ngLint = (args: string = '') => execSync(`${conf.iNg} lint ${args}`, { cwd: conf.projectDir }).toString().replace(replaceCmdColorExp, '');

/** run unit testing project building */
export const ngTest = (args: string = '') => execSync(`${conf.iNg} test ${args}`, { cwd: conf.projectDir }).toString().replace(replaceCmdColorExp, '');

/** run command line */
export const projectCli = (command: string) => execSync(command, { cwd: conf.projectDir }).toString().replace(replaceCmdColorExp, '');


const ngNew = (command: string) => execSync(`${conf.ng} new ${command}`, { cwd: conf.workDir }).toString();

const clean = () => execSync(`rm -rf ${conf.projectDir}`);
const exists = (path: string) => {
  try {
    return statSync(path).isDirectory();
  } catch{
    return false;
  }
};

