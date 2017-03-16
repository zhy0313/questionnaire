var config = require('./config');
var express = require('express');
var router = require('./router');

var app = express();

//静态服务器
app.use('/', express.static(__dirname + '/public'));

app.use(router);

app.listen(config.port, function(){
    console.log('app listening...');
})
