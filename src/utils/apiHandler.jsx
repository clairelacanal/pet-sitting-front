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
    return this.api.post("/connexion", creadentials);
  }

  signup(data) {
    return this.api.post("/creer-un-compte", data);
  }

  getAllAnnonces() {
    return this.api.get("/annonces");
  }

  getProfile() {
    return this.api.get("/mon-profile");
  }

  createAnnonce(annonceData) {
    return this.api.post("/mon-profile/creer-une-annonce", annonceData);
  }

  getFav() {
    return this.api.get("/mon-profile/mes-annonces-preferees");
  }

  getMesPropresAnnonces() {
    return this.api.get("/mon-profile/mes-propres-annonces");
  }
}

const apiHandler = new ApiHandler();

export default apiHandler;