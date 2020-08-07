const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOG":
      return action.data;
    case "NEW_BLOG":
      return state.concat(action.data);
    case "LIKE_BLOG":
      const id = action.data.id;
      const liked = state.find((blog) => blog.id === id);
      const updated = {
        ...liked,
        likes: liked.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : updated));

    default:
      return state;
  }
};

export const createBlog = (newBlog) => {
  return {
    type: "NEW_BLOG",
    data: newBlog,
  };
};

export const likeBlog = (id) => {
  return {
    type: "LIKE_BLOG",
    data: { id },
  };
};

export const initBlog = (blogs) => {
  const anecdotes = initialBlogs;
  return {
    type: "INIT_BLOG",
    data: blogs,
  };
};

export default blogReducer;
