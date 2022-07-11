import React from 'react';
import { useSelector } from 'react-redux';

import Feed from '../components/Feed/Feed';
import Header from '../components/Header/Header';
import Info from '../components/Info/Info';
import SearchForm from '../components/SearchForm/SearchForm';

const MainPage = () => {
    const msg = useSelector(state => state.feed.info);
    const loading = useSelector(state => state.feed.loading);
    return (
        <div className='page'>
            <Header />
            <SearchForm />
            <Info> {loading ? 'Загружаем' : msg}</Info>
            <Feed />
        </div>
    );
}

export default MainPage;