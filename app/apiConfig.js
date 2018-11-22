import axios from 'axios';

const backendHost = 'http://localhost:5000';
// if (process.env.NODE_ENV === 'production') {
//   backendHost = 'http://192.168.220.2:5000';
// }

const axiosInstance = axios.create({
  baseURL: `${backendHost}/portal`,
});

export default axiosInstance;
