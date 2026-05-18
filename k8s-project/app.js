const express = require('express');
const fs = require('fs');
const os = require('os');

const app = express();

const PORT = process.env.PORT || 3000;
const APP_MESSAGE = process.env.APP_MESSAGE || "Hello Kubernetes";

app.get('/', (req, res) => {

    fs.mkdirSync('/data', { recursive: true });

    fs.appendFileSync(
        '/data/visits.txt',
        `Visit from ${os.hostname()} at ${new Date()}\n`
    );

    res.send(`
        <h1>${APP_MESSAGE}</h1>
        <p>Hostname: ${os.hostname()}</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});