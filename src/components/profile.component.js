import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      this.setState({ redirect: "/home" });
    }
    else {
      this.setState({ currentUser: currentUser, userReady: true });
 
          AuthService.getFactura(localStorage.getItem('folio'), localStorage.getItem('token'))
          .then(response => {
              var b64 = response.detail[0].f_bas64_rg.toString();
              localStorage.setItem('base64', b64);
              
              var obj = document.createElement('object');
              obj.style.width = '100%';
              obj.style.height = '842pt';
              obj.type = 'application/pdf';
              obj.data = 'data:application/pdf;base64,' + b64;
              document.body.appendChild(obj);
              
          });          
      //});
    }
  }

  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    //const { currentUser } = this.state;

    return (
      null
    );
  }
}
