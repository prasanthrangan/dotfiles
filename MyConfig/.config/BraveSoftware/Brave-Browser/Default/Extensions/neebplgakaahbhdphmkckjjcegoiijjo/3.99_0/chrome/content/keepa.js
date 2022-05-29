var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(h, p, l) {
  if (null == h) {
    throw new TypeError("The 'this' value for String.prototype." + l + " must not be null or undefined");
  }
  if (p instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + l + " must not be a regular expression");
  }
  return h + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(h, p, l) {
  h != Array.prototype && h != Object.prototype && (h[p] = l.value);
};
$jscomp.getGlobal = function(h) {
  return "undefined" != typeof window && window === h ? h : "undefined" != typeof global && null != global ? global : h;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(h, p, l, x) {
  if (p) {
    l = $jscomp.global;
    h = h.split(".");
    for (x = 0; x < h.length - 1; x++) {
      var t = h[x];
      t in l || (l[t] = {});
      l = l[t];
    }
    h = h[h.length - 1];
    x = l[h];
    p = p(x);
    p != x && null != p && $jscomp.defineProperty(l, h, {configurable:!0, writable:!0, value:p});
  }
};
$jscomp.polyfill("String.prototype.startsWith", function(h) {
  return h ? h : function(h, l) {
    var p = $jscomp.checkStringArgs(this, h, "startsWith");
    h += "";
    var t = p.length, E = h.length;
    l = Math.max(0, Math.min(l | 0, p.length));
    for (var G = 0; G < E && l < t;) {
      if (p[l++] != h[G++]) {
        return !1;
      }
    }
    return G >= E;
  };
}, "es6", "es3");
$jscomp.polyfill("String.prototype.endsWith", function(h) {
  return h ? h : function(h, l) {
    var p = $jscomp.checkStringArgs(this, h, "endsWith");
    h += "";
    void 0 === l && (l = p.length);
    l = Math.max(0, Math.min(l | 0, p.length));
    for (var t = h.length; 0 < t && 0 < l;) {
      if (p[--l] != h[--t]) {
        return !1;
      }
    }
    return 0 >= t;
  };
}, "es6", "es3");
$jscomp.findInternal = function(h, p, l) {
  h instanceof String && (h = String(h));
  for (var x = h.length, t = 0; t < x; t++) {
    var E = h[t];
    if (p.call(l, E, t, h)) {
      return {i:t, v:E};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.find", function(h) {
  return h ? h : function(h, l) {
    return $jscomp.findInternal(this, h, l).v;
  };
}, "es6", "es3");
(function() {
  var h = window, p = !1;
  String.prototype.hashCode = function() {
    var a = 0, c;
    if (0 === this.length) {
      return a;
    }
    var e = 0;
    for (c = this.length; e < c; e++) {
      var b = this.charCodeAt(e);
      a = (a << 5) - a + b;
      a |= 0;
    }
    return a;
  };
  var l = "optOut_crawl revealStock s_boxOfferListing s_boxType s_boxHorizontal webGraphType webGraphRange overlayPriceGraph".split(" "), x = window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), t = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), E = -1 < navigator.userAgent.toLowerCase().indexOf("edge/"), G = /Apple Computer/.test(navigator.vendor) && /Safari/.test(navigator.userAgent), H = !x && !t && !E && !G, N = H ? "keepaChrome" : x ? "keepaOpera" : G ? "keepaSafari" : E ? 
  "keepaEdge" : "keepaFirefox", ba = t ? "Firefox" : G ? "Safari" : H ? "Chrome" : x ? "Opera" : E ? "Edge" : "Unknown", B = null, K = !1;
  try {
    K = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  } catch (a) {
  }
  if (H) {
    try {
      chrome.runtime.sendMessage("hnkcfpcejkafcihlgbojoidoihckciin", {type:"isActive"}, null, function(a) {
        chrome.runtime.lastError || a && a.isActive && (p = !0);
      });
    } catch (a) {
    }
  }
  try {
    chrome.runtime.onUpdateAvailable.addListener(function(a) {
      chrome.runtime.reload();
    });
  } catch (a) {
  }
  var X = {}, Y = 0;
  chrome.runtime.onMessage.addListener(function(a, d, e) {
    if (d.tab && d.tab.url || d.url) {
      switch(a.type) {
        case "restart":
          document.location.reload(!1);
          break;
        case "setCookie":
          chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:a.key, value:a.val, secure:!0, expirationDate:(Date.now() / 1000 | 0) + 31536E3});
          "token" == a.key ? B != a.val && 64 == a.val.length && (B = a.val, c.set("token", B), setTimeout(function() {
            document.location.reload(!1);
          }, 300)) : c.set(a.key, a.val);
          break;
        case "getCookie":
          return chrome.cookies.get({url:"https://keepa.com/extension", name:a.key}, function(a) {
            null == a ? e({value:null}) : e({value:a.value});
          }), !0;
        case "openPage":
          chrome.windows.create({url:a.url, incognito:!0});
          break;
        case "isPro":
          c.stockData ? e({value:c.stockData.pro, stockData:c.stockData}) : e({value:null});
          break;
        case "getStock":
          return c.addStockJob(a, function(b) {
            0 < b.errorCode && a.cachedStock ? e(a.cachedStock) : 5 == b.errorCode || 9 == b.errorCode ? (9 == b.errorCode && (a.getNewId = !0), setTimeout(function() {
              c.addStockJob(a, e);
            }, 1)) : e(b);
          }), !0;
        case "getFilters":
          e({value:u.getFilters()});
          break;
        case "sendData":
          d = a.val;
          if (null != d.ratings) {
            var b = d.ratings;
            if (1000 > Y) {
              if ("f1" == d.key) {
                if (b) {
                  for (var v = b.length; v--;) {
                    var g = b[v];
                    null == g || null == g.asin ? b.splice(v, 1) : (g = d.domainId + g.asin, X[g] ? b.splice(v, 1) : (X[g] = 1, Y++));
                  }
                  0 < b.length && n.sendPlainMessage(d);
                }
              } else {
                n.sendPlainMessage(d);
              }
            } else {
              X = null;
            }
          } else {
            n.sendPlainMessage(d);
          }
          e({});
          break;
        case "optionalPermissionsRequired":
          e({value:(H || t || x) && "undefined" === typeof chrome.webRequest});
          break;
        case "optionalPermissionsDenied":
          c.set("optOut_crawl", "1");
          console.log("optionalPermissionsDenied");
          e({value:!0});
          break;
        case "optionalPermissionsInContent":
          d = a.val;
          "undefined" != typeof d && (d ? (c.set("optOut_crawl", "0"), console.log("granted"), chrome.runtime.reload()) : (c.set("optOut_crawl", "1"), k.reportBug("permission denied"), console.log("denied")));
          e({value:!0});
          break;
        case "optionalPermissions":
          return "undefined" === typeof chrome.webRequest && chrome.permissions.request({permissions:["webRequest", "webRequestBlocking"]}, function(a) {
            chrome.runtime.lastError || (e({value:a}), "undefined" != typeof a && (a ? (c.set("optOut_crawl", "0"), console.log("granted"), chrome.runtime.reload()) : (c.set("optOut_crawl", "1"), k.reportBug("permission denied"), console.log("denied"))));
          }), !0;
        default:
          e({});
      }
    }
  });
  window.onload = function() {
    t ? chrome.storage.local.get(["install", "optOutCookies"], function(a) {
      a.optOutCookies && 3456E5 > Date.now() - a.optOutCookies || (a.install ? k.register() : chrome.tabs.create({url:chrome.runtime.getURL("chrome/content/onboard.html")}));
    }) : k.register();
  };
  try {
    chrome.browserAction.onClicked.addListener(function(a) {
      chrome.tabs.create({url:"https://keepa.com/#!manage"});
    });
  } catch (a) {
    console.log(a);
  }
  var c = {storage:chrome.storage.local, contextMenu:function() {
    try {
      chrome.contextMenus.removeAll(), chrome.contextMenus.create({title:"View products on Keepa", contexts:["page"], id:"keepaContext", documentUrlPatterns:"*://*.amazon.com/* *://*.amzn.com/* *://*.amazon.co.uk/* *://*.amazon.de/* *://*.amazon.fr/* *://*.amazon.it/* *://*.amazon.ca/* *://*.amazon.com.mx/* *://*.amazon.es/* *://*.amazon.co.jp/* *://*.amazon.in/*".split(" ")}), chrome.contextMenus.onClicked.addListener(function(a, c) {
        chrome.tabs.sendMessage(c.id, {key:"collectASINs"}, {}, function(a) {
          "undefined" != typeof a && chrome.tabs.create({url:"https://keepa.com/#!viewer/" + encodeURIComponent(JSON.stringify(a))});
        });
      });
    } catch (a) {
      console.log(a);
    }
  }, parseCookieHeader:function(a, c) {
    if (0 < c.indexOf("\n")) {
      c = c.split("\n");
      var e = 0;
      a: for (; e < c.length; ++e) {
        var b = c[e].substring(0, c[e].indexOf(";")), v = b.indexOf("=");
        b = [b.substring(0, v), b.substring(v + 1)];
        if (2 == b.length && "-" != b[1]) {
          for (v = 0; v < a.length; ++v) {
            if (a[v][0] == b[0]) {
              a[v][1] = b[1];
              continue a;
            }
          }
          a.push(b);
        }
      }
    } else {
      if (c = c.substring(0, c.indexOf(";")), e = c.indexOf("="), c = [c.substring(0, e), c.substring(e + 1)], 2 == c.length && "-" != c[1]) {
        for (e = 0; e < a.length; ++e) {
          if (a[e][0] == c[0]) {
            a[e][1] = c[1];
            return;
          }
        }
        a.push(c);
      }
    }
  }, log:function(a) {
    k.quiet || console.log(a);
  }, iframeWin:null, operationComplete:!1, counter:0, stockInit:!1, stockRequest:[], initStock:function() {
    if (!c.stockInit && "undefined" != typeof chrome.webRequest) {
      var a = ["xmlhttprequest"], d = "*://www.amazon.com/* *://www.amazon.co.uk/* *://www.amazon.es/* *://www.amazon.nl/* *://www.amazon.com.mx/* *://www.amazon.it/* *://www.amazon.in/* *://www.amazon.de/* *://www.amazon.fr/* *://www.amazon.co.jp/* *://www.amazon.ca/* *://www.amazon.com.br/* *://www.amazon.com.au/* *://www.amazon.com.mx/* *://smile.amazon.com/* *://smile.amazon.co.uk/* *://smile.amazon.es/* *://smile.amazon.nl/* *://smile.amazon.com.mx/* *://smile.amazon.it/* *://smile.amazon.in/* *://smile.amazon.de/* *://smile.amazon.fr/* *://smile.amazon.co.jp/* *://smile.amazon.ca/* *://smile.amazon.com.br/* *://smile.amazon.com.au/* *://smile.amazon.com.mx/*".split(" ");
      try {
        var e = [c.stockData.addCartHeaders, c.stockData.geoHeaders, c.stockData.setAddressHeaders, c.stockData.addressChangeHeaders, c.stockData.productPageHeaders, c.stockData.toasterHeaders];
        chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
          if (a.initiator) {
            if (a.initiator.startsWith("http")) {
              return;
            }
          } else {
            if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
              return;
            }
          }
          var b = a.requestHeaders, g = {};
          try {
            for (var d = null, h = 0; h < b.length; ++h) {
              if ("krequestid" == b[h].name) {
                d = b[h].value;
                b.splice(h--, 1);
                break;
              }
            }
            if (d) {
              var k = c.stockRequest[d];
              c.stockRequest[a.requestId] = k;
              setTimeout(function() {
                delete c.stockRequest[a.requestId];
              }, 30000);
              var l = e[k.requestType];
              for (d = 0; d < b.length; ++d) {
                var p = b[d].name.toLowerCase();
                (l[p] || "" === l[p] || l[b[d].name] || "cookie" == p || "content-type" == p || "sec-fetch-dest" == p || "sec-fetch-mode" == p || "sec-fetch-user" == p || "accept" == p || "referer" == p) && b.splice(d--, 1);
              }
              if (0 == k.requestType && 19 > k.stockSession.length) {
                return g.cancel = !0, g;
              }
              var m = c.stockData.isMobile ? "https://" + k.host + "/gp/aw/d/" + k.asin + "/" : k.referer, t;
              for (t in l) {
                var n = l[t];
                if (0 != n.length) {
                  n = n.replace("{COOKIE}", k.stockSession).replace("{REFERER}", m).replace("{ORIGIN}", k.host);
                  if (-1 < n.indexOf("{CSRF}")) {
                    if (k.csrf) {
                      n = n.replace("{CSRF}", k.csrf), k.csrf = null;
                    } else {
                      continue;
                    }
                  }
                  b.push({name:t, value:n});
                }
              }
              for (l = 0; l < b.length; ++l) {
                var u = b[l].name.toLowerCase();
                (c.stockData.stockHeaders[u] || "" === c.stockData.stockHeaders[u] || c.stockData.stockHeaders[b[l].name] || "origin" == u || "pragma" == u || "cache-control" == u || "upgrade-insecure-requests" == u) && b.splice(l--, 1);
              }
              for (var I in c.stockData.stockHeaders) {
                var x = c.stockData.stockHeaders[I];
                0 != x.length && (x = x.replace("{COOKIE}", k.stockSession).replace("{REFERER}", m).replace("{ORIGIN}", k.host).replace("{LANG}", c.stockData.languageCode[k.domainId]), b.push({name:I, value:x}));
              }
              g.requestHeaders = b;
              a.requestHeaders = b;
            } else {
              return g;
            }
          } catch (J) {
            g.cancel = !0;
          }
          return g;
        }, {urls:d, types:a}, H ? ["blocking", "requestHeaders", "extraHeaders"] : ["blocking", "requestHeaders"]);
        chrome.webRequest.onHeadersReceived.addListener(function(a) {
          if (a.initiator) {
            if (a.initiator.startsWith("http")) {
              return;
            }
          } else {
            if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
              return;
            }
          }
          var b = a.responseHeaders, e = {};
          try {
            var d = c.stockRequest[a.requestId];
            if (d) {
              var h = d.cookies || [];
              for (a = 0; a < b.length; ++a) {
                "set-cookie" == b[a].name.toLowerCase() && (c.parseCookieHeader(h, b[a].value), b.splice(a, 1), a--);
              }
              d.cookies = h;
              switch(d.requestType) {
                case 0:
                case 1:
                case 2:
                case 4:
                case 5:
                  e.responseHeaders = b;
                  break;
                case 3:
                  e.cancel = !0, setTimeout(function() {
                    d.cookies = h;
                    c.stockSessions[d.domainId + d.asin] = h;
                    d.callback();
                  }, 10);
              }
              if (0 != d.requestType) {
                b = "";
                for (a = 0; a < d.cookies.length; ++a) {
                  var k = d.cookies[a];
                  b += k[0] + "=" + k[1] + "; ";
                  "session-id" == k[0] && 16 < k[1].length && 65 > k[1].length && k[1] != d.session && (d.sessionIdMismatch = !0);
                }
                d.stockSession = b;
              }
            } else {
              return e;
            }
          } catch (da) {
            e.cancel = !0;
          }
          return e;
        }, {urls:d, types:a}, H ? ["blocking", "responseHeaders", "extraHeaders"] : ["blocking", "responseHeaders"]);
        c.stockInit = !0;
      } catch (b) {
        k.reportBug(b, b.message + " stock exception: " + typeof chrome.webRequest + " " + ("undefined" != typeof chrome.webRequest ? typeof chrome.webRequest.onBeforeSendHeaders : "~") + " " + ("undefined" != typeof chrome.webRequest ? typeof chrome.webRequest.onHeadersReceived : "#"));
      }
    }
  }, stockData:null, stockJobQueue:[], stockSessions:[], addStockJob:function(a, d) {
    a.gid = k.Guid.newGuid().substr(0, 8);
    a.requestType = -1;
    c.stockRequest[a.gid] = a;
    var e = function(a) {
      c.stockJobQueue.shift();
      d(a);
      0 < c.stockJobQueue.length && c.processStockJob(c.stockJobQueue[0][0], c.stockJobQueue[0][1]);
    };
    c.stockJobQueue.push([a, e]);
    1 == c.stockJobQueue.length && c.processStockJob(a, e);
  }, processStockJob:function(a, d) {
    if (null == c.stockData.stock) {
      console.log("stock retrieval not initialized"), d({error:"stock retrieval not initialized", errorCode:0});
    } else {
      if (0 == c.stockData.stockEnabled[a.domainId]) {
        console.log("stock retrieval not supported for domain"), d({error:"stock retrieval not supported for domain", errorCode:1});
      } else {
        if (!0 === c.stockData.pro || a.force) {
          if (!a.isMAP && a.maxQty && c.stockData.stockMaxQty && a.maxQty < c.stockData.stockMaxQty) {
            d({stock:a.maxQty, limit:!1});
          } else {
            if (null == a.oid) {
              console.log("missing oid", a), d({error:"stock retrieval failed for offer: " + a.asin + " id: " + a.gid + " missing oid.", errorCode:12});
            } else {
              if (a.onlyMaxQty) {
                d();
              } else {
                if (c.initStock(), c.stockInit) {
                  if (setTimeout(function() {
                    delete c.stockRequest[a.gid];
                    delete c.stockSessions[a.domainId + a.asin];
                  }, 3E5), a.queue = [function() {
                    for (var b = "", e = !1, g = !1, h = 0, l = 0; l < a.cookies.length; ++l) {
                      var p = a.cookies[l];
                      b += p[0] + "=" + p[1] + "; ";
                      "session-id" == p[0] && 16 < p[1].length && 65 > p[1].length && (e = !0, p[1] != a.session && (g = !0, h = p[1]));
                    }
                    a.cookie = b;
                    e && g ? (a.stockSession = b, b = c.stockData.addCartUrl, e = c.stockData.addCartPOST, a.requestType = 0, k.httpPost("https://" + a.host + b.replaceAll("{SESSION_ID}", h).replaceAll("{OFFER_ID}", a.oid).replaceAll("{ADDCART}", c.stockData.stockAdd[a.domainId]).replaceAll("{ASIN}", a.asin), e.replaceAll("{SESSION_ID}", h).replaceAll("{OFFER_ID}", a.oid).replaceAll("{ADDCART}", c.stockData.stockAdd[a.domainId]).replaceAll("{ASIN}", a.asin), function(b) {
                      var e = decodeURIComponent(a.oid).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), g = b.match(new RegExp(c.stockData.stock)), v = b.match(new RegExp(c.stockData.stockAlt)), h = b.match(new RegExp(c.stockData.stockAlt2.replaceAll("{ESCAPED_OID}", e))), k = b.match(new RegExp(c.stockData.price)), l = b.match(new RegExp(c.stockData.priceSingle.replaceAll("{ESCAPED_OID}", e)));
                      e = (new RegExp(c.stockData.limit)).test(b);
                      null == g && (g = h);
                      if (g && g[1]) {
                        b = parseInt(g[1]), g = -1, v && v[1] && (g = parseInt(v[1])), h && h[1] && (g = parseInt(h[1])), v = -1, l && 1 < l.length ? (l[1].lastIndexOf(".") == l[1].length - 2 && (l[1] += "0"), v = parseInt(l[1].replace(/[\D]/g, ""))) : k && (v = parseInt(k[1].replace(/[\D]/g, "")) / b), k = -1, 0 < g && 100 > g && b > g && (e = !0, k = g), d({stock:Math.max(b, g), orderLimit:k, limit:e, price:v});
                      } else {
                        if ((k = b.match(/automated access|api-services-support@/)) || a.isRetry) {
                          delete c.stockSessions[a.domainId + a.asin], a.cookie = null, a.stockSession = null, a.cookies = null;
                        }
                        k ? (d({error:"Amazon stock retrieval rate limited (bot detection) of offer: " + a.asin + " id: " + a.gid + " offer: " + a.oid, errorCode:5}), console.log("stock retrieval rate limited for offer: ", a.asin + " " + a.oid + " id: " + a.gid, b.length)) : d({error:"Stock retrieval failed for this offer. Try reloading the page after a while. ", errorCode:9});
                      }
                    }, !1, a.gid)) : (k.reportBug(null, "stock session issue: " + e + " " + g + " counter: " + c.counter + " c: " + JSON.stringify(a.cookies) + " " + JSON.stringify(a)), d({error:"stock session issue: " + e + " " + g, errorCode:4}));
                  }], a.getNewId && (c.stockData.geoRetry && delete c.stockSessions[a.domainId + a.asin], a.queue.unshift(function() {
                    a.requestType = 4;
                    k.httpGet("https://" + c.stockData.offerUrl.replace("{ORIGIN}", a.host).replace("{ASIN}", a.asin).replace("{SID}", a.sellerId), function(b) {
                      if (b.match(c.stockData.sellerIdBBVerify.replace("{SID}", a.sellerId))) {
                        for (var e = null, g = 0; g < c.stockData.csrfBB.length; g++) {
                          var h = b.match(new RegExp(c.stockData.csrfBB[g]));
                          if (null != h && h[1]) {
                            e = h[1];
                            break;
                          }
                        }
                        if (e) {
                          a.csrf = e[1];
                          e = null;
                          for (g = 0; g < c.stockData.offerIdBB.length; g++) {
                            if (h = b.match(new RegExp(c.stockData.offerIdBB[g])), null != h && h[1]) {
                              e = h[1];
                              break;
                            }
                          }
                          e && (a.oid = e, a.callback());
                        }
                      } else {
                        d({error:"stock retrieval failed for offer: " + a.asin + " id: " + a.gid + " mismatch oid.", errorCode:10});
                      }
                    }, !1, a.gid);
                  })), a.callback = function() {
                    return a.queue.shift()();
                  }, c.stockSessions[a.domainId + a.asin]) {
                    a.cookies = c.stockSessions[a.domainId + a.asin], a.callback();
                  } else {
                    var e = c.stockData.zipCodes[a.domainId];
                    c.stockData.domainId == a.domainId ? (a.requestType = 3, k.httpPost("https://" + a.host + c.stockData.addressChangeUrl, c.stockData.addressChangePOST.replace("{ZIPCODE}", e), null, !1, a.gid)) : (a.requestType = 1, k.httpGet("https://" + a.host + "/", function(b) {
                      b = b.match(new RegExp(c.stockData.csrfGeo));
                      null != b ? (a.csrf = b[1], a.requestType = 5, k.httpGet("https://" + a.host + c.stockData.toasterUrl.replace("{TIME_MS}", Date.now()), function(b) {
                        a.requestType = 2;
                        k.httpGet("https://" + a.host + c.stockData.setAddressUrl, function(b) {
                          b = b.match(new RegExp(c.stockData.csrfSetAddress));
                          null != b && (a.csrf = b[1]);
                          a.requestType = 3;
                          k.httpPost("https://" + a.host + c.stockData.addressChangeUrl, c.stockData.addressChangePOST.replace("{ZIPCODE}", e), null, !1, a.gid);
                        }, !1, a.gid);
                      }, !1, a.gid)) : d({error:"stock retrieval failed for offer: " + a.asin + " id: " + a.gid + " main.", errorCode:7});
                    }, !1, a.gid));
                  }
                } else {
                  console.log("could not init stock retrieval", c.stockInit, typeof chrome.webRequest), d({error:"could not init stock retrieval", errorCode:"undefined" != typeof chrome.webRequest ? 3 : 33});
                }
              }
            }
          }
        } else {
          console.log("stock retrieval not pro"), d({error:"stock retrieval failed, not subscribed", errorCode:2});
        }
      }
    }
  }, set:function(a, d, e) {
    var b = {};
    b[a] = d;
    c.storage.set(b, e);
  }, remove:function(a, d) {
    c.storage.remove(a, d);
  }, get:function(a, d) {
    "function" != typeof d && (d = function() {
    });
    c.storage.get(a, function(a) {
      d(a);
    });
  }};
  c.contextMenu();
  var k = {quiet:!0, version:chrome.runtime.getManifest().version, browser:1, url:"https://keepa.com", testUrl:"https://test.keepa.com", getDomain:function(a) {
    switch(a) {
      case "com":
        return 1;
      case "co.uk":
        return 2;
      case "de":
        return 3;
      case "fr":
        return 4;
      case "co.jp":
        return 5;
      case "ca":
        return 6;
      case "it":
        return 8;
      case "es":
        return 9;
      case "in":
        return 10;
      case "com.mx":
        return 11;
      case "com.br":
        return 12;
      case "com.au":
        return 13;
      case "nl":
        return 14;
      default:
        return 1;
    }
  }, objectStorage:[], Guid:function() {
    var a = function(e, b, c) {
      return e.length >= b ? e : a(c + e, b, c || " ");
    }, c = function() {
      var a = (new Date).getTime();
      return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/x/g, function(b) {
        var c = (a + 16 * Math.random()) % 16 | 0;
        a = Math.floor(a / 16);
        return ("x" === b ? c : c & 7 | 8).toString(16);
      });
    };
    return {newGuid:function() {
      var e = "undefined" != typeof window.crypto.getRandomValues;
      if ("undefined" != typeof window.crypto && e) {
        e = new window.Uint16Array(16);
        window.crypto.getRandomValues(e);
        var b = "";
        for (g in e) {
          var d = e[g].toString(16);
          d = a(d, 4, "0");
          b += d;
        }
        var g = b;
      } else {
        g = c();
      }
      return g;
    }};
  }(), register:function() {
    chrome.cookies.onChanged.addListener(function(a) {
      a.removed || null == a.cookie || "keepa.com" != a.cookie.domain || "/extension" != a.cookie.path || ("token" == a.cookie.name ? B != a.cookie.value && 64 == a.cookie.value.length && (B = a.cookie.value, c.set("token", B), setTimeout(function() {
        document.location.reload(!1);
      }, 300)) : c.set(a.cookie.name, a.cookie.value));
    });
    var a = !1, d = function(e) {
      for (var b = {}, d = 0; d < e.length; b = {$jscomp$loop$prop$name$77:b.$jscomp$loop$prop$name$77}, d++) {
        b.$jscomp$loop$prop$name$77 = e[d];
        try {
          chrome.cookies.get({url:"https://keepa.com/extension", name:b.$jscomp$loop$prop$name$77}, function(b) {
            return function(e) {
              chrome.runtime.lastError && -1 < chrome.runtime.lastError.message.indexOf("No host permission") ? a || (a = !0, k.reportBug("extensionPermission restricted ### " + chrome.runtime.lastError.message)) : null != e && null != e.value && 0 < e.value.length && c.set(b.$jscomp$loop$prop$name$77, e.value);
            };
          }(b));
        } catch (g) {
          console.log(g);
        }
      }
    };
    d(l);
    chrome.cookies.get({url:"https://keepa.com/extension", name:"token"}, function(a) {
      if (null != a && 64 == a.value.length) {
        B = a.value, c.set("token", B);
      } else {
        var b = (Date.now() / 1000 | 0) + 31536E3;
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"optOut_crawl", value:"0", secure:!0, expirationDate:b});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"revealStock", value:"1", secure:!0, expirationDate:b});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"s_boxType", value:"0", secure:!0, expirationDate:b});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"s_boxOfferListing", value:"1", secure:!0, expirationDate:b});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"s_boxHorizontal", value:"0", secure:!0, expirationDate:b});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"webGraphType", value:"[1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]", secure:!0, expirationDate:b});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"webGraphRange", value:"180", secure:!0, expirationDate:b});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"overlayPriceGraph", value:"0", secure:!0, expirationDate:b});
        d(l);
        c.get("token", function(a) {
          B = (a = a.token) && 64 == a.length ? a : k.Guid.newGuid();
          chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"token", value:B, secure:!0, expirationDate:b});
        });
      }
    });
    try {
      "undefined" != typeof chrome.storage.sync && chrome.storage.sync.clear();
    } catch (e) {
    }
    window.addEventListener("message", function(a) {
      var b = a.data;
      if (b) {
        if ("string" === typeof b) {
          try {
            b = JSON.parse(b);
          } catch (Z) {
            return;
          }
        }
        if (b.log) {
          console.log(b.log);
        } else {
          var c = function() {
          };
          if (a.origin != k.url && a.origin != k.testUrl) {
            var e = u.getMessage();
            if (null != e && ("function" == typeof e.onDoneC && (c = e.onDoneC, delete e.onDoneC), "undefined" == typeof e.sent && b.sandbox && a.source == document.getElementById("keepa_data").contentWindow)) {
              if (b.sandbox == e.url) {
                u.setStatTime(40);
                try {
                  a.source.postMessage({key:"data", value:e}, "*");
                } catch (Z) {
                  u.abortJob(407), c();
                }
              } else {
                b.isUrlMsg ? (e.wasUrl = b.sandbox, u.abortJob(405)) : (a = u.getOutgoingMessage(e, b.sandbox), n.sendMessage(a)), c();
              }
            }
          }
        }
      }
    });
    t ? c.set("addonVersionFirefox", k.version) : c.set("addonVersionChrome", k.version);
    try {
      chrome.runtime.setUninstallURL("https://dyn.keepa.com/app/stats/?type=uninstall&version=" + N + "." + k.version);
    } catch (e) {
    }
    window.setTimeout(function() {
      n.initWebSocket();
    }, 2000);
  }, log:function(a) {
    c.log(a);
  }, lastBugReport:0, reportBug:function(a, d, e) {
    var b = Error();
    c.get(["token"], function(c) {
      var g = Date.now();
      if (!(12E5 > g - k.lastBugReport || /(dead object)|(Script error)|(setUninstallURL)|(File error: Corrupted)|(operation is insecure)|(\.location is null)/i.test(a))) {
        k.lastBugReport = g;
        g = "";
        var h = k.version;
        d = d || "";
        try {
          if (g = b.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;"), !/(keepa|content)\.js/.test(g) || g.startsWith("https://www.amazon") || g.startsWith("https://smile.amazon") || g.startsWith("https://sellercentral")) {
            return;
          }
        } catch (U) {
        }
        try {
          g = g.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
        } catch (U) {
        }
        if ("object" == typeof a) {
          try {
            a = a instanceof Error ? a.toString() : JSON.stringify(a);
          } catch (U) {
          }
        }
        null == e && (e = {exception:a, additional:d, url:document.location.host, stack:g});
        e.keepaType = N;
        e.version = h;
        setTimeout(function() {
          k.httpPost("https://dyn.keepa.com/service/bugreport/?user=" + c.token + "&type=" + ba + "&version=" + h, JSON.stringify(e), null, !1);
        }, 50);
      }
    });
  }, httpGet:function(a, c, e, b) {
    var d = new XMLHttpRequest;
    c && (d.onreadystatechange = function() {
      4 == d.readyState && c.call(this, d.responseText);
    });
    d.withCredentials = e;
    d.open("GET", a, !0);
    b && d.setRequestHeader("krequestid", b);
    d.send();
  }, httpPost:function(a, c, e, b, h) {
    var d = new XMLHttpRequest;
    e && (d.onreadystatechange = function() {
      4 == d.readyState && e.call(this, d.responseText);
    });
    d.withCredentials = b;
    d.open("POST", a, !0);
    d.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    h && d.setRequestHeader("krequestid", h);
    d.send(c);
  }};
  window.addEventListener("error", function(a, c, e, b, h) {
    a = "object" === typeof a && a.srcElement && a.target ? "[object HTMLScriptElement]" == a.srcElement && "[object HTMLScriptElement]" == a.target ? "Error loading script " + JSON.stringify(a) : JSON.stringify(a) : a.toString();
    var d = "";
    b = b || 0;
    if (h && h.stack) {
      d = h.stack;
      try {
        d = h.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
        if (!/(keepa|content)\.js/.test(d)) {
          return;
        }
        d = d.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
      } catch (Z) {
      }
    }
    a = {msg:a, url:(c || document.location.toString()) + ":" + parseInt(e || 0) + ":" + parseInt(b || 0), stack:d};
    "ipbakfmnjdenbmoenhicfmoojdojjjem" != chrome.runtime.id && "blfpbjkajgamcehdbehfdioapoiibdmc" != chrome.runtime.id || console.log(a);
    k.reportBug(null, null, a);
    return !1;
  });
  var aa = 0;
  var n = {server:["wss://dyn.keepa.com", "wss://dyn-2.keepa.com"], serverIndex:0, clearTimeout:0, webSocket:null, sendPlainMessage:function(a) {
    K || (a = JSON.stringify(a), n.webSocket.send(pako.deflate(a)));
  }, sendMessage:function(a) {
    if (!K) {
      u.clearIframe();
      var c = pako.deflate(JSON.stringify(a));
      u.clearMessage();
      1 == n.webSocket.readyState && n.webSocket.send(c);
      403 == a.status && u.endSession(aa);
      h.console.clear();
    }
  }, initWebSocket:function() {
    K || c.get(["token", "optOut_crawl"], function(a) {
      var d = a.token, e = a.optOut_crawl;
      if (d && 64 == d.length) {
        var b = function() {
          if (null == n.webSocket || 1 != n.webSocket.readyState) {
            n.serverIndex %= n.server.length;
            if ("undefined" == typeof e || "undefined" == e || null == e || "null" == e) {
              e = "0";
            }
            p && (e = "1");
            "undefined" === typeof chrome.webRequest && (e = "1");
            var a = new WebSocket(n.server[n.serverIndex] + "/apps/cloud/?user=" + d + "&app=" + N + "&version=" + k.version + "&wr=" + typeof chrome.webRequest + "&optOut=" + e);
            a.binaryType = "arraybuffer";
            a.onmessage = function(a) {
              a = a.data;
              var b = null;
              a instanceof ArrayBuffer && (a = pako.inflate(a, {to:"string"}));
              try {
                b = JSON.parse(a);
              } catch (U) {
                k.reportBug(U, a);
                return;
              }
              108 != b.status && ("" == b.key ? c.stockData.domainId = b.domainId : 108108 == b.timeout ? (b.stockData && (c.stockData = b.stockData, console.log("stock reveal ready")), "undefined" != typeof b.keepaBoxPlaceholder && c.set("keepaBoxPlaceholder", b.keepaBoxPlaceholder), "undefined" != typeof b.keepaBoxPlaceholderBackup && c.set("keepaBoxPlaceholderBackup", b.keepaBoxPlaceholderBackup), "undefined" != typeof b.keepaBoxPlaceholderBackupClass && c.set("keepaBoxPlaceholderBackupClass", 
              b.keepaBoxPlaceholderBackupClass), "undefined" != typeof b.keepaBoxPlaceholderAppend && c.set("keepaBoxPlaceholderAppend", b.keepaBoxPlaceholderAppend), "undefined" != typeof b.keepaBoxPlaceholderBackupAppend && c.set("keepaBoxPlaceholderBackupAppend", b.keepaBoxPlaceholderBackupAppend)) : (b.domainId && (aa = b.domainId), u.clearIframe(), u.onMessage(b)));
            };
            a.onclose = function(a) {
              setTimeout(function() {
                b();
              }, 18E4 * Math.random());
            };
            a.onerror = function(b) {
              n.serverIndex++;
              a.close();
            };
            a.onopen = function() {
              u.abortJob(414);
            };
            n.webSocket = a;
          }
        };
        b();
      }
    });
  }};
  var u = function() {
    function a(a) {
      try {
        m.stats.times.push(a), m.stats.times.push(Date.now() - m.stats.start);
      } catch (w) {
      }
    }
    function d(b, c) {
      b.sent = !0;
      a(25);
      var e = b.key, d = b.messageId;
      b = b.stats;
      try {
        var y = C[F]["session-id"];
      } catch (f) {
        y = "";
      }
      e = {key:e, messageId:d, stats:b, sessionId:y, payload:[], status:200};
      for (var h in c) {
        e[h] = c[h];
      }
      return e;
    }
    function e(b) {
      F = m.domainId;
      Q = x(C);
      "object" != typeof C[F] && (C[F] = {});
      "undefined" == typeof m.headers.Accept && (m.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
      l(b, !b.isAjax, function(c) {
        a(0);
        var e = {payload:[]};
        if (c.match(H)) {
          e.status = 403;
        } else {
          if (b.contentFilters && 0 < b.contentFilters.length) {
            for (var y in b.contentFilters) {
              var h = c.match(new RegExp(b.contentFilters[y]));
              if (h) {
                e.payload[y] = h[1].replace(/\n/g, "");
              } else {
                e.status = 305;
                e.payload[y] = c;
                break;
              }
            }
          } else {
            e.payload = [c];
          }
        }
        try {
          b.stats.times.push(3), b.stats.times.push(k.lastBugReport);
        } catch (z) {
        }
        "undefined" == typeof b.sent && (e = d(b, e), n.sendMessage(e));
      });
    }
    function b(b) {
      F = m.domainId;
      Q = x(C);
      "object" != typeof C[F] && (C[F] = {});
      "undefined" == typeof m.headers.Accept && (m.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
      a(4);
      var e = new URL(b.url), h = null;
      try {
        null != b.scrapeFilters && 0 < b.scrapeFilters.length && b.scrapeFilters[0].lager && chrome.cookies.get({url:e.origin, name:"session-id"}, function(a) {
          null == a ? h = "guest" : null != a.value && 5 < a.value.length && (h = a.value);
        });
      } catch (D) {
      }
      l(b, !b.isAjax, function(w, y) {
        a(6);
        if ("undefined" == typeof b.sent) {
          var z = {};
          try {
            for (var f = w.evaluate("//comment()", w, null, XPathResult.ANY_TYPE, null), g = f.iterateNext(), l = ""; g;) {
              l += g.textContent, g = f.iterateNext();
            }
            if (w.querySelector("body").textContent.match(H) || l.match(H)) {
              z.status = 403;
              if ("undefined" != typeof b.sent) {
                return;
              }
              z = d(b, z);
              n.sendMessage(z);
              return;
            }
          } catch (V) {
          }
          a(7);
          if (b.scrapeFilters && 0 < b.scrapeFilters.length) {
            var m = {}, D = {}, O = {}, q = "", t = null, u = function() {
              if ("" === q) {
                z.payload = [t];
                z.scrapedData = O;
                for (var a in D) {
                  z[a] = D[a];
                }
              } else {
                z.status = 305, z.payload = [t, q, ""];
              }
              try {
                b.stats.times.push(99), b.stats.times.push(k.lastBugReport);
              } catch (fa) {
              }
              "undefined" == typeof b.sent && (z = d(b, z), n.sendMessage(z));
            }, x = function(a, b, c) {
              var e = [];
              if (!a.selector) {
                if (!a.regExp) {
                  return q = "invalid selector, sel/regexp", !1;
                }
                e = w.querySelector("html").innerHTML.match(new RegExp(a.regExp));
                if (!e || e.length < a.reGroup) {
                  c = "regexp fail: html - " + a.name + c;
                  if (!1 === a.optional) {
                    return q = c, !1;
                  }
                  t += " // " + c;
                  return !0;
                }
                return e[a.reGroup];
              }
              var d = b.querySelectorAll(a.selector);
              0 == d.length && (d = b.querySelectorAll(a.altSelector));
              if (0 == d.length) {
                if (!0 === a.optional) {
                  return !0;
                }
                q = "selector no match: " + a.name + c;
                return !1;
              }
              if (a.parentSelector && (d = [d[0].parentNode.querySelector(a.parentSelector)], null == d[0])) {
                if (!0 === a.optional) {
                  return !0;
                }
                q = "parent selector no match: " + a.name + c;
                return !1;
              }
              if ("undefined" != typeof a.multiple && null != a.multiple && (!0 === a.multiple && 1 > d.length || !1 === a.multiple && 1 < d.length)) {
                c = "selector multiple mismatch: " + a.name + c + " found: " + d.length;
                if (!1 === a.optional) {
                  return q = c, !1;
                }
                t += " // " + c;
                return !0;
              }
              if (a.isListSelector) {
                return m[a.name] = d, !0;
              }
              if (!a.attribute) {
                return q = "selector attribute undefined?: " + a.name + c, !1;
              }
              for (var h in d) {
                if (d.hasOwnProperty(h)) {
                  b = d[h];
                  if (!b) {
                    break;
                  }
                  if (a.childNode) {
                    a.childNode = Number(a.childNode);
                    b = b.childNodes;
                    if (b.length < a.childNode) {
                      c = "childNodes fail: " + b.length + " - " + a.name + c;
                      if (!1 === a.optional) {
                        return q = c, !1;
                      }
                      t += " // " + c;
                      return !0;
                    }
                    b = b[a.childNode];
                  }
                  b = "text" == a.attribute ? b.textContent : "html" == a.attribute ? b.innerHTML : b.getAttribute(a.attribute);
                  if (!b || 0 == b.length || 0 == b.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "").length) {
                    c = "selector attribute null: " + a.name + c;
                    if (!1 === a.optional) {
                      return q = c, !1;
                    }
                    t += " // " + c;
                    return !0;
                  }
                  if (a.regExp) {
                    var y = b.match(new RegExp(a.regExp));
                    if (!y || y.length < a.reGroup) {
                      c = "regexp fail: " + b + " - " + a.name + c;
                      if (!1 === a.optional) {
                        return q = c, !1;
                      }
                      t += " // " + c;
                      return !0;
                    }
                    e.push("undefined" == typeof y[a.reGroup] ? y[0] : y[a.reGroup]);
                  } else {
                    e.push(b);
                  }
                  if (!a.multiple) {
                    break;
                  }
                }
              }
              return a.multiple ? e : e[0];
            };
            g = !1;
            f = {};
            for (var v in b.scrapeFilters) {
              f.$jscomp$loop$prop$pageType$82 = v;
              a: {
                if (g) {
                  break;
                }
                f.$jscomp$loop$prop$pageFilter$79 = b.scrapeFilters[f.$jscomp$loop$prop$pageType$82];
                f.$jscomp$loop$prop$pageVersionTest$80 = f.$jscomp$loop$prop$pageFilter$79.pageVersionTest;
                l = w.querySelectorAll(f.$jscomp$loop$prop$pageVersionTest$80.selector);
                0 == l.length && (l = w.querySelectorAll(f.$jscomp$loop$prop$pageVersionTest$80.altSelector));
                if (0 != l.length) {
                  if ("undefined" != typeof f.$jscomp$loop$prop$pageVersionTest$80.multiple && null != f.$jscomp$loop$prop$pageVersionTest$80.multiple) {
                    if (!0 === f.$jscomp$loop$prop$pageVersionTest$80.multiple && 2 > l.length) {
                      break a;
                    }
                    if (!1 === f.$jscomp$loop$prop$pageVersionTest$80.multiple && 1 < l.length) {
                      break a;
                    }
                  }
                  if (f.$jscomp$loop$prop$pageVersionTest$80.attribute) {
                    var C = null;
                    C = "text" == f.$jscomp$loop$prop$pageVersionTest$80.attribute ? "" : l[0].getAttribute(f.$jscomp$loop$prop$pageVersionTest$80.attribute);
                    if (null == C) {
                      break a;
                    }
                  }
                  var B = f.$jscomp$loop$prop$pageType$82;
                  f.$jscomp$loop$prop$revealMAP$99 = f.$jscomp$loop$prop$pageFilter$79.revealMAP;
                  f.$jscomp$loop$prop$revealed$101 = !1;
                  f.$jscomp$loop$prop$afterAjaxFinished$102 = function(d) {
                    return function() {
                      var y = 0, g = [];
                      a(26);
                      var f = {}, l;
                      for (l in d.$jscomp$loop$prop$pageFilter$79) {
                        f.$jscomp$loop$prop$sel$88 = d.$jscomp$loop$prop$pageFilter$79[l];
                        if (!(f.$jscomp$loop$prop$sel$88.name == d.$jscomp$loop$prop$pageVersionTest$80.name || d.$jscomp$loop$prop$revealed$101 && "revealMAP" == f.$jscomp$loop$prop$sel$88.name)) {
                          var k = w;
                          if (f.$jscomp$loop$prop$sel$88.parentList) {
                            var q = [];
                            if ("undefined" != typeof m[f.$jscomp$loop$prop$sel$88.parentList]) {
                              q = m[f.$jscomp$loop$prop$sel$88.parentList];
                            } else {
                              if (!0 === x(d.$jscomp$loop$prop$pageFilter$79[f.$jscomp$loop$prop$sel$88.parentList], k, d.$jscomp$loop$prop$pageType$82)) {
                                q = m[f.$jscomp$loop$prop$sel$88.parentList];
                              } else {
                                break;
                              }
                            }
                            D[f.$jscomp$loop$prop$sel$88.parentList] || (D[f.$jscomp$loop$prop$sel$88.parentList] = []);
                            k = 0;
                            var r = {}, n;
                            for (n in q) {
                              if (q.hasOwnProperty(n)) {
                                if ("lager" == f.$jscomp$loop$prop$sel$88.name) {
                                  k++;
                                  try {
                                    var A = void 0;
                                    r.$jscomp$loop$prop$offerId$85 = void 0;
                                    f.$jscomp$loop$prop$sel$88.selector && (A = q[n].querySelector(f.$jscomp$loop$prop$sel$88.selector));
                                    f.$jscomp$loop$prop$sel$88.altSelector && (r.$jscomp$loop$prop$offerId$85 = q[n].querySelector(f.$jscomp$loop$prop$sel$88.altSelector));
                                    r.$jscomp$loop$prop$offerId$85 && (r.$jscomp$loop$prop$offerId$85 = r.$jscomp$loop$prop$offerId$85.getAttribute(f.$jscomp$loop$prop$sel$88.attribute));
                                    r.$jscomp$loop$prop$maxQty$86 = 999;
                                    if (!r.$jscomp$loop$prop$offerId$85) {
                                      try {
                                        var v = JSON.parse(f.$jscomp$loop$prop$sel$88.regExp);
                                        if (v.sel1) {
                                          try {
                                            var V = JSON.parse(q[n].querySelectorAll(v.sel1)[0].dataset[v.dataSet1]);
                                            r.$jscomp$loop$prop$offerId$85 = V[v.val1];
                                            r.$jscomp$loop$prop$maxQty$86 = V.maxQty;
                                          } catch (S) {
                                          }
                                        }
                                        if (!r.$jscomp$loop$prop$offerId$85 && v.sel2) {
                                          try {
                                            var C = JSON.parse(q[n].querySelectorAll(v.sel2)[0].dataset[v.dataSet2]);
                                            r.$jscomp$loop$prop$offerId$85 = C[v.val2];
                                            r.$jscomp$loop$prop$maxQty$86 = C.maxQty;
                                          } catch (S) {
                                          }
                                        }
                                      } catch (S) {
                                      }
                                    }
                                    if (A && r.$jscomp$loop$prop$offerId$85 && null != h) {
                                      y++;
                                      r.$jscomp$loop$prop$mapIndex$91 = n + "";
                                      r.$jscomp$loop$prop$isMAP$89 = !1;
                                      try {
                                        r.$jscomp$loop$prop$isMAP$89 = D[f.$jscomp$loop$prop$sel$88.parentList][r.$jscomp$loop$prop$mapIndex$91].isMAP || -1 != q[n].textContent.toLowerCase().indexOf("add to cart to see product details.");
                                      } catch (S) {
                                      }
                                      r.$jscomp$loop$prop$busy$90 = !0;
                                      r.$jscomp$loop$prop$currentASIN$84 = b.url.match(/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/)[1];
                                      null == r.$jscomp$loop$prop$currentASIN$84 || 9 > r.$jscomp$loop$prop$currentASIN$84.length || setTimeout(function(a, d) {
                                        return function() {
                                          c.addStockJob({type:"getStock", asin:a.$jscomp$loop$prop$currentASIN$84, oid:a.$jscomp$loop$prop$offerId$85, host:e.host, maxQty:a.$jscomp$loop$prop$maxQty$86, onlyMaxQty:9 == d.$jscomp$loop$prop$sel$88.reGroup, isMAP:a.$jscomp$loop$prop$isMAP$89, referer:e.host + "/dp/" + a.$jscomp$loop$prop$currentASIN$84, domainId:b.domainId, force:!0, session:h}, function(b) {
                                            a.$jscomp$loop$prop$busy$90 && (a.$jscomp$loop$prop$busy$90 = !1, "undefined" != typeof b && (D[d.$jscomp$loop$prop$sel$88.parentList][a.$jscomp$loop$prop$mapIndex$91][d.$jscomp$loop$prop$sel$88.name] = b), 0 == --y && u(z));
                                          });
                                          setTimeout(function() {
                                            a.$jscomp$loop$prop$busy$90 && 0 == --y && (a.$jscomp$loop$prop$busy$90 = !1, console.log("timeout " + a.$jscomp$loop$prop$offerId$85), u(z));
                                          }, 2000 + 1000 * y);
                                        };
                                      }(r, f), 1);
                                    }
                                  } catch (S) {
                                  }
                                } else {
                                  if ("revealMAP" == f.$jscomp$loop$prop$sel$88.name) {
                                    if (r.$jscomp$loop$prop$revealMAP$49$92 = f.$jscomp$loop$prop$sel$88, A = void 0, A = r.$jscomp$loop$prop$revealMAP$49$92.selector ? q[n].querySelector(r.$jscomp$loop$prop$revealMAP$49$92.selector) : q[n], null != A && A.textContent.match(new RegExp(r.$jscomp$loop$prop$revealMAP$49$92.regExp))) {
                                      A = b.url.match(/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/)[1];
                                      var B = d.$jscomp$loop$prop$pageFilter$79.sellerId;
                                      "undefined" == typeof B || null == B || null == A || 2 > A.length || (B = q[n].querySelector(f.$jscomp$loop$prop$sel$88.childNode).value, null == B || 20 > B + 0 || (A = r.$jscomp$loop$prop$revealMAP$49$92.altSelector.replace("OFFERID", B).replace("ASINID", A), y++, r.$jscomp$loop$prop$mapIndex$52$93 = n + "", p(A, "GET", null, 3000, function(a) {
                                        return function(b) {
                                          try {
                                            var c = d.$jscomp$loop$prop$pageFilter$79.price;
                                            if (c && c.regExp) {
                                              if (b.match(/no valid offer--/)) {
                                                D[a.$jscomp$loop$prop$revealMAP$49$92.parentList][a.$jscomp$loop$prop$mapIndex$52$93] || (D[a.$jscomp$loop$prop$revealMAP$49$92.parentList][a.$jscomp$loop$prop$mapIndex$52$93] = {}), D[a.$jscomp$loop$prop$revealMAP$49$92.parentList][a.$jscomp$loop$prop$mapIndex$52$93][a.$jscomp$loop$prop$revealMAP$49$92.name] = -1;
                                              } else {
                                                var e = b.match(new RegExp("price info--\x3e(?:.|\\n)*?" + c.regExp + "(?:.|\\n)*?\x3c!--")), f = b.match(/price info--\x3e(?:.|\n)*?(?:<span.*?size-small.*?">)([^]*?<\/span)(?:.|\n)*?\x3c!--/);
                                                if (!e || e.length < c.reGroup) {
                                                  t += " //  priceMAP regexp fail: " + (b + " - " + c.name + d.$jscomp$loop$prop$pageType$82);
                                                } else {
                                                  var h = e[c.reGroup];
                                                  D[a.$jscomp$loop$prop$revealMAP$49$92.parentList][a.$jscomp$loop$prop$mapIndex$52$93] || (D[a.$jscomp$loop$prop$revealMAP$49$92.parentList][a.$jscomp$loop$prop$mapIndex$52$93] = {});
                                                  D[a.$jscomp$loop$prop$revealMAP$49$92.parentList][a.$jscomp$loop$prop$mapIndex$52$93][a.$jscomp$loop$prop$revealMAP$49$92.name] = h;
                                                  null != f && 2 == f.length && (D[a.$jscomp$loop$prop$revealMAP$49$92.parentList][a.$jscomp$loop$prop$mapIndex$52$93][a.$jscomp$loop$prop$revealMAP$49$92.name + "Shipping"] = f[1].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                                }
                                              }
                                            }
                                          } catch (ha) {
                                          }
                                          0 == --y && 0 == g.length && u();
                                        };
                                      }(r), function() {
                                        0 == --y && 0 == g.length && u();
                                      })));
                                    }
                                  } else {
                                    A = x(f.$jscomp$loop$prop$sel$88, q[n], d.$jscomp$loop$prop$pageType$82);
                                    if (!1 === A) {
                                      break;
                                    }
                                    if (!0 !== A) {
                                      if (D[f.$jscomp$loop$prop$sel$88.parentList][n] || (D[f.$jscomp$loop$prop$sel$88.parentList][n] = {}), f.$jscomp$loop$prop$sel$88.multiple) {
                                        for (var R in A) {
                                          A.hasOwnProperty(R) && !f.$jscomp$loop$prop$sel$88.keepBR && (A[R] = A[R].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                        }
                                        A = A.join("\u271c\u271c");
                                        D[f.$jscomp$loop$prop$sel$88.parentList][n][f.$jscomp$loop$prop$sel$88.name] = A;
                                      } else {
                                        D[f.$jscomp$loop$prop$sel$88.parentList][n][f.$jscomp$loop$prop$sel$88.name] = f.$jscomp$loop$prop$sel$88.keepBR ? A : A.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                                      }
                                    }
                                  }
                                }
                              }
                              r = {$jscomp$loop$prop$currentASIN$84:r.$jscomp$loop$prop$currentASIN$84, $jscomp$loop$prop$offerId$85:r.$jscomp$loop$prop$offerId$85, $jscomp$loop$prop$maxQty$86:r.$jscomp$loop$prop$maxQty$86, $jscomp$loop$prop$isMAP$89:r.$jscomp$loop$prop$isMAP$89, $jscomp$loop$prop$busy$90:r.$jscomp$loop$prop$busy$90, $jscomp$loop$prop$mapIndex$91:r.$jscomp$loop$prop$mapIndex$91, $jscomp$loop$prop$revealMAP$49$92:r.$jscomp$loop$prop$revealMAP$49$92, $jscomp$loop$prop$mapIndex$52$93:r.$jscomp$loop$prop$mapIndex$52$93};
                            }
                          } else {
                            q = x(f.$jscomp$loop$prop$sel$88, k, d.$jscomp$loop$prop$pageType$82);
                            if (!1 === q) {
                              break;
                            }
                            if (!0 !== q) {
                              if (f.$jscomp$loop$prop$sel$88.multiple) {
                                for (var E in q) {
                                  q.hasOwnProperty(E) && !f.$jscomp$loop$prop$sel$88.keepBR && (q[E] = q[E].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                }
                                q = q.join();
                              } else {
                                f.$jscomp$loop$prop$sel$88.keepBR || (q = q.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                              }
                              O[f.$jscomp$loop$prop$sel$88.name] = q;
                            }
                          }
                        }
                        f = {$jscomp$loop$prop$sel$88:f.$jscomp$loop$prop$sel$88};
                      }
                      try {
                        if (1 == g.length || "500".endsWith("8") && 0 < g.length) {
                          g.shift()();
                        } else {
                          for (f = 0; f < g.length; f++) {
                            setTimeout(function() {
                              0 < g.length && g.shift()();
                            }, 500 * f);
                          }
                        }
                      } catch (S) {
                      }
                      0 == y && 0 == g.length && u();
                    };
                  }(f);
                  if (f.$jscomp$loop$prop$revealMAP$99) {
                    if (g = w.querySelector(f.$jscomp$loop$prop$revealMAP$99.selector), null != g) {
                      f.$jscomp$loop$prop$url$100 = g.getAttribute(f.$jscomp$loop$prop$revealMAP$99.attribute);
                      if (null == f.$jscomp$loop$prop$url$100 || 0 == f.$jscomp$loop$prop$url$100.length) {
                        f.$jscomp$loop$prop$afterAjaxFinished$102();
                        break;
                      }
                      0 != f.$jscomp$loop$prop$url$100.indexOf("http") && (g = document.createElement("a"), g.href = b.url, f.$jscomp$loop$prop$url$100 = g.origin + f.$jscomp$loop$prop$url$100);
                      O[f.$jscomp$loop$prop$revealMAP$99.name] = "1";
                      f.$jscomp$loop$prop$url$100 = f.$jscomp$loop$prop$url$100.replace(/(mapPopover.*?)(false)/, "$1true");
                      f.$jscomp$loop$prop$xhr$97 = new XMLHttpRequest;
                      f.$jscomp$loop$prop$hasTimeout$96 = !1;
                      f.$jscomp$loop$prop$ti$98 = setTimeout(function(a) {
                        return function() {
                          a.$jscomp$loop$prop$hasTimeout$96 = !0;
                          a.$jscomp$loop$prop$afterAjaxFinished$102();
                        };
                      }(f), 4000);
                      f.$jscomp$loop$prop$xhr$97.onreadystatechange = function(a) {
                        return function() {
                          if (!a.$jscomp$loop$prop$hasTimeout$96 && 4 == a.$jscomp$loop$prop$xhr$97.readyState) {
                            clearTimeout(a.$jscomp$loop$prop$ti$98);
                            if (200 == a.$jscomp$loop$prop$xhr$97.status) {
                              var b = a.$jscomp$loop$prop$xhr$97.responseText;
                              if (a.$jscomp$loop$prop$revealMAP$99.regExp) {
                                var c = b.match(new RegExp(a.$jscomp$loop$prop$revealMAP$99.regExp));
                                if (!c || c.length < a.$jscomp$loop$prop$revealMAP$99.reGroup) {
                                  if (c = w.querySelector(a.$jscomp$loop$prop$revealMAP$99.selector)) {
                                    var e = c.cloneNode(!1);
                                    e.innerHTML = b;
                                    c.parentNode.replaceChild(e, c);
                                  }
                                } else {
                                  O[a.$jscomp$loop$prop$revealMAP$99.name] = c[a.$jscomp$loop$prop$revealMAP$99.reGroup], O[a.$jscomp$loop$prop$revealMAP$99.name + "url"] = a.$jscomp$loop$prop$url$100;
                                }
                              }
                            }
                            a.$jscomp$loop$prop$revealed$101 = !0;
                            a.$jscomp$loop$prop$afterAjaxFinished$102();
                          }
                        };
                      }(f);
                      f.$jscomp$loop$prop$xhr$97.onerror = f.$jscomp$loop$prop$afterAjaxFinished$102;
                      f.$jscomp$loop$prop$xhr$97.open("GET", f.$jscomp$loop$prop$url$100, !0);
                      f.$jscomp$loop$prop$xhr$97.send();
                    } else {
                      f.$jscomp$loop$prop$afterAjaxFinished$102();
                    }
                  } else {
                    f.$jscomp$loop$prop$afterAjaxFinished$102();
                  }
                  g = !0;
                }
              }
              f = {$jscomp$loop$prop$pageFilter$79:f.$jscomp$loop$prop$pageFilter$79, $jscomp$loop$prop$pageVersionTest$80:f.$jscomp$loop$prop$pageVersionTest$80, $jscomp$loop$prop$revealed$101:f.$jscomp$loop$prop$revealed$101, $jscomp$loop$prop$pageType$82:f.$jscomp$loop$prop$pageType$82, $jscomp$loop$prop$hasTimeout$96:f.$jscomp$loop$prop$hasTimeout$96, $jscomp$loop$prop$afterAjaxFinished$102:f.$jscomp$loop$prop$afterAjaxFinished$102, $jscomp$loop$prop$xhr$97:f.$jscomp$loop$prop$xhr$97, $jscomp$loop$prop$ti$98:f.$jscomp$loop$prop$ti$98, 
              $jscomp$loop$prop$revealMAP$99:f.$jscomp$loop$prop$revealMAP$99, $jscomp$loop$prop$url$100:f.$jscomp$loop$prop$url$100};
            }
            a(8);
            if (null == B) {
              q += " // no pageVersion matched";
              z.payload = [t, q, b.dbg1 ? y : ""];
              z.status = 308;
              a(10);
              try {
                b.stats.times.push(99), b.stats.times.push(k.lastBugReport);
              } catch (V) {
              }
              "undefined" == typeof b.sent && (z = d(b, z), n.sendMessage(z));
            }
          } else {
            a(9), z.status = 306, "undefined" == typeof b.sent && (z = d(b, z), n.sendMessage(z));
          }
        }
      });
    }
    function l(b, c, e) {
      if (null != L && !I) {
        I = !0;
        for (var d = 1; d < L.length; d++) {
          var w = L[d];
          try {
            for (var g = window, f = 0; f < w.path.length - 1; f++) {
              g = g[w.path[f]];
            }
            if (w.b) {
              g[w.path[f]](P[w.index], w.a, w.b);
            } else {
              g[w.path[f]](P[w.index], w.a);
            }
          } catch (R) {
          }
        }
        h.console.clear();
      }
      J = b;
      var y = b.messageId;
      setTimeout(function() {
        null != J && J.messageId == y && (J = J = null);
      }, b.timeout);
      b.onDoneC = function() {
        J = null;
      };
      if (c) {
        a(11), c = document.getElementById("keepa_data"), c.removeAttribute("srcdoc"), c.src = b.url;
      } else {
        if (1 == b.httpMethod && (b.scrapeFilters && 0 < b.scrapeFilters.length && (G = b), !K && (K = !0, b.l && 0 < b.l.length))) {
          L = b.l;
          I = !0;
          for (c = 0; c < b.l.length; c++) {
            d = b.l[c];
            try {
              w = window;
              for (g = 0; g < d.path.length - 1; g++) {
                w = w[d.path[g]];
              }
              if (d.b) {
                w[d.path[g]](P[d.index], d.a, d.b);
              } else {
                w[d.path[g]](P[d.index], d.a);
              }
            } catch (R) {
            }
          }
          h.console.clear();
        }
        p(b.url, N[b.httpMethod], b.postData, b.timeout, function(c) {
          a(12);
          if ("o0" == b.key) {
            e(c);
          } else {
            var d = document.getElementById("keepa_data_2");
            d.src = "";
            c = c.replace(/src=".*?"/g, 'src=""');
            if (null != m) {
              m.block && (c = c.replace(new RegExp(m.block, "g"), ""));
              a(13);
              var f = !1;
              d.srcdoc = c;
              a(18);
              d.onload = function() {
                a(19);
                f || (d.onload = void 0, f = !0, a(20), setTimeout(function() {
                  a(21);
                  var b = document.getElementById("keepa_data_2").contentWindow;
                  try {
                    e(b.document, c);
                  } catch (ca) {
                    k.reportBug(ca), E(410);
                  }
                }, 80));
              };
            }
            h.console.clear();
          }
        });
      }
    }
    function g() {
      try {
        var a = document.getElementById("keepa_data");
        a.src = "";
        a.removeAttribute("srcdoc");
      } catch (q) {
      }
      try {
        var b = document.getElementById("keepa_data_2");
        b.src = "";
        b.removeAttribute("srcdoc");
      } catch (q) {
      }
      J = null;
    }
    function p(b, c, d, e, h) {
      var g = new XMLHttpRequest;
      if (h) {
        var f = !1, w = setTimeout(function() {
          f = !0;
          u.abortJob(413);
        }, e || 15000);
        g.onreadystatechange = function() {
          f || (2 == g.readyState && a(27), 4 == g.readyState && (clearTimeout(w), a(29), 503 != g.status && (0 == g.status || 399 < g.status) ? u.abortJob(415, [g.status]) : 0 == g.responseText.length && c == N[0] ? u.abortJob(416) : h.call(this, g.responseText)));
        };
        g.onerror = function() {
          u.abortJob(408);
        };
      }
      g.open(c, b, !0);
      null == d ? g.send() : g.send(d);
    }
    function x(a) {
      var b = "", c = "", d;
      for (d in a[F]) {
        var e = a[F][d];
        "-" != e && (b += c + d + "=" + e + ";", c = " ");
      }
      return b;
    }
    function B(a) {
      delete C["" + a];
      localStorage.cache = pako.deflate(JSON.stringify(C), {to:"string"});
    }
    function E(a, b) {
      if (null != m) {
        try {
          if ("undefined" != typeof m.sent) {
            return;
          }
          var c = d(m, {});
          b && (c.payload = b);
          c.status = a;
          n.sendMessage(c);
          g();
        } catch (D) {
          k.reportBug(D, "abort");
        }
      }
      h.console.clear();
    }
    var G = null, m = null, H = /automated access|api-services-support@/, P = [function(a) {
    }, function(a) {
      if (null != m) {
        var b = !0;
        if (m.url == a.url) {
          M = a.frameId, T = a.tabId, W = a.parentFrameId, b = !1;
        } else {
          if (M == a.parentFrameId || W == a.parentFrameId || M == a.frameId) {
            b = !1;
          }
        }
        if (-2 != M && T == a.tabId) {
          a = a.requestHeaders;
          var c = {};
          if (!a.find(function(a) {
            return "krequestid" === a.name;
          })) {
            "" === m.headers.Cookie && (b = !0);
            (m.timeout + "").endsWith("108") || (m.headers.Cookie = b ? "" : Q);
            for (var d in m.headers) {
              b = !1;
              for (var e = 0; e < a.length; ++e) {
                if (a[e].name.toLowerCase() == d.toLowerCase()) {
                  "" == m.headers[d] ? (a.splice(e, 1), e--) : a[e].value = m.headers[d];
                  b = !0;
                  break;
                }
              }
              b || "" == m.headers[d] || a.push({name:t ? d.toLowerCase() : d, value:m.headers[d]});
            }
            c.requestHeaders = a;
            return c;
          }
        }
      }
    }, function(a) {
      var b = a.responseHeaders;
      try {
        if (T != a.tabId || null == m || b.find(function(a) {
          return "krequestid" === a.name;
        })) {
          return;
        }
        for (var d = (m.timeout + "").endsWith("108"), e = !1, h = [], g = 0; g < b.length; g++) {
          var f = b[g], l = f.name.toLowerCase();
          "set-cookie" == l ? (-1 < f.value.indexOf("xpires") && c.parseCookieHeader(h, f.value), d || b.splice(g--, 1)) : "x-frame-options" == l && (b.splice(g, 1), g--);
        }
        for (g = 0; g < h.length; g++) {
          var k = h[g];
          if ("undefined" == typeof C[F][k[0]] || C[F][k[0]] != k[1]) {
            e = !0, C[F][k[0]] = k[1];
          }
        }
        !d && e && m.url == a.url && (localStorage.cache = pako.deflate(JSON.stringify(C), {to:"string"}), Q = x(C));
      } catch (ea) {
      }
      return {responseHeaders:b};
    }, function(a) {
      if (null != m && m.url == a.url) {
        var b = 0;
        switch(a.error) {
          case "net::ERR_TUNNEL_CONNECTION_FAILED":
            b = 510;
            break;
          case "net::ERR_INSECURE_RESPONSE":
            b = 511;
            break;
          case "net::ERR_CONNECTION_REFUSED":
            b = 512;
            break;
          case "net::ERR_BAD_SSL_CLIENT_AUTH_CERT":
            b = 513;
            break;
          case "net::ERR_CONNECTION_CLOSED":
            b = 514;
            break;
          case "net::ERR_NAME_NOT_RESOLVED":
            b = 515;
            break;
          case "net::ERR_NAME_RESOLUTION_FAILED":
            b = 516;
            break;
          case "net::ERR_ABORTED":
          case "net::ERR_CONNECTION_ABORTED":
            b = 517;
            break;
          case "net::ERR_CONTENT_DECODING_FAILED":
            b = 518;
            break;
          case "net::ERR_NETWORK_ACCESS_DENIED":
            b = 519;
            break;
          case "net::ERR_NETWORK_CHANGED":
            b = 520;
            break;
          case "net::ERR_INCOMPLETE_CHUNKED_ENCODING":
            b = 521;
            break;
          case "net::ERR_CONNECTION_TIMED_OUT":
          case "net::ERR_TIMED_OUT":
            b = 522;
            break;
          case "net::ERR_CONNECTION_RESET":
            b = 523;
            break;
          case "net::ERR_NETWORK_IO_SUSPENDED":
            b = 524;
            break;
          case "net::ERR_EMPTY_RESPONSE":
            b = 525;
            break;
          case "net::ERR_SSL_PROTOCOL_ERROR":
            b = 526;
            break;
          case "net::ERR_ADDRESS_UNREACHABLE":
            b = 527;
            break;
          case "net::ERR_INTERNET_DISCONNECTED":
            b = 528;
            break;
          case "net::ERR_BLOCKED_BY_ADMINISTRATOR":
            b = 529;
            break;
          case "net::ERR_SSL_VERSION_OR_CIPHER_MISMATCH":
            b = 530;
            break;
          case "net::ERR_CONTENT_LENGTH_MISMATCH":
            b = 531;
            break;
          case "net::ERR_PROXY_CONNECTION_FAILED":
            b = 532;
            break;
          default:
            b = 533;
            return;
        }
        setTimeout(function() {
          u.setStatTime(33);
          u.abortJob(b);
        }, 0);
      }
    }], K = !1, I = !1, L = null, J = null, N = ["GET", "HEAD", "POST", "PUT", "DELETE"], C = {}, Q = "", F = 1;
    try {
      localStorage.cache && (C = JSON.parse(pako.inflate(localStorage.cache, {to:"string"})));
    } catch (y) {
      setTimeout(function() {
        k.reportBug(y, pako.inflate(localStorage.cache, {to:"string"}));
      }, 2000);
    }
    var M = -2, T = -2, W = -2;
    return {onMessage:function(a) {
      "hhhh" == a.key && chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
        if (null != m) {
          var b = !0;
          m.url == a.url && (M = a.frameId, T = a.tabId, W = a.parentFrameId, b = !1);
          if (-2 != M && M == a.frameId && T == a.tabId && W == a.parentFrameId) {
            a = a.requestHeaders;
            var c = {};
            (m.timeout + "").endsWith("108") || (m.headers.Cookie = b ? "" : Q);
            for (var d in m.headers) {
              b = !1;
              for (var e = 0; e < a.length; ++e) {
                if (a[e].name.toLowerCase() == d.toLowerCase()) {
                  "" == m.headers[d] ? a.splice(e, 1) : a[e].value = m.headers[d];
                  b = !0;
                  break;
                }
              }
              b || "" == m.headers[d] || a.push({name:t ? d.toLowerCase() : d, value:m.headers[d]});
            }
            c.requestHeaders = a;
            return c;
          }
        }
      }, {urls:["<all_urls>"]}, ["blocking", "requestHeaders"]);
      switch(a.key) {
        case "o0":
        case "o1":
          m = a, m.stats = {start:Date.now(), times:[]};
      }
      switch(a.key) {
        case "update":
          chrome.runtime.requestUpdateCheck(function(a, b) {
            "update_available" == a && chrome.runtime.reload();
          });
          break;
        case "o0":
          u.clearIframe();
          e(a);
          break;
        case "o1":
          u.clearIframe();
          b(a);
          break;
        case "o2":
          B(a.domainId);
          break;
        case "1":
          document.location.reload(!1);
      }
    }, clearIframe:g, endSession:B, getOutgoingMessage:d, setStatTime:a, getFilters:function() {
      return G;
    }, getMessage:function() {
      return m;
    }, clearMessage:function() {
      m = null;
      if (null != L && I) {
        I = !1;
        for (var a = 1; a < L.length; a++) {
          var b = L[a];
          if (b) {
            try {
              for (var c = window, d = 0; d < b.path.length - 1; d++) {
                c = c[b.path[d]];
              }
              c.removeListener(P[b.index]);
            } catch (O) {
            }
          }
        }
        h.console.clear();
      }
    }, abortJob:E};
  }();
})();

