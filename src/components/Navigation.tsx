import React from "react";
import { LOGIN_BUTTON_TEXT, LOGOUT_BUTTON_TEXT, REGISTER_BUTTON_TEXT } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Button from "./UI/Button";
import { FormType, setModalContent, setShowModal } from "../store/appSlice";
import { RootState } from "../store";
import { logout } from "../store/loginSlice";

const Navigation = () => {

    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const clickHandler = (type: FormType) => {
        if (type === FormType.LOGOUT) {
            dispatch(logout());
            return;
        }
        dispatch(setModalContent(type));
        dispatch(setShowModal(true));
    }

    return (
        <>
            {
                state.login.login
                    ?
                    <div className='my-auto flex flex-row'>
                        <div className='my-auto'>{'Привет, ' + state.login.username}</div>
                        <Button text={LOGOUT_BUTTON_TEXT} onClick={() => clickHandler(FormType.LOGOUT)} />
                    </div>
                    :
                    <div className='my-auto'>
                        <Button text={REGISTER_BUTTON_TEXT} onClick={() => clickHandler(FormType.REGISTER_FORM)} />
                        <Button text={LOGIN_BUTTON_TEXT} onClick={() => clickHandler(FormType.LOGIN_FORM)} />
                    </div>
            }
        </>
    );
}

export default Navigation;