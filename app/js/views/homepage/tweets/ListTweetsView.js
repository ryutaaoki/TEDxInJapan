define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/item',

  'text!templates/homepage/tweets/ItemTweets.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List
) {
  var logger = woodman.getLogger('views.ListTweetsView');
  var ListTweetsView = List.extend({

    initialize: function(options) {
      logger.info('initialize ListTweets');
      options = options || {};
      List.prototype.initialize.call(this,options);
    }
  });

  return ListTweetsView;
});