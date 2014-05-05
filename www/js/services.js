angular.module('cards-app.services', [])

    /**
     * A simple example service that returns some data.
     */

    .factory('Cards', function() {

        // Might use a resource here that returns a JSON array

        // Some fake testing data
        //  @TODO: imgUrl neeeds to become two values, 
        //  one for thumb, one for fullsize...
        var cards = [
            { id: 0, title: 'blank', thumbUrl:'', imgUrl: ''},
            { id: 1, title: 'VanillaIce', thumbUrl: 'http://nicenicejpg.com/170/260', imgUrl: 'http://nicenicejpg.com/800/600'},
            { id: 2, title: 'lorem-pixel people', thumbUrl: 'http://lorempixel.com/170/260/people', imgUrl: 'http://lorempixel.com/800/600/people'},
            { id: 3, title: 'lorem-pixel nature', thumbUrl: 'http://lorempixel.com/170/260/nature', imgUrl: 'http://lorempixel.com/800/600/nature'},
            { id: 4, title: 'fill murray', thumbUrl: 'http://fillmurray.com/170/260', imgUrl: 'http://fillmurray.com/800/600'},
            { id: 5, title: 'place cage', thumbUrl: 'http://placecage.com/170/260', imgUrl: 'http://placecage.com/800/600'},
            { id: 6, title: 'place kitten', thumbUrl: 'http://placekitten.com/170/260', imgUrl: 'http://placekitten.com/800/600'},
            { id: 7, title: 'bacon ipsum', thumbUrl: 'http://baconmockup.com/170/260/random', imgUrl: 'http://baconmockup.com/800/600'},
            { id: 8, title: 'Steven SeGALLERY', thumbUrl: 'http://stevensegallery.com/170/260', imgUrl: 'http://stevensegallery.com/800/600'},
            { id: 9, title: 'lorem-pixel technics', thumbUrl: 'http://lorempixel.com/170/260/technics', imgUrl: 'http://lorempixel.com/800/600/technics'},
            { id: 10, title: 'lorem-pixel city', thumbUrl: 'http://lorempixel.com/170/260/city', imgUrl: 'http://lorempixel.com/800/600/city'},
        ];

        return {
            all: function() {
                return cards;
            },
            get: function(cardId) {
                // Simple index lookup
                return cards[cardId];
            }
        }

    })

;
