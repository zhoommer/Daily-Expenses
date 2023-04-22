import React, { useEffect } from "react";

export default function Charts() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }

    const currPath = document.location.pathname.split("/");
    if (currPath[1] === "expenses") {
      document.getElementById("searchInput").disabled = false;
    } else {
      document.getElementById("searchInput").disabled = true;
    }

    if (currPath[1] === "charts") {
      document.getElementById("home").classList.remove("active");
      document.getElementById("profile").classList.remove("active");

      document.getElementById("charts").classList.add("active");
      document.getElementById("expenses").classList.remove("active");
    }
  });
  return (
    <div>
      <h1 className="text-center text-danger">Charts</h1>

      <p className="fw-bold text-center">
        This function will be coming very soon...
      </p>
    </div>
  );
}
