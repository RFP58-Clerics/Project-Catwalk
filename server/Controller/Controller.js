const Model = require('../Model');
const TOKEN = require('../../config.js');
const axios = require('axios');

// Set up axios defaults so we don't have to pass in the base url, token, etc. every time
axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';
axios.defaults.headers.common['Authorization'] = TOKEN.TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = {
  getProducts: () => {
    return axios.get("products");
    // .then((result) => {
    //   callback(result.data);
    //   })
    // .catch(err => {
    //   callback(null, err);
    // })
  },
  getReviews: (productId) => {
    return axios.get(`reviews?product_id=${productId}`);
  },
  getRelated: (id) => {
    return axios.get(`products/${id}/related`);
  },
  getOne: (id) => {
    return axios.get(`products/${id}`);
  },
  itemStyles: (id) => {
    return axios.get(`products/${id}/styles`);
  }
}

// },

  // post: (req, res) => {
  //   var params = req.body.id;
  //   Model.model.save(params, (err, result) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     } else {
  //       res.status(201).send(result);
  //     }
  //   })
  // }
