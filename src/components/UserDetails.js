import React from "react";
const UserDetails = ({ user }) => {
  console.log("user details", user);
  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        <ul>
          {user.blogs.map(blog=><li>{blog.title}</li>)}
        </ul>
      </div>
    );
  } else {
    return <p>Invalid user id</p>;
  }
};

export default UserDetails;
