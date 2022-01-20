import React from 'react';
import ReactDOM from 'react-dom';
import CodeMiddle from './modules/codeMiddle';
import CodeTreeMiddle from './modules/codeTreeMiddle';
import ShadowView from './components/shadow';
import 'antd/dist/antd.css';
import './styles/codepreview.css';
import reportWebVitals from './reportWebVitals';

document.querySelectorAll('.git_repo_container').forEach(domContainer => {
  const {
    repoId,
    repoSrc,
    repoTarget,
    codeType,
    repoOpen,
    tryTitle,
    qrCodeUrl
  }  = domContainer.dataset;
  
  var singleFileCode = (domContainer.firstElementChild && domContainer.firstElementChild.value) || domContainer.innerText;

  ReactDOM.render(
    <>
      {
        singleFileCode 
          ? <CodeMiddle repoId={repoId} repoSrc={repoSrc} repoCode={singleFileCode} codeType={codeType} tryTitle={tryTitle} qrCodeUrl={qrCodeUrl} />
          : <CodeTreeMiddle repoId={repoId} repoSrc={repoSrc} defaultOpen={repoOpen} targetPath={repoTarget} tryTitle={tryTitle} qrCodeUrl={qrCodeUrl} />
      }
    </>,
    domContainer
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
