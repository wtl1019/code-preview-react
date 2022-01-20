import { Component } from 'react';
import ReactDOM from 'react-dom';
// import { codeDisplayConfig } from '../config/constant';
import '../styles/codepreview.css';

// 利用 ReactDOM.createPortal 的实现 Shadow Dom
function ShadowContent({ root, children }) {
  return ReactDOM.createPortal(children, root);
}
/**
 *  Shadow Dom 组件
 */
class ShadowView extends Component {
  state = {
    root: null
  };

  setRoot = elemnt => {
    const root = elemnt.attachShadow({ mode: "open" });

    // codeDisplayConfig.cssLinks.forEach(item => {
    //   const linkElem = document.createElement('link');
    //   linkElem.setAttribute('rel', 'stylesheet');
    //   linkElem.setAttribute('href', item);
    //   root.appendChild(linkElem);
    // });

    this.setState({ root });
  };

  render() {
    const { root } = this.state;
    const { children } = this.props;
    return (
      <div ref={this.setRoot}>
        {
          root && <ShadowContent root={root} >{children}</ShadowContent>
        }
      </div>
    )
  }
}

export default ShadowView;
