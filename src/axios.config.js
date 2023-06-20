import axios from "axios";

const http = axios.create()

http.defaults.baseURL = 'https://mega-to-do-app-6b08e-default-rtdb.asia-southeast1.firebasedatabase.app'

export default http