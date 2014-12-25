angular.module('common').
    factory('c_utils', function () {
        (function addStartsWith() {
            if (typeof String.prototype.startsWith != 'function') {
                // see below for better implementation!
                String.prototype.startsWith = function (str){
                    return this.indexOf(str) == 0;
                };
            }
        }());

        function parseQueryString(query) {
            var ret = {},
                seg = query.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        }

        function parseUrl(url) {
            // http://james.padolsey.com/javascript/parsing-urls-with-the-dom/
            // This function creates a new anchor element and uses location
            // properties (inherent) to get the desired URL data. Some String
            // operations are used (to normalize results across browsers).

            var a =  document.createElement('a');
            a.href = url;
            return {
                source: url,
                protocol: a.protocol.replace(':',''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: (function(){
                    return parseQueryString(a.search);
                })(),
                file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
                hash: a.hash.replace('#',''),
                path: a.pathname.replace(/^([^\/])/,'/$1'),
                relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
                segments: a.pathname.replace(/^\//,'').split('/')
            };
        }

        var LINKY_URL_REGEXP = /^((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s\.\;\,\(\)\{\}\<\>]$/
        var HTTP_REGEXP = new RegExp("^(http|https)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,6}(/\S*)?$");

        var isLink = function (text) {
            return text && LINKY_URL_REGEXP.test(text);
        };

        var isHttp = function (text) {
            return text && HTTP_REGEXP.test(text);
        };

        var isChromeUrl = function(text) {
            return text.startsWith("chrome://")
        };

        return {
            isLink: isLink,
            isHttp: isHttp,
            isChromeUrl: isChromeUrl,
            parseUrl: parseUrl
        }
    });