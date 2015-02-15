(function() {
  'use strict';

  angular
    .module('ccFamTree')
    .factory('ccFamilyFcty', ccFamilyFcty);

	ccFamilyFcty.$inject = ['$resource'];

  /* @ngInject */
  function ccFamilyFcty($resource) {

  	var url = 'http://localhost:3000/families/:id';

    // public methods
    var factory = {
      resource: resource
    };

    return factory;

    // private functions
    function resource() {
      return $resource(url, null, {
        'update': { method: 'PUT' }
      });
    }

  }

})();


