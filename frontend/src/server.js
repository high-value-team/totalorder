const express = require('express');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json

// app.get('background.png', (req, res) => {
//
// });
app.get('/api/v1/version', (req, res) => {
    res.json({
        timestamp: (new Date()).toISOString(),
        number: '1.6.1.0',
        dbPath: '',
    })
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