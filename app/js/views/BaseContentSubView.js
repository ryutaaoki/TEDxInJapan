define([
  'joshlib!utils/woodman',
  'views/BaseView',
  'joshlib!vendor/underscore',
  'joshlib!utils/dollar'
],
function(
  woodman,
  baseView,
  _,
  $
) {
  var logger = woodman.getLogger('views.baseContentSubView');

  /**
   * Returns the closest descendant of a jQuery set which matches a selector
   *
   * Use this instead of jQuery.find().first() when you don't want to match
   * a nested element
   *
   * The closest element is the one whose depth & position are the lowest
   * Example:
   * <div>
   *   <div>
   *     <span> 1 </span>
   *     <span> 2 </span>
   *   </div>
   *   <span> 3 </span>
   *   <span> 4 </span>
   * </div>
   *
   * closest_descendant(el, 'span') will return the 3rd span
   *
   * @function
   * @param {element|string|jQuery object} A DOM element, a jQuery set or a selector
   * @param {string} The selector used to filter the descendants
   * @return {jQuery object} the closest descendant (may be an empty jQuery object)
   */
  var closest_descendant = function($set, selector) {
    $set = $($set); // ensures we deal with a jQuery set
    var $found = $(); // empty set
    while ($set.length) {
      // search the current set
      $found = $set.filter(selector);
      // stop if one is found
      if ($found.length) break;
      // replace the current set by the children of all item in the set
      $set = $set.children();
    }
    return $found.first();
  };

  return _.extend(baseView, {
    // @param el : DOM object
    showLoader: function(el) {
      logger.info('Show the loader');
      closest_descendant(this.$el, '.js-jf-loadingpanel').remove();
      if(el) {
        $(el).append('<div class="js-jf-loadingpanel" />');
      } else {
        this.$el.append('<div class="js-jf-loadingpanel" />');
      }
    },

    hideLoader: function(el) {
      logger.info('Hide the loader');
      if(el) {
        closest_descendant($(el), '.js-jf-loadingpanel').animate({
          opacity: 0
        }, 400, 'linear', function() {
          $(this).remove();
          if(this.remove)
            this.remove();
        });
      } else {
        closest_descendant(this.$el, '.js-jf-loadingpanel').animate({
          opacity: 0
        }, 400, 'linear', function() {
          $(this).remove();
          if(this.remove)
            this.remove();
        });
      }
    },

    showError: function(message, el) {
      logger.info('Showing an error panel overlay');
      var html = '<div class="js-jf-errorpanel"><p>' + message + '</p></div>';

      closest_descendant(this.$el, '.js-jf-loadingpanel').remove();
      closest_descendant(this.$el, '.js-jf-errorpanel').remove();

      if(el) {
        $(el).append(html);
      } else {
        this.$el.append(html);
      }
    },

    hideError: function() {
      closest_descendant(this.$el, '.js-jf-errorpanel').remove();
    }
  });
});