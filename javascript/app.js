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
    bootstrap: '../javascript/vendor/bootstrap.min',
    json: '../javascript/vendor/json3.min',
  }
});

require([
  'backbone',
  'riddle/views/app',
  'riddle/lib/observer',
  'riddle/lib/templates',
  'riddle/models/mapmodel',
  'riddle/collections/mapcollection'
], 
function(Backbone, RiddleController, Observer, Templates, MapModel, MapCollection) {
    window.app = {};
    app.observer = new Observer();
    app.templates = new Templates();
    var map_collection = get_maps([
      {name: 'The Jew', target_tile: 2048, map: [2,3,7,2,2,1]},
      {name: 'Diamond', target_tile: 8192, map: [2,3,4,3,2]},
      {name: 'Wedge', target_tile: 1024, map: [1,2,3,2,1]},
      {name: 'Squidward', target_tile: 4096, map: [5,4,4,4,2]},
      {name: "Uncle Tobi's cabin", target_tile: 2048, map: [2,3,4,3,3]},
      {name: 'Diabolo', target_tile: 1024, map: [5,4,2,4,5]}
      ]);

    function get_maps(maps) {
      var models = [];
      for(var i = 0; i < maps.length; i++)  {
        models.push(new MapModel(maps[i]));
      }
      return new MapCollection(models);
    }
    new RiddleController({
        collection: map_collection
     });
});