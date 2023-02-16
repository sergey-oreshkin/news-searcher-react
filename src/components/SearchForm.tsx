import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { AppDispatch } from "../store";
import { search } from "../store/api/searchApi";
import { clearMessage } from "../store/searchSlice";
import Button from "./UI/Button";

const SearchForm = () => {

    const words = useInput('');
    const [hours, setHours] = useState(12);

    const dispatch = useDispatch<AppDispatch>();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (newValue <= 999) {
            setHours(newValue);
        }
    }

    const findHandler = () => {
        const keywords = words.value.split(',');
        dispatch(clearMessage());
        dispatch(search({ hours: hours, keywords: keywords }));
    }

    return (
        <div className='text-center p-2 flex flex-col '>
            <label >
                <input className='w-3/4 p-2 border-b-2' type="text" placeholder='Введите ключевые слова через запятую' {...words} />
            </label>

            <label className='mx-7 my-5'>Будут показаны новости за последние
                <input className='mx-2 px-2 w-16 border-b-2' type='number' value={hours} onChange={changeHandler} />
                часов
            </label>
            <Button text='Найти' onClick={findHandler} />
        </div>
    );
}

export default SearchForm;