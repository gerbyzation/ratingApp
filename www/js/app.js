// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
var app = angular.module('app', ['ionic', 'ngCordova', 'Ratings']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
});

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.new', {
    url: '/new',
    views: {
      'tab-new': {
        templateUrl: 'templates/tab-new.html',
        controller: 'NewCtrl'
      }
    }
  })

  .state('tab.list', {
    url: '/list',
    views: {
      'tab-list': {
        templateUrl: 'templates/tab-list.html',
        controller: 'ListCtrl'
      }
    }
  })
      .state('tab.list-detail', {
        url: '/list/:itemId', 
        views: {
          'tab-list': {
            templateUrl: 'templates/list-detail.html',
            controller: 'ListDetailCtrl'
          }
        }
      })

  .state('tab.rank', {
    url: '/rank',
    views: {
      'tab-rank': {
        templateUrl: 'templates/tab-rank.html',
        controller: 'RankCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/list');

  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.previousTitleText(true);
  $ionicConfigProvider.tabs.style('standard');

});
