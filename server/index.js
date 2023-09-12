const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const todoRoute = require('./routes/todoRoute');

app.get('/', (req, res) => {
    res.send('TODO app working.');
});

app.use('/', todoRoute);

app.listen(port, () => {
    console.log(`TODO app listening on port ${port}`);
});
