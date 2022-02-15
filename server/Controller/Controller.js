const Model = require('../Model');
const TOKEN = require('../../config.js');
const axios = require('axios');

// Set up axios defaults so we don't have to pass in the base url, token, etc. every time
axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';
axios.defaults.headers.common.Authorization = TOKEN.TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = {
  getProducts: () => axios.get('products'),
  getReviews: (productId) => axios.get(`reviews?product_id=${productId}`),

  getRelated: (id) => {
    return axios.get(`products/${id}/related`);
  },
  getOne: (id) => {
    return axios.get(`products/${id}`);
  },
  itemStyles: (id) => {
    return axios.get(`products/${id}/styles`);
  },

  getQuestions: (productId) => axios.get(`qa/questions/?product_id=${productId}`),

  getMetaData: (productId) => axios.get(`reviews/meta?product_id=${productId}`),
};
