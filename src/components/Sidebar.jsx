import React, { useState } from 'react';
import Button from './UI/button/Button';
import LoginForm from './UI/loginForm/LoginForm';
import Modal from './UI/modal/Modal';

const Sidebar = () => {

    const [modal, setModal] = useState(false);

    const doLogin = ()=>{}
    const doRegister = () => {}

    return (
        <div className='sidebar'>
            <Button onClick={()=>setModal(true)}>Вход/Регистрация</Button>
            <Modal visible = {modal} setVisible = {setModal}>
                <LoginForm
                    doLogin={doLogin}
                    doRegister={doRegister}
                />
            </Modal>
        </div>
    );
}
export default Sidebar;