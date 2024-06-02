// api/tmdb.js
import axios from 'axios';

const API_KEY = 'e2b86820d3e99ee1f5a29d3ca39c8d95';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${category}`, {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchTvShows = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${category}`, {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchMedia = async (query, type) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/${type}`, {
      params: { api_key: API_KEY, query },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchTvShowDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
