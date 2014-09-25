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