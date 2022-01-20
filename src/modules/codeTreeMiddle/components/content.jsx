import { useState, useEffect, } from 'react';
import CodeMirror from 'react-codemirror';
import ActionTools from '../../../components/tool';
import { Tabs } from 'antd';
import { checkImgType, fileMode, transformArrayBufferToBase64 } from '../../../utils'


import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';

import 'codemirror/lib/codemirror.css';


// 右侧内容区组件 start
const TreeContent = (props) => {
  let {
    panes,
    activeKeyProp,
    updateTabsData,
    posStyle,
    handleOpenIde
  } = props;

  const [activeKey, setActiveKey] = useState('newTab0');

  useEffect(() => {
    setActiveKey(activeKeyProp)
  }, [activeKeyProp])

  const onChange = activeKey => {
    setActiveKey(activeKey);
  };

  const remove = targetKey => {
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const restArry = panes.filter(pane => pane.key !== targetKey);
    let tmp = ''
    if (restArry.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        tmp = restArry[lastIndex].key;
      } else {
        tmp = restArry[0].key;
      }
    }
    updateTabsData(restArry, tmp)
  };

  const onEdit = (targetKey, action) => {
    console.log(111, targetKey, action)
    remove(targetKey);
  };

  return (
    <Tabs
      hideAdd
      onChange={onChange}
      activeKey={activeKey}
      type="editable-card"
      onEdit={onEdit}
    >
      {
        panes.map(pane => (
          <Tabs.TabPane tab={pane.title} key={pane.key}>
            {
              checkImgType(pane.title)
                ? <div className="image-wrapper">
                    <img id={`active-img-${pane.key}`} src={`data:image/png;base64,${transformArrayBufferToBase64(pane.content)}`} alt=""></img>
                  </div>
                : <CodeMirror
                  value={pane.content}
                  options={{
                    mode: fileMode(pane.title),
                    readOnly: true,
                    lineNumbers: true,
                    lineWrapping: true,
                  }}
                  onChange={(editor, data, value) => { }}
                  editorDidMount={(editor, value, initCb) => {
                    // updateCurrentEditorCode(value)
                  }}
                />
            }
            <ActionTools
              imgId={checkImgType(pane.title) ? `active-img-${pane.key}` : ''}
              copyTxt={pane.content}
              posStyle={posStyle}
              handleOpenIde={handleOpenIde}
            />
          </Tabs.TabPane>
        ))
      }
    </Tabs>
  );
}


export default TreeContent;
