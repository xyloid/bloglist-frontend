import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOG":
      return action.data.sort((a, b) => b.likes - a.likes);
    case "NEW_BLOG":
      console.log("action data", action.data);
      return state.concat({ ...action.data });
    case "LIKE_BLOG": {
      const id = action.data.id;
      const liked = state.find((blog) => blog.id === id);
      const updated = {
        ...liked,
        likes: action.data.likes,
      };
      return state
        .map((blog) => (blog.id !== id ? blog : updated))
        .sort((a, b) => b.likes - a.likes);
    }
    case "DEL_BLOG": {
      const id = action.data.id;
      return state.filter((blog) => blog.id !== id);
    }
    case "ADD_COMMENT": {
      const id = action.data.id;
      const updated = action.data;
      return state.map((blog) => (blog.id !== id ? blog : updated));
    }
    default:
      return state;
  }
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const res = await blogService.create(newBlog);
    console.log(res);
    return dispatch({
      type: "NEW_BLOG",
      data: res,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    blog.likes++;
    const res = await blogService.update(blog);
    return dispatch({
      type: "LIKE_BLOG",
      data: res,
    });
  };
};

export const initBlog = () => {
  return async (dispatch) => {
    const fetchBlogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOG",
      data: fetchBlogs,
    });
  };
};

export const delBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog);
    return dispatch({
      type: "DEL_BLOG",
      data: { id: blog.id },
    });
  };
};

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    // TODO
    const updated = await blogService.addComment(blog, comment);
    return dispatch({
      type: "ADD_COMMENT",
      data: updated,
    });
  };
};

export default blogReducer;
