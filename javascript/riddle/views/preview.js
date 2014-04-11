define([
	'backbone',
	'riddle/lib/board',
	'riddle/lib/localstorage',
],
function(Backbone, Board,HighscoreStorage)	{
	var PreView = Backbone.View.extend({
		className: 'preview-container',
		tagName: 'div',
		el: '#select_menu',
		template: $('#preview-field-template').html(),
		board_template: $('#board-template').html(),
		preview_template: $('#preview-template').html(),
		maps: [],
		initialize: function(option)	{
			this.render(option);
			this.maps = option.maps;
			this.render_maps(this.maps);
		},

		render: function(option) {
			this.$el.html(_.template(this.template, {maps: option.maps} ));
		},

		render_maps: function(maps)	{
			var self = this;
			for(var i = 0; i < maps.length; i++)	{
				var highscore = localStorage.get_highscore(maps[i]);
				var mapkey = localStorage.get_mapkey(maps[i]);
				var board = _.template(this.board_template, {map: Board.get_rendermap(maps[i])});
				var single_preview = _.template(this.preview_template, {highscore:highscore, mapkey: mapkey});
				this.$el.find('.field_select[data-id="' + i + '"]')
					.html('<div class="preview-board">' + single_preview + '</div>')
					.find('.field').html(board);
			}
		},
		load_game: function(e)	{
			var target = $(e.target);
			while(target.attr('data-id') == undefined)	{
				target = target.parent();
			}
			return this.maps[parseInt(target.attr('data-id'))];
		},

		hideme: function()	{
			this.$el.hide();
		}



	});
	return PreView;
});
