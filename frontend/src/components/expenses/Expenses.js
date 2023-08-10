import React, { useEffect, useState } from "react";
import "./expenses.css";
import { Table } from "reactstrap";
import { Pagination } from "@mui/material";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import instance from "../../api/axios";
import alertify from "alertifyjs";
import { useDispatch, useSelector } from "react-redux";
import { getStates } from "../../redux/features/homeStates/homeStatesSlice";
import axiosInstance from "../../api/axios";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [pageSize, setPageSize] = useState([]);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const [addExpenseValues, setAddExpenseValues] = useState([
    {
      date: "",
      explain: "",
      amount: "",
      category: "",
      new_category: "",
    },
  ]);

  console.log(addExpenseValues);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }

    const currPath = window.location.pathname.split("/");

    if (currPath[1] === "expenses") {
      document.getElementById("searchInput").disabled = false;

      document.getElementById("expenses").classList.add("active");

      document.getElementById("home").classList.remove("active");
      document.getElementById("profile").classList.remove("active");
      document.getElementById("charts").classList.remove("active");
    }

    dispatch(getStates());
    getExpenses();
    getCategories();
  }, []);

  const getExpenses = (page) => {
    if (!page) {
      instance({
        method: "GET",
        url: "/expenses",
      }).then((res) => {
        setPageSize(res.data.pageSize);
        setExpenses(res.data.data);
      });
    }

    instance({
      method: "GET",
      url: `/list/${parseInt(page)}`,
    })
      .then((res) => {
        setPageSize(res.data.pageSize);
        setExpenses(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const paginationPage = (e, p) => {
    e.preventDefault();
    getExpenses(p);
  };

  const filteredExpenses = useSelector((state) => state.filteredExpenses)
    .filteredExpenses.data;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddExpenseValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const addExpense = () => {
    instance({
      method: "POST",
      url: "/add",
      data: {
        isim: addExpenseValues.explain,
        tutar: parseFloat(addExpenseValues.amount),
        kategori: addExpenseValues.category,
        tarih: new Date(addExpenseValues.date).toISOString(),
      },
    }).then(() => {
      alertify.success("Data successfully created");
      setTimeout(() => {
        window.location.href = "/expenses";
      }, 1000);
    });
  };
  // const categories = useSelector((state) => state.homeState.labels.data);

  const getCategories = () => {
    axiosInstance({
      method: "GET",
      url: "/categories",
    })
      .then((res) => {
        setCat(res.data.data);
      })
      .catch((err) => {
        alertify.error(err);
      });
  };
  
  return (
    <div>
      <div className="addExpense">
        <div>
          <input type={"date"} name="date" onChange={handleChange} />
          <input
            type={"text"}
            placeholder="Explanation"
            name="explain"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type={"text"}
            placeholder="Amount ₺"
            name="amount"
            onChange={handleChange}
          />
          <select onChange={handleChange} name="category">
            <option selected>Category</option>
            {cat.length > 0 ? (
              cat.map((item) => (
                <option value={item.name} key={item.id}>{item.name}</option>
              ))
            ) : (
              <option>No Category!</option>
            )}
          </select>
        </div>
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <Table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Explanation</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses
            ? filteredExpenses.map((filter, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{moment(filter.tarih).format("DD.MM.YYYY")}</td>
                  <td>{filter.isim}</td>
                  <td>{filter.tutar} ₺</td>
                  <td>{filter.kategori}</td>
                  <td>
                    <button
                      onClick={() => {
                        alertify.confirm(
                          "<h3>Delete</h3>",
                          `Are you sure you want to delete the <b>${filter.isim}</b>?`,
                          function () {
                            instance({
                              method: "POST",
                              url: `/delete/${filter.id}`,
                            }).then(() => {
                              alertify.success("Data was Deleted Successfully");
                              setTimeout(() => {
                                window.location.href = "/expenses";
                              }, 1000);
                            });
                          },
                          function () {
                            alertify.error("The Transaction Has Been Canceled");
                          }
                        );
                      }}
                    >
                      <FaTrash size={15} />
                    </button>
                  </td>
                </tr>
              ))
            : expenses.map((expense, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{moment(expense.tarih).format("DD.MM.YYYY")}</td>

                  <td>{expense.isim}</td>
                  <td>{expense.tutar} ₺</td>
                  <td>{expense.kategori}</td>
                  <td>
                    <button
                      onClick={() => {
                        alertify.confirm(
                          "<h3>Delete</h3>",
                          `Are you sure you want to delete the <b>${expense.isim}</b>?`,
                          function () {
                            instance({
                              method: "POST",
                              url: `/delete/${expense.id}`,
                            }).then(() => {
                              alertify.success("Data was Deleted Successfully");
                              setTimeout(() => {
                                window.location.href = "/home";
                              }, 1000);
                            });
                          },
                          function () {
                            alertify.error("The Transaction Has Been Canceled");
                          }
                        );
                      }}
                    >
                      <FaTrash size={15} className="deleteIcon" />
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>

      <div className="pagination">
        <Pagination
          onChange={paginationPage}
          showFirstButton
          showLastButton
          variant="outlined"
          shape="rounded"
          color="primary"
          count={pageSize}
          className="paginate"
          size="small"
        ></Pagination>
      </div>
    </div>
  );
}
