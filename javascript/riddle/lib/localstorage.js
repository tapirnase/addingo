define([
	'json'
],
function(JSON)	{	
	Storage.prototype.init = function(mapkey)	{
		if(localStorage.getItem(mapkey) == null)  {
          localStorage.setItem(mapkey, JSON.stringify({tile: 0, highscore: 0}));
        }
	}

	Storage.prototype.get_value = function(mapkey, type)	{

		var str_obj = this.getItem(mapkey);
		console.log(str_obj);
		if(type && str_obj)	{
			return JSON.parse(str_obj)[type]

		}
		return JSON.parse(str_obj);
	}

	Storage.prototype.set_value = function(mapkey, type, value)	{
		var obj = JSON.parse(this.getItem(mapkey));
		obj[type] = value;
		this.setItem(mapkey, JSON.stringify(obj));
	}
	Storage.prototype.get_mapkey = function(boardmap)	{
		var str = '#';
		for(var i = 0; i < boardmap.length; i++)	{
			str += '_' + boardmap[i].toString();
		}
		return str;
	}


});