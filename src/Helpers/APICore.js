import axios from 'axios';

export const BASE_URL = 'https://thecocktaildb.com/api/json/v1/1/';

const axiosApi = axios.create({
  baseURL: BASE_URL,
});

export async function get(url, config) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response);
}