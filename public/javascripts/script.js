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
	var tbody = '<tr><th>UID</th><th>NAME</th></tr>';
	jQuery.each(jsonData,function(index,category){
		var trHtml = '<tr><td>UID</td><td>NAME</td></tr>';
		trHtml = trHtml.replace('UID',category.categoryOptionCombo).replace('NAME',category.categoryOptionName);
		tbody += trHtml;
	});
	jQuery('#categoryOptions').html(tbody);
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