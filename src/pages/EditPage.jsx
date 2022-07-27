import React from 'react';
import Header from '../components/Header/Header';
import RssEditor from '../components/RssEditor/RssEditor';

const EditPage = () => {
    return (
        <div className='page'>
            <Header>Редактор RSS</Header>
            <RssEditor />
        </div>
    );
}

export default EditPage;