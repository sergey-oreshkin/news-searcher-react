import React from 'react';
import { useState } from 'react';
import Info from '../Info/Info';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import cl from './AddRssForm.module.css';

const AddRssForm = () => {

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    const submit = () => {

    }

    return (
        <div className={cl.form}>
            <h3>Добавить источник</h3>
            <Info></Info>
            <div>
                <span>Название</span>
                <Input
                    type="text"

                    placeholder="Введите название"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div>
                <span>Ссылка</span>
                <Input
                    type="text"
                    placeholder="Введите ссылку начиная с http*"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                />
            </div>
            <Button onClick={submit}>Добавить</Button>
        </div>
    );
}

export default AddRssForm;