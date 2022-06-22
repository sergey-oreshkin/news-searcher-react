import React, { useState } from "react";
import cl from './loginform.module.css';
import Input from "../input/Input";
import Button from '../button/Button';

const LoginForm = ({doLogin, doRegister}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const style = {margin: '8px'};

    return (
        <div className={cl.formLogin}>
            <Input
                type = "text"
                placeholder = "имя пользователя"
                value={login}
                onChange={e=>setLogin(e.target.value)}
            />
            <Input
                type = "text"
                placeholder = "пароль"
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />
            <Button style={style} onClick = {doRegister}>Регистрация</Button>
            <Button  onClick = {doLogin}>Вход</Button>
        </div>
    );
    
}

export default LoginForm;