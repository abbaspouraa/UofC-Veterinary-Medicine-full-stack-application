import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./components/content/LogInPage/Login";
import React, { useState } from 'react';
import HomePageTabs from "./components/homePage/homelPageTabs";
import Header from "./Header";

function App() {
  const [token, setToken] = useState();

  if(!token){
    return <Login setToken={setToken} />
  }

    return (
        <div className="default-background">
            <Router>
                <Header />
                <h1>123</h1>

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
        </div>
    );

}

export default App;
