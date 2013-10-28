define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/discussions/grabbing/ListTweetsGrabbing',
  'views/ErrorView',

  'text!templates/discussions/grabbing/GrabbingLayout.html',
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  ListTweetsGrabbing,
  ErrorView,

  DisplayerTemplate
) {
  var logger = woodman.getLogger('views.DisplayerView');
  var DisplayerView = Layout.extend({

    tagName: 'div',

    initialize: function(options) {
      logger.info('initialize DisplayerView');
      options = options || {};
      options.template = DisplayerTemplate;

      this.listTweetsGrabbing = new ListTweetsGrabbing({
        appController: options.appController,
        collection: options.collection,
        autoLoadMore: true
      });

      this.errorView = new ErrorView({
        model: new Backbone.Model({ description: '' })
      });

      options.children = {
        listTweetsGrabbing: this.listTweetsGrabbing,
        errorView: this.errorView
      };

      Layout.prototype.initialize.call(this,options);
    }
  });

  return DisplayerView;
});