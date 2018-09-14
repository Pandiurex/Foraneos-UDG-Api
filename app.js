const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const usersRoute = require('./Routes/usersRoute');
const locationsRoute = require('./Routes/locationsRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('App listening on port 3000!'));

app.use('/api', usersRoute);
app.use('/api', locationsRoute);

module.express = app;
