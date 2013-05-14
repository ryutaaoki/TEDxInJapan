define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/item',

  'text!templates/discussions/grabbing/ItemTweetsGrabbing.html',
  'text!templates/discussions/grabbing/GrabbingLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,
  Item,

  ItemTweetsGrabbingTemplate,
  ListTemplate
) {
  var logger = woodman.getLogger('views.ListTweetsGrabbingView');
  var ListTweetsGrabbing = List.extend({

    item_class: 'item',

    initialize: function(options) {
      logger.info('initialize ListTweetsGrabbing');
      var options = options || {};

      options.itemTemplate = ItemTweetsGrabbingTemplate;

      List.prototype.initialize.call(this,options);
      // this.collection.on('loaded', function(){
      //   $('#container').masonry('reload');
      // });
    }
  });

  return ListTweetsGrabbing;
});