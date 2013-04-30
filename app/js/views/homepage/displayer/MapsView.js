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

    initialize: function(options) {
      logger.info('initialize MapsView');
      var options = options || {};

      options.template = MapsTemplate;

      Item.prototype.initialize.call(this,options);
    },

    createGoogleMaps: function() {
      var map;
      var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(48.52, 2.1959),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        },
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

      /* Markers Creation ! TRY */
      var marker = {
        url: 'layout-img/red-cross.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(32, 32),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(16, 16)
      };
      new google.maps.Marker({
        position: map.getCenter(), //POSITION OF THE MARKER
        map: map,
        title: 'TEDx Event 1',
        icon: marker
      });

      new google.maps.Marker({
        position: new google.maps.LatLng(41.20, -3.08), //POSITION OF THE MARKER
        map: map,
        title: 'TEDx Event 2',
        icon: marker
      });

      new google.maps.Marker({
        position: new google.maps.LatLng(50.05, 9.33), //POSITION OF THE MARKER
        map: map,
        title: 'TEDx Event 3',
        icon: marker
      });

      // ---- END MARKERS CREATION

      // Bounds for North America
      var allowedBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(41.20, -3.08),
        new google.maps.LatLng(50.05, 9.33));

      allowedBounds.extend(new google.maps.LatLng(41.20, -3.08));
      allowedBounds.extend(new google.maps.LatLng(50.05, 9.33));
      map.fitBounds(allowedBounds);
      map.setZoom(3);

    },

    enhance: function (){
      this.createGoogleMaps();
      Item.prototype.enhance.call(this);
    }

  });

  return MapsView;
});