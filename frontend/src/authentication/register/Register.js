import React, { Component } from "react";
import "./register.css";
import axios from "axios";
import alertify from "alertifyjs";
import ReactInputMask from "react-input-mask";
export default class Register extends Component {
  state = {
    name: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
    repassword: "",
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    if (this.state.password != this.state.repassword) {
      alertify.error("Password Not Match!");
    } else {
      e.preventDefault();
      axios({
        method: "POST",
        url: process.env.REACT_APP_REGISTER_URL,
        data: {
          name: this.state.name,
          lastname: this.state.lastname,
          mobile: this.state.mobile,
          email: this.state.email,
          password: this.state.password,
        },
      })
        .then(() => {
          alertify.success("Registration Successful");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          err.response.data.message.map((e) => {
            alertify.error(e);
          });
        });
    }
  };
  render() {
    return (
      <div className="container">
        <div className="box1"></div>

        <div className="box2">
          <h4>Register</h4>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            onChange={this.handleChange}
            required
          />
          <ReactInputMask
            mask="(999) 999-99-99"
            onChange={this.handleChange}
            required
          >
            {() => <input type="tel" name="mobile" placeholder="Mobile" />}
          </ReactInputMask>

          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            placeholder="Re-Password"
            name="repassword"
            onChange={this.handleChange}
            required
          />
          <button onClick={this.handleSubmit}>Register</button>

          <a href="/login">if you already have an account</a>
        </div>
      </div>
    );
  }
}
