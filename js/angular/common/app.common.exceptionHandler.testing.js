angular.module('common').
    run(function (_testExceptionHandler) {
        if (_testExceptionHandler) {
            var nullFunction = null;

            nullFunction();
        }
    });