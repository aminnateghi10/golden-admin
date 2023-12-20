import axios from "axios";
import Cookies from "universal-cookie";
const {REACT_APP_API_URL} = process.env;

const callApi = () => {
    const cookies = new Cookies();
    const axiosInstance = axios.create({
        baseURL: "https://api.asdfasdfasdf.cfd/api/v1",
        headers: {'Authorization': cookies.get('token')}
    })
    axiosInstance.interceptors.request.use(
        (config) => {
            config.withCredentials = false
            return config
        },
        err => {
            throw err
        }
    )
    axiosInstance.interceptors.response.use(
        (res) => {
            return res
        },
        err => {
            const res = err?.response
            {
                throw res
            }
        }
    )
    return axiosInstance;
}

export default callApi;
