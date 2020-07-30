import React, {useState} from "react"
import blogService from "../services/blogs"

const NewBlog = ({ update }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
  
    const handleCreate = async (event) => {
      event.preventDefault();
      try {
        const newBlog = { title, author, url };
        // console.log(newBlog);
        const res = await blogService.create(newBlog);
        // console.log(res)
        update(res);
  
        setTitle("");
        setAuthor("");
        setUrl("");
      } catch (exception) {
        console.log("failed to create new blog", exception);
      }
    };
  
    return (
      <div>
        <h2>Create a New Blog</h2>
        <form onSubmit={handleCreate}>
          <div>
            title:{" "}
            <input
              type="text"
              name="Title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              name="Author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              name="Url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    );
  };

  export default NewBlog