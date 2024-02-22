import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function StartPage() {
  const userObj = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log("user: ", userObj.isLoggedIn);

  return <div>StartPage</div>;
}
