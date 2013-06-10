define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/cardpanel',

  'views/homepage/HomePagePanel',
  'views/conferences/ConferencesPagePanel',
  'views/discussions/DiscussionsPagePanel',
  'views/about/AboutPagePanel',
  'views/contact/ContactPagePanel',
  'views/ads/AdsPagePanel'
], function(
  woodman,
  $,
  _,
  Backbone,

  CardPanel,

  HomePagePanel,
  ConferencesPagePanel,
  DiscussionsPagePanel,
  AboutPagePanel,
  ContactPagePanel,
  AdsPagePanel
) {
  var logger = woodman.getLogger('views.AppPanelView');
  var AppPanel = CardPanel.extend({

    initialize: function(options) {
      logger.info('initialize AppPanelView');
      var options = options || {};

      //--------- Different Panel Creation

      this.homepage = new HomePagePanel({
        appController: options.appController
      });

      this.conferences = new ConferencesPagePanel({
        appController: options.appController
      });

      this.discussions = new DiscussionsPagePanel({
        appController: options.appController
      });

      this.about = new AboutPagePanel({
        appController: options.appController
      });

      this.contact = new ContactPagePanel({
        appController: options.appController
      });

      this.ads = new AdsPagePanel({
        appController: options.appController
      });
      //--------- END Different Panel Creation

      options.children = {
        homepage: this.homepage,
        conferences: this.conferences,
        discussions: this.discussions,
        about: this.about,
        contact: this.contact,
        ads: this.ads
      }
      CardPanel.prototype.initialize.call(this,options);
    }

  });

  return AppPanel;
});