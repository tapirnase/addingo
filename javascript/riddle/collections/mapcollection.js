define([
	'backbone',
	'riddle/models/mapmodel',
],
function(Backbone, MapModel)	{
	var MapCollection = Backbone.Collection.extend({
		model: MapModel,
	});

	return MapCollection;
});