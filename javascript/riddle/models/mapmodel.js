define([
	'backbone'
],
function(Backbone)	{
	var MapModel = Backbone.Model.extend({
		highscore_elements: [],
		tile_elements: [],
		defaults: {
			mapkey: '',
			name: '',
			highscore: 0,
			tile: 0,
			target_tile: 2048,
			map: []
		},
		initialize: function(option)	{
			this.set('mapkey', localStorage.get_mapkey(this.get('map')));
			this.on('change:tile', this.tile_update);
			this.on('change:highscore', this.score_update);
			this.set('highscore',localStorage.get_value(this.get('mapkey'), 'highscore'));
		},

		get_elements: function()	{
			var self = this;
			if(this.highscore_elements.length == 0)	{
				$('.highscore[data-mapkey="' + this.get('mapkey') + '"]').each(function()	{
					self.highscore_elements.push($(this));
				});
			}

			if(this.tile_elements.length == 0)	{
				$('.max_tile[data-mapkey="' + this.get('mapkey') + '"]').each(function()	{
					self.tile_elements.push($(this));
				});
			}
		},
		update: function(value, type)	{
				if(value > this.get(type))	{
					var set_obj = {};
					set_obj[type] = value;
					this.set(set_obj);
					localStorage.set_value(this.get('mapkey'), type, value);
				}

		},
		score_update: function()	{
			this.get_elements();
			for(var i = 0; i < this.highscore_elements.length; i++)	{
				value = this.get('highscore');
				this.highscore_elements[i].html(value);
			}
		},
		tile_update: function(tile)	{
			this.get_elements();
			for(var i = 0; i < this.tile_elements.length; i++)	{
				this.tile_elements[i].html(tile);
			}
		}

	});
	
	return MapModel;
});
