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