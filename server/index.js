const express = require('express');
const app = express();
const port = 3000;
const Controller = require('./Controller');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('dist'));

app.get('/products', (req, res) => {
  Controller.getProducts()
    .then(result => {
      res.send(result.data)
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/products/:productId/reviews', (req, res) => {
  let productId = req.params.productId;
  Controller.getReviews(productId)
    .then(result => res.send(result.data.results))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

app.get('/qa/questions/:product_id', (req, res) => {
  let product_id = req.params.product_id;
  Controller.getQuestions(product_id)
    .then(result => res.send(result.data.results))
    .catch(err => {
      // console.log(err);
      res.sendStatus(500);
    })
});

app.get('/reviews/meta/:productId', (req, res) => {
  let productId = req.params.productId;
  console.log(productId);
  Controller.getMetaData(productId)
    .then(result => res.json(result.data))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});


// app.post('/products', Controller.controller.post);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})