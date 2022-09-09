import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//import AuthService from "./services/auth.service";

import Login from "./components/login.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
    };
  }
/*
  componentDidMount() {
    const user = AuthService.getCurrentUser();    
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }*/

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Siesa
          </Link>          
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Login} />
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;
