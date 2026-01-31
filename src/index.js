require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env'),
});

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const { passportAuth } = require('./config/jwt-middleware');

const connect = require('./config/database');
const v1Routes = require('./routes/v1'); 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
passportAuth(passport);

app.use('/api/v1', v1Routes); 

app.listen(3000, async () => {
    console.log('Server started');
    await connect();
    console.log('Mongo db connected');
});
