define([
	'riddle/lib/tiles',
	'riddle/lib/sort_push',
	'riddle/lib/field'
],
function(Tiles, SortPush, Field)	{
	function board(board, target_tile)	{
		init();
		var board_map = board;
		var board_structure = get_boardstructure();
		var board_data = get_boarddata();
		this.tiles = new Tiles(board_structure, board_map, board_data, target_tile);



		function init()	{
			board_map = [];
			board_structure = [];
			board_data = [];
		}

		this.reset = function()	{
			this.tiles.reset();
			for(var i = 0; i < board_structure.length; i++) {
				for(var j = 0; j < board_structure[i].length; j++)	{
					board_structure[i][j].delete_tile();
				}
			}
		}

		this.get_board = function()	{
			return board_structure;
		}

		this.get_boardmap = function()	{
			return board_map;
		}

		function get_boarddata()	{
			var max_tiles = 0;
			for(var i = 0; i < board_map.length; i++)	{
				max_tiles += board_map[i];
			}
			return {max_tiles: max_tiles};
		}

		function get_boardstructure()	{
			var board = [];
			var pre_board = get_tmpboard();
			for(var i = 0; i < pre_board.length; i++)	{
				board[i] = [];
				var count = 0;
				for(var j = 0; j < pre_board[i].length; j++)	{
					if(pre_board[i][j] != -1)		{
						var neighbours = get_neighbour(i,j ,pre_board);
						board[i].push(new Field(neighbours, {row: i, position: count}));
						count++;
						
					}
					if(count >= board_map[i]) continue;
				}

			}
			return board;
		}

		function get_neighbour(x,y,board)	{
			var neighbour_arr = [null, null, null, null, null, null, null, null]; // lo, lu, l, r, ro, ru, o, u
			var height = board.length;
			var width = board[0].length;
			//lo
			if(x >0 && y > 0)	{
				if(board[x-1][y-1] != -1) neighbour_arr[0] = {row: x-1, position: board[x-1][y-1]};
			}
			//lu
			if(x < height -1 && y > 0)	{
				if(board[x+1][y-1] != -1) neighbour_arr[1] = {row: x+1, position: board[x+1][y-1]};
			}
			//l
			if(y > 1)	{
				if(board[x][y-2] != -1) neighbour_arr[2] = {row: x, position: board[x][y-2]};
			}
			//r
			if(y < width - 2)	{
				if(board[x][y+2] != -1) neighbour_arr[3] = {row: x, position:board[x][y+2]};
			}
			//ro
			if(x > 0 && y < width - 1)		{
				if(board[x-1][y+1] != -1) neighbour_arr[4] = {row: x-1, position: board[x-1][y+1]};
			}
			//ru
			if(x < height - 1 && y < width - 1)	{
				if(board[x+1][y+1] != -1) neighbour_arr[5] = {row: x+1, position: board[x+1][y+1]};
			}
			//o
			if(x > 0)	{
				if(board[x-1][y] != -1) neighbour_arr[6] = {row: x-1, position: board[x-1][y]};
			}

			if(x < height - 1)	{
				if(board[x+1][y] != -1) neighbour_arr[7] = {row: x+1, position: board[x+1][y]};
			}

			return neighbour_arr;
		}

		
		function get_tmpboard()	{
			var tmpboard = [];
			var heighest = Math.max.apply(Math, board_map);
			var width = (heighest * 2) - 1;
			for(var i = 0; i < board_map.length; i++)	{
				tmpboard[i] = [];
				position = board_map[i];
				var start_position = heighest - position;
				var count = 0;
				var set = false;
				for(var j = 0; j < width; j++)	{
					if(count >= position)	{
						tmpboard[i].push(-1);
						continue;
					}
					if(j < start_position || set == true)	{
						set = false;
						tmpboard[i].push(-1);
						continue;
					} 
					tmpboard[i].push(count);
					count++;
					set = true;

				}
			}
			
			return tmpboard;
		}
	}
	board.get_rendermap = function(board_map)	{
			var tmpboard = [];
			var heighest = Math.max.apply(Math, board_map);
			for(var i = 0; i < board_map.length; i++)	{
				tmpboard[i] = [];
				position = board_map[i];
				var start_position = heighest -position;
				var count = 0;
				for(var j = 0; j < heighest; j++)	{
					if( count >= position)	{
						tmpboard[i].push(-1);
						continue;
					}

					if(j < start_position)	{
						tmpboard[i].push(-1);
						continue;
					}
					tmpboard[i].push(count);
					count++;
				}

			}
			return tmpboard;
	}


	return board;
});