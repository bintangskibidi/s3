import axios from "axios";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com", // URL API Dummy
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
