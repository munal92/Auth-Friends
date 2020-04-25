import React from "react";
import { useParams, Route, useRouteMatch, Link } from "react-router-dom";



const Friend = (props) => {
   
    const { itemID } = useParams();
    const { path, url }  = useRouteMatch();
    console.log("ITEMID",itemID);
    console.log("path , url",path,"-----",url)

  return (
   
    <div className="card" >

     <div className="cardContent">
     {/* <Link to={`/protected/${props.id}`} > */}
      <h4>{props.name}</h4>
      <h5>Age: {props.age}</h5>
      <h5>Email: {props.email}</h5>
      {/* </Link> */}
      </div>
      <i className="cardIc" onClick={() => props.deleteFriend(props.id)} className="cardIc" >X</i>
      </div>  
     
  );
};

export default Friend;
