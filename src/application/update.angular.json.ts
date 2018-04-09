export const updateNgJson = (originJson: any, _projectName: string = '', _appName: string = '') => {

  // see: https://github.com/angular/devkit/issues/249
  // originJson.extends = [
  //   '@schematics/angular',
  //   '@monaca/schematics'
  // ];

  originJson.schematics = {
    component: {
      extends: '@monaca/schematics'
    }
  };

  originJson.projects[_appName].architect.build.options = {
    ...originJson.projects[_appName].architect.build.options,
    outputPath: `${_projectName}/${_appName}/www`,
    assets: originJson.projects[_appName].architect.build.options.assets.concat([
      {
        glob: '**/*',
        input: `${_projectName}/${_appName}/src/components`,
        output: 'components'
      }
    ]),
    styles: originJson.projects[_appName].architect.build.options.styles.concat([
      {
        input: 'node_modules/onsenui/css/onsen-css-components.css'
      },
      {
        input: 'node_modules/onsenui/css/onsenui.css'
      },
      {
        input: `projects/${_appName}/src/components/loader.css`
      },
      {
        input: `projects/${_appName}/src/css/style.css`
      }
    ]),
    scripts: originJson.projects[_appName].architect.build.options.scripts.concat([
      {
        input: `${_projectName}/${_appName}/src/components/loader.js`
      }
    ]),
  };

  return originJson;
}
