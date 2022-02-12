const Model = require('../Model');
const TOKEN = require('../../config.js');
const axios = require('axios');


module.exports = {
  get: (callback) => {
    axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products`,
      headers: {'Authorization': TOKEN.TOKEN}
    })
    .then((result) => {
      callback(result.data);
      })
    .catch(err => {
      callback(err);
    })
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
}