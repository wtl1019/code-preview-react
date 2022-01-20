

export const serverDomain = 'http://localhost:6001'; //'http://ajxtool.amap.test'; // 


export const codeDisplayConfig = {
  treeApiPath: `${serverDomain}/playground/repo/tree`,
  fileApiPath: `${serverDomain}/playground/repo/file`,
  createBranch: `${serverDomain}/playground/repo/add/branch`,
  updateFile: `${serverDomain}/playground/repo/update/file`,
  ideRoutePre: `${serverDomain}/#/webide`,
  singleFilePath: 'src/pages/index.page',
  // ideFileRoutePre: `${serverDomain}/#/webidefile`,
  cssLinks: [
    '../styles/codepreview.css',
  ]
}
