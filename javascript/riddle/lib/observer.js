define([
],
function()	{
	
	function observer()	{

		var calls = {};
		this.trigger = function(name, argumentobj)	{
			if(argumentobj)	{
				calls[name](argumentobj, name);
			} else {
				calls[name](name);
			}
		}
		this.settrigger = function(name, function_pointer)	{
			calls[name] = function_pointer;
		}

	}
	return observer;
});