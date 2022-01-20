import { useState, useEffect } from 'react';
import TreeContent from './content';
import { codeDisplayConfig } from '../../../config/constant.js';
import { formatTreeData, formatRepoData, checkImgType } from '../../../utils'
import { Tree } from 'antd';
import axios from 'axios';

var Buffer = require('buffer/').Buffer;


const CodeTree = function(props) {
  const {
    repoId,
    repoSrc,
    targetPath = '/',
    defaultOpen="README.md",
    topNode,
    previewNode,
    posStyle,
    handleOpenIde
  } = props;

  const [treeData, setTreeData] = useState([]);

  const [tabsData, setTabsData] = useState([]);
  const [activeKey, setActiveKey] = useState('newTab0');
  const [count, setCount] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    // 1. 根据 repoId 读取远程代码
    axios.get(`${codeDisplayConfig.treeApiPath}?id=${repoId}&path=${targetPath}`).then((response) => {
      if (response.status === 200) {
        setTreeData(formatRepoData(response.data.data))
      }
    })
    
    let defaultOpenPath = (targetPath !== '/' ? `${targetPath}/` : '/') + defaultOpen;
    axios.get(`${codeDisplayConfig.fileApiPath}?id=${repoId}&path=${defaultOpenPath}`).then((response) => {
      if (response.status === 200) {
        // 2. TODO codemirror显示获取的代码，到对应的节点node
        handleAddTab(defaultOpenPath.slice(1), defaultOpen, response.data)
      }
    })
  }, [])

  const updateTabsData = (newPanes, newActiveKey) => {
    setTabsData(() => newPanes)
    setActiveKey(newActiveKey)
  }

  const handleLoad = ({key, children, path}) =>
    new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }
      axios.get(`${codeDisplayConfig.treeApiPath}?id=${repoId}&path=/${path}`).then((response) => {
        if (response.status === 200) {
          setTreeData((origin) =>
            formatTreeData(origin, key, formatRepoData(response.data.data, key)),
          );
          resolve();
        }
      })
  });

  // 选中树节点： 1.更新内容、2.更新tab(重复判断)、3.更新编辑器代码
  const handleSelect = (selectedKeys, {node}) => {
    let { path, title, isLeaf } = node;
    // 文件夹，不查询
    if (!isLeaf) return

    const isExist = tabsData.filter(item => item.path === path).length > 0;
    // 选中的节点：
    // 不存在: 新增
    // 存在: 右侧联动切换选中tab
    if (!isExist) {
      axios({
        method: 'get',
        url: `${codeDisplayConfig.fileApiPath}?id=${repoId}&path=/${path}`,
        responseType: 'arraybuffer',
      }).then((res) => {
        if (res.status === 200) {
          // 图片文件流
          if(checkImgType(title)) {
            handleAddTab(path, title, Buffer.from(res.data))
          } else {
            handleAddTab(path, title, Buffer.from(res.data).toString('utf-8'))
          }
        }
      })
    } else {
      let changeKey = tabsData.filter(item => item.path === path)[0].key;
      setActiveKey(changeKey)
    }
  };

  const handleAddTab = (path, name, code) => {
    const activeKey = `newTab${count}`;
    setCount(count + 1)

    updateTabsData([
      ...tabsData, 
      { title: `${name}`, content: code, key: activeKey, path }
    ], activeKey)
  }

  return (
    <div className="code_preview_multiple_wrap">
      { topNode }
      <div className={`cp_mt_content ${!topNode  ? 'cp_mt_content_notitle' : ''}`}>
        <div className="left-nav">
          {/* 最左侧文件搜索区域 */}
          <div className="l-n-tool">
            <span><i className="iconfont icon-book"></i></span>
            <span><i className="iconfont icon-search"></i></span>
          </div>
          {/* 左侧文件树区域 */}
          <Tree.DirectoryTree
            showIcon
            className='l-n-tree'
            switcherIcon={<i className="iconfont icon-arrow-right-bold"></i>}
            onSelect={handleSelect}
            loadData={handleLoad}
            expandedKeys={expandedKeys}
            onExpand={(keys, { nativeEvent }) => {
              setExpandedKeys(keys);
            }}
            treeData={treeData}
          />
        </div>
        <div className="right-content">
          <TreeContent
            repoId={repoId}
            repoSrc={repoSrc}
            defaultOpen={defaultOpen}
            panes={tabsData}
            activeKeyProp={activeKey}
            updateTabsData={updateTabsData}
            posStyle={posStyle}
            handleOpenIde={handleOpenIde}
          />
        </div>
        { previewNode }
      </div>
    </div>
  );
}

export default CodeTree;
