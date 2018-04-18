export const updateNgJson = (
  originJson: any,
  _projectName = '',
  _appName = '',
) => {
  // see: https://github.com/angular/devkit/issues/249
  // originJson.extends = [
  //   '@schematics/angular',
  //   'ng-monaca-schematics'
  // ];

  originJson.schematics = {
    component: {
      extends: 'ng-monaca-schematics',
    },
  };

  originJson.projects[_appName].architect.build.options = {
    ...originJson.projects[_appName].architect.build.options,
    outputPath: `www`,
    assets: originJson.projects[_appName].architect.build.options.assets.concat(
      [
        {
          glob: '**/*',
          input: `src/components`,
          output: 'components',
        },
      ],
    ),
    styles: originJson.projects[_appName].architect.build.options.styles.concat(
      [
        {
          input: 'node_modules/onsenui/css/onsen-css-components.css',
        },
        {
          input: 'node_modules/onsenui/css/onsenui.css',
        },
        {
          input: `src/components/loader.css`,
        },
        {
          input: `src/css/style.css`,
        },
      ],
    ),
    scripts: originJson.projects[
      _appName
    ].architect.build.options.scripts.concat([
      {
        input: `src/components/loader.js`,
      },
    ]),
  };

  return originJson;
};
