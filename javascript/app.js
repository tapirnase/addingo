require.config({
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone',
    },
    'bootstrap': {
      deps: ['jquery']
    }
  },

  paths: {
    jquery: '../javascript/vendor/jquery-2.0.3.min',
    backbone: '../javascript/vendor/backbone-min',
    underscore: '../javascript/vendor/underscore-min',
    bootstrap: '../javascript/vendor/bootstrap.min'
  }
});

require([
  'riddle/views/app',
  'riddle/lib/observer',
  'riddle/lib/templates'
], 
function(RiddleController, Observer, Templates) {
    window.app = {};
    app.observer = new Observer();
    app.templates = new Templates();
    new RiddleController({
        maps: [[2,3,7,2,2,1], [2,3,4,3,2], [1,2,3,2,1], [5,4,4,4,2], [2,3,4,3,3], [5,4,2,4,5]]
     });
});