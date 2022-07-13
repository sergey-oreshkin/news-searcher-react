import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import requestLogin from '../../store/API/LoginApi';
import Info from '../Info/Info';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import cl from './LoginForm.module.css';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const loginState = useSelector(state => state.login);

    const dispatcher = useDispatch();

    return (
        <div className={cl.formLogin}>
            <Info >
                {loginState.loading ? 'Отправляю запрос' : ''}
                {loginState.err || ''}
            </Info>
            <Input
                type="text"
                placeholder="имя пользователя"
                value={login}
                onChange={e => setLogin(e.target.value)}
            />
            <Input
                type="text"
                placeholder="пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={() => dispatcher(requestLogin({
                username: login,
                password: password,
                reg: true
            }))}>
                Регистрация
            </Button>

            <Button onClick={() => dispatcher(requestLogin({
                username: login,
                password: password
            }))}>
                Вход
            </Button>
        </div>
    );
}

export default LoginForm;