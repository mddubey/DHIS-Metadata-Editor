var helper = require('./helper.js').helper;

var host = '192.168.33.20';
var port = 8080;
var options  = {
	hostname: host,
	port:port,
	path:'/dhis/api/categoryOptionCombos.json',
    auth: 'admin:district'
};

var writeToFile = function(dataToWrite){
	var fileName = './categoryOptionCombos.json';
	require('fs').writeFile(fileName,dataToWrite);
}

var onCategoryCombos = function (data) {
	var jsonData = JSON.parse(data);
	console.log("***************************");
	console.log(jsonData.categoryOptionCombos);
	var categoryOptionComboMap = jsonData.categoryOptionCombos.reduce(function(obj, val){
	    obj[val.id] = val.name;
	    return obj;
	}, {});
	console.log("***************************");
	writeToFile(JSON.stringify(categoryOptionComboMap));
};

helper.makeGetRequest(options,onCategoryCombos);