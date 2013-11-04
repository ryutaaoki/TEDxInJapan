define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/discussions/grabbing/viewsObject/BlogPosting.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  BlogPostingTemplate
) {
  var logger = woodman.getLogger('views.BlogPostingView');
  var BlogPostingView = Item.extend({

    initialize: function(options) {
      logger.info('initialize BlogPostingView');
      options = options || {};
      options.template = BlogPostingTemplate;
      Item.prototype.initialize.call(this,options);
    }
  });

  return BlogPostingView;
});
