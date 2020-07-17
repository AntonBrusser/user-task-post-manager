import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Toast from 'light-toast';
import "../App.css";

const AddNewUser = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [visible, setVilible] = useState(false);

  useEffect(() => {
    setVilible(true);
  }, []);

  let clear = () => {
    setName("");
    setEmail("");
  };

  return (
    <div className={visible?'fadeIn':'fadeOut'}>
      <div className="box" style={{ padding: "1em", height: "9em" }}>
        <span>Add New User</span>
        <div className="smallBox">
          <span>Name:</span>{" "}
          <input
            className="input"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <span>Email:</span>{" "}
          <input
            style={{ marginLeft: "0.3em" }}
            className="input"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          className="buttonLeft"
          type="button"
          value="Cancel"
          onClick={async () => {
            dispatch({
              type: "CancelNewUser",
            });
            clear();
          }}
        />
        <input
          className="buttonRight"
          type="button"
          value="Add"
          onClick={async () => {
            dispatch({
              type: "SaveNewUser",
              payload: {
                name: name,
                email: email,
              },
            });
            clear();
            Toast.success('Created Successfully',1000);
          }}
        />
      </div>
    </div>
  );
};

export default AddNewUser;
