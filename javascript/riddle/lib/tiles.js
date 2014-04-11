define([
	'riddle/lib/field',
	'riddle/lib/tile'
],
function(Field, Tile)	{
	function tiles(board_structure, board_map, board_data)	{
		var active_tiles = [];
		var new_tiles = [];
		var board_structure = board_structure;
		var board_map = board_map;
		var board_data = board_data;
		var score = 0;
		var tile_counter = 0;


		this.reset = function()	{
			while(active_tiles.length > 0)	{
				var tile = active_tiles.sort_pop_max();
				tile.delete();
				tile.get_parent().delete_tile();
			}

			new_tiles = [];
			score = 0;
			tile_counter = 0;
		}

		function new_tile(position, value)	{	
			var new_tile = new Tile(board_structure[position.row][position.position], value, tile_counter);
			active_tiles.sort_push(new_tile);
			tile_counter++;
			return new_tile;
		}

		function check_fusion(check_value,field_pos, direction)	{

			var n_pos = field_pos.get_neighbours()[direction];
			if(n_pos != null)	{
				var n_tile = board_structure[n_pos.row][n_pos.position].get_tile();
				if(n_tile != null)	{
					if(check_value == n_tile.get_value())	{
						return true;
					} 
				}
			}
			return false;
		}

		function get_endfield(direction, tile)	{
			var parent = tile.get_parent(), start_pos, neighbour = false, neighbour_field;
			while(parent.get_neighbours()[direction] != null && neighbour == false)	{
				start_pos = parent.get_neighbours()[direction];
				neighbour_field = board_structure[start_pos.row][start_pos.position];
				if(neighbour_field.get_tile() != null)	{
					neighbour = true;
					continue;
				}
				parent = neighbour_field;
			}
			return parent;

		}



		this.new_random_tile = function(start_tile)	{
			var random_value = [2,4], row, position;
			if(active_tiles.length < board_data.max_tiles)	{
				do {
					row = Math.floor(Math.random()*  board_map.length);
					position = Math.floor(Math.random() * board_structure[row].length);
				} while(board_structure[row][position].get_tile() != null)
				var new_value = random_value[Math.floor(Math.random() * 2)];
				if(!start_tile) score += new_value;
				return new_tile({row: row, position: position}, new_value);
			}
			return null;
		}



		this.move_tiles = function(direction, callback_move)	{
			if([0,2,4,6].indexOf(direction) != -1)	{   //sort_pop_min(): lo, l, ro -> move_all_tiles: movement = 1
				move_all_tiles(1, direction,callback_move);
			} else {	//sort_pop_max(): lu, r, ru	-> move_all_tiles: movement = 0							
				move_all_tiles(0, direction, callback_move);
			}
			active_tiles = new_tiles;
			
		}

		this.game_over = function()	{
			
			if(active_tiles.length == board_data.max_tiles)	{
				var game_over = true;
				for(var i = 0; i < active_tiles.length; i++)	{
					var neighbours = active_tiles[i].get_parent().get_neighbours();
					var value = active_tiles[i].get_value();
					for(var j = 0; j < neighbours.length; j++)	{
						if(neighbours[j] != null)	{
							if(board_structure.board_tile(neighbours[j]).get_value() == value)	{
								return false;
							}
						}
					}
				}
				return true;
			}

			return false;
		}

		function move_all_tiles(movement ,direction, callback_move)	{
			var active_tile, new_field, old_field, moved = false, n_tile, to_delete = false;
			new_tiles = [];


			while(active_tiles.length > 0)	{
				if(movement == 1)	active_tile = active_tiles.sort_pop_min();
				if(movement == 0)	active_tile = active_tiles.sort_pop_max();
				old_field = active_tile.get_parent();
				new_field = get_endfield(direction, active_tile);
				


				if(check_fusion(active_tile.get_value(), new_field, direction) == false)	{
					active_tile.set_parent(new_field);
					new_tiles.sort_push(active_tile);
					to_delete = null;
					if(old_field.get_position() != new_field.get_position()) moved = true;
				} else {
					
					n_tile = board_structure.board_tile(new_field.get_neighbours()[direction]);
					n_tile.double_value();
					to_delete = old_field.get_tile().get_id();
					score += n_tile.get_value();
					old_field.delete_tile();
					moved = true;
					new_field = n_tile.get_parent();
				}
				callback_move(old_field, new_field, active_tiles.length, moved, score, to_delete);
			}

		}

		
	}
	return tiles;
});