// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.directives', 'starter.controllers'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        })
    })
;


angular.module('starter.controllers', [])
    .controller('HomeController', function($scope) {
        
        $scope.cards = [
            {title: 'blank', imgUrl: ''},
            {title: 'VanillaIce', imgUrl: 'http://nicenicejpg.com/170/260'},
            {title: 'lorem pixel', imgUrl: 'http://lorempixel.com/170/260'},
            {title: 'lorem pixel 2', imgUrl: 'http://lorempixel.com/170/260'},
            {title: 'fill murray', imgUrl: 'http://fillmurray.com/170/260'},
            {title: 'place cage', imgUrl: 'http://placecage.com/170/260'},
            {title: 'place kitten', imgUrl: 'http://placekitten.com/170/260'},
            {title: 'bacon ipsum', imgUrl: 'http://baconmockup.com/170/260/random'},
            {title: 'Steven SeGALLERY    ', imgUrl: 'http://stevensegallery.com/170/260'}
        ];

        $scope.$on('ngRepeatFinished', function() {
            
            //  @TODO:
            //  these should really be called as directives, but for now 
            //  we're just innit'ing the damn things as soon as the dom is ready...
            
            $('.stacker-cntnr article').stacker(); 
            var pulldown = new PullDown($('.app-container'), $('#pull-down-area'));

        });

    })
;




angular.module('starter.directives', [])

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



