import React from 'react';
import '../css/modal.css';

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, cls } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section className={cls}>
          {cls!=='audio' && 
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>}
          <main>{props.children}</main>
          {cls!=='audio' && 
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
          }
        </section>
      ) : null}
    </div>
  );
};

export default Modal;