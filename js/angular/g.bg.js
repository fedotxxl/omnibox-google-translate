angular.module('app', ['common']).
    factory('_omni',function (_settings, _g, _chrome, $rootScope, c_utils, _promise) {
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
            var urlPromise = _promise.EMPTY_STUB();
            var pairAndRequest = getPairAndRequest(text);
            var pair = pairAndRequest.pair;

            if (pairAndRequest.request == '.') {
                urlPromise = _chrome.getCurrentTabUrl().then(function(currentPageUrl) {
                    if (currentPageUrl && !c_utils.isChromeUrl(currentPageUrl)) {
                        return _g.getPageTranslationUrl(pair.from, pair.to, currentPageUrl);
                    }
                });
            }

            urlPromise.then(function(url) {
                if (!url) {
                    url = _g.getTranslationUrl(pair.from, pair.to, pairAndRequest.request);
                }

                _chrome.openTab(url);
            });
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