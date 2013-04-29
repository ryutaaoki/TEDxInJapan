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

      new google.maps.Marker({
        position: map.getCenter(), //POSITION OF THE MARKER
        map: map,
        title: 'TEDx Event 1',
        // icon: 'layout-img/red-cross.png'
      });

      new google.maps.Marker({
        position: new google.maps.LatLng(41.20, -3.08), //POSITION OF THE MARKER
        map: map,
        title: 'TEDx Event 2',
        // icon: 'layout-img/red-cross.png'
      });

      new google.maps.Marker({
        position: new google.maps.LatLng(50.05, 9.33), //POSITION OF THE MARKER
        map: map,
        title: 'TEDx Event 3',
        // icon: 'layout-img/red-cross.png'
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