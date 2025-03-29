import axios from "axios";

export const analyzeText = (data) => {
  return axios.post("http://51.20.225.136/analyze-text", data);
};
