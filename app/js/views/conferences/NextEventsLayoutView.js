define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/conferences/displayer/DisplayEventsLayout',
  'views/ErrorView',

  'text!templates/conferences/displayer/DisplayEventsLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  DisplayEventsLayout,
  ErrorView,

  DisplayEventsTemplate
) {
  var logger = woodman.getLogger('views.DisplayerView');
  var DisplayerView = Layout.extend({

    initialize: function(options) {
      logger.info('initialize DisplayerView');
      options = options || {};
      options.template = DisplayEventsTemplate;

      this.displayEvents = new DisplayEventsLayout({
        appController: options.appController,
        collection: options.collection
      });

      this.errorView = new ErrorView({
        model: new Backbone.Model({ description: '' })
      });

      options.children = {
        displayEvents: this.displayEvents,
        errorView: this.errorView
      };

      Layout.prototype.initialize.call(this,options);
    }
  });

  return DisplayerView;
});