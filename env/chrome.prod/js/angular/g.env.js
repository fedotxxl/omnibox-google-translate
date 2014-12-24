angular.module('common').
    value("_logDebug", false).
    value("_testExceptionHandler", false).
    value("_qbaka", true).
    constant('_browser', 'chrome').
    factory('_privateRouter', function() {
        return {
            rateItUrl: "https://chrome.google.com/webstore/detail/cekkckdbbkdmpfbfjpohidmenfccifif/reviews?utm_source=chrome-ntp-icon",
            shareUrl: "http://bit.ly/1xeHKGA",
            hashMemPluginUrl: "https://chrome.google.com/webstore/detail/nmkgaalbomjiafnenbknaoeilejnhnce"
        }
    });