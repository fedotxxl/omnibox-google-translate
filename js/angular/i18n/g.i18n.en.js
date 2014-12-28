angular.module('app').
    config(function ($translateProvider, _langs) {
        var en = {
            lang: _langs.en,
            omni: {
                settings: {
                    saved: "Saved",
                    menu: {
                        main: 'Main',
                        advanced: 'Other',
                        rateIt: 'Rate it'
                    },
                    main: {
                        label: 'Main settings',
                        text: "Default languages pair",
                        orderNote: "<strong>Note</strong>: ordering is important! To use opposite languages order begin your request with ! (e.g. <code>!привет мир</code>)</strong>"
                    },
                    advanced: {
                        label: "Additional languages pairs",
                        text: "To use additional languages pairs begin your request with appropriate prefix + space (e.g. <code>en-de hello world</code>)",
                        placeholder: "Prefix"
                    },
                    buttons: {
                        save: "Save"
                    },
                    otherPlugins: {
                        label: "Our other plugins",
                        hashMem: {
                            link: "hashMem.com",
                            text: "handy and quick access to your bookmarks from Omnibox <br> ★ Optimized for keyboard control<br> ★ 3-5 seconds to open bookmark<br> ★ Cloud synchronization for free"
                        },
                        yaDictionary: {
                            link: "Omnibox Yandex Dictionaries",
                            text: "access Yandex Dictionaries from Omnibox.<br>★ Quick way to translate words from/into Russian"
                        }
                    },
                    share: {
                        label: "Tell about us",
                        text: "Do you like this plugin? Please spread the word =)",
                        chrome: {
                            message: "Simple plugin for Chrome's Omnibox to translate text with Google Translate"
                        },
                        opera: {
                            message: "Simple plugin for Opera's Omnibox to translate text with Google Translate"
                        }
                    }
                }
            }
        };

        $translateProvider.translations('en', en);
    });