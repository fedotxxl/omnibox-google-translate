angular.module('common').
    factory('$exceptionHandler', function($injector, $log, _stackcare) {
        //handle angular exception
        return function(exception, cause) {
            //qkaba
            if (_stackcare && window.stackcare && window.stackcare.report) window.stackcare.report(exception);

            //console log
            $log.error.apply($log, arguments);
        };
    });