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