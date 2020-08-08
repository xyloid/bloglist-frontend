import React, { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { likeBlog, delBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  console.log("blog", blog);
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
      blog.likes = blog.likes + 1;

      dispatch(likeBlog(blog));
      // setBlogEntry({ ...blog });
      await blogService.update(blog);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogService.remove(blog);
        dispatch(delBlog(blog.id));
        // updateAll();
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  return (
    <div>
      <div id="simple" className="blog" style={hideWhenShow}>
        {blog.title} {blog.author}
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
