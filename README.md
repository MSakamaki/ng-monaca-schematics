# MONACA + Angular 5+ schematics 

[![Build Status](https://travis-ci.org/MSakamaki/-monaca-schematics.svg?branch=master)](https://travis-ci.org/MSakamaki/-monaca-schematics)
[![Build status(win)](https://ci.appveyor.com/api/projects/status/wikogf9fcyox6okh?svg=true)](https://ci.appveyor.com/project/MSakamaki/monaca-schematics)

[![DEPENDENCIES](https://david-dm.org/MSakamaki/-monaca-schematics.svg)](https://david-dm.org/MSakamaki/-monaca-schematics)
[![DEVDEPENDENCIES](https://david-dm.org/MSakamaki/-monaca-schematics.svg?type=dev)](https://david-dm.org/MSakamaki/-monaca-schematics?type=dev)

### install

```sh

npm install -g @angular/cli@6.0.0-rc.2
npm install -g @angular-devkit/schematics-cli@0.5.4

# building
git clone https://github.com/MSakamaki/-monaca-schematics.git
npm install
npm run build

# npm install @monaca/schematics
npm link <git clone directory>

```

### use

```sh

ng new <project name> -c @monaca/schematics [--name=<application name>]

```

### project development

#### local

 1. install a environment
   + install [Monaca Localkit](https://monaca.io/localkit.html) into local machine
   + Insert [Monaca Debugger](https://docs.monaca.io/en/products_guide/debugger/installation/) in mobile development machine
   + connect development machines to the same network
 2. run on a mobile device
   + run a `npm run build -- --prod` command.
   + Open `./project/[app name]/www` directory with `Monaca Localkit`
 3. to preview

#### remote

 1. monaca cloud initialized
   + copy or rename the file from `sample.monaca.config.json` to `monaca.config.json`
   + Write ID and password to `monaca.config.json`
   + `npm run [applicationName].init`
 2. remote debugging
   + `npm run [applicationName].upload`
   + open browser [monaca ide page](https://monaca.mobi/en/dashboard)
   + open youre project
   + to preview or run on device
 3. remote build
   + `npm run [applicationName].build`
   + open browser [monaca ide page](https://monaca.mobi/en/dashboard)
   + open youre project
   + open menu [buld] to build history
  

### feature

 + [ ] npm publish
 + [x] npm start
 + [x] npm build
 + add `ng generate`
   + [ ] component
 + [ ] monaca upload
 + [ ] monaca cloud buildsing

#### workflow and commands

 + install
   + [x] install command
   + [ ] template using
     + [ ] useing [monaca-lib template](https://github.com/monaca/monaca-lib/tree/master/src/template)
 + local building
   + [ ] server
   + [ ] genarate [monaca projectid](https://github.com/monaca/monaca-lib/blob/master/src/localkit.js#L229)
 + remote monaca 
   + [ ] upload monaca cloud
   + [ ] building monaca cloud

### run testing


```sh
# test
npm run test

```
