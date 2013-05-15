define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/homepage/talks/Modal.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  ModalTemplate
) {
  var logger = woodman.getLogger('views.ModalTalkView');
  var ModalTalkView = Item.extend({

    initialize: function(options) {
      logger.info('initialize ModalTalkView');
      var options = options || {};

      options.template = ModalTemplate;

      Item.prototype.initialize.call(this,options);
    },

    showModal: function(itemId) {
      $('div.talkModal').modal({keyboard:false,backdrop:'static'});
    },

    setModel: function (modelTalk) {
      this.model = modelTalk;
    }
  });

  return ModalTalkView;
});