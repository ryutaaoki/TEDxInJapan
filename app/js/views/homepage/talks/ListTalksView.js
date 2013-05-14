define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/item',

  'text!templates/homepage/talks/ItemTalks.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,
  Item,

  ItemTalksTemplate
) {
  var logger = woodman.getLogger('views.ListTalksView');
  var ListTalksView = List.extend({

    className: "talks",

    events: {
      "click span.talkModal" : "showModal"
    },

    initialize: function(options) {
      logger.info('initialize ListTalks');
      var options = options || {},
          self = this;

      options.itemTemplate = ItemTalksTemplate;

      List.prototype.initialize.call(this,options);

      this.collection.off();
      this.collection.on('loaded', function() {
        self.update(true);
      });
    },

    showModal: function(e) {
      var itemId = $(e.currentTarget).attr("id");
      this.updateContentModal(this.collection.get(itemId));
      $('div.talkModal').modal({keyboard:false,backdrop:'static'});
    },

    updateContentModal: function(item) {
      var modal = $('div.talkModal');
      modal.find('#label-modal').html(item.attributes.name);
      modal.find('.modal-body embed').attr('src', item.attributes.embedURL+"&enablejsapi=1");
      modal.find('.modal-body p#description-modal').html(item.attributes.description);
    }
  });

  return ListTalksView;
});