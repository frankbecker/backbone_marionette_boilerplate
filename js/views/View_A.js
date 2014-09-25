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