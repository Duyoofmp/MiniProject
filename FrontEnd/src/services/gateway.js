import axios from "axios";
const baseURL = "https://asia-south1-miniproject-d3fad.cloudfunctions.net";

export const publicGateway = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
});
