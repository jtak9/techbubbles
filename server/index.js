const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let jobData = {}; // In-memory store

app.post('/submit', (req, res) => {
    const job = req.body.job?.trim().toLowerCase();
    if (!job) return res.status(400).send('Invalid job title');

    jobData[job] = (jobData[job] || 0) + 1;
    res.status(200).json({ success: true });
});

app.get('/jobs', (req, res) => {
    const total = Object.values(jobData).reduce((a, b) => a + b, 0);
    const formatted = Object.entries(jobData).map(([job, count]) => ({
        job, 
        count, 
        percent: ((count / total) * 100).toFixed(1),
    }));
    res.json(formatted);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
