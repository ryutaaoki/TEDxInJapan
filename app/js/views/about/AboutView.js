define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',

  'text!templates/about/ItemAbout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,

  ItemAboutTemplate
) {
  var logger = woodman.getLogger('views.AboutView');
  var AboutView = List.extend({

    initialize: function (options) {
      logger.info('initialize ListPastTalks');
      options = options || {};
      options.itemTemplate = ItemAboutTemplate;
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
    }
  });

  return AboutView;
});
