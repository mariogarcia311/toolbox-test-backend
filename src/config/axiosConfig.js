const axios = require('axios');
const { environment } = require('./environment.js');
const { externalApi } = environment;
const filesApiClient = () => {
  const apiClient = axios.create({
    baseURL: externalApi.url,
    timeout: 5000,
  });
  apiClient.interceptors.request.use(
    (config) => {
      const token = externalApi.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return apiClient;
};

module.exports = filesApiClient;
