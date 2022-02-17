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
      res.send(result.data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/products/:productId/reviews', (req, res) => {
  const { productId } = req.params;
  Controller.getReviews(productId, req.query)
    .then((result) => res.send(result.data.results))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/related', (req, res) => {
  Controller.getRelated(req.query.id)
    .then(result => res.send(result.data))
});

app.get('/getOne', (req, res) => {
  Controller.getOne(req.query.id)
    .then((result) => {
      res.send(result.data);
    });
});

app.get('/itemStyles', (req, res) => {
  Controller.itemStyles(req.query.id)
    .then(result => res.send(result.data));
});

app.get('/qa/questions/:product_id', (req, res) => {
  let product_id = req.params.product_id;
  Controller.getQuestions(product_id)
    .then(result => {
      res.send(result.data.results)
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  let question_id = req.params.question_id;
  Controller.getAnswers(question_id)
    .then(result => {
      res.send(result.data.results)
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/reviews/meta/:productId', (req, res) => {
  const { productId } = req.params;
  Controller.getMetaData(productId)
    .then((result) => res.json(result.data))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.put('/reviews/:reviewId/helpful', (req, res) => {
  const { reviewId } = req.params;
  Controller.putReviewHelpful(reviewId)
    .then((result) => res.json(result.data))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/qa/questions', (req, res) => {
  Controller.postQuestion(req.body)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.put('/reviews/:reviewId/reported', (req, res) => {
  const { reviewId } = req.params;
  Controller.putReviewReported(reviewId)
    .then((result) => res.json(result.data))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// app.post('/products', Controller.controller.post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
