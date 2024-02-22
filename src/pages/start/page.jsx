import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedInTrue, setIsLoggedInFalse } from "~/store/reducers/user";

export default function StartPage() {
  const userObj = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log("user: ", userObj.isLoggedIn);

  return (
    <div>
      <p>redux test in startPage</p>

      <button
        onClick={() => {
          dispatch(setIsLoggedInTrue());
        }}
      >
        make true
      </button>
      <button>make false</button>

      <p>isLoggedIn : {userObj.isLoggedIn}</p>
    </div>
  );
}
