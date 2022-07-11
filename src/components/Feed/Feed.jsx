import React from 'react';
import { useSelector } from 'react-redux';

import Post from '../Post/Post';

const Feed = () => {
    const posts = useSelector(state => state.feed.posts);

    return (
        <div>
            {posts.map(post => <Post key = {post.title} post={post} />)}
        </div>
    );
}

export default Feed;