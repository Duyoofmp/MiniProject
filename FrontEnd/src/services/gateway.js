import axios from "axios";
const baseURL = "http://localhost:5000/miniproject-d3fad/asia-south1/";

export const publicGateway = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
});
