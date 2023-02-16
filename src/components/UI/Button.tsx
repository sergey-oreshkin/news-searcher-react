import React from "react";

type ButtonProps = {
    text: string,
    onClick: () => void
}

const Button = ({ text, onClick }: ButtonProps) => {
    return (
        <button className='hover:bg-slate-200 p-1 rounded m-2' onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;