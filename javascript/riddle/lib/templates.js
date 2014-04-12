define([
],
function()	{
	
	function templates()	{
		var all_templates = {};
		set_all_templates();
		this.get = function(template_name_short)	{
			var template_name = template_name_short + '-template';
			return all_templates[template_name];
		}
		function set_all_templates()	{
			$('*[id*=template]').each(function()	{
				all_templates[$(this).attr('id')] = $(this).html();
			});
		}
		this.get_all = function()	{
			return all_templates;
		}
	}
	return templates;
});