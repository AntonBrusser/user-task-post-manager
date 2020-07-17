import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import User from "./user_component";


const Users = (props) => {
const dispatch = useDispatch();
const data = useSelector((state) => state);

const [searchKey, setSearchKey] = useState('');
const [listOfUsers,setListOfUsers] = useState([])
const [showListOfUsers,setshowListOfUsers] = useState([])

const [visible, setVilible] = useState(false)

let allUsers = []
let searchResults = []


useEffect(() => {
  setVilible(true)
},[])

useEffect(() => {
  setListOfUsers(data.users)
  setshowListOfUsers(data.users)
},[data.users])


useEffect(() => {
  if (listOfUsers.length > 0) {
    let searchKeyLower = searchKey.toLocaleLowerCase()
    data.users.map(user => {
        if (
          user.email.toLowerCase().includes(searchKeyLower) || 
          user.name.toLowerCase().includes(searchKeyLower) 
          ) {
          searchResults.push(user)
        }
      });
      setshowListOfUsers(searchResults)
  }
}, [searchKey]);



if (showListOfUsers.length > 0) {
  allUsers = showListOfUsers.map((user) => <User key={user.id} data={user} />);  
  if (data.chosen) {
    console.log(data.chosen)
    // let ifChosen = showListOfUsers.includes(data.chosen)
    // if(ifChosen === false) {
    //   dispatch({
    //     type: "ClearChosen"
    //   });
    // }
  }
}




  return (
    <div className={visible?'fadeInSmall':'fadeOut'}>
      <div className="box">
        <div>
          Search <input className="input" type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <input type="button" className="button" value="+ Add" 
          onClick={async () => {
            dispatch({
              type: "AddNewUser"
            });
          }}
           />
        </div>
        <div>
          {allUsers}
        </div>
      </div>
    </div>
  );
};

export default Users;
