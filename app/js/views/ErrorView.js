define([
  'joshlib!utils/woodman',
  'joshlib!ui/item',

  'text!templates/Error.html'
], function(
  woodman,
  Item,
  
  ErrorTemplate
) {
  var logger = woodman.getLogger('views.ErrorView');
  var ErrorView = Item.extend({
    initialize: function(options) {
      logger.info('initialize Error message');
      options = options || {};
      options.template = ErrorTemplate;
      Item.prototype.initialize.call(this, options);
    }
  });

  return ErrorView;
});