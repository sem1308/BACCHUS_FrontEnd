import styles from '../css/CustomerModal.module.css';

const CustomerModal = (props) => {
    const { open, close } = props;

    console.log(`modal: ${open}`)

    return (
        <>
            {open ? <div className={styles.container}>
                <button className={styles.close} onClick={close}>X</button>
                <p>모달</p>
            </div>
                : null}
        </>

    );
}


export default CustomerModal;