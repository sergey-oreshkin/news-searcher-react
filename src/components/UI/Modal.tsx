import React from "react";

type ModalProps = {
    children: JSX.Element,
    hideModal: () => void
}

const Modal = ({ hideModal, children }: ModalProps) => {
    return (
        <div className='flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-gray-300/50 z-50' onClick={hideModal}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;