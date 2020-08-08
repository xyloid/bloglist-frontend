import React from "react";
import { useDispatch } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch();
  if (blog) {
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

    return (
      <div>
        <h1>{blog.title}</h1>
        <p>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </p>
        <p>
          {blog.likes} likes <button onClick={handleLike}>like</button>
        </p>
        <p>added by <em>{blog.author}</em></p>

        <div>
          <h2>comments</h2>
          <ul>
            {blog.comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return <p>Invalid blog id</p>;
  }
};

export default BlogDetails;
