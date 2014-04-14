define([
	'json'
],
function(JSON)	{	
	Storage.prototype.init = function(mapcollection, empty_obj)	{
		var self = this;
		mapcollection.each(function(map)	{
			
			if(self.getItem(map.get('mapkey')) == null)	{
				self.setItem(map.get('mapkey'), JSON.stringify(empty_obj));
			}
		});
	}

	Storage.prototype.get_value = function(mapkey, type)	{

		var str_obj = this.getItem(mapkey);
		if(type)	{
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