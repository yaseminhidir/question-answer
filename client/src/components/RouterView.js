import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Questions from "./Questions";
import Users from "./Users";
import SingleQuestion from "./SingleQuestion";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import EditProfile from "./EditProfile"

const RouterView = () => {
  return (
    <Routes>
      <Route path="/" element={<Questions />} />
      <Route path="users" element={<Users />} />
      <Route path="question/:questionId" element={<SingleQuestion />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="profile"  element={<Profile />} />
     <Route path="profile/edit" element={<EditProfile />} />
  
    </Routes>
  );
};

export default RouterView;
