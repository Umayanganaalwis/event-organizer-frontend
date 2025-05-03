import axios from 'axios';
const API_BASE = 'http://localhost:5000';

export const loginUser = (credentials) =>
  axios.post(`${API_BASE}/login`, credentials);

export const signupUser = (data) =>
  axios.post(`${API_BASE}/signup`, data);