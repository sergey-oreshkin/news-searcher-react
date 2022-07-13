import React from 'react';
import { Link } from 'react-router-dom';

import Info from '../Info/Info';
import Button from '../UI/Button/Button'
import cl from './Sidebar.module.css';
import { publicRoutes, authRoutes } from '../../router';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../UI/modal/Modal';
import LoginForm from '../LoginForm/LoginForm';
import { toggleModal, logout } from '../../store/LoginSlice';

const Sidebar = () => {
    const buttontext = useSelector(state => state.login.buttonText);
    const { auth, username } = useSelector(state => state.login);
    const dispatcher = useDispatch();

    const changeAuth = () => {
        auth ? dispatcher(logout()) : dispatcher(toggleModal())
    }

    return (
        <div className={cl.sidebar}>
            <Info>
                {auth ? 'Привет, ' + username : ''}
            </Info>
            <br />
            <Button onClick={changeAuth}>{buttontext}</Button>
            <nav>
                {auth
                    ?
                    authRoutes.map(route =>
                        <Link className={cl.link} key={route.path} to={route.path}>
                            {route.text}
                        </Link>
                    )
                    :
                    publicRoutes.map(route =>
                        <Link className={cl.link} key={route.path} to={route.path}>
                            {route.text}
                        </Link>
                    )}
            </nav>
            <Modal>
                <LoginForm />
            </Modal>
        </div>
    );
}

export default Sidebar;