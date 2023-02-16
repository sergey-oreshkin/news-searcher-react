import React from "react";
import Navigation from "./Navigation";

type HeaderProps = {
    title: string
}

const Header = ({title}: HeaderProps)=>{
    return(
        <div className='h-16 flex justify-between'>
            <div className='text-lg my-auto font-bold'>{title}</div>
            <Navigation />
        </div>
    );
}

export default Header;