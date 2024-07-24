import axios from "axios";

const API_URL = "https://gmail-clone-backend-8i1k.onrender.com";
// console.log(process.env.REACT_APP_USERNAME);
const API_GMAIL = async (urlObject, payload, type) => {
  return await axios({
    method: urlObject.method,
    url: `${API_URL}/${urlObject.endpoint}/${type}`,
    data: payload,
  });
};
export default API_GMAIL;
