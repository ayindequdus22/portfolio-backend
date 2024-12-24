import axios from "axios";

const Axios = axios.create({ baseURL: import.meta.env.VITE_BASE_URL, timeout: 4000, });
export default Axios;