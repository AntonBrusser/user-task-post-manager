import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "light-toast";
import "../App.css";

const User = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  let chosenClassbig = "smallBox";
  let chosenClasssmall = "otherData";
  let chosenClassInput = "input";
  let chosenClassButtonL = "buttonLeft";
  let chosenClassButtonR = "buttonRight";
  let chosenClassButtonD = "dataButton";
  let showButtons = false;

  const [visible, setVilible] = useState(false);

  const [isShown, setIsShown] = useState(false);
  const [name, setName] = useState(props.data.name);
  const [email, setEmail] = useState(props.data.email);
  const [street, setStreet] = useState(props.data.address.street);
  const [city, setCity] = useState(props.data.address.city);
  const [zipCode, setZipCode] = useState(props.data.address.zipcode);

  useEffect(() => {
    setVilible(true);
  }, []);

  if (props.data.id === data.chosen.id) {
    chosenClassbig = "smallBoxOrange";
    chosenClasssmall = "otherDataOrange";
    chosenClassInput = "inputOrange";
    chosenClassButtonD = "dataButtonOrange";
    chosenClassButtonL = "buttonLeftOrange";
    chosenClassButtonR = "buttonRightOrange";
    showButtons = true;
  }

  return (
    <div className={visible ? "fadeInSmall" : "fadeOut"}>
      <div className={chosenClassbig}>
        <span
          className="IDlable"
          onClick={async () => {
            dispatch({
              type: "Choose",
              payload: {
                id: props.data.id,
              },
            });
          }}
        >
          <span>ID:</span> <span>{props.data.id}</span>{" "}
        </span>
        {showButtons && (
          <span>
            <input
              className={chosenClassButtonL}
              style={{ margin: 0, marginRight: "0.9em" }}
              type="button"
              value="Posts"
              onClick={async () => {
                dispatch({
                  type: "Posts",
                });
              }}
            />
            <input
              className={chosenClassButtonR}
              style={{ margin: 0, marginRight: "0.5em" }}
              type="button"
              value="To Do's"
              onClick={async () => {
                dispatch({
                  type: "Todos",
                });
              }}
            />
          </span>
        )}

        <br />
        <div style={{ marginTop: "0.5em" }}>
          <span className="lable">Name:</span>
          <input
            className={chosenClassInput}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <span className="lable">Email: </span>
          <input
            className={chosenClassInput}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          className={chosenClassButtonD}
          type="button"
          value="Other Data"
          onMouseEnter={() => setIsShown(true)}
          onClick={() => setIsShown(!isShown)}
        />

        {isShown && (
          <div className={chosenClasssmall}>
            <span className="lable">Street:</span>
            <input
              className={chosenClassInput}
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <br />
            <span className="lable">City:</span>
            <input
              className={chosenClassInput}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <br />
            <span className="lable">Zip Code:</span>
            <input
              className={chosenClassInput}
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <br />
          </div>
        )}

        <input
          className={chosenClassButtonR}
          type="button"
          value="Update"
          onClick={async () => {
            dispatch({
              type: "Edit",
              payload: {
                id: props.data.id,
                address: {
                  city: city,
                  street: street,
                  zipcode: zipCode,
                },
                name: name,
                email: email,
              },
            });
            Toast.success("Updated Successfully", 1000);
          }}
        />
        <input
          className={chosenClassButtonL}
          type="button"
          value="Delete"
          onClick={async () => {
            dispatch({
              type: "Delete",
              payload: props.data.id,
            });
            Toast.success("Deleted Successfully", 1000);
          }}
        />
      </div>
    </div>
  );
};

export default User;
