define([
	'riddle/lib/board',
	'riddle/views/preview',
	'riddle/views/riddle',
],
function(Board, PreView, RiddleView)	{
	function input(gameover_callback, newgame_callback, update_callback)	{
		
		var keymap = {37: false, 38: false, 39: false, 40: false};
		var movemap = {'1100':0, '1001': 1, '1000': 2, '0010': 3, '0110': 4, '0011': 5, '0100': 6, '0001': 7}; // lo, lu, l, r, ro, ru, o, u
		var game_over = false;
		var game_start = false;
		var gameover_callback = gameover_callback;
		var newgame_callback = newgame_callback;
		var update_callback = update_callback;
		var boardview; 
		var board;

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
			game_start = false;
			app.observer.trigger('gamestart', {state: !game_start});
		}


		$(document).keydown(function(e) {
			e.preventDefault();
		    keymap[e.keyCode] = true;
		    //boardview.mark_connectors(movemap[get_keystring()]);

		});

		$(document).keyup(function(e)	{
			if(calc_movements(get_keystring())) app.observer.trigger('keypress');
			//boardview.unmark_connectors(movemap[get_keystring()]);
			keymap = {37: false, 38: false, 39: false, 40: false};
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

		function calc_movements(keystring)	{
			if(typeof movemap[keystring] != 'undefined' && !game_over)	{
					do_movement(keystring);
					game_over = check_game_over();
					app.observer.trigger('gameover', {state: game_over});
					return true;
			}
			return false;
		}

		function do_movement(keystring)	{
			var tiles_left = -1,moved = false;
			board.tiles.move_tiles(movemap[keystring], function(old_field, new_field, tiles_counter, movement, score, to_delete)	{
				tiles_left = tiles_counter;
				boardview.move_tile(old_field, new_field, score, to_delete);
				moved = movement;
			});
			if((tiles_left == 0 && moved) || !game_start)	{
				boardview.new_tile(board.tiles.new_random_tile(false));
				game_start = true;
				app.observer.trigger('gamestart', {state: !game_start});
			}
		}

		function check_game_over()	{
			if(board.tiles.game_over())	{
				return true;
			}
			return false;
		}

		
	}

	return input;
});