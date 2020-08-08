import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers} from "../reducers/userReducer"

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(()=>{
    dispatch(getAllUsers())
  },[dispatch])
  return (
    <div>
      <h2>Users</h2>
    </div>
  );
};

export default Users;
