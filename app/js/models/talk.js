define([
  'joshlib!utils/woodman',
  'joshlib!vendor/backbone'
], function(
  woodman,
  Backbone
) {
  var logger = woodman.getLogger('models.Talk');

  return Backbone.Model.extend({

    defaults: {
      'name': "coucou",
      'url': "http://www.google.fr"
    },

    initialize: function () {
      logger.info('create', this.get('name'));
    }
  });
});