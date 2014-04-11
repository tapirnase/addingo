define([
	'backbone',
],
function(Backbone)	{
	var CommunicationView = Backbone.View.extend({
		className: 'communication-layer',
		tagName: 'div',
		el: '#communication',
		template: $('#communication-template').html(),
		gameover_template: $('#gameover-template').html(),
		startgame_template: $('#newgame-template').html(),
		parent: null,
		layer: null,
		initialize: function(option)	{
			this.render();
			this.layer = this.$el.find('#layer');
		},
		render: function()	{
			this.$el.html(_.template(this.template, {}));
		},
		render_layer: function(value, template, parent)	{
			if(value)	this.layer.html(_.template(template));
			if(!value)	this.layer.html('');
			this.update(parent);

			
		},
		set_gameover: function(gameover, parent) {
			this.render_layer(gameover, this.gameover_template, parent);
		},

		set_start: function(gamestart, parent)	{
			this.render_layer(gamestart, this.startgame_template, parent)
		},
		update: function(parent)	{
				this.layer.css('top', parent.offset().top + 20);
				this.layer.css('left', parent.offset().left + 20 );
		},
		events: {
			'click #layer .close': 'close_layer',
		},
		close_layer: function()	{
			this.layer.html('');
		}
	});
	return CommunicationView;
});
