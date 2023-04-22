import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../authentication/login/Login";
import Register from "../authentication/register/Register";
import Home from "../components/home/Home";
import Info from "../components/info/Info";
import Profile from "../components/profile/Profile";
import Navi from "../components/navi/Navi";
import Sidebar from "../components/sidebar/Sidebar";
import "./app.css";
import ErrorPage from "../common/404 Page/ErrorPage";
import ResetPassword from "../authentication/resetpassword/ResetPassword";
import ResetPasswordEmail from "../authentication/resetpassword/ResetPasswordEmail";
import Charts from "../components/charts/Charts";
import Expenses from "../components/expenses/Expenses";
import axiosInstance from "../api/axios";
function App() {
  const currPath = window.location.pathname.split("/");
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decoded = jwtDecode(localStorage.getItem("token"));
      if (new Date() / 1000 > decoded.exp) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    user_detail();

    document.title = "Daily Expenses";
  }, []);

  const user_detail = () => {
    axiosInstance({
      method: "GET",
      url: "/user",
    }).then((res) => {
      setPhoto(res.data.data);
    });
  };

  return (
    <div>
      {currPath[1] !== "login" &&
        currPath[1] !== "register" &&
        currPath[1] !== "forgot-password" &&
        currPath[1] !== "reset-password" &&
        currPath[1] !== "404-NotFound" &&
        currPath[1] !== "/" && (
          <>
            <Navi />
            <div className="dashboard">
              <div className="sidebar">
                <Sidebar />
              </div>

              <div className="content">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<Profile photo={photo}/>} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/expenses/:query" element={<Expenses />} />
                </Routes>
              </div>
            </div>
          </>
        )}

      <Routes>
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/" element={<Info />} />
        <Route path="/forgot-password" element={<ResetPasswordEmail />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/404-NotFound" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
