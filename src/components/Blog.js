import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);
  const [blogEntry, setBlogEntry] = useState(blog)
  const [likes, setLikes] = useState(blog.likes)
  const toggleShow = () => {
    setShow(!show);
  };

  const hideWhenShow = { display: show ? "none" : "" };
  const renderWhenShow = { display: show ? "" : "none" };

  const handleLike = async ()=>{
    try{
      blog.likes = blogEntry.likes
      blog.likes = blog.likes+1
      await blogService.update(blog)
      setBlogEntry(blog)
      setLikes(blog.likes)
      // console.log("updated blog entry")
      // console.log(blogEntry)
    }
    catch (exception){
      console.log(exception)
    }

  }

  return (
    <div>
      <div className="blog" style={hideWhenShow}>
        {blogEntry.title} {blogEntry.author}
        <button onClick={toggleShow}>view</button>
      </div>
      <div className="blog" style={renderWhenShow}>
        <p className="line">
          {blogEntry.title} <button onClick={toggleShow}>hide</button>
        </p>
        <p className="line">{blogEntry.url}</p>
        <p className="line">{likes} <button onClick={handleLike}>like</button></p>
        <p className="line">{blogEntry.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;
