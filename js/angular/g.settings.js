angular.module("app").
    factory('_settings', function(_chromeStorage, _bootstrapData, $rootScope) {
        var settings = (_bootstrapData.settings && !_.isEmpty(_bootstrapData.settings)) ? _bootstrapData.settings : {
                default: {
                    from: 'auto',
                    to: 'auto'
                }
            };

        var defaults = {
            default: {},
            pairs: []
        };

        var get = function() {
            return settings;
        };

        var set = function(s) {
            settings = $.extend(true, {}, defaults, s);

            $rootScope.$emit('settings:changed', settings);

            return _chromeStorage.set({
                settings: settings
            });
        };

        return {
            get: get,
            set: set
        }
    }).
    run(function(_chromeCommonService, _settings) {
        _chromeCommonService.add('_settings', _settings);
    });