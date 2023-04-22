import React, { Component } from "react";
import "./info.css";
import brand from "../../asset/icons/brand.png";
import image from "../../asset/images/main-image.jpg";
import image2 from "../../asset/images/main2-image.jpg";
import letsgo from "../../asset/images/lets-go.jpg";
// import arrow from "../asset/icons/circle-right-arrow.png";
import { FaFacebook, FaTwitter, FaInstagram, FaArrowAltCircleRight } from "react-icons/fa";
export default class Info extends Component {
  render() {
    return (
      <div className="info-container">
        <div className="info-header">
          <div className="navbar">
            <a href="/">
              <img src={brand} />
            </a>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  About
                </a>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>

            <ul className="navbar-nav-auth">
              <li className="nav-item">
                <a href="/login" className="nav-link">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a href="/register" className="nav-link">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="info-main">
          <div className="main-image">
            <img src={image} width="400" height={"400"} />
          </div>

          <div className="main-text">
            <ul className="text-list">
              <li className="list-item">
                <p className="list-item-text">where is this money going?</p>
              </li>

              <li className="list-item">
                <p className="list-item-text">
                  i do not know where I spent this money
                </p>
              </li>

              <li className="list-item">
                <p className="list-item-text">
                  Now I want to keep my expenses under control
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="info-main2">
          <div className="main-image">
            <img src={image2} width={"400px"} height={"400px"} />
          </div>

          <div className="main-text">
            <ul className="text-list">
              <li className="list-item">
                <p className="list-item-text">
                  If you want to see your expenses in this way
                </p>
              </li>

              <li className="list-item">
                <p className="list-item-text">
                  You can see your expenses more easily.
                </p>
              </li>

              {/* <li className="list-item">
                <p className="list-item-text">

                </p>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="info-main3">
          <div className="main-image">
            <img src={letsgo} width={"400px"} height={"400px"} />
          </div>

          <div className="slogan">
            <p>sign up now!</p>
            {/* <img src={arrow} /> */}
            <FaArrowAltCircleRight className="arrow-icon"/>
          </div>
          <div className="main-text" id="register">
            <a href="/register">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Sign Up
            </a>
          </div>
        </div>

        <div className="info-footer">
          {/* <ul>
            <li>
              <a href="#">
                <img src={facebook} width={"35px"} height={"35"} />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src={twitter}
                  width={"35"}
                  height={"35"}
                  style={{ borderRadius: "50%" }}
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={instagram} width={"35"} height={"35"} />
              </a>
            </li>
          </ul> */}

          <ul class="wrapper">
            <li class="icon facebook">
              <span class="tooltip">Facebook</span>
              <span>
                {/* <i class="fab fa-facebook-f"></i> */}
                <FaFacebook className="i"/>
              </span>
            </li>
            <li class="icon twitter">
              <span class="tooltip">Twitter</span>
              <span>
                {/* <i class="fab fa-twitter"></i> */}
                <FaTwitter className="i"/>
              </span>
            </li>
            <li class="icon instagram">
              <span class="tooltip">Instagram</span>
              <span>
                {/* <i class="fab fa-instagram"></i> */}
                <FaInstagram className="i"/>
              </span>
            </li>
            {/* <li class="icon github">
              <span class="tooltip">Github</span>
              <span>
                <i class="fab fa-github"></i>
              </span>
            </li>
            <li class="icon youtube">
              <span class="tooltip">Youtube</span>
              <span>
                <i class="fab fa-youtube"></i>
              </span>
            </li> */}
          </ul>

          <div className="cr-text">
            <p>Copyright © 2023</p>
          </div>
        </div>
      </div>
    );
  }
}
