import React from "react";
const UserDetails = ({ user }) => {
    console.log(user)
  return (
    <div>
      <h1>name</h1>
      <h2>added blogs</h2>
      <ul>
        <li>1st</li>
        <li>2nd</li>
      </ul>
    </div>
  );
};

export default UserDetails;
