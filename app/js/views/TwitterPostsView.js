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
      this.template = options.template = twitterPostsTemplate;
      this.appController = options.appController;

      Layout.prototype.initialize.call(this, options);
      logger.info('End initialize TwitterPostsView');
    },

    render: function () {
      $("[data-joshfire-child=twitterPosts]").html(twitterPostsTemplate);
    },

    // render: function(){
    //   this.$el.append(twitterPostsTemplate);
    // }

  });

  return TwitterPostsView;
});