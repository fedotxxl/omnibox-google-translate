(function() {
    //http://stackoverflow.com/questions/16286605/initialize-angularjs-service-with-asynchronous-data
    var appContainer = document.createElement('div');

    angular.module('bootstrap', ['common']).
        factory('_bootstrapper', function(_bootstrapData, $timeout, $q) {
            return {
                bootstrap: function() {
                    var getBackgroundData = function() {
                        return $q(function(resolve) {
                            var common = chrome.extension.getBackgroundPage().common || null;
                            if (common) {
                                var settings = common._settings;
                                var g = common._g;
                                if (settings && g) {
                                    _bootstrapData._settings = settings;
                                    _bootstrapData._g = g;
                                    resolve();
                                } else {
                                    $timeout(getBackgroundData, 100);
                                }
                            }
                        });
                    };

                    return getBackgroundData();
                }
            }
        }).
        run(function(_bootstrapper) {
            _bootstrapper.bootstrap().then(function() {
                angular.bootstrap(document, ['app']);
                appContainer.remove();
            });
        });

    angular.element(document).ready(function() {
        angular.bootstrap(appContainer, ['bootstrap']);
    });
}());

angular.module('app', ['common', 'ui.select2']).
    factory('_settings', function (_bootstrapData) {
        return _bootstrapData._settings;
    }).
    factory('_g', function (_bootstrapData) {
        return _bootstrapData._g;
    }).
    controller('SettingsBaseController', function($scope, _browser, _settings, _privateRouter, _i18n, _g) {
        //icons - http://findicons.com/pack/282/flags
        var browser = (_browser == 'opera') ? 'opera' : 'chrome';

        $scope.rateItUrl = _privateRouter.rateItUrl;
        $scope.shareUrl = _privateRouter.shareUrl;
        $scope.hashMemPluginUrl = _privateRouter.hashMemPluginUrl;
        $scope.shareMessage = _i18n('omni.settings.share.' + browser + '.message');

        var format = function(state) {
            return state.text;
        };

        $scope.select2Options = {
            width: '200px',
            formatResult: format,
            formatSelection: format,
            escapeMarkup: function(m) { return m; }
        };

        $scope.getSettings = function() {
            return $.extend(true, {}, {
                default: {},
                pairs: []
            }, _settings.get());
        };

        $scope.langs = _.map(_g.getLangs(), function(lang) {
            return {
                id: lang,
                text: _i18n('lang.' + lang)
            }
        });

        $scope.getSavedLabel = function() {
            var d = new Date();
            var label = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

            return label;
        }
    }).
    controller('SettingsMainController', function($scope, _settings) {
        var loadState = function() {
            $scope.default = $scope.getSettings().default;
        };

        $scope.isStateChanged = function() {
            var saved = _settings.get().default || {};
            var current = $scope.default;

            return saved.from != current.from || saved.to != current.to;
        };

        $scope.save = function() {
            var d = {
                from: $scope.default.from,
                to: $scope.default.to
            };

            _settings.set($.extend({}, _settings.get(), {default: d}));
            loadState();

            $scope.saved = $scope.getSavedLabel();
        };

        loadState();
    }).
    controller('SettingsAdvancedController',function ($scope, _settings) {
        var changed = false;

        $scope.pairs = $scope.getSettings().pairs;
        $scope.$watch('pairs', function(c, p) {
                changed = true;
        }, true);

        $scope.addPair = function() {
            $scope.pairs.push({});
        };

        $scope.removePair = function(pair) {
            $scope.pairs.remove(pair);
        };

        $scope.isStateChanged = function() {
            return changed;
        };

        $scope.save = function() {
            var pairs = _.map($scope.pairs, function(pair) {
                return {
                    prefix: (pair.prefix) ? pair.prefix.trim() : '',
                    from: pair.from,
                    to: pair.to
                }
            });

            _settings.set($.extend({}, _settings.get(), {pairs: pairs}));
            changed = false;

            $scope.saved = $scope.getSavedLabel();
        };
    });

$(document).ready(function () {
    //just copied it as is from http://roykolak.github.io/chrome-bootstrap/
    //minor changes

    var open = function (page) {
        var selected = 'selected';

        $('.mainview > *').removeClass(selected);
        $('.menu li').removeClass(selected);
        setTimeout(function () {
            $('.mainview > *:not(.selected)').css('display', 'none');
        }, 100);

        $('.menu a[href="' + page + '"]').parent().addClass(selected);

        var currentView = $(page);
        currentView.css('display', 'block');
        setTimeout(function () {
            currentView.addClass(selected);
        }, 0);
        setTimeout(function () {
            $('body')[0].scrollTop = 0;
        }, 200);
    };

    $(function () {
        $('.menu-selector').click(function (ev) {
            ev.preventDefault();
            open($(ev.currentTarget).attr('href'))
        });

        open((window.location.hash) ? window.location.hash : '#main')
    });
});