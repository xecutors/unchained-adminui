import React from 'react';
import ReactDOM from 'react-dom';

class ModalInner extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    const { el, props } = this;
    return ReactDOM.createPortal(props.children, el);
  }
}

const ToolTip = ({ children, visible, top, left }) => {
  console.log(top, left);
  const pos = {
    tp: `top-[${top}px]`,
    lft: `left-[${left}px]`,
  };

  return visible ? (
    <ModalInner>
      <div
        className={`bg-black text-white px-2 text-align rounded shadow fixed ${pos.tp} ${pos.lft} min-w-fit min-h-fit z-50 after:content-[''] after:absolute after:top-full after:left-1/2 after:border-[5px] after:border-solid after:border-transparent after:border-b-0 after:border-t-[5px] after:border-t-black after:w-0 after:h-0`}
      >
        {children}
      </div>
    </ModalInner>
  ) : null;
};

export default ToolTip;
