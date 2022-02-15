const express = require('express');
const app = express();
const port = 3000;
const Controller = require('./Controller');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('dist'));

app.get('/products', (req, res) => {
  Controller.getProducts()
    .then(result => res.send(result.data))
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

app.get('/related', (req, res) => {
  Controller.getRelated(req.query.id)
    .then(result => res.send(result.data))
});

app.get('/getOne', (req, res) => {
  Controller.getOne(req.query.id)
    .then((result) => {
      res.send(result.data)})
});

app.get('/itemStyles', (req, res) => {
  Controller.itemStyles(req.query.id)
    .then(result => res.send(result.data))
});



// app.post('/products', Controller.controller.post);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})