angular.module('app').
    factory('_g',function (_langs, _lang) {
        var langs = _.map(_langs[_lang], function(value, key) {
            return key;
        });

        var getTranslationUrl = function(from, to, text) {
            return "https://translate.google.com/#" + from + "|" + to + "|" + text
        };

        var getLangs = function() {
            return langs;
        };

        return {
            getLangs: getLangs,
            getTranslationUrl: getTranslationUrl
        }
    }).
    run(function(_chromeCommonService, _g) {
        _chromeCommonService.add('_g', _g);
    });