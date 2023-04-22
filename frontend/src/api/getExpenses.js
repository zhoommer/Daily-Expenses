import axiosInstance from "./axios";

export async function GetExpenses(page) {
  try {
    const res = await axiosInstance.get(`/list/${page}`);
    return res.data.data;
  } catch (err) {
    return console.log("e", err);
  }
}
