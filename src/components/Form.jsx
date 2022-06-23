import React, { useState } from "react";
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";

const Form = ({fetchPosts}) => {

    const [keywords, setKeywords] = useState('');
    const [hours, setHours] = useState('12');

    const submit = (e) => {
        e.preventDefault();
        fetchPosts(keywords, hours);
    }

    return (
        <form className="form">
            <Input 
                type="text" 
                placeholder="Введите ключевые слова через запятую" 
                value={keywords}
                onChange={e=>setKeywords(e.target.value)}
            />
            <br/>

            Будут показаны новости за последние
            <Input 
                type="number" 
                style={{width: 70 + 'px'}} 
                value={hours}
                onChange={e=>setHours(e.target.value)}
            /> 
            часов.<br/>

            <Button visible = {true} onClick = {submit}>Поиск</Button>
        </form>
    );
}
export default Form;