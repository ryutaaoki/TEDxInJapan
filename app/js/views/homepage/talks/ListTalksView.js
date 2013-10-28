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

    className: 'talks',

    initialize: function(options) {
      logger.info('initialize ListTalks');
      options = options || {};
      options.itemTemplate = ItemTalksTemplate;
      List.prototype.initialize.call(this,options);
    },

    /**
     * Sets the collection associated with the view.
     *
     * Overrides default behavior to only listen to load events.
     *
     * @function
     * @param {Collection} collection Backbone collection to bind to the view
     * @param {Boolean} update Update the view when set. When not, the view
     *  will just wait for new events on the model to update itself.
     */
    setCollection: function (collection, update) {
      if (this.collection) {
        this.stopListening(this.collection);
      }

      this.collection = collection;
      this.collectionChanged = true;
      this.newChildren = [];

      if (this.collection) {
        logger.log(this.logid, 'set collection');
        this.listenTo(this.collection, 'load',
          this.callIfNotRemoved(this.update));
      }

      if (update) {
        this.update();
      }
    },

    createChildrenViews: function(){
      List.prototype.createChildrenViews.apply(this,arguments);
      this.items.reverse();
    }
  });

  return ListTalksView;
});