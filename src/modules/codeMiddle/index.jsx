import CodeDispaly from './components/code.jsx';
import QRCode from 'qrcode.react';
import { Button } from 'antd';
import { serverDomain, codeDisplayConfig } from '../../config/constant.js';
import axios from 'axios';

/**
 * 分流：
 * 1. 单文件代码展示组件
 * 2. 单文件---带试一试---代码展示组件
 */
const CodeMiddle = function (props) {
  let {
    repoId,
    repoSrc,
    repoCode,
    defaultOpen = codeDisplayConfig.singleFilePath,
    tryTitle,
    qrCodeUrl
  } = props;

  // 单文件： 新建分支保存文件，同时打开 ide
  const handleOpenIde = () => {
    const newBranch = `ajx-demo-try-${new Date().getTime()}`;

    // 1. 新建分支
    axios({
      method: 'post',
      url: `${codeDisplayConfig.createBranch}`,
      data: {
        id: repoId,
        branch_name: newBranch,
        ref: 'master'
      }
    }).then((res) => {
      console.log('create/branch===>', res)
      if (res.status === 200 && res.data.code !== 0) {
        updateBranchFile({
          projectId: repoId,
          branch_name: newBranch,
          commit_message: 'modify some',
          content: repoCode,
          file_path: codeDisplayConfig.singleFilePath
        }).then((res) => {
          console.log('update/file===>', res)
          if (res.status === 200 && res.data.code === 1) {
            window.ideWindow.postMessage('create and write file success', serverDomain)
          }
        })
      } else {
        setTimeout(() => {
          window.ideWindow.postMessage('create fail', serverDomain)
        }, 3000)
      }
    })

    // 2. 打开webide
    window.ideWindow = window.open(`${codeDisplayConfig.ideRoutePre}?id=${repoId}&source=${repoSrc}&branch=${newBranch}&open=${defaultOpen}`);
  }

  const updateBranchFile = (data) => {
    return axios({
      method: 'post',
      url: `${codeDisplayConfig.updateFile}`,
      data: data
    })
  }

  return (
    <CodeDispaly
      {...props}
      posStyle={qrCodeUrl ? { right: '300px' } : {}}
      handleOpenIde={ handleOpenIde }
      topNode={
        tryTitle || qrCodeUrl
          ? <div className="cp_sg_top">
            <h1>{tryTitle || '示例'}</h1>
            <Button type="primary" onClick={handleOpenIde}>试一试</Button>
          </div>
          : null
      }
      previewNode={
        qrCodeUrl
          ? <div className="preview">
              <h3 className="tip">
                请使用<span><a style={{ color: "#1890ff" }} href="http://30.28.11.32:8888/server2/vpage?id=c749fae3503e65a572dc6056fe36953d" target="blank">【AMAP调试包】</a></span>
                <br />
                扫码预览
              </h3>
              <QRCode
                value={qrCodeUrl}
                size={200} // 二维码的大小
              />
            </div>
          : null
      }
    />
  )
}

export default CodeMiddle;
