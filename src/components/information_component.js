import React from "react";
import { useSelector } from "react-redux";


import "../App.css";

import Posts from './posts_component'
import Todos from './todos_component'




const Information = (props) => {


const data = useSelector((state) => state);



  return (
      <div className="container">
      
      {
        data.showTodos &&
        <Todos/>
      }
      
      {
        data.showPosts &&
        <Posts/>
      }
      </div>
  );
};

export default Information;