define([
  'joshlib!vendor/backbone',
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!ui/layout',
  'joshlib!ui/item',

  'text!templates/listTalks.html'
], function(
  Backbone,
  woodman,
  $,
  _,
  Layout,
  Item,

  listTalksTemplate
) {

  var logger = woodman.getLogger('views.TalksView');
  var TalksView = Layout.extend({

    initialize: function (options) {
      logger.info('initialize TalksView');
      // this.appController = options.appController;

      // options.template = listTalksTemplate;
      // Item.prototype.initialize.call(this, options); //THERE IS A PROBLEME
      // logger.log("coucou");
    }

    // render: function(){
    //   this.$el.append(listTalksTemplate);
    // }

  });

  return TalksView;
});