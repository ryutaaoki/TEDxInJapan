define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',
  'joshlib!ui/layout',

  'views/contact/ContactView',

  'text!templates/contact/ContactLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,
  Layout,

  ContactView,

  ContactLayout
) {
  var logger = woodman.getLogger('views.ContactPagePanel');
  var ContactPagePanel = Layout.extend({

    initialize: function(options) {
      logger.info('initialize ContactPagePanel');
      options = options || {};
      options.template = ContactLayout;

      this.contact = new ContactView({
        appController: options.appController,
        model: new Backbone.Model()
      });

      options.children = {
        contact: this.contact
      };

      Layout.prototype.initialize.call(this,options);
    }
  });

  return ContactPagePanel;
});