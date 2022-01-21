

// todo wtl
export const serverDomain = 'http://localhost:6001'; // 'http://ajxtool.amap.test'; 


export const codeDisplayConfig = {
  treeApiPath: `${serverDomain}/playground/repo/tree`,
  fileApiPath: `${serverDomain}/playground/repo/file`,
  createBranch: `${serverDomain}/playground/repo/add/branch`,
  updateFile: `${serverDomain}/playground/repo/update/file`,
  ideRoutePre: `${serverDomain}/#/webide`,
  singleFilePath: 'src/pages/index.page',
  // ideFileRoutePre: `${serverDomain}/#/webidefile`,
  cssLinks: [
    'http://30.28.11.32:8888/css/code_preview.css',
    'http://30.28.11.32:8888/css/libs/codemirror.css',
    'http://30.28.11.32:8888/css/libs/antd.min.css'
  ]
}
