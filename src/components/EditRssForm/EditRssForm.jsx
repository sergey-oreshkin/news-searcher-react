import React from 'react';

import { useDispatch } from 'react-redux';
import { updateAndGetRss, deleteAndGetRss } from '../../store/API/RssApi';


import Info from '../Info/Info';
import Button from '../UI/Button/Button';
import cl from './EditRssForm.module.css';

const EditRssForm = ({ info, sources }) => {

    const dispatcher = useDispatch();

    const submitUpdate = (key) => {
        const data = { ...sources[key] };
        data.isActive = !data.isActive;
        dispatcher(updateAndGetRss(data));
    }

    const submitDelete = (key) => {
        dispatcher(deleteAndGetRss(sources[key]));
    }

    return (
        <div className={cl.form}>
            <Info>{info}</Info>
            {sources.map((source, index) =>
                <div key={index} className={cl.row}>
                    <div>Название: <span className={cl.whiteBg}>{source.title}</span></div>

                    <div>Ссылка: <span className={cl.whiteBg}>{source.link}</span></div>

                    <Button style={{ color: 'green' }} onClick={(e) => submitUpdate(index, e)}>
                        {source.isActive ? <span>Деактивировать</span> : <span>Активировать</span>}
                    </Button>

                    <Button style={{ color: 'red' }} onClick={(e) => submitDelete(index, e)}>
                        Удалить
                    </Button>
                </div>
            )}
        </div>
    );
}

export default EditRssForm;