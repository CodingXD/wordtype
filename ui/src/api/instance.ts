import axios from "axios";

const fetcher = axios.create({
  baseURL: "http://localhost:3000",
});

export default fetcher;
