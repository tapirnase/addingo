define([
	'backbone',
	'riddle/lib/input',
],
function(Backbone, Input)	{
	var EditorView = Backbone.View.extend({
		className: 'editor',
		tagName: 'div',
		el: '#editor',
		template: $('#index-editor-template').html(),
		template_input: $('#editor-row-input-template').html(),
		

		initialize: function(option)	{
			this.render(option);
			this.generate_input();
			
		},
		render: function(option) {
			this.$el.html(_.template(this.template, {} ));
		},
		events: {
			'change #inp_range_height': 'change_input',
			'click #btn_generate' : 'generate_game',
		},

		change_input: function()	{
			this.generate_input();
		},
		generate_input: function()	{
			var value = this.$el.find('#inp_range_height').val();
			this.$el.find('#lbl_height').html(value);
			this.$el.find('#list_colums').html('');
			for(var i = 0; i < value; i++)	{
				this.$el.find('#list_colums').append(_.template(this.template_input, {row: i} ));
			}
			this.$el.find('#btn_generate').show();
		},

		generate_game: function(e)	{
			delete this.game;
			e.preventDefault();
			var board_map = [];
			this.$el.find('.inp_colum').each(function()	{
				var pos = $(this).attr('data-row');
				board_map[pos] = parseInt($(this).val());
			});
			if(this.check_boardmap(board_map))	{
				this.game = null;
				this.game = new Input(board_map);
			}
			this.$el.hide();
		},

		check_boardmap: function(board_map)	{
			return true;
		},
	});

	return EditorView;
});