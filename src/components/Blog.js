import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, delBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  // const [blogEntry, setBlogEntry] = useState(blog);
  // const [likes, setLikes] = useState(blog.likes)
  const toggleShow = () => {
    setShow(!show);
  };

  const hideWhenShow = { display: show ? "none" : "" };
  const renderWhenShow = { display: show ? "" : "none" };

  const handleLike = async () => {
    try {
      // setup new likes number and the update the redux and blogService at the same time.
      // blog.likes = blogEntry.likes;
      // blog.likes = blog.likes + 1;

      dispatch(likeBlog(blog));
      // await blogService.update(blog);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        dispatch(delBlog(blog));
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  return (
    <div>
      <div id="simple" className="blog" style={hideWhenShow}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        <button onClick={toggleShow}>view</button>
      </div>
      <div id="detail" className="blog" style={renderWhenShow}>
        <p className="line">
          {blog.title} <button onClick={toggleShow}>hide</button>
        </p>
        <p className="line">{blog.url}</p>
        <p className="line">
          {blog.likes} <button onClick={handleLike}>like</button>
        </p>
        <p className="line">{blog.author}</p>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
