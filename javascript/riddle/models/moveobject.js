define([
	'backbone'
],
function(Backbone, Movement)	{
	var MoveObject = Backbone.Model.extend({
		element: undefined,

		initialize: function(attr, opt)	{
			this.on('change', this.update);
			this.element = opt.element;
		},

	    setPosition: function(x,y, mouse) {
	        this.set({ x: x, y: y });
	    },
	    movePosition: function(x,y, speed, callback)	{
	    	var self = this;
	    	//this.rotate({x: x, y: y});
			this.element.animate({left: x, top: y},{
				duration: speed,
				complete: function()	{
					if(callback)	{
						callback(self);
					}
				},
			});
	    },

	    rotate: function(obj)	{
	    	var degree = obj.degree;
	    
	    	if(!degree) {
		    	mom_x = this.element.css('left').replace('px','');
		    	mom_y = this.element.css('top').replace('px','');
		    	degree = Math.atan2((obj.x - mom_x) *(-1), obj.y- mom_y) * 180 / Math.PI + 180;
        	}
	    	this.element.css('transform', 'rotate(' + degree + 'deg)')
			    		.css('-moz-transform', 'rotate(' + degree + 'deg)')
			    		.css('-o-transform', 'rotate(' + degree + 'deg)')
			    		.css('-webkit-transform', 'rotate(' + degree + 'deg)');
	    },
	    update: function()	{
	    	this.element.css({ 
				left:       this.get('x'),
	            top:        this.get('y')
	        }); 
	    }
	});

	
	return MoveObject;
});
