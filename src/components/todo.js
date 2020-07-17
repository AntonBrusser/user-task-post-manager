import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../App.css";

const Todo = (props) => {
  const dispatch = useDispatch();

  const [visible, setVilible] = useState(false)

  useEffect(() => {
    setVilible(true)
},[])


let completed = ''
if(props.data.completed === true) {
    completed = 'True'
} else if (props.data.completed === false) {
    completed = 'False'
}


  return (
    <div className={visible?'fadeInSmall':'fadeOut'}>
      <div className="smallerBoxTodo">
      <span className="subtitle">Title:</span> <span>{props.data.title}</span>
        <br /> <br/>
        <span className="subtitle">Completed:</span> <span>{completed}</span> 
        <input className="markCompleted" type="button" value="Mark Compleated"
        onClick={async () => {
              dispatch({
                type: "CompleteTodo",
                payload: props.data.id
              });
            }}
        />
      </div>
    </div>
  );
};

export default Todo;