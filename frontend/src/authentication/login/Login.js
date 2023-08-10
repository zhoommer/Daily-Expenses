import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./login.css";
import {
  FaUser,
  FaLock,
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaLinkedinIn,
  FaEnvelope,
  FaMobile,
} from "react-icons/fa";
import loginImage from "../../asset/images/log.svg";
import registerImage from "../../asset/images/register.svg";
import alertify from "alertifyjs";
import ReactInputMask from "react-input-mask";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    lastname: "",
    mobile: "",
    email: "",
    pass: "",
    repass: "",
  };

  componentDidMount = () => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    console.log(this.state.username);
    e.preventDefault();
    axios({
      method: "POST",
      url: process.env.REACT_APP_LOGIN_URL,
      data: {
        email: this.state.username,
        password: this.state.password,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        <Navigate to="/home" />;
        window.location.href = "/home";
      })
      .catch((err) => {
        alertify.error(err.response.data.message);
      });
  };

  registerButton = () => {
    if (this.state.pass !== this.state.repass) {
      alertify.error("Password Not Match!");
    } else {
      axios({
        method: "POST",
        url: process.env.REACT_APP_REGISTER_URL,
        data: {
          name: this.state.name,
          lastname: this.state.lastname,
          mobile: this.state.mobile,
          email: this.state.email,
          password: this.state.pass,
        },
      })
        .then(() => {
          alertify.success("Registration Successful");
          window.location.href = "/login"
        })
        .catch((err) => {
          console.log(err);
          alertify.error(err.response.data.message);
        });
    }
  };

  render() {
    return (
      <div className="container">
        <div class="forms-container">
          <div class="signin-signup">
            <form action="#" class="sign-in-form" method="POST">
              <h2 class="title">Sign in</h2>
              <div class="input-field">
                <i>
                  <FaUser />
                </i>
                <input
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                  placeholder="User Name"
                  required
                />
              </div>
              <div class="input-field">
                <i>
                  <FaLock />
                </i>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              <input
                type="submit"
                value="Log in"
                className="button"
                onClick={this.handleSubmit}
              />
              <a href="/forgot-password" className="forgotPass">
                forgot password?
              </a>
              <p class="social-text">Or Login Via Social Platforms</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i>
                    <FaFacebookF />
                  </i>
                </a>
                <a href="#" class="social-icon">
                  <i>
                    <FaTwitter />
                  </i>
                </a>
                <a href="#" class="social-icon">
                  <i>
                    <FaGoogle />
                  </i>
                </a>
                <a href="#" class="social-icon">
                  <i>
                    <FaLinkedinIn />
                  </i>
                </a>
              </div>
            </form>
            {/* <!-- REGISTER AREA --> */}
            <form action="#" class="sign-up-form" method="POST">
              <h2 class="title">Sign up</h2>
              <div class="input-field">
                <i>
                  <FaUser />
                </i>
                <input
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  placeholder="First Name"
                  required
                />
              </div>
              <div class="input-field">
                <i>
                  <FaUser />
                </i>
                <input
                  type="text"
                  name="lastname"
                  onChange={this.handleChange}
                  placeholder="Last Name"
                  required
                />
              </div>
              <div class="input-field">
                <i>
                  <FaMobile />
                </i>
                <ReactInputMask
                  mask="(999) 999-99-99"
                  onChange={this.handleChange}
                  required
                >
                  {() => (
                    <input type="tel" name="mobile" placeholder="Mobile" />
                  )}
                </ReactInputMask>
              </div>
              <div class="input-field">
                <i>
                  <FaEnvelope />
                </i>
                <input
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div class="input-field">
                <i>
                  <FaLock />
                </i>
                <input
                  type="password"
                  name="pass"
                  onChange={this.handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              <div class="input-field">
                <i>
                  <FaLock />
                </i>
                <input
                  type="password"
                  name="repass"
                  onChange={this.handleChange}
                  placeholder="Repassword"
                  required
                />
              </div>
              <input
                type="submit"
                class="button"
                value="Register"
                onClick={this.registerButton}
              />
              <p class="social-text">Or Register Via Social Platforms</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i>
                    <FaFacebookF />
                  </i>
                </a>
                <a href="#" class="social-icon">
                  <i>
                    <FaTwitter />
                  </i>
                </a>
                <a href="#" class="social-icon">
                  <i>
                    <FaGoogle />
                  </i>
                </a>
                <a href="#" class="social-icon">
                  <i>
                    <FaLinkedinIn />
                  </i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              {/* <h3>Buradan Kayıt Olabilirsiniz</h3> */}
              {/* <p>Kayıt Oluştur ve Alışverişin Tadını Çıkar...</p> */}
              <button class="btn transparent" id="sign-up-btn">
                Sign up
              </button>
              {/* <p>Anasayfaya Dönmek İçin</p> */}
              {/* <button class="btn transparent">
                <a style={{ color: "#fff", textDecoration: "none" }} href="#">
                  Anasayfaya
                </a> */}
              {/* </button> */}
            </div>
            <img src={loginImage} class="image" alt="" />
          </div>
          <div class="panel right-panel">
            <div class="content">
              {/* <h3>Buradan Giriş Yapabilirsiniz</h3> */}
              {/* <p>Giriş Yap ve Alışverişin Tadını Çıkar...</p> */}
              <button class="btn transparent" id="sign-in-btn">
                Sign in
              </button>
              {/* <p>Anasayfaya Dönmek İçin</p> */}
              {/* <button class="btn transparent"> */}
              {/* <a style={{ color: "#fff", textDecoration: "none" }} href="#"> */}
              {/* Anasayfaya */}
              {/* </a> */}
              {/* </button> */}
            </div>
            <img src={registerImage} class="image" alt="" />
          </div>
        </div>
      </div>
    );
  }
}
