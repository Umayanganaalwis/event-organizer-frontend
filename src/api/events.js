import axios from "axios";
const API_BASE = "http://localhost:5000";

export const fetchEvents = () => axios.get(`${API_BASE}/events`);
export const fetchEventById = (id) => axios.get(`${API_BASE}/events/${id}`);
export const createEvent = (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_BASE}/events`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
