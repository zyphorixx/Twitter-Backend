const express = require('express');
const bodyParser = require('body-parser');

const connect = require('./config/database');
const v1Routes = require('./routes/v1'); 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', v1Routes); 

app.listen(3000, async () => {
    console.log('Server started');
    await connect();
    console.log('Mongo db connected');
});
