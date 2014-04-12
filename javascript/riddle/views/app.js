define([
	'backbone',
	'riddle/views/preview',
	'riddle/views/riddle',
	'riddle/views/communication',
	'riddle/lib/board',
	'riddle/lib/input',
],
function(Backbone, PreView, RiddleView, CommunicationView,Board, Input)	{
	var AppView = Backbone.View.extend({
		className: 'app',
		tagName: 'div',
		el: 'body',
		template: null,
		preview: null,
		board: null,
		boardview: null,
		input: null,
		communication_layer: null,
		highscore_views:  [],

		initialize: function(option)	{
			var self = this;
			this.template = app.templates.get('app');
			app.observer.settrigger('keypress', function()	{
				console.log('taste gedrückt!');
			});
			localStorage.init(option.maps);
			this.render();
			this.preview = new PreView({maps: option.maps});
			this.communication_layer = new CommunicationView(
				{trigger: ['gamestart', 'gameover'], parent: this.$el.find('#tbl_hexfield')});
			this.input = new Input();

				/*for(var view in self.highscore_views)	{
					if(typeof self.highscore_views[view] == 'object')	{
						var highscore = localStorage.getItem(view);
						self.highscore_views[view].html(localStorage.getItem(view));
					}
				}*/
			this.get_highscore_views();
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
			var button = this.$el.find('.btn_selectlevel');
			var button_text  = {true: 'Stay Level', false: 'Change Level'};
			this.preview.$el.toggle();
			this.boardview.update();
			this.communication_layer.update(this.$el.find('#tbl_hexfield'));
			button.html(button_text[this.preview.$el.is(':visible')]);
		},
		events: {
			'click .btn_selectlevel': 'toggle_preview',
			'click .btn_newgame': 'new_game',
			'click .preview-board': 'load_game',
		},
		load_game: function(e)	{
			this.get_highscore_views();
			this.reset();
			this.create_game(this.preview.load_game(e));
		},
		create_game: function(boardmap)	{
			this.board = new Board(boardmap);
		 	this.boardview = new RiddleView({map: Board.get_rendermap(boardmap), board: this.board});
		 	this.communication_layer.parent_el = this.$el.find('#tbl_hexfield');
			this.input.update(this.boardview, this.board);
			this.toggle_preview();
		},
		new_game: function()	{
			this.input.new_game();
		},
		get_highscore_views: function()	{
			var self = this;
			this.$el.find('.highscore').each(function()	{
				var mapkey = $(this).attr('data-mapkey');
				self.highscore_views[mapkey] = $(this);
			});
		}
	});

	return AppView;
});