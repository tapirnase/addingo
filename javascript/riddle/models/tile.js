define([
	'riddle/models/moveobject'	
],	
function(MoveObject)	{
	var Tile = MoveObject.extend({
		id: null,
		data_tile: null,
		parent_width: 50,
		start_width: 25,
		update_counter: 1,
		width_step: 3,
		old_value: null,
		color_array:
				{'1':'rgb(0,250,154)',
				 '2':'rgb(50,205,50)',
				 '4':'rgb(255,127,80)',
				 '8':'rgb(255,99,71)',
				 '16':'rgb(255,69,0)',
				 '32':'rgb(255,215,0)',
				 '64':'rgb(255,165,0)',
				 '128':'rgb(255,140,0)',
				 '256':'rgb(210,105,30)',
				 '512':'rgb(165,42,42)',
				 '1024':'rgb(218,165,32)',
				 '2048':'rgb(255,223,0)'},
		initialize: function(attr, opt)	{
			this.on('change', this.update);
			this.element = opt.element;
			this.parent = opt.parent;
			this.id = opt.id;
			this.data_tile = opt.tile;
			this.update_counter = (this.data_tile.get_value() / 2) - 2;
			this.old_value = this.data_tile.get_value();
			this.updateValue();

		},

		updateValue: function()	{
			if(this.data_tile.get_value()  != this.old_value)	{
				this.update_counter++;
			}
				var value = this.data_tile.get_value();
				var new_width = this.start_width + this.update_counter * 3;

				this.element.find('.value').html(value);
				this.element.css('background', this.color_array[value])
							.css('margin', (this.parent_width  - new_width + 1) / 2)
							.css('-moz-border-radius',new_width)
							.css('border-radius', new_width)
							.css('height', new_width)
							.css('width', new_width);
				this.element.find('.value').css('top', new_width / 2);
				this.old_value = this.data_tile.get_value();
		},

		getId: function()	{
			return this.id;
		},
		delete: function()	{
			this.element.remove();
		},
		update: function(offset)	{
			this.element.css('top', offset.top);
			this.element.css('left', offset.left);
		}

	});
	return Tile;

});