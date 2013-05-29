define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/listitem',
  'joshlib!ui/item',

  'text!templates/discussions/grabbing/ItemTweetsGrabbing.html',
  'text!templates/discussions/grabbing/GrabbingLayout.html',

  'views/discussions/grabbing/LayoutStatusItem'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,
  ListItem,
  Item,

  ItemTweetsGrabbingTemplate,
  ListTemplate,

  LayoutStatusItem
) {
  var logger = woodman.getLogger('views.ListTweetsGrabbingView');
  var ListTweetsGrabbing = List.extend({

    item_class: 'item',

    initialize: function(options) {
      logger.info('initialize ListTweetsGrabbing');
      var options = options || {},
          self = this;

      // options.itemTemplate = ItemTweetsGrabbingTemplate;

      options.itemFactory = function (model, offset) {
        var params = {
          model: model,
          offset: offset
        };
        _.extend(params, this.itemOptions);
        return new LayoutStatusItem(params);
      };

      options.listItemFactory = function (model, offset) {
        var params = {
          model: model,
          offset: offset,
          view: this.itemFactory(model, offset)
        };
        _.extend(params, this.listItemOptions);

        return new ListItem(params);
      };

      List.prototype.initialize.call(this,options);

      this.collection.off();
      this.collection.on('load', function(){
        self.update(true);
        var container = document.querySelector('#container');
        var pckry;
        // initialize Packery after all images have loaded
        imagesLoaded( container, function() {
          var p=$('div.item-description p');
          var divh=$('div.item-description').height();
          while ($(p).outerHeight()>divh) {
              $(p).text(function (index, text) {
                  return text.replace(/\W*\s(\S)*$/, '...');
              });
          }
          pckry = new Packery( container, {
            // options
            itemSelector: '.item',
            gutter: ".gutter-sizer",
            rowHeight: 0
          });
        });
      });
    }
  });

  return ListTweetsGrabbing;
});
