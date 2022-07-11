import React from 'react';
import cl from './Modal.module.css';
import { toggleModal } from '../../../store/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';


const Modal = ({ children }) => {
    const dispatcher = useDispatch();
    const visible = useSelector(state => state.login.showModal);

    const classes = [cl.modal];

    if (visible) {
        classes.push(cl.active);
    }
    return (
        <div className={classes.join(' ')} onClick={() => dispatcher(toggleModal())}>
            <div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;