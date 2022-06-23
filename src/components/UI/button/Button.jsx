import React from 'react';
import cl from './Button.module.css';

const Button = ({ visible, children, ...props }) => {

    const classes = [cl.button];

    if (visible) {
        classes.push(cl.active);
    }

    return (
        <button {...props} className={classes.join(' ')}>
            {children}
        </button>
    );
}
export default Button;