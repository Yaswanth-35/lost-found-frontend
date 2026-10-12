


import axios from "axios";

const api = axios.create({
    baseURL: "https://lost-found-backend-1qqr.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
