import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {getFolio, getFactura, getToken} from "../services/auth.service";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      console.log('Hola mundo');
      //AuthService.login(this.state.username, this.state.password).then(
        
      getToken().then(token => {
        console.log('Token: ' + token);
        localStorage.setItem('token', token);
      }).then(
        () => {
    
          getFolio(this.state.username, this.state.password,localStorage.getItem('token'))
            .then(response => {
              let folio = response.detail[0].f_folio.toString();
              localStorage.setItem('folio', folio);
            })
            .then(
              ()=>{
    
                getFactura(localStorage.getItem('folio'), localStorage.getItem('token'))
                  .then(response => {
                    var b64 = response.detail[0].f_bas64_rg.toString();
                    localStorage.setItem('base64', b64);
                    //var link = 'data:application/octet-stream;base64,' + b64;
                    //console.log(link);

                    // Embed the PDF into the HTML page and show it to the user
                    var obj = document.createElement('object');
                    obj.style.width = '100%';
                    obj.style.height = '842pt';
                    obj.type = 'application/pdf';
                    obj.data = 'data:application/pdf;base64,' + b64;
                    document.body.appendChild(obj);

                    // Insert a link that allows the user to download the PDF file
                    var link = document.createElement('a');
                    link.innerHTML = 'Download PDF file';
                    link.download = 'file.pdf';
                    link.href = 'data:application/octet-stream;base64,' + b64;
                    document.body.appendChild(link);		
                  });
    
              }
            )
    
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
