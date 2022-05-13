import React from "react";
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";

const Form = () => {
    return (
        <form className="form">
            <Input type="text" placeholder="Введите ключевые слова через запятую"/><br/>

            Будут показаны новости за последние
            <Input type="number" style={{width: 70 + 'px'}} value="12"/> 
            часов.<br/>

            <Button>Поиск</Button>
        </form>
    );
}
export default Form;