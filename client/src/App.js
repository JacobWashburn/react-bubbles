import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from './Utils/PrivateRoute';

import Login from "./components/Login";
import "./styles.scss";
import BubblePage from './components/BubblePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/login" component={Login} />
        <PrivateRoute path='/bubbles/' component={BubblePage}/>
      </div>
    </Router>
  );
}

export default App;
