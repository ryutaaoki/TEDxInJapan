define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'joshlib!ui/dynamiccontainer',
  'views/discussions/grabbing/ItemStatusView',
  'views/discussions/grabbing/viewsObject/ImageObject',
  'views/discussions/grabbing/viewsObject/VideoObject',
  'views/discussions/grabbing/viewsObject/BlogPosting',

  'text!templates/discussions/grabbing/LayoutStatus.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  DynamicContainer,
  ItemStatusView,
  ImageObject,
  VideoObject,
  BlogPosting,

  LayoutStatusTemplate
) {
  var logger = woodman.getLogger('views.LayoutStatusItem');
  var LayoutStatusItem = Layout.extend({

    initialize: function(options) {
      logger.info('initialize LayoutStatusItem');
      var options = options || {};

      options.template = LayoutStatusTemplate;

      this.dynamicContent = new DynamicContainer({
        appController: options.appController,
        model: this.extractMentions(options.model),
        itemFactory: _.bind(this.factory, this)
      });

      this.itemStatus = new ItemStatusView({
        appController: options.appController,
        model: options.model
      });

      options.children = {
        dynamic : this.dynamicContent,
        item: this.itemStatus
      };

      Layout.prototype.initialize.call(this,options);
    },

    extractMentions: function (model) {
      model.set('mentions', new Backbone.Model({
        // type: '@ImageObject',
        // contentURL: 'http://images.ted.com/images/ted/c0e23623747d380131042a19161ef41aaff9ade1_425x259.jpg'
        type: '@VideoObject',
        embedUrl: 'http://www.youtube.com/embed/xmoIDKqfY44'
      }));
      if(model.get('mentions').entries)
        return model.get('mentions').get('entries')[0];
      else
        return model.get('mentions');
    },

    factory: function(params) {

      switch(params.model.get('type')){
        case "@ImageObject":
          return new ImageObject(params.model);

        case "@VideoObject":
          return new VideoObject(params.model);

        case "@BlogPosting":
          return new BlogPosting(params.model);
      }
    },

    enhance: function(options) {
      Layout.prototype.enhance.call(this,options);
    }

  });

  return LayoutStatusItem;
});
