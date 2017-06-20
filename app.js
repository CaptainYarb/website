'use strict';

var path = require('path');

var express = require('express');

var app = express();

app.use(express.static('public'));
app.use(express.static('build'));
app.get(['/', 'index.html'], function(req, res){
	return res.sendFile(path.join(__dirname, 'assets/index.html'));
});

app.listen(80, function () {
  console.log('Server Online');
})