import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom"
import Logo from "../img/logo.png"

const LogIn = (props) => {

const pusht = useHistory();


  const [input, setInput] = useState({
    isLoading:false ,
    credentials: {
      username: "",
      password: "",
    }
  });
  const handleChange = (e) => {
    setInput( {  credentials:{ ...input.credentials, [e.target.name]: e.target.value } });
  };

 // console.log("form", input);

  const submitForm = (e) => {
    //e.prevenDefault();
    e.preventDefault();
    //console.log("form output", input)
    setInput({...input,isLoading:true})
    // axiosWithAuth()
    setTimeout(() => {
      axiosWithAuth().post("/api/login", input.credentials)
      .then(res => {console.log("POST API RES", res)
      window.localStorage.setItem("token",res.data.payload)
      setInput({...input,isLoading:false})
      pusht.push("/protected");
  })
      .catch(err => console.log("POST API ERR", err), setInput({...input,isLoading:false}))
 
    },1000)
  };
    
    

  return (
    <div style={{ marginTop: "60px", backgroundColor: "#edf2ef" }}>
     
     
      <form
        onSubmit={submitForm}
        style={{ border: "solid 1px black", padding: "30px" }}
      >
        <img  src={Logo} /> <br/><br/>
        <label htmlFor="username">
          <input
            id="username"
            name="username"
            type="text"
            value={input.username}
            onChange={handleChange}
            placeholder="name lambda"
          />
        </label>
        <br />
        <br />
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="text"
            value={input.password}
            onChange={handleChange}
            placeholder="password school"
          />
        </label>
        <br />
        <br />
  {/* <button type="submit">{input.isLoading ? ("LOGGING..."): ("Log In")}</button> */}
  {input.isLoading ? (<button type="submit" > <i className="fa fa-spinner fa-spin"></i> Processing</button>): (<button type="submit">Log In</button>)}
      </form>
    </div>
  );
};

export default LogIn;
