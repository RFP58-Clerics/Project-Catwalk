const axios = require('axios');
// const Model = require('../Model');
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

  getRelated: (id) => axios.get(`products/${id}/related`),

  getOne: (id) => axios.get(`products/${id}`),

  itemStyles: (id) => axios.get(`products/${id}/styles`),

  getQuestions: (productId) => axios.get(`qa/questions/?product_id=${productId}&count=1000`),

  postQuestion: (body) => axios.post('qa/questions', body),

  getAnswers: (questionId) => axios.get(`qa/questions/${questionId}/answers`),

  postAnswer: (questionId, body) => axios.post(`qa/questions/${questionId}/answers`, body),

  updateQuestionHelpfulness: (questionId) => axios.put(`qa/questions/${questionId}/helpful`),

  updateAnswerHelpfulness: (answerId) => axios.put(`qa/answers/${answerId}/helpful`),

  updateAnswerReport: (answerId) => (axios.put(`qa/answers/${answerId}/report`)),

  getMetaData: (productId) => axios.get(`reviews/meta?product_id=${productId}`),

  putReviewHelpful: (reviewId) => axios.put(`reviews/${reviewId}/helpful`),

  putReviewReported: (reviewId) => axios.put(`reviews/${reviewId}/reported`),

  postReview: (body) => axios.post('/reviews', body),

};
