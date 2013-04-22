define([
  'joshlib!vendor/backbone',
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!ui/layout',
  'joshlib!ui/item',
  'joshlib!ui/map',

  'text!templates/displayer.html'
], function(
  Backbone,
  woodman,
  $,
  _,

  Layout,
  Item,
  GMap,

  displayerTemplate
) {

  var logger = woodman.getLogger('views.DisplayerView');
  var DisplayerView = Layout.extend({

    events: {
      'click #tedx-now'  : 'tedxLive',
      'click #tedx-map'  : 'tedxMap',
      'click #tedx-radio': 'tedxRadio'
    },

    template: _.template(displayerTemplate),

    initialize: function (options) {
      logger.info('initialize DisplayerView', this.el);
      options.template = displayerTemplate;
      this.appController = options.appController;
      // logger.info(this.template);

      Layout.prototype.initialize.call(this, options);
      logger.info('End initialize DisplayerView');
    },

    render: function () {
      $("[data-joshfire-child=displayer]").html(displayerTemplate);
    },

    tedxLive: function () {
      logger.info('Gotcha ! TEDx Live !');
      this.$el.find($('img')).first().show();
    },

    tedxMap: function () {
      logger.info('Display Google Maps API with TEDx in the country !');
      this.$el.find($('img')).first().hide();


      // var gmap = new GMap();
      // console.log(gmap);
      /* render the map GoogleMaps API v3 */

    },

    tedxRadio: function () {
      logger.info('Edit view Radio to listen TEDx live radio !');
      this.$el.find($('img')).first().show();
    }
  });

  return DisplayerView;
});