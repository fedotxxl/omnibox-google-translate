angular.module('common').
    value("_logDebug", false).
    value("_testExceptionHandler", false).
    value("_stackcare", true).
    constant('_browser', 'chrome').
    factory('_privateRouter', function() {
        return {
            rateItUrl: "https://chrome.google.com/webstore/detail/cfmkdfaolkbgplikiheobklldmdccofo/reviews?utm_source=chrome-ntp-icon",
            shareUrl: "http://bit.ly/1JS9dl1",
            hashMemPluginUrl: "https://chrome.google.com/webstore/detail/nmkgaalbomjiafnenbknaoeilejnhnce",
            yaDictionaryPluginUrl: "https://chrome.google.com/webstore/detail/cekkckdbbkdmpfbfjpohidmenfccifif"
        }
    });