import React from 'react';
import { useState } from 'react';
import Info from '../Info/Info';
import Input from '../UI/Input/Input';
import cl from './EditRssForm.module.css';

const EditRssForm = () => {
    const [enabled, setEnabled] = useState([]);
    return (
        <div className={cl.form}>
            <div className={cl.row}>
                <Info></Info>
                <span>title</span>
                <span>linkkhkbkljbklkljbkljbklbkljbklj</span>
                <label>Активировать
                    <Input
                        type="checkbox"
                        enabled={enabled}
                        on
                    />
                </label>

            </div>
        </div>
    );
}

export default EditRssForm;