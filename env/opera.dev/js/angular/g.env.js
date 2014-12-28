angular.module('common').
    value("_logDebug", true).
    value("_testExceptionHandler", false).
    value("_qbaka", false).
    constant('_browser', 'opera').
    factory('_privateRouter', function() {
        return {
            rateItUrl: "",
            shareUrl: "",
            hashMemPluginUrl: "https://addons.opera.com/extensions/details/hashmemcom-zakladki-zametki-v-omnibox/",
            yaDictionaryPluginUrl: ""
        }
    });