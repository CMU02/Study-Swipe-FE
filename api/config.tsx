import axios from "axios";
import { Platform } from "react-native";

const HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost"; // <- 핵심!

const api = axios.create({
  baseURL: `http://${HOST}:3000`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export default api;
