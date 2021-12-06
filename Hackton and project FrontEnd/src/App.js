import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./containers/Login";
import Home from "./containers/Home";
import UserManagement from "./containers/UserManagement";
import React, { useState } from 'react';
import HomePageTabs from "./components/amir/homelPageTabs";
import Header from "./components/Ali/Header";

function App() {
  const [token, setToken] = useState();
  const [role, setRole] = useState("");

  if(!token){
    return <Login setToken={setToken} />
  }

    return (
        <Router>
            <Header />
            <h1>123</h1>
            <div>
                {/* <Link to="/">Login</Link>
        <Link to="/">Home</Link>
        <Link to="/Users">User Management</Link> */}
            </div>

            {/* <hr /> */}

            <Routes>
                {/*<Route exact path="/" element={<Login/>}>
        </Route>
        <Route exact path="/" element={<Home token={token}/>}>
        </Route> */}
                <Route exact path="/" element={<HomePageTabs token={token}/>}>
                </Route>
                {/* <Route exact path="/Users" element={<UserManagement/>}>
                </Route> */}
            </Routes>
        </Router>
    );

}

export default App;
