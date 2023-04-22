import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import instance from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { getStates } from "../../redux/features/homeStates/homeStatesSlice";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);
export default function DoughnutChar() {
  const dispatch = useDispatch();

  useState(() => {
    dispatch(getStates());
  });

  const d = useSelector((state) => state.homeState.amount.data);
  const l = useSelector((state) => state.homeState.labels.data);
  const data = {
    labels: l ? l.labels : null,
    datasets: [
      {
		  label: "Total Amount",
        data: d ? d.data : null,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(27, 38, 49, 0.2)",
          "rgba(100, 30, 22, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(27, 38, 49, 1)",
          "rgba(100, 30, 22, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
}
