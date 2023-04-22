import React, { useEffect, useState } from "react";
import "./navi.css";
import brand from "../../asset/icons/brand.png";
import { FaUserLock, FaSearch } from "react-icons/fa";
import { MdLogout, MdAccountCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getFilteredExpenses } from "../../redux/features/filteredExpenses/filteredExpensesSlice";

function Navi(props) {
  useEffect(() => {
    const currPath = window.location.pathname.split("/");

    if (currPath[1] === "expenses") {
      document.getElementById("searchInput").disabled = false;
    } else {
      document.getElementById("searchInput").disabled = true;
    }
  });

  const dispatch = useDispatch();

  const filter = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch(getFilteredExpenses({ [name]: value }.search));
  };

  const avatar_m_over = () => {
    const div = document.querySelector(".hr-toggle-div");

    div.style.display = "block";
  };

  const avatar_m_out = () => {
    const div = document.querySelector(".hr-toggle-div");

    div.style.display = "none";
  };
  return (
    <div className="header">
      <div className="header-brand">
        <a href="/home">
          <img src={brand} alt="brand"/>
        </a>
      </div>

      <div className="header-center">
        <input
          disabled
          id="searchInput"
          type="search"
          placeholder="Search"
          name="search"
          // onKeyDownCapture={filter}
          onChange={filter}
        />

        <FaSearch className="searchIcon" id="searchIcon"/>

        {/* <a href="#">Link1</a>
            <a href="#">Link2</a>
            <a href="#">Link3</a> */}
      </div>

      <div className="header-right">
        <button onMouseOver={avatar_m_over}>
          <img src={"#"} alt="user"/>
        </button>
        <div
          className="hr-toggle-div"
          onMouseOver={avatar_m_over}
          onMouseOut={avatar_m_out}
        >
          <a href="/profile">
            <MdAccountCircle className="link-icon" />
            <span>Profile</span>
          </a>
          <a href="#">
            <FaUserLock className="link-icon" />
            <span>Change Password</span>
          </a>
          <a href="#">
            <MdLogout className="link-icon" />
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Navi;
