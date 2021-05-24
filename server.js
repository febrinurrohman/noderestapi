require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

var routes = require('./routes');
routes(app);

app.listen(3001, () => {
    console.log(`Server started on port 3001`);
});