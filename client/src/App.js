import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" component={Login} exact={true} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
