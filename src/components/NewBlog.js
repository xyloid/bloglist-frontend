import React from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setErrorNoticeContent } from "../reducers/errorNoticeReducer";
import { setNoticeContent } from "../reducers/noticeReducer";

const NewBlog = () => {
  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title: event.target.Title.value,
        author: event.target.Author.value,
        url: event.target.Url.value,
      };

      // console.log(newBlog);

      // update(res);
      // dispatch(createBlog(res));

      event.target.Title.value = "";
      event.target.Author.value = "";
      event.target.Url.value = "";

      // this part must be executed after the event target is modified.
      // const res = await blogService.create(newBlog);
      // console.log("new blog", res);

      dispatch(createBlog(newBlog));

      dispatch(setNoticeContent(`${newBlog.title} by ${newBlog.author} added`));
      setTimeout(() => {
        dispatch(setNoticeContent(null));
      }, 5000);
    } catch (exception) {
      console.log(exception.json);
      console.log("failed to create new blog", exception);
      dispatch(setErrorNoticeContent(exception.message));
      setTimeout(() => {
        dispatch(setErrorNoticeContent(null));
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            id="title"
            type="text"
            name="Title"
            // value={title}
            // onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            name="Author"
            // value={author}
            // onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            name="Url"
            // value={url}
            // onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlog;
