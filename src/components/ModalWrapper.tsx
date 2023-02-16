import React from "react";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { FormType, setShowModal } from "../store/appSlice";
import Modal from "./UI/Modal";
import LoginForm from "./LoginForm";

const ModalWrapper = () => {

    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    return (
        <>
            {
                state.app.showModal &&
                <Modal hideModal={() => dispatch(setShowModal(false))}>
                    <div>
                        {
                            state.app.modalContent === FormType.LOGIN_FORM && <LoginForm type={FormType.LOGIN_FORM} />
                        }
                        {
                            state.app.modalContent === FormType.REGISTER_FORM && <LoginForm type={FormType.REGISTER_FORM} />
                        }
                    </div>
                </Modal>
            }
        </>
    );
}

export default ModalWrapper;