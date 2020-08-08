import React from "react";
const UserDetails = ({ user }) => {
  console.log("user details", user);
  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        <ul>
          <li>1st</li>
          <li>2nd</li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default UserDetails;
