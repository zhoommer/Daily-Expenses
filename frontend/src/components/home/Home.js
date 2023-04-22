import React, { useEffect } from "react";
import "./home.css";
import DoughnutChar from "./DoughnutChar";
import { useDispatch, useSelector } from "react-redux";
import { getStates } from "../../redux/features/homeStates/homeStatesSlice";

function Home() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }

    dispatch(getStates());

    const currPath = window.location.pathname.split("/");
    if (currPath[1] === "expenses") {
      document.getElementById("searchInput").disabled = false;
    } else {
      document.getElementById("searchInput").disabled = true;
    }

    if (currPath[1] === "home") {
      document.getElementById("home").classList.add("active");
      document.getElementById("profile").classList.remove("active");
      document.getElementById("charts").classList.remove("active");
      document.getElementById("expenses").classList.remove("active");
    }
  }, []);

  const dispatch = useDispatch();

  const new_labels = useSelector((state) => state.homeState.labels.data);
  const new_amount = useSelector((state) => state.homeState.amount.data);

  return (
    <div className="doughnutDiv" style={{ width: "80%" }}>
      <div className="doughnut">
        <h3 className="text-center text-danger">Expenses</h3>
        {<DoughnutChar /> ? (
          <DoughnutChar />
        ) : (
          <div className="text-center text-muted fw-bold">
            Cannot display donut chart <span className="text-danger">!!!</span>
          </div>
        )}
      </div>
      <div className="d-flex m-auto mt-3 border rounded p-2" id="chart-info">
        <ul className="fw-bold">
          {new_labels
            ? new_labels.labels.map((label) => (
                <li className="labels" key={label.index}>
                  {label}
                </li>
              ))
            : null}
        </ul>

        <ul style={{ listStyle: "none" }}>
          {new_labels
            ? new_labels.labels.map(() => (
                <li className="text-dark" key={new_labels.index}>
                  =
                </li>
              ))
            : null}
        </ul>

        <ul style={{ listStyle: "none" }} className="fw-bold text-dark">
          {new_amount
            ? new_amount.data.map((a) => (
                <li key={new_amount.index}>{parseFloat(a).toFixed(2)} ₺</li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

export default Home;
