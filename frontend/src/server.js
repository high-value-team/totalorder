const express = require('express');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json()); // for parsing application/json

app.get('/api/v1/version', (req, res) => {
    const d = new Date();
    // res.status(403);
    // 01/17/2018 11:32:20:
    const dateFormated = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    const version = '1.6.1.0';
    res.format({
        'text/plain': function(){
            res.send(`${dateFormated}: TotalOrder Version ${version}, dbPath: /mnt`);
        }});
});

app.post('/api/v1/projects', (req, res) => {
    console.log('POST /api/v1/projects');
    console.log(req.body);
    res.format({
        'text/plain': function(){
            res.send('id1');
        }});
});

app.get('/api/v1/projects/:projectId/summary', (req, res) => {
    console.log(`GET /api/v1/projects/${req.params.projectId}/summary`);
    res.json({
        "title": "Project id1",
        "numberOfSubmissions": 42,
        "items": [
            "item 2",
            "item 1",
            "item 5",
            "item 3"
        ]
    });
});

app.get('/api/v1/projects/:projectId/items', (req, res) => {
    console.log(`GET /api/v1/projects/${req.params.projectId}/items`);
    res.json({
        "title": "Project id1",
        "items": [
            {
                "id": "a",
                "text": "Item 1"
            },
            {
                "id": "d",
                "text": "Item 5"
            },
            {
                "id": "c",
                "text": "Item 3"
            },
            {
                "id": "b",
                "text": "Item 2"
            }
        ]
    });
});

app.post('/api/v1/projects/:projectId/submissions', (req, res) => {
    console.log(`POST /api/v1/projects/${req.params.projectId}/submissions`);
    console.log(req.body);
    res.send('');
});



app.listen(port, () => console.log(`Listening on port ${port}`));