import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../src/features/userSlice";
import { auth } from "./Firebase";
import Nav from "./Nav";
import PlanScreen from "./PlanScreen";
import { useNavigate } from "react-router-dom";
import "./ProfileScreen.css";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
          <img
            src="https://www.fit2work.com.au/assets/img/avatars/LoginIconAppl.png"
            alt=""
          />
          <div className="profileScreen_details">
            <h2>{user.email}</h2>
            <div className="profileScreen_plans">
            <h3>Plans</h3>
            <PlanScreen />
              <button
                onClick={handleSignOut}
                className="profileScreen_signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
