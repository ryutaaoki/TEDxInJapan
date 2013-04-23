define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/ListDisplayView',
  'views/DisplayPanel',

  'text!templates/DisplayerLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  ListDisplay,
  DisplayPanel,

  DisplayerTemplate
) {
  var logger = woodman.getLogger('views.DisplayerView');
  var DisplayerView = Layout.extend({

    initialize: function(options) {
      logger.info('initialize DisplayerView');
      var options = options || {};
      options.template = DisplayerTemplate;

      this.listDisplay = new ListDisplay({
        appController: options.appController
      });

      this.panelDisplay = new DisplayPanel({
        appController: options.appController
      });

      options.children = {
        listDisplay: this.listDisplay,
        panelDisplay: this.panelDisplay
      };

      Layout.prototype.initialize.call(this,options);
    },
  });

  return DisplayerView;
});