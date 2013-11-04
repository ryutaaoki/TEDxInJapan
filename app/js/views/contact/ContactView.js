define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',
  'joshlib!ui/item',

  'text!templates/contact/Contact.html'
], function(
  woodman,
  $,
  _,
  Backbone,
  Item,

  ContactTemplate
) {
  var logger = woodman.getLogger('views.ContactView');
  var ContactView = Item.extend({

    initialize: function(options) {
      logger.info('initialize ContactView');
      options = options || {};
      options.template = ContactTemplate;
      Item.prototype.initialize.call(this,options);
    }
  });

  return ContactView;
});