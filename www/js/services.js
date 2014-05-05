angular.module('cards-app.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Cards', function() {

  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var cards = [
    { id: 0, title: 'blank', imgUrl: ''},
    { id: 1, title: 'VanillaIce', imgUrl: 'http://nicenicejpg.com/170/260'},
    { id: 2, title: 'lorem pixel', imgUrl: 'http://lorempixel.com/170/260'},
    { id: 3, title: 'lorem pixel 2', imgUrl: 'http://lorempixel.com/170/260'},
    { id: 4, title: 'fill murray', imgUrl: 'http://fillmurray.com/170/260'},
    { id: 5, title: 'place cage', imgUrl: 'http://placecage.com/170/260'},
    { id: 6, title: 'place kitten', imgUrl: 'http://placekitten.com/170/260'},
    { id: 7, title: 'bacon ipsum', imgUrl: 'http://baconmockup.com/170/260/random'},
    { id: 8, title: 'Steven SeGALLERY', imgUrl: 'http://stevensegallery.com/170/260'},
    { id: 2, title: 'lorem pixel 3', imgUrl: 'http://lorempixel.com/170/260'},
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
});
