angular.module('app', ['common']).
    factory('_omni',function (_settings, _g, _chrome, $rootScope) {
        var settings = null;

        var getPairForPrefix = function(prefix) {
            if (prefix) {
                return _.find(settings.pairs, function(pair) {
                    return pair.prefix == prefix;
                });
            } else {
                return settings.default;
            }
        };

        var reload = function() {
            settings = _settings.get();
        };

        var processCommand = function(text) {
            var pairAndRequest = getPairAndRequest(text);
            var pair = pairAndRequest.pair;
            var url = _g.getTranslationUrl(pair.from, pair.to, pairAndRequest.request);

            _chrome.openTab(url);
        };

        var getPairAndRequest = function(text) {
            text = (text) ? text.trim() : "";

            var pair = null;
            var request = null;
            var space = text.indexOf(" ");

            if (space > 0) {
                request = text.substring(space + 1);
                pair = getPairForPrefix(text.substring(0, space));
            }

            if (!pair) {
                request = text;
                pair = getPairForPrefix();
            }

            return {
                request: request,
                pair: pair
            }
        };

        $rootScope.$on('settings:changed', function() {
            reload();
        });

        reload();

        return {
            processCommand: processCommand
        }
    }).
    run(function (_omni, $timeout) {
        chrome.omnibox.onInputEntered.addListener(
            function (text) {
                $timeout(function() { //add angular context for promises
                    _omni.processCommand(text);
                }, 0);
            });
    });