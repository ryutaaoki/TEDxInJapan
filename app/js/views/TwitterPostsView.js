define([
  'joshlib!vendor/backbone',
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!ui/item',
  'joshlib!ui/layout',

  'text!templates/twitterPosts.html'
], function(
  Backbone,
  woodman,
  $,
  _,
  Item,
  Layout,

  twitterPostsTemplate
) {

  var logger = woodman.getLogger('views.TwitterPostsView');
  var TwitterPostsView = Layout.extend({

    initialize: function (options) {
      logger.info('initialize TwitterPostsView');
      // this.appController = options.appController;
      // options.template = twitterPostsTemplate;
      // Item.prototype.initialize.call(this, options);
    },

    // render: function(){
    //   this.$el.append(twitterPostsTemplate);
    // }

  });

  return TwitterPostsView;
});