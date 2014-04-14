define([
	'backbone',
	'riddle/views/preview',
	'riddle/views/riddle',
	'riddle/views/communication',
	'riddle/lib/board',
	'riddle/lib/input',
	'riddle/collections/mapcollection'
],
function(Backbone, PreView, RiddleView, CommunicationView,Board, Input, MapCollection)	{
	var AppView = Backbone.View.extend({
		className: 'app',
		tagName: 'div',
		el: 'body',
		preview: null,
		board: null,
		boardview: null,
		input: null,
		communication_layer: null,

		initialize: function()	{
			var self = this;
			this.template = app.templates.get('app');
			this.render();
			this.preview = new PreView({collection: this.collection});
			this.communication_layer = new CommunicationView(
				{trigger: ['gamestart', 'gameover'], parent: this.$el.find('#tbl_hexfield')});
			this.input = new Input([37,38,39,40]);
			app.observer.settrigger('highscore', this.update_highscore);
		},
		render: function() {
			this.$el.html(_.template(this.template, {} ));
		},
		reset: function()	{
			this.input.reset();
			this.board = null;
			this.boardview = null;
		},
		toggle_preview: function(e)	{
			this.preview.$el.toggle();
			this.boardview.update();
			this.communication_layer.update(this.$el.find('#tbl_hexfield'));
		},
		events: {
			'click .btn_selectlevel': 'toggle_preview',
			'click .btn_newgame': 'new_game',
			'click .preview-board': 'load_game',
		},
		load_game: function(e)	{
			this.reset();
			this.create_game(this.preview.load_game(e));
		},
		create_game: function(model)	{
			this.board = new Board(model.get('map'));
		 	this.boardview = new RiddleView({model: model}, {board: this.board});
		 	this.communication_layer.parent_el = this.$el.find('#tbl_hexfield');
			this.input.update(this.boardview, this.board);
			this.toggle_preview();
		},
		new_game: function()	{
			this.input.new_game();
		}
	});

	return AppView;
});