var showDataElements = function(data) {
	var jsonData = JSON.parse(data);
	var options = '<option value=""> select a dataElement </option>';
	jQuery.each(jsonData,function(key,value){
		var option = '<option value="KEY"> VALUE </option>';
		option = option.replace('KEY',key).replace('VALUE',value);
		options += option;
	});
	jQuery('#dataElements').html(options);
};

var getDataElements = function() {
	var dataSetUid = jQuery(this).val();
	if (dataSetUid === '') return;
	jQuery.get('/getDataElements', {
		dataSetUid: dataSetUid
	}, showDataElements);
};

var showCategories = function(data) {
	var jsonData = JSON.parse(data);
	console.log(jsonData);
	// var options = '<option value=""> select a dataElement </option>';
	// jQuery.each(jsonData,function(key,value){
	// 	var option = '<option value="KEY"> VALUE </option>';
	// 	option = option.replace('KEY',key).replace('VALUE',value);
	// 	options += option;
	// });
	// jQuery('#dataElements').html(options);
};

var getCategories = function() {
	var dataSetUid = jQuery('#dataSets').val();
	var dataElementUid = jQuery(this).val();
	if (dataElementUid === '') return;
	jQuery.get('/getCategoryOptions', {
		dataSetUid: dataSetUid,dataElementUid:dataElementUid
	}, showCategories);
};


var init = function() {
	jQuery('#dataSets').change(getDataElements);
	jQuery('#dataElements').change(getCategories);
};

jQuery(document).ready(init);