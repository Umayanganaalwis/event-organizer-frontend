import axios from "axios";
const API_BASE = "http://localhost:5000";

export const rsvpToEvent = (eventId) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${API_BASE}/events/${eventId}/rsvp`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getRsvps = (eventId) => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_BASE}/events/${eventId}/rsvps`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
