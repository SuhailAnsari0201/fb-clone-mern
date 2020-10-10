import axios from "axios";

const instance = axios.create({
  baseURL: "https://fb-clone-mern.herokuapp.com",
});
export default instance;
//"http://localhost:9000",
