import axios from "axios";

export const analyzeText = (resType, data) => {
  return axios.post(`http://51.20.225.136/analyze-text?type=${resType}`, data);
};
