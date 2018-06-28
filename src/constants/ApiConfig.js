import axios from "axios";

let backendHost;
const apiVersion = "v1";

const hostname = window && window.location && window.location.hostname;

if (hostname === "way-connect.com") {
  backendHost = "https://api.way-connect.com";
} else if (hostname === "wayconnect-portal.herokuapp.com") {
  backendHost = "https://wayconnect.herokuapp.com";
} else {
  backendHost = "http://localhost:8000";
}

backendHost = "http://localhost:5000";
export const axiosInstance = axios.create({
  baseURL: backendHost,
});

// export const API_ROOT = `${backendHost}/api/${apiVersion}`;
export const API_ROOT = backendHost;
