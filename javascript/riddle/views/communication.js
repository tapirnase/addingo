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
		initialize: function(option)	{
			this.template =  app.templates.get('communication');
			this.render();
			this.set_functions(option.trigger);
			this.parent_el = option.parent;
			this.layer = this.$el.find('#layer');
		},
		render: function()	{
			this.$el.html(_.template(this.template, {}));
		},
		render_layer: function(value, name)	{
			var template = app.templates.get(name);
			if(value)	{
				this.layer.html(_.template(template))
				this.update();
			};
			if(!value)	this.layer.html('');
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
				this.layer.css('top', this.parent_el.offset().top + 20);
				this.layer.css('left', this.parent_el.offset().left + 20 );
		}
	});
	return CommunicationView;
});
