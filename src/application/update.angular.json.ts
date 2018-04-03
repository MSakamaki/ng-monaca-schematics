export const updateNgJson = (originJson: any, _projectName: string = '', _appName: string = '') => {
  originJson.projects[_appName].architect.build.options.styles =
    originJson.projects[_appName].architect.build.options.styles.concat([
      {
        "input": "node_modules/onsenui/css/onsen-css-components.css"
      },
      {
        "input": "node_modules/onsenui/css/onsenui.css"
      }
    ])
  return originJson;
}
