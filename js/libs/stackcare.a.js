(function (window, document, token, release, collectDataOnError) {
    var loaded = false;

    window.stackcare = (function() {
        function report(exception) {
            var data = doCollectDataOnError();

            window.stackcare.a.push({
                e: exception,
                d: data,
                l: loaded,
                dt: new Date(),
                vp: {
                    w: window.innerWidth,
                    h: window.innerHeight
                }
            });
        }

        return {
            token: token,
            release: release,
            views: 0,
            a: [],
            report: report
        }
    }());

    var oldOnErrorCallback = window.onerror;

    window.onerror = function () {
        var a = arguments;

        window.stackcare.report(a);
        oldOnErrorCallback && oldOnErrorCallback.apply(this, a)
    };

    window.addEventListener ? window.addEventListener("load", onLoad, !1) : window.attachEvent("onload", onLoad);

    function doCollectDataOnError() {
        if (collectDataOnError) {
            try {
                return collectDataOnError();
            } catch (e) {
            }
        }

        return null;
    }

    function onLoad() {
        loaded = true;
    }
})(window, document, "omni.google-translate", "1.3");