define([
  'joshlib!utils/woodman',
  'joshlib!vendor/backbone'
], function(
  woodman,
  Backbone
) {
  var logger = woodman.getLogger('models.talk');

  return Backbone.Model.extend({
    defaults: {
      title: 'TEDx Talk',
      place: 'Paris',
      date: 'Today\'s date',
      speakers: [
        { firstname : 'Hello' , name: 'World' }
      ]
    },

    initialize: function () {
      logger.info('create', this.get('name'));
    }

  });
});