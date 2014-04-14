define([
	'riddle/lib/board',
	'riddle/views/preview',
	'riddle/views/riddle',
],
function(Board, PreView, RiddleView)	{
	function input(keys)	{
		var keys = keys;
		var keymap = set_keymap(keys);
		var movemap = {'1100':0, '1001': 1, '1000': 2, '0010': 3, '0110': 4, '0011': 5, '0100': 6, '0001': 7}; // lo, lu, l, r, ro, ru, o, u
		var game_over = false;
		var game_start = true;
		var game_pause = false;
		var boardview; 
		var board;

		app.observer.settrigger('game_pause', do_pause);

		this.reset = function()	{
			game_start = false;
			game_over = false;
			board = null;
			boardview = null;
		}

		this.update = function(bv,b)	{
			boardview = bv;
			board = b;
			this.new_game();
		}

		this.new_game = function()	{
			boardview.new_game();
			board.reset();
			game_over = false;
			game_start = true;
			app.observer.trigger('gamestart', true);
		}


		$(document).keydown(function(e) {
			e.preventDefault();
		    keymap[e.keyCode] = true;
		    boardview.mark_connectors(movemap[get_keystring()]);

		});

		$(document).keyup(function(e)	{
			if(!game_pause)	{
				calc_movements(get_keystring());
				boardview.unmark_connectors(movemap[get_keystring()]);
				keymap = set_keymap(keys);
			}
			if(game_pause)	{
				if(e.keyCode == 13)	{
					app.observer.trigger('game_continue');
					game_pause = false;
				}
			}
		});

		function get_keystring()	{
			var str = "";
			for (var key in keymap)	{
				if(keymap[key]) {
					str += 1;
				} else {
					str += 0;
				}
			}
			return str;
		}

		function set_keymap(keys)	{
			var tmpkeymap = {};
			for(var i = 0; i < keys.length; i++)	{
				tmpkeymap[keys[i]] = false;
			}
			return tmpkeymap;
		}

		function calc_movements(keystring)	{
			if(typeof movemap[keystring] != 'undefined' && !game_over)	{
					do_movement(keystring);
					game_over = check_game_over();
					return true;
			}
			return false;
		}

		function do_movement(keystring)	{
			var tiles_left = -1,moved = false;
			board.tiles.move_tiles(movemap[keystring], function(old_field, new_field, tiles_counter, movement, score, max_tile, target_tile,to_delete)	{
				var win = false;
				if(max_tile) if(max_tile.get_value() == target_tile) app.observer.trigger('win_tile', {state: true});
				
				tiles_left = tiles_counter;
				boardview.move_tile(old_field, new_field, score, to_delete);
				moved = movement;
			});
			if(!game_start && tiles_left == 0 && moved)	{
				boardview.new_tile(board.tiles.new_random_tile(false));
				game_start = false;
			}

			if(game_start)	{
				boardview.new_tile(board.tiles.new_random_tile(true));
				game_start = false;
			}
		}

		function check_game_over()	{
			if(board.tiles.game_over())	{
				app.observer.trigger('gameover', {state: true});
				return true;
			}
			return false;
		}

		function do_pause()	{
			game_pause = true;
		}

		this.do_continue = function()	{
			game_pause = false;
		}

		
	}

	return input;
});