import React from 'react';
import Feed from '../components/Feed/Feed';
import Header from '../components/Header/Header';
import Info from '../components/Info/Info';
import SearchForm from '../components/SearchForm/SearchForm';

const MainPage = () => {
    return (
        <div className='page'>
            <Header />
            <SearchForm />
            <Info />
            <Feed />
        </div>
    );
}

export default MainPage;