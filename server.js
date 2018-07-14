var express = require('express'),
cors = require('cors'),
bodyParser = require('body-parser'),
app = express(),
nocache = require('node-nocache'),
port = process.env.PORT || 7000;

app.use( bodyParser.json() );

app.use( cors({ origin: '*' }) );

app.use( express.static(__dirname + '/public') );

app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});

app.listen(port);
console.log(`Server started! At http://localhost:${port}`);