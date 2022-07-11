import React from 'react';
import { useSelector } from 'react-redux';
import cl from './Info.module.css';

const Info = () => {
    const msg = useSelector(state => state.feed.info);
    const loading = useSelector(state => state.feed.loading);
    return (
        <div className={cl.info}>
            {loading ? 'Загружаем' : msg}
        </div>
    );
}

export default Info;