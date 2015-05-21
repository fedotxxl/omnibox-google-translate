//http://stackoverflow.com/questions/298745/how-do-i-send-a-cross-domain-post-request-via-javascript
//http://beacon.errorception.com/524e9888c56fccc364000376.js
(function (window) {
    if (window.stackcare && window.stackcare.a && stackcare.a.shift) {
        var stackCareInject = window.stackCareInject || {};
        stackCareInject.onSend = stackCareInject.onSend || stub;

        //UTILS
        function generateUIDForError() {
            //http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
            return (new Date().getTime()) + "_" + (Math.random() * Math.pow(36, 5) << 0).toString(36)
        }

        function stub() {

        }

        function createCookie(name, value, seconds) {
            var expires;

            if (seconds) {
                var date = new Date();
                date.setTime(date.getTime() + (seconds * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }

            document.cookie = name + "=" + value + expires + "; path=/";
        }

        function getCookie(c_name) {
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    return document.cookie.substring(c_start, c_end);
                }
            }
            return "";
        }

        function deleteCookie(name) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }

        var iterateObject = function (obj, callback) {
            for (var prop in obj) obj.hasOwnProperty(prop) && callback(prop, obj[prop])
        }, iterateArray = function (array, callback) {
            for (var i = 0; i < array.length; i++) callback(array[i], i);
        }, addPropertyToObjectIfPropertyIsTruthy = function (obj) {
            return function (prop, value) {
                value && (obj[prop] = value)
            }
        }, stringify = (function () {
            // http://www.sitepoint.com/javascript-json-serialization/
            return JSON.stringify || function (obj, level) {
                    level = level || 0;

                    var t = typeof (obj);
                    if (t != "object" || obj === null) {
                        // simple data type
                        if (t == "string") obj = '"' + obj + '"';
                        return String(obj);

                    } else {
                        // recurse array or object
                        var n, v, json = [], arr = (obj && obj.constructor == Array);

                        for (n in obj) {
                            v = obj[n];
                            t = typeof(v);

                            if (t == "string") v = '"' + v + '"';
                            else if (t == "object" && v !== null && level < 20) v = stringify(v, level++);

                            json.push((arr ? "" : '"' + n + '":') + String(v));
                        }

                        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
                    }
                };
        })(), stringifyAndTrigger = function (obj, level) {
            var answer = stringify(obj, level);
            stackCareInject.onSend(answer);
            return answer;
        };


        //UTILS END

        var token = stackcare.token;
        var release = stackcare.release;
        var isHttps = "https:" == location.protocol,
            processViews = false,
            xhrEnabled = true,
            url = "http" + (isHttps ? "s" : "") + "://stackcare.com/consumer",
            urlXhr = url + "/xhr",
            urlForm = url + "/form",
            array = [],
            COOKIE_NAME = "js-errors",
            slice = Array.prototype.slice,
            userAgent = navigator.userAgent,
            timeoutId,
            message,
            postDataByXhr = function (data, callback) {
                var xmlHttpRequest;
                window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest ? (xmlHttpRequest = new XMLHttpRequest, xmlHttpRequest.open("post", urlXhr, !0)) : window.XDomainRequest && (xmlHttpRequest = new XDomainRequest, xmlHttpRequest.open("post", urlXhr));
                if (xmlHttpRequest && window.JSON && xhrEnabled) {

                    if (data.uid) {
                        //save it to cookie
                    }

                    xmlHttpRequest.onload = function () {
                        callback && 200 == xmlHttpRequest.status && parseInt(xmlHttpRequest.responseText) && callback(xmlHttpRequest.responseText)
                    };

                    //XDomainRequest doesn't support XDomainRequest
                    if (xmlHttpRequest.setRequestHeader) xmlHttpRequest.setRequestHeader("Content-Type", "text/plain");

                    xmlHttpRequest.send(stringifyAndTrigger(data));

                    return true;
                } else {
                    return false;
                }
            }, postDataByForm = function (data) {
                // Add the iframe with a unique name
                var iframe = document.createElement("iframe");
                var uniqueString = "stackcare_com_" + new Date().getMilliseconds();
                document.body.appendChild(iframe);
                iframe.style.display = "none";
                iframe.contentWindow.name = uniqueString;

                // construct a form with hidden inputs, targeting the iframe
                var form = document.createElement("form");
                form.target = uniqueString;
                form.action = urlForm;
                form.method = "POST";

                // repeat for each parameter
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = "data";
                input.value = stringifyAndTrigger(data);
                form.appendChild(input);

                document.body.appendChild(form);
                form.submit();

                setTimeout(function () {
                    iframe.parentNode.removeChild(iframe);
                    form.parentNode.removeChild(form);
                }, 1500);
            }, doSendData = function (data, callback) {
                postDataByXhr(data, callback) || postDataByForm(data);
            }, getStringNumberBooleanMetaData = function () {
                if (stackcare.meta) {
                    var answer;
                    iterateObject(stackcare.meta, function (prop, value) {
                        /string|number|boolean/.test(typeof value) && (answer = answer || {}, answer[prop] = value)
                    });
                    return answer;
                }
            }, getViewPort = function (m) {
                var vp = m.vp || {};

                return {
                    width: vp.w,
                    height: vp.h
                }
            }, getWhen = function (m) {
                return (m.l) ? "after" : "before";
            }, getDate = function (m) {
                var date = m.dt;

                if (date && date.getTime) {
                    return date.getTime();
                } else {
                    return 0;
                }
            }, getDataToSend = function () {
                for (var answer = [], current; current = array.shift();) {
                    current.token = token;
                    current.release = release;

                    answer.push(current);
                    if (array.length && "2" == current.method) {
                        var b = array.shift();
                        "2" != current.method || "2" === b.method || -1 == b.message.indexOf(current.message) && -1 == current.message.indexOf(b.message) ? array.unshift(b) : !current.line && b.line && (current.line = b.line)
                    }
                    current.view || current.message || current.stack || answer.pop()
                }
                return answer
            }, doNotProcessMessage = function (message) {
                if (message.view) {
                    return !processViews;
                } else {
                    return "Error loading script" == message.message && /Firefox/.test(userAgent) || !message.message /*|| 0 == message.line || message.file && 0 === message.file.split("#")[0].indexOf(location.href.split("#")[0]) && 1 == message.line*/ || "script error." == message.message.toLowerCase() || /originalCreateNotification/.test(message.message) || /atomicFindClose/.test(message.message) /*|| /jid1\-ejhbjdxm9zr4tq/.test(message.file)*/ || "miscellaneous_bindings" == message.file
                }
            }, processMessage = function (m) {
                var arguments = m.e;
                var data = m.d;

                timeoutId && clearTimeout(timeoutId);
                try {
                    var message;
                    if (arguments) {
                        var b;

                        if (arguments.view) {
                            b = {
                                view: 1
                            };

                            iterateObject({
                                continued: getCookie(COOKIE_NAME)
                            }, addPropertyToObjectIfPropertyIsTruthy(b))
                        } else if (arguments.m) {
                            b = {
                                message: arguments.m,
                                file: arguments.u,
                                line: arguments.l,
                                uid: generateUIDForError(),
                                method: "0"
                            }
                        } else if (arguments.length) {
                            b = {
                                message: arguments[0],
                                file: arguments[1],
                                line: arguments[2],
                                uid: generateUIDForError(),
                                method: "1"
                            };
                            iterateObject({
                                column: arguments[3],
                                stack: arguments[4] && arguments[4].stack ? arguments[4].stack : arguments.stacktrace || arguments.stack,
                                number: arguments.number
                            }, addPropertyToObjectIfPropertyIsTruthy(b))
                        } else if (arguments instanceof Error) {
                            b = {
                                message: arguments.name + ": " + arguments.message,
                                method: "2",
                                uid: generateUIDForError()
                            };
                            iterateObject({
                                file: arguments.fileName || arguments.sourceURL,
                                line: arguments.line || arguments.lineNumber,
                                column: arguments.columnNumber,
                                stack: arguments.stacktrace || arguments.stack,
                                number: arguments.number
                            }, addPropertyToObjectIfPropertyIsTruthy(b));
                        }

                        message = b
                    } else {
                        message = void 0; //just returns undefined
                    }

                    if (!message) return;

                    message.date = getDate(m);
                    message.when = getWhen(m);
                    message.url = location.href;
                    message.viewPort = getViewPort(m);
                    var meta = getStringNumberBooleanMetaData();

                    if (meta) message.meta = meta;
                    if (data) message.data = data;

                    if (!doNotProcessMessage(message)) {
                        array.push(message)
                    }
                } catch (h) {
                }
                timeoutId = setTimeout(collectAndSendData, 200)
            }, collectAndSendData = function () {
                try {
                    var data = getDataToSend();
                    data.length && doSendData(data, function (processedErrorsByServer) {
                        !stackcare.silent && window.console && console.log && console.log("Posted " + processedErrorsByServer + " error" + (1 == processedErrorsByServer ? "" : "s") + " to stackcare.com")
                    })
                } catch (c) {
                }
            };

        (function processAlreadyCollectedExceptions() {
            for (; message = stackcare.a.shift();) {
                processMessage(message);
            }
        }());

        (function reconstructErrsObject() {
            var meta = stackcare.meta;
            var isSilent = stackcare.silent;

            stackcare.a = {
                push: processMessage
            };

            if (meta) stackcare.meta = meta;
            if (isSilent) stackcare.silent = isSilent;
        }());
    }
})(window);