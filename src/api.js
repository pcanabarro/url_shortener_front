import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/url';

export const getAllUrls = async () => {
  return await axios.get(`${API_BASE_URL}/all`);
};

export const getUrlById = async (id) => {
  return await axios.get(`${API_BASE_URL}/${id}`);
};

export const createUrl = async (urlData) => {
  return await axios.post(`${API_BASE_URL}/`, urlData);
};

export const createRandomUrl = async (randomData) => {
  return await axios.post(`${API_BASE_URL}/random`, randomData);
};

export const updateUrl = async (urlData) => {
  return await axios.put(`${API_BASE_URL}/`, urlData);
};

export const deleteUrl = async (id) => {
  return await axios.delete(`${API_BASE_URL}/${id}`);
};
