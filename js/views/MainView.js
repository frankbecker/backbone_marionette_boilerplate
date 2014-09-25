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