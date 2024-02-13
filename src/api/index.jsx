import axios from "axios"; //import axios
import Cookies from "js-cookie"; //import js cookie

const Api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL, //set endpoint API

  //set header axios
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

//handle unathenticated
Api.interceptors.response.use(
  function (response) {
    return response; //return response
  },
  (error) => {
    //check if response unauthenticated
    if (401 === error.response.status) {
      Cookies.remove("token"); //remove token

      window.location = "/admin/login"; //redirect to login page
    } else {
      return Promise.reject(error); //return error
    }
  }
);

export default Api;
