import axios from 'axios';

let backendHost = 'http://192.168.1.33:5000';
if (process.env.NODE_ENV === 'production') {
  backendHost = 'http://192.168.220.2:5000';
}

const axiosInstance = axios.create({
  baseURL: `${backendHost}/portal`,
});

export default axiosInstance;
