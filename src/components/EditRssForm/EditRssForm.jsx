import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { updateAndGetRss } from '../../store/API/RssApi';


import Info from '../Info/Info';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import cl from './EditRssForm.module.css';

const EditRssForm = ({ info, sources, active }) => {

    const [chekedActive, setCheckedActive] = useState(sources.map(source => source.isActive));
    const [checkedDelete, setCheckedDelete] = useState(Array(sources.length).fill(false));
    const dispatcher = useDispatch();

    const handleActive = (pos) => {
        const updateCheckedActive = { ...chekedActive };
        updateCheckedActive[pos] = !updateCheckedActive[pos];
        setCheckedActive(updateCheckedActive);
    }
    const handleDelete = (pos) => {
        const updateCheckedDelete = { ...checkedDelete };
        updateCheckedDelete[pos] = !updateCheckedDelete[pos];
        setCheckedDelete(updateCheckedDelete);
    }

    const submit = () => {
        const data = sources.map((source, index)=>({
            title:source.title,
            link: source.link,
            isActive: chekedActive[index],
            isDelete: checkedDelete[index]
        }));
        dispatcher(updateAndGetRss(data));
    }

    return (
        <div className={cl.form}>
            <Button onClick={submit}>Применить</Button>
            <Info>{info}</Info>
            {sources.map((source, index) =>
                <div key={index} className={cl.row}>
                    <div>Название: <span>{source.title}</span></div>
                    <div>Сыылка: <span>{source.link}</span></div>
                    <div>
                        <label>Активировать
                            <Input
                                style={{ accentColor: 'green' }}
                                type="checkbox"
                                checked={chekedActive[index]}
                                onChange={() => handleActive(index)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Удалить
                            <Input
                                style={{ accentColor: 'red' }}
                                type="checkbox"
                                checked={checkedDelete[index]}
                                onChange={() => handleDelete(index)}
                            />
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditRssForm;