var http = require('http');
var helper = {};

exports.helper = helper;

helper.makeGetRequest = function(optionsForRequest,onData){
	var onRequestFailed = function (err) {
	    console.log('could not connect to server:- ',err);
	};

	var onResponse = function (response) {
	    var data = "";
	    response.setEncoding('utf8');
	    response.on('data', function (chunk) {
	        data += chunk;
	    });
	    response.on('end', function () {
	        onData(data);
	    });
	};
	
	var request = http.get(optionsForRequest, onResponse);
	request.on('error', onRequestFailed);
}
