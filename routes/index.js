var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('underscore');
/* GET home page. */

router.get('/', function(req, res) {
	res.redirect('/getDataSets');
});

var renderWithDataSets = function(req, res) {
	fs.readFile('./jsons/datasets.json', function(err, data) {
		if (err) throw err;
		res.render('index', {datasets:JSON.parse(data)});
	});
};

router.get('/getDataSets', renderWithDataSets);

var renderWithDataElements = function(req, res) {
	var dataSetUid = req.query.dataSetUid;
	var pathToDataElements = './jsons/UID/dataElements.json';
	pathToDataElements = pathToDataElements.replace('UID', dataSetUid);
	fs.readFile(pathToDataElements, function(err, data) {
		res.send(data);
	});
};

router.get('/getDataElements', renderWithDataElements);

var renderWithCategoryOptions = function(req, res) {
	var dataSetUid = req.query.dataSetUid;
	var dataElementUid = req.query.dataElementUid;
	var pathToCategoryOptions = './jsons/UID/categoryOptions.json';
	pathToCategoryOptions = pathToCategoryOptions.replace('UID', dataSetUid);
	fs.readFile(pathToCategoryOptions, function(err, data) {
		var categoryOptions = JSON.parse(data).dataValues;
		categoryOptions.forEach(function(dataValue){
			 delete dataValue.dataElementName;
			 delete dataValue.value;
		});
		var categoryOptionsByElement = _.groupBy(categoryOptions,'dataElement');
		var categoryOptionsForGivenElement = categoryOptionsByElement[dataElementUid];
		res.send(JSON.stringify(categoryOptionsForGivenElement));
	});
};

router.get('/getCategoryOptions', renderWithCategoryOptions)

module.exports = router;