define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/ListTweetsView',

  'text!templates/TweetsLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  ListTweets,

  TweetsTemplate
) {
  var logger = woodman.getLogger('views.TweetsView');
  var TweetsView = Layout.extend({

    initialize: function(options) {
      logger.info('initialize TweetsView');
      var options = options || {};
      options.template = TweetsTemplate;

      this.listTweets = new ListTweets({
        appController: options.appController
      });

      options.children = {
        listTweets: this.listTweets
      };

      Layout.prototype.initialize.call(this,options);
    },
  });

  return TweetsView;
});