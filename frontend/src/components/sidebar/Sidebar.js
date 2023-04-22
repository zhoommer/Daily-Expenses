import React, { Component } from "react";
import "./sidebar.css";
import { FaHome, FaRegChartBar, FaMoneyCheckAlt } from "react-icons/fa";
import { MdLogout, MdAccountCircle } from "react-icons/md";
import instance from "../../api/axios";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  m_over = () => {
    const span = document.querySelectorAll(".sidebar a span");

    for (let i = 0; i < span.length; i++) {
      span[i].style.display = "flex";
    }
  };

  m_out = () => {
    const span = document.querySelectorAll(".sidebar a span");

    for (let i = 0; i < span.length; i++) {
      span[i].style.display = "none";
    }
  };
  render() {
    return (
      <div
        className="sidebar"
        onMouseOver={this.m_over}
        onMouseOut={this.m_out}
      >
        {/* <a href="/home" className="active" id="home">
          <FaHome className="link-icon" />
          <span>Home</span>
        </a> */}
        <Link to={"home"} id="home" className="active">
          <FaHome className="link-icon" />
          <span>Home</span>
        </Link>
	

        {/* <a href="/profile" id="profile">
          <MdAccountCircle className="link-icon" />
          <span>Profile</span>
        </a> */}
        <Link to={"profile"} id="profile">
          <MdAccountCircle className="link-icon" />
          <span>Profile</span>
        </Link>

        <Link to={"charts"} id="charts">
          <FaRegChartBar className="link-icon" />
          <span>Charts</span>
        </Link> 

        <Link to={"expenses"} id="expenses">
          <FaMoneyCheckAlt className="link-icon" />
          <span>Expenses</span>
        </Link>
        <a
          href="#"
          onClick={() => {
            instance({
              method: "POST",
              url: process.env.REACT_APP_LOGOUT_URL,
            });
            setTimeout(() => {
              window.location.href = "/login";
            }, 1000);
          }}
        >
          <MdLogout className="link-icon" />
          <span>Logout</span>
        </a>
      </div>
    );
  }
}
