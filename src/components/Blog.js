import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };

  const hideWhenShow = { display: show ? "none" : "" };
  const renderWhenShow = { display: show ? "" : "none" };

  return (
    <div>
      <div className="blog" style={hideWhenShow}>
        {blog.title} {blog.author}
        <button onClick={toggleShow}>view</button>
      </div>
      <div className="blog" style={renderWhenShow}>
        <p className="line">
          {blog.title} <button onClick={toggleShow}>hide</button>
        </p>
        <p className="line">{blog.url}</p>
        <p className="line">{blog.likes} <button>like</button></p>
        <p className="line">{blog.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;
