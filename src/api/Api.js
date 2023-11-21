import axios from "axios";

const { EXPO_PUBLIC_BASE_URL, EXPO_PUBLIC_PORT } = process.env;

export const api = axios.create({
  baseURL: EXPO_PUBLIC_BASE_URL + EXPO_PUBLIC_PORT,
});
