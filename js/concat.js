var View_A = Marionette.View.extend({

  tagName: "div",

  className: "View_A",

  template: Handlebars.compile($("#View_A-template").html()),

  events: {  
    //"click .icon":          "open",
  },

  initialize: function () {
    //this.listenTo(this.model, "change", this.render);
  },

  render: function () {
    this.$el.html(this.template);
  },

  onClose: function () { 
    console.log("closing view");
  }

});var View_B = Marionette.View.extend({

  tagName: "div",

  className: "View_B",

  template: Handlebars.compile($("#View_B-template").html()),

  events: {
    //"click .icon":          "open",
  },

  initialize: function () {
    //this.listenTo(this.model, "change", this.render);
  },

  render: function () {
    this.$el.html(this.template);
  },

  onClose: function () {
    console.log("closing view");
  }

});var MainView = Backbone.Marionette.LayoutView.extend({

  tagName: "div",

  className: "MainView",

  regions: {
    left_region: "#left_region",
    right_region: "#right_region"
  },

  template: Handlebars.compile($("#main-template").html()),

  events: {
    //"click .icon":          "open",
  },

  initialize: function () {
    this.show_views();
  },

  render: function () {
    this.$el.html(this.template);
  },

  show_views: function() {
    this.left_region.show(new View_A());
    this.right_region.show(new View_B());
  },

  onClose: function () {
    console.log("closing view");
  }

});var HeaderView = Marionette.View.extend({

  tagName: "div",

  className: "HeaderView",

  template: Handlebars.compile($("#header-template").html()),

  events: {
    //"click .icon":          "open",
  },

  initialize: function () {
    //this.listenTo(this.model, "change", this.render);
  },

  render: function () {
    this.$el.html(this.template);
  },

  onClose: function () {
    console.log("closing view");
  }

});var FooterView = Marionette.View.extend({

  tagName: "div",

  className: "FooterView",

  template: Handlebars.compile($("#footer-template").html()),

  events: {
    //"click .icon":          "open",
  },

  initialize: function () {
    //this.listenTo(this.model, "change", this.render);
  }, 

  render: function () {
    this.$el.html(this.template); 
  },

  onClose: function () {
    console.log("closing view");
  }

});var Router = Backbone.Router.extend({

  routes: {
    "":                "home",  
    "page_one":        "page_one",
    "page_two/:id":    "page_two"
  },

  home: function() {
   	console.log("Home");
  },

  page_one: function() {
    console.log("Page One");
  },

  page_two: function(id) {
    console.log("Page Two "+ id);
  }

});var App = new Backbone.Marionette.Application({
  regions: {
    header_region: '#header-region',
    main_region: '#main-region',
    footer_region: '#footer-region'
  }
});

App.addInitializer(function(options){
	App.header_region.show(new HeaderView());
 	App.main_region.show(new MainView());
 	App.footer_region.show(new FooterView());
});

App.addInitializer(function(options){
  App.AppRouter = new Router();
  Backbone.history.start();
});

App.start();