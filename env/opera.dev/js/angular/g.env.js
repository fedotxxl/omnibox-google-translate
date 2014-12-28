angular.module('common').
    value("_logDebug", true).
    value("_testExceptionHandler", false).
    value("_qbaka", false).
    constant('_browser', 'opera').
    factory('_privateRouter', function() {
        return {
            rateItUrl: "https://addons.opera.com/extensions/details/omnibox-google-translate/",
            shareUrl: "http://bit.ly/1AXVlS3",
            hashMemPluginUrl: "https://addons.opera.com/extensions/details/hashmemcom-zakladki-zametki-v-omnibox/",
            yaDictionaryPluginUrl: ""
        }
    });