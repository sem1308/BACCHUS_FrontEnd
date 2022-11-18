import React from 'react';
import '../css/modal.css';

const Modal2 = (props) => {
    const { header, id, modalVisibleId, setModalVisibleId } = props;

    const onCloseHandler = () => {
        setModalVisibleId("")
    }

    // console.log(id);
    // console.log(modalVisibleId);

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={id === modalVisibleId ? 'openModal modal' : 'modal'}>
            {id === modalVisibleId ? (
                <section>
                    <header>
                        {`주문번호: ${header}`}
                        <button className="close" onClick={onCloseHandler}>
                            &times;
                        </button>
                    </header>
                    <main>{props.children}</main>
                    <footer>
                        <button className="close" onClick={onCloseHandler}>
                            close
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
};

export default Modal2;