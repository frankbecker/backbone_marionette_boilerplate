var Router = Backbone.Router.extend({

  routes: {
    "":                "home",
    "profile":         "profile",
    "profile/:id":     "profile",
    "images":          "images"
  },

  home: function() {
    App.main_region.show(new HomeView());
  },

  profile: function(id) {
    if(id){
      id = parseInt(id, 10);
    }
    var options = {
      id: id
    };
    App.main_region.show(new MainView(options));
  },

  images: function(id) {
    App.main_region.show(new ImagesView());
  }

});