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

    events: {
      "click .closeModal" : "stopModal"
    },

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
    },

    stopModal: function(){
      var embed = this.$el.find('#videoEmbed');
      this.$el.find('#videoEmbed').remove();
      this.$el.find('.modal-body').prepend(embed);
      app.router.navigate('home', {
        trigger: true
      });
    }
  });

  return ModalTalkView;
});