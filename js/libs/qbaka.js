window.qbaka || function (e, t) {
    var n = [];
    var r = e.qbaka = function () {
        n.push(arguments)
    };
    e.__qbaka_eh = e.onerror;
    e.onerror = function () {
        r("onerror", arguments);
        if (e.__qbaka_eh)try {
            e.__qbaka_eh.apply(e, arguments)
        } catch (t) {
        }
    };
    e.onerror.qbaka = 1;
    r.sv = 2;
    r._ = n;
    r.log = function () {
        r("log", arguments)
    };
    r.report = function () {
        r("report", arguments, new Error)
    };
    r.key = (window.qbakaKey || "a2f5cfc96773a33922646e3a3be8630a");
}(window, document);
qbaka.options = {autoStacktrace: 1, trackEvents: 1};

//reporting.js
(function(){var M=window.qbaka;
    var K={};
    af(M,{report:aR,reportException:aR,log:function(){E({name:"log",target:Array.prototype.join.call(arguments," ")})
    }});
    if(!M.options){M.options={}
    }if(!M.key){var av="key";
        var n="qbaka";
        var Q=document.getElementById(n);
        if(Q){var at=Q.src.indexOf(av+"=");
            M.key=Q.src.substr(at+av.length+1)
        }}if(!M.key){ab("Qbaka key was not set up, no reports will be sent!");
        return
    }if(!/[a-f0-9]/.test(M.key)){ab("Invalid Qbaka key: '"+M.key+"', no reports will be sent!");
        return
    }M.custom=M.custom||{tags:[],params:{}};
    var aP=new Date().getTimezoneOffset()>60?"report":"ping";
    if(new Date().getTimezoneOffset()>60){aP="report"
    }else{if(document.location.protocol=="https:"||new Date().getTime()<1403931600000){aP="ping"
    }else{aP=["ping","report2"][parseInt(M.key[0],16)%2]
    }}var L=(!M.options.reportingUrl?(("https:"==document.location.protocol?"https://":"http://")+aP+".qbaka.net/"):M.options.reportingUrl)+M.key;
    var F=L+"/report";
    var v=L+"/ping";
    var an=0;
    var J=true;
    var ai=6;
    var ax="7c180b41";
    var q=2000;
    var l=128;
    var aj=64;
    var V=128;
    var aQ=256;
    var au=5000;
    var U=5;
    var d=1900;
    var s=20000;
    var aC=1500;
    var B={uninitialized:1,loading:1,interactive:2,complete:3};
    B[null]=null;
    var p=null;
    var aU=[];
    var aS=aq();
    var aK=5;
    var aG=["onerror","onload","onprogress","ontimeout"];
    var aL=window.JSON&&Z(JSON.stringify);
    var I={at:0};
    if(window.onerror&&!window.onerror.qbaka){window.__qbaka_eh=window.onerror
    }window.onerror=o;
    var c;
    try{c=navigator.userAgent.toLowerCase()
    }catch(X){c="MSIE 9.0"
    }var S=/msie/i.test(c);
    var b=/msie 8/i.test(c);
    var m=/chrome/i.test(c);
    var aa=/firefox/i.test(c);
    var G=/(android|ios|mobi|symbian|midp)/i.test(c);
    try{am()
    }catch(X){}function am(){if(M.options.trackEvents){aT(document.documentElement,"click",t);
        aT(document.documentElement,"submit",t)
    }if(M.options.autoTryCatch||M.options.autoStacktrace){O()
    }aT(window,"load",aA);
        an=aJ();
        if(window.__qbaka_reports&&__qbaka_reports.length>0){for(var aY=0;
                                                                 aY<__qbaka_reports.length;
                                                                 aY++){var aX=__qbaka_reports[aY];
            if(aX.splice){var e=aX[0][0];
                if(e instanceof Error){a(e)
                }else{D(e,aX[1])
                }}else{aS.push(W(y(aX[0],aX[1],aX[2])))
            }}}if(M._){for(var aY=0;
                           aY<M._.length;
                           aY++){ap(M._[aY])
        }M._.push=ap
        }an=0;
        T();
        setTimeout(aW,4000);
        aT(window,"load",aW)
    }var az;
    function aW(){if(!az){az=true;
        P({first:true},function(e){if(e.width==2){setInterval(A,s)
        }})
    }}function A(){P()
    }function P(e,aY){var aX=document.createElement("img");
        aX.src=v+(e?"?"+encodeURIComponent(i(e)):"");
        if(aY){aX.onload=function(){aY(aX);
            aX=null
        }
        }setTimeout(function(){aX&&aX.removeAttribute("src")
        },aC)
    }function ap(aZ){try{var aY=aZ[0];
        var aX=aZ[1];
        if(typeof aX=="undefined"||aX===null){return
        }if(aY=="onerror"){H(y.apply(this,aX))
        }else{if(aY=="report"){M.report.call(M,aX[0],aX[1],aZ[2])
        }else{if(aY=="log"){M.log.apply(M,aX)
        }else{if(aY=="tag"){if(M.custom.tags){M.custom.tags.push(aX)
        }else{(M.custom.tags=[aX])
        }}else{if(aY=="param"){if(!M.custom.params){M.custom.params={}
        }M.custom.params[aZ[1]]=aZ[2]
        }}}}}}catch(a0){}}function aH(aY,a0){try{if(!aY||typeof(aY)=="undefined"){return aY
    }if(typeof(aY)=="string"){aY=new Function(aY)
    }if(!aE(aY)){return aY
    }if(aY.$afe){return aY.$afe
    }var aX=function aX(){try{return aY.apply(this,arguments)
    }catch(a2){if(a0){try{a0.call(this,event,a2)
    }catch(a1){}}if(aN(a2)){a2={message:a2}
    }else{if(a2 instanceof Error){if(a(a2)){ak(a2)
    }}else{ab("Unknown exception type thrown by user code: "+a2)
    }}ab("Rethrowing exception, following exception IS NOT QBAKA ERROR");
        throw a2
    }};
        aY.$afe=aX;
        aX.$afe=aX;
        return aX
    }catch(aZ){return aY
    }}function ak(aX){f("Exception in callback occurred, sent to qbaka servers");
        ab(aX)
    }function aF(aX,e){aX[e]=aH(aX[e])
    }function R(aX,e){t(aX);
        if(aU.length>0){aU[aU.length-1].exception=e
        }}function w(aX){var aY=aX.addEventListener;
        var e=aX.removeEventListener;
        if(M.options.trackEvents){aX.addEventListener=function(a0,aZ,a1){e.apply(this,arguments);
            return aY.call(this,a0,aH(aZ,R),a1)
        }
        }else{aX.addEventListener=function(a0,aZ,a1){e.apply(this,arguments);
            return aY.call(this,a0,aH(aZ),a1)
        }
        }aX.removeEventListener=function(a0,aZ,a1){e.apply(this,arguments);
            return e.call(this,a0,aH(aZ),a1)
        }
    }function ar(){var aY=XMLHttpRequest.prototype;
        var aX=aY.send;
        var e=aY.open;
        if(aY.addEventListener){w(aY)
        }aY.open=function(){this.$url=arguments[1];
            return e.apply(this,arguments)
        };
        aY.send=function(){var a0=this;
            function aZ(){try{a0.onreadystatechange=aH(a0.onreadystatechange,R);
                for(var a2=0;
                    a2<aG.length;
                    a2++){aF(a0,aG[a2])
                }}catch(a1){}}aZ();
            setTimeout(aZ,1);
            return aX.apply(this,arguments)
        }
    }function ao(){var e=window.setTimeout;
        window.setTimeout=function(aY){arguments[0]=aH(aY);
            return e.apply(this,arguments)
        };
        var aX=window.setInterval;
        window.setInterval=function(aY){arguments[0]=aH(aY);
            return aX.apply(this,arguments)
        }
    }function z(){var e=String.prototype.replace;
        String.prototype.replace=function aX(a0,aZ,aY){if(aE(aZ)){return e.call(this,a0,aH(aZ),aY)
        }else{return e.apply(this,arguments)
        }}
    }function ae(){return typeof(new Error().stack)=="string"
    }function O(){if(!ae()){return
    }ao();
        if(document.addEventListener){w(document);
            w(window);
            w(Element.prototype);
            if(Z(HTMLButtonElement.prototype.addEventListener)){var e=["HTMLAnchorElement","HTMLAppletElement","HTMLAreaElement","HTMLBaseElement","HTMLBaseFontElement","HTMLBlockquoteElement","HTMLBodyElement","HTMLBRElement","HTMLButtonElement","HTMLDirectoryElement","HTMLDivElement","HTMLDListElement","HTMLFieldSetElement","HTMLFontElement","HTMLFormElement","HTMLFrameElement","HTMLFrameSetElement","HTMLHeadElement","HTMLHeadingElement","HTMLHRElement","HTMLHtmlElement","HTMLIFrameElement","HTMLImageElement","HTMLInputElement","HTMLIsIndexElement","HTMLLabelElement","HTMLLayerElement","HTMLLegendElement","HTMLLIElement","HTMLLinkElement","HTMLMapElement","HTMLMenuElement","HTMLMetaElement","HTMLModElement","HTMLObjectElement","HTMLOListElement","HTMLOptGroupElement","HTMLOptionElement","HTMLParagraphElement","HTMLParamElement","HTMLPreElement","HTMLQuoteElement","HTMLScriptElement","HTMLSelectElement","HTMLStyleElement","HTMLTableCaptionElement","HTMLTableCellElement","HTMLTableColElement","HTMLTableElement","HTMLTableRowElement","HTMLTableSectionElement","HTMLTextAreaElement","HTMLTitleElement","HTMLUListElement"];
                for(var aY=0;
                    aY<e.length;
                    aY++){var aX=e[aY];
                    var aZ=window[aX]&&window[aX].prototype;
                    if(aZ){w(aZ)
                    }}}}if(typeof XMLHttpRequest!="undefined"){ar()
        }}function C(aX){var e=document.location.origin;
        if(aX.indexOf(e)==0){aX=aX.substring(e.length)
        }if(aX.length>aQ){aX=aX.substring(0,aQ)+"..."
        }return aX
    }function ay(aZ){if(aZ==null){return null
    }if(aZ===document){return"document"
    }if(aZ===window){return"window"
    }var e=aZ.nodeName.toLowerCase();
        var aY;
        if(aY=aD(aZ,"id")){e+="#"+aZ.id
        }else{if(aY=aD(aZ,"href")){e+="[href="+C(aY)+"]"
        }else{if(aY=aD(aZ,"src")){e+="[src="+C(aY)+"]"
        }else{if(aY=aD(aZ,"name")){e+="[name="+aZ.name+"]"
        }}}}var aX=typeof aZ.className!="unknown"&&aZ.className;
        if(aX){if(aX.baseVal!=null){aX=aX.baseVal||""
        }aX=aX.trim();
            if(aX.length>0){e+="."+aX.replace(/\s+/g,".")
            }}return e
    }function aD(aY,aX){var e=aY.attributes.getNamedItem(aX);
        return e&&e.value
    }function E(e){e.t=aJ();
        aU.push(e);
        if(aU.length>aK){aU.splice(0,1)
        }}function h(aX,aY){p=aX;
        var e={name:aX.type,target:ay(aY)};
        if(aY.nodeName){switch(aY.nodeName.toLowerCase()){case"button":e.content=aY.innerText.substring(0,l);
            break;
            case"input":e.content=aY.value.substring(0,l);
                break
        }}E(e)
    }function Y(e){if(e.readyState==4){E({name:"xhr",target:C(e.$url),status:e.status})
    }}function t(aX){try{if(aX===p){return
    }var aZ=aX.target||aX.srcElement;
        if(typeof aZ.nodeType=="number"&&aZ.nodeType==3){aZ=aZ.parentNode
        }if(window.XMLHttpRequest&&aZ instanceof XMLHttpRequest){Y(aZ)
        }else{h(aX,aZ)
        }}catch(aY){}}function H(aX){try{if(aX){if(J){aX.first=true
    }aS.push(W(aX))
    }T()
    }catch(aY){console.log(aY)
    }J=false
    }function ah(){return false
    }function aq(){try{if(!ah()||!window.JSON||!JSON.parse){return[]
    }var aX=JSON.parse(localStorage.getItem("qbaka_data"));
        if(aX&&aX instanceof Array&&aX.length){return aX
        }return[]
    }catch(aY){return[]
    }}function aB(){}var x=false;
    function T(){if(aS.length==0){return
    }var aY=new Date().getTime()-an;
        if(aY>=au){if(aS.length>U){aS.splice(U,aS.length-U)
        }try{N(aS)
        }catch(aX){}aS=[];
            an=new Date().getTime()
        }else{if(!x){x=true;
            setTimeout(function(){x=false;
                T()
            },au-aY)
        }}aB()
    }function N(a2){if(a2.length==0){return
    }var aZ=i(a2);
        if(aZ.length<d*0.8){var aY=encodeURIComponent(aZ);
            if(aY.length<d){var aX=document.createElement("img");
                aX.src=F+"?data="+aY;
                return
            }}if(b){var e=new XDomainRequest();
            e.open("POST",F);
            e.onload=function(){};
            e.send("data="+encodeURIComponent(aZ))
        }else{var a0=document.createElement("iframe");
            a0.style.display="none";
            document.lastChild.appendChild(a0);
            a0.src="about:blank";
            k(a0,"<form id='reporting' accept-charset='utf-8' method='POST' action='"+F+"'><input type='hidden' id='data' name='data' value=''></form>");
            var a1=g(a0);
            a1.getElementById("data").value=aZ;
            a1.getElementById("reporting").submit();
            ac(a0)
        }}function ac(e){function aX(){if(e&&e.parentNode){e.parentNode.removeChild(e);
        e=null
    }}setTimeout(aX,2000);
        e.onload=aX
    }function g(e){e=e.contentWindow||e.contentDocument;
        if(e.document){return e.document
        }return e
    }function k(e,aX){e=g(e);
        e.open("text/html","replace");
        e.write(aX);
        e.close()
    }function aA(){if(window.onerror!==o){window.__qbaka_eh=window.onerror;
        window.onerror=o
    }}function o(a3,a1,aZ){if(!a3||a3=="Script error."||a3=="Script error"){return false
    }if(aJ()-I.at<1000&&j(a3,I.message)){return false
    }try{var aY=y(a3,a1,aZ);
        if(S){var aX=[];
            var a0=arguments.callee.caller;
            var a2=10;
            while(a0&&a2--){aX.push(aV(a0));
                a0=a0.caller
            }if(aX.length>0){aY.stack=aX.join("\n")
            }}H(aY)
    }catch(a4){}try{if(window.__qbaka_eh&&window.__qbaka_eh!=o){window.__qbaka_eh.apply(window,arguments)
    }}catch(a4){}return false
    }function y(aY,aX,e){return{msg:aY,script:aX,line:e}
    }function D(a1,a0,aZ){if(!a1){return
    }var aY={tags:aZ&&aZ.tags,params:aZ&&aZ.params};
        var aX=a0&&a0.stack;
        if(aX){var e=aX.split("\n");
            if(e.length>1&&e[0][0]!=" "&&e[1][0]==" "){e.splice(0,2)
            }else{e.splice(0,1)
            }aY.exception={message:a1,stack:e.join("\n")}
        }else{aY.msg=a1
        }H(aY)
    }function aR(aZ,aY,aX){try{if(aZ instanceof Error){a(aZ,aY)
    }else{if(aN(aZ)){D(aZ,aX||new Error(),aY)
    }else{f("Invalid parameter type to qbaka.report(): "+aZ)
    }}}catch(e){}}function a(aZ,aY){if(!aZ.message){return false
    }if(I&&I.object===aZ){return false
    }I={at:aJ(),message:aZ.message,object:aZ};
        var aX={exception:{message:aZ.message,stack:aw(aZ.stack),args:aZ.arguments,exname:aM(aZ),object:aZ},tags:aY&&aY.tags,params:aY&&aY.params};
        H(aX);
        return true
    }function aw(aZ){if(!aZ||aZ.length<q){return aZ
    }try{var aY=aZ.replace(/((https|http|file)?:\/\/)([^:]*)(:\d+)/g,function(a3,a4,a7,a1,a6){try{if(a3.length>V){var a2=a1.indexOf("?");
        if(a2>0){a1=a1.substring(0,a2)
        }return a4+a1+a6
    }}catch(a5){}return a3
    }).replace(/data:text\/javascript;base64,[A-Za-z0-9+/]*/g,function(a1){try{return a1.substring(0,Math.min(a1.length,V))
        }catch(a2){return a1
        }});
        var aX=aY.split("\n");
        if(aX.length<aj){return aY
        }aX.splice(aj,aX.length-aj)
    }catch(a0){return aZ
    }return aX.join("\n")
    }function W(aY){var a1=M.custom||{};
        af(aY,{url:window.location.href,tags:(a1.tags||aY.tags)?al(a1.tags).concat(al(aY.tags)):null,params:(a1.params||aY.params)?af(ag(a1.params,true),ag(aY.params)):null,user:M.user||a1.user,tzone:new Date().getTimezoneOffset(),rS:B[document.readyState],v:ai,vhash:ax,t:aJ()});
        if(aU.length>0){var aX=[];
            var a0=aY.t;
            for(var aZ=0;
                aZ<aU.length;
                aZ++){var a2=aU[aZ];
                aX.push({name:a2.name,target:a2.target,t:a0-a2.t,content:a2.content,status:a2.status})
            }if(aY.exception){if(aU[aU.length-1].exception===aY.exception.object){aX[aX.length-1].t=0
            }delete aY.exception.object
            }aY.events=aX
        }return aY
    }function r(aX){if(aE(aX)){try{return aX()
    }catch(aY){return undefined
    }}else{return aX
    }}function al(aY){var aX=false;
        if(!aY){return[]
        }for(var aZ=0;
             aZ<aY.length;
             aZ++){aX=aX||aE(aY[aZ])||typeof(aY[aZ])=="undefined"
        }if(!aX){return aY
        }var e=[];
        for(aZ=0;
            aZ<aY.length;
            aZ++){var a0=r(aY[aZ]);
            if(a0&&aN(a0)){e.push(a0)
            }}return e
    }function ag(a1,aX){aX=aX||false;
        if(!a1){return{}
        }for(var aY in a1){if(a1.hasOwnProperty(aY)){aX=aX||aE(a1[aY])||typeof(a1[a1])=="undefined"
        }}if(!aX){return a1
        }var e={};
        for(aY in a1){if(a1.hasOwnProperty(aY)){var a0=r(a1[aY]);
            var aZ=typeof a0;
            if((aZ=="string"&&a0.length)||aZ=="number"||aZ=="boolean"){e[aY]=a0
            }}}return e
    }function aO(){var e=function(a0){var aZ=a0.getElementsByTagName("style");
        var a1="/*This block of style rules is inserted by AdBlock";
        for(var aX=0;
            aX<aZ.length;
            aX++){var aY=aZ[aX];
            if(aY.innerHTML.slice(0,a1.length)==a1){return true
            }}return false
    };
        return e(document)
    }function u(){return null
    }function aN(e){return typeof e=="string"
    }function aE(e){return e&&K.toString.call(e)=="[object Function]"
    }if(typeof(/./)!=="function"){aE=function(e){return typeof e==="function"
    }
    }function Z(e){return e&&/native code/.test(e.toString())
    }function j(e,aX){return e&&aX&&e.indexOf(aX,e.length-aX.length)!==-1
    }function aJ(){return(new Date()).getTime()
    }function aT(aX,e,aY){if(aX.addEventListener){aX.addEventListener(e,aY,false)
    }else{if(aX.attachEvent){aX.attachEvent("on"+e,aY)
    }}}function aV(e){return e.name||(/function ([-\w\d_]+)\s*\(/.test(e.toString())?RegExp.$1:"{anonymous}")
    }function aM(aX){if(!aX||!aX.constructor){return""
    }if(typeof aX.constructor.name!="undefined"){return aX.constructor.name
    }else{return aV(aX.constructor)
    }}function af(aX,e){for(var aY in e){if(e.hasOwnProperty(aY)&&typeof e[aY]!="undefined"){aX[aY]=e[aY]
    }}return aX
    }function f(e){if(window.console&&console.log){console.log(e)
    }}function ab(e){if(window.console&&console.error){console.error(e)
    }}function i(e){if(aL){return JSON.stringify(e)
    }return aI(e,0)
    }function ad(e){return'"'+e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f")+'"'
    }function aI(aY,aZ){var aX;
        aZ=(aZ||0)+1;
        if(aZ>=10){return"null"
        }if(aY==undefined){return"null"
        }if(aY==null||typeof aY=="number"||typeof aY=="boolean"){return aY+""
        }if(typeof aY=="string"){return ad(aY)
        }if(aY instanceof Array){if(!aY.length){return"[]"
        }aX="[";
            for(var e=0;
                e<aY.length;
                e++){aX+=aI(aY[e],aZ);
                aX+=","
            }return aX.substring(0,aX.length-1)+"]"
        }aX="{";
        for(e in aY){if(aY.hasOwnProperty(e)){aX+=ad(e);
            aX+=":";
            aX+=aI(aY[e],aZ);
            aX+=","
        }}return aX.length>1?aX.substring(0,aX.length-1)+"}":"{}"
    }})();