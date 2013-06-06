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
        _.each(data.entries, function(entry){
          // if(new Date(self.convertDate(entry.startDate)) > new Date(self.convertDate(currentDate))) {
            var bound = new google.maps.LatLng(entry.latitude, entry.longitude);
            var crossMarker = new google.maps.Marker({
              position: bound,
              map: map,
              title: entry.name,
              icon: marker
            });

            //add event "click" on the marker
            google.maps.event.addListener(crossMarker, 'click', function() {
              window.open(entry.url,'_blank');
            });
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