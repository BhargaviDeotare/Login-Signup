import "./App.css";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { Router, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div className="App">
      <Router>
        <BrowserRouter>
          <Route exact path="/">
            {user && user._id ? (
              <Home setLoginUser={setLoginUser} />
            ) : (
              <Login setLoginUser={setLoginUser} />
            )}
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </BrowserRouter>
      </Router>
    </div>
  );
}

export default App;
