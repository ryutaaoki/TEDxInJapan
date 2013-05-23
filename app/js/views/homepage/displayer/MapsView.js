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
      var self = this;
      var marker = {
        url: 'layout-img/red-cross.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(32, 32),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(16, 16)
      };

      var currentDate = this.getCurrentDate();

      var datasources = Joshfire.factory.getDataSource('tedxevents');

      datasources.find({}, function(error, data) {
        var allowedBounds = new google.maps.LatLngBounds();
        _.each(data.entries, function(entry){
          // if(new Date(self.convertDate(entry.startDate)) > new Date(self.convertDate(currentDate))) {
            var bound = new google.maps.LatLng(entry.latitude, entry.longitude);
            var crossMarker = new google.maps.Marker({
              position: bound,
              map: map,
              title: entry.name,
              icon: marker
            });
            // add new marker to the allowedBounds
            allowedBounds.extend(bound);

            //create an infoWindow for each marker
            // var contentString = entry.name;
            // var infowindow = new google.maps.InfoWindow({
            //   content: contentString
            // });

            //add event "click" on the marker
            google.maps.event.addListener(crossMarker, 'click', function() {
              window.open(entry.url,'_blank');
            });

            //ad event "mouseover" on the marker
            // google.maps.event.addListener(crossMarker, 'mouseover', function() {
            //   infowindow.open(map,crossMarker);
            // });
          // }
        });
        //Fit the map to display all markers at load
        map.fitBounds(allowedBounds);
        var listener = google.maps.event.addListener(map, "idle", function() {
          if (map.getZoom() < 5) map.setZoom(5);
          // uncomment to remove event if needed
          // google.maps.event.removeListener(listener);
        });
      });
    },

    convertDate: function(date) {
      var newDate = date.split('/');
      newDate = newDate[1] + '/' + newDate[0] + '/' + newDate[2];

      return newDate;
    },

    getCurrentDate: function() {
      var today = new Date();

      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();

      if(month < 10)
        month = "0"+month;

      if(day < 10)
        day = "0"+day;

      var currentDate = day + "/" + month + "/" + year;

      return currentDate;
    }

  });

  return MapsView;
});