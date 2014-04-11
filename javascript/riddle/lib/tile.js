define([
],
function()	{	
	function tile(parent, v, number)	{
		var parent_field = parent;
		parent_field.set_tile(this);
		var id = '#' + number;
		var value = v;
		
		this.position = parent_field.get_position();
		
		this.delete = function()	{
			parent_field.delete_tile();
		}

		this.get_position = function()	{
			return parent_field.get_position();
		}

		this.set_parent = function(f)	{
			if(parent_field) parent_field.delete_tile();
			parent_field = f;
			parent_field.set_tile(this);
		}

		this.delete_parent = function()	{
			parent = null;
		}
		this.get_parent = function()	{
			return parent_field;
		}

		this.get_sortvalue = function()	{
			return  tile.calc_value(parent_field.get_position());
		}

		this.get_value = function()	{
			return value;
		}

		this.set_value  = function(v)	{
			value = v;
		}

		this.double_value = function()	{
			value *= 2;
		}

		this.get_id = function()	{
			return id;

		}
	}

	tile.calc_value = function(pos)	{
			if(pos.row == 0)	{
				return pos.row.toString() + pos.position.toString();
			} else {
				return (parseInt(pos.row * 10) + parseInt(pos.position)).toString();
			}
	}


	return tile;
});