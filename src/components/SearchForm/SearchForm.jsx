import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import cl from './SearchForm.module.css';
import fetchNews from '../../store/API/NewsApi';

const SearchForm = () => {
    const [keywords, setKeywords] = useState('');
    const [hours, setHours] = useState('12');
    const dispatch = useDispatch();

    const submit = (e) => {
        e.preventDefault();
        const data = { hours: hours, keywords: keywords.split(',') };
        dispatch(fetchNews(data));
    }

    return (
        <form className={cl.form}>
            <Input
                type="text"
                placeholder="Введите ключевые слова через запятую"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
            />
            <br />

            Будут показаны новости за последние
            <Input
                type="number"
                style={{ width: 70 + 'px' }}
                value={hours}
                onChange={e => setHours(e.target.value)}
            />
            часов.<br />

            <Button onClick={submit} >Поиск</Button>
        </form>
    );
}

export default SearchForm;