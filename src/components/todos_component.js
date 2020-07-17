import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import Todo from "./todo";

const Todos = (props) => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isShown, setIsShown] = useState(false);
  const [title, setTitle] = useState("");

  const [visible, setVilible] = useState(false)

  let todos = data.chosen.todosArr;
  let listTodos = [];

  useEffect(() => {
      setVilible(true)
  },[])

  useEffect(() => {
    setIsShown(false);
    setTitle("");
  }, [todos]);

  if (todos) {
    if (todos[todos.length - 1] === undefined) {
      todos.splice(-1,1)
    }
    listTodos = todos.map((todo) => <Todo key={todo.id} data={todo} />);
  }

  let clear = () => {
    setIsShown(false);
    setTitle("");
  };

  return (
    <div className={visible?'fadeInSmall':'fadeOut'}>
      <div className="box">
        <input
          className="backButton"
          style={{ fontWeight: "bolder", fontSize: "1em" }}
          type="button"
          value="<"
          onClick={async () => {
            dispatch({
              type: "Users",
            });
          }}
        />
        <span className="title">ToDo's</span>
        <input
          className="buttonRight"
          type="button"
          value="+ Add"
          onClick={() => setIsShown(true)}
        />
        <div>
          {isShown && (
            <div className="smallerBox" style={{ height: "2.5em" }}>
              <span>Title:</span>{" "}
              <input
                type="text"
                className="input"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="buttonLeft"
                type="button"
                value="Cancel"
                onClick={clear}
              />
              <input
                className="buttonRight"
                type="button"
                value="Add"
                onClick={async () => {
                  dispatch({
                    type: "AddTodo",
                    payload: {
                      title: title,
                      completed: false,
                    }
                  });
                  setIsShown(false);
                  setTitle("");
                }}
              />
            </div>
          )}
          {listTodos}
        </div>
      </div>
    </div>
  );
};

export default Todos;
