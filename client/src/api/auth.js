import api from "./axios";

export const loginAdmin = (credentials) =>
  api.post("/auth/login", credentials);
