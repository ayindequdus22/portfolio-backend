import axios from "axios";

const Axios = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL, timeout: 30000, withCredentials: true });
console.log(import.meta.env.VITE_APP_API_URL)
export default Axios;