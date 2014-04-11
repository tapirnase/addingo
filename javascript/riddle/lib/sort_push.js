define([],
function() {

		Array.prototype.board_tile = function(pos)	{
			return this[pos.row][pos.position].get_tile();
		}

		Array.prototype.remove_element = function(e)	{
			this.removeat(this.indexOf(e));
		}
	
		Array.prototype.sort_min = function()	{
			if (this.length > 0) return this[0];
			return null;
		}

		Array.prototype.sort_max = function()	{
			if(this.length > 0) return this[this.length - 1];
		}

		Array.prototype.sort_push = function(v)	{
			this.push(v);
			var child = this.length - 1;
			while(child-1 >= 0 && this[child-1].get_sortvalue() > v.get_sortvalue()) {
				this[child] = this[child-1];
				this[child-1] = v;
				child = child-1;
			}
			return child;

		}

		Array.prototype.sort_pop_min = function()	{
			var final_v = this.sort_min();
			this.removeat(0);
			return final_v;
		}

		Array.prototype.sort_pop_max = function()	{
			var final_v = this.sort_max();
			this.removeat(this.length -1);
			return final_v;
		}

		
		Array.prototype.removeat = function(p)	{
			this.splice(p,1);
		}
});