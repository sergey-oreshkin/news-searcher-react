import React from "react";
import cl from './modal.module.css';

const Modal = ({children, visible, setVisible}) => {

    const classes = [cl.modal];
    if (visible){
        classes.push(cl.active);
    }

    return (
        <div className={classes.join(' ')} onClick = {()=>setVisible(false)}>
            <div className={cl.modalContent}>
                {children}
            </div>
        </div>
    );
}

export default Modal;