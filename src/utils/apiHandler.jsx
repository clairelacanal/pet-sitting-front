import axios from "axios";
import { API_BASE_URL } from "../consts";

class ApiHandler {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
    });

    this.api.interceptors.request.use(
      (config) => {
        const authToken = localStorage.getItem("authToken");

        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  login(creadentials) {
    return this.api.post("/users/login", creadentials);
  }

  signup(data) {
    return this.api.post("/users/signup", data);
  }

  getAllAnnonces() {
    return this.api.get("/annonces");
  }

  getAnnoncesByCity(city) {
    return this.api.get(`/annonces?city=${encodeURIComponent(city)}`);
  }

  getAnnoncesByFilters(query) {
    return this.api.get(`/annonces?${query}`);
  }

  getAnnonceById(annonceId) {
    return this.api.get(`/annonces/${annonceId}`);
  }

  getUser() {
    return this.api.get("/users/my-profile");
  }

  createAnnonce(annonceData) {
    return this.api.post("/annonces", annonceData);
  }

  getFav() {
    return this.api.get("/annonces");
  }

  getAnnoncesByUserId(userId) {
    return this.api.get(`/annonces/user/${userId}`);
  }
}

const apiHandler = new ApiHandler();

export default apiHandler;
