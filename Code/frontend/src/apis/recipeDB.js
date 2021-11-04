import axios from "axios";

export default axios.create({
  baseURL: "http://##serverIp##/api/v1",
});
