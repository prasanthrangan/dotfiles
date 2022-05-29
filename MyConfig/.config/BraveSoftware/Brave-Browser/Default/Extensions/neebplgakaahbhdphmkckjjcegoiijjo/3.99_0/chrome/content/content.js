var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(c) {
  var n = 0;
  return function() {
    return n < c.length ? {done:!1, value:c[n++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(c) {
  return {next:$jscomp.arrayIteratorImpl(c)};
};
$jscomp.makeIterator = function(c) {
  var n = "undefined" != typeof Symbol && Symbol.iterator && c[Symbol.iterator];
  return n ? n.call(c) : $jscomp.arrayIterator(c);
};
$jscomp.arrayFromIterator = function(c) {
  for (var n, g = []; !(n = c.next()).done;) {
    g.push(n.value);
  }
  return g;
};
$jscomp.arrayFromIterable = function(c) {
  return c instanceof Array ? c : $jscomp.arrayFromIterator($jscomp.makeIterator(c));
};
$jscomp.checkStringArgs = function(c, n, g) {
  if (null == c) {
    throw new TypeError("The 'this' value for String.prototype." + g + " must not be null or undefined");
  }
  if (n instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + g + " must not be a regular expression");
  }
  return c + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, n, g) {
  c != Array.prototype && c != Object.prototype && (c[n] = g.value);
};
$jscomp.getGlobal = function(c) {
  return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(c, n, g, l) {
  if (n) {
    g = $jscomp.global;
    c = c.split(".");
    for (l = 0; l < c.length - 1; l++) {
      var u = c[l];
      u in g || (g[u] = {});
      g = g[u];
    }
    c = c[c.length - 1];
    l = g[c];
    n = n(l);
    n != l && null != n && $jscomp.defineProperty(g, c, {configurable:!0, writable:!0, value:n});
  }
};
$jscomp.polyfill("String.prototype.startsWith", function(c) {
  return c ? c : function(c, g) {
    var l = $jscomp.checkStringArgs(this, c, "startsWith");
    c += "";
    var n = l.length, q = c.length;
    g = Math.max(0, Math.min(g | 0, l.length));
    for (var G = 0; G < q && g < n;) {
      if (l[g++] != c[G++]) {
        return !1;
      }
    }
    return G >= q;
  };
}, "es6", "es3");
$jscomp.owns = function(c, n) {
  return Object.prototype.hasOwnProperty.call(c, n);
};
$jscomp.assign = "function" == typeof Object.assign ? Object.assign : function(c, n) {
  for (var g = 1; g < arguments.length; g++) {
    var l = arguments[g];
    if (l) {
      for (var u in l) {
        $jscomp.owns(l, u) && (c[u] = l[u]);
      }
    }
  }
  return c;
};
$jscomp.polyfill("Object.assign", function(c) {
  return c || $jscomp.assign;
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(c) {
  return c ? c : function(c, g) {
    return c === g ? 0 !== c || 1 / c === 1 / g : c !== c && g !== g;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(c) {
  return c ? c : function(c, g) {
    var l = this;
    l instanceof String && (l = String(l));
    var n = l.length;
    g = g || 0;
    for (0 > g && (g = Math.max(g + n, 0)); g < n; g++) {
      var q = l[g];
      if (q === c || Object.is(q, c)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
$jscomp.polyfill("String.prototype.includes", function(c) {
  return c ? c : function(c, g) {
    return -1 !== $jscomp.checkStringArgs(this, c, "includes").indexOf(c, g || 0);
  };
}, "es6", "es3");
var onlyStock = !1, scanner = function() {
  function c(c, g, q, n, H, B) {
    var l = new XMLHttpRequest, u = !1, f = setTimeout(function() {
      u = !0;
      B();
    }, n || 4000);
    l.onreadystatechange = function() {
      u || (clearTimeout(f), H(l));
    };
    l.onerror = B;
    l.open(g, c, !0);
    null == q ? l.send() : l.send(q);
  }
  function n(l, g) {
    var q = {};
    if (null == document.body) {
      q.status = 599, g(q);
    } else {
      if (document.body.textContent.match("you're not a robot")) {
        q.status = 403, g(q);
      } else {
        for (var n = document.evaluate("//comment()", document, null, XPathResult.ANY_TYPE, null), u = n.iterateNext(), B = ""; u;) {
          B += u, u = n.iterateNext();
        }
        if (B.match(/automated access|api-services-support@/)) {
          q.status = 403, g(q);
        } else {
          if (B.match(/ref=cs_503_link/)) {
            q.status = 503, g(q);
          } else {
            var A = 0;
            if (l.scrapeFilters && 0 < l.scrapeFilters.length) {
              n = {};
              u = null;
              var y = "", f = null, v = {}, x = {}, I = !1, t = function(a, b, e) {
                var h = [];
                if (!a.selector) {
                  if (!a.regExp) {
                    return y = "invalid selector, sel/regexp", !1;
                  }
                  var d = document.getElementsByTagName("html")[0].innerHTML.match(new RegExp(a.regExp, "i"));
                  if (!d || d.length < a.reGroup) {
                    d = "regexp fail: html - " + a.name + e;
                    if (!1 === a.optional) {
                      return y = d, !1;
                    }
                    f += " // " + d;
                    return !0;
                  }
                  return d[a.reGroup];
                }
                d = b.querySelectorAll(a.selector);
                0 == d.length && (d = b.querySelectorAll(a.altSelector));
                if (0 == d.length) {
                  if (!0 === a.optional) {
                    return !0;
                  }
                  y = "selector no match: " + a.name + e;
                  return !1;
                }
                if (a.parentSelector && (d = [d[0].parentNode.querySelector(a.parentSelector)], null == d[0])) {
                  if (!0 === a.optional) {
                    return !0;
                  }
                  y = "parent selector no match: " + a.name + e;
                  return !1;
                }
                if ("undefined" != typeof a.multiple && null != a.multiple && (!0 === a.multiple && 1 > d.length || !1 === a.multiple && 1 < d.length)) {
                  if (!I) {
                    return I = !0, t(a, b, e);
                  }
                  e = "selector multiple mismatch: " + a.name + e + " found: " + d.length;
                  if (!1 === a.optional) {
                    a = "";
                    for (var r in d) {
                      !d.hasOwnProperty(r) || 1000 < a.length || (a += " - " + r + ": " + d[r].outerHTML + " " + d[r].getAttribute("class") + " " + d[r].getAttribute("id"));
                    }
                    y = e + a + " el: " + b.getAttribute("class") + " " + b.getAttribute("id");
                    return !1;
                  }
                  f += " // " + e;
                  return !0;
                }
                if (a.isListSelector) {
                  return v[a.name] = d, !0;
                }
                if (!a.attribute) {
                  return y = "selector attribute undefined?: " + a.name + e, !1;
                }
                for (var k in d) {
                  if (d.hasOwnProperty(k)) {
                    b = d[k];
                    if (!b) {
                      break;
                    }
                    if (a.childNode) {
                      a.childNode = Number(a.childNode);
                      b = b.childNodes;
                      if (b.length < a.childNode) {
                        d = "childNodes fail: " + b.length + " - " + a.name + e;
                        if (!1 === a.optional) {
                          return y = d, !1;
                        }
                        f += " // " + d;
                        return !0;
                      }
                      b = b[a.childNode];
                    }
                    b = "text" == a.attribute ? b.textContent : "html" == a.attribute ? b.innerHTML : b.getAttribute(a.attribute);
                    if (!b || 0 == b.length || 0 == b.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "").length) {
                      d = "selector attribute null: " + a.name + e;
                      if (!1 === a.optional) {
                        return y = d, !1;
                      }
                      f += " // " + d;
                      return !0;
                    }
                    if (a.regExp) {
                      r = b.match(new RegExp(a.regExp, "i"));
                      if (!r || r.length < a.reGroup) {
                        d = "regexp fail: " + b + " - " + a.name + e;
                        if (!1 === a.optional) {
                          return y = d, !1;
                        }
                        f += " // " + d;
                        return !0;
                      }
                      h.push(r[a.reGroup]);
                    } else {
                      h.push(b);
                    }
                    if (!a.multiple) {
                      break;
                    }
                  }
                }
                d = h;
                a.multiple || (d = h[0]);
                return d;
              };
              B = document;
              var a = !1, b = {}, r;
              for (r in l.scrapeFilters) {
                b.$jscomp$loop$prop$pageType$70 = r;
                a: {
                  if (a) {
                    break;
                  }
                  b.$jscomp$loop$prop$pageFilter$67 = l.scrapeFilters[b.$jscomp$loop$prop$pageType$70];
                  var k = b.$jscomp$loop$prop$pageFilter$67.pageVersionTest, h = document.querySelectorAll(k.selector);
                  0 == h.length && (h = document.querySelectorAll(k.altSelector));
                  if (0 != h.length) {
                    if ("undefined" != typeof k.multiple && null != k.multiple) {
                      if (!0 === k.multiple && 2 > h.length) {
                        break a;
                      }
                      if (!1 === k.multiple && 1 < h.length) {
                        break a;
                      }
                    }
                    if (k.attribute) {
                      var e = null;
                      e = "text" == k.attribute ? "" : h[0].getAttribute(k.attribute);
                      if (null == e) {
                        break a;
                      }
                    }
                    u = b.$jscomp$loop$prop$pageType$70;
                    h = {};
                    for (var d in b.$jscomp$loop$prop$pageFilter$67) {
                      if (a) {
                        break;
                      }
                      h.$jscomp$loop$prop$sel$63 = b.$jscomp$loop$prop$pageFilter$67[d];
                      if (h.$jscomp$loop$prop$sel$63.name != k.name) {
                        if (h.$jscomp$loop$prop$sel$63.parentList) {
                          e = [];
                          if ("undefined" != typeof v[h.$jscomp$loop$prop$sel$63.parentList]) {
                            e = v[h.$jscomp$loop$prop$sel$63.parentList];
                          } else {
                            if (!0 === t(b.$jscomp$loop$prop$pageFilter$67[h.$jscomp$loop$prop$sel$63.parentList], B, b.$jscomp$loop$prop$pageType$70)) {
                              e = v[h.$jscomp$loop$prop$sel$63.parentList];
                            } else {
                              break;
                            }
                          }
                          x[h.$jscomp$loop$prop$sel$63.parentList] || (x[h.$jscomp$loop$prop$sel$63.parentList] = []);
                          var C = 0, w = {}, z;
                          for (z in e) {
                            if (a) {
                              break;
                            }
                            if (e.hasOwnProperty(z)) {
                              if ("lager" == h.$jscomp$loop$prop$sel$63.name) {
                                C++;
                                try {
                                  var m = void 0, p = void 0;
                                  h.$jscomp$loop$prop$sel$63.selector && (m = e[z].querySelector(h.$jscomp$loop$prop$sel$63.selector));
                                  h.$jscomp$loop$prop$sel$63.altSelector && (p = e[z].querySelector(h.$jscomp$loop$prop$sel$63.altSelector));
                                  p && (p = p.getAttribute(h.$jscomp$loop$prop$sel$63.attribute));
                                  var D = 999, L = !1;
                                  try {
                                    L = -1 != e[z].textContent.toLowerCase().indexOf("add to cart to see product details.");
                                  } catch (J) {
                                  }
                                  if (!p) {
                                    try {
                                      var E = JSON.parse(h.$jscomp$loop$prop$sel$63.regExp);
                                      if (E.sel1) {
                                        try {
                                          var P = JSON.parse(e[z].querySelectorAll(E.sel1)[0].dataset[E.dataSet1]);
                                          p = P[E.val1];
                                          D = P.maxQty;
                                        } catch (J) {
                                        }
                                      }
                                      if (!p && E.sel2) {
                                        try {
                                          var Q = JSON.parse(e[z].querySelectorAll(E.sel2)[0].dataset[E.dataSet2]);
                                          p = Q[E.val2];
                                          D = Q.maxQty;
                                        } catch (J) {
                                        }
                                      }
                                    } catch (J) {
                                    }
                                  }
                                  if (m) {
                                    A++;
                                    w.$jscomp$loop$prop$mapIndex$64 = z + "";
                                    w.$jscomp$loop$prop$busy$65 = !0;
                                    var F = document.location.href.match(/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/)[1];
                                    F = F[1];
                                    null == F || 9 > F.length || (chrome.runtime.sendMessage({type:"getStock", asin:F, oid:p, maxQty:D, isMAP:L, host:document.location.hostname, referer:document.location + "", domainId:l.domainId, force:!0, session:"unknown"}, function(a, b) {
                                      return function(d) {
                                        a.$jscomp$loop$prop$busy$65 && (a.$jscomp$loop$prop$busy$65 = !1, "undefined" != typeof d && (d.error ? console.log(d.error) : (x[b.$jscomp$loop$prop$sel$63.parentList][a.$jscomp$loop$prop$mapIndex$64][b.$jscomp$loop$prop$sel$63.name] = d, 0 == --A && g(q))));
                                      };
                                    }(w, h)), setTimeout(function(a) {
                                      return function() {
                                        a.$jscomp$loop$prop$busy$65 && 0 == --A && (a.$jscomp$loop$prop$busy$65 = !1, g(q));
                                      };
                                    }(w), 2000));
                                  }
                                } catch (J) {
                                }
                              } else {
                                if ("revealMAP" == h.$jscomp$loop$prop$sel$63.name) {
                                  w.$jscomp$loop$prop$revealMAP$68 = h.$jscomp$loop$prop$sel$63, m = void 0, m = w.$jscomp$loop$prop$revealMAP$68.selector ? e[z].querySelector(w.$jscomp$loop$prop$revealMAP$68.selector) : e[z], null != m && m.textContent.match(new RegExp(w.$jscomp$loop$prop$revealMAP$68.regExp, "i")) && (m = document.location.href.match(/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/), m = m[1], p = b.$jscomp$loop$prop$pageFilter$67.sellerId, "undefined" == typeof p || null == p || null == m || 
                                  2 > m.length || (p = e[z].querySelector('input[name="oid"]').value, null == p || 20 > p + 0 || (m = w.$jscomp$loop$prop$revealMAP$68.altSelector.replace("OFFERID", p).replace("ASINID", m), A++, w.$jscomp$loop$prop$mapIndex$14$69 = z + "", c(m, "GET", null, 3000, function(a, b) {
                                    return function(d) {
                                      if (4 == d.readyState) {
                                        A--;
                                        if (200 == d.status) {
                                          try {
                                            var e = d.responseText, h = a.$jscomp$loop$prop$pageFilter$67.price;
                                            if (h && h.regExp) {
                                              if (e.match(/no valid offer--/)) {
                                                x[b.$jscomp$loop$prop$revealMAP$68.parentList][b.$jscomp$loop$prop$mapIndex$14$69] || (x[b.$jscomp$loop$prop$revealMAP$68.parentList][b.$jscomp$loop$prop$mapIndex$14$69] = {}), x[b.$jscomp$loop$prop$revealMAP$68.parentList][b.$jscomp$loop$prop$mapIndex$14$69][b.$jscomp$loop$prop$revealMAP$68.name] = -1;
                                              } else {
                                                var r = e.match(new RegExp("price info--\x3e(?:.|\\n)*?" + h.regExp + "(?:.|\\n)*?\x3c!--")), k = e.match(/price info--\x3e(?:.|\n)*?(?:<span.*?size-small.*?">)([^]*?<\/span)(?:.|\n)*?\x3c!--/);
                                                if (!r || r.length < h.reGroup) {
                                                  f += " //  priceMAP regexp fail: " + (e + " - " + h.name + a.$jscomp$loop$prop$pageType$70);
                                                } else {
                                                  var c = r[h.reGroup];
                                                  x[b.$jscomp$loop$prop$revealMAP$68.parentList][b.$jscomp$loop$prop$mapIndex$14$69] || (x[b.$jscomp$loop$prop$revealMAP$68.parentList][b.$jscomp$loop$prop$mapIndex$14$69] = {});
                                                  x[b.$jscomp$loop$prop$revealMAP$68.parentList][b.$jscomp$loop$prop$mapIndex$14$69][b.$jscomp$loop$prop$revealMAP$68.name] = c;
                                                  null != k && 2 == k.length && (x[b.$jscomp$loop$prop$revealMAP$68.parentList][b.$jscomp$loop$prop$mapIndex$14$69][b.$jscomp$loop$prop$revealMAP$68.name + "Shipping"] = k[1].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                                }
                                              }
                                            }
                                          } catch (U) {
                                          }
                                        }
                                        0 == A && g(q);
                                      }
                                    };
                                  }(b, w), function() {
                                    0 == --A && g(q);
                                  }))));
                                } else {
                                  m = t(h.$jscomp$loop$prop$sel$63, e[z], b.$jscomp$loop$prop$pageType$70);
                                  if (!1 === m) {
                                    a = !0;
                                    break;
                                  }
                                  if (!0 !== m) {
                                    if (x[h.$jscomp$loop$prop$sel$63.parentList][z] || (x[h.$jscomp$loop$prop$sel$63.parentList][z] = {}), h.$jscomp$loop$prop$sel$63.multiple) {
                                      for (var K in m) {
                                        m.hasOwnProperty(K) && !h.$jscomp$loop$prop$sel$63.keepBR && (m[K] = m[K].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                      }
                                      m = m.join("\u271c\u271c");
                                      x[h.$jscomp$loop$prop$sel$63.parentList][z][h.$jscomp$loop$prop$sel$63.name] = m;
                                    } else {
                                      x[h.$jscomp$loop$prop$sel$63.parentList][z][h.$jscomp$loop$prop$sel$63.name] = h.$jscomp$loop$prop$sel$63.keepBR ? m : m.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                                    }
                                  }
                                }
                              }
                            }
                            w = {$jscomp$loop$prop$busy$65:w.$jscomp$loop$prop$busy$65, $jscomp$loop$prop$mapIndex$64:w.$jscomp$loop$prop$mapIndex$64, $jscomp$loop$prop$revealMAP$68:w.$jscomp$loop$prop$revealMAP$68, $jscomp$loop$prop$mapIndex$14$69:w.$jscomp$loop$prop$mapIndex$14$69};
                          }
                        } else {
                          e = t(h.$jscomp$loop$prop$sel$63, B, b.$jscomp$loop$prop$pageType$70);
                          if (!1 === e) {
                            a = !0;
                            break;
                          }
                          if (!0 !== e) {
                            if (h.$jscomp$loop$prop$sel$63.multiple) {
                              for (var M in e) {
                                e.hasOwnProperty(M) && !h.$jscomp$loop$prop$sel$63.keepBR && (e[M] = e[M].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                              }
                              e = e.join();
                            } else {
                              h.$jscomp$loop$prop$sel$63.keepBR || (e = e.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                            }
                            n[h.$jscomp$loop$prop$sel$63.name] = e;
                          }
                        }
                      }
                      h = {$jscomp$loop$prop$sel$63:h.$jscomp$loop$prop$sel$63};
                    }
                    a = !0;
                  }
                }
                b = {$jscomp$loop$prop$pageFilter$67:b.$jscomp$loop$prop$pageFilter$67, $jscomp$loop$prop$pageType$70:b.$jscomp$loop$prop$pageType$70};
              }
              if (null == u) {
                y += " // no pageVersion matched", q.status = 308, q.payload = [f, y, l.dbg1 ? document.getElementsByTagName("html")[0].innerHTML : ""];
              } else {
                if ("" === y) {
                  q.payload = [f];
                  q.scrapedData = n;
                  for (var R in x) {
                    q[R] = x[R];
                  }
                } else {
                  q.status = 305, q.payload = [f, y, l.dbg2 ? document.getElementsByTagName("html")[0].innerHTML : ""];
                }
              }
            } else {
              q.status = 306;
            }
            0 == A && g(q);
          }
        }
      }
    }
  }
  var g = !0;
  window.self === window.top && (g = !1);
  window.sandboxHasRun && (g = !1);
  g && (window.sandboxHasRun = !0, window.addEventListener("message", function(c) {
    if (c.source == window.parent && c.data && (c.origin == "chrome-extension://" + chrome.runtime.id || c.origin.startsWith("moz-extension://") || c.origin.startsWith("safari-extension://"))) {
      var g = c.data.value;
      "data" == c.data.key && g.url && g.url == document.location && setTimeout(function() {
        null == document.body ? setTimeout(function() {
          n(g, function(c) {
            window.parent.postMessage({sandbox:c}, "*");
          });
        }, 1500) : n(g, function(c) {
          window.parent.postMessage({sandbox:c}, "*");
        });
      }, 800);
    }
  }, !1), window.parent.postMessage({sandbox:document.location + "", isUrlMsg:!0}, "*"));
  window.addEventListener("error", function(c, g, n, G, H) {
    "ipbakfmnjdenbmoenhicfmoojdojjjem" != chrome.runtime.id && "blfpbjkajgamcehdbehfdioapoiibdmc" != chrome.runtime.id || console.log(H);
    return !1;
  });
  return {scan:n};
}();
(function() {
  var c = !1, n = !1, g = window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), l = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), u = -1 < navigator.userAgent.toLowerCase().indexOf("edge/"), q = /Apple Computer/.test(navigator.vendor) && /Safari/.test(navigator.userAgent), G = !g && !l && !u & !q, H = l ? "Firefox" : q ? "Safari" : G ? "Chrome" : g ? "Opera" : u ? "Edge" : "Unknown", B = chrome.runtime.getManifest().version, A = !1;
  try {
    A = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  } catch (a) {
  }
  if (!window.keepaHasRun) {
    window.keepaHasRun = !0;
    var y = 0;
    window.addEventListener("message", function(a) {
      if ("undefined" == typeof a.data.sandbox) {
        if ("https://keepa.com" == a.origin || "https://test.keepa.com" == a.origin) {
          if (a.data.hasOwnProperty("origin") && "keepaIframe" == a.data.origin) {
            f.handleIFrameMessage(a.data.key, a.data.value, function(b) {
              try {
                a.source.postMessage({origin:"keepaContentScript", key:a.data.key, value:b, id:a.data.id}, a.origin);
              } catch (d) {
              }
            });
          } else {
            if ("string" === typeof a.data) {
              var b = a.data.split(",");
              if (2 > b.length) {
                return;
              }
              if (2 < b.length) {
                for (var r = 2, k = b.length; r < k; r++) {
                  b[1] += "," + b[r];
                }
              }
              f.handleIFrameMessage(b[0], b[1], function(b) {
                a.source.postMessage({origin:"keepaContentScript", value:b}, a.origin);
              });
            }
          }
        }
        if (a.origin.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|jp|ca|fr|es|nl|it|in|com\.mx|com\.br)/)) {
          try {
            var h = JSON.parse(a.data);
          } catch (e) {
            return;
          }
          (h = h.asin) && "null" != h && /([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/.test(h) && (h != f.ASIN ? (f.ASIN = h, f.swapIFrame()) : 0 != y ? (window.clearTimeout(y), y = 1) : y = window.setTimeout(function() {
            f.swapIFrame();
          }, 1000));
        }
      }
    });
    var f = {domain:0, iframeStorage:null, ASIN:null, tld:"", placeholder:"", cssFlex:function() {
      var a = "flex", b = ["flex", "-webkit-flex", "-moz-box", "-webkit-box", "-ms-flexbox"], f = document.createElement("flexelement"), k;
      for (k in b) {
        try {
          if ("undefined" != f.style[b[k]]) {
            a = b[k];
            break;
          }
        } catch (h) {
        }
      }
      return a;
    }(), getDomain:function(a) {
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
        case "jp":
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
          return -1;
      }
    }, revealWorking:!1, juvecOnlyOnce:!1, revealMapOnlyOnce:!1, revealCache:{}, revealMAP:function() {
      f.revealMapOnlyOnce || (f.revealMapOnlyOnce = !0, chrome.runtime.sendMessage({type:"isPro"}, function(a) {
        if (null === a.value) {
          console.log("stock data fail");
        } else {
          var b = a.stockData, r = !0 === a.value, k = function(a) {
            a = a.trim();
            var e = b.amazonNames[a];
            return e ? "W" === e ? b.warehouseIds[f.domain] : "A" === e ? b.amazonIds[f.domain] : e : (a = a.match(new RegExp(b.sellerId))) && a[1] ? a[1] : null;
          };
          chrome.storage.local.get("revealStock", function(a) {
            "undefined" == typeof a && (a = {});
            var e = !0;
            try {
              e = "0" != a.revealStock;
            } catch (O) {
            }
            console.log("keepa stock active: " + r + " " + e);
            try {
              if ((e || "com" == f.tld) && !f.revealWorking) {
                if (f.revealWorking = !0, document.getElementById("keepaMAP")) {
                  f.revealWorking = !1;
                } else {
                  var d = function() {
                    var a = new MutationObserver(function(b) {
                      setTimeout(function() {
                        f.revealMAP();
                      }, 100);
                      try {
                        a.disconnect();
                      } catch (T) {
                      }
                    });
                    a.observe(document.getElementById("keepaMAP").parentNode.parentNode.parentNode, {childList:!0, subtree:!0});
                  }, h = function(a, b, d, e, h, k, m, g) {
                    if ("undefined" == typeof f.revealCache[e]) {
                      f.revealCache[e] = -1;
                      var l = "" == a.id && "aod-pinned-offer" == a.parentNode.id;
                      k = k || l;
                      try {
                        d = d || -1 != a.textContent.toLowerCase().indexOf("add to cart to see product details.") || !k && /(our price|always remove it|add this item to your cart|see product details in cart|see price in cart)/i.test(document.getElementById("price").textContent);
                      } catch (V) {
                      }
                      if (d || r) {
                        c(a, b, d, e, k);
                        var w = function(a) {
                          var b = document.getElementById("keepaStock" + e);
                          if (null != b) {
                            b.innerHTML = "";
                            if (null != a && null != a.price && d) {
                              var h = document.createElement("div");
                              a = 5 == f.domain ? a.price : (Number(a.price) / 100).toFixed(2);
                              var c = new Intl.NumberFormat(" en-US en-GB de-DE fr-FR ja-JP en-CA zh-CN it-IT es-ES hi-IN es-MX pt-BR en-AU nl-NL tr-TR".split(" ")[f.domain], {style:"currency", currency:" USD GBP EUR EUR JPY CAD CNY EUR EUR INR MXN BRL AUD EUR TRY".split(" ")[f.domain]});
                              0 < a && (h.innerHTML = 'Price&emsp;&ensp;<span style="font-weight: bold;">' + c.format(a) + "</span>");
                              b.parentNode.parentNode.parentNode.prepend(h);
                            }
                            r && (a = f.revealCache[e].stock, 999 == a ? a = "999+" : 1000 == a && (a = "1000+"), h = document.createElement("span"), h.style = "font-weight: bold;", h.innerText = a + " ", a = document.createElement("span"), a.style = "color: #dedede;", a.innerText = " (revealed by \u271c Keepa)", c = document.createElement("span"), c.style = "color:#da4c33;", c.innerText = " order limit", b.appendChild(h), f.revealCache[e].limit && (0 < f.revealCache[e].orderLimit && (c.innerText += 
                            ": " + f.revealCache[e].orderLimit), b.appendChild(c)), k && b.appendChild(a));
                          }
                        };
                        "undefined" != typeof f.revealCache[e] && -1 != f.revealCache[e] ? w(f.revealCache[e]) : chrome.runtime.sendMessage({type:"getStock", asin:b, oid:e, sellerId:g, maxQty:m, isMAP:d, host:document.location.hostname, force:d, referer:document.location + "", domainId:f.domain, cachedStock:f.revealCache[g], session:h}, function(a) {
                          if ("undefined" != typeof a && null != a) {
                            if (a.error) {
                              var b = document.getElementById("keepaStock" + e);
                              b.innerHTML = "";
                              var d = document.createElement("span");
                              d.style = "color:#e8c7c1;";
                              d.innerText = "error(" + a.errorCode + ")";
                              d.title = a.error + ". Contact info@keepa.com with a screenshot & URL for assistance.";
                              b.appendChild(d);
                              console.log(a.error);
                            } else {
                              f.revealCache[e] = a, f.revealCache[g] = a, w(a);
                            }
                          }
                        });
                      }
                    }
                  }, c = function(a, b, e, h, k) {
                    b = "" == a.id && "aod-pinned-offer" == a.parentNode.id;
                    var c = (k ? a.parentElement : a).querySelector(".keepaMAP");
                    if (null == (k ? a.parentElement : a).querySelector(".keepaStock")) {
                      null != c && null != c.parentElement && c.parentElement.remove();
                      var g = k ? "165px" : "55px;height:20px;";
                      c = document.createElement("div");
                      c.id = "keepaMAP" + (k ? e + h : "");
                      c.className = "a-section a-spacing-none a-spacing-top-micro aod-clear-float keepaStock";
                      e = document.createElement("div");
                      e.className = "a-fixed-left-grid";
                      var m = document.createElement("div");
                      m.style = "padding-left:" + g;
                      k && (m.className = "a-fixed-left-grid-inner");
                      var l = document.createElement("div");
                      l.style = "width:" + g + ";margin-left:-" + g + ";float:left;";
                      l.className = "a-fixed-left-grid-col aod-padding-right-10 a-col-left";
                      g = document.createElement("div");
                      g.style = "padding-left:0%;float:left;";
                      g.className = "a-fixed-left-grid-col a-col-right";
                      var w = document.createElement("span");
                      w.className = "a-size-small a-color-tertiary";
                      var p = document.createElement("span");
                      p.style = "color: #dedede;";
                      p.innerText = "loading\u2026";
                      var C = document.createElement("span");
                      C.className = "a-size-small a-color-base";
                      C.id = "keepaStock" + h;
                      C.appendChild(p);
                      g.appendChild(C);
                      l.appendChild(w);
                      m.appendChild(l);
                      m.appendChild(g);
                      e.appendChild(m);
                      c.appendChild(e);
                      w.className = "a-size-small a-color-tertiary";
                      f.revealWorking = !1;
                      r && (w.innerText = "Stock");
                      k ? b ? (a = document.querySelector("#aod-pinned-offer-show-more-link"), 0 == a.length && document.querySelector("#aod-pinned-offer-main-content-show-more"), a.prepend(c)) : a.parentNode.insertBefore(c, a.parentNode.children[a.parentNode.children.length - 1]) : a.appendChild(c);
                      k || d();
                    }
                  }, g = document.location.href, m = new MutationObserver(function(a) {
                    try {
                      var d = document.querySelectorAll("#aod-offer,#aod-pinned-offer");
                      if (null != d && 0 != d.length) {
                        a = null;
                        var e = d[0].querySelector('input[name="session-id"]');
                        if (e) {
                          a = e.getAttribute("value");
                        } else {
                          if (e = document.querySelector("#session-id")) {
                            a = document.querySelector("#session-id").value;
                          }
                        }
                        if (!a) {
                          for (var r = document.querySelectorAll("script"), c = $jscomp.makeIterator(r), m = c.next(); !m.done; m = c.next()) {
                            var l = m.value.text.match("ue_sid.?=.?'([0-9-]{19})'");
                            l && (a = l[1]);
                          }
                        }
                        if (a) {
                          for (var w in d) {
                            if (d.hasOwnProperty(w)) {
                              var p = d[w];
                              if (null != p && "DIV" == p.nodeName) {
                                e = void 0;
                                r = 999;
                                var C = p.querySelector('input[name="offeringID.1"]');
                                if (C) {
                                  e = C.getAttribute("value");
                                } else {
                                  try {
                                    var n = JSON.parse(p.querySelectorAll("[data-aod-atc-action]")[0].dataset.aodAtcAction);
                                    e = n.oid;
                                    r = n.maxQty;
                                  } catch (N) {
                                    try {
                                      var z = JSON.parse(p.querySelectorAll("[data-aw-aod-cart-api]")[0].dataset.awAodCartApi);
                                      e = z.oid;
                                      r = z.maxQty;
                                    } catch (W) {
                                    }
                                  }
                                }
                                if (e) {
                                  var q = p.children[0];
                                  c = null;
                                  if (b) {
                                    for (m = 0; m < b.soldByOffers.length; m++) {
                                      var t = p.querySelector(b.soldByOffers[m]);
                                      if (null != t) {
                                        var D = t.getAttribute("href");
                                        null == D && (D = t.innerHTML);
                                        c = k(D);
                                        if (null != c) {
                                          break;
                                        }
                                      }
                                    }
                                  }
                                  var u = -1 != p.textContent.toLowerCase().indexOf("add to cart to see product details.");
                                  "undefined" === typeof f.revealCache[e] && h(q, f.ASIN, u, e, a, !0, r, c);
                                }
                              }
                            }
                          }
                        } else {
                          console.error("missing sessionId");
                        }
                      }
                    } catch (N) {
                      console.log(N), f.reportBug(N, "MAP error: " + g);
                    }
                  });
                  m.observe(document.querySelector("body"), {childList:!0, attributes:!1, characterData:!1, subtree:!0, attributeOldValue:!1, characterDataOldValue:!1});
                  window.onunload = function S() {
                    try {
                      window.detachEvent("onunload", S), m.disconnect();
                    } catch (T) {
                    }
                  };
                  var p = document.querySelector("#newAccordionRow #offerListingID, #qualifiedBuybox #offerListingID, #exportsBuybox #offerListingID");
                  a = null;
                  if (b) {
                    var l = document.querySelector(b.soldByBBForm);
                    l && (a = l.getAttribute("value"));
                    if (null == a) {
                      for (l = 0; l < b.soldByBB.length; l++) {
                        var n = document.querySelector(b.soldByBB[l]);
                        if (null != n && (a = k(n.innerHTML), null != a)) {
                          break;
                        }
                      }
                    }
                  }
                  if (null != p && null != p.value) {
                    var q = p.parentElement.querySelector("#session-id"), u = p.parentElement.querySelector("#ASIN");
                    if (null != q && null != u) {
                      var t = document.querySelector("#availability");
                      null == t && (t = document.querySelector("#availabilityInsideBuyBox_feature_div"));
                      null == t && (t = document.querySelector("#shippingMessageInsideBuyBox_feature_div"));
                      null == t && (t = document.querySelector("#buyNew_cbb"));
                      null != t && h(t, u.value, !1, p.value, q.value, !1, !1, a);
                    }
                  }
                  var v = document.getElementById("price");
                  if (null != v && /(our price|always remove it|add this item to your cart|see product details in cart|see price in cart)/i.test(v.textContent)) {
                    var x = document.getElementById("merchant-info");
                    n = p = "";
                    if (x) {
                      if (-1 == x.textContent.toLowerCase().indexOf("amazon.c")) {
                        var y = v.querySelector('span[data-action="a-modal"]');
                        if (y) {
                          var A = y.getAttribute("data-a-modal");
                          A.match(/offeringID\.1=(.*?)&amp/) && (p = RegExp.$1);
                        }
                        if (0 == p.length) {
                          if (A.match('map_help_pop_(.*?)"')) {
                            n = RegExp.$1;
                          } else {
                            f.revealWorking = !1;
                            return;
                          }
                        }
                      }
                      if (null != p && 10 < p.length) {
                        var B = document.querySelector("#session-id");
                        h(v, f.ASIN, !1, p, B.value, !1, !1, n);
                      }
                    } else {
                      f.revealWorking = !1;
                    }
                  } else {
                    f.revealWorking = !1;
                  }
                }
              }
            } catch (O) {
              f.revealWorking = !1, console.log(O);
            }
          });
        }
      }));
    }, onPageLoad:function() {
      f.tld = RegExp.$2;
      var a = RegExp.$4;
      f.ASIN || (f.ASIN = a);
      f.domain = f.getDomain(f.tld);
      chrome.storage.local.get(["s_boxType", "s_boxOfferListing"], function(a) {
        "undefined" == typeof a && (a = {});
        var b = 0 < document.location.href.indexOf("/offer-listing/");
        b && "0" === a.s_boxOfferListing && (onlyStock = !0);
        document.addEventListener("DOMContentLoaded", function(r) {
          r = document.getElementsByTagName("head")[0];
          var h = document.createElement("script");
          h.type = "text/javascript";
          h.src = chrome.runtime.getURL("chrome/content/selectionHook.js");
          r.appendChild(h);
          "0" == a.s_boxType ? f.swapIFrame() : f.getPlaceholderAndInsertIFrame(function(a, d) {
            if (void 0 !== a) {
              d = document.createElement("div");
              d.setAttribute("id", "keepaButton");
              d.setAttribute("style", "    background-color: #444;\n    border: 0 solid #ccc;\n    border-radius: 6px 6px 6px 6px;\n    color: #fff;\n    cursor: pointer;\n    font-size: 12px;\n    margin: 15px;\n    padding: 6px;\n    text-decoration: none;\n    text-shadow: none;\n    box-shadow: 0px 0px 7px 0px #888;\n    width: 100px;\n    background-repeat: no-repeat;\n    height: 32px;\n    background-position-x: 7px;\n    background-position-y: 7px;\n    text-align: center;\n    background-image: url(https://cdn.keepa.com/img/logo_circled_w.svg);\n    background-size: 80px;");
              var e = document.createElement("style");
              e.appendChild(document.createTextNode("#keepaButton:hover{background-color:#666 !important}"));
              document.head.appendChild(e);
              d.addEventListener("click", function() {
                var a = document.getElementById("keepaButton");
                a.parentNode.removeChild(a);
                f.swapIFrame();
              }, !1);
              b && (a = document.getElementById("olpTabContent"), a || (a = document.getElementById("olpProduct"), a = a.nextSibling));
              a.parentNode.insertBefore(d, a);
            }
          });
        }, !1);
      });
    }, swapIFrame:function() {
      if (onlyStock || "com.au" == f.tld) {
        try {
          f.revealMAP(document, f.ASIN, f.tld), f.revealMapOnlyOnce = !1;
        } catch (b) {
        }
      } else {
        if (!document.getElementById("keepaButton")) {
          f.swapIFrame.swapTimer && clearTimeout(f.swapIFrame.swapTimer);
          f.swapIFrame.swapTimer = setTimeout(function() {
            if (!A) {
              document.getElementById("keepaContainer") || f.getPlaceholderAndInsertIFrame(f.insertIFrame);
              try {
                f.revealMAP(document, f.ASIN, f.tld), f.revealMapOnlyOnce = !1;
              } catch (b) {
              }
              f.swapIFrame.swapTimer = setTimeout(function() {
                document.getElementById("keepaContainer") || f.getPlaceholderAndInsertIFrame(f.insertIFrame);
              }, 2000);
            }
          }, 2000);
          var a = document.getElementById("keepaContainer");
          if (null != f.iframeStorage && a) {
            try {
              f.iframeStorage.contentWindow.postMessage({origin:"keepaContentScript", key:"updateASIN", value:f.domain + "-0-" + f.ASIN}, f.iframeStorage.src);
            } catch (b) {
              console.error(b);
            }
          } else {
            f.getPlaceholderAndInsertIFrame(f.insertIFrame);
            try {
              f.revealMAP(document, f.ASIN, f.tld), f.revealMapOnlyOnce = !1;
            } catch (b) {
            }
          }
        }
      }
    }, getDevicePixelRatio:function() {
      var a = 1;
      void 0 !== window.screen.systemXDPI && void 0 !== window.screen.logicalXDPI && window.screen.systemXDPI > window.screen.logicalXDPI ? a = window.screen.systemXDPI / window.screen.logicalXDPI : void 0 !== window.devicePixelRatio && (a = window.devicePixelRatio);
      return a;
    }, getPlaceholderAndInsertIFrame:function(a) {
      chrome.storage.local.get("keepaBoxPlaceholder keepaBoxPlaceholderBackup keepaBoxPlaceholderBackupClass keepaBoxPlaceholderAppend keepaBoxPlaceholderBackupAppend webGraphType webGraphRange".split(" "), function(b) {
        "undefined" == typeof b && (b = {});
        var r = 0, c = function() {
          if (!document.getElementById("keepaButton") && !document.getElementById("amazonlive-homepage-widget")) {
            if (A) {
              var h = document.querySelector("#tabular_feature_div,#olpLinkWidget_feature_div,#tellAFriendBox_feature_div");
              try {
                document.querySelector("#keepaMobileContainer")[0].remove();
              } catch (p) {
              }
              if (h && h.previousSibling) {
                try {
                  var e = b.webGraphType;
                  try {
                    e = JSON.parse(e);
                  } catch (p) {
                  }
                  var d = b.webGraphRange;
                  try {
                    d = Number(d);
                  } catch (p) {
                  }
                  var k = Math.min(1800, 1.6 * window.innerWidth).toFixed(0), g = "https://graph.keepa.com/pricehistory.png?type=2&asin=" + f.ASIN + "&domain=" + f.domain + "&width=" + k + "&height=450";
                  g = "undefined" == typeof e ? g + "&amazon=1&new=1&used=1&salesrank=1&range=365" : g + ("&amazon=" + e[0] + "&new=" + e[1] + "&used=" + e[2] + "&salesrank=" + e[3] + "&range=" + d + "&fba=" + e[10] + "&fbm=" + e[7] + "&bb=" + e[18] + "&ld=" + e[8] + "&wd=" + e[9]);
                  var l = document.createElement("div");
                  l.setAttribute("id", "keepaMobileContainer");
                  l.setAttribute("style", "margin-bottom: 20px;");
                  var m = document.createElement("img");
                  m.setAttribute("style", "margin: 5px 0; width: " + Math.min(1800, window.innerWidth) + "px;");
                  m.setAttribute("id", "keepaImageContainer" + f.ASIN);
                  m.setAttribute("src", g);
                  document.createElement("div").setAttribute("style", "margin: 20px; display: flex;justify-content: space-evenly;");
                  l.appendChild(m);
                  h.after(l);
                  m.addEventListener("click", function() {
                    m.remove();
                    f.insertIFrame(h.previousSibling, !1, !0);
                  }, !1);
                } catch (p) {
                  console.error(p);
                }
                return;
              }
            }
            if ((e = document.getElementById("gpdp-btf-container")) && e.previousElementSibling) {
              f.insertIFrame(e.previousElementSibling, !1, !0);
            } else {
              if ((e = document.getElementsByClassName("mocaGlamorContainer")[0]) || (e = document.getElementById("dv-sims")), e || (e = document.getElementById("mas-terms-of-use")), e && e.nextSibling) {
                f.insertIFrame(e.nextSibling, !1, !0);
              } else {
                if (d = b.keepaBoxPlaceholder || "#bottomRow", e = !1, d = document.querySelector(d)) {
                  "sims_fbt" == d.previousElementSibling.id && (d = d.previousElementSibling, "bucketDivider" == d.previousElementSibling.className && (d = d.previousElementSibling), e = !0), 1 == b.keepaBoxPlaceholderAppend && (d = d.nextSibling), a(d, e);
                } else {
                  if (d = b.keepaBoxPlaceholderBackup || "#elevatorBottom", "ATFCriticalFeaturesDataContainer" == d && (d = "#ATFCriticalFeaturesDataContainer"), d = document.querySelector(d)) {
                    1 == b.keepaBoxPlaceholderBackupAppend && (d = d.nextSibling), a(d, !0);
                  } else {
                    if (d = document.getElementById("hover-zoom-end")) {
                      a(d, !0);
                    } else {
                      if (d = b.keepaBoxPlaceholderBackupClass || ".a-fixed-left-grid", (d = document.querySelector(d)) && d.nextSibling) {
                        a(d.nextSibling, !0);
                      } else {
                        e = 0;
                        d = document.getElementsByClassName("twisterMediaMatrix");
                        k = !!document.getElementById("dm_mp3Player");
                        if ((d = 0 == d.length ? document.getElementById("handleBuy") : d[0]) && 0 == e && !k && null != d.nextElementSibling) {
                          g = !1;
                          for (k = d; k;) {
                            if (k = k.parentNode, "table" === k.tagName.toLowerCase()) {
                              if ("buyboxrentTable" === k.className || /buyBox/.test(k.className) || "buyingDetailsGrid" === k.className) {
                                g = !0;
                              }
                              break;
                            } else {
                              if ("html" === k.tagName.toLowerCase()) {
                                break;
                              }
                            }
                          }
                          if (!g) {
                            d = d.nextElementSibling;
                            a(d, !1);
                            return;
                          }
                        }
                        d = document.getElementsByClassName("bucketDivider");
                        0 == d.length && (d = document.getElementsByClassName("a-divider-normal"));
                        if (!d[e]) {
                          if (!d[0]) {
                            40 > r++ && window.setTimeout(function() {
                              c();
                            }, 100);
                            return;
                          }
                          e = 0;
                        }
                        for (k = d[e]; k && d[e];) {
                          if (k = k.parentNode, "table" === k.tagName.toLowerCase()) {
                            if ("buyboxrentTable" === k.className || /buyBox/.test(k.className) || "buyingDetailsGrid" === k.className) {
                              k = d[++e];
                            } else {
                              break;
                            }
                          } else {
                            if ("html" === k.tagName.toLowerCase()) {
                              break;
                            }
                          }
                        }
                        f.placeholder = d[e];
                        d[e] && d[e].parentNode && (e = document.getElementsByClassName("lpo")[0] && d[1] && 0 == e ? d[1] : d[e], a(e, !1));
                      }
                    }
                  }
                }
              }
            }
          }
        };
        c();
      });
    }, getAFComment:function(a) {
      for (a = [a]; 0 < a.length;) {
        for (var b = a.pop(), f = 0; f < b.childNodes.length; f++) {
          var k = b.childNodes[f];
          if (8 === k.nodeType && -1 < k.textContent.indexOf("MarkAF")) {
            return k;
          }
          a.push(k);
        }
      }
      return null;
    }, getIframeUrl:function(a, b) {
      return "https://keepa.com/iframe_addon.html#" + a + "-0-" + b;
    }, insertIFrame:function(a, b) {
      if (null != f.iframeStorage && document.getElementById("keepaContainer")) {
        f.swapIFrame();
      } else {
        var c = document.getElementById("hover-zoom-end"), k = function(a) {
          for (var b = document.getElementById(a), d = []; b;) {
            d.push(b), b.id = "a-different-id", b = document.getElementById(a);
          }
          for (b = 0; b < d.length; ++b) {
            d[b].id = a;
          }
          return d;
        }("hover-zoom-end");
        chrome.storage.local.get("s_boxHorizontal", function(h) {
          "undefined" == typeof h && (h = {});
          if (null == a) {
            setTimeout(function() {
              f.getPlaceholderAndInsertIFrame(f.insertIFrame);
            }, 2000);
          } else {
            var e = h.s_boxHorizontal, d = window.innerWidth - 50;
            if (!document.getElementById("keepaContainer")) {
              h = 0 < document.location.href.indexOf("/offer-listing/");
              var r = f.getIframeUrl(f.domain, f.ASIN), g = document.createElement("div");
              "0" != e || h ? g.setAttribute("style", "min-width: 935px; width: calc(100% - 30px); height: 500px; display: flex; border:0 none; margin: 10px 0 0;") : (d -= 550, 960 > d && (d = 960), g.setAttribute("style", "min-width: 935px; max-width:" + d + "px;display: flex;  height: 500px; border:0 none; margin: 10px 0 0;"));
              g.setAttribute("id", "keepaContainer");
              var l = document.createElement("iframe");
              e = document.createElement("div");
              e.setAttribute("id", "keepaClear");
              l.setAttribute("style", "width: 100%; height: 100%; border:0 none;overflow: hidden;");
              l.setAttribute("src", r);
              l.setAttribute("scrolling", "no");
              l.setAttribute("id", "keepa");
              n || (n = !0);
              g.appendChild(l);
              d = !1;
              if (!b) {
                null == a.parentNode || "promotions_feature_div" !== a.parentNode.id && "dp-out-of-stock-top_feature_div" !== a.parentNode.id || (a = a.parentNode);
                try {
                  var m = a.previousSibling.previousSibling;
                  null != m && "technicalSpecifications_feature_div" == m.id && (a = m);
                } catch (F) {
                }
                0 < k.length && (c = k[k.length - 1]) && "centerCol" != c.parentElement.id && ((m = f.getFirstInDOM([a, c], document.body)) && 600 < m.parentElement.offsetWidth && (a = m), a === c && (d = !0));
                (m = document.getElementById("title") || document.getElementById("title_row")) && f.getFirstInDOM([a, m], document.body) !== m && (a = m);
              }
              m = document.getElementById("vellumMsg");
              null != m && (a = m);
              m = document.body;
              var p = document.documentElement;
              p = Math.max(m.scrollHeight, m.offsetHeight, p.clientHeight, p.scrollHeight, p.offsetHeight);
              var q = a.offsetTop / p;
              if (0.5 < q || 0 > q) {
                m = f.getAFComment(m), null != m && (q = a.offsetTop / p, 0.5 > q && (a = m));
              }
              if (a.parentNode) {
                m = document.querySelector(".container_vertical_middle");
                h ? (a = document.getElementById("olpTabContent"), a || (a = document.getElementById("olpProduct"), a = a.nextSibling), a.parentNode.insertBefore(g, a)) : "burjPageDivider" == a.id ? (a.parentNode.insertBefore(g, a), b || a.parentNode.insertBefore(e, g.nextSibling)) : "bottomRow" == a.id ? (a.parentNode.insertBefore(g, a), b || a.parentNode.insertBefore(e, g.nextSibling)) : d ? (a.parentNode.insertBefore(g, a.nextSibling), b || a.parentNode.insertBefore(e, g.nextSibling)) : null != 
                m ? (a = m, a.parentNode.insertBefore(g, a.nextSibling), b || a.parentNode.insertBefore(e, g.nextSibling)) : (a.parentNode.insertBefore(g, a), b || a.parentNode.insertBefore(e, g));
                f.iframeStorage = l;
                g.style.display = f.cssFlex;
                var t = !1, u = 5;
                if (!A) {
                  var v = setInterval(function() {
                    if (0 >= u--) {
                      clearInterval(v);
                    } else {
                      var a = null != document.getElementById("keepa" + f.ASIN);
                      try {
                        if (!a) {
                          throw f.getPlaceholderAndInsertIFrame(f.insertIFrame), 1;
                        }
                        if (t) {
                          throw 1;
                        }
                        document.getElementById("keepa" + f.ASIN).contentDocument.location = r;
                      } catch (K) {
                        clearInterval(v);
                      }
                    }
                  }, 4000), x = function() {
                    t = !0;
                    l.removeEventListener("load", x, !1);
                    f.synchronizeIFrame();
                  };
                  l.addEventListener("load", x, !1);
                }
              } else {
                f.swapIFrame();
              }
            }
          }
        });
      }
    }, handleIFrameMessage:function(a, b, f) {
      switch(a) {
        case "resize":
          c || (c = !0);
          b = "" + b;
          -1 == b.indexOf("px") && (b += "px");
          if (a = document.getElementById("keepaContainer")) {
            a.style.height = b;
          }
          break;
        case "ping":
          f({location:chrome.runtime.id + " " + document.location});
          break;
        case "openPage":
          chrome.runtime.sendMessage({type:"openPage", url:b});
          break;
        case "getToken":
          chrome.runtime.sendMessage({type:"getCookie", key:"token"}, function(a) {
            f({token:a.value});
          });
          break;
        case "setCookie":
          chrome.runtime.sendMessage({type:"setCookie", key:b.key, val:b.val});
      }
    }, synchronizeIFrame:function() {
      var a = 0;
      chrome.storage.local.get("s_boxHorizontal", function(b) {
        "undefined" != typeof b && "undefined" != typeof b.s_boxHorizontal && (a = b.s_boxHorizontal);
      });
      var b = window.innerWidth, f = !1;
      A || window.addEventListener("resize", function() {
        f || (f = !0, window.setTimeout(function() {
          if (b != window.innerWidth && "0" == a) {
            b = window.innerWidth;
            var c = window.innerWidth - 50;
            c -= 550;
            935 > c && (c = 935);
            document.getElementById("keepaContainer").style.width = c;
          }
          f = !1;
        }, 100));
      }, !1);
    }, getFirstInDOM:function(a, b) {
      var c;
      for (b = b.firstChild; b; b = b.nextSibling) {
        if ("IFRAME" !== b.nodeName && 1 === b.nodeType) {
          if (-1 !== a.indexOf(b)) {
            return b;
          }
          if (c = f.getFirstInDOM(a, b)) {
            return c;
          }
        }
      }
      return null;
    }, getClipRect:function(a) {
      "string" === typeof a && (a = document.querySelector(a));
      var b = 0, c = 0, k = function(a) {
        b += a.offsetLeft;
        c += a.offsetTop;
        a.offsetParent && k(a.offsetParent);
      };
      k(a);
      return 0 == c && 0 == b ? f.getClipRect(a.parentNode) : {top:c, left:b, width:a.offsetWidth, height:a.offsetHeight};
    }, findPlaceholderBelowImages:function(a) {
      var b = a, c, k = 100;
      do {
        for (k--, c = null; !c;) {
          c = a.nextElementSibling, c || (c = a.parentNode.nextElementSibling), a = c ? c : a.parentNode.parentNode, !c || "IFRAME" !== c.nodeName && "SCRIPT" !== c.nodeName && 1 === c.nodeType || (c = null);
        }
      } while (0 < k && 100 < f.getClipRect(c).left);
      return c ? c : b;
    }, httpGet:function(a, b) {
      var c = new XMLHttpRequest;
      b && (c.onreadystatechange = function() {
        4 == c.readyState && b.call(this, c.responseText);
      });
      c.open("GET", a, !0);
      c.send();
    }, httpPost2:function(a, b, c, f, h) {
      var e = new XMLHttpRequest;
      f && (e.onreadystatechange = function() {
        4 == e.readyState && f.call(this, e.responseText);
      });
      e.withCredentials = h;
      e.open("POST", a, !0);
      e.setRequestHeader("Content-Type", c);
      e.send(b);
    }, httpPost:function(a, b, c, k) {
      f.httpPost2(a, b, "text/plain;charset=UTF-8", c, k);
    }, lastBugReport:0, reportBug:function(a, b, c) {
      var k = Date.now();
      if (!(6E5 > k - f.lastBugReport || /(dead object)|(Script error)|(\.location is null)/i.test(a))) {
        f.lastBugReport = k;
        k = "";
        try {
          k = Error().stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
          if (!/(keepa|content)\.js/.test(k)) {
            return;
          }
          k = k.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
        } catch (h) {
        }
        if ("object" == typeof a) {
          try {
            a = a instanceof Error ? a.toString() : JSON.stringify(a);
          } catch (h) {
          }
        }
        null == c && (c = {exception:a, additional:b, url:document.location.host, stack:k});
        null != c.url && c.url.startsWith("blob:") || (c.keepaType = G ? "keepaChrome" : g ? "keepaOpera" : q ? "keepaSafari" : u ? "keepaEdge" : "keepaFirefox", c.version = B, chrome.storage.local.get("token", function(a) {
          "undefined" == typeof a && (a = {token:"undefined"});
          f.httpPost("https://dyn.keepa.com/service/bugreport/?user=" + a.token + "&type=" + H, JSON.stringify(c));
        }));
      }
    }};
    window.onerror = function(a, b, c, k, h) {
      if ("string" !== typeof a) {
        h = a.error;
        var e = a.filename || a.fileName;
        c = a.lineno || a.lineNumber;
        k = a.colno || a.columnNumber;
        a = a.message || a.name || h.message || h.name;
      }
      a = a.toString();
      var d = "";
      k = k || 0;
      if (h && h.stack) {
        d = h.stack;
        try {
          d = h.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
          if (!/(keepa|content)\.js/.test(d)) {
            return;
          }
          d = d.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
        } catch (C) {
        }
      }
      "undefined" === typeof c && (c = 0);
      "undefined" === typeof k && (k = 0);
      a = {msg:a, url:(b || e || document.location.toString()) + ":" + c + ":" + k, stack:d};
      "ipbakfmnjdenbmoenhicfmoojdojjjem" != chrome.runtime.id && "blfpbjkajgamcehdbehfdioapoiibdmc" != chrome.runtime.id || console.log(a);
      f.reportBug(null, null, a);
      return !1;
    };
    if (window.self == window.top && (document.addEventListener("DOMContentLoaded", function(a) {
      chrome.runtime.sendMessage({type:"optionalPermissionsRequired"}, function(a) {
        if (!0 === a.value) {
          var b = 0;
          console.log("opr: ", a.value);
          var c = function() {
            10 < b++ && document.body.removeEventListener("click", c);
            chrome.runtime.sendMessage({type:"optionalPermissions"}, function(a) {
              document.body.removeEventListener("click", c);
            });
          };
          document.body.addEventListener("click", c);
        }
      });
    }), !(/.*music\.amazon\..*/.test(document.location.href) || /.*primenow\.amazon\..*/.test(document.location.href) || /.*amazonlive-portal\.amazon\..*/.test(document.location.href) || /.*amazon\.com\/restaurants.*/.test(document.location.href)))) {
      l = function(a) {
        chrome.runtime.sendMessage({type:"sendData", val:{key:"m1", payload:[a]}}, function() {
        });
      };
      var v = document.location.href, x = !1;
      document.addEventListener("DOMContentLoaded", function(a) {
        if (!x) {
          try {
            if (v.startsWith("https://test.keepa.com") || v.startsWith("https://keepa.com")) {
              var b = document.createElement("div");
              b.id = "extension";
              b.setAttribute("type", H);
              b.setAttribute("version", B);
              document.body.appendChild(b);
              x = !0;
            }
          } catch (r) {
          }
        }
      });
      var I = !1;
      v.match(/^htt(p|ps):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|nl|in|com\.mx|com\.br|com\.au)\/s\?/) ? (onlyStock = !0, f.onPageLoad()) : /((\/images)|(\/review)|(\/customer-reviews)|(ask\/questions)|(\/product-reviews))/.test(v) || /\/e\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/.test(v) || !(v.match(/^htt(p|ps):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|nl|in|com\.mx|com\.br|com\.au)\/[^.]*?(\/|[?&]ASIN=)([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) || v.match(/^htt(p|ps):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|nl|in|com\.mx|com\.br|com\.au)\/(.*?)\/dp\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))\//) || 
      v.match(/^htt(p|ps):\/\/.*?\.amzn\.(com).*?\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/)) ? v.match(/^htt(p|ps):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|nl|es|in|com\.mx|com\.br|com\.au)\/[^.]*?\/(wishlist|registry)/) || v.match(/^htt(p|ps):\/\/w*?\.amzn\.(com)[^.]*?\/(wishlist|registry)/) || (v.match("^https?://.*?(?:seller).*?.amazon.(de|com|co.uk|co.jp|ca|fr|it|nl|es|in|com.mx|com.br|com.au)/") ? l("s" + f.getDomain(RegExp.$1)) : v.match(/^https?:\/\/.*?(?:af.?ilia|part|assoc).*?\.amazon\.(de|com|co\.uk|co\.jp|nl|ca|fr|it|es|in|com\.mx|com\.br|com\.au)\/home/) && 
      l("a" + f.getDomain(RegExp.$1))) : (f.onPageLoad(!1), I = !0);
      if (!A) {
        l = /^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|nl|in|com\.mx|com\.br|com\.au)\/(s([\/?])|gp\/bestsellers\/|gp\/search\/|.*?\/b\/)/;
        (I || v.match(l)) && document.addEventListener("DOMContentLoaded", function(a) {
          var b = null;
          chrome.runtime.sendMessage({type:"getFilters"}, function(a) {
            b = a;
            if (null != b && null != b.value) {
              var c = function() {
                var b = v.match("^https?://.*?.amazon.(de|com|co.uk|co.jp|ca|fr|it|es|in|com.br|nl|com.mx)/");
                if (I || b) {
                  var d = f.getDomain(RegExp.$1);
                  scanner.scan(a.value, function(a) {
                    a.key = "f1";
                    a.domainId = d;
                    chrome.runtime.sendMessage({type:"sendData", val:a}, function(a) {
                    });
                  });
                }
              };
              c();
              var h = document.location.href, e = -1, d = -1, g = -1;
              d = setInterval(function() {
                h != document.location.href && (h = document.location.href, clearTimeout(g), g = setTimeout(function() {
                  c();
                }, 2000), clearTimeout(e), e = setTimeout(function() {
                  clearInterval(d);
                }, 180000));
              }, 2000);
              e = setTimeout(function() {
                clearInterval(d);
              }, 180000);
            }
          });
        });
        l = document.location.href;
        l.match("^https?://.*?.amazon.(de|com|co.uk|co.jp|ca|fr|it|es|in|nl|com.mx|com.br|com.au)/") && -1 == l.indexOf("aws.amazon.") && -1 == l.indexOf("music.amazon.") && -1 == l.indexOf("services.amazon.") && -1 == l.indexOf("primenow.amazon.") && -1 == l.indexOf("kindle.amazon.") && -1 == l.indexOf("watch.amazon.") && -1 == l.indexOf("developer.amazon.") && -1 == l.indexOf("skills-store.amazon.") && -1 == l.indexOf("pay.amazon.") && document.addEventListener("DOMContentLoaded", function(a) {
          setTimeout(function() {
            chrome.runtime.onMessage.addListener(function(a, c, k) {
              switch(a.key) {
                case "collectASINs":
                  a = {};
                  var b = !1;
                  c = (document.querySelector("#main") || document.querySelector("#zg") || document.querySelector("#pageContent") || document.querySelector("#wishlist-page") || document.querySelector("#merchandised-content") || document.querySelector("#reactApp") || document.querySelector("[id^='contentGrid']") || document.querySelector("#container") || document.querySelector(".a-container") || document).getElementsByTagName("a");
                  if (void 0 != c && null != c) {
                    for (var e = 0; e < c.length; e++) {
                      var d = c[e].href;
                      /\/images/.test(d) || /\/e\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/.test(d) || !d.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|nl|in|com\.mx|com\.br|com\.au)\/[^.]*?(?:\/|\?ASIN=)([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) && !d.match(/^https?:\/\/.*?\.amzn\.(com)[^.]*?\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) || (b = RegExp.$2, d = f.getDomain(RegExp.$1), "undefined" === typeof a[d] && (a[d] = []), a[d].includes(b) || a[d].push(b), b = !0);
                    }
                  }
                  if (b) {
                    k(a);
                  } else {
                    return alert("Keepa: No product ASINs found on this page."), !1;
                  }
                  break;
                default:
                  k({});
              }
            });
            chrome.storage.local.get(["overlayPriceGraph", "webGraphType", "webGraphRange"], function(a) {
              "undefined" == typeof a && (a = {});
              try {
                var b = a.overlayPriceGraph, c = a.webGraphType;
                try {
                  c = JSON.parse(c);
                } catch (p) {
                }
                var f = a.webGraphRange;
                try {
                  f = Number(f);
                } catch (p) {
                }
                var e;
                if (1 == b) {
                  var d = document.getElementsByTagName("a"), g = 0 < document.location.href.indexOf("/offer-listing/");
                  if (void 0 != d && null != d) {
                    for (e = 0; e < d.length; e++) {
                      var l = d[e].href;
                      /\/images/.test(l) || /\/e\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/.test(l) || !l.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|in|com\.mx)\/[^.]*?(?:\/|\?ASIN=)([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) && !l.match(/^https?:\/\/.*?\.amzn\.(com)[^.]*?\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) || (g || -1 == l.indexOf("offer-listing")) && t.add_events(c, f, d[e], l, RegExp.$1, RegExp.$2);
                    }
                  }
                  var n = function(a) {
                    if ("A" == a.nodeName) {
                      var b = a.href;
                      /\/images/.test(b) || /\/e\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/.test(b) || !b.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|in|com\.mx)\/[^.]*?(?:\/|\?ASIN=)([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) && !b.match(/^https?:\/\/.*?\.amzn\.(com)[^.]*?\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) || (g || -1 == b.indexOf("offer-listing")) && t.add_events(c, f, a, b, RegExp.$1, RegExp.$2);
                    }
                  }, m = new MutationObserver(function(a) {
                    a.forEach(function(a) {
                      try {
                        if ("childList" === a.type) {
                          for (e = 0; e < a.addedNodes.length; e++) {
                            n(a.addedNodes[e]);
                            for (var b = a.addedNodes[e].children; null != b && "undefined" != b && 0 < b.length;) {
                              for (var c = [], d = 0; d < b.length; d++) {
                                n(b[d]);
                                try {
                                  if (b[d].children && 0 < b[d].children.length) {
                                    for (var f = 0; f < b[d].children.length && 30 > f; f++) {
                                      c.push(b[d].children[f]);
                                    }
                                  }
                                } catch (F) {
                                }
                              }
                              b = c;
                            }
                          }
                        } else {
                          if (c = a.target.getElementsByTagName("a"), "undefined" != c && null != c) {
                            for (b = 0; b < c.length; b++) {
                              n(c[b]);
                            }
                          }
                        }
                        n(a.target);
                      } catch (F) {
                      }
                    });
                  });
                  m.observe(document.querySelector("html"), {childList:!0, attributes:!1, characterData:!1, subtree:!0, attributeOldValue:!1, characterDataOldValue:!1});
                  window.onunload = function D() {
                    try {
                      window.detachEvent("onunload", D), m.disconnect();
                    } catch (L) {
                    }
                  };
                }
              } catch (p) {
              }
            });
          }, 100);
        });
        var t = {image_urls_main:[], pf_preview_current:"", preview_images:[], tld:"", img_string:'<img style="border: 1px solid #ff9f29;  -moz-border-radius: 0px;  margin: -3px;   display:block;   position: relative;   top: -3px;   left: -3px;" src=\'', createNewImageElement:function(a) {
          a = a.createElement("img");
          a.style.borderTop = "2px solid #ff9f29";
          a.style.borderBottom = "3px solid grey";
          a.style.display = "block";
          a.style.position = "relative";
          a.style.padding = "5px";
          return a;
        }, preview_image:function(a, b, c, f, h, e) {
          try {
            var d = c.originalTarget.ownerDocument;
          } catch (p) {
            d = document;
          }
          if (!d.getElementById("pf_preview")) {
            var g = d.createElement("div");
            g.id = "pf_preview";
            g.addEventListener("mouseout", function(a) {
              t.clear_image(a);
            }, !1);
            g.style.boxShadow = "rgb(68, 68, 68) 0px 1px 7px -2px";
            g.style.position = "fixed";
            g.style.zIndex = "10000000";
            g.style.bottom = "0px";
            g.style.right = "0px";
            g.style.margin = "12px 12px";
            g.style.backgroundColor = "#fff";
            d.body.appendChild(g);
          }
          t.pf_preview_current = d.getElementById("pf_preview");
          if (!t.pf_preview_current.firstChild) {
            g = Math.max(Math.floor(0.3 * d.defaultView.innerHeight), 128);
            var k = Math.max(Math.floor(0.3 * d.defaultView.innerWidth), 128), l = 2;
            if (300 > k || 150 > g) {
              l = 1;
            }
            1000 < k && (k = 1000);
            1000 < g && (g = 1000);
            t.pf_preview_current.current = -1;
            t.pf_preview_current.a = h;
            t.pf_preview_current.href = f;
            t.pf_preview_current.size = Math.floor(1.1 * Math.min(k, g));
            d.defaultView.innerWidth - c.clientX < 1.05 * k && d.defaultView.innerHeight - c.clientY < 1.05 * g && (c = d.getElementById("pf_preview"), c.style.right = "", c.style.left = "6px");
            h = "https://graph.keepa.com/pricehistory.png?type=" + l + "&asin=" + h + "&domain=" + e + "&width=" + k + "&height=" + g;
            h = "undefined" == typeof a ? h + "&amazon=1&new=1&used=1&salesrank=1&range=365" : h + ("&amazon=" + a[0] + "&new=" + a[1] + "&used=" + a[2] + "&salesrank=" + a[3] + "&range=" + b + "&fba=" + a[10] + "&fbm=" + a[7] + "&bb=" + a[18] + "&ld=" + a[8] + "&wd=" + a[9]);
            d.getElementById("pf_preview").style.display = "block";
            var m = t.createNewImageElement(d);
            t.pf_preview_current.appendChild(m);
            fetch(h).then(function(a) {
              try {
                if ("FAIL" === a.headers.get("screenshot-status")) {
                  return null;
                }
              } catch (D) {
              }
              return a.blob();
            }).then(function(a) {
              null != a && m.setAttribute("src", URL.createObjectURL(a));
            });
          }
        }, clear_image:function(a) {
          try {
            try {
              var b = a.originalTarget.ownerDocument;
            } catch (k) {
              b = document;
            }
            var c = b.getElementById("pf_preview");
            c.style.display = "none";
            c.style.right = "2px";
            c.style.left = "";
            t.pf_preview_current.innerHTML = "";
          } catch (k) {
          }
        }, add_events:function(a, b, c, f, g, e) {
          0 <= f.indexOf("#") || (t.tld = g, "pf_prevImg" != c.getAttribute("keepaPreview") && (c.addEventListener("mouseover", function(c) {
            t.preview_image(a, b, c, f, e, g);
            return !0;
          }, !0), c.addEventListener("mouseout", function(a) {
            t.clear_image(a);
          }, !1), c.setAttribute("keepaPreview", "pf_prevImg")));
        }};
      }
    }
  }
})();

