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