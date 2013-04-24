define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/discussions/grabbing/ListTweetsGrabbing',

  'text!templates/discussions/grabbing/GrabbingLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  ListTweetsGrabbing,

  DisplayerTemplate
) {
  var logger = woodman.getLogger('views.DisplayerView');
  var DisplayerView = Layout.extend({

    initialize: function(options) {
      logger.info('initialize DisplayerView');
      var options = options || {};
      options.template = DisplayerTemplate;

      this.listTweetsGrabbing = new ListTweetsGrabbing({
        appController: options.appController,
        model: new Backbone.Model()
      });

      options.children = {
        listTweetsGrabbing: this.listTweetsGrabbing
      };

      Layout.prototype.initialize.call(this,options);
    },
  });

  return DisplayerView;
});