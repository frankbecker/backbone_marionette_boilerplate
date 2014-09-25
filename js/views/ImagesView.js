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