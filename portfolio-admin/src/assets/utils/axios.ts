import axios from "axios";

const Axios = axios.create({ baseURL: import.meta.env.APP_API_URL, timeout: 4000, withCredentials: true });
export default Axios;