define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/item',

  'text!templates/discussions/grabbing/ItemTweetsGrabbing.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,
  Item,

  ItemTweetsGrabbingTemplate
) {
  var logger = woodman.getLogger('views.ListTweetsGrabbingView');
  var ListTweetsGrabbing = List.extend({

    tagName: "div",

    id: "grabbing",

    initialize: function(options) {
      logger.info('initialize ListTweetsGrabbing');
      var options = options || {};
      options.itemTemplate = ItemTweetsGrabbingTemplate;

      List.prototype.initialize.call(this,options);
    },
  });

  return ListTweetsGrabbing;
});