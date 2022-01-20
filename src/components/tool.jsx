import { useState } from 'react';
import { copy } from '../utils'

// 悬浮工具组件
const ActionTools = (props) => {
  const [tip, setTip] = useState('复制');

  const { imgId, copyTxt, posStyle, handleOpenIde } = props;

  const handleCopy = () => {
    copy.actionCopy({
      id: imgId,
      msg: copyTxt,
      cb: () => {
        setTip('复制成功')
        setTimeout(() => {
          setTip('复制')
        }, 1000)
      }
    });
  }

  return (
    <div>
      <div className="r-c-tools" style={posStyle}>
        <div className="floatIcon" title="全屏显示" onClick={handleOpenIde}>
          <i className="iconfont icon-fullscreen"></i>
        </div>
        <div className="floatIcon" title="复制" onClick={handleCopy}>
          <i className="iconfont icon-copy"></i>
        </div>
      </div>
      <div className="r-c-tools2" style={posStyle ? { ...posStyle, top: '60px' } : {}} onClick={handleCopy}>
        <span id="copy-tip">{tip}</span>
      </div>
    </div>
  )
}

export default ActionTools;
