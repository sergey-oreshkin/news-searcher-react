import React, { useState } from 'react';
import Feed from './Feed';
import Form from './Form';
import Header from './Header';

const URL = 'http://localhost:8080';

const Main = () => {

    const [feed, setFeed] = useState({info : '', posts : []});

    async function fetchPosts(keywords, hours) {
        setFeed({info : 'Ищем...', posts : []});
        if (keywords === '' || keywords.length < 3) {
            setFeed({ info : 'Введите ключевые слова для поиска!', posts : []});
            return;
        }
        if (hours < 1){
            setFeed({info : 'Количество часов должно быть положительным!', posts : []});
            return;
        }
        try {
            const data = {hours : hours, keywords : keywords.split(',')};
            const response = await fetch(URL, {
                method: 'POST',
                body: JSON.stringify(data),
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok){
                const json = await response.json();
                if (json.length === 0 || !Array.isArray(json)){
                    setFeed({info : 'Извините! Ничего не нашлось.', posts : []});
                    return;
                }
                setFeed({
                    info : 'Нашлось ' + json.length + ' новостей.',
                    posts : json
                });
            }
        } catch (e){
            if(e.message === 'Failed to fetch'){
                setFeed({ info : 'Сервер ничего не ответил!', posts : []});
            } else {
                setFeed({ info : 'Во время запроса произошла ошибка!', posts : []});
            }
        }
    }

    return (
        <div className='main'>
            <Header/>
            <Form fetchPosts = {fetchPosts}/>
            <Feed feed = {feed}/>
        </div>
    );
}
export default Main;