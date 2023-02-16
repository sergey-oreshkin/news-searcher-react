import React from "react";
import { LOGIN_BUTTON_TEXT, REGISTER_BUTTON_TEXT } from "../utils/constants";
import { useDispatch } from "react-redux";
import Button from "./UI/Button";
import { FormType, setModalContent, setShowModal } from "../store/appSlice";

const Navigation = () => {

    // const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();


    const clickHandler = (type: FormType) => {
        dispatch(setModalContent(type));
        dispatch(setShowModal(true));
    }

    return (
        <div className='my-auto'>
            <Button text={REGISTER_BUTTON_TEXT} onClick={() => clickHandler(FormType.REGISTER_FORM)} />
            <Button text={LOGIN_BUTTON_TEXT} onClick={() => clickHandler(FormType.LOGIN_FORM)} />
        </div>
    );
}

export default Navigation;