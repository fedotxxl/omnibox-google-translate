angular.module('common').
    factory('_i18nPlatformPostfix', function() {
        if (window.Modernizr && window.Modernizr.touch) {
            return "touch"
        } else if (/Mac/.test(navigator.platform)) {
            return "mac"
        } else {
            return "other"
        }
    }).
    factory('_i18n', function ($translate, _i18nPlatformPostfix) {

        var get = function(prefix) {
            var obj = function(id, interpolateParams, interpolationId) {
                return $translate.instant((this.prefix) ? (this.prefix) + id : id, interpolateParams, interpolationId);
            };

            obj.with = function(prefix) {
                return get(prefix);
            };

            obj.platform = function(prefix) {
                return obj(prefix + "." + _i18nPlatformPostfix);
            };

            obj.prefix = prefix;

            return obj;
        };

        return get();
    });
