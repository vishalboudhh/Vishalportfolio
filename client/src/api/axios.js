import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

/* ---------------- TOKEN ---------------- */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ---------------- SIMPLE CACHE ---------------- */
const cache = new Map();

/* ---------------- REQUEST CACHE ---------------- */
api.interceptors.request.use((config) => {
  if (config.method === "get") {
    const cachedResponse = cache.get(config.url);

    if (cachedResponse) {
      config.adapter = () =>
        Promise.resolve({
          data: cachedResponse,
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        });
    }
  }

  return config;
});

/* ---------------- RESPONSE CACHE ---------------- */
api.interceptors.response.use(
  (response) => {
    if (response.config.method === "get") {
      cache.set(response.config.url, response.data);
    }

    // 🔥 IMPORTANT: clear cache on write operations
    if (["post", "put", "delete"].includes(response.config.method)) {
      cache.clear();
    }

    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
