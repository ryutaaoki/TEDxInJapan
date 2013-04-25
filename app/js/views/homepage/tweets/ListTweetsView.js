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

  List,
  Item,

  ItemTweetsTemplate
) {
  var logger = woodman.getLogger('views.ListTweetsView');
  var ListTweetsView = List.extend({

    initialize: function(options) {
      logger.info('initialize ListTweets');
      // options.template = ItemTweetsTemplate;

      var tweets = Joshfire.factory.getDataSource('tweets');

      tweets.find({
          limit: 10
        },
        function( err , data ) {
          var html = "<ul>";
          _.each(data.entries, function(entry) {
            console.log(entry);
            html += '<a href="' + entry.url + '" target="_blank">';
            html += '<li class="tweet">';
            html += '<img src="' + entry.author[0].image.contentURL + '" alt="" width="40"/>';
            html += '<span>' + entry.name + '</span>' + '<br/><span class="name-author">' + entry.author[0].name + '</span>';
            html += '</li></a>';
          });
          html +="</ul>";
          $("#posts").html(html);
        }
      );

      var options = options || {};


      List.prototype.initialize.call(this,options);
    },
  });

  return ListTweetsView;
});