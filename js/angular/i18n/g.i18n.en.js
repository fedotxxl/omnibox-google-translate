angular.module('app').
    config(function ($translateProvider, _langs) {
        var en = {
            lang: _langs.en,
            omni: {
                suggest: {
                    syncNotes: 'Synchronize notes',
                    sendFeedback: 'Send feedback',
                    help: 'Help',
                    openSettings: 'Open settings',
                    checkOtherPlugins: 'Check other plugins',
                    openSite: 'Open site'
                },
                notification: {
                    invalidKey: 'This is not correct key. You can use numbers, English letters, -, _ and .',
                    created_keyContent: 'Created: {{key}}\nContent: {{content}}',
                    createdEmpty_key: 'Created: {{key}}\nContent: <empty>',
                    updated_keyContent: 'Updated: {{key}}\nContent: {{content}}',
                    deleted_key: 'Deleted: {{key}}',
                    notFound_key: 'Unable to find note with key "{{key}}"',
                    unknownCommand: 'Unknown command: {{command}}',
                    syncSuccess: 'Successfully synced notes',
                    syncSuccessWithErrors: "Failed to sync some notes: {{errors}}",
                    syncErrorKey: {
                        'key.invalid': 'Invalid key',
                        'content.too-large': 'Note size is too large'
                    },
                    syncFailure: {
                        credentials: "Failed to sync notes: incorrect login/password",
                        notFound: "Failed to sync notes: unable to connect to hashMem.com",
                        disabled: "Please enable synchronization in plugin settings, set email and password",
                        unknown: "Failed to sync notes: unknown problem"
                    }
                },
                settings: {
                    notification: {
                        syncSuccess: "Successfully synced notes",
                        loginSuccess: "Successfully logged in",
                        loginFailure: {
                            credentials: "Failed to authenticate: incorrect login/password",
                            notFound: "Failed to authenticate: unable to connect to hashMem.com",
                            unknown: "Failed to authenticate: unknown problem"
                        }
                    },
                    menu: {
                        sync: 'Sync',
                        help: 'Help',
                        feedback: 'Send feedback',
                        rateIt: 'Rate it'
                    },
                    sync: {
                        header: "Synchronization <small>settings</small>",
                        isEnabled: "Synchronize notes with hashMem.com",
                        register: "(register)",
                        username: "Your email address",
                        password: "Your password",
                        tryAuthenticate: "Check credentials",
                        changeUsernameButton: "Change username",
                        lastSuccess: "Last successful sync",
                        notSyncedDuringThisSession: "Never synced at this session",
                        save: "Save",
                        saved: "Saved!",
                        savedAndRemovedLocalNotes: "Saved. Your local notes were removed",
                        stateNotChanged: "All changes have been saved already",
                        stateChanged: "Click 'Save' to apply changes",
                        doSync: "Sync",
                        changeUsername: {
                            text: "If you change username your local notes will be synced with new account.<br>" +
                            "To prevent it click 'Unlink and remove local notes'",
                            unlink: "Unlink",
                            unlinkAndRemoveLocalNotes: "Unlink and remove local notes",
                            cancel: "Cancel"
                        }
                    },
                    help: {
                        header: "Help"
                    },
                    share: {
                        label: "Do you like this plugin? Please spread the word =)",
                        chrome: {
                            message: "Great plugin to manage your bookmarks in Chrome"
                        },
                        opera: {
                            message: "Great plugin to manage your bookmarks in Opera"
                        }
                    }
                }
            }
        };

        $translateProvider.translations('en', en);
    });
