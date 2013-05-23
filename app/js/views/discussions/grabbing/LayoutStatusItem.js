define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',
  'joshlib!view',

  'views/discussions/grabbing/ItemStatusView',
  'views/discussions/grabbing/viewsObject/ImageObject',
  'views/discussions/grabbing/viewsObject/VideoObject',
  'views/discussions/grabbing/viewsObject/BlogPosting',
  'views/discussions/grabbing/viewsObject/CreativeWork',

  'text!templates/discussions/grabbing/LayoutStatus.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,
  View,

  ItemStatusView,
  ImageObject,
  VideoObject,
  BlogPosting,
  CreativeWork,

  LayoutStatusTemplate
) {
  var logger = woodman.getLogger('views.LayoutStatusItem');
  var LayoutStatusItem = Layout.extend({

    initialize: function(options) {
      logger.info('initialize LayoutStatusItem');
      options = options || {};

      options.template = LayoutStatusTemplate;

      this.dynamicContent = this.factory(this.extractMentions(options.model));

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
      var mentions = model.get('mentions');
      if (!mentions || (mentions.length === 0)) return null;

      var mention = mentions[0];
      if(mention.entries) {
        return new Backbone.Model(mention.entries[0]);
      }
      else {
        return new Backbone.Model(mention);
      }
    },

    factory: function(model) {

      if(model) {
        switch(model.get('@type')){
        case "ImageObject":
          // console.log(model);
          return new ImageObject({
            model: model
          });

        case "CreativeWork":
          // console.log(model);
          return new CreativeWork({
            model: model
          });

        case "VideoObject":
          // console.log(model);
          return new VideoObject({
            model: model
          });

        case "BlogPosting":
          // console.log(model);
          return new BlogPosting({
            model: model
          });

        default:
          console.log(model);
          return new View();
        }
      } else {
        // console.log(model);
        return new View();
      }
    },

    enhance: function(options) {
      Layout.prototype.enhance.call(this,options);
    }

  });

  return LayoutStatusItem;
});
