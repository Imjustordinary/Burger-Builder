import axios from "axios";

const axiosOrder = axios.create({
  baseURL: "https://react-burger-3a037.firebaseio.com/",
});

export default axiosOrder;
