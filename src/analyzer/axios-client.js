import axios from "axios";

export const relayClient = axios.create({
    baseURL: "http://192.168.1.250:5000",
    // TODO: timeout should equal sample time
    timeout: 1000
});