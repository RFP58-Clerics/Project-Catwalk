const axios = require('axios');
const Model = require('../Model');
const TOKEN = require('../../config.js');

// Set up axios defaults so we don't have to pass in the base url, token, etc. every time
axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';
axios.defaults.headers.common.Authorization = TOKEN.TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = {
  getProducts: (query) => axios.get('products', { params: query }),

  // how to get all the reviews from all the pages??
  getReviews: (productId, query) => axios.get(`reviews?product_id=${productId}`, {
    params: {
      page: 1,
      count: 200,
      ...query,
    },
  }),

  getRelated: (id) => {
    return axios.get(`products/${id}/related`);
  },

  getOne: (id) => {
    return axios.get(`products/${id}`);
  },

  itemStyles: (id) => {
    return axios.get(`products/${id}/styles`);
  },

  getQuestions: (productId) => {
    return axios.get(`qa/questions/?product_id=${productId}`);
  },

  postQuestion: (body) => {
    return axios.post('qa/questions', body);
  },

  getAnswers: (questionId) => {
    return axios.get(`qa/questions/${questionId}/answers`);
  },

  postAnswer: (questionId, body) => {
    return axios.post(`qa/questions/${questionId}/answers`, body);
  },

  getMetaData: (productId) => axios.get(`reviews/meta?product_id=${productId}`),

  putReviewHelpful: (reviewId) => axios.put(`reviews/${reviewId}/helpful`),

  putReviewReported: (reviewId) => axios.put(`reviews/${reviewId}/reported`),

};
