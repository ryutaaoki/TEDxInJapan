define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/item',

  'text!templates/conferences/talks/ItemTalks.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,
  Item,

  ItemTalksTemplate
) {
  var logger = woodman.getLogger('views.ListPastTalksView');
  var ListPastTalksView = List.extend({

    initialize: function(options) {
      logger.info('initialize ListPastTalks');
      var options = options || {};

            options.template = ItemTalksTemplate; // TODO: Change to render every past talks


      var datasources = Joshfire.factory.getDataSource('spreadsheetslive');
      datasources.find({
        limit: 8
      }, function (err, data){
        var html = "<ul>";
        _.each(data.entries, function (entry) {
          console.log(entry);
          html += '<a href="' + entry.url + '" target="_blank">';
          html += '<li class="talks events">';
          html += '<img src="' + entry.image.contentURL + '" alt=""/>';
          html += '<br/><span class="address-event">' + entry.address + '</span>';
          html += '</li></a>';
        });
        html +="</ul>";
        $("#list-past-talks").html(html);
      });

      List.prototype.initialize.call(this,options);
    },
  });

  return ListPastTalksView;
});