import React, { useEffect, useState } from "react";
import "./profile.css";
import instance from "../../api/axios";
import { FaLightbulb } from "react-icons/fa";

export default function Profile(props) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const currPath = window.location.pathname.split("/");

    if (currPath[1] === "expenses") {
      document.getElementById("searchInput").disabled = false;
    } else {
      document.getElementById("searchInput").disabled = true;
    }

    if (currPath[1] === "profile") {
      document.getElementById("profile").classList.add("active");
      document.getElementById("home").classList.remove("active");
      document.getElementById("charts").classList.remove("active");
      document.getElementById("expenses").classList.remove("active");
    }
    getUserInfo();
  }, []);


  const getUserInfo = () => {
    instance({
      method: "GET",
      url: "/user-detail",
    })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(user);
  return (
    <div className="profileComp">
      <div className="profileCard">
        <div className="profileImage">
          <img
            src="#"
            alt="user"
          />
        </div>
        {user.map((u) => (
          <div className="profileText">
            <ul key={u.id}>
              <li>
                <span>
                  {u.name} {u.lastname}
                </span>
              </li>

              <li>
                <span>{u.email}</span>
              </li>
            </ul>
            <ul>
              <li>
                <span>{u.mobile}</span>
              </li>

              <li>
                <span>
                  Active:{" "}
                  <span>
                    <FaLightbulb className="activeIcon" />
                  </span>
                </span>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div>2</div>
    </div>
  );
}
