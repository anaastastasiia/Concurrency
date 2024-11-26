const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(morgan('dev'));

const PORT = 3000;
let requestsPerSecond = 0;
const LIMIT = 50;

setInterval(() => {
    requestsPerSecond = 0;
}, 1000);

app.post('/api', (req, res) => {
    requestsPerSecond++;
    const { index } = req.body;

    if (requestsPerSecond > LIMIT) {
        return res.status(429).send('Too much requests.');
    }

    const randomDelay = Math.floor(Math.random() * 1000) + 1;

    setTimeout(() => {
        res.json({ index });
    }, randomDelay);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
