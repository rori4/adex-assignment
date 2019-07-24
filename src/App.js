import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./views/Home";
import "./App.css";
import "./assets/custom.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" name="Home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
