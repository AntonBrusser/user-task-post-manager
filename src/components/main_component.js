import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Users from "./users_component";
import AddNewUser from "./addNewUser";
import "../App.css";

import utils from "../utils";
import Information from "./information_component";

const Main = (props) => {
  const users = useSelector((state) => state);
  const dispatch = useDispatch();
  
  const [visible, setVilible] = useState(false)

  let isShown = false;

  useEffect(() => {
    dispatch(utils.AllUsers());
    setVilible(true)
  }, []);

  if (users.chosen || users.chosen > 0) {
    isShown = true;
  }

  return (
    <div className={visible?'fadeIn':'fadeOut'}>
      <p className ="mainTitle">User Task/Post Manager</p>
    <div className="container">
      
      <div>{users.showUsers && <Users />}</div>
      <div>
        <div>{users.addNew && <AddNewUser />}</div>
        <div>{isShown && <Information data={users} />}</div>
      </div>
    </div>
    </div>
  );
};

export default Main;
