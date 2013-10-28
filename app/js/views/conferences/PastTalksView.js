define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/conferences/talks/ListPastTalksView',
  'views/ErrorView',

  'text!templates/conferences/talks/TalksLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  ListTalks,
  ErrorView,

  TalksTemplate
) {
  var logger = woodman.getLogger('views.TalksView');
  var TalksView = Layout.extend({

    initialize: function(options) {
      logger.info('initialize TalksView');
      options = options || {};
      options.template = TalksTemplate;

      this.listTalks = new ListTalks({
        appController: options.appController,
        collection: options.collection
      });

      this.errorView = new ErrorView({
        model: new Backbone.Model({ description: '' })
      });

      options.children = {
        listTalks: this.listTalks,
        errorView: this.errorView
      };

      Layout.prototype.initialize.call(this,options);
    }
  });

  return TalksView;
});