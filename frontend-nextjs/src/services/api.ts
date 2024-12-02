import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiClientSide = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_CLIENT,
  headers: {
    "Content-Type": "application/json",
  },
});
