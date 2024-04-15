import axios from "axios";

// const api = axios.create({
//   baseURL: "https://be-project-backend.vercel.app/api/v1",
//   withCredentials: true,
// });
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

export default api;
