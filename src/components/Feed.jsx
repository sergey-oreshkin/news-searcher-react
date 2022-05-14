import React from "react";
import Info from "./Info";
import Post from "./Post";

const Feed = ({feed}) => {
    return (
        <div className="feed">
            <Info info = {feed.info}/>
            {feed.posts.map(post => <Post key = {Date.now()} post = {post}/>)}
        </div>
    );
}
export default Feed;