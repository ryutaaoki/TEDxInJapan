define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/item',

  'text!templates/homepage/talks/ItemTalks.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,
  Item,

  ItemTalksTemplate
) {
  var logger = woodman.getLogger('views.ListTalksView');
  var ListTalksView = List.extend({

    initialize: function(options) {
      logger.info('initialize ListTalks');
      var options = options || {};
      options.template = ItemTalksTemplate;

      var datasources = Joshfire.factory.getDataSource('youtube');

      datasources.find({
        limit: 9
      }, function(error, data) {
        var html = "<ul>";
        _.each(data.entries, function(entry) {
          // console.log(entry);
          html += '<a href="' + entry.url + '" target="_blank">';
          html += '<li class="talks">';
          html += '<img src="' + entry.image.contentURL + '" alt=""/>';
          html += '<br/><span class="name-talk">' + entry.author[0].name + '</span>'/* + '<br/><span class="name-author">' + entry.author[0].name + '</span>'*/;
          html += '</li></a>';
        });
        html +="</ul>";
        $("#playlist-youtube").html(html);
      });

      List.prototype.initialize.call(this,options);
    },
  });

  return ListTalksView;
});