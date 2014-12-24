angular.module('app').
    constant("_lang", chrome.i18n.getMessage("lang")).
    config(function ($translateProvider, _lang) {
        $translateProvider.preferredLanguage(_lang);
    });
