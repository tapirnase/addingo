define([
	'backbone',
	'riddle/lib/board',
	'riddle/lib/localstorage',
	'riddle/models/tile',
],
function(Backbone, BoardView, HighscoreStorage, TileView)	{
	var BaseRiddleView = Backbone.View.extend({
		className: 'riddle',
		tagName: 'div',
		el: '#game',
		board: [],
		animation_dur: 100,
		template: null,
		tile_template: null,
		board_template: null,
		fields: [], 
		tiles: {}, 
		
		initialize: function(option)	{
			this.template = app.templates.get('index');
			this.tile_template = app.templates.get('tile');
			this.board_template = app.templates.get('board');
			this.board = option.board;
			this.render(option);
			this.fields = this.get_field_array();
		},

		set_corners: function(view_obj)	{
			var corner_directions = [0,4,5,1];
			var neighbours = view_obj.neighbours;
			var square = true;
			var css_string = '';
			for(var i = 0; i < corner_directions.length; i++)	{
				/*if(view_obj.neighbours[corner_directions[i]] != null)	{
					css_string += '50px ';
				} else {
					css_string += '15px ';
				}*/
				if(view_obj.neighbours[corner_directions[i]] != null)	{
					square = false;
				}
			}
			/*view_obj.view 	.css('border-radius',css_string)
							.css('-moz-border-radius',css_string);*/
			if(square == false)	{
				view_obj.view.addClass('circle');
			}


		},
		get_field_array: function()	{
			var self = this;
			var all_fields = [];
			for(var i = 0; i < this.board.get_board().length; i++)	{
				all_fields[i] = [];
			}
			this.$el.find('.field-tile').each(function()	{
				var view_obj = {};
				var row = $(this).attr('data-row');
				var position =$(this).attr('data-position');

				view_obj.view = $(this);
				view_obj.neighbours = self.board.get_board()[row][position].get_neighbours();
				view_obj.position = self.board.get_board()[row][position].get_position();
				all_fields[row][position]= view_obj;
				self.set_corners(view_obj);
			});

			return all_fields;
		},
		render: function(option) {
			this.$el.html(_.template(this.template, {mapkey: localStorage.get_mapkey(this.board.get_boardmap())} ));
			this.$el.find('#tbl_hexfield').html(_.template(this.board_template, {map: option.map, board: this.board.get_board()}));
		},
		render_tile: function(option)	{
			this.$el.find('#tiles').append(_.template(this.tile_template, {value: option.value, id: option.id}));
			var element = this.$el.find('.move_tile[data-id="' + option.id + '"]');
			element.css({top: option.offset.top , left: option.offset.left});
			return element;

		},
		new_tile: function(tile)	{
			if(tile != null)	{
				var field = this.fields[tile.get_position().row][tile.get_position().position].view;
				var tile_element = this.render_tile({value: tile.get_value(), offset: field.offset(), id: tile.get_id(), field: field});
				var tile_view = new TileView({},{element: tile_element, parent: field, tile: tile});
				this.tiles[tile.get_id()] = tile_view;
				tile_view.updateValue();
			}
		},
		move_tile: function(end_field, start_field, score, to_delete, random_tile)	{
			var tile = start_field.get_tile();
			var target_field = this.fields[start_field.get_position().row][start_field.get_position().position].view;
			var tile_view = this.tiles[tile.get_id()];
			if(to_delete != null)	{
				this.tiles[to_delete].movePosition(target_field.offset().left, target_field.offset().top, this.animation_dur, function(self)	{
					self.element.remove();
					tile_view.updateValue();

				});
			} else {
			
				if(end_field.get_position() != start_field.get_position())	{
					tile_view.movePosition(target_field.offset().left, target_field.offset().top, this.animation_dur);
					tile_view.updateValue();
				}
				this.update_score(score);
			}
		},
		update_score: function(score)	{
			
			if(score > this.get_highscore() || !this.get_highscore())	{
				this.update_highscore(score);
			}
			this.$el.find('#score').html(score);
		},
		update_highscore: function(score)	{
			localStorage.set_highscore(this.board.get_boardmap(), score);
			this.$el.find('.highscore').html(score);
		},
		get_highscore: function()	{
			return parseInt(localStorage.get_highscore(this.board.get_boardmap()));
		},
		new_game: function(e)	{
			for(tile in this.tiles)	{
				this.tiles[tile].delete();
			}
			this.tiles = {};
			this.update_score(0);
		},
	});

	return BaseRiddleView;
});
