define([
	'backbone',
],
function(Backbone)	{
	var CommunicationView = Backbone.View.extend({
		className: 'communication-layer',
		tagName: 'div',
		el: '#communication',
		template: null,
		parent_el: null,
		layer: null,
		actual_name: '',
		initialize: function(option)	{
			var self = this;
			this.template =  app.templates.get('communication');
			this.render();
			this.set_functions(option.trigger);
			this.parent_el = option.parent;
			this.layer = this.$el.find('#layer');
			app.observer.settrigger('game_continue', function()	{
				self.layer.html('');
			});
		},
		render: function()	{
			this.$el.html(_.template(this.template, {}));
		},
		render_layer: function(value, name)	{
			var template = app.templates.get(name);
			this.actual_name = name;
			if(value)	{
				app.observer.trigger('game_pause');
				this.layer.html(_.template(template))
				this.update();
			};	
			return value;
		},
		set_functions: function(trigger)	{
			var self = this;
			for(var i = 0; i < trigger.length; i++)	{
				var template = app.templates.get(trigger[i]);
				this[trigger[i]] = function(argobj, name)	{
					self.render_layer(argobj.state, name);
				}
				app.observer.settrigger(trigger[i], this[trigger[i]]);
			}
		},
		update: function()	{
				this.layer.css('top', this.parent_el.offset().top);
				this.layer.css('left', this.parent_el.offset().left);
		},
	});
	return CommunicationView;
});
