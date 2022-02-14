const express = require('express');
const app = express();
const port = 3000;
const Controller = require('./Controller');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('dist'));

app.get('/products', (req, res) => {
  Controller.controller.get((err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log('index result: ', result);
      res.send(result);
    }
  });
});

// app.post('/products', Controller.controller.post);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})