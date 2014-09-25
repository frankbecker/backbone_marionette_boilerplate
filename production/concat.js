var Imgs_model = Backbone.Model.extend({
  defaults: {
    "description_one":  "Batman the Dark Night",
    "description_two":     "Superman is the man",
    "description_three":    "Joker, Joker, Joker"
  }
});
var View_A = Backbone.Marionette.View.extend({

  tagName: "div",

  className: "View_A",

  template: Handlebars.compile($("#View_A-template").html()),

  events: {
    "click a":          "tab_selected",
  },
  /*
   options = {id: id}
   */
  
  ///////  Whatever   
  ///  Whatever Again
  initialize: function (options) {
    this.model = window.model = new Imgs_model();
    this.listenTo(App, "whatever", this.onDestroy); ///  this is just a demonstration of how to bind events to our objects
    this.listenTo(this.model, "change", this.render);
    this.id = options.id;
    this.my_variable = App.my_variable;
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.select_proper_index();
  },

  select_proper_index: function() {
    if(!this.id) return;
    var self = this;
    setTimeout(function(){
      $("a[data-id = "+self.id+" ]", self.el).click();
    },200);
    
  },

  tab_selected: function (e) {
    var data_id = $(e.currentTarget).attr("data-id");
    this.trigger("tab:selected", data_id);
  },

  onDestroy: function(){
    console.log("Destroying View_A");
  }

});
var View_B = Backbone.Marionette.View.extend({

  tagName: "div",

  className: "View_B",

  template: Handlebars.compile($("#View_B-template").html()),

  events: {
    //"click .icon":          "open",
  },
  /*
   options = {id: id}
   */
  initialize: function (options) {
    this.id = options.id;
    this.images = ["pic_1.jpg", "pic_2.jpg", "pic_3.jpg"];
  },

  render: function () {
    this.$el.html(this.template);
    this.load_image();
  },

  show_image: function (image_number) {
      image_number = parseInt(image_number,10);
      $('img',this.el).attr('src', "img/"+this.images[image_number]);
  },

  load_image: function (){
    var image_index = (this.id) ? this.id : 0;
      $('img',this.el).attr('src', "img/"+this.images[image_index]);
  },

  onDestroy: function(){
    console.log("Destroying View_B");
  }

});
var MainView = Backbone.Marionette.LayoutView.extend({

  tagName: "div",

  className: "MainView",

  regions: {
    left_region: "#left_region",
    right_region: "#right_region"
  },

  template: Handlebars.compile($("#main-template").html()),

  events: {
    "click button":          "switch_views"
  },
  /*
   options {id: id}
   */
  initialize: function (options) {
    this.id = options.id;
    this.switched = false;
    this.view_a = null;
    this.view_b = null;
    this.create_views_and_bind_events();
  },

  render: function () {
    this.$el.html(this.template);
    this.show_views();
  },

  show_views: function() {
    this.left_region.show(this.view_a);
    this.right_region.show(this.view_b);
  },

  create_views_and_bind_events: function () {
    var self = this;
    this.view_a = new View_A({id: this.id});    
    this.view_b = new View_B({id: this.id});
    this.view_a.on('tab:selected', function (image_number) {
      self.change_image(image_number);
    });
  },

  switch_views: function () {
    this.create_views_and_bind_events();
    if(this.switched){
      this.left_region.show(this.view_a);
      this.right_region.show(this.view_b);
    }else{
      this.left_region.show(this.view_b);
      this.right_region.show(this.view_a);
    }
    this.switched = !this.switched;
  },

  change_image: function (image_number) {
    this.view_b.show_image(image_number);
  },

  onDestroy: function(){
    console.log("Destroying MainView");
  }

});
var HeaderView = Marionette.View.extend({

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

  onDestroy: function(){
    console.log("Destroying HeaderView");
  }

});
var FooterView = Marionette.View.extend({

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

  onDestroy: function(){
    console.log("Destroying FooterView");
  }

});
var HomeView = Marionette.View.extend({

  tagName: "div",

  className: "HomeView",

  template: Handlebars.compile($("#home_view-template").html()),

  events: {
    //"click .icon":          "open",
  },

  initialize: function () {
    //this.listenTo(this.model, "change", this.render);
  }, 

  render: function () {
    this.$el.html(this.template); 
  },

  onDestroy: function(){
    console.log("Destroying HomeView");
  }

});
var ImagesView = Marionette.View.extend({

  tagName: "div",

  className: "ImagesView",

  template: Handlebars.compile($("#Images_view-template").html()),

  events: {
    //"click .icon":          "open",
  },

  /*
  options = {id : id}
   */
  initialize: function (options) {
    //this.listenTo(this.model, "change", this.render);
  }, 

  render: function () {
    this.$el.html(this.template); 
  },

  onDestroy: function(){
    console.log("Destroying ImagesView");
  }

});
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
var App = new Backbone.Marionette.Application({
  regions: {
    header_region: '#header-region',
    main_region: '#main-region',
    footer_region: '#footer-region'
  }
});

App.addInitializer(function(options){
	App.header_region.show(new HeaderView()); 	
 	App.footer_region.show(new FooterView());
});

App.addInitializer(function(options){
  App.AppRouter = new Router();
  Backbone.history.start();
});

App.start();