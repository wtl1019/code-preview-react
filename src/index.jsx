import React from 'react';
import ReactDOM from 'react-dom';
import CodeMiddle from './modules/codeMiddle';
import CodeTreeMiddle from './modules/codeTreeMiddle';
import ShadowView from './components/shadow';
// import 'antd/dist/antd.css';

window.codeDispalyModel = {
  renderCodeDisplay: function () {
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
        <ShadowView>
          {
            singleFileCode 
              ? <CodeMiddle repoId={repoId} repoSrc={repoSrc} repoCode={singleFileCode} codeType={codeType} tryTitle={tryTitle} qrCodeUrl={qrCodeUrl} />
              : <CodeTreeMiddle repoId={repoId} repoSrc={repoSrc} defaultOpen={repoOpen} targetPath={repoTarget} tryTitle={tryTitle} qrCodeUrl={qrCodeUrl} />
          }
        </ShadowView>,
        domContainer
      );
    });
  }
}
