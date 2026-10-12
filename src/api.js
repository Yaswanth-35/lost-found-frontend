

import axios from "axios";

const API_URL = "https://lost-found-backend-1qqr.onrender.com";

const api = axios.create({
    baseURL: API_URL
});

export default api;
