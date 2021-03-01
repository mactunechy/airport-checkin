import { userType } from "./../contexts/index";
import apiClient from "./client";

export const searchFlight = (credentials: userType) =>
  apiClient.post("/q", credentials);
export const checkIn = (user: userType) => apiClient.post("/q", user);
