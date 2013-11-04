/*global define*/
define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/homepage/talks/ListTalksView',
  'views/homepage/talks/ModalTalkView',
  'views/ErrorView',

  'text!templates/homepage/talks/TalksLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  ListTalks,
  ModalTalk,
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

      this.modalTalk = new ModalTalk({
        appController: options.appController,
        model: new Backbone.Model()
      });

      this.errorView = new ErrorView({
        model: new Backbone.Model({ description: '' })
      });

      options.children = {
        listTalks: this.listTalks,
        modalTalk: this.modalTalk,
        errorView: this.errorView
      };

      Layout.prototype.initialize.call(this,options);
    }
  });

  return TalksView;
});