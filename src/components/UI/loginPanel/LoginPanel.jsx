import React from "react";
import cl from './LoginPanel.module.css';

const LoginPanel = (...props ) => {

    const classes = [cl.panel];

    if (props[0].visible) {
        classes.push(cl.active);
    }

    return (
        <div className={classes.join(' ')}>
            Привет, <span>{props[0].name}</span>
        </div>
    );
}

export default LoginPanel;