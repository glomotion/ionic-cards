// Ionic cards-app App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'cards-app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('cards-app', ['ionic', 'cards-app.directives', 'cards-app.controllers', 'cards-app.services'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        })
    })

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js

        $stateProvider
            
            // Entry State
            .state('entry', {
                url: '/',
                templateUrl: 'templates/entry.html',
                controller: 'EntryController'
            })

            // setup an abstract state for the tabs directive
            // anything used in all pages should go here:
            .state('app', {
                url: "/app",
                templateUrl: "templates/app.html"
            })

            // a simple about page
            .state('app.about', {
                url: '/about',
                views: {
                    'app-about': {
                        templateUrl: 'templates/about.html',
                        controller: 'AboutController'
                    }
                }
            })

            // Each tab has its own nav history stack:
            .state('app.cards', {
                url: '/cards',
                views: {
                    'app-cards': {
                        templateUrl: 'templates/cards.html',
                        controller: 'CardsController'
                    }
                }
            })

            .state('app.card-detail', {
                url: '/cards/:cardId',
                views: {
                    'app-cards': {
                        templateUrl: 'templates/card.html',
                        controller: 'CardController'
                    }
                }
            })

            

        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');

    })

;


angular.module('cards-app.controllers', [])
    
    .controller('EntryController', function($scope) {

    })

    .controller('CardsController', function($scope, Cards) {
        
        $scope.cards = Cards.all();

        $scope.$on('ngRepeatFinished', function() {
            
            //  @TODO:
            //  these should really be called as directives, but for now 
            //  we're just innit'ing the damn things as soon as the dom is ready...
            
            $('.stacker-cntnr article').stacker(); 
            var pulldown = new PullDown($('.app-container'), $('#pull-down-area'));

        });

    })
    
    .controller('CardController', function($scope, $stateParams, Cards) {
        $scope.card = Cards.get($stateParams.cardId);
    })

    .controller('AboutController', function($scope) {

    })
;




angular.module('cards-app.directives', [])

    .directive('stacker', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {  
                // console.log($(element).find('article')); 
                // $($(element).find('article')).stacker(); 
            }
        }
    })

    .directive('pulldown', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) { 
                // var pulldown = new PullDown($(element).find('.app-container'), $(element).find('#pull-down-area'));
            }   
        };
    })

    .directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    })

;



