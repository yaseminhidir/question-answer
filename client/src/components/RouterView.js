import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Questions from "./questions/Questions";
import Users from "./users/Users";
import SingleQuestion from "./questions/SingleQuestion";
import Register from "./users/Register";
import Login from "./users/Login";
import Profile from "./users/Profile";
import EditProfile from "./users/EditProfile"
import AskQuestion from "./questions/AskQuestion";

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
     <Route path="newquestion" element={<AskQuestion/>}></Route>
    </Routes>
  );
};

export default RouterView;
