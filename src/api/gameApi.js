import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

export const gamesApi = {
  getGames: async (params) => {
    const response = await apiClient.get("/games", { params });
    return response.data;
  },
  getGameDetails: async (id) => {
    const response = await apiClient.get("/game", { params: { id } });
    return response.data;
  },
};
