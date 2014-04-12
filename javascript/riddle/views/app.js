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

		initialize: function(option)	{
			var self = this;
			this.template = app.templates.get('app');
			localStorage.init(option.maps);
			this.render();
			this.preview = new PreView({maps: option.maps});
			this.communication_layer = new CommunicationView(
				{trigger: ['gamestart', 'gameover'], parent: this.$el.find('#tbl_hexfield')});
			this.input = new Input([37,38,39,40]);
			app.observer.settrigger('highscore', this.update_highscore);
		},
		update_highscore: function(option)	{
			var boardmap = option.boardmap;
			var highscore = option.highscore;
			var mapkey = localStorage.get_mapkey(boardmap);
			if(!option.highscore) highscore = localStorage.getItem(mapkey); 
			$('.highscore[data-mapkey="' + mapkey + '"]').each(function()	{
				$(this).html(highscore);
			});

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
			this.update_highscore({boardmap: this.board.get_boardmap()});
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
		create_game: function(boardmap)	{
			this.board = new Board(boardmap);
		 	this.boardview = new RiddleView({map: Board.get_rendermap(boardmap), board: this.board});
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