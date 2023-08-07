import axios from "axios";

const baseURL = "https://theater.m-alorfali.com";
export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
