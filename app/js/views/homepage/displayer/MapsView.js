/*global define, google*/
define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/homepage/displayer/Maps.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  MapsTemplate
) {
  var logger = woodman.getLogger('views.MapsView');
  var MapsView = Item.extend({

    className: 'tedxMap',

    initialize: function(options) {
      logger.info('initialize MapsView');
      options = options || {};
      options.template = MapsTemplate;
      this.appController = options.appController;

      Item.prototype.initialize.call(this,options);
    },

    createGoogleMaps: function() {
      var map;

      var mapOptions = {
        center: new google.maps.LatLng(47.2088589,2.3470599),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        },
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      };

      map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

      /* Markers Creation */
      this.setMarkers(map);

    },

    enhance: function (){
      this.createGoogleMaps();
      Item.prototype.enhance.call(this);
    },

    setMarkers: function (map) {
      var marker = {
        url: 'layout-img/red-cross.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(32, 32),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(16, 16)
      };
      var self = this;

      if (!this.appController ||
          !this.appController.data ||
          !this.appController.data.events) {
        logger.warn('No events datasource');
        return;
      }

      var collection = self.appController.data.events;
      var bindPoints = function () {
        collection.each(function (model) {
          var bound = new google.maps.LatLng(
            model.get('latitude'),
            model.get('longitude')
          );
          var crossMarker = new google.maps.Marker({
            position: bound,
            map: map,
            title: model.get('name'),
            icon: marker
          });

          //add event "click" on the marker
          google.maps.event.addListener(crossMarker, 'click', function() {
            window.open(model.get('url'), '_blank');
          });
        });
      };

      if (collection.length > 0) {
        bindPoints();
      }
      else {
        this.listenTo(collection, 'load', bindPoints);
      }
    }
  });

  return MapsView;
});