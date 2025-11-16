import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:5000/api",
    // baseURL: "https://crazy-webs-lose.loca.lt/api",
    withCredentials: true,
});

export default apiRequest;