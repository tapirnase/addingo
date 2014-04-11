define([
],
function()	{	
	Storage.prototype.init = function(maps)	{
		for(var i = 0; i < maps.length; i++)	{
			if(this.get_highscore(maps[i]) == null)	{
				this.set_highscore(maps[i], 0);
			}
		}
	}

	Storage.prototype.get_highscore = function(boardmap)	{
		return this.getItem(this.get_mapkey(boardmap));
	}

	Storage.prototype.set_highscore = function(boardmap, highscore)	{
		this.setItem(this.get_mapkey(boardmap), highscore);
	}

	Storage.prototype.get_mapkey = function(boardmap)	{
		var str = '#';
		for(var i = 0; i < boardmap.length; i++)	{
			str += '_' + boardmap[i].toString();
		}
		return str;
	}


});