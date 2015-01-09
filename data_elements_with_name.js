var helper = require('./helper.js').helper;
var fs = require('fs');

var host = '192.168.33.20';
var port = 8080;
var dataSetUuid = 'iUz0yoVeeiZ';

var options = {
	hostname: host,
	port:port,
    auth: 'admin:district'
};

var getPath = function(uriSuffix){
	var path = '/dhis/api/dataSets/UUID/URISUFFIX';
	return path.replace('UUID',dataSetUuid).replace('URISUFFIX',uriSuffix);
}

var writeToFile = function(dataToWrite){
	var fileName = './data_values/UUID.json';
	fileName = fileName.replace('UUID',dataSetUuid);
	fs.writeFile(fileName,dataToWrite);
}

var addNamesToDataValues = function(jsonData, dataElementMap){
	fs.readFile('./categoryOptionCombos.json',function(err,data){
		if(err)
			throw err;
		var categoryOptionComboMap = JSON.parse(data);
		jsonData.dataValues.forEach(function(dataValue){
			delete dataValue.period;
			dataValue.dataElementName = dataElementMap[dataValue.dataElement];
			dataValue.categoryOptionName = categoryOptionComboMap[dataValue.categoryOptionCombo];
		});
		writeToFile(JSON.stringify(jsonData));
	});
}

var formatDataValues = function(dataElementMap){
	return function(data){
		var jsonData = JSON.parse(data);
		addNamesToDataValues(jsonData,dataElementMap);
	};
};

var onDataElements = function(data){
	var jsonData = JSON.parse(data);
	var dataElementMap = jsonData.dataElements.reduce(function(obj, val){
	    obj[val.id] = val.name;
	    return obj;
	}, {});	
	options.path = getPath('/dataValueSet.json');
	helper.makeGetRequest(options,formatDataValues(dataElementMap));
};

var main = function(){
	options.path = getPath('/dataElements.json');
	helper.makeGetRequest(options,onDataElements);
};

main();