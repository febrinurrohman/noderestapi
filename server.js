const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

var routes = require('./routes');
routes(app);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});