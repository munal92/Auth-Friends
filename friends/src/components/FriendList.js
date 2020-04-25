import React, { useState, useEffect } from "react";
import Friend from "./Friend";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png"

const FriendList = (props) => {
  const [friendData, setFriendData] = useState([]);
  const [input, setInput] = useState({
    id: "",
    name: "",
    age: "",
    email: "",
  });
  const token = window.localStorage.getItem("token");

  useEffect(() => {
   
    getData();
  
  }, []);

const getData = () => {
    axiosWithAuth()
    .get("/api/friends", token)
    .then((res) => {
      //console.log("FRIEND LIST FROM SERVER", res.data);
      setFriendData((res.data).reverse());
    })
    .catch((err) => console.log("FRIENDLIST ERR", err));
}

const deleteFriend = (id) => {
    console.log("ID", id);
    
    axiosWithAuth()
    .delete(`/api/friends/${id}`)
    .then(res => {
        getData();
    })
    .catch(err => console.log(err))

}

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value , id: friendData.length+1  });
    
   // console.log("FRIEND Form", input);
  };
  //console.log("FRIEND Form", input);

  const submitForm = (e) => {
    e.preventDefault();
    if(input.name && input.age && input.email !== ""  ){
         
    axiosWithAuth()
    .post("/api/friends",input)
    .then(res => { 
       // console.log("ADD FR AXI", res.data)
        getData();
          
    }).catch(err => {console.log("ADD FR ERR",err)})

}else alert("Fill all places!");

  };

  // console.log("FRIEND LIST use state", friendData)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      

      <div style={{ marginTop: "30px", backgroundColor: "#edf2ef" }}>
        <form
          onSubmit={submitForm}
          style={{ border: "solid 1px black", padding: "30px" }}
        >
          Add Your Friends! <br />
          <br />
          <label htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              value={input.name}
              onChange={handleChange}
              placeholder="name"
            />
          </label>
          <br />
          <br />
          <label htmlFor="age">
            <input
              id="age"
              name="age"
              type="text"
              value={input.age}
              onChange={handleChange}
              placeholder="age"
            />
          </label>
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              type="text"
              value={input.email}
              onChange={handleChange}
              placeholder="email"
            />
          </label>
          <br />
          <br />
          {/* <button type="submit">{input.isLoading ? ("LOGGING..."): ("Log In")}</button> */}
          <button type="submit">Add a Friend</button>
        </form>
        
      </div>

      <br/><img  src={Logo} /> <br/>
      {friendData.map((item) => {
        return (
            <div className="card_Container" key={item.id}> 
            
            {/* <Link to={`/protected/${item.id}`} > */}
          <Friend
            id={item.id}
            deleteFriend= {deleteFriend}
            
            name={item.name}
            age={item.age}
            email={item.email}
          />
          {/* </Link> */}
          </div>
        );
      })}
    </div>
  );
};

export default FriendList;
