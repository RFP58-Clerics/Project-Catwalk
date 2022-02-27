const express = require('express');
const app = express();
// const compression = require('compression');
const port = 3000;
const Controller = require('./Controller');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('dist'));
// app.use(compression());

app.get('/products', (req, res) => {
  Controller.getProducts(req.query)
    .then((result) => {
       // send a ping approx every 2 seconds
  var timer = setInterval(function () {
    res.write('data: ping\n\n')

    // !!! this is the important part
    res.flush()
  }, 2000)

  res.on('close', function () {
    clearInterval(timer)
  })
      res.send(result.data);
    })
    .catch((err) => {
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
    .then((result) => {
       // send a ping approx every 2 seconds
  var timer = setInterval(function () {
    res.write('data: ping\n\n')

    // !!! this is the important part
    res.flush()
  }, 2000)

  res.on('close', function () {
    clearInterval(timer)
  })
      res.send(result.data);
    });
});

app.get('/getOne', (req, res) => {
  Controller.getOne(req.query.id)
    .then((result) => {
       // send a ping approx every 2 seconds
  var timer = setInterval(function () {
    res.write('data: ping\n\n')

    // !!! this is the important part
    res.flush()
  }, 2000)

  res.on('close', function () {
    clearInterval(timer)
  })
      res.send(result.data);
    });
});

app.get('/itemStyles', (req, res) => {
  Controller.itemStyles(req.query.id)
    .then((result) => res.send(result.data));
});

// Retrieve questions per product
app.get('/qa/questions/:product_id', (req, res) => {
  let product_id = req.params.product_id;
  Controller.getQuestions(product_id)
    .then((result) => {
      res.send(result.data.results);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Save new questions per product
app.post('/qa/questions', (req, res) => {
  Controller.postQuestion(req.body)
    .then((result) => {
      res.sendStatus(202);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Retrieve answers per question
app.get('/qa/questions/:question_id/answers', (req, res) => {
  let question_id = req.params.question_id;
  Controller.getAnswers(question_id)
    .then((result) => {
      res.send(result.data.results);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Save new answers per question
app.post('/qa/questions/:question_id/answers', (req, res) => {
  let question_id = req.params.question_id;
  Controller.postAnswer(question_id, req.body)
    .then((result) => {
      res.sendStatus(202);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Update question helpfulness
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let question_id = req.params.question_id;
  Controller.updateQuestionHelpfulness(question_id)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Update answer helpfulness
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let answer_id = req.params.answer_id;
  Controller.updateAnswerHelpfulness(answer_id)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Update answer report
app.put('/qa/answers/:answer_id/report', (req, res) => {
  let answer_id = req.params.answer_id;
  Controller.updateAnswerReport(answer_id)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
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

app.put('/reviews/:reviewId/reported', (req, res) => {
  const { reviewId } = req.params;
  Controller.putReviewReported(reviewId)
    .then((result) => res.json(result.data))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/reviews', (req, res) => {
  Controller.postReview(req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/interactions', (req, res) => {
  Controller.postInteractions(req.body)
    .then(() => res.sendStatus(202))
    .catch((err) => {
      console.log(err);
      res.sendStatus(422);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
