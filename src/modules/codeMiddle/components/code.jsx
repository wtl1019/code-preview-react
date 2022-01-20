import { useState, useEffect } from 'react';
import CodeMirror from 'react-codemirror';
import ActionTools from '../../../components/tool';


/**
 * 单文件代码展示组件
 */
const CodeDispaly = function (props) {
  const [code, setCode] = useState('');

  const {
    repoCode,
    codeType = 'javascript',
    topNode,
    previewNode,
    handleOpenIde
  } = props;

  useEffect(() => {
    setTimeout(() => {
      setCode(repoCode)
    }, 1500)
  }, [repoCode])

  return (
    <div className="code_preview_sigle_wrap">
      {
        topNode
      }
      <div className={`cp_sg_content ${!topNode ? 'cp_sg_content_notitle' : ''}`}>
        <div className="code">
          {
            code &&
            <CodeMirror
              value={code}
              options={{
                mode: codeType,
                readOnly: true,
                lineNumbers: true,
                lineWrapping: true,
              }}
              onChange={(editor, data, value) => { }}
            />
          }
        </div>
        {
          previewNode
        }
        <ActionTools
          copyTxt={code}
          {...props}
          handleOpenIde={handleOpenIde}
        />
      </div>
    </div>
  );
}

export default CodeDispaly;
