define([
  'joshlib!utils/woodman',
  'joshlib!vendor/backbone'
], function(
  woodman,
  Backbone
) {
  var logger = woodman.getLogger('models.twitterPost');

  return Backbone.Model.extend({
    initialize: function () {
      logger.info('create', this.get('name'));
    }
  });
});