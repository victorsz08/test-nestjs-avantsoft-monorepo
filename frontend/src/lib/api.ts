import axios from "axios";


const BASE_URL = "https://reimagined-parakeet-qw45pp7jppvcxpr5-3000.app.github.dev/";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});