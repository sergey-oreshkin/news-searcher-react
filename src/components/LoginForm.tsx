import React from "react";
import { LOGIN_BUTTON_TEXT, REGISTER_BUTTON_TEXT } from "../utils/constants";
import { FormType } from "../store/appSlice";
import Button from "./UI/Button";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../store/api/loginApi";
import { AppDispatch, RootState } from "../store";

type LoginFormProps = {
    type: FormType
}

const LoginForm = ({ type }: LoginFormProps) => {

    const username = useInput('');
    const password = useInput('');
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state);

    const handleClick = (type: FormType) => {
        if (type === FormType.REGISTER_FORM) {
            dispatch(register({ username: username.value, password: password.value }))
        }
        if (type === FormType.LOGIN_FORM) {
            dispatch(login({ username: username.value, password: password.value }))
        }
    }

    return (
        <div className='bg-white w-60 h-60 flex flex-col justify-around border-r-8 rounded-md'>
            <div>
                <div className='text-center text-red-600 text-xs'>{state.login.message}</div>
                <input type='text' className='m-2 p-2 border-b-2 focus:outline-none' placeholder='Введите логин' {...username} />
                <input type='text' className='m-2 p-2 border-b-2 focus:outline-none' placeholder='Введите пароль' {...password} />
            </div>

            <div className='text-center'>
                {
                    type === FormType.LOGIN_FORM && <Button text={LOGIN_BUTTON_TEXT} onClick={() => handleClick(FormType.LOGIN_FORM)} />
                }
                {
                    type === FormType.REGISTER_FORM && <Button text={REGISTER_BUTTON_TEXT} onClick={() => handleClick(FormType.REGISTER_FORM)} />
                }
            </div>

        </div>
    );
}

export default LoginForm;