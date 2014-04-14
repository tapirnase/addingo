define([
	'backbone',
	'riddle/lib/board',
	'riddle/lib/localstorage',
	'riddle/collections/mapcollection'
],
function(Backbone, Board,HighscoreStorage, MapCollection)	{
	var PreView = Backbone.View.extend({
		className: 'preview-container',
		tagName: 'div',
		el: '#select_menu',
		template: null,
		board_template: null,
		preview_template: null,
		initialize: function(option)	{
			this.template = app.templates.get('preview-field');
			this.board_template = app.templates.get('board');
			this.preview_template =  app.templates.get('preview');
			this.render(option);
			this.maps = option.maps;
			this.render_maps();
		},

		render: function(option) {
			this.$el.html(_.template(this.template,{count: this.collection.length}));
		},

		render_maps: function()	{
			var self = this;
			var i = 0;
			this.collection.each(function(mapmodel)	{
				var board = _.template(self.board_template, {map: Board.get_rendermap(mapmodel.get('map'))});
				var single_preview = _.template(self.preview_template, mapmodel.toJSON());
				self.$el.find('.field_select[data-id="' + i + '"]')
					.html('<div class="preview-board">' + single_preview + '</div>')
					.find('.field').html(board);
				i++;
			});
		},
		load_game: function(e)	{
			var target = $(e.target);
			while(target.attr('data-id') == undefined)	{
				target = target.parent();
			}
			return this.collection.models[target.attr('data-id')];
		},

		hideme: function()	{
			this.$el.hide();
		}



	});
	return PreView;
});
