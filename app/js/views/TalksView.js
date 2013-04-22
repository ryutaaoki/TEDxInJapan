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
      this.template = options.template = listTalksTemplate;
      this.appController = options.appController;

      Layout.prototype.initialize.call(this, options);
      logger.info('End initialize TalksView');
    },

    render: function () {
      $("[data-joshfire-child=talks]").html(listTalksTemplate);
    },

    // render: function(){
    //   this.$el.append(listTalksTemplate);
    // }

  });

  return TalksView;
});