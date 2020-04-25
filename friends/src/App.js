import React from 'react';
import logo from './logo.svg';
import './App.css';
import LogIn from "./components/LogIn"
import FriendList from "./components/FriendList"
import {Route,Link,Switch, Router} from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import Friend from './components/Friend';



function App() {

const ben = "ben";


  return (
    <div className="App">

        <nav style={{border:"solid 1px teal"}}>
          <ul>
           <Link style={{textDecoration:"none"}} to="/login">  <li>Log In </li></Link>
            {/* <li component={Link} to={"/login"}>Log In</li>
             */}
            <Link style={{textDecoration:"none"}} to="/protected">  <li>Protected Route </li></Link>
          </ul>
        </nav>


      <Switch>
      {/* <PrivateRoute path="/protected/:itemID" component={Friend}  /> */}
        <PrivateRoute path="/protected" component={FriendList}  />
        {/* <PrivateRoute path="/protected" render={ () => <FriendList ben={ben} /> }   /> */}
             {/* <PrivateRoute path="/protected">
               <FriendList/>
             </PrivateRoute> */}
     

        <Route exact path = "/login">
          <LogIn />
        </Route>
     
      <Route > 
        <LogIn/>
      </Route>


      </Switch>
     
    </div>
  );
}

export default App;
