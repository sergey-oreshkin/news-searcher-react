import React, { useState } from 'react';
import Button from './UI/button/Button';
import LoginForm from './UI/loginForm/LoginForm';
import LoginPanel from './UI/loginPanel/LoginPanel';
import Modal from './UI/modal/Modal';

const Sidebar = () => {

    const [modal, setModal] = useState(false);

    const [login, setLogin] = useState(false);

    const storage = window.localStorage;

    const doLogin = async (username, password, register) => {
        try {
            let URL = 'http://localhost:8080';
            const data = { username: username, password: password };
            if (register) {
                URL += '/register';
            } else {
                URL += '/login';
            }
            const response = await fetch(URL, {
                method: 'POST',
                body: JSON.stringify(data),
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const json = await response.json();
                if (json.token) {
                    const checkResponse = fetch('http://localhost:8080/check', {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Authorization': json.token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });

                    if ((await checkResponse).status === 200) {
                        storage.setItem('token', json.token ? json.token : '');
                        storage.setItem('username', json.username ? json.username : '')
                        setLogin(true);
                        setModal(false);
                    }
                }
            } else if (response.status === 400) {
                //TODO
                logout();
            }
        } catch (e) {
            logout();
        }
    }

    const logout = () => {
        storage.setItem('token', '');
        storage.setItem('username', '');
        setLogin(false);
    }

    return (
        <div className='sidebar'>

            <LoginPanel visible={login} name={storage.getItem('username')} />

            <Button visible={!login} onClick={() => setModal(true)}>
                Вход/Регистрация
            </Button>

            <Button visible={login} onClick={logout}>
                Выход
            </Button>

            <Modal visible={modal} setVisible={setModal}>
                <LoginForm
                    doLogin={doLogin}
                />
            </Modal>
        </div>
    );
}
export default Sidebar;