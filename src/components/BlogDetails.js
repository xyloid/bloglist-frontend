import React from "react";
import { useDispatch } from "react-redux";
import { likeBlog, addComment } from "../reducers/blogReducer";
import {
  Button,
  TextField,
  Grid,
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import { setErrorNoticeContent } from "../reducers/errorNoticeReducer";

import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import CreateIcon from "@material-ui/icons/Create";
import LinkIcon from "@material-ui/icons/Link";

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

    const handleComment = (event) => {
      event.preventDefault();
      try {
        const comment = event.target.Comment.value;
        event.target.Comment.value = "";
        if (comment.trim() !== "") {
          dispatch(addComment(blog, comment));
        } else {
          dispatch(setErrorNoticeContent("empty comment"));
          setTimeout(() => {
            dispatch(setErrorNoticeContent(null));
          }, 5000);
        }
      } catch (exception) {
        console.log(exception.json);
        console.log("failed to create new blog", exception);
      }
    };

    return (
      <div>
        <h1>{blog.title}</h1>
        <p>
          <LinkIcon />
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </p>
        <p>
          {blog.likes} likes{" "}
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={handleLike}
          >
            like
          </Button>
        </p>
        <p>
          <CreateIcon /> added by <em>{blog.author}</em>
        </p>

        <div>
          <h2>comments</h2>
          <form onSubmit={handleComment} style={{ verticalAlign: "bottom" }}>
            <TextField label="Your comment" type="text" name="Comment" />
            <div>
              <Button size="small" color="primary" type="submit">
                add comment
              </Button>
            </div>
          </form>
          <List>
            {blog.comments.map((c, i) => (
              <ListItem key={i}>
                <ListItemIcon>
                  <ChatBubbleOutlineIcon />
                </ListItemIcon>
                <ListItemText>{c}</ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    );
  } else {
    return <p>Invalid blog id</p>;
  }
};

export default BlogDetails;
