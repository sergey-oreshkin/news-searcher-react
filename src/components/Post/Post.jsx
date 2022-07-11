import React from 'react';
import cl from './Post.module.css';

const Post = ({post}) => {
    const date = new Date(Date.parse(post.date));
    const diff = (Date.now() - date) / 3600000;
    const hours = diff < 1
        ?
        diff.toFixed(0) * 60 + ' минут назад'
        :
        diff.toFixed(1) + ' часов назад';

    return (
        <div className={cl.post}>
            <h3>{post.title}</h3>
            <div className={cl.time}>{hours}</div>
            <div >{post.desc}</div>
            <div className={cl.link}>
                <a href={post.link}>Читать далее..</a>
            </div>
        </div>
    );
}

export default Post;