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

      var datasources = Joshfire.factory.getDataSource('spreadsheetslive');

      datasources.find({
        limit: 10
      }, function(error, data) {
        var allowedBounds = new google.maps.LatLngBounds();
        _.each(data.entries, function(entry){
          var bound = new google.maps.LatLng(entry.latitude, entry.longitude);
          new google.maps.Marker({
            position: bound,
            map: map,
            title: entry.name,
            icon: marker
          });
          // add new marker to the allowedBounds
          allowedBounds.extend(bound);
        });
        //Fit the map to display all markers at load
        map.fitBounds(allowedBounds);
      });
    }

  });

  return MapsView;
});