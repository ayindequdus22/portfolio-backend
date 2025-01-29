import axios from "axios";
// withCredentials: true,
const baseURL = import.meta.env.VITE_APP_API_URL;
const Axios = axios.create({baseURL: baseURL, });
const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
const cloudUploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
const cloudUploadFolder = import.meta.env.VITE_UPLOAD_FOLDER;
export {
    cloudName, cloudUploadFolder, cloudUploadPreset
}
export default Axios;