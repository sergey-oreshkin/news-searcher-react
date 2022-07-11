import React from 'react';
import cl from './Info.module.css';

const Info = ({children}) => {

    return (
        <div className={cl.info}>
           {children}
        </div>
    );
}

export default Info;