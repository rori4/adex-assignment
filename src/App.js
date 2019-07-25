import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert/dist/sweetalert.css";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import "./assets/custom.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route path="/" name="Home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
