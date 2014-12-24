angular.module('common').
    factory('$exceptionHandler', function($injector, $log, _qbaka) {
        //handle angular exception
        return function(exception, cause) {
            //qkaba
            if (_qbaka && window.qbaka && window.qbaka.report) window.qbaka.report(exception);

            //console log
            $log.error.apply($log, arguments);
        };
    });