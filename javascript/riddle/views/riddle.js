define([
	'riddle/views/baseriddle'
],	
function(Riddle)	{
	var Riddle = Riddle.extend({
		connector_template: null,
		neighbour_checks: [],
		initialize: function(option)	{
			this.template = app.templates.get('index');
			this.tile_template = app.templates.get('tile');
			this.board_template = app.templates.get('board');
			this.connector_template = app.templates.get('connector');
			this.board = option.board;
			this.render(option);
			this.fields = this.get_field_array();
			this.neighbour_checks = this.init_neighbourchecks();
			this.render_connectors();
			this.update_highscore(localStorage.get_highscore(this.board.get_boardmap()));
		},

		init_neighbourchecks: function()	{
			var check_array = [];
			for(var i = 0; i < this.board.get_board().length; i++)	{
				check_array[i] = [];
				for(var j = 0; j < this.board.get_board()[i].length; j++) {
					check_array[i][j] = [false, false, false, false, false, false, false, false];
				}
			}
			return check_array;
		},

		set_neighbourcheck: function(target_row, target_pos, direction){
			var counter_moves =[5,4,3,2,1,0,7,6];
			var counter_direction = counter_moves[direction];
			this.neighbour_checks[target_row][target_pos][counter_direction] = true;
		},

		check_neighbourcheck: function(row, pos, direction)	{
			return this.neighbour_checks[row][pos][direction];
		},

		mark_connectors: function(direction)	{
			this.$el.find('.connector[data-direction="' + direction + '"]').each(function()	{
				if($(this).attr('data-direction') == direction.toString())	{
					$(this).css('background-color', 'red');
				} else  {
					$(this).css('background-color', 'grey');
				}
			});
		},

		unmark_connectors: function()	{
			this.$el.find('.connector').each(function()	{
				$(this).css('background-color', 'grey');
			});
		},

		render_connectors: function()	{
			

			for(var i = 0;  i < this.fields.length; i++)	{
				for(var j = 0; j < this.fields[i].length; j++)	{
					var origin = this.fields[i][j].view;
				 	for(var k = 0; k < this.fields[i][j].neighbours.length; k++)	{
				 		var target_pos = this.fields[i][j].neighbours[k];
				 		if(target_pos != null && !this.check_neighbourcheck(i,j,k))	{
							var target_offset = this.fields[target_pos.row][target_pos.position].view.offset();
							this.set_neighbourcheck(target_pos.row, target_pos.position, k);
				 			this.draw_connector(origin, origin.offset(), target_offset, k, i, j);

				 		}
				 	}
				}
			}
		},

		draw_connector: function(origin, origin_offset, target_offset, direction, row, position)	{
			var length = Math.sqrt((target_offset.left- origin_offset.left) * (target_offset.left - origin_offset.left) +
						(target_offset.top - origin_offset.top)  * (target_offset.top - origin_offset.top));
			var degree =180 / Math.PI * Math.acos((target_offset.top - origin_offset.top) / length);
			var connector_view = _.template(this.connector_template, {direction: direction, row: row, position: position} );
			this.$el.find('#connectors').append(connector_view);
			
			if(target_offset.left > origin_offset.left) degree *= -1;
			var view = this.$el.find('.connector[data-direction="' + direction + '"][data-parent-row="' + row + '"][data-parent-position="' +position + '"]');
			view
					.css('height', length)
					.css('transform', 'rotate(' + degree + 'deg)')
		    		.css('-moz-transform', 'rotate(' + degree + 'deg)')
		    		.css('-o-transform','rotate(' + degree + 'deg)')
		    		.css('-webkit-transform', 'rotate(' + degree + 'deg)')
		    		.css('top', origin_offset.top + 27)
		    		.css('left',origin_offset.left + 27);
			
		},

		update: function()	{
			this.render_connectors();

			for(tile in this.tiles)	{
				var row = this.tiles[tile].data_tile.get_position().row;
				var position = this.tiles[tile].data_tile.get_position().position;
				var offset = this.fields[row][position].view.offset();
				this.tiles[tile].update(offset);
			}
		}


	});

	return Riddle;
});