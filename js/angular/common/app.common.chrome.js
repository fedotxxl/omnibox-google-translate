angular.module('common').
    factory('_chrome', function() {
        var displayMessage = function(message, isError) {
            //custom chrome page
            // Create a simple text notification:
            var notificationId = Date.now().toString();
            var duration = (isError) ? 7000 : 5500;
            var hide = function() {
                setTimeout(function () {
                    chrome.notifications.clear(notificationId, function() {});
                }, duration);
            };

            chrome.notifications.create(notificationId, {
                type: "basic",
                title: "hashMem.com",
                message: message,
                iconUrl: (isError) ? "/img/logo_chrome_error80.png" : "/img/logo_chrome_inverted80.png"
            }, hide);
        };

        var messageError = function(message) {
            displayMessage(message, true)
        };

        var openSettingsPage = function(anchor) {
            var options_url = chrome.extension.getURL('/settings.html');

            if (anchor) options_url = options_url + "#" + anchor;

            chrome.tabs.query({
                url: options_url
            }, function(results) {
                if (results.length)
                    chrome.tabs.update(results[0].id, {active:true});
                else
                    chrome.tabs.create({url:options_url});
            })
        };

        var openTab = function(url) {
            chrome.tabs.getSelected(function(tab) {
                if (tab && tab.url == "chrome://newtab/") {
                    chrome.tabs.update(tab.id, {url: url});
                } else {
                    chrome.tabs.create({url: url});
                }
            });
        };

        return {
            message: displayMessage,
            messageError: messageError,
            openTab: openTab,
            openSettingsPage: openSettingsPage
        }
    }).
    factory('_chromeCommonService', function() {
        window.common = window.common || {};

        return {
            add: function(property, value) {
                common[property] = value;
            }
        }
    }).
    factory('_chromeStorage', function($q) {
        return {
            get: function(selector) {
                return $q(function(resolve, reject) {
                    chrome.storage.sync.get(selector, resolve);
                });
            },
            set: function(items) {
                return $q(function(resolve, reject) {
                    chrome.storage.sync.set(items, resolve);
                });
            }
        }
    });