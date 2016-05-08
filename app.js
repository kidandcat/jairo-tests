var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');


var app = express();
var httpServer = http.createServer(app);


httpServer.listen(80);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});
app.get('*', function(req, res, next) {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});
// app.use('/', function(req, res, next) {
//     res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
// });
//
// app.use('/*/*', function(req, res, next) {
//     res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
// });


app.use(function(err, req, res, next) {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

module.exports = app;
