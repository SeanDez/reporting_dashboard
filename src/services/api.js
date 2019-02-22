import axios from "axios";

export const coldStart = () => {
  return axios
    .get("/coldStart?now=true")
    .then(response => {
      console.log(response.data, `=====response.data=====`);
    });
};


