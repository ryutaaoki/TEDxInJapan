define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/conferences/displayer/DisplayEventsLayout',
  // 'views/homepage/displayer/DisplayPanel',

  'text!templates/conferences/displayer/DisplayEventsLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  DisplayEventsLayout,
  // DisplayPanel,

  DisplayEventsTemplate
) {
  var logger = woodman.getLogger('views.DisplayerView');
  var DisplayerView = Layout.extend({

    initialize: function(options) {
      logger.info('initialize DisplayerView');
      var options = options || {};
      options.template = DisplayEventsTemplate;

      this.displayEvents = new DisplayEventsLayout({
        appController: options.appController,
        model: new Backbone.Model()
      });

      // this.panelDisplay = new DisplayPanel({
      //   appController: options.appController
      // });

      options.children = {
        displayEvents: this.displayEvents,
        // panelDisplay: this.panelDisplay
      };

      Layout.prototype.initialize.call(this,options);
    },
  });

  return DisplayerView;
});