const express = require('express');
const bodyParser = require('body-parser');

const connect = require('./config/database');

const apiRoutes = require('./routes/index');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/api', apiRoutes);

app.listen(3000, async () => {
    console.log(`Server started`);
    await connect();
    console.log('Mongo db connected');
});

// Concept of virtuals : set() & get()
// Concept of hooks : async & sync
// Concept of Indexing in DBMS
