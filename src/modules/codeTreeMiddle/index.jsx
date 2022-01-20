

import CodeTree from './components/codeTree';
import QRCode from 'qrcode.react';
import { Button } from 'antd';
import axios from 'axios';

import { serverDomain, codeDisplayConfig } from '../../config/constant.js';


/**
 * 多文件树代码展示组件
 * qrCodeUrl 显示二维码预览区域
 * tryTitle 显示顶部头
 */
const CodeTreeMiddle = function (props) {

  let {
    repoId,
    repoSrc,
    defaultOpen,
    tryTitle,
    qrCodeUrl
  } = props;


  // 与单文件中间页的唯一区别，打开ide是否需要新建分支的逻辑分叉
  // const handleOpenIde = () => {
  //   window.ideWindow = window.open(`${codeDisplayConfig.ideRoutePre}?id=${repoId}&source=${repoSrc}${defaultOpen ? `&open=${defaultOpen}` : ''}`);
  // }

  // 多文件： 新建分支保存，同时打开 ide
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
      if (res.status === 200 && res.data.code === 1) {
        window.ideWindow.postMessage('create and write file success', serverDomain)
      } else {
        setTimeout(() => {
          window.ideWindow.postMessage('create fail', serverDomain)
        }, 3000)
      }
    })

    // 2. 打开webide
    window.ideWindow = window.open(`${codeDisplayConfig.ideRoutePre}?id=${repoId}&source=${repoSrc}&branch=${newBranch}${defaultOpen ? `&open=${defaultOpen}` : ''}`);
  }


  return (
    <CodeTree
      {...props}
      posStyle={qrCodeUrl ? { right: '300px' } : {}}
      handleOpenIde={handleOpenIde}
      topNode={
        tryTitle
          ? <div className="cp_mt_top">
            <h1>{tryTitle}</h1>
            {/* <a onClick={handleOpenIde}>试一试</a> */}
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
  );
}

export default CodeTreeMiddle;
