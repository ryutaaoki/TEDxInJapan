define([
  'joshlib!utils/dollar',
  'joshlib!utils/woodman'
],
function(
  $,
  woodman
) {

  var logger = woodman.getLogger('views.baseView');

  return {
    isBottomShadowNeeded: function(cb) {
      cb(true);
    },
    isRightShadowNeeded: function(cb) {
      cb(false);
    },
    willRemoveChild: function() {
      this.off();
      if(this.collection) {
        this.collection.off();
        this.collection = null;
      }
      if(this.model) {
        this.model.off();
        this.model = null;
      }
      if(this.superCollection) {
        this.superCollection.off();
        this.superCollection = null;
        this.categories = null;
      }
    },
    catchLinkEvent: function () {

    }
  };
});