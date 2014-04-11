define([
],
function()	{	
	function field(neighbours, position)	{
		var neighbour = neighbours;
		var position = position;
		var tile = null;

		this.position = position;
		this.neighbours = neighbour;
		this.get_neighbours = function()	{
			return neighbour;
		}

		this.get_position = function()	{
			return position;
		}

		this.delete_tile = function()	{
			if(tile) tile.delete_parent();
			tile = null;
		}

		this.set_tile = function(t)	{
			tile = t;
		}

		this.get_tile = function()	{
			return tile;
		}
	}

	

	return field;
});