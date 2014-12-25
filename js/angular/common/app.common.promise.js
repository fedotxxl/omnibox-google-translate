angular.module('common').
    factory("_promise", function($q) {
        var wrap = function() {
            var deferred = $q.defer();
            deferred.resolve.apply(this, arguments);
            return deferred.promise;
        };

        var EMPTY_STUB = function() {
            return wrap();
        };

        return {
            wrap: wrap,
            EMPTY_STUB: EMPTY_STUB
        }
    });