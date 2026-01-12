const express = require('express');
const connect = require('./config/database');

const app = express();

app.listen(3000, async () => {
    console.log(`Server started`);
    await connect();
    console.log('Mongo db connected');
});

// Concept of virtuals : set() & get()
// Concept of hooks : async & sync
// Concept of Indexing in DBMS
