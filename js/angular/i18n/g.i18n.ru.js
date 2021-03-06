angular.module('app').
    config(function ($translateProvider, _langs) {
        var ru = {
            lang: _langs.ru,
            omni: {
                settings: {
                    saved: "Сохранено",
                    menu: {
                        main: 'Основные',
                        advanced: 'Дополнительные',
                        rateIt: 'Оценить'
                    },
                    main: {
                        label: 'Основные настройки',
                        text: "Укажите пару языков по-умолчанию",
                        orderNote: "<strong>Замечание</strong>: порядок языков важен! Чтобы перевести текст, используя обратный порядок языков, ваш запрос должен начинаться с ! (например, <code>!привет мир</code>)</strong>"
                    },
                    advanced: {
                        label: "Дополнительные пары языков",
                        text: "Чтобы использовать одную из дополнительных комбинаций, ваш запрос должен начинаться с соответствующего прификса (например, <code>ru-de привет мир</code>)",
                        placeholder: "Префикс"
                    },
                    buttons: {
                        save: "Сохранить"
                    },
                    otherPlugins: {
                        label: "Другие наши плагины",
                        hashMem: {
                            link: "hashMem.com",
                            text: "удобный доступ к вашим закладкам / заметкам прямо из Omnibox <br> ★ Оптимизировано под клавиатуру<br> ★ Открытие закладки за 3-5 секунд<br> ★ Бесплатная синхронизация с hashMem.com"
                        },
                        yaDictionary: {
                            link: "Omnibox Яндекс Словари",
                            text: "доступ к Яндекс Словарям из Omnibox.<br>★ переводит слова \"на лету\"<br>★ Избавляет от необходимости каждый раз заходить на сайт."
                        }
                    },
                    share: {
                        label: "Расскажите о нас",
                        text: "Вам нравится данный плагин? Расскажите о нас =)",
                        chrome: {
                            message: "Удобный плагин для Chrome, который позволяет быстро переводить текст при помощи Google Translate"
                        },
                        opera: {
                            message: "Удобный плагин для Opera, который позволяет быстро переводить текст при помощи Google Translate"
                        }
                    }
                }
            }
        };

        $translateProvider.translations('ru', ru);
    });
