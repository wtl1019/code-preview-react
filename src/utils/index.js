
// 工具函数 start
export const checkImgType = (filename) => {
  // 用文件名name后缀判断文件类型，可用size属性判断文件大小不能超过500k ， 前端直接判断的好处，免去服务器的压力。  
  return /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(filename);
}


export const transformArrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  for (var len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}


export const fileMode = (filename) => {
  switch (filename.substring(filename.lastIndexOf('.') + 1)) {
    case 'ts':
    case 'tsx':
    case 'js':
      return 'javascript';
    case 'xml':
    case 'html':
      return 'htmlmixed';
    case 'md':
      return 'markdown';
    case 'json':
      return 'application/json';
    case 'css':
    case 'less':
      return 'text/css';
    default:
      return 'javascript'
  }
}

/**
[ { id: "ca6c31bc551fd3852a5c7fa09f79c3f62735d054", name: "src", type: "tree" } ]
转为
[ { title: "src", key: '0' }, { title: "package.json", key: '1', isLeaf: true} ]
*/
export const formatRepoData = (list, key) => {
  return list.map((ls, index) => ({
    key: key ? `${key}-${index}` : `${index}`,
    title: ls.name,
    path: ls.path,
    isLeaf: ls.type === 'blob',
    // icon: <i className={ls.type === 'blob' ? 'ai-file-text' : 'ai-folder-open'}></i>,
    icon: ls.type === 'blob' ? <i className="iconfont icon-file-text"></i> : <i className="iconfont icon-folder-fill"></i>
  }))
}


export const formatTreeData = (list, key, children) => {
  return list.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    }
    if (node.children) {
      return {
        ...node,
        children: formatTreeData(node.children, key, children)
      };
    }
    return { ...node };
  });
}


export const copy = {
  actionCopy(copyEle) {
    let { id, msg, cb } = copyEle;
    try {
      id ? copy.imgCopy(id) : copy.clipCopy(msg);
    } catch (e) {
      copy.inputCopy(msg)
    } finally {
      // 如果有回调则执行回调函数
      if (cb) cb();
    }
  },
  imgCopy(id) {
    const selection = window.getSelection();
    // 清除选中
    if (selection.rangeCount > 0) selection.removeAllRanges();
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/queryCommandSupported
    if (!document.queryCommandSupported('copy')) return alert('浏览器暂不支持复制命令');
    // 创建range区域
    const range = document.createRange();
    range.selectNode(document.querySelector(`#${id}`));
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
  },
  inputCopy(data) {
    var aux = document.createElement("input");
    aux.setAttribute("value", data);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  },
  clipCopy(data) {
    document.addEventListener('copy', function copy(e) {
      e.clipboardData.setData('text/plain', data);
      e.preventDefault();
    })
    document.execCommand('copy');
    document.removeEventListener('copy', 'copy');
  }
}
// 工具函数 end
