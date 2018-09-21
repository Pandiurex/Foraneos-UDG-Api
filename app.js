const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./Routes');

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', routes)
  .listen(3000, () => console.log('App listening on port 3000!'));

<<<<<<< HEAD
app.get('/', (req, res) => res.send('You are online'));
app.listen(3000, () => console.log('App listening on port 3000!'));

app.use('/api', usersRoute);
app.use('/api', locationsRoute);
app.use('/api', evaluationsRoute);

module.express = app;
=======
module.exports = app;
>>>>>>> b4f18d9c4c5c90faca485767e147686c64f0d23f
