define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/homepage/talks/ListTalksView',

  'text!templates/homepage/talks/TalksLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  ListTalks,

  TalksTemplate
) {
  var logger = woodman.getLogger('views.TalksView');
  var TalksView = Layout.extend({

    initialize: function(options) {
      logger.info('initialize TalksView');
      var options = options || {};
      options.template = TalksTemplate;

      this.listTalks = new ListTalks({
        appController: options.appController
      });

      options.children = {
        listTalks: this.listTalks
      };

      Layout.prototype.initialize.call(this,options);
    },
  });

  return TalksView;
});