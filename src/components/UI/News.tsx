import React from "react";
import { Post } from "../../store/searchSlice";

export type PostProps = Post;

const News = ({ title, desc, date, link }: PostProps) => {

    const minutesAgo = Math.abs(Math.trunc((new Date().getTime() - new Date(date).getTime()) / 60 / 1000));
    let dateString = `${minutesAgo} минут назад`;
    if (minutesAgo > 60) {
        const hoursAgo = Math.trunc(minutesAgo / 60);
        if (hoursAgo === 1) {
            dateString = `${hoursAgo} час назад`;
        } else if (hoursAgo <= 4) {
            dateString = `${hoursAgo} часа назад`;
        } else {
            dateString = `${hoursAgo} часов назад`;
        }
    }

    return (
        <div className='m-4 p-4 border-b-2'>
            <h3 className='text-center mb-2'>{title}</h3>
            <div className='text-sm'>{desc}</div>
            <div className='flex justify-around mt-3'>
                <div>{dateString}</div>
                <div>
                    <a className='underline hover:text-blue-800' href={link}>Читать далее ...</a>
                </div>
            </div>
        </div>
    );
}

export default News;