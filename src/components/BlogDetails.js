import React from "react";

const BlogDetails = ({ blog }) => {
  if (blog) {
      return (<div>
          
      </div>)
  } else {
    return <p>Invalid blog id</p>;
  }
};

export default BlogDetails;
