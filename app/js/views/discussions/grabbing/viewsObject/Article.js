define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/discussions/grabbing/viewsObject/Article.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  ArticleTemplate
) {
  var logger = woodman.getLogger('views.ArticleView');
  var ArticleView = Item.extend({

    initialize: function(options) {
      logger.info('initialize ArticleView');
      options = options || {};
      options.template = ArticleTemplate;
      Item.prototype.initialize.call(this,options);
    }
  });

  return ArticleView;
});
