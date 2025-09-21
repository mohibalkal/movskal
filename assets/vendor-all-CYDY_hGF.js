import {
  g as mt,
  a as Ql,
  c as Nu
} from "./react-CFA0M-2C.js";
var wu = {
    exports: {}
  },
  Iu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var v0;

function Jl() {
  return v0 || (v0 = 1, (function (e) {
    function t(R, G) {
      var j = R.length;
      R.push(G);
      e: for (; 0 < j;) {
        var P = j - 1 >>> 1,
          $ = R[P];
        if (0 < u($, G)) R[P] = G, R[j] = $, j = P;
        else break e
      }
    }

    function r(R) {
      return R.length === 0 ? null : R[0]
    }

    function a(R) {
      if (R.length === 0) return null;
      var G = R[0],
        j = R.pop();
      if (j !== G) {
        R[0] = j;
        e: for (var P = 0, $ = R.length, q = $ >>> 1; P < q;) {
          var H = 2 * (P + 1) - 1,
            de = R[H],
            oe = H + 1,
            se = R[oe];
          if (0 > u(de, j)) oe < $ && 0 > u(se, de) ? (R[P] = se, R[oe] = j, P = oe) : (R[P] = de, R[H] = j, P = H);
          else if (oe < $ && 0 > u(se, j)) R[P] = se, R[oe] = j, P = oe;
          else break e
        }
      }
      return G
    }

    function u(R, G) {
      var j = R.sortIndex - G.sortIndex;
      return j !== 0 ? j : R.id - G.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var n = performance;
      e.unstable_now = function () {
        return n.now()
      }
    } else {
      var s = Date,
        i = s.now();
      e.unstable_now = function () {
        return s.now() - i
      }
    }
    var o = [],
      c = [],
      l = 1,
      h = null,
      f = 3,
      m = !1,
      p = !1,
      b = !1,
      x = typeof setTimeout == "function" ? setTimeout : null,
      T = typeof clearTimeout == "function" ? clearTimeout : null,
      E = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);

    function A(R) {
      for (var G = r(c); G !== null;) {
        if (G.callback === null) a(c);
        else if (G.startTime <= R) a(c), G.sortIndex = G.expirationTime, t(o, G);
        else break;
        G = r(c)
      }
    }

    function v(R) {
      if (b = !1, A(R), !p)
        if (r(o) !== null) p = !0, Z(C);
        else {
          var G = r(c);
          G !== null && re(v, G.startTime - R)
        }
    }

    function C(R, G) {
      p = !1, b && (b = !1, T(w), w = -1), m = !0;
      var j = f;
      try {
        for (A(G), h = r(o); h !== null && (!(h.expirationTime > G) || R && !L());) {
          var P = h.callback;
          if (typeof P == "function") {
            h.callback = null, f = h.priorityLevel;
            var $ = P(h.expirationTime <= G);
            G = e.unstable_now(), typeof $ == "function" ? h.callback = $ : h === r(o) && a(o), A(G)
          } else a(o);
          h = r(o)
        }
        if (h !== null) var q = !0;
        else {
          var H = r(c);
          H !== null && re(v, H.startTime - G), q = !1
        }
        return q
      } finally {
        h = null, f = j, m = !1
      }
    }
    var N = !1,
      D = null,
      w = -1,
      U = 5,
      I = -1;

    function L() {
      return !(e.unstable_now() - I < U)
    }

    function M() {
      if (D !== null) {
        var R = e.unstable_now();
        I = R;
        var G = !0;
        try {
          G = D(!0, R)
        } finally {
          G ? F() : (N = !1, D = null)
        }
      } else N = !1
    }
    var F;
    if (typeof E == "function") F = function () {
      E(M)
    };
    else if (typeof MessageChannel < "u") {
      var V = new MessageChannel,
        K = V.port2;
      V.port1.onmessage = M, F = function () {
        K.postMessage(null)
      }
    } else F = function () {
      x(M, 0)
    };

    function Z(R) {
      D = R, N || (N = !0, F())
    }

    function re(R, G) {
      w = x(function () {
        R(e.unstable_now())
      }, G)
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function (R) {
      R.callback = null
    }, e.unstable_continueExecution = function () {
      p || m || (p = !0, Z(C))
    }, e.unstable_forceFrameRate = function (R) {
      0 > R || 125 < R ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : U = 0 < R ? Math.floor(1e3 / R) : 5
    }, e.unstable_getCurrentPriorityLevel = function () {
      return f
    }, e.unstable_getFirstCallbackNode = function () {
      return r(o)
    }, e.unstable_next = function (R) {
      switch (f) {
      case 1:
      case 2:
      case 3:
        var G = 3;
        break;
      default:
        G = f
      }
      var j = f;
      f = G;
      try {
        return R()
      } finally {
        f = j
      }
    }, e.unstable_pauseExecution = function () {}, e.unstable_requestPaint = function () {}, e.unstable_runWithPriority = function (R, G) {
      switch (R) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        R = 3
      }
      var j = f;
      f = R;
      try {
        return G()
      } finally {
        f = j
      }
    }, e.unstable_scheduleCallback = function (R, G, j) {
      var P = e.unstable_now();
      switch (typeof j == "object" && j !== null ? (j = j.delay, j = typeof j == "number" && 0 < j ? P + j : P) : j = P, R) {
      case 1:
        var $ = -1;
        break;
      case 2:
        $ = 250;
        break;
      case 5:
        $ = 1073741823;
        break;
      case 4:
        $ = 1e4;
        break;
      default:
        $ = 5e3
      }
      return $ = j + $, R = {
        id: l++,
        callback: G,
        priorityLevel: R,
        startTime: j,
        expirationTime: $,
        sortIndex: -1
      }, j > P ? (R.sortIndex = j, t(c, R), r(o) === null && R === r(c) && (b ? (T(w), w = -1) : b = !0, re(v, j - P))) : (R.sortIndex = $, t(o, R), p || m || (p = !0, Z(C))), R
    }, e.unstable_shouldYield = L, e.unstable_wrapCallback = function (R) {
      var G = f;
      return function () {
        var j = f;
        f = G;
        try {
          return R.apply(this, arguments)
        } finally {
          f = j
        }
      }
    }
  })(Iu)), Iu
}
var _0;

function xg() {
  return _0 || (_0 = 1, wu.exports = Jl()), wu.exports
}
var Du, y0;

function Zl() {
  if (y0) return Du;
  y0 = 1;
  var e = function (t, r, a, u, n, s, i, o) {
    if (!t) {
      var c;
      if (r === void 0) c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var l = [a, u, n, s, i, o],
          h = 0;
        c = new Error(r.replace(/%s/g, function () {
          return l[h++]
        })), c.name = "Invariant Violation"
      }
      throw c.framesToPop = 1, c
    }
  };
  return Du = e, Du
}
var ef = Zl();
const Eg = mt(ef);
var Ou, C0;

function tf() {
  return C0 || (C0 = 1, Ou = function (t, r, a, u) {
    var n = a ? a.call(u, t, r) : void 0;
    if (n !== void 0) return !!n;
    if (t === r) return !0;
    if (typeof t != "object" || !t || typeof r != "object" || !r) return !1;
    var s = Object.keys(t),
      i = Object.keys(r);
    if (s.length !== i.length) return !1;
    for (var o = Object.prototype.hasOwnProperty.bind(r), c = 0; c < s.length; c++) {
      var l = s[c];
      if (!o(l)) return !1;
      var h = t[l],
        f = r[l];
      if (n = a ? a.call(u, h, f, l) : void 0, n === !1 || n === void 0 && h !== f) return !1
    }
    return !0
  }), Ou
}
var rf = tf();
const gg = mt(rf);
var Wt = {
    exports: {}
  },
  S0;

function af() {
  if (S0) return Wt.exports;
  S0 = 1;
  var e = {
    decodeValues: !0,
    map: !1,
    silent: !1
  };

  function t(s) {
    return typeof s == "string" && !!s.trim()
  }

  function r(s, i) {
    var o = s.split(";").filter(t),
      c = o.shift(),
      l = a(c),
      h = l.name,
      f = l.value;
    i = i ? Object.assign({}, e, i) : e;
    try {
      f = i.decodeValues ? decodeURIComponent(f) : f
    } catch (p) {
      console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + f + "'. Set options.decodeValues to false to disable this feature.", p)
    }
    var m = {
      name: h,
      value: f
    };
    return o.forEach(function (p) {
      var b = p.split("="),
        x = b.shift().trimLeft().toLowerCase(),
        T = b.join("=");
      x === "expires" ? m.expires = new Date(T) : x === "max-age" ? m.maxAge = parseInt(T, 10) : x === "secure" ? m.secure = !0 : x === "httponly" ? m.httpOnly = !0 : x === "samesite" ? m.sameSite = T : x === "partitioned" ? m.partitioned = !0 : m[x] = T
    }), m
  }

  function a(s) {
    var i = "",
      o = "",
      c = s.split("=");
    return c.length > 1 ? (i = c.shift(), o = c.join("=")) : o = s, {
      name: i,
      value: o
    }
  }

  function u(s, i) {
    if (i = i ? Object.assign({}, e, i) : e, !s) return i.map ? {} : [];
    if (s.headers)
      if (typeof s.headers.getSetCookie == "function") s = s.headers.getSetCookie();
      else if (s.headers["set-cookie"]) s = s.headers["set-cookie"];
    else {
      var o = s.headers[Object.keys(s.headers).find(function (l) {
        return l.toLowerCase() === "set-cookie"
      })];
      !o && s.headers.cookie && !i.silent && console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."), s = o
    }
    if (Array.isArray(s) || (s = [s]), i.map) {
      var c = {};
      return s.filter(t).reduce(function (l, h) {
        var f = r(h, i);
        return l[f.name] = f, l
      }, c)
    } else return s.filter(t).map(function (l) {
      return r(l, i)
    })
  }

  function n(s) {
    if (Array.isArray(s)) return s;
    if (typeof s != "string") return [];
    var i = [],
      o = 0,
      c, l, h, f, m;

    function p() {
      for (; o < s.length && /\s/.test(s.charAt(o));) o += 1;
      return o < s.length
    }

    function b() {
      return l = s.charAt(o), l !== "=" && l !== ";" && l !== ","
    }
    for (; o < s.length;) {
      for (c = o, m = !1; p();)
        if (l = s.charAt(o), l === ",") {
          for (h = o, o += 1, p(), f = o; o < s.length && b();) o += 1;
          o < s.length && s.charAt(o) === "=" ? (m = !0, o = f, i.push(s.substring(c, h)), c = o) : o = h + 1
        } else o += 1;
      (!m || o >= s.length) && i.push(s.substring(c, s.length))
    }
    return i
  }
  return Wt.exports = u, Wt.exports.parse = u, Wt.exports.parseString = r, Wt.exports.splitCookiesString = n, Wt.exports
}
var uf = af();
const N0 = mt(uf);

function Ag(e, t, {
  checkForDefaultPrevented: r = !0
} = {}) {
  return function (u) {
    if (e == null || e(u), r === !1 || !u.defaultPrevented) return t == null ? void 0 : t(u)
  }
}
const nf = ["top", "right", "bottom", "left"],
  vt = Math.min,
  Me = Math.max,
  Ya = Math.round,
  zr = Math.floor,
  tt = e => ({
    x: e,
    y: e
  }),
  sf = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  },
  of = {
    start: "end",
    end: "start"
  };

function rn(e, t, r) {
  return Me(e, vt(t, r))
}

function ft(e, t) {
  return typeof e == "function" ? e(t) : e
}

function ht(e) {
  return e.split("-")[0]
}

function er(e) {
  return e.split("-")[1]
}

function Cn(e) {
  return e === "x" ? "y" : "x"
}

function Sn(e) {
  return e === "y" ? "height" : "width"
}
const cf = new Set(["top", "bottom"]);

function et(e) {
  return cf.has(ht(e)) ? "y" : "x"
}

function Nn(e) {
  return Cn(et(e))
}

function df(e, t, r) {
  r === void 0 && (r = !1);
  const a = er(e),
    u = Nn(e),
    n = Sn(u);
  let s = u === "x" ? a === (r ? "end" : "start") ? "right" : "left" : a === "start" ? "bottom" : "top";
  return t.reference[n] > t.floating[n] && (s = za(s)), [s, za(s)]
}

function lf(e) {
  const t = za(e);
  return [an(e), t, an(t)]
}

function an(e) {
  return e.replace(/start|end/g, t => of [t])
}
const w0 = ["left", "right"],
  I0 = ["right", "left"],
  ff = ["top", "bottom"],
  hf = ["bottom", "top"];

function mf(e, t, r) {
  switch (e) {
  case "top":
  case "bottom":
    return r ? t ? I0 : w0 : t ? w0 : I0;
  case "left":
  case "right":
    return t ? ff : hf;
  default:
    return []
  }
}

function pf(e, t, r, a) {
  const u = er(e);
  let n = mf(ht(e), r === "start", a);
  return u && (n = n.map(s => s + "-" + u), t && (n = n.concat(n.map(an)))), n
}

function za(e) {
  return e.replace(/left|right|bottom|top/g, t => sf[t])
}

function bf(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  }
}

function ac(e) {
  return typeof e != "number" ? bf(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  }
}

function Va(e) {
  const {
    x: t,
    y: r,
    width: a,
    height: u
  } = e;
  return {
    width: a,
    height: u,
    top: r,
    left: t,
    right: t + a,
    bottom: r + u,
    x: t,
    y: r
  }
}

function D0(e, t, r) {
  let {
    reference: a,
    floating: u
  } = e;
  const n = et(t),
    s = Nn(t),
    i = Sn(s),
    o = ht(t),
    c = n === "y",
    l = a.x + a.width / 2 - u.width / 2,
    h = a.y + a.height / 2 - u.height / 2,
    f = a[i] / 2 - u[i] / 2;
  let m;
  switch (o) {
  case "top":
    m = {
      x: l,
      y: a.y - u.height
    };
    break;
  case "bottom":
    m = {
      x: l,
      y: a.y + a.height
    };
    break;
  case "right":
    m = {
      x: a.x + a.width,
      y: h
    };
    break;
  case "left":
    m = {
      x: a.x - u.width,
      y: h
    };
    break;
  default:
    m = {
      x: a.x,
      y: a.y
    }
  }
  switch (er(t)) {
  case "start":
    m[s] -= f * (r && c ? -1 : 1);
    break;
  case "end":
    m[s] += f * (r && c ? -1 : 1);
    break
  }
  return m
}
const xf = async (e, t, r) => {
  const {
    placement: a = "bottom",
    strategy: u = "absolute",
    middleware: n = [],
    platform: s
  } = r, i = n.filter(Boolean), o = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let c = await s.getElementRects({
      reference: e,
      floating: t,
      strategy: u
    }),
    {
      x: l,
      y: h
    } = D0(c, a, o),
    f = a,
    m = {},
    p = 0;
  for (let b = 0; b < i.length; b++) {
    const {
      name: x,
      fn: T
    } = i[b], {
      x: E,
      y: A,
      data: v,
      reset: C
    } = await T({
      x: l,
      y: h,
      initialPlacement: a,
      placement: f,
      strategy: u,
      middlewareData: m,
      rects: c,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    l = E ?? l, h = A ?? h, m = {
      ...m,
      [x]: {
        ...m[x],
        ...v
      }
    }, C && p <= 50 && (p++, typeof C == "object" && (C.placement && (f = C.placement), C.rects && (c = C.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: u
    }) : C.rects), {
      x: l,
      y: h
    } = D0(c, f, o)), b = -1)
  }
  return {
    x: l,
    y: h,
    placement: f,
    strategy: u,
    middlewareData: m
  }
};
async function Ir(e, t) {
  var r;
  t === void 0 && (t = {});
  const {
    x: a,
    y: u,
    platform: n,
    rects: s,
    elements: i,
    strategy: o
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: l = "viewport",
    elementContext: h = "floating",
    altBoundary: f = !1,
    padding: m = 0
  } = ft(t, e), p = ac(m), x = i[f ? h === "floating" ? "reference" : "floating" : h], T = Va(await n.getClippingRect({
    element: (r = await (n.isElement == null ? void 0 : n.isElement(x))) == null || r ? x : x.contextElement || await (n.getDocumentElement == null ? void 0 : n.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: l,
    strategy: o
  })), E = h === "floating" ? {
    x: a,
    y: u,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, A = await (n.getOffsetParent == null ? void 0 : n.getOffsetParent(i.floating)), v = await (n.isElement == null ? void 0 : n.isElement(A)) ? await (n.getScale == null ? void 0 : n.getScale(A)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = Va(n.convertOffsetParentRelativeRectToViewportRelativeRect ? await n.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: E,
    offsetParent: A,
    strategy: o
  }) : E);
  return {
    top: (T.top - C.top + p.top) / v.y,
    bottom: (C.bottom - T.bottom + p.bottom) / v.y,
    left: (T.left - C.left + p.left) / v.x,
    right: (C.right - T.right + p.right) / v.x
  }
}
const Ef = e => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const {
        x: r,
        y: a,
        placement: u,
        rects: n,
        platform: s,
        elements: i,
        middlewareData: o
      } = t, {
        element: c,
        padding: l = 0
      } = ft(e, t) || {};
      if (c == null) return {};
      const h = ac(l),
        f = {
          x: r,
          y: a
        },
        m = Nn(u),
        p = Sn(m),
        b = await s.getDimensions(c),
        x = m === "y",
        T = x ? "top" : "left",
        E = x ? "bottom" : "right",
        A = x ? "clientHeight" : "clientWidth",
        v = n.reference[p] + n.reference[m] - f[m] - n.floating[p],
        C = f[m] - n.reference[m],
        N = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(c));
      let D = N ? N[A] : 0;
      (!D || !await (s.isElement == null ? void 0 : s.isElement(N))) && (D = i.floating[A] || n.floating[p]);
      const w = v / 2 - C / 2,
        U = D / 2 - b[p] / 2 - 1,
        I = vt(h[T], U),
        L = vt(h[E], U),
        M = I,
        F = D - b[p] - L,
        V = D / 2 - b[p] / 2 + w,
        K = rn(M, V, F),
        Z = !o.arrow && er(u) != null && V !== K && n.reference[p] / 2 - (V < M ? I : L) - b[p] / 2 < 0,
        re = Z ? V < M ? V - M : V - F : 0;
      return {
        [m]: f[m] + re,
        data: {
          [m]: K,
          centerOffset: V - K - re,
          ...Z && {
            alignmentOffset: re
          }
        },
        reset: Z
      }
    }
  }),
  gf = function (e) {
    return e === void 0 && (e = {}), {
      name: "flip",
      options: e,
      async fn(t) {
        var r, a;
        const {
          placement: u,
          middlewareData: n,
          rects: s,
          initialPlacement: i,
          platform: o,
          elements: c
        } = t, {
          mainAxis: l = !0,
          crossAxis: h = !0,
          fallbackPlacements: f,
          fallbackStrategy: m = "bestFit",
          fallbackAxisSideDirection: p = "none",
          flipAlignment: b = !0,
          ...x
        } = ft(e, t);
        if ((r = n.arrow) != null && r.alignmentOffset) return {};
        const T = ht(u),
          E = et(i),
          A = ht(i) === i,
          v = await (o.isRTL == null ? void 0 : o.isRTL(c.floating)),
          C = f || (A || !b ? [za(i)] : lf(i)),
          N = p !== "none";
        !f && N && C.push(...pf(i, b, p, v));
        const D = [i, ...C],
          w = await Ir(t, x),
          U = [];
        let I = ((a = n.flip) == null ? void 0 : a.overflows) || [];
        if (l && U.push(w[T]), h) {
          const V = df(u, s, v);
          U.push(w[V[0]], w[V[1]])
        }
        if (I = [...I, {
            placement: u,
            overflows: U
          }], !U.every(V => V <= 0)) {
          var L, M;
          const V = (((L = n.flip) == null ? void 0 : L.index) || 0) + 1,
            K = D[V];
          if (K && (!(h === "alignment" ? E !== et(K) : !1) || I.every(R => et(R.placement) === E ? R.overflows[0] > 0 : !0))) return {
            data: {
              index: V,
              overflows: I
            },
            reset: {
              placement: K
            }
          };
          let Z = (M = I.filter(re => re.overflows[0] <= 0).sort((re, R) => re.overflows[1] - R.overflows[1])[0]) == null ? void 0 : M.placement;
          if (!Z) switch (m) {
          case "bestFit": {
            var F;
            const re = (F = I.filter(R => {
              if (N) {
                const G = et(R.placement);
                return G === E || G === "y"
              }
              return !0
            }).map(R => [R.placement, R.overflows.filter(G => G > 0).reduce((G, j) => G + j, 0)]).sort((R, G) => R[1] - G[1])[0]) == null ? void 0 : F[0];
            re && (Z = re);
            break
          }
          case "initialPlacement":
            Z = i;
            break
          }
          if (u !== Z) return {
            reset: {
              placement: Z
            }
          }
        }
        return {}
      }
    }
  };

function O0(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  }
}

function L0(e) {
  return nf.some(t => e[t] >= 0)
}
const Af = function (e) {
    return e === void 0 && (e = {}), {
      name: "hide",
      options: e,
      async fn(t) {
        const {
          rects: r
        } = t, {
          strategy: a = "referenceHidden",
          ...u
        } = ft(e, t);
        switch (a) {
        case "referenceHidden": {
          const n = await Ir(t, {
              ...u,
              elementContext: "reference"
            }),
            s = O0(n, r.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: L0(s)
            }
          }
        }
        case "escaped": {
          const n = await Ir(t, {
              ...u,
              altBoundary: !0
            }),
            s = O0(n, r.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: L0(s)
            }
          }
        }
        default:
          return {}
        }
      }
    }
  },
  uc = new Set(["left", "top"]);
async function Tf(e, t) {
  const {
    placement: r,
    platform: a,
    elements: u
  } = e, n = await (a.isRTL == null ? void 0 : a.isRTL(u.floating)), s = ht(r), i = er(r), o = et(r) === "y", c = uc.has(s) ? -1 : 1, l = n && o ? -1 : 1, h = ft(t, e);
  let {
    mainAxis: f,
    crossAxis: m,
    alignmentAxis: p
  } = typeof h == "number" ? {
    mainAxis: h,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: h.mainAxis || 0,
    crossAxis: h.crossAxis || 0,
    alignmentAxis: h.alignmentAxis
  };
  return i && typeof p == "number" && (m = i === "end" ? p * -1 : p), o ? {
    x: m * l,
    y: f * c
  } : {
    x: f * c,
    y: m * l
  }
}
const vf = function (e) {
    return e === void 0 && (e = 0), {
      name: "offset",
      options: e,
      async fn(t) {
        var r, a;
        const {
          x: u,
          y: n,
          placement: s,
          middlewareData: i
        } = t, o = await Tf(t, e);
        return s === ((r = i.offset) == null ? void 0 : r.placement) && (a = i.arrow) != null && a.alignmentOffset ? {} : {
          x: u + o.x,
          y: n + o.y,
          data: {
            ...o,
            placement: s
          }
        }
      }
    }
  },
  _f = function (e) {
    return e === void 0 && (e = {}), {
      name: "shift",
      options: e,
      async fn(t) {
        const {
          x: r,
          y: a,
          placement: u
        } = t, {
          mainAxis: n = !0,
          crossAxis: s = !1,
          limiter: i = {
            fn: x => {
              let {
                x: T,
                y: E
              } = x;
              return {
                x: T,
                y: E
              }
            }
          },
          ...o
        } = ft(e, t), c = {
          x: r,
          y: a
        }, l = await Ir(t, o), h = et(ht(u)), f = Cn(h);
        let m = c[f],
          p = c[h];
        if (n) {
          const x = f === "y" ? "top" : "left",
            T = f === "y" ? "bottom" : "right",
            E = m + l[x],
            A = m - l[T];
          m = rn(E, m, A)
        }
        if (s) {
          const x = h === "y" ? "top" : "left",
            T = h === "y" ? "bottom" : "right",
            E = p + l[x],
            A = p - l[T];
          p = rn(E, p, A)
        }
        const b = i.fn({
          ...t,
          [f]: m,
          [h]: p
        });
        return {
          ...b,
          data: {
            x: b.x - r,
            y: b.y - a,
            enabled: {
              [f]: n,
              [h]: s
            }
          }
        }
      }
    }
  },
  yf = function (e) {
    return e === void 0 && (e = {}), {
      options: e,
      fn(t) {
        const {
          x: r,
          y: a,
          placement: u,
          rects: n,
          middlewareData: s
        } = t, {
          offset: i = 0,
          mainAxis: o = !0,
          crossAxis: c = !0
        } = ft(e, t), l = {
          x: r,
          y: a
        }, h = et(u), f = Cn(h);
        let m = l[f],
          p = l[h];
        const b = ft(i, t),
          x = typeof b == "number" ? {
            mainAxis: b,
            crossAxis: 0
          } : {
            mainAxis: 0,
            crossAxis: 0,
            ...b
          };
        if (o) {
          const A = f === "y" ? "height" : "width",
            v = n.reference[f] - n.floating[A] + x.mainAxis,
            C = n.reference[f] + n.reference[A] - x.mainAxis;
          m < v ? m = v : m > C && (m = C)
        }
        if (c) {
          var T, E;
          const A = f === "y" ? "width" : "height",
            v = uc.has(ht(u)),
            C = n.reference[h] - n.floating[A] + (v && ((T = s.offset) == null ? void 0 : T[h]) || 0) + (v ? 0 : x.crossAxis),
            N = n.reference[h] + n.reference[A] + (v ? 0 : ((E = s.offset) == null ? void 0 : E[h]) || 0) - (v ? x.crossAxis : 0);
          p < C ? p = C : p > N && (p = N)
        }
        return {
          [f]: m,
          [h]: p
        }
      }
    }
  },
  Cf = function (e) {
    return e === void 0 && (e = {}), {
      name: "size",
      options: e,
      async fn(t) {
        var r, a;
        const {
          placement: u,
          rects: n,
          platform: s,
          elements: i
        } = t, {
          apply: o = () => {},
          ...c
        } = ft(e, t), l = await Ir(t, c), h = ht(u), f = er(u), m = et(u) === "y", {
          width: p,
          height: b
        } = n.floating;
        let x, T;
        h === "top" || h === "bottom" ? (x = h, T = f === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (T = h, x = f === "end" ? "top" : "bottom");
        const E = b - l.top - l.bottom,
          A = p - l.left - l.right,
          v = vt(b - l[x], E),
          C = vt(p - l[T], A),
          N = !t.middlewareData.shift;
        let D = v,
          w = C;
        if ((r = t.middlewareData.shift) != null && r.enabled.x && (w = A), (a = t.middlewareData.shift) != null && a.enabled.y && (D = E), N && !f) {
          const I = Me(l.left, 0),
            L = Me(l.right, 0),
            M = Me(l.top, 0),
            F = Me(l.bottom, 0);
          m ? w = p - 2 * (I !== 0 || L !== 0 ? I + L : Me(l.left, l.right)) : D = b - 2 * (M !== 0 || F !== 0 ? M + F : Me(l.top, l.bottom))
        }
        await o({
          ...t,
          availableWidth: w,
          availableHeight: D
        });
        const U = await s.getDimensions(i.floating);
        return p !== U.width || b !== U.height ? {
          reset: {
            rects: !0
          }
        } : {}
      }
    }
  };

function du() {
  return typeof window < "u"
}

function tr(e) {
  return nc(e) ? (e.nodeName || "").toLowerCase() : "#document"
}

function He(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}

function nt(e) {
  var t;
  return (t = (nc(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement
}

function nc(e) {
  return du() ? e instanceof Node || e instanceof He(e).Node : !1
}

function Ge(e) {
  return du() ? e instanceof Element || e instanceof He(e).Element : !1
}

function ut(e) {
  return du() ? e instanceof HTMLElement || e instanceof He(e).HTMLElement : !1
}

function R0(e) {
  return !du() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof He(e).ShadowRoot
}
const Sf = new Set(["inline", "contents"]);

function Fr(e) {
  const {
    overflow: t,
    overflowX: r,
    overflowY: a,
    display: u
  } = je(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + a + r) && !Sf.has(u)
}
const Nf = new Set(["table", "td", "th"]);

function wf(e) {
  return Nf.has(tr(e))
}
const If = [":popover-open", ":modal"];

function lu(e) {
  return If.some(t => {
    try {
      return e.matches(t)
    } catch {
      return !1
    }
  })
}
const Df = ["transform", "translate", "scale", "rotate", "perspective"],
  Of = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  Lf = ["paint", "layout", "strict", "content"];

function wn(e) {
  const t = In(),
    r = Ge(e) ? je(e) : e;
  return Df.some(a => r[a] ? r[a] !== "none" : !1) || (r.containerType ? r.containerType !== "normal" : !1) || !t && (r.backdropFilter ? r.backdropFilter !== "none" : !1) || !t && (r.filter ? r.filter !== "none" : !1) || Of.some(a => (r.willChange || "").includes(a)) || Lf.some(a => (r.contain || "").includes(a))
}

function Rf(e) {
  let t = _t(e);
  for (; ut(t) && !Xt(t);) {
    if (wn(t)) return t;
    if (lu(t)) return null;
    t = _t(t)
  }
  return null
}

function In() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none")
}
const kf = new Set(["html", "body", "#document"]);

function Xt(e) {
  return kf.has(tr(e))
}

function je(e) {
  return He(e).getComputedStyle(e)
}

function fu(e) {
  return Ge(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  }
}

function _t(e) {
  if (tr(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || R0(e) && e.host || nt(e);
  return R0(t) ? t.host : t
}

function sc(e) {
  const t = _t(e);
  return Xt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ut(t) && Fr(t) ? t : sc(t)
}

function Dr(e, t, r) {
  var a;
  t === void 0 && (t = []), r === void 0 && (r = !0);
  const u = sc(e),
    n = u === ((a = e.ownerDocument) == null ? void 0 : a.body),
    s = He(u);
  if (n) {
    const i = un(s);
    return t.concat(s, s.visualViewport || [], Fr(u) ? u : [], i && r ? Dr(i) : [])
  }
  return t.concat(u, Dr(u, [], r))
}

function un(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
}

function ic(e) {
  const t = je(e);
  let r = parseFloat(t.width) || 0,
    a = parseFloat(t.height) || 0;
  const u = ut(e),
    n = u ? e.offsetWidth : r,
    s = u ? e.offsetHeight : a,
    i = Ya(r) !== n || Ya(a) !== s;
  return i && (r = n, a = s), {
    width: r,
    height: a,
    $: i
  }
}

function Dn(e) {
  return Ge(e) ? e : e.contextElement
}

function Gt(e) {
  const t = Dn(e);
  if (!ut(t)) return tt(1);
  const r = t.getBoundingClientRect(),
    {
      width: a,
      height: u,
      $: n
    } = ic(t);
  let s = (n ? Ya(r.width) : r.width) / a,
    i = (n ? Ya(r.height) : r.height) / u;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  }
}
const Bf = tt(0);

function oc(e) {
  const t = He(e);
  return !In() || !t.visualViewport ? Bf : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  }
}

function Ff(e, t, r) {
  return t === void 0 && (t = !1), !r || t && r !== He(e) ? !1 : t
}

function Rt(e, t, r, a) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  const u = e.getBoundingClientRect(),
    n = Dn(e);
  let s = tt(1);
  t && (a ? Ge(a) && (s = Gt(a)) : s = Gt(e));
  const i = Ff(n, r, a) ? oc(n) : tt(0);
  let o = (u.left + i.x) / s.x,
    c = (u.top + i.y) / s.y,
    l = u.width / s.x,
    h = u.height / s.y;
  if (n) {
    const f = He(n),
      m = a && Ge(a) ? He(a) : a;
    let p = f,
      b = un(p);
    for (; b && a && m !== p;) {
      const x = Gt(b),
        T = b.getBoundingClientRect(),
        E = je(b),
        A = T.left + (b.clientLeft + parseFloat(E.paddingLeft)) * x.x,
        v = T.top + (b.clientTop + parseFloat(E.paddingTop)) * x.y;
      o *= x.x, c *= x.y, l *= x.x, h *= x.y, o += A, c += v, p = He(b), b = un(p)
    }
  }
  return Va({
    width: l,
    height: h,
    x: o,
    y: c
  })
}

function hu(e, t) {
  const r = fu(e).scrollLeft;
  return t ? t.left + r : Rt(nt(e)).left + r
}

function cc(e, t) {
  const r = e.getBoundingClientRect(),
    a = r.left + t.scrollLeft - hu(e, r),
    u = r.top + t.scrollTop;
  return {
    x: a,
    y: u
  }
}

function Pf(e) {
  let {
    elements: t,
    rect: r,
    offsetParent: a,
    strategy: u
  } = e;
  const n = u === "fixed",
    s = nt(a),
    i = t ? lu(t.floating) : !1;
  if (a === s || i && n) return r;
  let o = {
      scrollLeft: 0,
      scrollTop: 0
    },
    c = tt(1);
  const l = tt(0),
    h = ut(a);
  if ((h || !h && !n) && ((tr(a) !== "body" || Fr(s)) && (o = fu(a)), ut(a))) {
    const m = Rt(a);
    c = Gt(a), l.x = m.x + a.clientLeft, l.y = m.y + a.clientTop
  }
  const f = s && !h && !n ? cc(s, o) : tt(0);
  return {
    width: r.width * c.x,
    height: r.height * c.y,
    x: r.x * c.x - o.scrollLeft * c.x + l.x + f.x,
    y: r.y * c.y - o.scrollTop * c.y + l.y + f.y
  }
}

function Mf(e) {
  return Array.from(e.getClientRects())
}

function Uf(e) {
  const t = nt(e),
    r = fu(e),
    a = e.ownerDocument.body,
    u = Me(t.scrollWidth, t.clientWidth, a.scrollWidth, a.clientWidth),
    n = Me(t.scrollHeight, t.clientHeight, a.scrollHeight, a.clientHeight);
  let s = -r.scrollLeft + hu(e);
  const i = -r.scrollTop;
  return je(a).direction === "rtl" && (s += Me(t.clientWidth, a.clientWidth) - u), {
    width: u,
    height: n,
    x: s,
    y: i
  }
}
const k0 = 25;

function Hf(e, t) {
  const r = He(e),
    a = nt(e),
    u = r.visualViewport;
  let n = a.clientWidth,
    s = a.clientHeight,
    i = 0,
    o = 0;
  if (u) {
    n = u.width, s = u.height;
    const l = In();
    (!l || l && t === "fixed") && (i = u.offsetLeft, o = u.offsetTop)
  }
  const c = hu(a);
  if (c <= 0) {
    const l = a.ownerDocument,
      h = l.body,
      f = getComputedStyle(h),
      m = l.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0,
      p = Math.abs(a.clientWidth - h.clientWidth - m);
    p <= k0 && (n -= p)
  } else c <= k0 && (n += c);
  return {
    width: n,
    height: s,
    x: i,
    y: o
  }
}
const $f = new Set(["absolute", "fixed"]);

function qf(e, t) {
  const r = Rt(e, !0, t === "fixed"),
    a = r.top + e.clientTop,
    u = r.left + e.clientLeft,
    n = ut(e) ? Gt(e) : tt(1),
    s = e.clientWidth * n.x,
    i = e.clientHeight * n.y,
    o = u * n.x,
    c = a * n.y;
  return {
    width: s,
    height: i,
    x: o,
    y: c
  }
}

function B0(e, t, r) {
  let a;
  if (t === "viewport") a = Hf(e, r);
  else if (t === "document") a = Uf(nt(e));
  else if (Ge(t)) a = qf(t, r);
  else {
    const u = oc(e);
    a = {
      x: t.x - u.x,
      y: t.y - u.y,
      width: t.width,
      height: t.height
    }
  }
  return Va(a)
}

function dc(e, t) {
  const r = _t(e);
  return r === t || !Ge(r) || Xt(r) ? !1 : je(r).position === "fixed" || dc(r, t)
}

function Wf(e, t) {
  const r = t.get(e);
  if (r) return r;
  let a = Dr(e, [], !1).filter(i => Ge(i) && tr(i) !== "body"),
    u = null;
  const n = je(e).position === "fixed";
  let s = n ? _t(e) : e;
  for (; Ge(s) && !Xt(s);) {
    const i = je(s),
      o = wn(s);
    !o && i.position === "fixed" && (u = null), (n ? !o && !u : !o && i.position === "static" && !!u && $f.has(u.position) || Fr(s) && !o && dc(e, s)) ? a = a.filter(l => l !== s) : u = i, s = _t(s)
  }
  return t.set(e, a), a
}

function Yf(e) {
  let {
    element: t,
    boundary: r,
    rootBoundary: a,
    strategy: u
  } = e;
  const s = [...r === "clippingAncestors" ? lu(t) ? [] : Wf(t, this._c) : [].concat(r), a],
    i = s[0],
    o = s.reduce((c, l) => {
      const h = B0(t, l, u);
      return c.top = Me(h.top, c.top), c.right = vt(h.right, c.right), c.bottom = vt(h.bottom, c.bottom), c.left = Me(h.left, c.left), c
    }, B0(t, i, u));
  return {
    width: o.right - o.left,
    height: o.bottom - o.top,
    x: o.left,
    y: o.top
  }
}

function zf(e) {
  const {
    width: t,
    height: r
  } = ic(e);
  return {
    width: t,
    height: r
  }
}

function Vf(e, t, r) {
  const a = ut(t),
    u = nt(t),
    n = r === "fixed",
    s = Rt(e, !0, n, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const o = tt(0);

  function c() {
    o.x = hu(u)
  }
  if (a || !a && !n)
    if ((tr(t) !== "body" || Fr(u)) && (i = fu(t)), a) {
      const m = Rt(t, !0, n, t);
      o.x = m.x + t.clientLeft, o.y = m.y + t.clientTop
    } else u && c();
  n && !a && u && c();
  const l = u && !a && !n ? cc(u, i) : tt(0),
    h = s.left + i.scrollLeft - o.x - l.x,
    f = s.top + i.scrollTop - o.y - l.y;
  return {
    x: h,
    y: f,
    width: s.width,
    height: s.height
  }
}

function Lu(e) {
  return je(e).position === "static"
}

function F0(e, t) {
  if (!ut(e) || je(e).position === "fixed") return null;
  if (t) return t(e);
  let r = e.offsetParent;
  return nt(e) === r && (r = r.ownerDocument.body), r
}

function lc(e, t) {
  const r = He(e);
  if (lu(e)) return r;
  if (!ut(e)) {
    let u = _t(e);
    for (; u && !Xt(u);) {
      if (Ge(u) && !Lu(u)) return u;
      u = _t(u)
    }
    return r
  }
  let a = F0(e, t);
  for (; a && wf(a) && Lu(a);) a = F0(a, t);
  return a && Xt(a) && Lu(a) && !wn(a) ? r : a || Rf(e) || r
}
const Gf = async function (e) {
  const t = this.getOffsetParent || lc,
    r = this.getDimensions,
    a = await r(e.floating);
  return {
    reference: Vf(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: a.width,
      height: a.height
    }
  }
};

function jf(e) {
  return je(e).direction === "rtl"
}
const Kf = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Pf,
  getDocumentElement: nt,
  getClippingRect: Yf,
  getOffsetParent: lc,
  getElementRects: Gf,
  getClientRects: Mf,
  getDimensions: zf,
  getScale: Gt,
  isElement: Ge,
  isRTL: jf
};

function fc(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
}

function Xf(e, t) {
  let r = null,
    a;
  const u = nt(e);

  function n() {
    var i;
    clearTimeout(a), (i = r) == null || i.disconnect(), r = null
  }

  function s(i, o) {
    i === void 0 && (i = !1), o === void 0 && (o = 1), n();
    const c = e.getBoundingClientRect(),
      {
        left: l,
        top: h,
        width: f,
        height: m
      } = c;
    if (i || t(), !f || !m) return;
    const p = zr(h),
      b = zr(u.clientWidth - (l + f)),
      x = zr(u.clientHeight - (h + m)),
      T = zr(l),
      A = {
        rootMargin: -p + "px " + -b + "px " + -x + "px " + -T + "px",
        threshold: Me(0, vt(1, o)) || 1
      };
    let v = !0;

    function C(N) {
      const D = N[0].intersectionRatio;
      if (D !== o) {
        if (!v) return s();
        D ? s(!1, D) : a = setTimeout(() => {
          s(!1, 1e-7)
        }, 1e3)
      }
      D === 1 && !fc(c, e.getBoundingClientRect()) && s(), v = !1
    }
    try {
      r = new IntersectionObserver(C, {
        ...A,
        root: u.ownerDocument
      })
    } catch {
      r = new IntersectionObserver(C, A)
    }
    r.observe(e)
  }
  return s(!0), n
}

function Tg(e, t, r, a) {
  a === void 0 && (a = {});
  const {
    ancestorScroll: u = !0,
    ancestorResize: n = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: o = !1
  } = a, c = Dn(e), l = u || n ? [...c ? Dr(c) : [], ...Dr(t)] : [];
  l.forEach(T => {
    u && T.addEventListener("scroll", r, {
      passive: !0
    }), n && T.addEventListener("resize", r)
  });
  const h = c && i ? Xf(c, r) : null;
  let f = -1,
    m = null;
  s && (m = new ResizeObserver(T => {
    let [E] = T;
    E && E.target === c && m && (m.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var A;
      (A = m) == null || A.observe(t)
    })), r()
  }), c && !o && m.observe(c), m.observe(t));
  let p, b = o ? Rt(e) : null;
  o && x();

  function x() {
    const T = Rt(e);
    b && !fc(b, T) && r(), b = T, p = requestAnimationFrame(x)
  }
  return r(), () => {
    var T;
    l.forEach(E => {
      u && E.removeEventListener("scroll", r), n && E.removeEventListener("resize", r)
    }), h == null || h(), (T = m) == null || T.disconnect(), m = null, o && cancelAnimationFrame(p)
  }
}
const vg = vf,
  _g = _f,
  yg = gf,
  Cg = Cf,
  Sg = Af,
  Ng = Ef,
  wg = yf,
  Ig = (e, t, r) => {
    const a = new Map,
      u = {
        platform: Kf,
        ...r
      },
      n = {
        ...u.platform,
        _c: a
      };
    return xf(e, t, {
      ...u,
      platform: n
    })
  };
var Qf = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body
  },
  Yt = new WeakMap,
  Vr = new WeakMap,
  Gr = {},
  Ru = 0,
  hc = function (e) {
    return e && (e.host || hc(e.parentNode))
  },
  Jf = function (e, t) {
    return t.map(function (r) {
      if (e.contains(r)) return r;
      var a = hc(r);
      return a && e.contains(a) ? a : (console.error("aria-hidden", r, "in not contained inside", e, ". Doing nothing"), null)
    }).filter(function (r) {
      return !!r
    })
  },
  Zf = function (e, t, r, a) {
    var u = Jf(t, Array.isArray(e) ? e : [e]);
    Gr[r] || (Gr[r] = new WeakMap);
    var n = Gr[r],
      s = [],
      i = new Set,
      o = new Set(u),
      c = function (h) {
        !h || i.has(h) || (i.add(h), c(h.parentNode))
      };
    u.forEach(c);
    var l = function (h) {
      !h || o.has(h) || Array.prototype.forEach.call(h.children, function (f) {
        if (i.has(f)) l(f);
        else try {
          var m = f.getAttribute(a),
            p = m !== null && m !== "false",
            b = (Yt.get(f) || 0) + 1,
            x = (n.get(f) || 0) + 1;
          Yt.set(f, b), n.set(f, x), s.push(f), b === 1 && p && Vr.set(f, !0), x === 1 && f.setAttribute(r, "true"), p || f.setAttribute(a, "true")
        } catch (T) {
          console.error("aria-hidden: cannot operate on ", f, T)
        }
      })
    };
    return l(t), i.clear(), Ru++,
      function () {
        s.forEach(function (h) {
          var f = Yt.get(h) - 1,
            m = n.get(h) - 1;
          Yt.set(h, f), n.set(h, m), f || (Vr.has(h) || h.removeAttribute(a), Vr.delete(h)), m || h.removeAttribute(r)
        }), Ru--, Ru || (Yt = new WeakMap, Yt = new WeakMap, Vr = new WeakMap, Gr = {})
      }
  },
  Dg = function (e, t, r) {
    r === void 0 && (r = "data-aria-hidden");
    var a = Array.from(Array.isArray(e) ? e : [e]),
      u = Qf(e);
    return u ? (a.push.apply(a, Array.from(u.querySelectorAll("[aria-live], script"))), Zf(a, u, r, "aria-hidden")) : function () {
      return null
    }
  },
  P0 = function () {
    return P0 = Object.assign || function (t) {
      for (var r, a = 1, u = arguments.length; a < u; a++) {
        r = arguments[a];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
      }
      return t
    }, P0.apply(this, arguments)
  };

function Og(e, t) {
  var r = {};
  for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (r[a] = e[a]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var u = 0, a = Object.getOwnPropertySymbols(e); u < a.length; u++) t.indexOf(a[u]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[u]) && (r[a[u]] = e[a[u]]);
  return r
}

function Lg(e, t, r) {
  if (r || arguments.length === 2)
    for (var a = 0, u = t.length, n; a < u; a++)(n || !(a in t)) && (n || (n = Array.prototype.slice.call(t, 0, a)), n[a] = t[a]);
  return e.concat(n || Array.prototype.slice.call(t))
}
var Rg = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__
};

function mc(e) {
  var t, r, a = "";
  if (typeof e == "string" || typeof e == "number") a += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var u = e.length;
      for (t = 0; t < u; t++) e[t] && (r = mc(e[t])) && (a && (a += " "), a += r)
    } else
      for (r in e) e[r] && (a && (a += " "), a += r);
  return a
}

function e1() {
  for (var e, t, r = 0, a = "", u = arguments.length; r < u; r++)(e = arguments[r]) && (t = mc(e)) && (a && (a += " "), a += t);
  return a
}
const On = "-",
  t1 = e => {
    const t = a1(e),
      {
        conflictingClassGroups: r,
        conflictingClassGroupModifiers: a
      } = e;
    return {
      getClassGroupId: s => {
        const i = s.split(On);
        return i[0] === "" && i.length !== 1 && i.shift(), pc(i, t) || r1(s)
      },
      getConflictingClassGroupIds: (s, i) => {
        const o = r[s] || [];
        return i && a[s] ? [...o, ...a[s]] : o
      }
    }
  },
  pc = (e, t) => {
    var s;
    if (e.length === 0) return t.classGroupId;
    const r = e[0],
      a = t.nextPart.get(r),
      u = a ? pc(e.slice(1), a) : void 0;
    if (u) return u;
    if (t.validators.length === 0) return;
    const n = e.join(On);
    return (s = t.validators.find(({
      validator: i
    }) => i(n))) == null ? void 0 : s.classGroupId
  },
  M0 = /^\[(.+)\]$/,
  r1 = e => {
    if (M0.test(e)) {
      const t = M0.exec(e)[1],
        r = t == null ? void 0 : t.substring(0, t.indexOf(":"));
      if (r) return "arbitrary.." + r
    }
  },
  a1 = e => {
    const {
      theme: t,
      classGroups: r
    } = e, a = {
      nextPart: new Map,
      validators: []
    };
    for (const u in r) nn(r[u], a, u, t);
    return a
  },
  nn = (e, t, r, a) => {
    e.forEach(u => {
      if (typeof u == "string") {
        const n = u === "" ? t : U0(t, u);
        n.classGroupId = r;
        return
      }
      if (typeof u == "function") {
        if (u1(u)) {
          nn(u(a), t, r, a);
          return
        }
        t.validators.push({
          validator: u,
          classGroupId: r
        });
        return
      }
      Object.entries(u).forEach(([n, s]) => {
        nn(s, U0(t, n), r, a)
      })
    })
  },
  U0 = (e, t) => {
    let r = e;
    return t.split(On).forEach(a => {
      r.nextPart.has(a) || r.nextPart.set(a, {
        nextPart: new Map,
        validators: []
      }), r = r.nextPart.get(a)
    }), r
  },
  u1 = e => e.isThemeGetter,
  n1 = e => {
    if (e < 1) return {
      get: () => {},
      set: () => {}
    };
    let t = 0,
      r = new Map,
      a = new Map;
    const u = (n, s) => {
      r.set(n, s), t++, t > e && (t = 0, a = r, r = new Map)
    };
    return {
      get(n) {
        let s = r.get(n);
        if (s !== void 0) return s;
        if ((s = a.get(n)) !== void 0) return u(n, s), s
      },
      set(n, s) {
        r.has(n) ? r.set(n, s) : u(n, s)
      }
    }
  },
  sn = "!",
  on = ":",
  s1 = on.length,
  i1 = e => {
    const {
      prefix: t,
      experimentalParseClassName: r
    } = e;
    let a = u => {
      const n = [];
      let s = 0,
        i = 0,
        o = 0,
        c;
      for (let p = 0; p < u.length; p++) {
        let b = u[p];
        if (s === 0 && i === 0) {
          if (b === on) {
            n.push(u.slice(o, p)), o = p + s1;
            continue
          }
          if (b === "/") {
            c = p;
            continue
          }
        }
        b === "[" ? s++ : b === "]" ? s-- : b === "(" ? i++ : b === ")" && i--
      }
      const l = n.length === 0 ? u : u.substring(o),
        h = o1(l),
        f = h !== l,
        m = c && c > o ? c - o : void 0;
      return {
        modifiers: n,
        hasImportantModifier: f,
        baseClassName: h,
        maybePostfixModifierPosition: m
      }
    };
    if (t) {
      const u = t + on,
        n = a;
      a = s => s.startsWith(u) ? n(s.substring(u.length)) : {
        isExternal: !0,
        modifiers: [],
        hasImportantModifier: !1,
        baseClassName: s,
        maybePostfixModifierPosition: void 0
      }
    }
    if (r) {
      const u = a;
      a = n => r({
        className: n,
        parseClassName: u
      })
    }
    return a
  },
  o1 = e => e.endsWith(sn) ? e.substring(0, e.length - 1) : e.startsWith(sn) ? e.substring(1) : e,
  c1 = e => {
    const t = Object.fromEntries(e.orderSensitiveModifiers.map(a => [a, !0]));
    return a => {
      if (a.length <= 1) return a;
      const u = [];
      let n = [];
      return a.forEach(s => {
        s[0] === "[" || t[s] ? (u.push(...n.sort(), s), n = []) : n.push(s)
      }), u.push(...n.sort()), u
    }
  },
  d1 = e => ({
    cache: n1(e.cacheSize),
    parseClassName: i1(e),
    sortModifiers: c1(e),
    ...t1(e)
  }),
  l1 = /\s+/,
  f1 = (e, t) => {
    const {
      parseClassName: r,
      getClassGroupId: a,
      getConflictingClassGroupIds: u,
      sortModifiers: n
    } = t, s = [], i = e.trim().split(l1);
    let o = "";
    for (let c = i.length - 1; c >= 0; c -= 1) {
      const l = i[c],
        {
          isExternal: h,
          modifiers: f,
          hasImportantModifier: m,
          baseClassName: p,
          maybePostfixModifierPosition: b
        } = r(l);
      if (h) {
        o = l + (o.length > 0 ? " " + o : o);
        continue
      }
      let x = !!b,
        T = a(x ? p.substring(0, b) : p);
      if (!T) {
        if (!x) {
          o = l + (o.length > 0 ? " " + o : o);
          continue
        }
        if (T = a(p), !T) {
          o = l + (o.length > 0 ? " " + o : o);
          continue
        }
        x = !1
      }
      const E = n(f).join(":"),
        A = m ? E + sn : E,
        v = A + T;
      if (s.includes(v)) continue;
      s.push(v);
      const C = u(T, x);
      for (let N = 0; N < C.length; ++N) {
        const D = C[N];
        s.push(A + D)
      }
      o = l + (o.length > 0 ? " " + o : o)
    }
    return o
  };

function h1() {
  let e = 0,
    t, r, a = "";
  for (; e < arguments.length;)(t = arguments[e++]) && (r = bc(t)) && (a && (a += " "), a += r);
  return a
}
const bc = e => {
  if (typeof e == "string") return e;
  let t, r = "";
  for (let a = 0; a < e.length; a++) e[a] && (t = bc(e[a])) && (r && (r += " "), r += t);
  return r
};

function m1(e, ...t) {
  let r, a, u, n = s;

  function s(o) {
    const c = t.reduce((l, h) => h(l), e());
    return r = d1(c), a = r.cache.get, u = r.cache.set, n = i, i(o)
  }

  function i(o) {
    const c = a(o);
    if (c) return c;
    const l = f1(o, r);
    return u(o, l), l
  }
  return function () {
    return n(h1.apply(null, arguments))
  }
}
const Ae = e => {
    const t = r => r[e] || [];
    return t.isThemeGetter = !0, t
  },
  xc = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Ec = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  p1 = /^\d+\/\d+$/,
  b1 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  x1 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  E1 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  g1 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  A1 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  zt = e => p1.test(e),
  ne = e => !!e && !Number.isNaN(Number(e)),
  xt = e => !!e && Number.isInteger(Number(e)),
  ku = e => e.endsWith("%") && ne(e.slice(0, -1)),
  st = e => b1.test(e),
  T1 = () => !0,
  v1 = e => x1.test(e) && !E1.test(e),
  gc = () => !1,
  _1 = e => g1.test(e),
  y1 = e => A1.test(e),
  C1 = e => !Q(e) && !J(e),
  S1 = e => rr(e, vc, gc),
  Q = e => xc.test(e),
  Nt = e => rr(e, _c, v1),
  Bu = e => rr(e, O1, ne),
  H0 = e => rr(e, Ac, gc),
  N1 = e => rr(e, Tc, y1),
  jr = e => rr(e, yc, _1),
  J = e => Ec.test(e),
  fr = e => ar(e, _c),
  w1 = e => ar(e, L1),
  $0 = e => ar(e, Ac),
  I1 = e => ar(e, vc),
  D1 = e => ar(e, Tc),
  Kr = e => ar(e, yc, !0),
  rr = (e, t, r) => {
    const a = xc.exec(e);
    return a ? a[1] ? t(a[1]) : r(a[2]) : !1
  },
  ar = (e, t, r = !1) => {
    const a = Ec.exec(e);
    return a ? a[1] ? t(a[1]) : r : !1
  },
  Ac = e => e === "position" || e === "percentage",
  Tc = e => e === "image" || e === "url",
  vc = e => e === "length" || e === "size" || e === "bg-size",
  _c = e => e === "length",
  O1 = e => e === "number",
  L1 = e => e === "family-name",
  yc = e => e === "shadow",
  R1 = () => {
    const e = Ae("color"),
      t = Ae("font"),
      r = Ae("text"),
      a = Ae("font-weight"),
      u = Ae("tracking"),
      n = Ae("leading"),
      s = Ae("breakpoint"),
      i = Ae("container"),
      o = Ae("spacing"),
      c = Ae("radius"),
      l = Ae("shadow"),
      h = Ae("inset-shadow"),
      f = Ae("text-shadow"),
      m = Ae("drop-shadow"),
      p = Ae("blur"),
      b = Ae("perspective"),
      x = Ae("aspect"),
      T = Ae("ease"),
      E = Ae("animate"),
      A = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
      v = () => ["center", "top", "bottom", "left", "right", "top-left", "left-top", "top-right", "right-top", "bottom-right", "right-bottom", "bottom-left", "left-bottom"],
      C = () => [...v(), J, Q],
      N = () => ["auto", "hidden", "clip", "visible", "scroll"],
      D = () => ["auto", "contain", "none"],
      w = () => [J, Q, o],
      U = () => [zt, "full", "auto", ...w()],
      I = () => [xt, "none", "subgrid", J, Q],
      L = () => ["auto", {
        span: ["full", xt, J, Q]
      }, xt, J, Q],
      M = () => [xt, "auto", J, Q],
      F = () => ["auto", "min", "max", "fr", J, Q],
      V = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"],
      K = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"],
      Z = () => ["auto", ...w()],
      re = () => [zt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...w()],
      R = () => [e, J, Q],
      G = () => [...v(), $0, H0, {
        position: [J, Q]
      }],
      j = () => ["no-repeat", {
        repeat: ["", "x", "y", "space", "round"]
      }],
      P = () => ["auto", "cover", "contain", I1, S1, {
        size: [J, Q]
      }],
      $ = () => [ku, fr, Nt],
      q = () => ["", "none", "full", c, J, Q],
      H = () => ["", ne, fr, Nt],
      de = () => ["solid", "dashed", "dotted", "double"],
      oe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"],
      se = () => [ne, ku, $0, H0],
      ue = () => ["", "none", p, J, Q],
      Xe = () => ["none", ne, J, Q],
      We = () => ["none", ne, J, Q],
      St = () => [ne, J, Q],
      Qe = () => [zt, "full", ...w()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [st],
        breakpoint: [st],
        color: [T1],
        container: [st],
        "drop-shadow": [st],
        ease: ["in", "out", "in-out"],
        font: [C1],
        "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
        "inset-shadow": [st],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
        radius: [st],
        shadow: [st],
        spacing: ["px", ne],
        text: [st],
        "text-shadow": [st],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
      },
      classGroups: {
        aspect: [{
          aspect: ["auto", "square", zt, Q, J, x]
        }],
        container: ["container"],
        columns: [{
          columns: [ne, Q, J, i]
        }],
        "break-after": [{
          "break-after": A()
        }],
        "break-before": [{
          "break-before": A()
        }],
        "break-inside": [{
          "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
        }],
        "box-decoration": [{
          "box-decoration": ["slice", "clone"]
        }],
        box: [{
          box: ["border", "content"]
        }],
        display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
        sr: ["sr-only", "not-sr-only"],
        float: [{
          float: ["right", "left", "none", "start", "end"]
        }],
        clear: [{
          clear: ["left", "right", "both", "none", "start", "end"]
        }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [{
          object: ["contain", "cover", "fill", "none", "scale-down"]
        }],
        "object-position": [{
          object: C()
        }],
        overflow: [{
          overflow: N()
        }],
        "overflow-x": [{
          "overflow-x": N()
        }],
        "overflow-y": [{
          "overflow-y": N()
        }],
        overscroll: [{
          overscroll: D()
        }],
        "overscroll-x": [{
          "overscroll-x": D()
        }],
        "overscroll-y": [{
          "overscroll-y": D()
        }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{
          inset: U()
        }],
        "inset-x": [{
          "inset-x": U()
        }],
        "inset-y": [{
          "inset-y": U()
        }],
        start: [{
          start: U()
        }],
        end: [{
          end: U()
        }],
        top: [{
          top: U()
        }],
        right: [{
          right: U()
        }],
        bottom: [{
          bottom: U()
        }],
        left: [{
          left: U()
        }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{
          z: [xt, "auto", J, Q]
        }],
        basis: [{
          basis: [zt, "full", "auto", i, ...w()]
        }],
        "flex-direction": [{
          flex: ["row", "row-reverse", "col", "col-reverse"]
        }],
        "flex-wrap": [{
          flex: ["nowrap", "wrap", "wrap-reverse"]
        }],
        flex: [{
          flex: [ne, zt, "auto", "initial", "none", Q]
        }],
        grow: [{
          grow: ["", ne, J, Q]
        }],
        shrink: [{
          shrink: ["", ne, J, Q]
        }],
        order: [{
          order: [xt, "first", "last", "none", J, Q]
        }],
        "grid-cols": [{
          "grid-cols": I()
        }],
        "col-start-end": [{
          col: L()
        }],
        "col-start": [{
          "col-start": M()
        }],
        "col-end": [{
          "col-end": M()
        }],
        "grid-rows": [{
          "grid-rows": I()
        }],
        "row-start-end": [{
          row: L()
        }],
        "row-start": [{
          "row-start": M()
        }],
        "row-end": [{
          "row-end": M()
        }],
        "grid-flow": [{
          "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
        }],
        "auto-cols": [{
          "auto-cols": F()
        }],
        "auto-rows": [{
          "auto-rows": F()
        }],
        gap: [{
          gap: w()
        }],
        "gap-x": [{
          "gap-x": w()
        }],
        "gap-y": [{
          "gap-y": w()
        }],
        "justify-content": [{
          justify: [...V(), "normal"]
        }],
        "justify-items": [{
          "justify-items": [...K(), "normal"]
        }],
        "justify-self": [{
          "justify-self": ["auto", ...K()]
        }],
        "align-content": [{
          content: ["normal", ...V()]
        }],
        "align-items": [{
          items: [...K(), {
            baseline: ["", "last"]
          }]
        }],
        "align-self": [{
          self: ["auto", ...K(), {
            baseline: ["", "last"]
          }]
        }],
        "place-content": [{
          "place-content": V()
        }],
        "place-items": [{
          "place-items": [...K(), "baseline"]
        }],
        "place-self": [{
          "place-self": ["auto", ...K()]
        }],
        p: [{
          p: w()
        }],
        px: [{
          px: w()
        }],
        py: [{
          py: w()
        }],
        ps: [{
          ps: w()
        }],
        pe: [{
          pe: w()
        }],
        pt: [{
          pt: w()
        }],
        pr: [{
          pr: w()
        }],
        pb: [{
          pb: w()
        }],
        pl: [{
          pl: w()
        }],
        m: [{
          m: Z()
        }],
        mx: [{
          mx: Z()
        }],
        my: [{
          my: Z()
        }],
        ms: [{
          ms: Z()
        }],
        me: [{
          me: Z()
        }],
        mt: [{
          mt: Z()
        }],
        mr: [{
          mr: Z()
        }],
        mb: [{
          mb: Z()
        }],
        ml: [{
          ml: Z()
        }],
        "space-x": [{
          "space-x": w()
        }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{
          "space-y": w()
        }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{
          size: re()
        }],
        w: [{
          w: [i, "screen", ...re()]
        }],
        "min-w": [{
          "min-w": [i, "screen", "none", ...re()]
        }],
        "max-w": [{
          "max-w": [i, "screen", "none", "prose", {
            screen: [s]
          }, ...re()]
        }],
        h: [{
          h: ["screen", "lh", ...re()]
        }],
        "min-h": [{
          "min-h": ["screen", "lh", "none", ...re()]
        }],
        "max-h": [{
          "max-h": ["screen", "lh", ...re()]
        }],
        "font-size": [{
          text: ["base", r, fr, Nt]
        }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{
          font: [a, J, Bu]
        }],
        "font-stretch": [{
          "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ku, Q]
        }],
        "font-family": [{
          font: [w1, Q, t]
        }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{
          tracking: [u, J, Q]
        }],
        "line-clamp": [{
          "line-clamp": [ne, "none", J, Bu]
        }],
        leading: [{
          leading: [n, ...w()]
        }],
        "list-image": [{
          "list-image": ["none", J, Q]
        }],
        "list-style-position": [{
          list: ["inside", "outside"]
        }],
        "list-style-type": [{
          list: ["disc", "decimal", "none", J, Q]
        }],
        "text-alignment": [{
          text: ["left", "center", "right", "justify", "start", "end"]
        }],
        "placeholder-color": [{
          placeholder: R()
        }],
        "text-color": [{
          text: R()
        }],
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        "text-decoration-style": [{
          decoration: [...de(), "wavy"]
        }],
        "text-decoration-thickness": [{
          decoration: [ne, "from-font", "auto", J, Nt]
        }],
        "text-decoration-color": [{
          decoration: R()
        }],
        "underline-offset": [{
          "underline-offset": [ne, "auto", J, Q]
        }],
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{
          text: ["wrap", "nowrap", "balance", "pretty"]
        }],
        indent: [{
          indent: w()
        }],
        "vertical-align": [{
          align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", J, Q]
        }],
        whitespace: [{
          whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
        }],
        break: [{
          break: ["normal", "words", "all", "keep"]
        }],
        wrap: [{
          wrap: ["break-word", "anywhere", "normal"]
        }],
        hyphens: [{
          hyphens: ["none", "manual", "auto"]
        }],
        content: [{
          content: ["none", J, Q]
        }],
        "bg-attachment": [{
          bg: ["fixed", "local", "scroll"]
        }],
        "bg-clip": [{
          "bg-clip": ["border", "padding", "content", "text"]
        }],
        "bg-origin": [{
          "bg-origin": ["border", "padding", "content"]
        }],
        "bg-position": [{
          bg: G()
        }],
        "bg-repeat": [{
          bg: j()
        }],
        "bg-size": [{
          bg: P()
        }],
        "bg-image": [{
          bg: ["none", {
            linear: [{
              to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
            }, xt, J, Q],
            radial: ["", J, Q],
            conic: [xt, J, Q]
          }, D1, N1]
        }],
        "bg-color": [{
          bg: R()
        }],
        "gradient-from-pos": [{
          from: $()
        }],
        "gradient-via-pos": [{
          via: $()
        }],
        "gradient-to-pos": [{
          to: $()
        }],
        "gradient-from": [{
          from: R()
        }],
        "gradient-via": [{
          via: R()
        }],
        "gradient-to": [{
          to: R()
        }],
        rounded: [{
          rounded: q()
        }],
        "rounded-s": [{
          "rounded-s": q()
        }],
        "rounded-e": [{
          "rounded-e": q()
        }],
        "rounded-t": [{
          "rounded-t": q()
        }],
        "rounded-r": [{
          "rounded-r": q()
        }],
        "rounded-b": [{
          "rounded-b": q()
        }],
        "rounded-l": [{
          "rounded-l": q()
        }],
        "rounded-ss": [{
          "rounded-ss": q()
        }],
        "rounded-se": [{
          "rounded-se": q()
        }],
        "rounded-ee": [{
          "rounded-ee": q()
        }],
        "rounded-es": [{
          "rounded-es": q()
        }],
        "rounded-tl": [{
          "rounded-tl": q()
        }],
        "rounded-tr": [{
          "rounded-tr": q()
        }],
        "rounded-br": [{
          "rounded-br": q()
        }],
        "rounded-bl": [{
          "rounded-bl": q()
        }],
        "border-w": [{
          border: H()
        }],
        "border-w-x": [{
          "border-x": H()
        }],
        "border-w-y": [{
          "border-y": H()
        }],
        "border-w-s": [{
          "border-s": H()
        }],
        "border-w-e": [{
          "border-e": H()
        }],
        "border-w-t": [{
          "border-t": H()
        }],
        "border-w-r": [{
          "border-r": H()
        }],
        "border-w-b": [{
          "border-b": H()
        }],
        "border-w-l": [{
          "border-l": H()
        }],
        "divide-x": [{
          "divide-x": H()
        }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{
          "divide-y": H()
        }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{
          border: [...de(), "hidden", "none"]
        }],
        "divide-style": [{
          divide: [...de(), "hidden", "none"]
        }],
        "border-color": [{
          border: R()
        }],
        "border-color-x": [{
          "border-x": R()
        }],
        "border-color-y": [{
          "border-y": R()
        }],
        "border-color-s": [{
          "border-s": R()
        }],
        "border-color-e": [{
          "border-e": R()
        }],
        "border-color-t": [{
          "border-t": R()
        }],
        "border-color-r": [{
          "border-r": R()
        }],
        "border-color-b": [{
          "border-b": R()
        }],
        "border-color-l": [{
          "border-l": R()
        }],
        "divide-color": [{
          divide: R()
        }],
        "outline-style": [{
          outline: [...de(), "none", "hidden"]
        }],
        "outline-offset": [{
          "outline-offset": [ne, J, Q]
        }],
        "outline-w": [{
          outline: ["", ne, fr, Nt]
        }],
        "outline-color": [{
          outline: R()
        }],
        shadow: [{
          shadow: ["", "none", l, Kr, jr]
        }],
        "shadow-color": [{
          shadow: R()
        }],
        "inset-shadow": [{
          "inset-shadow": ["none", h, Kr, jr]
        }],
        "inset-shadow-color": [{
          "inset-shadow": R()
        }],
        "ring-w": [{
          ring: H()
        }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{
          ring: R()
        }],
        "ring-offset-w": [{
          "ring-offset": [ne, Nt]
        }],
        "ring-offset-color": [{
          "ring-offset": R()
        }],
        "inset-ring-w": [{
          "inset-ring": H()
        }],
        "inset-ring-color": [{
          "inset-ring": R()
        }],
        "text-shadow": [{
          "text-shadow": ["none", f, Kr, jr]
        }],
        "text-shadow-color": [{
          "text-shadow": R()
        }],
        opacity: [{
          opacity: [ne, J, Q]
        }],
        "mix-blend": [{
          "mix-blend": [...oe(), "plus-darker", "plus-lighter"]
        }],
        "bg-blend": [{
          "bg-blend": oe()
        }],
        "mask-clip": [{
          "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
        }, "mask-no-clip"],
        "mask-composite": [{
          mask: ["add", "subtract", "intersect", "exclude"]
        }],
        "mask-image-linear-pos": [{
          "mask-linear": [ne]
        }],
        "mask-image-linear-from-pos": [{
          "mask-linear-from": se()
        }],
        "mask-image-linear-to-pos": [{
          "mask-linear-to": se()
        }],
        "mask-image-linear-from-color": [{
          "mask-linear-from": R()
        }],
        "mask-image-linear-to-color": [{
          "mask-linear-to": R()
        }],
        "mask-image-t-from-pos": [{
          "mask-t-from": se()
        }],
        "mask-image-t-to-pos": [{
          "mask-t-to": se()
        }],
        "mask-image-t-from-color": [{
          "mask-t-from": R()
        }],
        "mask-image-t-to-color": [{
          "mask-t-to": R()
        }],
        "mask-image-r-from-pos": [{
          "mask-r-from": se()
        }],
        "mask-image-r-to-pos": [{
          "mask-r-to": se()
        }],
        "mask-image-r-from-color": [{
          "mask-r-from": R()
        }],
        "mask-image-r-to-color": [{
          "mask-r-to": R()
        }],
        "mask-image-b-from-pos": [{
          "mask-b-from": se()
        }],
        "mask-image-b-to-pos": [{
          "mask-b-to": se()
        }],
        "mask-image-b-from-color": [{
          "mask-b-from": R()
        }],
        "mask-image-b-to-color": [{
          "mask-b-to": R()
        }],
        "mask-image-l-from-pos": [{
          "mask-l-from": se()
        }],
        "mask-image-l-to-pos": [{
          "mask-l-to": se()
        }],
        "mask-image-l-from-color": [{
          "mask-l-from": R()
        }],
        "mask-image-l-to-color": [{
          "mask-l-to": R()
        }],
        "mask-image-x-from-pos": [{
          "mask-x-from": se()
        }],
        "mask-image-x-to-pos": [{
          "mask-x-to": se()
        }],
        "mask-image-x-from-color": [{
          "mask-x-from": R()
        }],
        "mask-image-x-to-color": [{
          "mask-x-to": R()
        }],
        "mask-image-y-from-pos": [{
          "mask-y-from": se()
        }],
        "mask-image-y-to-pos": [{
          "mask-y-to": se()
        }],
        "mask-image-y-from-color": [{
          "mask-y-from": R()
        }],
        "mask-image-y-to-color": [{
          "mask-y-to": R()
        }],
        "mask-image-radial": [{
          "mask-radial": [J, Q]
        }],
        "mask-image-radial-from-pos": [{
          "mask-radial-from": se()
        }],
        "mask-image-radial-to-pos": [{
          "mask-radial-to": se()
        }],
        "mask-image-radial-from-color": [{
          "mask-radial-from": R()
        }],
        "mask-image-radial-to-color": [{
          "mask-radial-to": R()
        }],
        "mask-image-radial-shape": [{
          "mask-radial": ["circle", "ellipse"]
        }],
        "mask-image-radial-size": [{
          "mask-radial": [{
            closest: ["side", "corner"],
            farthest: ["side", "corner"]
          }]
        }],
        "mask-image-radial-pos": [{
          "mask-radial-at": v()
        }],
        "mask-image-conic-pos": [{
          "mask-conic": [ne]
        }],
        "mask-image-conic-from-pos": [{
          "mask-conic-from": se()
        }],
        "mask-image-conic-to-pos": [{
          "mask-conic-to": se()
        }],
        "mask-image-conic-from-color": [{
          "mask-conic-from": R()
        }],
        "mask-image-conic-to-color": [{
          "mask-conic-to": R()
        }],
        "mask-mode": [{
          mask: ["alpha", "luminance", "match"]
        }],
        "mask-origin": [{
          "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
        }],
        "mask-position": [{
          mask: G()
        }],
        "mask-repeat": [{
          mask: j()
        }],
        "mask-size": [{
          mask: P()
        }],
        "mask-type": [{
          "mask-type": ["alpha", "luminance"]
        }],
        "mask-image": [{
          mask: ["none", J, Q]
        }],
        filter: [{
          filter: ["", "none", J, Q]
        }],
        blur: [{
          blur: ue()
        }],
        brightness: [{
          brightness: [ne, J, Q]
        }],
        contrast: [{
          contrast: [ne, J, Q]
        }],
        "drop-shadow": [{
          "drop-shadow": ["", "none", m, Kr, jr]
        }],
        "drop-shadow-color": [{
          "drop-shadow": R()
        }],
        grayscale: [{
          grayscale: ["", ne, J, Q]
        }],
        "hue-rotate": [{
          "hue-rotate": [ne, J, Q]
        }],
        invert: [{
          invert: ["", ne, J, Q]
        }],
        saturate: [{
          saturate: [ne, J, Q]
        }],
        sepia: [{
          sepia: ["", ne, J, Q]
        }],
        "backdrop-filter": [{
          "backdrop-filter": ["", "none", J, Q]
        }],
        "backdrop-blur": [{
          "backdrop-blur": ue()
        }],
        "backdrop-brightness": [{
          "backdrop-brightness": [ne, J, Q]
        }],
        "backdrop-contrast": [{
          "backdrop-contrast": [ne, J, Q]
        }],
        "backdrop-grayscale": [{
          "backdrop-grayscale": ["", ne, J, Q]
        }],
        "backdrop-hue-rotate": [{
          "backdrop-hue-rotate": [ne, J, Q]
        }],
        "backdrop-invert": [{
          "backdrop-invert": ["", ne, J, Q]
        }],
        "backdrop-opacity": [{
          "backdrop-opacity": [ne, J, Q]
        }],
        "backdrop-saturate": [{
          "backdrop-saturate": [ne, J, Q]
        }],
        "backdrop-sepia": [{
          "backdrop-sepia": ["", ne, J, Q]
        }],
        "border-collapse": [{
          border: ["collapse", "separate"]
        }],
        "border-spacing": [{
          "border-spacing": w()
        }],
        "border-spacing-x": [{
          "border-spacing-x": w()
        }],
        "border-spacing-y": [{
          "border-spacing-y": w()
        }],
        "table-layout": [{
          table: ["auto", "fixed"]
        }],
        caption: [{
          caption: ["top", "bottom"]
        }],
        transition: [{
          transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", J, Q]
        }],
        "transition-behavior": [{
          transition: ["normal", "discrete"]
        }],
        duration: [{
          duration: [ne, "initial", J, Q]
        }],
        ease: [{
          ease: ["linear", "initial", T, J, Q]
        }],
        delay: [{
          delay: [ne, J, Q]
        }],
        animate: [{
          animate: ["none", E, J, Q]
        }],
        backface: [{
          backface: ["hidden", "visible"]
        }],
        perspective: [{
          perspective: [b, J, Q]
        }],
        "perspective-origin": [{
          "perspective-origin": C()
        }],
        rotate: [{
          rotate: Xe()
        }],
        "rotate-x": [{
          "rotate-x": Xe()
        }],
        "rotate-y": [{
          "rotate-y": Xe()
        }],
        "rotate-z": [{
          "rotate-z": Xe()
        }],
        scale: [{
          scale: We()
        }],
        "scale-x": [{
          "scale-x": We()
        }],
        "scale-y": [{
          "scale-y": We()
        }],
        "scale-z": [{
          "scale-z": We()
        }],
        "scale-3d": ["scale-3d"],
        skew: [{
          skew: St()
        }],
        "skew-x": [{
          "skew-x": St()
        }],
        "skew-y": [{
          "skew-y": St()
        }],
        transform: [{
          transform: [J, Q, "", "none", "gpu", "cpu"]
        }],
        "transform-origin": [{
          origin: C()
        }],
        "transform-style": [{
          transform: ["3d", "flat"]
        }],
        translate: [{
          translate: Qe()
        }],
        "translate-x": [{
          "translate-x": Qe()
        }],
        "translate-y": [{
          "translate-y": Qe()
        }],
        "translate-z": [{
          "translate-z": Qe()
        }],
        "translate-none": ["translate-none"],
        accent: [{
          accent: R()
        }],
        appearance: [{
          appearance: ["none", "auto"]
        }],
        "caret-color": [{
          caret: R()
        }],
        "color-scheme": [{
          scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
        }],
        cursor: [{
          cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", J, Q]
        }],
        "field-sizing": [{
          "field-sizing": ["fixed", "content"]
        }],
        "pointer-events": [{
          "pointer-events": ["auto", "none"]
        }],
        resize: [{
          resize: ["none", "", "y", "x"]
        }],
        "scroll-behavior": [{
          scroll: ["auto", "smooth"]
        }],
        "scroll-m": [{
          "scroll-m": w()
        }],
        "scroll-mx": [{
          "scroll-mx": w()
        }],
        "scroll-my": [{
          "scroll-my": w()
        }],
        "scroll-ms": [{
          "scroll-ms": w()
        }],
        "scroll-me": [{
          "scroll-me": w()
        }],
        "scroll-mt": [{
          "scroll-mt": w()
        }],
        "scroll-mr": [{
          "scroll-mr": w()
        }],
        "scroll-mb": [{
          "scroll-mb": w()
        }],
        "scroll-ml": [{
          "scroll-ml": w()
        }],
        "scroll-p": [{
          "scroll-p": w()
        }],
        "scroll-px": [{
          "scroll-px": w()
        }],
        "scroll-py": [{
          "scroll-py": w()
        }],
        "scroll-ps": [{
          "scroll-ps": w()
        }],
        "scroll-pe": [{
          "scroll-pe": w()
        }],
        "scroll-pt": [{
          "scroll-pt": w()
        }],
        "scroll-pr": [{
          "scroll-pr": w()
        }],
        "scroll-pb": [{
          "scroll-pb": w()
        }],
        "scroll-pl": [{
          "scroll-pl": w()
        }],
        "snap-align": [{
          snap: ["start", "end", "center", "align-none"]
        }],
        "snap-stop": [{
          snap: ["normal", "always"]
        }],
        "snap-type": [{
          snap: ["none", "x", "y", "both"]
        }],
        "snap-strictness": [{
          snap: ["mandatory", "proximity"]
        }],
        touch: [{
          touch: ["auto", "none", "manipulation"]
        }],
        "touch-x": [{
          "touch-pan": ["x", "left", "right"]
        }],
        "touch-y": [{
          "touch-pan": ["y", "up", "down"]
        }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{
          select: ["none", "text", "all", "auto"]
        }],
        "will-change": [{
          "will-change": ["auto", "scroll", "contents", "transform", J, Q]
        }],
        fill: [{
          fill: ["none", ...R()]
        }],
        "stroke-w": [{
          stroke: [ne, fr, Nt, Bu]
        }],
        stroke: [{
          stroke: ["none", ...R()]
        }],
        "forced-color-adjust": [{
          "forced-color-adjust": ["auto", "none"]
        }]
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
        "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"]
      },
      conflictingClassGroupModifiers: {
        "font-size": ["leading"]
      },
      orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
    }
  },
  kg = m1(R1),
  k1 = e1,
  Bg = (e, t) => r => k1(e, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
var Fu, q0;

function B1() {
  return q0 || (q0 = 1, Fu = {
    aa: {
      name: "Afar",
      nativeName: "Afaraf"
    },
    ab: {
      name: "Abkhaz",
      nativeName: "аҧсуа бызшәа"
    },
    ae: {
      name: "Avestan",
      nativeName: "avesta"
    },
    af: {
      name: "Afrikaans",
      nativeName: "Afrikaans"
    },
    ak: {
      name: "Akan",
      nativeName: "Akan"
    },
    am: {
      name: "Amharic",
      nativeName: "አማርኛ"
    },
    an: {
      name: "Aragonese",
      nativeName: "aragonés"
    },
    ar: {
      name: "Arabic",
      nativeName: "العربية"
    },
    as: {
      name: "Assamese",
      nativeName: "অসমীয়া"
    },
    av: {
      name: "Avaric",
      nativeName: "авар мацӀ"
    },
    ay: {
      name: "Aymara",
      nativeName: "aymar aru"
    },
    az: {
      name: "Azerbaijani",
      nativeName: "azərbaycan dili"
    },
    ba: {
      name: "Bashkir",
      nativeName: "башҡорт теле"
    },
    be: {
      name: "Belarusian",
      nativeName: "беларуская мова"
    },
    bg: {
      name: "Bulgarian",
      nativeName: "български език"
    },
    bi: {
      name: "Bislama",
      nativeName: "Bislama"
    },
    bm: {
      name: "Bambara",
      nativeName: "bamanankan"
    },
    bn: {
      name: "Bengali",
      nativeName: "বাংলা"
    },
    bo: {
      name: "Tibetan",
      nativeName: "བོད་ཡིག"
    },
    br: {
      name: "Breton",
      nativeName: "brezhoneg"
    },
    bs: {
      name: "Bosnian",
      nativeName: "bosanski jezik"
    },
    ca: {
      name: "Catalan",
      nativeName: "Català"
    },
    ce: {
      name: "Chechen",
      nativeName: "нохчийн мотт"
    },
    ch: {
      name: "Chamorro",
      nativeName: "Chamoru"
    },
    co: {
      name: "Corsican",
      nativeName: "corsu"
    },
    cr: {
      name: "Cree",
      nativeName: "ᓀᐦᐃᔭᐍᐏᐣ"
    },
    cs: {
      name: "Czech",
      nativeName: "Čeština"
    },
    cu: {
      name: "Old Church Slavonic",
      nativeName: "ѩзыкъ словѣньскъ"
    },
    cv: {
      name: "Chuvash",
      nativeName: "чӑваш чӗлхи"
    },
    cy: {
      name: "Welsh",
      nativeName: "Cymraeg"
    },
    da: {
      name: "Danish",
      nativeName: "Dansk"
    },
    de: {
      name: "German",
      nativeName: "Deutsch"
    },
    dv: {
      name: "Divehi",
      nativeName: "ދިވެހި"
    },
    dz: {
      name: "Dzongkha",
      nativeName: "རྫོང་ཁ"
    },
    ee: {
      name: "Ewe",
      nativeName: "Eʋegbe"
    },
    el: {
      name: "Greek",
      nativeName: "Ελληνικά"
    },
    en: {
      name: "English",
      nativeName: "English"
    },
    eo: {
      name: "Esperanto",
      nativeName: "Esperanto"
    },
    es: {
      name: "Spanish",
      nativeName: "Español"
    },
    et: {
      name: "Estonian",
      nativeName: "eesti"
    },
    eu: {
      name: "Basque",
      nativeName: "euskara"
    },
    fa: {
      name: "Persian",
      nativeName: "فارسی"
    },
    ff: {
      name: "Fula",
      nativeName: "Fulfulde"
    },
    fi: {
      name: "Finnish",
      nativeName: "suomi"
    },
    fj: {
      name: "Fijian",
      nativeName: "vosa Vakaviti"
    },
    fo: {
      name: "Faroese",
      nativeName: "Føroyskt"
    },
    fr: {
      name: "French",
      nativeName: "Français"
    },
    fy: {
      name: "Western Frisian",
      nativeName: "Frysk"
    },
    ga: {
      name: "Irish",
      nativeName: "Gaeilge"
    },
    gd: {
      name: "Scottish Gaelic",
      nativeName: "Gàidhlig"
    },
    gl: {
      name: "Galician",
      nativeName: "galego"
    },
    gn: {
      name: "Guaraní",
      nativeName: "Avañe'ẽ"
    },
    gu: {
      name: "Gujarati",
      nativeName: "ગુજરાતી"
    },
    gv: {
      name: "Manx",
      nativeName: "Gaelg"
    },
    ha: {
      name: "Hausa",
      nativeName: "هَوُسَ"
    },
    he: {
      name: "Hebrew",
      nativeName: "עברית"
    },
    hi: {
      name: "Hindi",
      nativeName: "हिन्दी"
    },
    ho: {
      name: "Hiri Motu",
      nativeName: "Hiri Motu"
    },
    hr: {
      name: "Croatian",
      nativeName: "Hrvatski"
    },
    ht: {
      name: "Haitian",
      nativeName: "Kreyòl ayisyen"
    },
    hu: {
      name: "Hungarian",
      nativeName: "magyar"
    },
    hy: {
      name: "Armenian",
      nativeName: "Հայերեն"
    },
    hz: {
      name: "Herero",
      nativeName: "Otjiherero"
    },
    ia: {
      name: "Interlingua",
      nativeName: "Interlingua"
    },
    id: {
      name: "Indonesian",
      nativeName: "Bahasa Indonesia"
    },
    ie: {
      name: "Interlingue",
      nativeName: "Interlingue"
    },
    ig: {
      name: "Igbo",
      nativeName: "Asụsụ Igbo"
    },
    ii: {
      name: "Nuosu",
      nativeName: "ꆈꌠ꒿ Nuosuhxop"
    },
    ik: {
      name: "Inupiaq",
      nativeName: "Iñupiaq"
    },
    io: {
      name: "Ido",
      nativeName: "Ido"
    },
    is: {
      name: "Icelandic",
      nativeName: "Íslenska"
    },
    it: {
      name: "Italian",
      nativeName: "Italiano"
    },
    iu: {
      name: "Inuktitut",
      nativeName: "ᐃᓄᒃᑎᑐᑦ"
    },
    ja: {
      name: "Japanese",
      nativeName: "日本語"
    },
    jv: {
      name: "Javanese",
      nativeName: "basa Jawa"
    },
    ka: {
      name: "Georgian",
      nativeName: "ქართული"
    },
    kg: {
      name: "Kongo",
      nativeName: "Kikongo"
    },
    ki: {
      name: "Kikuyu",
      nativeName: "Gĩkũyũ"
    },
    kj: {
      name: "Kwanyama",
      nativeName: "Kuanyama"
    },
    kk: {
      name: "Kazakh",
      nativeName: "қазақ тілі"
    },
    kl: {
      name: "Kalaallisut",
      nativeName: "kalaallisut"
    },
    km: {
      name: "Khmer",
      nativeName: "ខេមរភាសា"
    },
    kn: {
      name: "Kannada",
      nativeName: "ಕನ್ನಡ"
    },
    ko: {
      name: "Korean",
      nativeName: "한국어"
    },
    kr: {
      name: "Kanuri",
      nativeName: "Kanuri"
    },
    ks: {
      name: "Kashmiri",
      nativeName: "कश्मीरी"
    },
    ku: {
      name: "Kurdish",
      nativeName: "Kurdî"
    },
    kv: {
      name: "Komi",
      nativeName: "коми кыв"
    },
    kw: {
      name: "Cornish",
      nativeName: "Kernewek"
    },
    ky: {
      name: "Kyrgyz",
      nativeName: "Кыргызча"
    },
    la: {
      name: "Latin",
      nativeName: "latine"
    },
    lb: {
      name: "Luxembourgish",
      nativeName: "Lëtzebuergesch"
    },
    lg: {
      name: "Ganda",
      nativeName: "Luganda"
    },
    li: {
      name: "Limburgish",
      nativeName: "Limburgs"
    },
    ln: {
      name: "Lingala",
      nativeName: "Lingála"
    },
    lo: {
      name: "Lao",
      nativeName: "ພາສາລາວ"
    },
    lt: {
      name: "Lithuanian",
      nativeName: "lietuvių kalba"
    },
    lu: {
      name: "Luba-Katanga",
      nativeName: "Kiluba"
    },
    lv: {
      name: "Latvian",
      nativeName: "latviešu valoda"
    },
    mg: {
      name: "Malagasy",
      nativeName: "fiteny malagasy"
    },
    mh: {
      name: "Marshallese",
      nativeName: "Kajin M̧ajeļ"
    },
    mi: {
      name: "Māori",
      nativeName: "te reo Māori"
    },
    mk: {
      name: "Macedonian",
      nativeName: "македонски јазик"
    },
    ml: {
      name: "Malayalam",
      nativeName: "മലയാളം"
    },
    mn: {
      name: "Mongolian",
      nativeName: "Монгол хэл"
    },
    mr: {
      name: "Marathi",
      nativeName: "मराठी"
    },
    ms: {
      name: "Malay",
      nativeName: "Bahasa Melayu"
    },
    mt: {
      name: "Maltese",
      nativeName: "Malti"
    },
    my: {
      name: "Burmese",
      nativeName: "ဗမာစာ"
    },
    na: {
      name: "Nauru",
      nativeName: "Dorerin Naoero"
    },
    nb: {
      name: "Norwegian Bokmål",
      nativeName: "Norsk bokmål"
    },
    nd: {
      name: "Northern Ndebele",
      nativeName: "isiNdebele"
    },
    ne: {
      name: "Nepali",
      nativeName: "नेपाली"
    },
    ng: {
      name: "Ndonga",
      nativeName: "Owambo"
    },
    nl: {
      name: "Dutch",
      nativeName: "Nederlands"
    },
    nn: {
      name: "Norwegian Nynorsk",
      nativeName: "Norsk nynorsk"
    },
    no: {
      name: "Norwegian",
      nativeName: "Norsk"
    },
    nr: {
      name: "Southern Ndebele",
      nativeName: "isiNdebele"
    },
    nv: {
      name: "Navajo",
      nativeName: "Diné bizaad"
    },
    ny: {
      name: "Chichewa",
      nativeName: "chiCheŵa"
    },
    oc: {
      name: "Occitan",
      nativeName: "occitan"
    },
    oj: {
      name: "Ojibwe",
      nativeName: "ᐊᓂᔑᓈᐯᒧᐎᓐ"
    },
    om: {
      name: "Oromo",
      nativeName: "Afaan Oromoo"
    },
    or: {
      name: "Oriya",
      nativeName: "ଓଡ଼ିଆ"
    },
    os: {
      name: "Ossetian",
      nativeName: "ирон æвзаг"
    },
    pa: {
      name: "Panjabi",
      nativeName: "ਪੰਜਾਬੀ"
    },
    pi: {
      name: "Pāli",
      nativeName: "पाऴि"
    },
    pl: {
      name: "Polish",
      nativeName: "Polski"
    },
    ps: {
      name: "Pashto",
      nativeName: "پښتو"
    },
    pt: {
      name: "Portuguese",
      nativeName: "Português"
    },
    qu: {
      name: "Quechua",
      nativeName: "Runa Simi"
    },
    rm: {
      name: "Romansh",
      nativeName: "rumantsch grischun"
    },
    rn: {
      name: "Kirundi",
      nativeName: "Ikirundi"
    },
    ro: {
      name: "Romanian",
      nativeName: "Română"
    },
    ru: {
      name: "Russian",
      nativeName: "Русский"
    },
    rw: {
      name: "Kinyarwanda",
      nativeName: "Ikinyarwanda"
    },
    sa: {
      name: "Sanskrit",
      nativeName: "संस्कृतम्"
    },
    sc: {
      name: "Sardinian",
      nativeName: "sardu"
    },
    sd: {
      name: "Sindhi",
      nativeName: "सिन्धी"
    },
    se: {
      name: "Northern Sami",
      nativeName: "Davvisámegiella"
    },
    sg: {
      name: "Sango",
      nativeName: "yângâ tî sängö"
    },
    si: {
      name: "Sinhala",
      nativeName: "සිංහල"
    },
    sk: {
      name: "Slovak",
      nativeName: "Slovenčina"
    },
    sl: {
      name: "Slovenian",
      nativeName: "slovenščina"
    },
    sm: {
      name: "Samoan",
      nativeName: "gagana fa'a Samoa"
    },
    sn: {
      name: "Shona",
      nativeName: "chiShona"
    },
    so: {
      name: "Somali",
      nativeName: "Soomaaliga"
    },
    sq: {
      name: "Albanian",
      nativeName: "Shqip"
    },
    sr: {
      name: "Serbian",
      nativeName: "српски језик"
    },
    ss: {
      name: "Swati",
      nativeName: "SiSwati"
    },
    st: {
      name: "Southern Sotho",
      nativeName: "Sesotho"
    },
    su: {
      name: "Sundanese",
      nativeName: "Basa Sunda"
    },
    sv: {
      name: "Swedish",
      nativeName: "Svenska"
    },
    sw: {
      name: "Swahili",
      nativeName: "Kiswahili"
    },
    ta: {
      name: "Tamil",
      nativeName: "தமிழ்"
    },
    te: {
      name: "Telugu",
      nativeName: "తెలుగు"
    },
    tg: {
      name: "Tajik",
      nativeName: "тоҷикӣ"
    },
    th: {
      name: "Thai",
      nativeName: "ไทย"
    },
    ti: {
      name: "Tigrinya",
      nativeName: "ትግርኛ"
    },
    tk: {
      name: "Turkmen",
      nativeName: "Türkmençe"
    },
    tl: {
      name: "Tagalog",
      nativeName: "Wikang Tagalog"
    },
    tn: {
      name: "Tswana",
      nativeName: "Setswana"
    },
    to: {
      name: "Tonga",
      nativeName: "faka Tonga"
    },
    tr: {
      name: "Turkish",
      nativeName: "Türkçe"
    },
    ts: {
      name: "Tsonga",
      nativeName: "Xitsonga"
    },
    tt: {
      name: "Tatar",
      nativeName: "татар теле"
    },
    tw: {
      name: "Twi",
      nativeName: "Twi"
    },
    ty: {
      name: "Tahitian",
      nativeName: "Reo Tahiti"
    },
    ug: {
      name: "Uyghur",
      nativeName: "ئۇيغۇرچە‎"
    },
    uk: {
      name: "Ukrainian",
      nativeName: "Українська"
    },
    ur: {
      name: "Urdu",
      nativeName: "اردو"
    },
    uz: {
      name: "Uzbek",
      nativeName: "Ўзбек"
    },
    ve: {
      name: "Venda",
      nativeName: "Tshivenḓa"
    },
    vi: {
      name: "Vietnamese",
      nativeName: "Tiếng Việt"
    },
    vo: {
      name: "Volapük",
      nativeName: "Volapük"
    },
    wa: {
      name: "Walloon",
      nativeName: "walon"
    },
    wo: {
      name: "Wolof",
      nativeName: "Wollof"
    },
    xh: {
      name: "Xhosa",
      nativeName: "isiXhosa"
    },
    yi: {
      name: "Yiddish",
      nativeName: "ייִדיש"
    },
    yo: {
      name: "Yoruba",
      nativeName: "Yorùbá"
    },
    za: {
      name: "Zhuang",
      nativeName: "Saɯ cueŋƅ"
    },
    zh: {
      name: "Chinese",
      nativeName: "中文"
    },
    zu: {
      name: "Zulu",
      nativeName: "isiZulu"
    }
  }), Fu
}
var Pu, W0;

function F1() {
  if (W0) return Pu;
  W0 = 1;
  const e = B1(),
    t = {},
    r = {},
    a = [],
    u = [],
    n = [];
  for (const s in e) {
    const {
      name: i,
      nativeName: o
    } = e[s];
    t[s] = r[i.toLowerCase()] = r[o.toLowerCase()] = {
      code: s,
      name: i,
      nativeName: o
    }, a.push(s), u.push(i), n.push(o)
  }
  return Pu = class ua {
    static getLanguages(i = []) {
      return i.map(o => ua.validate(o) ? Object.assign({}, t[o]) : {
        code: o,
        name: "",
        nativeName: ""
      })
    }
    static getName(i) {
      return ua.validate(i) ? e[i].name : ""
    }
    static getAllNames() {
      return u.slice()
    }
    static getNativeName(i) {
      return ua.validate(i) ? e[i].nativeName : ""
    }
    static getAllNativeNames() {
      return n.slice()
    }
    static getCode(i) {
      return i = i.toLowerCase(), r.hasOwnProperty(i) ? r[i].code : ""
    }
    static getAllCodes() {
      return a.slice()
    }
    static validate(i) {
      return e.hasOwnProperty(i)
    }
  }, Pu
}
var P1 = F1();
const M1 = mt(P1),
  Ln = {
    xml: !1,
    decodeEntities: !0
  },
  Y0 = {
    _useHtmlParser2: !0,
    xmlMode: !0
  };

function cn(e) {
  return e != null && e.xml ? typeof e.xml == "boolean" ? Y0 : {
    ...Y0,
    ...e.xml
  } : e ?? void 0
}
var fe;
(function (e) {
  e.Root = "root", e.Text = "text", e.Directive = "directive", e.Comment = "comment", e.Script = "script", e.Style = "style", e.Tag = "tag", e.CDATA = "cdata", e.Doctype = "doctype"
})(fe || (fe = {}));

function U1(e) {
  return e.type === fe.Tag || e.type === fe.Script || e.type === fe.Style
}
const H1 = fe.Root,
  $1 = fe.Text,
  q1 = fe.Directive,
  W1 = fe.Comment,
  Y1 = fe.Script,
  z1 = fe.Style,
  V1 = fe.Tag,
  G1 = fe.CDATA,
  j1 = fe.Doctype;
let Cc = class {
  constructor() {
    this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null
  }
  get parentNode() {
    return this.parent
  }
  set parentNode(t) {
    this.parent = t
  }
  get previousSibling() {
    return this.prev
  }
  set previousSibling(t) {
    this.prev = t
  }
  get nextSibling() {
    return this.next
  }
  set nextSibling(t) {
    this.next = t
  }
  cloneNode(t = !1) {
    return Ga(this, t)
  }
};
class Rn extends Cc {
  constructor(t) {
    super(), this.data = t
  }
  get nodeValue() {
    return this.data
  }
  set nodeValue(t) {
    this.data = t
  }
}
class Or extends Rn {
  constructor() {
    super(...arguments), this.type = fe.Text
  }
  get nodeType() {
    return 3
  }
}
class kn extends Rn {
  constructor() {
    super(...arguments), this.type = fe.Comment
  }
  get nodeType() {
    return 8
  }
}
class Bn extends Rn {
  constructor(t, r) {
    super(r), this.name = t, this.type = fe.Directive
  }
  get nodeType() {
    return 1
  }
}
class Fn extends Cc {
  constructor(t) {
    super(), this.children = t
  }
  get firstChild() {
    var t;
    return (t = this.children[0]) !== null && t !== void 0 ? t : null
  }
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null
  }
  get childNodes() {
    return this.children
  }
  set childNodes(t) {
    this.children = t
  }
}
class Sc extends Fn {
  constructor() {
    super(...arguments), this.type = fe.CDATA
  }
  get nodeType() {
    return 4
  }
}
class kt extends Fn {
  constructor() {
    super(...arguments), this.type = fe.Root
  }
  get nodeType() {
    return 9
  }
}
let Pn = class extends Fn {
  constructor(t, r, a = [], u = t === "script" ? fe.Script : t === "style" ? fe.Style : fe.Tag) {
    super(a), this.name = t, this.attribs = r, this.type = u
  }
  get nodeType() {
    return 1
  }
  get tagName() {
    return this.name
  }
  set tagName(t) {
    this.name = t
  }
  get attributes() {
    return Object.keys(this.attribs).map(t => {
      var r, a;
      return {
        name: t,
        value: this.attribs[t],
        namespace: (r = this["x-attribsNamespace"]) === null || r === void 0 ? void 0 : r[t],
        prefix: (a = this["x-attribsPrefix"]) === null || a === void 0 ? void 0 : a[t]
      }
    })
  }
};

function ae(e) {
  return U1(e)
}

function mu(e) {
  return e.type === fe.CDATA
}

function rt(e) {
  return e.type === fe.Text
}

function pu(e) {
  return e.type === fe.Comment
}

function dn(e) {
  return e.type === fe.Directive
}

function Ft(e) {
  return e.type === fe.Root
}

function ge(e) {
  return Object.prototype.hasOwnProperty.call(e, "children")
}

function Ga(e, t = !1) {
  let r;
  if (rt(e)) r = new Or(e.data);
  else if (pu(e)) r = new kn(e.data);
  else if (ae(e)) {
    const a = t ? Mu(e.children) : [],
      u = new Pn(e.name, {
        ...e.attribs
      }, a);
    a.forEach(n => n.parent = u), e.namespace != null && (u.namespace = e.namespace), e["x-attribsNamespace"] && (u["x-attribsNamespace"] = {
      ...e["x-attribsNamespace"]
    }), e["x-attribsPrefix"] && (u["x-attribsPrefix"] = {
      ...e["x-attribsPrefix"]
    }), r = u
  } else if (mu(e)) {
    const a = t ? Mu(e.children) : [],
      u = new Sc(a);
    a.forEach(n => n.parent = u), r = u
  } else if (Ft(e)) {
    const a = t ? Mu(e.children) : [],
      u = new kt(a);
    a.forEach(n => n.parent = u), e["x-mode"] && (u["x-mode"] = e["x-mode"]), r = u
  } else if (dn(e)) {
    const a = new Bn(e.name, e.data);
    e["x-name"] != null && (a["x-name"] = e["x-name"], a["x-publicId"] = e["x-publicId"], a["x-systemId"] = e["x-systemId"]), r = a
  } else throw new Error(`Not implemented yet: ${e.type}`);
  return r.startIndex = e.startIndex, r.endIndex = e.endIndex, e.sourceCodeLocation != null && (r.sourceCodeLocation = e.sourceCodeLocation), r
}

function Mu(e) {
  const t = e.map(r => Ga(r, !0));
  for (let r = 1; r < t.length; r++) t[r].prev = t[r - 1], t[r - 1].next = t[r];
  return t
}
const z0 = {
  withStartIndices: !1,
  withEndIndices: !1,
  xmlMode: !1
};
class K1 {
  constructor(t, r, a) {
    this.dom = [], this.root = new kt(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof r == "function" && (a = r, r = z0), typeof t == "object" && (r = t, t = void 0), this.callback = t ?? null, this.options = r ?? z0, this.elementCB = a ?? null
  }
  onparserinit(t) {
    this.parser = t
  }
  onreset() {
    this.dom = [], this.root = new kt(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null
  }
  onend() {
    this.done || (this.done = !0, this.parser = null, this.handleCallback(null))
  }
  onerror(t) {
    this.handleCallback(t)
  }
  onclosetag() {
    this.lastNode = null;
    const t = this.tagStack.pop();
    this.options.withEndIndices && (t.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(t)
  }
  onopentag(t, r) {
    const a = this.options.xmlMode ? fe.Tag : void 0,
      u = new Pn(t, r, void 0, a);
    this.addNode(u), this.tagStack.push(u)
  }
  ontext(t) {
    const {
      lastNode: r
    } = this;
    if (r && r.type === fe.Text) r.data += t, this.options.withEndIndices && (r.endIndex = this.parser.endIndex);
    else {
      const a = new Or(t);
      this.addNode(a), this.lastNode = a
    }
  }
  oncomment(t) {
    if (this.lastNode && this.lastNode.type === fe.Comment) {
      this.lastNode.data += t;
      return
    }
    const r = new kn(t);
    this.addNode(r), this.lastNode = r
  }
  oncommentend() {
    this.lastNode = null
  }
  oncdatastart() {
    const t = new Or(""),
      r = new Sc([t]);
    this.addNode(r), t.parent = r, this.lastNode = t
  }
  oncdataend() {
    this.lastNode = null
  }
  onprocessinginstruction(t, r) {
    const a = new Bn(t, r);
    this.addNode(a)
  }
  handleCallback(t) {
    if (typeof this.callback == "function") this.callback(t, this.dom);
    else if (t) throw t
  }
  addNode(t) {
    const r = this.tagStack[this.tagStack.length - 1],
      a = r.children[r.children.length - 1];
    this.options.withStartIndices && (t.startIndex = this.parser.startIndex), this.options.withEndIndices && (t.endIndex = this.parser.endIndex), r.children.push(t), a && (t.prev = a, a.next = t), t.parent = r, this.lastNode = null
  }
}
const Nc = new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e => e.charCodeAt(0))),
  wc = new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e => e.charCodeAt(0)));
var Uu;
const X1 = new Map([
    [0, 65533],
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]),
  ln = (Uu = String.fromCodePoint) !== null && Uu !== void 0 ? Uu : function (e) {
    let t = "";
    return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t
  };

function Ic(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = X1.get(e)) !== null && t !== void 0 ? t : e
}
var ye;
(function (e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z"
})(ye || (ye = {}));
const Q1 = 32;
var Ve;
(function (e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE"
})(Ve || (Ve = {}));

function fn(e) {
  return e >= ye.ZERO && e <= ye.NINE
}

function J1(e) {
  return e >= ye.UPPER_A && e <= ye.UPPER_F || e >= ye.LOWER_A && e <= ye.LOWER_F
}

function Z1(e) {
  return e >= ye.UPPER_A && e <= ye.UPPER_Z || e >= ye.LOWER_A && e <= ye.LOWER_Z || fn(e)
}

function eh(e) {
  return e === ye.EQUALS || Z1(e)
}
var ve;
(function (e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity"
})(ve || (ve = {}));
var Dt;
(function (e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute"
})(Dt || (Dt = {}));
let th = class {
  constructor(t, r, a) {
    this.decodeTree = t, this.emitCodePoint = r, this.errors = a, this.state = ve.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = Dt.Strict
  }
  startEntity(t) {
    this.decodeMode = t, this.state = ve.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1
  }
  write(t, r) {
    switch (this.state) {
    case ve.EntityStart:
      return t.charCodeAt(r) === ye.NUM ? (this.state = ve.NumericStart, this.consumed += 1, this.stateNumericStart(t, r + 1)) : (this.state = ve.NamedEntity, this.stateNamedEntity(t, r));
    case ve.NumericStart:
      return this.stateNumericStart(t, r);
    case ve.NumericDecimal:
      return this.stateNumericDecimal(t, r);
    case ve.NumericHex:
      return this.stateNumericHex(t, r);
    case ve.NamedEntity:
      return this.stateNamedEntity(t, r)
    }
  }
  stateNumericStart(t, r) {
    return r >= t.length ? -1 : (t.charCodeAt(r) | Q1) === ye.LOWER_X ? (this.state = ve.NumericHex, this.consumed += 1, this.stateNumericHex(t, r + 1)) : (this.state = ve.NumericDecimal, this.stateNumericDecimal(t, r))
  }
  addToNumericResult(t, r, a, u) {
    if (r !== a) {
      const n = a - r;
      this.result = this.result * Math.pow(u, n) + parseInt(t.substr(r, n), u), this.consumed += n
    }
  }
  stateNumericHex(t, r) {
    const a = r;
    for (; r < t.length;) {
      const u = t.charCodeAt(r);
      if (fn(u) || J1(u)) r += 1;
      else return this.addToNumericResult(t, a, r, 16), this.emitNumericEntity(u, 3)
    }
    return this.addToNumericResult(t, a, r, 16), -1
  }
  stateNumericDecimal(t, r) {
    const a = r;
    for (; r < t.length;) {
      const u = t.charCodeAt(r);
      if (fn(u)) r += 1;
      else return this.addToNumericResult(t, a, r, 10), this.emitNumericEntity(u, 2)
    }
    return this.addToNumericResult(t, a, r, 10), -1
  }
  emitNumericEntity(t, r) {
    var a;
    if (this.consumed <= r) return (a = this.errors) === null || a === void 0 || a.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === ye.SEMI) this.consumed += 1;
    else if (this.decodeMode === Dt.Strict) return 0;
    return this.emitCodePoint(Ic(this.result), this.consumed), this.errors && (t !== ye.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed
  }
  stateNamedEntity(t, r) {
    const {
      decodeTree: a
    } = this;
    let u = a[this.treeIndex],
      n = (u & Ve.VALUE_LENGTH) >> 14;
    for (; r < t.length; r++, this.excess++) {
      const s = t.charCodeAt(r);
      if (this.treeIndex = Oc(a, u, this.treeIndex + Math.max(1, n), s), this.treeIndex < 0) return this.result === 0 || this.decodeMode === Dt.Attribute && (n === 0 || eh(s)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (u = a[this.treeIndex], n = (u & Ve.VALUE_LENGTH) >> 14, n !== 0) {
        if (s === ye.SEMI) return this.emitNamedEntityData(this.treeIndex, n, this.consumed + this.excess);
        this.decodeMode !== Dt.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0)
      }
    }
    return -1
  }
  emitNotTerminatedNamedEntity() {
    var t;
    const {
      result: r,
      decodeTree: a
    } = this, u = (a[r] & Ve.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(r, u, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed
  }
  emitNamedEntityData(t, r, a) {
    const {
      decodeTree: u
    } = this;
    return this.emitCodePoint(r === 1 ? u[t] & ~Ve.VALUE_LENGTH : u[t + 1], a), r === 3 && this.emitCodePoint(u[t + 2], a), a
  }
  end() {
    var t;
    switch (this.state) {
    case ve.NamedEntity:
      return this.result !== 0 && (this.decodeMode !== Dt.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
    case ve.NumericDecimal:
      return this.emitNumericEntity(0, 2);
    case ve.NumericHex:
      return this.emitNumericEntity(0, 3);
    case ve.NumericStart:
      return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    case ve.EntityStart:
      return 0
    }
  }
};

function Dc(e) {
  let t = "";
  const r = new th(e, a => t += ln(a));
  return function (u, n) {
    let s = 0,
      i = 0;
    for (;
      (i = u.indexOf("&", i)) >= 0;) {
      t += u.slice(s, i), r.startEntity(n);
      const c = r.write(u, i + 1);
      if (c < 0) {
        s = i + r.end();
        break
      }
      s = i + c, i = c === 0 ? s + 1 : s
    }
    const o = t + u.slice(s);
    return t = "", o
  }
}

function Oc(e, t, r, a) {
  const u = (t & Ve.BRANCH_LENGTH) >> 7,
    n = t & Ve.JUMP_TABLE;
  if (u === 0) return n !== 0 && a === n ? r : -1;
  if (n) {
    const o = a - n;
    return o < 0 || o >= u ? -1 : e[r + o] - 1
  }
  let s = r,
    i = s + u - 1;
  for (; s <= i;) {
    const o = s + i >>> 1,
      c = e[o];
    if (c < a) s = o + 1;
    else if (c > a) i = o - 1;
    else return e[o + u]
  }
  return -1
}
Dc(Nc);
Dc(wc);
const V0 = /["&'<>$\x80-\uFFFF]/g,
  rh = new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]),
  ah = String.prototype.codePointAt != null ? (e, t) => e.codePointAt(t) : (e, t) => (e.charCodeAt(t) & 64512) === 55296 ? (e.charCodeAt(t) - 55296) * 1024 + e.charCodeAt(t + 1) - 56320 + 65536 : e.charCodeAt(t);

function Lc(e) {
  let t = "",
    r = 0,
    a;
  for (;
    (a = V0.exec(e)) !== null;) {
    const u = a.index,
      n = e.charCodeAt(u),
      s = rh.get(n);
    s !== void 0 ? (t += e.substring(r, u) + s, r = u + 1) : (t += `${e.substring(r,u)}&#x${ah(e,u).toString(16)};`, r = V0.lastIndex += +((n & 64512) === 55296))
  }
  return t + e.substr(r)
}

function Rc(e, t) {
  return function (a) {
    let u, n = 0,
      s = "";
    for (; u = e.exec(a);) n !== u.index && (s += a.substring(n, u.index)), s += t.get(u[0].charCodeAt(0)), n = u.index + 1;
    return s + a.substring(n)
  }
}
const uh = Rc(/["&\u00A0]/g, new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ])),
  nh = Rc(/[&<>\u00A0]/g, new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ])),
  sh = new Map(["altGlyph", "altGlyphDef", "altGlyphItem", "animateColor", "animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "glyphRef", "linearGradient", "radialGradient", "textPath"].map(e => [e.toLowerCase(), e])),
  ih = new Map(["definitionURL", "attributeName", "attributeType", "baseFrequency", "baseProfile", "calcMode", "clipPathUnits", "diffuseConstant", "edgeMode", "filterUnits", "glyphRef", "gradientTransform", "gradientUnits", "kernelMatrix", "kernelUnitLength", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "limitingConeAngle", "markerHeight", "markerUnits", "markerWidth", "maskContentUnits", "maskUnits", "numOctaves", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "refX", "refY", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "specularConstant", "specularExponent", "spreadMethod", "startOffset", "stdDeviation", "stitchTiles", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textLength", "viewBox", "viewTarget", "xChannelSelector", "yChannelSelector", "zoomAndPan"].map(e => [e.toLowerCase(), e])),
  oh = new Set(["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"]);

function ch(e) {
  return e.replace(/"/g, "&quot;")
}

function dh(e, t) {
  var r;
  if (!e) return;
  const a = ((r = t.encodeEntities) !== null && r !== void 0 ? r : t.decodeEntities) === !1 ? ch : t.xmlMode || t.encodeEntities !== "utf8" ? Lc : uh;
  return Object.keys(e).map(u => {
    var n, s;
    const i = (n = e[u]) !== null && n !== void 0 ? n : "";
    return t.xmlMode === "foreign" && (u = (s = ih.get(u)) !== null && s !== void 0 ? s : u), !t.emptyAttrs && !t.xmlMode && i === "" ? u : `${u}="${a(i)}"`
  }).join(" ")
}
const G0 = new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"]);

function bu(e, t = {}) {
  const r = "length" in e ? e : [e];
  let a = "";
  for (let u = 0; u < r.length; u++) a += lh(r[u], t);
  return a
}

function lh(e, t) {
  switch (e.type) {
  case H1:
    return bu(e.children, t);
  case j1:
  case q1:
    return ph(e);
  case W1:
    return Eh(e);
  case G1:
    return xh(e);
  case Y1:
  case z1:
  case V1:
    return mh(e, t);
  case $1:
    return bh(e, t)
  }
}
const fh = new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignObject", "desc", "title"]),
  hh = new Set(["svg", "math"]);

function mh(e, t) {
  var r;
  t.xmlMode === "foreign" && (e.name = (r = sh.get(e.name)) !== null && r !== void 0 ? r : e.name, e.parent && fh.has(e.parent.name) && (t = {
    ...t,
    xmlMode: !1
  })), !t.xmlMode && hh.has(e.name) && (t = {
    ...t,
    xmlMode: "foreign"
  });
  let a = `<${e.name}`;
  const u = dh(e.attribs, t);
  return u && (a += ` ${u}`), e.children.length === 0 && (t.xmlMode ? t.selfClosingTags !== !1 : t.selfClosingTags && G0.has(e.name)) ? (t.xmlMode || (a += " "), a += "/>") : (a += ">", e.children.length > 0 && (a += bu(e.children, t)), (t.xmlMode || !G0.has(e.name)) && (a += `</${e.name}>`)), a
}

function ph(e) {
  return `<${e.data}>`
}

function bh(e, t) {
  var r;
  let a = e.data || "";
  return ((r = t.encodeEntities) !== null && r !== void 0 ? r : t.decodeEntities) !== !1 && !(!t.xmlMode && e.parent && oh.has(e.parent.name)) && (a = t.xmlMode || t.encodeEntities !== "utf8" ? Lc(a) : nh(a)), a
}

function xh(e) {
  return `<![CDATA[${e.children[0].data}]]>`
}

function Eh(e) {
  return `<!--${e.data}-->`
}

function kc(e, t) {
  return bu(e, t)
}

function gh(e, t) {
  return ge(e) ? e.children.map(r => kc(r, t)).join("") : ""
}

function na(e) {
  return Array.isArray(e) ? e.map(na).join("") : ae(e) ? e.name === "br" ? `
` : na(e.children) : mu(e) ? na(e.children) : rt(e) ? e.data : ""
}

function Qt(e) {
  return Array.isArray(e) ? e.map(Qt).join("") : ge(e) && !pu(e) ? Qt(e.children) : rt(e) ? e.data : ""
}

function ja(e) {
  return Array.isArray(e) ? e.map(ja).join("") : ge(e) && (e.type === fe.Tag || mu(e)) ? ja(e.children) : rt(e) ? e.data : ""
}

function xu(e) {
  return ge(e) ? e.children : []
}

function Bc(e) {
  return e.parent || null
}

function Fc(e) {
  const t = Bc(e);
  if (t != null) return xu(t);
  const r = [e];
  let {
    prev: a,
    next: u
  } = e;
  for (; a != null;) r.unshift(a), {
    prev: a
  } = a;
  for (; u != null;) r.push(u), {
    next: u
  } = u;
  return r
}

function Ah(e, t) {
  var r;
  return (r = e.attribs) === null || r === void 0 ? void 0 : r[t]
}

function Th(e, t) {
  return e.attribs != null && Object.prototype.hasOwnProperty.call(e.attribs, t) && e.attribs[t] != null
}

function vh(e) {
  return e.name
}

function Mn(e) {
  let {
    next: t
  } = e;
  for (; t !== null && !ae(t);)({
    next: t
  } = t);
  return t
}

function Un(e) {
  let {
    prev: t
  } = e;
  for (; t !== null && !ae(t);)({
    prev: t
  } = t);
  return t
}

function Pt(e) {
  if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
    const t = e.parent.children,
      r = t.lastIndexOf(e);
    r >= 0 && t.splice(r, 1)
  }
  e.next = null, e.prev = null, e.parent = null
}

function _h(e, t) {
  const r = t.prev = e.prev;
  r && (r.next = t);
  const a = t.next = e.next;
  a && (a.prev = t);
  const u = t.parent = e.parent;
  if (u) {
    const n = u.children;
    n[n.lastIndexOf(e)] = t, e.parent = null
  }
}

function yh(e, t) {
  if (Pt(t), t.next = null, t.parent = e, e.children.push(t) > 1) {
    const r = e.children[e.children.length - 2];
    r.next = t, t.prev = r
  } else t.prev = null
}

function Ch(e, t) {
  Pt(t);
  const {
    parent: r
  } = e, a = e.next;
  if (t.next = a, t.prev = e, e.next = t, t.parent = r, a) {
    if (a.prev = t, r) {
      const u = r.children;
      u.splice(u.lastIndexOf(a), 0, t)
    }
  } else r && r.children.push(t)
}

function Sh(e, t) {
  if (Pt(t), t.parent = e, t.prev = null, e.children.unshift(t) !== 1) {
    const r = e.children[1];
    r.prev = t, t.next = r
  } else t.next = null
}

function Nh(e, t) {
  Pt(t);
  const {
    parent: r
  } = e;
  if (r) {
    const a = r.children;
    a.splice(a.indexOf(e), 0, t)
  }
  e.prev && (e.prev.next = t), t.parent = r, t.prev = e.prev, t.next = e, e.prev = t
}

function Pr(e, t, r = !0, a = 1 / 0) {
  return Hn(e, Array.isArray(t) ? t : [t], r, a)
}

function Hn(e, t, r, a) {
  const u = [],
    n = [Array.isArray(t) ? t : [t]],
    s = [0];
  for (;;) {
    if (s[0] >= n[0].length) {
      if (s.length === 1) return u;
      n.shift(), s.shift();
      continue
    }
    const i = n[0][s[0]++];
    if (e(i) && (u.push(i), --a <= 0)) return u;
    r && ge(i) && i.children.length > 0 && (s.unshift(0), n.unshift(i.children))
  }
}

function wh(e, t) {
  return t.find(e)
}

function $n(e, t, r = !0) {
  const a = Array.isArray(t) ? t : [t];
  for (let u = 0; u < a.length; u++) {
    const n = a[u];
    if (ae(n) && e(n)) return n;
    if (r && ge(n) && n.children.length > 0) {
      const s = $n(e, n.children, !0);
      if (s) return s
    }
  }
  return null
}

function Pc(e, t) {
  return (Array.isArray(t) ? t : [t]).some(r => ae(r) && e(r) || ge(r) && Pc(e, r.children))
}

function Ih(e, t) {
  const r = [],
    a = [Array.isArray(t) ? t : [t]],
    u = [0];
  for (;;) {
    if (u[0] >= a[0].length) {
      if (a.length === 1) return r;
      a.shift(), u.shift();
      continue
    }
    const n = a[0][u[0]++];
    ae(n) && e(n) && r.push(n), ge(n) && n.children.length > 0 && (u.unshift(0), a.unshift(n.children))
  }
}
const Ka = {
  tag_name(e) {
    return typeof e == "function" ? t => ae(t) && e(t.name) : e === "*" ? ae : t => ae(t) && t.name === e
  },
  tag_type(e) {
    return typeof e == "function" ? t => e(t.type) : t => t.type === e
  },
  tag_contains(e) {
    return typeof e == "function" ? t => rt(t) && e(t.data) : t => rt(t) && t.data === e
  }
};

function qn(e, t) {
  return typeof t == "function" ? r => ae(r) && t(r.attribs[e]) : r => ae(r) && r.attribs[e] === t
}

function Dh(e, t) {
  return r => e(r) || t(r)
}

function Mc(e) {
  const t = Object.keys(e).map(r => {
    const a = e[r];
    return Object.prototype.hasOwnProperty.call(Ka, r) ? Ka[r](a) : qn(r, a)
  });
  return t.length === 0 ? null : t.reduce(Dh)
}

function Oh(e, t) {
  const r = Mc(e);
  return r ? r(t) : !0
}

function Lh(e, t, r, a = 1 / 0) {
  const u = Mc(e);
  return u ? Pr(u, t, r, a) : []
}

function Rh(e, t, r = !0) {
  return Array.isArray(t) || (t = [t]), $n(qn("id", e), t, r)
}

function ur(e, t, r = !0, a = 1 / 0) {
  return Pr(Ka.tag_name(e), t, r, a)
}

function kh(e, t, r = !0, a = 1 / 0) {
  return Pr(qn("class", e), t, r, a)
}

function Bh(e, t, r = !0, a = 1 / 0) {
  return Pr(Ka.tag_type(e), t, r, a)
}

function Fh(e) {
  let t = e.length;
  for (; --t >= 0;) {
    const r = e[t];
    if (t > 0 && e.lastIndexOf(r, t - 1) >= 0) {
      e.splice(t, 1);
      continue
    }
    for (let a = r.parent; a; a = a.parent)
      if (e.includes(a)) {
        e.splice(t, 1);
        break
      }
  }
  return e
}
var qe;
(function (e) {
  e[e.DISCONNECTED = 1] = "DISCONNECTED", e[e.PRECEDING = 2] = "PRECEDING", e[e.FOLLOWING = 4] = "FOLLOWING", e[e.CONTAINS = 8] = "CONTAINS", e[e.CONTAINED_BY = 16] = "CONTAINED_BY"
})(qe || (qe = {}));

function Uc(e, t) {
  const r = [],
    a = [];
  if (e === t) return 0;
  let u = ge(e) ? e : e.parent;
  for (; u;) r.unshift(u), u = u.parent;
  for (u = ge(t) ? t : t.parent; u;) a.unshift(u), u = u.parent;
  const n = Math.min(r.length, a.length);
  let s = 0;
  for (; s < n && r[s] === a[s];) s++;
  if (s === 0) return qe.DISCONNECTED;
  const i = r[s - 1],
    o = i.children,
    c = r[s],
    l = a[s];
  return o.indexOf(c) > o.indexOf(l) ? i === t ? qe.FOLLOWING | qe.CONTAINED_BY : qe.FOLLOWING : i === e ? qe.PRECEDING | qe.CONTAINS : qe.PRECEDING
}

function nr(e) {
  return e = e.filter((t, r, a) => !a.includes(t, r + 1)), e.sort((t, r) => {
    const a = Uc(t, r);
    return a & qe.PRECEDING ? -1 : a & qe.FOLLOWING ? 1 : 0
  }), e
}

function Ph(e) {
  const t = Xa(qh, e);
  return t ? t.name === "feed" ? Mh(t) : Uh(t) : null
}

function Mh(e) {
  var t;
  const r = e.children,
    a = {
      type: "atom",
      items: ur("entry", r).map(s => {
        var i;
        const {
          children: o
        } = s, c = {
          media: Hc(o)
        };
        ke(c, "id", "id", o), ke(c, "title", "title", o);
        const l = (i = Xa("link", o)) === null || i === void 0 ? void 0 : i.attribs.href;
        l && (c.link = l);
        const h = At("summary", o) || At("content", o);
        h && (c.description = h);
        const f = At("updated", o);
        return f && (c.pubDate = new Date(f)), c
      })
    };
  ke(a, "id", "id", r), ke(a, "title", "title", r);
  const u = (t = Xa("link", r)) === null || t === void 0 ? void 0 : t.attribs.href;
  u && (a.link = u), ke(a, "description", "subtitle", r);
  const n = At("updated", r);
  return n && (a.updated = new Date(n)), ke(a, "author", "email", r, !0), a
}

function Uh(e) {
  var t, r;
  const a = (r = (t = Xa("channel", e.children)) === null || t === void 0 ? void 0 : t.children) !== null && r !== void 0 ? r : [],
    u = {
      type: e.name.substr(0, 3),
      id: "",
      items: ur("item", e.children).map(s => {
        const {
          children: i
        } = s, o = {
          media: Hc(i)
        };
        ke(o, "id", "guid", i), ke(o, "title", "title", i), ke(o, "link", "link", i), ke(o, "description", "description", i);
        const c = At("pubDate", i) || At("dc:date", i);
        return c && (o.pubDate = new Date(c)), o
      })
    };
  ke(u, "title", "title", a), ke(u, "link", "link", a), ke(u, "description", "description", a);
  const n = At("lastBuildDate", a);
  return n && (u.updated = new Date(n)), ke(u, "author", "managingEditor", a, !0), u
}
const Hh = ["url", "type", "lang"],
  $h = ["fileSize", "bitrate", "framerate", "samplingrate", "channels", "duration", "height", "width"];

function Hc(e) {
  return ur("media:content", e).map(t => {
    const {
      attribs: r
    } = t, a = {
      medium: r.medium,
      isDefault: !!r.isDefault
    };
    for (const u of Hh) r[u] && (a[u] = r[u]);
    for (const u of $h) r[u] && (a[u] = parseInt(r[u], 10));
    return r.expression && (a.expression = r.expression), a
  })
}

function Xa(e, t) {
  return ur(e, t, !0, 1)[0]
}

function At(e, t, r = !1) {
  return Qt(ur(e, t, r, 1)).trim()
}

function ke(e, t, r, a, u = !1) {
  const n = At(r, a, u);
  n && (e[t] = n)
}

function qh(e) {
  return e === "rss" || e === "feed" || e === "rdf:RDF"
}
const Eu = Object.freeze(Object.defineProperty({
  __proto__: null,
  get DocumentPosition() {
    return qe
  },
  append: Ch,
  appendChild: yh,
  compareDocumentPosition: Uc,
  existsOne: Pc,
  filter: Pr,
  find: Hn,
  findAll: Ih,
  findOne: $n,
  findOneChild: wh,
  getAttributeValue: Ah,
  getChildren: xu,
  getElementById: Rh,
  getElements: Lh,
  getElementsByClassName: kh,
  getElementsByTagName: ur,
  getElementsByTagType: Bh,
  getFeed: Ph,
  getInnerHTML: gh,
  getName: vh,
  getOuterHTML: kc,
  getParent: Bc,
  getSiblings: Fc,
  getText: na,
  hasAttrib: Th,
  hasChildren: ge,
  innerText: ja,
  isCDATA: mu,
  isComment: pu,
  isDocument: Ft,
  isTag: ae,
  isText: rt,
  nextElementSibling: Mn,
  prepend: Nh,
  prependChild: Sh,
  prevElementSibling: Un,
  removeElement: Pt,
  removeSubsets: Fh,
  replaceElement: _h,
  testElement: Oh,
  textContent: Qt,
  uniqueSort: nr
}, Symbol.toStringTag, {
  value: "Module"
}));

function $c(e, t, r) {
  return e ? e(t ?? e._root.children, null, void 0, r).toString() : ""
}

function Wh(e, t) {
  return typeof e == "object" && e != null && !("length" in e) && !("type" in e)
}

function Yh(e, t) {
  const r = Wh(e) ? (t = e, void 0) : e,
    a = {
      ...Ln,
      ...this === null || this === void 0 ? void 0 : this._options,
      ...cn(t ?? {})
    };
  return $c(this, r, a)
}

function zh(e) {
  const t = {
    ...this._options,
    xmlMode: !0
  };
  return $c(this, e, t)
}

function Lr(e) {
  const t = e || (this ? this.root() : []);
  let r = "";
  for (let a = 0; a < t.length; a++) r += Qt(t[a]);
  return r
}

function Vh(e, t, r = typeof t == "boolean" ? t : !1) {
  if (!e || typeof e != "string") return null;
  typeof t == "boolean" && (r = t);
  const a = this.load(e, Ln, !1);
  return r || a("script").remove(), a.root()[0].children.slice()
}

function Gh() {
  return this(this._root)
}

function qc(e, t) {
  if (t === e) return !1;
  let r = t;
  for (; r && r !== r.parent;)
    if (r = r.parent, r === e) return !0;
  return !1
}

function jh(e, t) {
  if (!j0(e) || !j0(t)) return;
  let r = e.length;
  const a = +t.length;
  for (let u = 0; u < a; u++) e[r++] = t[u];
  return e.length = r, e
}

function j0(e) {
  if (Array.isArray(e)) return !0;
  if (typeof e != "object" || !Object.prototype.hasOwnProperty.call(e, "length") || typeof e.length != "number" || e.length < 0) return !1;
  for (let t = 0; t < e.length; t++)
    if (!(t in e)) return !1;
  return !0
}
const Kh = Object.freeze(Object.defineProperty({
  __proto__: null,
  contains: qc,
  html: Yh,
  merge: jh,
  parseHTML: Vh,
  root: Gh,
  text: Lr,
  xml: zh
}, Symbol.toStringTag, {
  value: "Module"
}));

function at(e) {
  return e.cheerio != null
}

function Xh(e) {
  return e.replace(/[_.-](\w|$)/g, (t, r) => r.toUpperCase())
}

function Qh(e) {
  return e.replace(/[A-Z]/g, "-$&").toLowerCase()
}

function xe(e, t) {
  const r = e.length;
  for (let a = 0; a < r; a++) t(e[a], a);
  return e
}

function hn(e) {
  const t = "length" in e ? Array.prototype.map.call(e, a => Ga(a, !0)) : [Ga(e, !0)],
    r = new kt(t);
  return t.forEach(a => {
    a.parent = r
  }), t
}
var Ot;
(function (e) {
  e[e.LowerA = 97] = "LowerA", e[e.LowerZ = 122] = "LowerZ", e[e.UpperA = 65] = "UpperA", e[e.UpperZ = 90] = "UpperZ", e[e.Exclamation = 33] = "Exclamation"
})(Ot || (Ot = {}));

function mn(e) {
  const t = e.indexOf("<");
  if (t < 0 || t > e.length - 3) return !1;
  const r = e.charCodeAt(t + 1);
  return (r >= Ot.LowerA && r <= Ot.LowerZ || r >= Ot.UpperA && r <= Ot.UpperZ || r === Ot.Exclamation) && e.includes(">", t + 2)
}
const jt = Object.prototype.hasOwnProperty,
  Rr = /\s+/,
  Hu = "data-",
  K0 = {
    null: null,
    true: !0,
    false: !1
  },
  Wn = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
  Jh = /^{[^]*}$|^\[[^]*]$/;

function Qa(e, t, r) {
  var a;
  if (!(!e || !ae(e))) {
    if ((a = e.attribs) !== null && a !== void 0 || (e.attribs = {}), !t) return e.attribs;
    if (jt.call(e.attribs, t)) return !r && Wn.test(t) ? t : e.attribs[t];
    if (e.name === "option" && t === "value") return Lr(e.children);
    if (e.name === "input" && (e.attribs.type === "radio" || e.attribs.type === "checkbox") && t === "value") return "on"
  }
}

function Kt(e, t, r) {
  r === null ? Wc(e, t) : e.attribs[t] = `${r}`
}

function Zh(e, t) {
  if (typeof e == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof e != "string") throw new Error("Bad combination of arguments.");
      return xe(this, (r, a) => {
        ae(r) && Kt(r, e, t.call(r, a, r.attribs[e]))
      })
    }
    return xe(this, r => {
      ae(r) && (typeof e == "object" ? Object.keys(e).forEach(a => {
        const u = e[a];
        Kt(r, a, u)
      }) : Kt(r, e, t))
    })
  }
  return arguments.length > 1 ? this : Qa(this[0], e, this.options.xmlMode)
}

function X0(e, t, r) {
  return t in e ? e[t] : !r && Wn.test(t) ? Qa(e, t, !1) !== void 0 : Qa(e, t, r)
}

function $u(e, t, r, a) {
  t in e ? e[t] = r : Kt(e, t, !a && Wn.test(t) ? r ? "" : null : `${r}`)
}

function em(e, t) {
  var r;
  if (typeof e == "string" && t === void 0) {
    const a = this[0];
    if (!a || !ae(a)) return;
    switch (e) {
    case "style": {
      const u = this.css(),
        n = Object.keys(u);
      return n.forEach((s, i) => {
        u[i] = s
      }), u.length = n.length, u
    }
    case "tagName":
    case "nodeName":
      return a.name.toUpperCase();
    case "href":
    case "src": {
      const u = (r = a.attribs) === null || r === void 0 ? void 0 : r[e];
      return typeof URL < "u" && (e === "href" && (a.tagName === "a" || a.name === "link") || e === "src" && (a.tagName === "img" || a.tagName === "iframe" || a.tagName === "audio" || a.tagName === "video" || a.tagName === "source")) && u !== void 0 && this.options.baseURI ? new URL(u, this.options.baseURI).href : u
    }
    case "innerText":
      return ja(a);
    case "textContent":
      return Qt(a);
    case "outerHTML":
      return this.clone().wrap("<container />").parent().html();
    case "innerHTML":
      return this.html();
    default:
      return X0(a, e, this.options.xmlMode)
    }
  }
  if (typeof e == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof e == "object") throw new Error("Bad combination of arguments.");
      return xe(this, (a, u) => {
        ae(a) && $u(a, e, t.call(a, u, X0(a, e, this.options.xmlMode)), this.options.xmlMode)
      })
    }
    return xe(this, a => {
      ae(a) && (typeof e == "object" ? Object.keys(e).forEach(u => {
        const n = e[u];
        $u(a, u, n, this.options.xmlMode)
      }) : $u(a, e, t, this.options.xmlMode))
    })
  }
}

function Q0(e, t, r) {
  var a;
  const u = e;
  (a = u.data) !== null && a !== void 0 || (u.data = {}), typeof t == "object" ? Object.assign(u.data, t) : typeof t == "string" && r !== void 0 && (u.data[t] = r)
}

function J0(e, t) {
  let r, a, u;
  t == null ? (r = Object.keys(e.attribs).filter(n => n.startsWith(Hu)), a = r.map(n => Xh(n.slice(Hu.length)))) : (r = [Hu + Qh(t)], a = [t]);
  for (let n = 0; n < r.length; ++n) {
    const s = r[n],
      i = a[n];
    if (jt.call(e.attribs, s) && !jt.call(e.data, i)) {
      if (u = e.attribs[s], jt.call(K0, u)) u = K0[u];
      else if (u === String(Number(u))) u = Number(u);
      else if (Jh.test(u)) try {
        u = JSON.parse(u)
      } catch {}
      e.data[i] = u
    }
  }
  return t == null ? e.data : u
}

function tm(e, t) {
  var r;
  const a = this[0];
  if (!a || !ae(a)) return;
  const u = a;
  return (r = u.data) !== null && r !== void 0 || (u.data = {}), e ? typeof e == "object" || t !== void 0 ? (xe(this, n => {
    ae(n) && (typeof e == "object" ? Q0(n, e) : Q0(n, e, t))
  }), this) : jt.call(u.data, e) ? u.data[e] : J0(u, e) : J0(u)
}

function rm(e) {
  const t = arguments.length === 0,
    r = this[0];
  if (!r || !ae(r)) return t ? void 0 : this;
  switch (r.name) {
  case "textarea":
    return this.text(e);
  case "select": {
    const a = this.find("option:selected");
    if (!t) {
      if (this.attr("multiple") == null && typeof e == "object") return this;
      this.find("option").removeAttr("selected");
      const u = typeof e != "object" ? [e] : e;
      for (let n = 0; n < u.length; n++) this.find(`option[value="${u[n]}"]`).attr("selected", "");
      return this
    }
    return this.attr("multiple") ? a.toArray().map(u => Lr(u.children)) : a.attr("value")
  }
  case "input":
  case "option":
    return t ? this.attr("value") : this.attr("value", e)
  }
}

function Wc(e, t) {
  !e.attribs || !jt.call(e.attribs, t) || delete e.attribs[t]
}

function Ja(e) {
  return e ? e.trim().split(Rr) : []
}

function am(e) {
  const t = Ja(e);
  for (let r = 0; r < t.length; r++) xe(this, a => {
    ae(a) && Wc(a, t[r])
  });
  return this
}

function um(e) {
  return this.toArray().some(t => {
    const r = ae(t) && t.attribs.class;
    let a = -1;
    if (r && e.length)
      for (;
        (a = r.indexOf(e, a + 1)) > -1;) {
        const u = a + e.length;
        if ((a === 0 || Rr.test(r[a - 1])) && (u === r.length || Rr.test(r[u]))) return !0
      }
    return !1
  })
}

function Yc(e) {
  if (typeof e == "function") return xe(this, (a, u) => {
    if (ae(a)) {
      const n = a.attribs.class || "";
      Yc.call([a], e.call(a, u, n))
    }
  });
  if (!e || typeof e != "string") return this;
  const t = e.split(Rr),
    r = this.length;
  for (let a = 0; a < r; a++) {
    const u = this[a];
    if (!ae(u)) continue;
    const n = Qa(u, "class", !1);
    if (!n) Kt(u, "class", t.join(" ").trim());
    else {
      let s = ` ${n} `;
      for (let i = 0; i < t.length; i++) {
        const o = `${t[i]} `;
        s.includes(` ${o}`) || (s += o)
      }
      Kt(u, "class", s.trim())
    }
  }
  return this
}

function zc(e) {
  if (typeof e == "function") return xe(this, (u, n) => {
    ae(u) && zc.call([u], e.call(u, n, u.attribs.class || ""))
  });
  const t = Ja(e),
    r = t.length,
    a = arguments.length === 0;
  return xe(this, u => {
    if (ae(u))
      if (a) u.attribs.class = "";
      else {
        const n = Ja(u.attribs.class);
        let s = !1;
        for (let i = 0; i < r; i++) {
          const o = n.indexOf(t[i]);
          o >= 0 && (n.splice(o, 1), s = !0, i--)
        }
        s && (u.attribs.class = n.join(" "))
      }
  })
}

function Vc(e, t) {
  if (typeof e == "function") return xe(this, (s, i) => {
    ae(s) && Vc.call([s], e.call(s, i, s.attribs.class || "", t), t)
  });
  if (!e || typeof e != "string") return this;
  const r = e.split(Rr),
    a = r.length,
    u = typeof t == "boolean" ? t ? 1 : -1 : 0,
    n = this.length;
  for (let s = 0; s < n; s++) {
    const i = this[s];
    if (!ae(i)) continue;
    const o = Ja(i.attribs.class);
    for (let c = 0; c < a; c++) {
      const l = o.indexOf(r[c]);
      u >= 0 && l < 0 ? o.push(r[c]) : u <= 0 && l >= 0 && o.splice(l, 1)
    }
    i.attribs.class = o.join(" ")
  }
  return this
}
const nm = Object.freeze(Object.defineProperty({
  __proto__: null,
  addClass: Yc,
  attr: Zh,
  data: tm,
  hasClass: um,
  prop: em,
  removeAttr: am,
  removeClass: zc,
  toggleClass: Vc,
  val: rm
}, Symbol.toStringTag, {
  value: "Module"
}));
var te;
(function (e) {
  e.Attribute = "attribute", e.Pseudo = "pseudo", e.PseudoElement = "pseudo-element", e.Tag = "tag", e.Universal = "universal", e.Adjacent = "adjacent", e.Child = "child", e.Descendant = "descendant", e.Parent = "parent", e.Sibling = "sibling", e.ColumnCombinator = "column-combinator"
})(te || (te = {}));
var Te;
(function (e) {
  e.Any = "any", e.Element = "element", e.End = "end", e.Equals = "equals", e.Exists = "exists", e.Hyphen = "hyphen", e.Not = "not", e.Start = "start"
})(Te || (Te = {}));
const Z0 = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,
  sm = /\\([\da-f]{1,6}\s?|(\s)|.)/gi,
  im = new Map([
    [126, Te.Element],
    [94, Te.Start],
    [36, Te.End],
    [42, Te.Any],
    [33, Te.Not],
    [124, Te.Hyphen]
  ]),
  om = new Set(["has", "not", "matches", "is", "where", "host", "host-context"]);

function _r(e) {
  switch (e.type) {
  case te.Adjacent:
  case te.Child:
  case te.Descendant:
  case te.Parent:
  case te.Sibling:
  case te.ColumnCombinator:
    return !0;
  default:
    return !1
  }
}
const cm = new Set(["contains", "icontains"]);

function dm(e, t, r) {
  const a = parseInt(t, 16) - 65536;
  return a !== a || r ? t : a < 0 ? String.fromCharCode(a + 65536) : String.fromCharCode(a >> 10 | 55296, a & 1023 | 56320)
}

function hr(e) {
  return e.replace(sm, dm)
}

function qu(e) {
  return e === 39 || e === 34
}

function es(e) {
  return e === 32 || e === 9 || e === 10 || e === 12 || e === 13
}

function gu(e) {
  const t = [],
    r = Gc(t, `${e}`, 0);
  if (r < e.length) throw new Error(`Unmatched selector: ${e.slice(r)}`);
  return t
}

function Gc(e, t, r) {
  let a = [];

  function u(f) {
    const m = t.slice(r + f).match(Z0);
    if (!m) throw new Error(`Expected name, found ${t.slice(r)}`);
    const [p] = m;
    return r += f + p.length, hr(p)
  }

  function n(f) {
    for (r += f; r < t.length && es(t.charCodeAt(r));) r++
  }

  function s() {
    r += 1;
    const f = r;
    let m = 1;
    for (; m > 0 && r < t.length; r++) t.charCodeAt(r) === 40 && !i(r) ? m++ : t.charCodeAt(r) === 41 && !i(r) && m--;
    if (m) throw new Error("Parenthesis not matched");
    return hr(t.slice(f, r - 1))
  }

  function i(f) {
    let m = 0;
    for (; t.charCodeAt(--f) === 92;) m++;
    return (m & 1) === 1
  }

  function o() {
    if (a.length > 0 && _r(a[a.length - 1])) throw new Error("Did not expect successive traversals.")
  }

  function c(f) {
    if (a.length > 0 && a[a.length - 1].type === te.Descendant) {
      a[a.length - 1].type = f;
      return
    }
    o(), a.push({
      type: f
    })
  }

  function l(f, m) {
    a.push({
      type: te.Attribute,
      name: f,
      action: m,
      value: u(1),
      namespace: null,
      ignoreCase: "quirks"
    })
  }

  function h() {
    if (a.length && a[a.length - 1].type === te.Descendant && a.pop(), a.length === 0) throw new Error("Empty sub-selector");
    e.push(a)
  }
  if (n(0), t.length === r) return r;
  e: for (; r < t.length;) {
    const f = t.charCodeAt(r);
    switch (f) {
    case 32:
    case 9:
    case 10:
    case 12:
    case 13: {
      (a.length === 0 || a[0].type !== te.Descendant) && (o(), a.push({
        type: te.Descendant
      })), n(1);
      break
    }
    case 62: {
      c(te.Child), n(1);
      break
    }
    case 60: {
      c(te.Parent), n(1);
      break
    }
    case 126: {
      c(te.Sibling), n(1);
      break
    }
    case 43: {
      c(te.Adjacent), n(1);
      break
    }
    case 46: {
      l("class", Te.Element);
      break
    }
    case 35: {
      l("id", Te.Equals);
      break
    }
    case 91: {
      n(1);
      let m, p = null;
      t.charCodeAt(r) === 124 ? m = u(1) : t.startsWith("*|", r) ? (p = "*", m = u(2)) : (m = u(0), t.charCodeAt(r) === 124 && t.charCodeAt(r + 1) !== 61 && (p = m, m = u(1))), n(0);
      let b = Te.Exists;
      const x = im.get(t.charCodeAt(r));
      if (x) {
        if (b = x, t.charCodeAt(r + 1) !== 61) throw new Error("Expected `=`");
        n(2)
      } else t.charCodeAt(r) === 61 && (b = Te.Equals, n(1));
      let T = "",
        E = null;
      if (b !== "exists") {
        if (qu(t.charCodeAt(r))) {
          const C = t.charCodeAt(r);
          let N = r + 1;
          for (; N < t.length && (t.charCodeAt(N) !== C || i(N));) N += 1;
          if (t.charCodeAt(N) !== C) throw new Error("Attribute value didn't end");
          T = hr(t.slice(r + 1, N)), r = N + 1
        } else {
          const C = r;
          for (; r < t.length && (!es(t.charCodeAt(r)) && t.charCodeAt(r) !== 93 || i(r));) r += 1;
          T = hr(t.slice(C, r))
        }
        n(0);
        const v = t.charCodeAt(r) | 32;
        v === 115 ? (E = !1, n(1)) : v === 105 && (E = !0, n(1))
      }
      if (t.charCodeAt(r) !== 93) throw new Error("Attribute selector didn't terminate");
      r += 1;
      const A = {
        type: te.Attribute,
        name: m,
        action: b,
        value: T,
        namespace: p,
        ignoreCase: E
      };
      a.push(A);
      break
    }
    case 58: {
      if (t.charCodeAt(r + 1) === 58) {
        a.push({
          type: te.PseudoElement,
          name: u(2).toLowerCase(),
          data: t.charCodeAt(r) === 40 ? s() : null
        });
        continue
      }
      const m = u(1).toLowerCase();
      let p = null;
      if (t.charCodeAt(r) === 40)
        if (om.has(m)) {
          if (qu(t.charCodeAt(r + 1))) throw new Error(`Pseudo-selector ${m} cannot be quoted`);
          if (p = [], r = Gc(p, t, r + 1), t.charCodeAt(r) !== 41) throw new Error(`Missing closing parenthesis in :${m} (${t})`);
          r += 1
        } else {
          if (p = s(), cm.has(m)) {
            const b = p.charCodeAt(0);
            b === p.charCodeAt(p.length - 1) && qu(b) && (p = p.slice(1, -1))
          }
          p = hr(p)
        } a.push({
        type: te.Pseudo,
        name: m,
        data: p
      });
      break
    }
    case 44: {
      h(), a = [], n(1);
      break
    }
    default: {
      if (t.startsWith("/*", r)) {
        const b = t.indexOf("*/", r + 2);
        if (b < 0) throw new Error("Comment was not terminated");
        r = b + 2, a.length === 0 && n(0);
        break
      }
      let m = null,
        p;
      if (f === 42) r += 1, p = "*";
      else if (f === 124) {
        if (p = "", t.charCodeAt(r + 1) === 124) {
          c(te.ColumnCombinator), n(2);
          break
        }
      } else if (Z0.test(t.slice(r))) p = u(0);
      else break e;
      t.charCodeAt(r) === 124 && t.charCodeAt(r + 1) !== 124 && (m = p, t.charCodeAt(r + 1) === 42 ? (p = "*", r += 2) : p = u(1)), a.push(p === "*" ? {
        type: te.Universal,
        namespace: m
      } : {
        type: te.Tag,
        name: p,
        namespace: m
      })
    }
    }
  }
  return h(), r
}
var Wu, ts;

function lm() {
  return ts || (ts = 1, Wu = {
    trueFunc: function () {
      return !0
    },
    falseFunc: function () {
      return !1
    }
  }), Wu
}
var Za = lm();
const ie = mt(Za),
  jc = new Map([
    [te.Universal, 50],
    [te.Tag, 30],
    [te.Attribute, 1],
    [te.Pseudo, 0]
  ]);

function Yn(e) {
  return !jc.has(e.type)
}
const fm = new Map([
  [Te.Exists, 10],
  [Te.Equals, 8],
  [Te.Not, 7],
  [Te.Start, 6],
  [Te.End, 6],
  [Te.Any, 5]
]);

function hm(e) {
  const t = e.map(Kc);
  for (let r = 1; r < e.length; r++) {
    const a = t[r];
    if (!(a < 0))
      for (let u = r - 1; u >= 0 && a < t[u]; u--) {
        const n = e[u + 1];
        e[u + 1] = e[u], e[u] = n, t[u + 1] = t[u], t[u] = a
      }
  }
}

function Kc(e) {
  var t, r;
  let a = (t = jc.get(e.type)) !== null && t !== void 0 ? t : -1;
  return e.type === te.Attribute ? (a = (r = fm.get(e.action)) !== null && r !== void 0 ? r : 4, e.action === Te.Equals && e.name === "id" && (a = 9), e.ignoreCase && (a >>= 1)) : e.type === te.Pseudo && (e.data ? e.name === "has" || e.name === "contains" ? a = 0 : Array.isArray(e.data) ? (a = Math.min(...e.data.map(u => Math.min(...u.map(Kc)))), a < 0 && (a = 0)) : a = 2 : a = 3), a
}
const mm = /[-[\]{}()*+?.,\\^$|#\s]/g;

function rs(e) {
  return e.replace(mm, "\\$&")
}
const pm = new Set(["accept", "accept-charset", "align", "alink", "axis", "bgcolor", "charset", "checked", "clear", "codetype", "color", "compact", "declare", "defer", "dir", "direction", "disabled", "enctype", "face", "frame", "hreflang", "http-equiv", "lang", "language", "link", "media", "method", "multiple", "nohref", "noresize", "noshade", "nowrap", "readonly", "rel", "rev", "rules", "scope", "scrolling", "selected", "shape", "target", "text", "type", "valign", "valuetype", "vlink"]);

function wt(e, t) {
  return typeof e.ignoreCase == "boolean" ? e.ignoreCase : e.ignoreCase === "quirks" ? !!t.quirksMode : !t.xmlMode && pm.has(e.name)
}
const bm = {
    equals(e, t, r) {
      const {
        adapter: a
      } = r, {
        name: u
      } = t;
      let {
        value: n
      } = t;
      return wt(t, r) ? (n = n.toLowerCase(), s => {
        const i = a.getAttributeValue(s, u);
        return i != null && i.length === n.length && i.toLowerCase() === n && e(s)
      }) : s => a.getAttributeValue(s, u) === n && e(s)
    },
    hyphen(e, t, r) {
      const {
        adapter: a
      } = r, {
        name: u
      } = t;
      let {
        value: n
      } = t;
      const s = n.length;
      return wt(t, r) ? (n = n.toLowerCase(), function (o) {
        const c = a.getAttributeValue(o, u);
        return c != null && (c.length === s || c.charAt(s) === "-") && c.substr(0, s).toLowerCase() === n && e(o)
      }) : function (o) {
        const c = a.getAttributeValue(o, u);
        return c != null && (c.length === s || c.charAt(s) === "-") && c.substr(0, s) === n && e(o)
      }
    },
    element(e, t, r) {
      const {
        adapter: a
      } = r, {
        name: u,
        value: n
      } = t;
      if (/\s/.test(n)) return ie.falseFunc;
      const s = new RegExp(`(?:^|\\s)${rs(n)}(?:$|\\s)`, wt(t, r) ? "i" : "");
      return function (o) {
        const c = a.getAttributeValue(o, u);
        return c != null && c.length >= n.length && s.test(c) && e(o)
      }
    },
    exists(e, {
      name: t
    }, {
      adapter: r
    }) {
      return a => r.hasAttrib(a, t) && e(a)
    },
    start(e, t, r) {
      const {
        adapter: a
      } = r, {
        name: u
      } = t;
      let {
        value: n
      } = t;
      const s = n.length;
      return s === 0 ? ie.falseFunc : wt(t, r) ? (n = n.toLowerCase(), i => {
        const o = a.getAttributeValue(i, u);
        return o != null && o.length >= s && o.substr(0, s).toLowerCase() === n && e(i)
      }) : i => {
        var o;
        return !!(!((o = a.getAttributeValue(i, u)) === null || o === void 0) && o.startsWith(n)) && e(i)
      }
    },
    end(e, t, r) {
      const {
        adapter: a
      } = r, {
        name: u
      } = t;
      let {
        value: n
      } = t;
      const s = -n.length;
      return s === 0 ? ie.falseFunc : wt(t, r) ? (n = n.toLowerCase(), i => {
        var o;
        return ((o = a.getAttributeValue(i, u)) === null || o === void 0 ? void 0 : o.substr(s).toLowerCase()) === n && e(i)
      }) : i => {
        var o;
        return !!(!((o = a.getAttributeValue(i, u)) === null || o === void 0) && o.endsWith(n)) && e(i)
      }
    },
    any(e, t, r) {
      const {
        adapter: a
      } = r, {
        name: u,
        value: n
      } = t;
      if (n === "") return ie.falseFunc;
      if (wt(t, r)) {
        const s = new RegExp(rs(n), "i");
        return function (o) {
          const c = a.getAttributeValue(o, u);
          return c != null && c.length >= n.length && s.test(c) && e(o)
        }
      }
      return s => {
        var i;
        return !!(!((i = a.getAttributeValue(s, u)) === null || i === void 0) && i.includes(n)) && e(s)
      }
    },
    not(e, t, r) {
      const {
        adapter: a
      } = r, {
        name: u
      } = t;
      let {
        value: n
      } = t;
      return n === "" ? s => !!a.getAttributeValue(s, u) && e(s) : wt(t, r) ? (n = n.toLowerCase(), s => {
        const i = a.getAttributeValue(s, u);
        return (i == null || i.length !== n.length || i.toLowerCase() !== n) && e(s)
      }) : s => a.getAttributeValue(s, u) !== n && e(s)
    }
  },
  xm = new Set([9, 10, 12, 13, 32]),
  as = 48,
  Em = 57;

function gm(e) {
  if (e = e.trim().toLowerCase(), e === "even") return [2, 0];
  if (e === "odd") return [2, 1];
  let t = 0,
    r = 0,
    a = n(),
    u = s();
  if (t < e.length && e.charAt(t) === "n" && (t++, r = a * (u ?? 1), i(), t < e.length ? (a = n(), i(), u = s()) : a = u = 0), u === null || t < e.length) throw new Error(`n-th rule couldn't be parsed ('${e}')`);
  return [r, a * u];

  function n() {
    return e.charAt(t) === "-" ? (t++, -1) : (e.charAt(t) === "+" && t++, 1)
  }

  function s() {
    const o = t;
    let c = 0;
    for (; t < e.length && e.charCodeAt(t) >= as && e.charCodeAt(t) <= Em;) c = c * 10 + (e.charCodeAt(t) - as), t++;
    return t === o ? null : c
  }

  function i() {
    for (; t < e.length && xm.has(e.charCodeAt(t));) t++
  }
}

function Am(e) {
  const t = e[0],
    r = e[1] - 1;
  if (r < 0 && t <= 0) return ie.falseFunc;
  if (t === -1) return n => n <= r;
  if (t === 0) return n => n === r;
  if (t === 1) return r < 0 ? ie.trueFunc : n => n >= r;
  const a = Math.abs(t),
    u = (r % a + a) % a;
  return t > 1 ? n => n >= r && n % a === u : n => n <= r && n % a === u
}

function Xr(e) {
  return Am(gm(e))
}

function Qr(e, t) {
  return r => {
    const a = t.getParent(r);
    return a != null && t.isTag(a) && e(r)
  }
}
const pn = {
  contains(e, t, {
    adapter: r
  }) {
    return function (u) {
      return e(u) && r.getText(u).includes(t)
    }
  },
  icontains(e, t, {
    adapter: r
  }) {
    const a = t.toLowerCase();
    return function (n) {
      return e(n) && r.getText(n).toLowerCase().includes(a)
    }
  },
  "nth-child"(e, t, {
    adapter: r,
    equals: a
  }) {
    const u = Xr(t);
    return u === ie.falseFunc ? ie.falseFunc : u === ie.trueFunc ? Qr(e, r) : function (s) {
      const i = r.getSiblings(s);
      let o = 0;
      for (let c = 0; c < i.length && !a(s, i[c]); c++) r.isTag(i[c]) && o++;
      return u(o) && e(s)
    }
  },
  "nth-last-child"(e, t, {
    adapter: r,
    equals: a
  }) {
    const u = Xr(t);
    return u === ie.falseFunc ? ie.falseFunc : u === ie.trueFunc ? Qr(e, r) : function (s) {
      const i = r.getSiblings(s);
      let o = 0;
      for (let c = i.length - 1; c >= 0 && !a(s, i[c]); c--) r.isTag(i[c]) && o++;
      return u(o) && e(s)
    }
  },
  "nth-of-type"(e, t, {
    adapter: r,
    equals: a
  }) {
    const u = Xr(t);
    return u === ie.falseFunc ? ie.falseFunc : u === ie.trueFunc ? Qr(e, r) : function (s) {
      const i = r.getSiblings(s);
      let o = 0;
      for (let c = 0; c < i.length; c++) {
        const l = i[c];
        if (a(s, l)) break;
        r.isTag(l) && r.getName(l) === r.getName(s) && o++
      }
      return u(o) && e(s)
    }
  },
  "nth-last-of-type"(e, t, {
    adapter: r,
    equals: a
  }) {
    const u = Xr(t);
    return u === ie.falseFunc ? ie.falseFunc : u === ie.trueFunc ? Qr(e, r) : function (s) {
      const i = r.getSiblings(s);
      let o = 0;
      for (let c = i.length - 1; c >= 0; c--) {
        const l = i[c];
        if (a(s, l)) break;
        r.isTag(l) && r.getName(l) === r.getName(s) && o++
      }
      return u(o) && e(s)
    }
  },
  root(e, t, {
    adapter: r
  }) {
    return a => {
      const u = r.getParent(a);
      return (u == null || !r.isTag(u)) && e(a)
    }
  },
  scope(e, t, r, a) {
    const {
      equals: u
    } = r;
    return !a || a.length === 0 ? pn.root(e, t, r) : a.length === 1 ? n => u(a[0], n) && e(n) : n => a.includes(n) && e(n)
  },
  hover: Yu("isHovered"),
  visited: Yu("isVisited"),
  active: Yu("isActive")
};

function Yu(e) {
  return function (r, a, {
    adapter: u
  }) {
    const n = u[e];
    return typeof n != "function" ? ie.falseFunc : function (i) {
      return n(i) && r(i)
    }
  }
}
const us = {
  empty(e, {
    adapter: t
  }) {
    return !t.getChildren(e).some(r => t.isTag(r) || t.getText(r) !== "")
  },
  "first-child"(e, {
    adapter: t,
    equals: r
  }) {
    if (t.prevElementSibling) return t.prevElementSibling(e) == null;
    const a = t.getSiblings(e).find(u => t.isTag(u));
    return a != null && r(e, a)
  },
  "last-child"(e, {
    adapter: t,
    equals: r
  }) {
    const a = t.getSiblings(e);
    for (let u = a.length - 1; u >= 0; u--) {
      if (r(e, a[u])) return !0;
      if (t.isTag(a[u])) break
    }
    return !1
  },
  "first-of-type"(e, {
    adapter: t,
    equals: r
  }) {
    const a = t.getSiblings(e),
      u = t.getName(e);
    for (let n = 0; n < a.length; n++) {
      const s = a[n];
      if (r(e, s)) return !0;
      if (t.isTag(s) && t.getName(s) === u) break
    }
    return !1
  },
  "last-of-type"(e, {
    adapter: t,
    equals: r
  }) {
    const a = t.getSiblings(e),
      u = t.getName(e);
    for (let n = a.length - 1; n >= 0; n--) {
      const s = a[n];
      if (r(e, s)) return !0;
      if (t.isTag(s) && t.getName(s) === u) break
    }
    return !1
  },
  "only-of-type"(e, {
    adapter: t,
    equals: r
  }) {
    const a = t.getName(e);
    return t.getSiblings(e).every(u => r(e, u) || !t.isTag(u) || t.getName(u) !== a)
  },
  "only-child"(e, {
    adapter: t,
    equals: r
  }) {
    return t.getSiblings(e).every(a => r(e, a) || !t.isTag(a))
  }
};

function ns(e, t, r, a) {
  if (r === null) {
    if (e.length > a) throw new Error(`Pseudo-class :${t} requires an argument`)
  } else if (e.length === a) throw new Error(`Pseudo-class :${t} doesn't have any arguments`)
}
const Tm = {
    "any-link": ":is(a, area, link)[href]",
    link: ":any-link:not(:visited)",
    disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
    enabled: ":not(:disabled)",
    checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
    required: ":is(input, select, textarea)[required]",
    optional: ":is(input, select, textarea):not([required])",
    selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
    checkbox: "[type=checkbox]",
    file: "[type=file]",
    password: "[type=password]",
    radio: "[type=radio]",
    reset: "[type=reset]",
    image: "[type=image]",
    submit: "[type=submit]",
    parent: ":not(:empty)",
    header: ":is(h1, h2, h3, h4, h5, h6)",
    button: ":is(button, input[type=button])",
    input: ":is(input, textarea, select, button)",
    text: "input:is(:not([type!='']), [type=text])"
  },
  Xc = {};

function vm(e, t) {
  return e === ie.falseFunc ? ie.falseFunc : r => t.isTag(r) && e(r)
}

function Qc(e, t) {
  const r = t.getSiblings(e);
  if (r.length <= 1) return [];
  const a = r.indexOf(e);
  return a < 0 || a === r.length - 1 ? [] : r.slice(a + 1).filter(t.isTag)
}

function bn(e) {
  return {
    xmlMode: !!e.xmlMode,
    lowerCaseAttributeNames: !!e.lowerCaseAttributeNames,
    lowerCaseTags: !!e.lowerCaseTags,
    quirksMode: !!e.quirksMode,
    cacheResults: !!e.cacheResults,
    pseudos: e.pseudos,
    adapter: e.adapter,
    equals: e.equals
  }
}
const zu = (e, t, r, a, u) => {
    const n = u(t, bn(r), a);
    return n === ie.trueFunc ? e : n === ie.falseFunc ? ie.falseFunc : s => n(s) && e(s)
  },
  Vu = {
    is: zu,
    matches: zu,
    where: zu,
    not(e, t, r, a, u) {
      const n = u(t, bn(r), a);
      return n === ie.falseFunc ? e : n === ie.trueFunc ? ie.falseFunc : s => !n(s) && e(s)
    },
    has(e, t, r, a, u) {
      const {
        adapter: n
      } = r, s = bn(r);
      s.relativeSelector = !0;
      const i = t.some(l => l.some(Yn)) ? [Xc] : void 0,
        o = u(t, s, i);
      if (o === ie.falseFunc) return ie.falseFunc;
      const c = vm(o, n);
      if (i && o !== ie.trueFunc) {
        const {
          shouldTestNextSiblings: l = !1
        } = o;
        return h => {
          if (!e(h)) return !1;
          i[0] = h;
          const f = n.getChildren(h),
            m = l ? [...f, ...Qc(h, n)] : f;
          return n.existsOne(c, m)
        }
      }
      return l => e(l) && n.existsOne(c, n.getChildren(l))
    }
  };

function _m(e, t, r, a, u) {
  var n;
  const {
    name: s,
    data: i
  } = t;
  if (Array.isArray(i)) {
    if (!(s in Vu)) throw new Error(`Unknown pseudo-class :${s}(${i})`);
    return Vu[s](e, i, r, a, u)
  }
  const o = (n = r.pseudos) === null || n === void 0 ? void 0 : n[s],
    c = typeof o == "string" ? o : Tm[s];
  if (typeof c == "string") {
    if (i != null) throw new Error(`Pseudo ${s} doesn't have any arguments`);
    const l = gu(c);
    return Vu.is(e, l, r, a, u)
  }
  if (typeof o == "function") return ns(o, s, i, 1), l => o(l, i) && e(l);
  if (s in pn) return pn[s](e, i, r, a);
  if (s in us) {
    const l = us[s];
    return ns(l, s, i, 2), h => l(h, r, i) && e(h)
  }
  throw new Error(`Unknown pseudo-class :${s}`)
}

function Gu(e, t) {
  const r = t.getParent(e);
  return r && t.isTag(r) ? r : null
}

function ym(e, t, r, a, u) {
  const {
    adapter: n,
    equals: s
  } = r;
  switch (t.type) {
  case te.PseudoElement:
    throw new Error("Pseudo-elements are not supported by css-select");
  case te.ColumnCombinator:
    throw new Error("Column combinators are not yet supported by css-select");
  case te.Attribute: {
    if (t.namespace != null) throw new Error("Namespaced attributes are not yet supported by css-select");
    return (!r.xmlMode || r.lowerCaseAttributeNames) && (t.name = t.name.toLowerCase()), bm[t.action](e, t, r)
  }
  case te.Pseudo:
    return _m(e, t, r, a, u);
  case te.Tag: {
    if (t.namespace != null) throw new Error("Namespaced tag names are not yet supported by css-select");
    let {
      name: i
    } = t;
    return (!r.xmlMode || r.lowerCaseTags) && (i = i.toLowerCase()),
      function (c) {
        return n.getName(c) === i && e(c)
      }
  }
  case te.Descendant: {
    if (r.cacheResults === !1 || typeof WeakSet > "u") return function (c) {
      let l = c;
      for (; l = Gu(l, n);)
        if (e(l)) return !0;
      return !1
    };
    const i = new WeakSet;
    return function (c) {
      let l = c;
      for (; l = Gu(l, n);)
        if (!i.has(l)) {
          if (n.isTag(l) && e(l)) return !0;
          i.add(l)
        } return !1
    }
  }
  case "_flexibleDescendant":
    return function (o) {
      let c = o;
      do
        if (e(c)) return !0; while (c = Gu(c, n));
      return !1
    };
  case te.Parent:
    return function (o) {
      return n.getChildren(o).some(c => n.isTag(c) && e(c))
    };
  case te.Child:
    return function (o) {
      const c = n.getParent(o);
      return c != null && n.isTag(c) && e(c)
    };
  case te.Sibling:
    return function (o) {
      const c = n.getSiblings(o);
      for (let l = 0; l < c.length; l++) {
        const h = c[l];
        if (s(o, h)) break;
        if (n.isTag(h) && e(h)) return !0
      }
      return !1
    };
  case te.Adjacent:
    return n.prevElementSibling ? function (o) {
      const c = n.prevElementSibling(o);
      return c != null && e(c)
    } : function (o) {
      const c = n.getSiblings(o);
      let l;
      for (let h = 0; h < c.length; h++) {
        const f = c[h];
        if (s(o, f)) break;
        n.isTag(f) && (l = f)
      }
      return !!l && e(l)
    };
  case te.Universal: {
    if (t.namespace != null && t.namespace !== "*") throw new Error("Namespaced universal selectors are not yet supported by css-select");
    return e
  }
  }
}

function Jc(e) {
  return e.type === te.Pseudo && (e.name === "scope" || Array.isArray(e.data) && e.data.some(t => t.some(Jc)))
}
const Cm = {
    type: te.Descendant
  },
  Sm = {
    type: "_flexibleDescendant"
  },
  Nm = {
    type: te.Pseudo,
    name: "scope",
    data: null
  };

function wm(e, {
  adapter: t
}, r) {
  const a = !!(r != null && r.every(u => {
    const n = t.isTag(u) && t.getParent(u);
    return u === Xc || n && t.isTag(n)
  }));
  for (const u of e) {
    if (!(u.length > 0 && Yn(u[0]) && u[0].type !== te.Descendant))
      if (a && !u.some(Jc)) u.unshift(Cm);
      else continue;
    u.unshift(Nm)
  }
}

function Zc(e, t, r) {
  var a;
  e.forEach(hm), r = (a = t.context) !== null && a !== void 0 ? a : r;
  const u = Array.isArray(r),
    n = r && (Array.isArray(r) ? r : [r]);
  if (t.relativeSelector !== !1) wm(e, t, n);
  else if (e.some(o => o.length > 0 && Yn(o[0]))) throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  let s = !1;
  const i = e.map(o => {
    if (o.length >= 2) {
      const [c, l] = o;
      c.type !== te.Pseudo || c.name !== "scope" || (u && l.type === te.Descendant ? o[1] = Sm : (l.type === te.Adjacent || l.type === te.Sibling) && (s = !0))
    }
    return Im(o, t, n)
  }).reduce(Dm, ie.falseFunc);
  return i.shouldTestNextSiblings = s, i
}

function Im(e, t, r) {
  var a;
  return e.reduce((u, n) => u === ie.falseFunc ? ie.falseFunc : ym(u, n, t, r, Zc), (a = t.rootFunc) !== null && a !== void 0 ? a : ie.trueFunc)
}

function Dm(e, t) {
  return t === ie.falseFunc || e === ie.trueFunc ? e : e === ie.falseFunc || t === ie.trueFunc ? t : function (a) {
    return e(a) || t(a)
  }
}
const ed = (e, t) => e === t,
  Om = {
    adapter: Eu,
    equals: ed
  };

function Lm(e) {
  var t, r, a, u;
  const n = e ?? Om;
  return (t = n.adapter) !== null && t !== void 0 || (n.adapter = Eu), (r = n.equals) !== null && r !== void 0 || (n.equals = (u = (a = n.adapter) === null || a === void 0 ? void 0 : a.equals) !== null && u !== void 0 ? u : ed), n
}

function Rm(e) {
  return function (r, a, u) {
    const n = Lm(a);
    return e(r, n, u)
  }
}
const zn = Rm(Zc);

function td(e, t, r = !1) {
  return r && (e = km(e, t)), Array.isArray(e) ? t.removeSubsets(e) : t.getChildren(e)
}

function km(e, t) {
  const r = Array.isArray(e) ? e.slice(0) : [e],
    a = r.length;
  for (let u = 0; u < a; u++) {
    const n = Qc(r[u], t);
    r.push(...n)
  }
  return r
}
const Bm = new Set(["first", "last", "eq", "gt", "nth", "lt", "even", "odd"]);

function eu(e) {
  return e.type !== "pseudo" ? !1 : Bm.has(e.name) ? !0 : e.name === "not" && Array.isArray(e.data) ? e.data.some(t => t.some(eu)) : !1
}

function Fm(e, t, r) {
  const a = t != null ? parseInt(t, 10) : NaN;
  switch (e) {
  case "first":
    return 1;
  case "nth":
  case "eq":
    return isFinite(a) ? a >= 0 ? a + 1 : 1 / 0 : 0;
  case "lt":
    return isFinite(a) ? a >= 0 ? Math.min(a, r) : 1 / 0 : 0;
  case "gt":
    return isFinite(a) ? 1 / 0 : 0;
  case "odd":
    return 2 * r;
  case "even":
    return 2 * r - 1;
  case "last":
  case "not":
    return 1 / 0
  }
}

function Pm(e) {
  for (; e.parent;) e = e.parent;
  return e
}

function Vn(e) {
  const t = [],
    r = [];
  for (const a of e) a.some(eu) ? t.push(a) : r.push(a);
  return [r, t]
}
const Mm = {
    type: te.Universal,
    namespace: null
  },
  Um = {
    type: te.Pseudo,
    name: "scope",
    data: null
  };

function rd(e, t, r = {}) {
  return ad([e], t, r)
}

function ad(e, t, r = {}) {
  if (typeof t == "function") return e.some(t);
  const [a, u] = Vn(gu(t));
  return a.length > 0 && e.some(zn(a, r)) || u.some(n => sd(n, e, r).length > 0)
}

function Hm(e, t, r, a) {
  const u = typeof r == "string" ? parseInt(r, 10) : NaN;
  switch (e) {
  case "first":
  case "lt":
    return t;
  case "last":
    return t.length > 0 ? [t[t.length - 1]] : t;
  case "nth":
  case "eq":
    return isFinite(u) && Math.abs(u) < t.length ? [u < 0 ? t[t.length + u] : t[u]] : [];
  case "gt":
    return isFinite(u) ? t.slice(u + 1) : [];
  case "even":
    return t.filter((n, s) => s % 2 === 0);
  case "odd":
    return t.filter((n, s) => s % 2 === 1);
  case "not": {
    const n = new Set(nd(r, t, a));
    return t.filter(s => !n.has(s))
  }
  }
}

function ud(e, t, r = {}) {
  return nd(gu(e), t, r)
}

function nd(e, t, r) {
  if (t.length === 0) return [];
  const [a, u] = Vn(e);
  let n;
  if (a.length) {
    const s = En(t, a, r);
    if (u.length === 0) return s;
    s.length && (n = new Set(s))
  }
  for (let s = 0; s < u.length && (n == null ? void 0 : n.size) !== t.length; s++) {
    const i = u[s];
    if ((n ? t.filter(l => ae(l) && !n.has(l)) : t).length === 0) break;
    const c = sd(i, t, r);
    if (c.length)
      if (n) c.forEach(l => n.add(l));
      else {
        if (s === u.length - 1) return c;
        n = new Set(c)
      }
  }
  return typeof n < "u" ? n.size === t.length ? t : t.filter(s => n.has(s)) : []
}

function sd(e, t, r) {
  var a;
  if (e.some(_r)) {
    const u = (a = r.root) !== null && a !== void 0 ? a : Pm(t[0]),
      n = {
        ...r,
        context: t,
        relativeSelector: !1
      };
    return e.push(Um), tu(u, e, n, !0, t.length)
  }
  return tu(t, e, r, !1, t.length)
}

function $m(e, t, r = {}, a = 1 / 0) {
  if (typeof e == "function") return id(t, e);
  const [u, n] = Vn(gu(e)), s = n.map(i => tu(t, i, r, !0, a));
  return u.length && s.push(xn(t, u, r, a)), s.length === 0 ? [] : s.length === 1 ? s[0] : nr(s.reduce((i, o) => [...i, ...o]))
}

function tu(e, t, r, a, u) {
  const n = t.findIndex(eu),
    s = t.slice(0, n),
    i = t[n],
    o = t.length - 1 === n ? u : 1 / 0,
    c = Fm(i.name, i.data, o);
  if (c === 0) return [];
  const h = (s.length === 0 && !Array.isArray(e) ? xu(e).filter(ae) : s.length === 0 ? (Array.isArray(e) ? e : [e]).filter(ae) : a || s.some(_r) ? xn(e, [s], r, c) : En(e, [s], r)).slice(0, c);
  let f = Hm(i.name, h, i.data, r);
  if (f.length === 0 || t.length === n + 1) return f;
  const m = t.slice(n + 1),
    p = m.some(_r);
  if (p) {
    if (_r(m[0])) {
      const {
        type: b
      } = m[0];
      (b === te.Sibling || b === te.Adjacent) && (f = td(f, Eu, !0)), m.unshift(Mm)
    }
    r = {
      ...r,
      relativeSelector: !1,
      rootFunc: b => f.includes(b)
    }
  } else r.rootFunc && r.rootFunc !== Za.trueFunc && (r = {
    ...r,
    rootFunc: Za.trueFunc
  });
  return m.some(eu) ? tu(f, m, r, !1, u) : p ? xn(f, [m], r, u) : En(f, [m], r)
}

function xn(e, t, r, a) {
  const u = zn(t, r, e);
  return id(e, u, a)
}

function id(e, t, r = 1 / 0) {
  const a = td(e, Eu, t.shouldTestNextSiblings);
  return Hn(u => ae(u) && t(u), a, !0, r)
}

function En(e, t, r) {
  const a = (Array.isArray(e) ? e : [e]).filter(ae);
  if (a.length === 0) return a;
  const u = zn(t, r);
  return u === Za.trueFunc ? a : a.filter(u)
}
const qm = /^\s*[~+]/;

function Wm(e) {
  var t;
  if (!e) return this._make([]);
  const r = this.toArray();
  if (typeof e != "string") {
    const n = at(e) ? e.toArray() : [e];
    return this._make(n.filter(s => r.some(i => qc(i, s))))
  }
  const a = qm.test(e) ? r : this.children().toArray(),
    u = {
      context: r,
      root: (t = this._root) === null || t === void 0 ? void 0 : t[0],
      xmlMode: this.options.xmlMode,
      lowerCaseTags: this.options.lowerCaseTags,
      lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
      pseudos: this.options.pseudos,
      quirksMode: this.options.quirksMode
    };
  return this._make($m(e, a, u))
}

function Gn(e) {
  return function (t, ...r) {
    return function (a) {
      var u;
      let n = e(t, this);
      return a && (n = Xn(n, a, this.options.xmlMode, (u = this._root) === null || u === void 0 ? void 0 : u[0])), this._make(this.length > 1 && n.length > 1 ? r.reduce((s, i) => i(s), n) : n)
    }
  }
}
const Mr = Gn((e, t) => {
    const r = [];
    for (let a = 0; a < t.length; a++) {
      const u = e(t[a]);
      r.push(u)
    }
    return new Array().concat(...r)
  }),
  jn = Gn((e, t) => {
    const r = [];
    for (let a = 0; a < t.length; a++) {
      const u = e(t[a]);
      u !== null && r.push(u)
    }
    return r
  });

function Kn(e, ...t) {
  let r = null;
  const a = Gn((u, n) => {
    const s = [];
    return xe(n, i => {
      for (let o;
        (o = u(i)) && !(r != null && r(o, s.length)); i = o) s.push(o)
    }), s
  })(e, ...t);
  return function (u, n) {
    r = typeof u == "string" ? i => rd(i, u, this.options) : u ? Ur(u) : null;
    const s = a.call(this, n);
    return r = null, s
  }
}

function sr(e) {
  return Array.from(new Set(e))
}
const Ym = jn(({
    parent: e
  }) => e && !Ft(e) ? e : null, sr),
  zm = Mr(e => {
    const t = [];
    for (; e.parent && !Ft(e.parent);) t.push(e.parent), e = e.parent;
    return t
  }, nr, e => e.reverse()),
  Vm = Kn(({
    parent: e
  }) => e && !Ft(e) ? e : null, nr, e => e.reverse());

function Gm(e) {
  var t;
  const r = [];
  if (!e) return this._make(r);
  const a = {
      xmlMode: this.options.xmlMode,
      root: (t = this._root) === null || t === void 0 ? void 0 : t[0]
    },
    u = typeof e == "string" ? n => rd(n, e, a) : Ur(e);
  return xe(this, n => {
    for (; n && ae(n);) {
      if (u(n, 0)) {
        r.includes(n) || r.push(n);
        break
      }
      n = n.parent
    }
  }), this._make(r)
}
const jm = jn(e => Mn(e)),
  Km = Mr(e => {
    const t = [];
    for (; e.next;) e = e.next, ae(e) && t.push(e);
    return t
  }, sr),
  Xm = Kn(e => Mn(e), sr),
  Qm = jn(e => Un(e)),
  Jm = Mr(e => {
    const t = [];
    for (; e.prev;) e = e.prev, ae(e) && t.push(e);
    return t
  }, sr),
  Zm = Kn(e => Un(e), sr),
  e2 = Mr(e => Fc(e).filter(t => ae(t) && t !== e), nr),
  t2 = Mr(e => xu(e).filter(ae), sr);

function r2() {
  const e = this.toArray().reduce((t, r) => ge(r) ? t.concat(r.children) : t, []);
  return this._make(e)
}

function a2(e) {
  let t = 0;
  const r = this.length;
  for (; t < r && e.call(this[t], t, this[t]) !== !1;) ++t;
  return this
}

function u2(e) {
  let t = [];
  for (let r = 0; r < this.length; r++) {
    const a = this[r],
      u = e.call(a, r, a);
    u != null && (t = t.concat(u))
  }
  return this._make(t)
}

function Ur(e) {
  return typeof e == "function" ? (t, r) => e.call(t, r, t) : at(e) ? t => Array.prototype.includes.call(e, t) : function (t) {
    return e === t
  }
}

function n2(e) {
  var t;
  return this._make(Xn(this.toArray(), e, this.options.xmlMode, (t = this._root) === null || t === void 0 ? void 0 : t[0]))
}

function Xn(e, t, r, a) {
  return typeof t == "string" ? ud(t, e, {
    xmlMode: r,
    root: a
  }) : e.filter(Ur(t))
}

function s2(e) {
  const t = this.toArray();
  return typeof e == "string" ? ad(t.filter(ae), e, this.options) : e ? t.some(Ur(e)) : !1
}

function i2(e) {
  let t = this.toArray();
  if (typeof e == "string") {
    const r = new Set(ud(e, t, this.options));
    t = t.filter(a => !r.has(a))
  } else {
    const r = Ur(e);
    t = t.filter((a, u) => !r(a, u))
  }
  return this._make(t)
}

function o2(e) {
  return this.filter(typeof e == "string" ? `:has(${e})` : (t, r) => this._make(r).find(e).length > 0)
}

function c2() {
  return this.length > 1 ? this._make(this[0]) : this
}

function d2() {
  return this.length > 0 ? this._make(this[this.length - 1]) : this
}

function l2(e) {
  var t;
  return e = +e, e === 0 && this.length <= 1 ? this : (e < 0 && (e = this.length + e), this._make((t = this[e]) !== null && t !== void 0 ? t : []))
}

function f2(e) {
  return e == null ? this.toArray() : this[e < 0 ? this.length + e : e]
}

function h2() {
  return Array.prototype.slice.call(this)
}

function m2(e) {
  let t, r;
  return e == null ? (t = this.parent().children(), r = this[0]) : typeof e == "string" ? (t = this._make(e), r = this[0]) : (t = this, r = at(e) ? e[0] : e), Array.prototype.indexOf.call(t, r)
}

function p2(e, t) {
  return this._make(Array.prototype.slice.call(this, e, t))
}

function b2() {
  var e;
  return (e = this.prevObject) !== null && e !== void 0 ? e : this._make([])
}

function x2(e, t) {
  const r = this._make(e, t),
    a = nr([...this.get(), ...r.get()]);
  return this._make(a)
}

function E2(e) {
  return this.prevObject ? this.add(e ? this.prevObject.filter(e) : this.prevObject) : this
}
const g2 = Object.freeze(Object.defineProperty({
  __proto__: null,
  add: x2,
  addBack: E2,
  children: t2,
  closest: Gm,
  contents: r2,
  each: a2,
  end: b2,
  eq: l2,
  filter: n2,
  filterArray: Xn,
  find: Wm,
  first: c2,
  get: f2,
  has: o2,
  index: m2,
  is: s2,
  last: d2,
  map: u2,
  next: jm,
  nextAll: Km,
  nextUntil: Xm,
  not: i2,
  parent: Ym,
  parents: zm,
  parentsUntil: Vm,
  prev: Qm,
  prevAll: Jm,
  prevUntil: Zm,
  siblings: e2,
  slice: p2,
  toArray: h2
}, Symbol.toStringTag, {
  value: "Module"
}));

function A2(e) {
  return function (r, a, u, n) {
    if (typeof Buffer < "u" && Buffer.isBuffer(r) && (r = r.toString()), typeof r == "string") return e(r, a, u, n);
    const s = r;
    if (!Array.isArray(s) && Ft(s)) return s;
    const i = new kt([]);
    return Bt(s, i), i
  }
}

function Bt(e, t) {
  const r = Array.isArray(e) ? e : [e];
  t ? t.children = r : t = null;
  for (let a = 0; a < r.length; a++) {
    const u = r[a];
    u.parent && u.parent.children !== r && Pt(u), t ? (u.prev = r[a - 1] || null, u.next = r[a + 1] || null) : u.prev = u.next = null, u.parent = t
  }
  return t
}

function T2(e, t) {
  return e == null ? [] : at(e) ? t ? hn(e.get()) : e.get() : Array.isArray(e) ? e.reduce((r, a) => r.concat(this._makeDomArray(a, t)), []) : typeof e == "string" ? this._parse(e, this.options, !1, null).children : t ? hn([e]) : [e]
}

function od(e) {
  return function (...t) {
    const r = this.length - 1;
    return xe(this, (a, u) => {
      if (!ge(a)) return;
      const n = typeof t[0] == "function" ? t[0].call(a, u, this._render(a.children)) : t,
        s = this._makeDomArray(n, u < r);
      e(s, a.children, a)
    })
  }
}

function yt(e, t, r, a, u) {
  var n, s;
  const i = [t, r, ...a],
    o = t === 0 ? null : e[t - 1],
    c = t + r >= e.length ? null : e[t + r];
  for (let l = 0; l < a.length; ++l) {
    const h = a[l],
      f = h.parent;
    if (f) {
      const p = f.children.indexOf(h);
      p > -1 && (f.children.splice(p, 1), u === f && t > p && i[0]--)
    }
    h.parent = u, h.prev && (h.prev.next = (n = h.next) !== null && n !== void 0 ? n : null), h.next && (h.next.prev = (s = h.prev) !== null && s !== void 0 ? s : null), h.prev = l === 0 ? o : a[l - 1], h.next = l === a.length - 1 ? c : a[l + 1]
  }
  return o && (o.next = a[0]), c && (c.prev = a[a.length - 1]), e.splice(...i)
}

function v2(e) {
  return (at(e) ? e : this._make(e)).append(this), this
}

function _2(e) {
  return (at(e) ? e : this._make(e)).prepend(this), this
}
const y2 = od((e, t, r) => {
    yt(t, t.length, 0, e, r)
  }),
  C2 = od((e, t, r) => {
    yt(t, 0, 0, e, r)
  });

function cd(e) {
  return function (t) {
    const r = this.length - 1,
      a = this.parents().last();
    for (let u = 0; u < this.length; u++) {
      const n = this[u],
        s = typeof t == "function" ? t.call(n, u, n) : typeof t == "string" && !mn(t) ? a.find(t).clone() : t,
        [i] = this._makeDomArray(s, u < r);
      if (!i || !ge(i)) continue;
      let o = i,
        c = 0;
      for (; c < o.children.length;) {
        const l = o.children[c];
        ae(l) ? (o = l, c = 0) : c++
      }
      e(n, o, [i])
    }
    return this
  }
}
const S2 = cd((e, t, r) => {
    const {
      parent: a
    } = e;
    if (!a) return;
    const u = a.children,
      n = u.indexOf(e);
    Bt([e], t), yt(u, n, 0, r, a)
  }),
  N2 = cd((e, t, r) => {
    ge(e) && (Bt(e.children, t), Bt(r, e))
  });

function w2(e) {
  return this.parent(e).not("body").each((t, r) => {
    this._make(r).replaceWith(r.children)
  }), this
}

function I2(e) {
  const t = this[0];
  if (t) {
    const r = this._make(typeof e == "function" ? e.call(t, 0, t) : e).insertBefore(t);
    let a;
    for (let n = 0; n < r.length; n++) r[n].type === "tag" && (a = r[n]);
    let u = 0;
    for (; a && u < a.children.length;) {
      const n = a.children[u];
      n.type === "tag" ? (a = n, u = 0) : u++
    }
    a && this._make(a).append(this)
  }
  return this
}

function D2(...e) {
  const t = this.length - 1;
  return xe(this, (r, a) => {
    const {
      parent: u
    } = r;
    if (!ge(r) || !u) return;
    const n = u.children,
      s = n.indexOf(r);
    if (s < 0) return;
    const i = typeof e[0] == "function" ? e[0].call(r, a, this._render(r.children)) : e,
      o = this._makeDomArray(i, a < t);
    yt(n, s + 1, 0, o, u)
  })
}

function O2(e) {
  typeof e == "string" && (e = this._make(e)), this.remove();
  const t = [];
  return this._makeDomArray(e).forEach(r => {
    const a = this.clone().toArray(),
      {
        parent: u
      } = r;
    if (!u) return;
    const n = u.children,
      s = n.indexOf(r);
    s < 0 || (yt(n, s + 1, 0, a, u), t.push(...a))
  }), this._make(t)
}

function L2(...e) {
  const t = this.length - 1;
  return xe(this, (r, a) => {
    const {
      parent: u
    } = r;
    if (!ge(r) || !u) return;
    const n = u.children,
      s = n.indexOf(r);
    if (s < 0) return;
    const i = typeof e[0] == "function" ? e[0].call(r, a, this._render(r.children)) : e,
      o = this._makeDomArray(i, a < t);
    yt(n, s, 0, o, u)
  })
}

function R2(e) {
  const t = this._make(e);
  this.remove();
  const r = [];
  return xe(t, a => {
    const u = this.clone().toArray(),
      {
        parent: n
      } = a;
    if (!n) return;
    const s = n.children,
      i = s.indexOf(a);
    i < 0 || (yt(s, i, 0, u, n), r.push(...u))
  }), this._make(r)
}

function k2(e) {
  const t = e ? this.filter(e) : this;
  return xe(t, r => {
    Pt(r), r.prev = r.next = r.parent = null
  }), this
}

function B2(e) {
  return xe(this, (t, r) => {
    const {
      parent: a
    } = t;
    if (!a) return;
    const u = a.children,
      n = typeof e == "function" ? e.call(t, r, t) : e,
      s = this._makeDomArray(n);
    Bt(s, null);
    const i = u.indexOf(t);
    yt(u, i, 1, s, a), s.includes(t) || (t.parent = t.prev = t.next = null)
  })
}

function F2() {
  return xe(this, e => {
    ge(e) && (e.children.forEach(t => {
      t.next = t.prev = t.parent = null
    }), e.children.length = 0)
  })
}

function P2(e) {
  if (e === void 0) {
    const t = this[0];
    return !t || !ge(t) ? null : this._render(t.children)
  }
  return xe(this, t => {
    if (!ge(t)) return;
    t.children.forEach(a => {
      a.next = a.prev = a.parent = null
    });
    const r = at(e) ? e.toArray() : this._parse(`${e}`, this.options, !1, t).children;
    Bt(r, t)
  })
}

function M2() {
  return this._render(this)
}

function U2(e) {
  return e === void 0 ? Lr(this) : typeof e == "function" ? xe(this, (t, r) => this._make(t).text(e.call(t, r, Lr([t])))) : xe(this, t => {
    if (!ge(t)) return;
    t.children.forEach(a => {
      a.next = a.prev = a.parent = null
    });
    const r = new Or(`${e}`);
    Bt(r, t)
  })
}

function H2() {
  return this._make(hn(this.get()))
}
const $2 = Object.freeze(Object.defineProperty({
  __proto__: null,
  _makeDomArray: T2,
  after: D2,
  append: y2,
  appendTo: v2,
  before: L2,
  clone: H2,
  empty: F2,
  html: P2,
  insertAfter: O2,
  insertBefore: R2,
  prepend: C2,
  prependTo: _2,
  remove: k2,
  replaceWith: B2,
  text: U2,
  toString: M2,
  unwrap: w2,
  wrap: S2,
  wrapAll: I2,
  wrapInner: N2
}, Symbol.toStringTag, {
  value: "Module"
}));

function q2(e, t) {
  if (e != null && t != null || typeof e == "object" && !Array.isArray(e)) return xe(this, (r, a) => {
    ae(r) && dd(r, e, t, a)
  });
  if (this.length !== 0) return ld(this[0], e)
}

function dd(e, t, r, a) {
  if (typeof t == "string") {
    const u = ld(e),
      n = typeof r == "function" ? r.call(e, a, u[t]) : r;
    n === "" ? delete u[t] : n != null && (u[t] = n), e.attribs.style = W2(u)
  } else typeof t == "object" && Object.keys(t).forEach((u, n) => {
    dd(e, u, t[u], n)
  })
}

function ld(e, t) {
  if (!e || !ae(e)) return;
  const r = Y2(e.attribs.style);
  if (typeof t == "string") return r[t];
  if (Array.isArray(t)) {
    const a = {};
    return t.forEach(u => {
      r[u] != null && (a[u] = r[u])
    }), a
  }
  return r
}

function W2(e) {
  return Object.keys(e).reduce((t, r) => `${t}${t?" ":""}${r}: ${e[r]};`, "")
}

function Y2(e) {
  if (e = (e || "").trim(), !e) return {};
  const t = {};
  let r;
  for (const a of e.split(";")) {
    const u = a.indexOf(":");
    if (u < 1 || u === a.length - 1) {
      const n = a.trimEnd();
      n.length > 0 && r !== void 0 && (t[r] += `;${n}`)
    } else r = a.slice(0, u).trim(), t[r] = a.slice(u + 1).trim()
  }
  return t
}
const z2 = Object.freeze(Object.defineProperty({
    __proto__: null,
    css: q2
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  ss = "input,select,textarea,keygen",
  V2 = /%20/g,
  is = /\r?\n/g;

function G2() {
  return this.serializeArray().map(r => `${encodeURIComponent(r.name)}=${encodeURIComponent(r.value)}`).join("&").replace(V2, "+")
}

function j2() {
  return this.map((e, t) => {
    const r = this._make(t);
    return ae(t) && t.name === "form" ? r.find(ss).toArray() : r.filter(ss).toArray()
  }).filter('[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))').map((e, t) => {
    var r;
    const a = this._make(t),
      u = a.attr("name"),
      n = (r = a.val()) !== null && r !== void 0 ? r : "";
    return Array.isArray(n) ? n.map(s => ({
      name: u,
      value: s.replace(is, `\r
`)
    })) : {
      name: u,
      value: n.replace(is, `\r
`)
    }
  }).toArray()
}
const K2 = Object.freeze(Object.defineProperty({
  __proto__: null,
  serialize: G2,
  serializeArray: j2
}, Symbol.toStringTag, {
  value: "Module"
}));
class Hr {
  constructor(t, r, a) {
    if (this.length = 0, this.options = a, this._root = r, t) {
      for (let u = 0; u < t.length; u++) this[u] = t[u];
      this.length = t.length
    }
  }
}
Hr.prototype.cheerio = "[cheerio object]";
Hr.prototype.splice = Array.prototype.splice;
Hr.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Object.assign(Hr.prototype, nm, g2, $2, z2, K2);

function X2(e, t) {
  return function r(a, u, n = !0) {
    if (a == null) throw new Error("cheerio.load() expects a string");
    const s = {
        ...Ln,
        ...cn(u)
      },
      i = e(a, s, n, null);
    class o extends Hr {
      _make(h, f) {
        const m = c(h, f);
        return m.prevObject = this, m
      }
      _parse(h, f, m, p) {
        return e(h, f, m, p)
      }
      _render(h) {
        return t(h, this.options)
      }
    }

    function c(l, h, f = i, m) {
      if (l && at(l)) return l;
      const p = {
          ...s,
          ...cn(m)
        },
        b = typeof f == "string" ? [e(f, p, !1, null)] : "length" in f ? f : [f],
        x = at(b) ? b : new o(b, null, p);
      if (x._root = x, !l) return new o(void 0, x, p);
      const T = typeof l == "string" && mn(l) ? e(l, p, !1, null).children : Q2(l) ? [l] : Array.isArray(l) ? l : void 0,
        E = new o(T, x, p);
      if (T) return E;
      if (typeof l != "string") throw new Error("Unexpected type of selector");
      let A = l;
      const v = h ? typeof h == "string" ? mn(h) ? new o([e(h, p, !1, null)], x, p) : (A = `${h} ${A}`, x) : at(h) ? h : new o(Array.isArray(h) ? h : [h], x, p) : x;
      return v ? v.find(A) : E
    }
    return Object.assign(c, Kh, {
      load: r,
      _root: i,
      _options: s,
      fn: o.prototype,
      prototype: o.prototype
    }), c
  }
}

function Q2(e) {
  return !!e.name || e.type === "root" || e.type === "text" || e.type === "comment"
}
const J2 = new Set([65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111]),
  pe = "�";
var g;
(function (e) {
  e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z"
})(g || (g = {}));
const Le = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};

function fd(e) {
  return e >= 55296 && e <= 57343
}

function Z2(e) {
  return e >= 56320 && e <= 57343
}

function ep(e, t) {
  return (e - 55296) * 1024 + 9216 + t
}

function hd(e) {
  return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159
}

function md(e) {
  return e >= 64976 && e <= 65007 || J2.has(e)
}
var B;
(function (e) {
  e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text"
})(B || (B = {}));
const tp = 65536;
class rp {
  constructor(t) {
    this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = tp, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1
  }
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos)
  }
  get offset() {
    return this.droppedBufferSize + this.pos
  }
  getError(t, r) {
    const {
      line: a,
      col: u,
      offset: n
    } = this, s = u + r, i = n + r;
    return {
      code: t,
      startLine: a,
      endLine: a,
      startCol: s,
      endCol: s,
      startOffset: i,
      endOffset: i
    }
  }
  _err(t) {
    this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(t, 0)))
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos
  }
  _processSurrogate(t) {
    if (this.pos !== this.html.length - 1) {
      const r = this.html.charCodeAt(this.pos + 1);
      if (Z2(r)) return this.pos++, this._addGap(), ep(t, r)
    } else if (!this.lastChunkWritten) return this.endOfChunkHit = !0, g.EOF;
    return this._err(B.surrogateInInputStream), t
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline
  }
  dropParsedChunk() {
    this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0)
  }
  write(t, r) {
    this.html.length > 0 ? this.html += t : this.html = t, this.endOfChunkHit = !1, this.lastChunkWritten = r
  }
  insertHtmlAtCurrentPos(t) {
    this.html = this.html.substring(0, this.pos + 1) + t + this.html.substring(this.pos + 1), this.endOfChunkHit = !1
  }
  startsWith(t, r) {
    if (this.pos + t.length > this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, !1;
    if (r) return this.html.startsWith(t, this.pos);
    for (let a = 0; a < t.length; a++)
      if ((this.html.charCodeAt(this.pos + a) | 32) !== t.charCodeAt(a)) return !1;
    return !0
  }
  peek(t) {
    const r = this.pos + t;
    if (r >= this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, g.EOF;
    const a = this.html.charCodeAt(r);
    return a === g.CARRIAGE_RETURN ? g.LINE_FEED : a
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, g.EOF;
    let t = this.html.charCodeAt(this.pos);
    return t === g.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, g.LINE_FEED) : t === g.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, fd(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === g.LINE_FEED || t === g.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t)
  }
  _checkForProblematicCharacters(t) {
    hd(t) ? this._err(B.controlCharacterInInputStream) : md(t) && this._err(B.noncharacterInInputStream)
  }
  retreat(t) {
    for (this.pos -= t; this.pos < this.lastGapPos;) this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1
  }
}
var le;
(function (e) {
  e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION"
})(le || (le = {}));

function pd(e, t) {
  for (let r = e.attrs.length - 1; r >= 0; r--)
    if (e.attrs[r].name === t) return e.attrs[r].value;
  return null
}
const ap = new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e => e.charCodeAt(0))),
  up = new Map([
    [0, 65533],
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);

function np(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = up.get(e)) !== null && t !== void 0 ? t : e
}
var Ce;
(function (e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z"
})(Ce || (Ce = {}));
const sp = 32;
var Tt;
(function (e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE"
})(Tt || (Tt = {}));

function gn(e) {
  return e >= Ce.ZERO && e <= Ce.NINE
}

function ip(e) {
  return e >= Ce.UPPER_A && e <= Ce.UPPER_F || e >= Ce.LOWER_A && e <= Ce.LOWER_F
}

function op(e) {
  return e >= Ce.UPPER_A && e <= Ce.UPPER_Z || e >= Ce.LOWER_A && e <= Ce.LOWER_Z || gn(e)
}

function cp(e) {
  return e === Ce.EQUALS || op(e)
}
var _e;
(function (e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity"
})(_e || (_e = {}));
var dt;
(function (e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute"
})(dt || (dt = {}));
class dp {
  constructor(t, r, a) {
    this.decodeTree = t, this.emitCodePoint = r, this.errors = a, this.state = _e.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = dt.Strict
  }
  startEntity(t) {
    this.decodeMode = t, this.state = _e.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1
  }
  write(t, r) {
    switch (this.state) {
    case _e.EntityStart:
      return t.charCodeAt(r) === Ce.NUM ? (this.state = _e.NumericStart, this.consumed += 1, this.stateNumericStart(t, r + 1)) : (this.state = _e.NamedEntity, this.stateNamedEntity(t, r));
    case _e.NumericStart:
      return this.stateNumericStart(t, r);
    case _e.NumericDecimal:
      return this.stateNumericDecimal(t, r);
    case _e.NumericHex:
      return this.stateNumericHex(t, r);
    case _e.NamedEntity:
      return this.stateNamedEntity(t, r)
    }
  }
  stateNumericStart(t, r) {
    return r >= t.length ? -1 : (t.charCodeAt(r) | sp) === Ce.LOWER_X ? (this.state = _e.NumericHex, this.consumed += 1, this.stateNumericHex(t, r + 1)) : (this.state = _e.NumericDecimal, this.stateNumericDecimal(t, r))
  }
  addToNumericResult(t, r, a, u) {
    if (r !== a) {
      const n = a - r;
      this.result = this.result * Math.pow(u, n) + Number.parseInt(t.substr(r, n), u), this.consumed += n
    }
  }
  stateNumericHex(t, r) {
    const a = r;
    for (; r < t.length;) {
      const u = t.charCodeAt(r);
      if (gn(u) || ip(u)) r += 1;
      else return this.addToNumericResult(t, a, r, 16), this.emitNumericEntity(u, 3)
    }
    return this.addToNumericResult(t, a, r, 16), -1
  }
  stateNumericDecimal(t, r) {
    const a = r;
    for (; r < t.length;) {
      const u = t.charCodeAt(r);
      if (gn(u)) r += 1;
      else return this.addToNumericResult(t, a, r, 10), this.emitNumericEntity(u, 2)
    }
    return this.addToNumericResult(t, a, r, 10), -1
  }
  emitNumericEntity(t, r) {
    var a;
    if (this.consumed <= r) return (a = this.errors) === null || a === void 0 || a.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === Ce.SEMI) this.consumed += 1;
    else if (this.decodeMode === dt.Strict) return 0;
    return this.emitCodePoint(np(this.result), this.consumed), this.errors && (t !== Ce.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed
  }
  stateNamedEntity(t, r) {
    const {
      decodeTree: a
    } = this;
    let u = a[this.treeIndex],
      n = (u & Tt.VALUE_LENGTH) >> 14;
    for (; r < t.length; r++, this.excess++) {
      const s = t.charCodeAt(r);
      if (this.treeIndex = lp(a, u, this.treeIndex + Math.max(1, n), s), this.treeIndex < 0) return this.result === 0 || this.decodeMode === dt.Attribute && (n === 0 || cp(s)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (u = a[this.treeIndex], n = (u & Tt.VALUE_LENGTH) >> 14, n !== 0) {
        if (s === Ce.SEMI) return this.emitNamedEntityData(this.treeIndex, n, this.consumed + this.excess);
        this.decodeMode !== dt.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0)
      }
    }
    return -1
  }
  emitNotTerminatedNamedEntity() {
    var t;
    const {
      result: r,
      decodeTree: a
    } = this, u = (a[r] & Tt.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(r, u, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed
  }
  emitNamedEntityData(t, r, a) {
    const {
      decodeTree: u
    } = this;
    return this.emitCodePoint(r === 1 ? u[t] & ~Tt.VALUE_LENGTH : u[t + 1], a), r === 3 && this.emitCodePoint(u[t + 2], a), a
  }
  end() {
    var t;
    switch (this.state) {
    case _e.NamedEntity:
      return this.result !== 0 && (this.decodeMode !== dt.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
    case _e.NumericDecimal:
      return this.emitNumericEntity(0, 2);
    case _e.NumericHex:
      return this.emitNumericEntity(0, 3);
    case _e.NumericStart:
      return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    case _e.EntityStart:
      return 0
    }
  }
}

function lp(e, t, r, a) {
  const u = (t & Tt.BRANCH_LENGTH) >> 7,
    n = t & Tt.JUMP_TABLE;
  if (u === 0) return n !== 0 && a === n ? r : -1;
  if (n) {
    const o = a - n;
    return o < 0 || o >= u ? -1 : e[r + o] - 1
  }
  let s = r,
    i = s + u - 1;
  for (; s <= i;) {
    const o = s + i >>> 1,
      c = e[o];
    if (c < a) s = o + 1;
    else if (c > a) i = o - 1;
    else return e[o + u]
  }
  return -1
}
var Y;
(function (e) {
  e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/"
})(Y || (Y = {}));
var Lt;
(function (e) {
  e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size"
})(Lt || (Lt = {}));
var Ue;
(function (e) {
  e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks"
})(Ue || (Ue = {}));
var O;
(function (e) {
  e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SEARCH = "search", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp"
})(O || (O = {}));
var d;
(function (e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SEARCH = 94] = "SEARCH", e[e.SECTION = 95] = "SECTION", e[e.SELECT = 96] = "SELECT", e[e.SOURCE = 97] = "SOURCE", e[e.SMALL = 98] = "SMALL", e[e.SPAN = 99] = "SPAN", e[e.STRIKE = 100] = "STRIKE", e[e.STRONG = 101] = "STRONG", e[e.STYLE = 102] = "STYLE", e[e.SUB = 103] = "SUB", e[e.SUMMARY = 104] = "SUMMARY", e[e.SUP = 105] = "SUP", e[e.TABLE = 106] = "TABLE", e[e.TBODY = 107] = "TBODY", e[e.TEMPLATE = 108] = "TEMPLATE", e[e.TEXTAREA = 109] = "TEXTAREA", e[e.TFOOT = 110] = "TFOOT", e[e.TD = 111] = "TD", e[e.TH = 112] = "TH", e[e.THEAD = 113] = "THEAD", e[e.TITLE = 114] = "TITLE", e[e.TR = 115] = "TR", e[e.TRACK = 116] = "TRACK", e[e.TT = 117] = "TT", e[e.U = 118] = "U", e[e.UL = 119] = "UL", e[e.SVG = 120] = "SVG", e[e.VAR = 121] = "VAR", e[e.WBR = 122] = "WBR", e[e.XMP = 123] = "XMP"
})(d || (d = {}));
const fp = new Map([
  [O.A, d.A],
  [O.ADDRESS, d.ADDRESS],
  [O.ANNOTATION_XML, d.ANNOTATION_XML],
  [O.APPLET, d.APPLET],
  [O.AREA, d.AREA],
  [O.ARTICLE, d.ARTICLE],
  [O.ASIDE, d.ASIDE],
  [O.B, d.B],
  [O.BASE, d.BASE],
  [O.BASEFONT, d.BASEFONT],
  [O.BGSOUND, d.BGSOUND],
  [O.BIG, d.BIG],
  [O.BLOCKQUOTE, d.BLOCKQUOTE],
  [O.BODY, d.BODY],
  [O.BR, d.BR],
  [O.BUTTON, d.BUTTON],
  [O.CAPTION, d.CAPTION],
  [O.CENTER, d.CENTER],
  [O.CODE, d.CODE],
  [O.COL, d.COL],
  [O.COLGROUP, d.COLGROUP],
  [O.DD, d.DD],
  [O.DESC, d.DESC],
  [O.DETAILS, d.DETAILS],
  [O.DIALOG, d.DIALOG],
  [O.DIR, d.DIR],
  [O.DIV, d.DIV],
  [O.DL, d.DL],
  [O.DT, d.DT],
  [O.EM, d.EM],
  [O.EMBED, d.EMBED],
  [O.FIELDSET, d.FIELDSET],
  [O.FIGCAPTION, d.FIGCAPTION],
  [O.FIGURE, d.FIGURE],
  [O.FONT, d.FONT],
  [O.FOOTER, d.FOOTER],
  [O.FOREIGN_OBJECT, d.FOREIGN_OBJECT],
  [O.FORM, d.FORM],
  [O.FRAME, d.FRAME],
  [O.FRAMESET, d.FRAMESET],
  [O.H1, d.H1],
  [O.H2, d.H2],
  [O.H3, d.H3],
  [O.H4, d.H4],
  [O.H5, d.H5],
  [O.H6, d.H6],
  [O.HEAD, d.HEAD],
  [O.HEADER, d.HEADER],
  [O.HGROUP, d.HGROUP],
  [O.HR, d.HR],
  [O.HTML, d.HTML],
  [O.I, d.I],
  [O.IMG, d.IMG],
  [O.IMAGE, d.IMAGE],
  [O.INPUT, d.INPUT],
  [O.IFRAME, d.IFRAME],
  [O.KEYGEN, d.KEYGEN],
  [O.LABEL, d.LABEL],
  [O.LI, d.LI],
  [O.LINK, d.LINK],
  [O.LISTING, d.LISTING],
  [O.MAIN, d.MAIN],
  [O.MALIGNMARK, d.MALIGNMARK],
  [O.MARQUEE, d.MARQUEE],
  [O.MATH, d.MATH],
  [O.MENU, d.MENU],
  [O.META, d.META],
  [O.MGLYPH, d.MGLYPH],
  [O.MI, d.MI],
  [O.MO, d.MO],
  [O.MN, d.MN],
  [O.MS, d.MS],
  [O.MTEXT, d.MTEXT],
  [O.NAV, d.NAV],
  [O.NOBR, d.NOBR],
  [O.NOFRAMES, d.NOFRAMES],
  [O.NOEMBED, d.NOEMBED],
  [O.NOSCRIPT, d.NOSCRIPT],
  [O.OBJECT, d.OBJECT],
  [O.OL, d.OL],
  [O.OPTGROUP, d.OPTGROUP],
  [O.OPTION, d.OPTION],
  [O.P, d.P],
  [O.PARAM, d.PARAM],
  [O.PLAINTEXT, d.PLAINTEXT],
  [O.PRE, d.PRE],
  [O.RB, d.RB],
  [O.RP, d.RP],
  [O.RT, d.RT],
  [O.RTC, d.RTC],
  [O.RUBY, d.RUBY],
  [O.S, d.S],
  [O.SCRIPT, d.SCRIPT],
  [O.SEARCH, d.SEARCH],
  [O.SECTION, d.SECTION],
  [O.SELECT, d.SELECT],
  [O.SOURCE, d.SOURCE],
  [O.SMALL, d.SMALL],
  [O.SPAN, d.SPAN],
  [O.STRIKE, d.STRIKE],
  [O.STRONG, d.STRONG],
  [O.STYLE, d.STYLE],
  [O.SUB, d.SUB],
  [O.SUMMARY, d.SUMMARY],
  [O.SUP, d.SUP],
  [O.TABLE, d.TABLE],
  [O.TBODY, d.TBODY],
  [O.TEMPLATE, d.TEMPLATE],
  [O.TEXTAREA, d.TEXTAREA],
  [O.TFOOT, d.TFOOT],
  [O.TD, d.TD],
  [O.TH, d.TH],
  [O.THEAD, d.THEAD],
  [O.TITLE, d.TITLE],
  [O.TR, d.TR],
  [O.TRACK, d.TRACK],
  [O.TT, d.TT],
  [O.U, d.U],
  [O.UL, d.UL],
  [O.SVG, d.SVG],
  [O.VAR, d.VAR],
  [O.WBR, d.WBR],
  [O.XMP, d.XMP]
]);

function Au(e) {
  var t;
  return (t = fp.get(e)) !== null && t !== void 0 ? t : d.UNKNOWN
}
const z = d,
  hp = {
    [Y.HTML]: new Set([z.ADDRESS, z.APPLET, z.AREA, z.ARTICLE, z.ASIDE, z.BASE, z.BASEFONT, z.BGSOUND, z.BLOCKQUOTE, z.BODY, z.BR, z.BUTTON, z.CAPTION, z.CENTER, z.COL, z.COLGROUP, z.DD, z.DETAILS, z.DIR, z.DIV, z.DL, z.DT, z.EMBED, z.FIELDSET, z.FIGCAPTION, z.FIGURE, z.FOOTER, z.FORM, z.FRAME, z.FRAMESET, z.H1, z.H2, z.H3, z.H4, z.H5, z.H6, z.HEAD, z.HEADER, z.HGROUP, z.HR, z.HTML, z.IFRAME, z.IMG, z.INPUT, z.LI, z.LINK, z.LISTING, z.MAIN, z.MARQUEE, z.MENU, z.META, z.NAV, z.NOEMBED, z.NOFRAMES, z.NOSCRIPT, z.OBJECT, z.OL, z.P, z.PARAM, z.PLAINTEXT, z.PRE, z.SCRIPT, z.SECTION, z.SELECT, z.SOURCE, z.STYLE, z.SUMMARY, z.TABLE, z.TBODY, z.TD, z.TEMPLATE, z.TEXTAREA, z.TFOOT, z.TH, z.THEAD, z.TITLE, z.TR, z.TRACK, z.UL, z.WBR, z.XMP]),
    [Y.MATHML]: new Set([z.MI, z.MO, z.MN, z.MS, z.MTEXT, z.ANNOTATION_XML]),
    [Y.SVG]: new Set([z.TITLE, z.FOREIGN_OBJECT, z.DESC]),
    [Y.XLINK]: new Set,
    [Y.XML]: new Set,
    [Y.XMLNS]: new Set
  },
  An = new Set([z.H1, z.H2, z.H3, z.H4, z.H5, z.H6]),
  mp = new Set([O.STYLE, O.SCRIPT, O.XMP, O.IFRAME, O.NOEMBED, O.NOFRAMES, O.PLAINTEXT]);

function pp(e, t) {
  return mp.has(e) || t && e === O.NOSCRIPT
}
var _;
(function (e) {
  e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 72] = "AMBIGUOUS_AMPERSAND"
})(_ || (_ = {}));
const Be = {
  DATA: _.DATA,
  RCDATA: _.RCDATA,
  RAWTEXT: _.RAWTEXT,
  SCRIPT_DATA: _.SCRIPT_DATA,
  PLAINTEXT: _.PLAINTEXT,
  CDATA_SECTION: _.CDATA_SECTION
};

function bp(e) {
  return e >= g.DIGIT_0 && e <= g.DIGIT_9
}

function Ar(e) {
  return e >= g.LATIN_CAPITAL_A && e <= g.LATIN_CAPITAL_Z
}

function xp(e) {
  return e >= g.LATIN_SMALL_A && e <= g.LATIN_SMALL_Z
}

function Et(e) {
  return xp(e) || Ar(e)
}

function os(e) {
  return Et(e) || bp(e)
}

function Jr(e) {
  return e + 32
}

function bd(e) {
  return e === g.SPACE || e === g.LINE_FEED || e === g.TABULATION || e === g.FORM_FEED
}

function cs(e) {
  return bd(e) || e === g.SOLIDUS || e === g.GREATER_THAN_SIGN
}

function Ep(e) {
  return e === g.NULL ? B.nullCharacterReference : e > 1114111 ? B.characterReferenceOutsideUnicodeRange : fd(e) ? B.surrogateCharacterReference : md(e) ? B.noncharacterCharacterReference : hd(e) || e === g.CARRIAGE_RETURN ? B.controlCharacterReference : null
}
let gp = class {
  constructor(t, r) {
    this.options = t, this.handler = r, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = _.DATA, this.returnState = _.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = {
      name: "",
      value: ""
    }, this.preprocessor = new rp(r), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new dp(ap, (a, u) => {
      this.preprocessor.pos = this.entityStartPos + u - 1, this._flushCodePointConsumedAsCharacterReference(a)
    }, r.onParseError ? {
      missingSemicolonAfterCharacterReference: () => {
        this._err(B.missingSemicolonAfterCharacterReference, 1)
      },
      absenceOfDigitsInNumericCharacterReference: a => {
        this._err(B.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + a)
      },
      validateNumericCharacterReference: a => {
        const u = Ep(a);
        u && this._err(u, 1)
      }
    } : void 0)
  }
  _err(t, r = 0) {
    var a, u;
    (u = (a = this.handler).onParseError) === null || u === void 0 || u.call(a, this.preprocessor.getError(t, r))
  }
  getCurrentLocation(t) {
    return this.options.sourceCodeLocationInfo ? {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - t,
      startOffset: this.preprocessor.offset - t,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    } : null
  }
  _runParsingLoop() {
    if (!this.inLoop) {
      for (this.inLoop = !0; this.active && !this.paused;) {
        this.consumedAfterSnapshot = 0;
        const t = this._consume();
        this._ensureHibernation() || this._callState(t)
      }
      this.inLoop = !1
    }
  }
  pause() {
    this.paused = !0
  }
  resume(t) {
    if (!this.paused) throw new Error("Parser was already resumed");
    this.paused = !1, !this.inLoop && (this._runParsingLoop(), this.paused || t == null || t())
  }
  write(t, r, a) {
    this.active = !0, this.preprocessor.write(t, r), this._runParsingLoop(), this.paused || a == null || a()
  }
  insertHtmlAtCurrentPos(t) {
    this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(t), this._runParsingLoop()
  }
  _ensureHibernation() {
    return this.preprocessor.endOfChunkHit ? (this.preprocessor.retreat(this.consumedAfterSnapshot), this.consumedAfterSnapshot = 0, this.active = !1, !0) : !1
  }
  _consume() {
    return this.consumedAfterSnapshot++, this.preprocessor.advance()
  }
  _advanceBy(t) {
    this.consumedAfterSnapshot += t;
    for (let r = 0; r < t; r++) this.preprocessor.advance()
  }
  _consumeSequenceIfMatch(t, r) {
    return this.preprocessor.startsWith(t, r) ? (this._advanceBy(t.length - 1), !0) : !1
  }
  _createStartTagToken() {
    this.currentToken = {
      type: le.START_TAG,
      tagName: "",
      tagID: d.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1)
    }
  }
  _createEndTagToken() {
    this.currentToken = {
      type: le.END_TAG,
      tagName: "",
      tagID: d.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2)
    }
  }
  _createCommentToken(t) {
    this.currentToken = {
      type: le.COMMENT,
      data: "",
      location: this.getCurrentLocation(t)
    }
  }
  _createDoctypeToken(t) {
    this.currentToken = {
      type: le.DOCTYPE,
      name: t,
      forceQuirks: !1,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    }
  }
  _createCharacterToken(t, r) {
    this.currentCharacterToken = {
      type: t,
      chars: r,
      location: this.currentLocation
    }
  }
  _createAttr(t) {
    this.currentAttr = {
      name: t,
      value: ""
    }, this.currentLocation = this.getCurrentLocation(0)
  }
  _leaveAttrName() {
    var t, r;
    const a = this.currentToken;
    if (pd(a, this.currentAttr.name) === null) {
      if (a.attrs.push(this.currentAttr), a.location && this.currentLocation) {
        const u = (t = (r = a.location).attrs) !== null && t !== void 0 ? t : r.attrs = Object.create(null);
        u[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue()
      }
    } else this._err(B.duplicateAttribute)
  }
  _leaveAttrValue() {
    this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line, this.currentLocation.endCol = this.preprocessor.col, this.currentLocation.endOffset = this.preprocessor.offset)
  }
  prepareToken(t) {
    this._emitCurrentCharacterToken(t.location), this.currentToken = null, t.location && (t.location.endLine = this.preprocessor.line, t.location.endCol = this.preprocessor.col + 1, t.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1)
  }
  emitCurrentTagToken() {
    const t = this.currentToken;
    this.prepareToken(t), t.tagID = Au(t.tagName), t.type === le.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(B.endTagWithAttributes), t.selfClosing && this._err(B.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk()
  }
  emitCurrentComment(t) {
    this.prepareToken(t), this.handler.onComment(t), this.preprocessor.dropParsedChunk()
  }
  emitCurrentDoctype(t) {
    this.prepareToken(t), this.handler.onDoctype(t), this.preprocessor.dropParsedChunk()
  }
  _emitCurrentCharacterToken(t) {
    if (this.currentCharacterToken) {
      switch (t && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = t.startLine, this.currentCharacterToken.location.endCol = t.startCol, this.currentCharacterToken.location.endOffset = t.startOffset), this.currentCharacterToken.type) {
      case le.CHARACTER: {
        this.handler.onCharacter(this.currentCharacterToken);
        break
      }
      case le.NULL_CHARACTER: {
        this.handler.onNullCharacter(this.currentCharacterToken);
        break
      }
      case le.WHITESPACE_CHARACTER: {
        this.handler.onWhitespaceCharacter(this.currentCharacterToken);
        break
      }
      }
      this.currentCharacterToken = null
    }
  }
  _emitEOFToken() {
    const t = this.getCurrentLocation(0);
    t && (t.endLine = t.startLine, t.endCol = t.startCol, t.endOffset = t.startOffset), this._emitCurrentCharacterToken(t), this.handler.onEof({
      type: le.EOF,
      location: t
    }), this.active = !1
  }
  _appendCharToCurrentCharacterToken(t, r) {
    if (this.currentCharacterToken)
      if (this.currentCharacterToken.type === t) {
        this.currentCharacterToken.chars += r;
        return
      } else this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
    this._createCharacterToken(t, r)
  }
  _emitCodePoint(t) {
    const r = bd(t) ? le.WHITESPACE_CHARACTER : t === g.NULL ? le.NULL_CHARACTER : le.CHARACTER;
    this._appendCharToCurrentCharacterToken(r, String.fromCodePoint(t))
  }
  _emitChars(t) {
    this._appendCharToCurrentCharacterToken(le.CHARACTER, t)
  }
  _startCharacterReference() {
    this.returnState = this.state, this.state = _.CHARACTER_REFERENCE, this.entityStartPos = this.preprocessor.pos, this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? dt.Attribute : dt.Legacy)
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === _.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === _.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === _.ATTRIBUTE_VALUE_UNQUOTED
  }
  _flushCodePointConsumedAsCharacterReference(t) {
    this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(t) : this._emitCodePoint(t)
  }
  _callState(t) {
    switch (this.state) {
    case _.DATA: {
      this._stateData(t);
      break
    }
    case _.RCDATA: {
      this._stateRcdata(t);
      break
    }
    case _.RAWTEXT: {
      this._stateRawtext(t);
      break
    }
    case _.SCRIPT_DATA: {
      this._stateScriptData(t);
      break
    }
    case _.PLAINTEXT: {
      this._statePlaintext(t);
      break
    }
    case _.TAG_OPEN: {
      this._stateTagOpen(t);
      break
    }
    case _.END_TAG_OPEN: {
      this._stateEndTagOpen(t);
      break
    }
    case _.TAG_NAME: {
      this._stateTagName(t);
      break
    }
    case _.RCDATA_LESS_THAN_SIGN: {
      this._stateRcdataLessThanSign(t);
      break
    }
    case _.RCDATA_END_TAG_OPEN: {
      this._stateRcdataEndTagOpen(t);
      break
    }
    case _.RCDATA_END_TAG_NAME: {
      this._stateRcdataEndTagName(t);
      break
    }
    case _.RAWTEXT_LESS_THAN_SIGN: {
      this._stateRawtextLessThanSign(t);
      break
    }
    case _.RAWTEXT_END_TAG_OPEN: {
      this._stateRawtextEndTagOpen(t);
      break
    }
    case _.RAWTEXT_END_TAG_NAME: {
      this._stateRawtextEndTagName(t);
      break
    }
    case _.SCRIPT_DATA_LESS_THAN_SIGN: {
      this._stateScriptDataLessThanSign(t);
      break
    }
    case _.SCRIPT_DATA_END_TAG_OPEN: {
      this._stateScriptDataEndTagOpen(t);
      break
    }
    case _.SCRIPT_DATA_END_TAG_NAME: {
      this._stateScriptDataEndTagName(t);
      break
    }
    case _.SCRIPT_DATA_ESCAPE_START: {
      this._stateScriptDataEscapeStart(t);
      break
    }
    case _.SCRIPT_DATA_ESCAPE_START_DASH: {
      this._stateScriptDataEscapeStartDash(t);
      break
    }
    case _.SCRIPT_DATA_ESCAPED: {
      this._stateScriptDataEscaped(t);
      break
    }
    case _.SCRIPT_DATA_ESCAPED_DASH: {
      this._stateScriptDataEscapedDash(t);
      break
    }
    case _.SCRIPT_DATA_ESCAPED_DASH_DASH: {
      this._stateScriptDataEscapedDashDash(t);
      break
    }
    case _.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
      this._stateScriptDataEscapedLessThanSign(t);
      break
    }
    case _.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
      this._stateScriptDataEscapedEndTagOpen(t);
      break
    }
    case _.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
      this._stateScriptDataEscapedEndTagName(t);
      break
    }
    case _.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
      this._stateScriptDataDoubleEscapeStart(t);
      break
    }
    case _.SCRIPT_DATA_DOUBLE_ESCAPED: {
      this._stateScriptDataDoubleEscaped(t);
      break
    }
    case _.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
      this._stateScriptDataDoubleEscapedDash(t);
      break
    }
    case _.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
      this._stateScriptDataDoubleEscapedDashDash(t);
      break
    }
    case _.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
      this._stateScriptDataDoubleEscapedLessThanSign(t);
      break
    }
    case _.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
      this._stateScriptDataDoubleEscapeEnd(t);
      break
    }
    case _.BEFORE_ATTRIBUTE_NAME: {
      this._stateBeforeAttributeName(t);
      break
    }
    case _.ATTRIBUTE_NAME: {
      this._stateAttributeName(t);
      break
    }
    case _.AFTER_ATTRIBUTE_NAME: {
      this._stateAfterAttributeName(t);
      break
    }
    case _.BEFORE_ATTRIBUTE_VALUE: {
      this._stateBeforeAttributeValue(t);
      break
    }
    case _.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
      this._stateAttributeValueDoubleQuoted(t);
      break
    }
    case _.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
      this._stateAttributeValueSingleQuoted(t);
      break
    }
    case _.ATTRIBUTE_VALUE_UNQUOTED: {
      this._stateAttributeValueUnquoted(t);
      break
    }
    case _.AFTER_ATTRIBUTE_VALUE_QUOTED: {
      this._stateAfterAttributeValueQuoted(t);
      break
    }
    case _.SELF_CLOSING_START_TAG: {
      this._stateSelfClosingStartTag(t);
      break
    }
    case _.BOGUS_COMMENT: {
      this._stateBogusComment(t);
      break
    }
    case _.MARKUP_DECLARATION_OPEN: {
      this._stateMarkupDeclarationOpen(t);
      break
    }
    case _.COMMENT_START: {
      this._stateCommentStart(t);
      break
    }
    case _.COMMENT_START_DASH: {
      this._stateCommentStartDash(t);
      break
    }
    case _.COMMENT: {
      this._stateComment(t);
      break
    }
    case _.COMMENT_LESS_THAN_SIGN: {
      this._stateCommentLessThanSign(t);
      break
    }
    case _.COMMENT_LESS_THAN_SIGN_BANG: {
      this._stateCommentLessThanSignBang(t);
      break
    }
    case _.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
      this._stateCommentLessThanSignBangDash(t);
      break
    }
    case _.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
      this._stateCommentLessThanSignBangDashDash(t);
      break
    }
    case _.COMMENT_END_DASH: {
      this._stateCommentEndDash(t);
      break
    }
    case _.COMMENT_END: {
      this._stateCommentEnd(t);
      break
    }
    case _.COMMENT_END_BANG: {
      this._stateCommentEndBang(t);
      break
    }
    case _.DOCTYPE: {
      this._stateDoctype(t);
      break
    }
    case _.BEFORE_DOCTYPE_NAME: {
      this._stateBeforeDoctypeName(t);
      break
    }
    case _.DOCTYPE_NAME: {
      this._stateDoctypeName(t);
      break
    }
    case _.AFTER_DOCTYPE_NAME: {
      this._stateAfterDoctypeName(t);
      break
    }
    case _.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
      this._stateAfterDoctypePublicKeyword(t);
      break
    }
    case _.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
      this._stateBeforeDoctypePublicIdentifier(t);
      break
    }
    case _.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
      this._stateDoctypePublicIdentifierDoubleQuoted(t);
      break
    }
    case _.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
      this._stateDoctypePublicIdentifierSingleQuoted(t);
      break
    }
    case _.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
      this._stateAfterDoctypePublicIdentifier(t);
      break
    }
    case _.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
      this._stateBetweenDoctypePublicAndSystemIdentifiers(t);
      break
    }
    case _.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
      this._stateAfterDoctypeSystemKeyword(t);
      break
    }
    case _.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
      this._stateBeforeDoctypeSystemIdentifier(t);
      break
    }
    case _.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
      this._stateDoctypeSystemIdentifierDoubleQuoted(t);
      break
    }
    case _.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
      this._stateDoctypeSystemIdentifierSingleQuoted(t);
      break
    }
    case _.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
      this._stateAfterDoctypeSystemIdentifier(t);
      break
    }
    case _.BOGUS_DOCTYPE: {
      this._stateBogusDoctype(t);
      break
    }
    case _.CDATA_SECTION: {
      this._stateCdataSection(t);
      break
    }
    case _.CDATA_SECTION_BRACKET: {
      this._stateCdataSectionBracket(t);
      break
    }
    case _.CDATA_SECTION_END: {
      this._stateCdataSectionEnd(t);
      break
    }
    case _.CHARACTER_REFERENCE: {
      this._stateCharacterReference();
      break
    }
    case _.AMBIGUOUS_AMPERSAND: {
      this._stateAmbiguousAmpersand(t);
      break
    }
    default:
      throw new Error("Unknown state")
    }
  }
  _stateData(t) {
    switch (t) {
    case g.LESS_THAN_SIGN: {
      this.state = _.TAG_OPEN;
      break
    }
    case g.AMPERSAND: {
      this._startCharacterReference();
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this._emitCodePoint(t);
      break
    }
    case g.EOF: {
      this._emitEOFToken();
      break
    }
    default:
      this._emitCodePoint(t)
    }
  }
  _stateRcdata(t) {
    switch (t) {
    case g.AMPERSAND: {
      this._startCharacterReference();
      break
    }
    case g.LESS_THAN_SIGN: {
      this.state = _.RCDATA_LESS_THAN_SIGN;
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this._emitChars(pe);
      break
    }
    case g.EOF: {
      this._emitEOFToken();
      break
    }
    default:
      this._emitCodePoint(t)
    }
  }
  _stateRawtext(t) {
    switch (t) {
    case g.LESS_THAN_SIGN: {
      this.state = _.RAWTEXT_LESS_THAN_SIGN;
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this._emitChars(pe);
      break
    }
    case g.EOF: {
      this._emitEOFToken();
      break
    }
    default:
      this._emitCodePoint(t)
    }
  }
  _stateScriptData(t) {
    switch (t) {
    case g.LESS_THAN_SIGN: {
      this.state = _.SCRIPT_DATA_LESS_THAN_SIGN;
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this._emitChars(pe);
      break
    }
    case g.EOF: {
      this._emitEOFToken();
      break
    }
    default:
      this._emitCodePoint(t)
    }
  }
  _statePlaintext(t) {
    switch (t) {
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this._emitChars(pe);
      break
    }
    case g.EOF: {
      this._emitEOFToken();
      break
    }
    default:
      this._emitCodePoint(t)
    }
  }
  _stateTagOpen(t) {
    if (Et(t)) this._createStartTagToken(), this.state = _.TAG_NAME, this._stateTagName(t);
    else switch (t) {
    case g.EXCLAMATION_MARK: {
      this.state = _.MARKUP_DECLARATION_OPEN;
      break
    }
    case g.SOLIDUS: {
      this.state = _.END_TAG_OPEN;
      break
    }
    case g.QUESTION_MARK: {
      this._err(B.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = _.BOGUS_COMMENT, this._stateBogusComment(t);
      break
    }
    case g.EOF: {
      this._err(B.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
      break
    }
    default:
      this._err(B.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = _.DATA, this._stateData(t)
    }
  }
  _stateEndTagOpen(t) {
    if (Et(t)) this._createEndTagToken(), this.state = _.TAG_NAME, this._stateTagName(t);
    else switch (t) {
    case g.GREATER_THAN_SIGN: {
      this._err(B.missingEndTagName), this.state = _.DATA;
      break
    }
    case g.EOF: {
      this._err(B.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
      break
    }
    default:
      this._err(B.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = _.BOGUS_COMMENT, this._stateBogusComment(t)
    }
  }
  _stateTagName(t) {
    const r = this.currentToken;
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED: {
      this.state = _.BEFORE_ATTRIBUTE_NAME;
      break
    }
    case g.SOLIDUS: {
      this.state = _.SELF_CLOSING_START_TAG;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this.state = _.DATA, this.emitCurrentTagToken();
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), r.tagName += pe;
      break
    }
    case g.EOF: {
      this._err(B.eofInTag), this._emitEOFToken();
      break
    }
    default:
      r.tagName += String.fromCodePoint(Ar(t) ? Jr(t) : t)
    }
  }
  _stateRcdataLessThanSign(t) {
    t === g.SOLIDUS ? this.state = _.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = _.RCDATA, this._stateRcdata(t))
  }
  _stateRcdataEndTagOpen(t) {
    Et(t) ? (this.state = _.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(t)) : (this._emitChars("</"), this.state = _.RCDATA, this._stateRcdata(t))
  }
  handleSpecialEndTag(t) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1)) return !this._ensureHibernation();
    this._createEndTagToken();
    const r = this.currentToken;
    switch (r.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED:
      return this._advanceBy(this.lastStartTagName.length), this.state = _.BEFORE_ATTRIBUTE_NAME, !1;
    case g.SOLIDUS:
      return this._advanceBy(this.lastStartTagName.length), this.state = _.SELF_CLOSING_START_TAG, !1;
    case g.GREATER_THAN_SIGN:
      return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = _.DATA, !1;
    default:
      return !this._ensureHibernation()
    }
  }
  _stateRcdataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = _.RCDATA, this._stateRcdata(t))
  }
  _stateRawtextLessThanSign(t) {
    t === g.SOLIDUS ? this.state = _.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = _.RAWTEXT, this._stateRawtext(t))
  }
  _stateRawtextEndTagOpen(t) {
    Et(t) ? (this.state = _.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(t)) : (this._emitChars("</"), this.state = _.RAWTEXT, this._stateRawtext(t))
  }
  _stateRawtextEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = _.RAWTEXT, this._stateRawtext(t))
  }
  _stateScriptDataLessThanSign(t) {
    switch (t) {
    case g.SOLIDUS: {
      this.state = _.SCRIPT_DATA_END_TAG_OPEN;
      break
    }
    case g.EXCLAMATION_MARK: {
      this.state = _.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
      break
    }
    default:
      this._emitChars("<"), this.state = _.SCRIPT_DATA, this._stateScriptData(t)
    }
  }
  _stateScriptDataEndTagOpen(t) {
    Et(t) ? (this.state = _.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(t)) : (this._emitChars("</"), this.state = _.SCRIPT_DATA, this._stateScriptData(t))
  }
  _stateScriptDataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = _.SCRIPT_DATA, this._stateScriptData(t))
  }
  _stateScriptDataEscapeStart(t) {
    t === g.HYPHEN_MINUS ? (this.state = _.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = _.SCRIPT_DATA, this._stateScriptData(t))
  }
  _stateScriptDataEscapeStartDash(t) {
    t === g.HYPHEN_MINUS ? (this.state = _.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = _.SCRIPT_DATA, this._stateScriptData(t))
  }
  _stateScriptDataEscaped(t) {
    switch (t) {
    case g.HYPHEN_MINUS: {
      this.state = _.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
      break
    }
    case g.LESS_THAN_SIGN: {
      this.state = _.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this._emitChars(pe);
      break
    }
    case g.EOF: {
      this._err(B.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
      break
    }
    default:
      this._emitCodePoint(t)
    }
  }
  _stateScriptDataEscapedDash(t) {
    switch (t) {
    case g.HYPHEN_MINUS: {
      this.state = _.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
      break
    }
    case g.LESS_THAN_SIGN: {
      this.state = _.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this.state = _.SCRIPT_DATA_ESCAPED, this._emitChars(pe);
      break
    }
    case g.EOF: {
      this._err(B.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
      break
    }
    default:
      this.state = _.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t)
    }
  }
  _stateScriptDataEscapedDashDash(t) {
    switch (t) {
    case g.HYPHEN_MINUS: {
      this._emitChars("-");
      break
    }
    case g.LESS_THAN_SIGN: {
      this.state = _.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this.state = _.SCRIPT_DATA, this._emitChars(">");
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this.state = _.SCRIPT_DATA_ESCAPED, this._emitChars(pe);
      break
    }
    case g.EOF: {
      this._err(B.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
      break
    }
    default:
      this.state = _.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t)
    }
  }
  _stateScriptDataEscapedLessThanSign(t) {
    t === g.SOLIDUS ? this.state = _.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : Et(t) ? (this._emitChars("<"), this.state = _.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(t)) : (this._emitChars("<"), this.state = _.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t))
  }
  _stateScriptDataEscapedEndTagOpen(t) {
    Et(t) ? (this.state = _.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(t)) : (this._emitChars("</"), this.state = _.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t))
  }
  _stateScriptDataEscapedEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = _.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t))
  }
  _stateScriptDataDoubleEscapeStart(t) {
    if (this.preprocessor.startsWith(Le.SCRIPT, !1) && cs(this.preprocessor.peek(Le.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let r = 0; r < Le.SCRIPT.length; r++) this._emitCodePoint(this._consume());
      this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED
    } else this._ensureHibernation() || (this.state = _.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t))
  }
  _stateScriptDataDoubleEscaped(t) {
    switch (t) {
    case g.HYPHEN_MINUS: {
      this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
      break
    }
    case g.LESS_THAN_SIGN: {
      this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this._emitChars(pe);
      break
    }
    case g.EOF: {
      this._err(B.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
      break
    }
    default:
      this._emitCodePoint(t)
    }
  }
  _stateScriptDataDoubleEscapedDash(t) {
    switch (t) {
    case g.HYPHEN_MINUS: {
      this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
      break
    }
    case g.LESS_THAN_SIGN: {
      this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(pe);
      break
    }
    case g.EOF: {
      this._err(B.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
      break
    }
    default:
      this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t)
    }
  }
  _stateScriptDataDoubleEscapedDashDash(t) {
    switch (t) {
    case g.HYPHEN_MINUS: {
      this._emitChars("-");
      break
    }
    case g.LESS_THAN_SIGN: {
      this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
      break
    }
    case g.GREATER_THAN_SIGN: {
      this.state = _.SCRIPT_DATA, this._emitChars(">");
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(pe);
      break
    }
    case g.EOF: {
      this._err(B.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
      break
    }
    default:
      this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t)
    }
  }
  _stateScriptDataDoubleEscapedLessThanSign(t) {
    t === g.SOLIDUS ? (this.state = _.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t))
  }
  _stateScriptDataDoubleEscapeEnd(t) {
    if (this.preprocessor.startsWith(Le.SCRIPT, !1) && cs(this.preprocessor.peek(Le.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let r = 0; r < Le.SCRIPT.length; r++) this._emitCodePoint(this._consume());
      this.state = _.SCRIPT_DATA_ESCAPED
    } else this._ensureHibernation() || (this.state = _.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t))
  }
  _stateBeforeAttributeName(t) {
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED:
      break;
    case g.SOLIDUS:
    case g.GREATER_THAN_SIGN:
    case g.EOF: {
      this.state = _.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
      break
    }
    case g.EQUALS_SIGN: {
      this._err(B.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = _.ATTRIBUTE_NAME;
      break
    }
    default:
      this._createAttr(""), this.state = _.ATTRIBUTE_NAME, this._stateAttributeName(t)
    }
  }
  _stateAttributeName(t) {
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED:
    case g.SOLIDUS:
    case g.GREATER_THAN_SIGN:
    case g.EOF: {
      this._leaveAttrName(), this.state = _.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
      break
    }
    case g.EQUALS_SIGN: {
      this._leaveAttrName(), this.state = _.BEFORE_ATTRIBUTE_VALUE;
      break
    }
    case g.QUOTATION_MARK:
    case g.APOSTROPHE:
    case g.LESS_THAN_SIGN: {
      this._err(B.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(t);
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this.currentAttr.name += pe;
      break
    }
    default:
      this.currentAttr.name += String.fromCodePoint(Ar(t) ? Jr(t) : t)
    }
  }
  _stateAfterAttributeName(t) {
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED:
      break;
    case g.SOLIDUS: {
      this.state = _.SELF_CLOSING_START_TAG;
      break
    }
    case g.EQUALS_SIGN: {
      this.state = _.BEFORE_ATTRIBUTE_VALUE;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this.state = _.DATA, this.emitCurrentTagToken();
      break
    }
    case g.EOF: {
      this._err(B.eofInTag), this._emitEOFToken();
      break
    }
    default:
      this._createAttr(""), this.state = _.ATTRIBUTE_NAME, this._stateAttributeName(t)
    }
  }
  _stateBeforeAttributeValue(t) {
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED:
      break;
    case g.QUOTATION_MARK: {
      this.state = _.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
      break
    }
    case g.APOSTROPHE: {
      this.state = _.ATTRIBUTE_VALUE_SINGLE_QUOTED;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.missingAttributeValue), this.state = _.DATA, this.emitCurrentTagToken();
      break
    }
    default:
      this.state = _.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(t)
    }
  }
  _stateAttributeValueDoubleQuoted(t) {
    switch (t) {
    case g.QUOTATION_MARK: {
      this.state = _.AFTER_ATTRIBUTE_VALUE_QUOTED;
      break
    }
    case g.AMPERSAND: {
      this._startCharacterReference();
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this.currentAttr.value += pe;
      break
    }
    case g.EOF: {
      this._err(B.eofInTag), this._emitEOFToken();
      break
    }
    default:
      this.currentAttr.value += String.fromCodePoint(t)
    }
  }
  _stateAttributeValueSingleQuoted(t) {
    switch (t) {
    case g.APOSTROPHE: {
      this.state = _.AFTER_ATTRIBUTE_VALUE_QUOTED;
      break
    }
    case g.AMPERSAND: {
      this._startCharacterReference();
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this.currentAttr.value += pe;
      break
    }
    case g.EOF: {
      this._err(B.eofInTag), this._emitEOFToken();
      break
    }
    default:
      this.currentAttr.value += String.fromCodePoint(t)
    }
  }
  _stateAttributeValueUnquoted(t) {
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED: {
      this._leaveAttrValue(), this.state = _.BEFORE_ATTRIBUTE_NAME;
      break
    }
    case g.AMPERSAND: {
      this._startCharacterReference();
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._leaveAttrValue(), this.state = _.DATA, this.emitCurrentTagToken();
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this.currentAttr.value += pe;
      break
    }
    case g.QUOTATION_MARK:
    case g.APOSTROPHE:
    case g.LESS_THAN_SIGN:
    case g.EQUALS_SIGN:
    case g.GRAVE_ACCENT: {
      this._err(B.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(t);
      break
    }
    case g.EOF: {
      this._err(B.eofInTag), this._emitEOFToken();
      break
    }
    default:
      this.currentAttr.value += String.fromCodePoint(t)
    }
  }
  _stateAfterAttributeValueQuoted(t) {
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED: {
      this._leaveAttrValue(), this.state = _.BEFORE_ATTRIBUTE_NAME;
      break
    }
    case g.SOLIDUS: {
      this._leaveAttrValue(), this.state = _.SELF_CLOSING_START_TAG;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._leaveAttrValue(), this.state = _.DATA, this.emitCurrentTagToken();
      break
    }
    case g.EOF: {
      this._err(B.eofInTag), this._emitEOFToken();
      break
    }
    default:
      this._err(B.missingWhitespaceBetweenAttributes), this.state = _.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t)
    }
  }
  _stateSelfClosingStartTag(t) {
    switch (t) {
    case g.GREATER_THAN_SIGN: {
      const r = this.currentToken;
      r.selfClosing = !0, this.state = _.DATA, this.emitCurrentTagToken();
      break
    }
    case g.EOF: {
      this._err(B.eofInTag), this._emitEOFToken();
      break
    }
    default:
      this._err(B.unexpectedSolidusInTag), this.state = _.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t)
    }
  }
  _stateBogusComment(t) {
    const r = this.currentToken;
    switch (t) {
    case g.GREATER_THAN_SIGN: {
      this.state = _.DATA, this.emitCurrentComment(r);
      break
    }
    case g.EOF: {
      this.emitCurrentComment(r), this._emitEOFToken();
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), r.data += pe;
      break
    }
    default:
      r.data += String.fromCodePoint(t)
    }
  }
  _stateMarkupDeclarationOpen(t) {
    this._consumeSequenceIfMatch(Le.DASH_DASH, !0) ? (this._createCommentToken(Le.DASH_DASH.length + 1), this.state = _.COMMENT_START) : this._consumeSequenceIfMatch(Le.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(Le.DOCTYPE.length + 1), this.state = _.DOCTYPE) : this._consumeSequenceIfMatch(Le.CDATA_START, !0) ? this.inForeignNode ? this.state = _.CDATA_SECTION : (this._err(B.cdataInHtmlContent), this._createCommentToken(Le.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = _.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(B.incorrectlyOpenedComment), this._createCommentToken(2), this.state = _.BOGUS_COMMENT, this._stateBogusComment(t))
  }
  _stateCommentStart(t) {
    switch (t) {
    case g.HYPHEN_MINUS: {
      this.state = _.COMMENT_START_DASH;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.abruptClosingOfEmptyComment), this.state = _.DATA;
      const r = this.currentToken;
      this.emitCurrentComment(r);
      break
    }
    default:
      this.state = _.COMMENT, this._stateComment(t)
    }
  }
  _stateCommentStartDash(t) {
    const r = this.currentToken;
    switch (t) {
    case g.HYPHEN_MINUS: {
      this.state = _.COMMENT_END;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.abruptClosingOfEmptyComment), this.state = _.DATA, this.emitCurrentComment(r);
      break
    }
    case g.EOF: {
      this._err(B.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
      break
    }
    default:
      r.data += "-", this.state = _.COMMENT, this._stateComment(t)
    }
  }
  _stateComment(t) {
    const r = this.currentToken;
    switch (t) {
    case g.HYPHEN_MINUS: {
      this.state = _.COMMENT_END_DASH;
      break
    }
    case g.LESS_THAN_SIGN: {
      r.data += "<", this.state = _.COMMENT_LESS_THAN_SIGN;
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), r.data += pe;
      break
    }
    case g.EOF: {
      this._err(B.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
      break
    }
    default:
      r.data += String.fromCodePoint(t)
    }
  }
  _stateCommentLessThanSign(t) {
    const r = this.currentToken;
    switch (t) {
    case g.EXCLAMATION_MARK: {
      r.data += "!", this.state = _.COMMENT_LESS_THAN_SIGN_BANG;
      break
    }
    case g.LESS_THAN_SIGN: {
      r.data += "<";
      break
    }
    default:
      this.state = _.COMMENT, this._stateComment(t)
    }
  }
  _stateCommentLessThanSignBang(t) {
    t === g.HYPHEN_MINUS ? this.state = _.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = _.COMMENT, this._stateComment(t))
  }
  _stateCommentLessThanSignBangDash(t) {
    t === g.HYPHEN_MINUS ? this.state = _.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = _.COMMENT_END_DASH, this._stateCommentEndDash(t))
  }
  _stateCommentLessThanSignBangDashDash(t) {
    t !== g.GREATER_THAN_SIGN && t !== g.EOF && this._err(B.nestedComment), this.state = _.COMMENT_END, this._stateCommentEnd(t)
  }
  _stateCommentEndDash(t) {
    const r = this.currentToken;
    switch (t) {
    case g.HYPHEN_MINUS: {
      this.state = _.COMMENT_END;
      break
    }
    case g.EOF: {
      this._err(B.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
      break
    }
    default:
      r.data += "-", this.state = _.COMMENT, this._stateComment(t)
    }
  }
  _stateCommentEnd(t) {
    const r = this.currentToken;
    switch (t) {
    case g.GREATER_THAN_SIGN: {
      this.state = _.DATA, this.emitCurrentComment(r);
      break
    }
    case g.EXCLAMATION_MARK: {
      this.state = _.COMMENT_END_BANG;
      break
    }
    case g.HYPHEN_MINUS: {
      r.data += "-";
      break
    }
    case g.EOF: {
      this._err(B.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
      break
    }
    default:
      r.data += "--", this.state = _.COMMENT, this._stateComment(t)
    }
  }
  _stateCommentEndBang(t) {
    const r = this.currentToken;
    switch (t) {
    case g.HYPHEN_MINUS: {
      r.data += "--!", this.state = _.COMMENT_END_DASH;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.incorrectlyClosedComment), this.state = _.DATA, this.emitCurrentComment(r);
      break
    }
    case g.EOF: {
      this._err(B.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
      break
    }
    default:
      r.data += "--!", this.state = _.COMMENT, this._stateComment(t)
    }
  }
  _stateDoctype(t) {
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED: {
      this.state = _.BEFORE_DOCTYPE_NAME;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this.state = _.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), this._createDoctypeToken(null);
      const r = this.currentToken;
      r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      this._err(B.missingWhitespaceBeforeDoctypeName), this.state = _.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t)
    }
  }
  _stateBeforeDoctypeName(t) {
    if (Ar(t)) this._createDoctypeToken(String.fromCharCode(Jr(t))), this.state = _.DOCTYPE_NAME;
    else switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED:
      break;
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), this._createDoctypeToken(pe), this.state = _.DOCTYPE_NAME;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.missingDoctypeName), this._createDoctypeToken(null);
      const r = this.currentToken;
      r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = _.DATA;
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), this._createDoctypeToken(null);
      const r = this.currentToken;
      r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      this._createDoctypeToken(String.fromCodePoint(t)), this.state = _.DOCTYPE_NAME
    }
  }
  _stateDoctypeName(t) {
    const r = this.currentToken;
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED: {
      this.state = _.AFTER_DOCTYPE_NAME;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this.state = _.DATA, this.emitCurrentDoctype(r);
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), r.name += pe;
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      r.name += String.fromCodePoint(Ar(t) ? Jr(t) : t)
    }
  }
  _stateAfterDoctypeName(t) {
    const r = this.currentToken;
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED:
      break;
    case g.GREATER_THAN_SIGN: {
      this.state = _.DATA, this.emitCurrentDoctype(r);
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      this._consumeSequenceIfMatch(Le.PUBLIC, !1) ? this.state = _.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(Le.SYSTEM, !1) ? this.state = _.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(B.invalidCharacterSequenceAfterDoctypeName), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t))
    }
  }
  _stateAfterDoctypePublicKeyword(t) {
    const r = this.currentToken;
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED: {
      this.state = _.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
      break
    }
    case g.QUOTATION_MARK: {
      this._err(B.missingWhitespaceAfterDoctypePublicKeyword), r.publicId = "", this.state = _.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
      break
    }
    case g.APOSTROPHE: {
      this._err(B.missingWhitespaceAfterDoctypePublicKeyword), r.publicId = "", this.state = _.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.missingDoctypePublicIdentifier), r.forceQuirks = !0, this.state = _.DATA, this.emitCurrentDoctype(r);
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      this._err(B.missingQuoteBeforeDoctypePublicIdentifier), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t)
    }
  }
  _stateBeforeDoctypePublicIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED:
      break;
    case g.QUOTATION_MARK: {
      r.publicId = "", this.state = _.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
      break
    }
    case g.APOSTROPHE: {
      r.publicId = "", this.state = _.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.missingDoctypePublicIdentifier), r.forceQuirks = !0, this.state = _.DATA, this.emitCurrentDoctype(r);
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      this._err(B.missingQuoteBeforeDoctypePublicIdentifier), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t)
    }
  }
  _stateDoctypePublicIdentifierDoubleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
    case g.QUOTATION_MARK: {
      this.state = _.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), r.publicId += pe;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.abruptDoctypePublicIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = _.DATA;
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      r.publicId += String.fromCodePoint(t)
    }
  }
  _stateDoctypePublicIdentifierSingleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
    case g.APOSTROPHE: {
      this.state = _.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), r.publicId += pe;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.abruptDoctypePublicIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = _.DATA;
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      r.publicId += String.fromCodePoint(t)
    }
  }
  _stateAfterDoctypePublicIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED: {
      this.state = _.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this.state = _.DATA, this.emitCurrentDoctype(r);
      break
    }
    case g.QUOTATION_MARK: {
      this._err(B.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
      break
    }
    case g.APOSTROPHE: {
      this._err(B.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      this._err(B.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t)
    }
  }
  _stateBetweenDoctypePublicAndSystemIdentifiers(t) {
    const r = this.currentToken;
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED:
      break;
    case g.GREATER_THAN_SIGN: {
      this.emitCurrentDoctype(r), this.state = _.DATA;
      break
    }
    case g.QUOTATION_MARK: {
      r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
      break
    }
    case g.APOSTROPHE: {
      r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      this._err(B.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t)
    }
  }
  _stateAfterDoctypeSystemKeyword(t) {
    const r = this.currentToken;
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED: {
      this.state = _.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
      break
    }
    case g.QUOTATION_MARK: {
      this._err(B.missingWhitespaceAfterDoctypeSystemKeyword), r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
      break
    }
    case g.APOSTROPHE: {
      this._err(B.missingWhitespaceAfterDoctypeSystemKeyword), r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.missingDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = _.DATA, this.emitCurrentDoctype(r);
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      this._err(B.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t)
    }
  }
  _stateBeforeDoctypeSystemIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED:
      break;
    case g.QUOTATION_MARK: {
      r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
      break
    }
    case g.APOSTROPHE: {
      r.systemId = "", this.state = _.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.missingDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = _.DATA, this.emitCurrentDoctype(r);
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      this._err(B.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t)
    }
  }
  _stateDoctypeSystemIdentifierDoubleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
    case g.QUOTATION_MARK: {
      this.state = _.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), r.systemId += pe;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.abruptDoctypeSystemIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = _.DATA;
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      r.systemId += String.fromCodePoint(t)
    }
  }
  _stateDoctypeSystemIdentifierSingleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
    case g.APOSTROPHE: {
      this.state = _.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter), r.systemId += pe;
      break
    }
    case g.GREATER_THAN_SIGN: {
      this._err(B.abruptDoctypeSystemIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = _.DATA;
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      r.systemId += String.fromCodePoint(t)
    }
  }
  _stateAfterDoctypeSystemIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
    case g.SPACE:
    case g.LINE_FEED:
    case g.TABULATION:
    case g.FORM_FEED:
      break;
    case g.GREATER_THAN_SIGN: {
      this.emitCurrentDoctype(r), this.state = _.DATA;
      break
    }
    case g.EOF: {
      this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    default:
      this._err(B.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = _.BOGUS_DOCTYPE, this._stateBogusDoctype(t)
    }
  }
  _stateBogusDoctype(t) {
    const r = this.currentToken;
    switch (t) {
    case g.GREATER_THAN_SIGN: {
      this.emitCurrentDoctype(r), this.state = _.DATA;
      break
    }
    case g.NULL: {
      this._err(B.unexpectedNullCharacter);
      break
    }
    case g.EOF: {
      this.emitCurrentDoctype(r), this._emitEOFToken();
      break
    }
    }
  }
  _stateCdataSection(t) {
    switch (t) {
    case g.RIGHT_SQUARE_BRACKET: {
      this.state = _.CDATA_SECTION_BRACKET;
      break
    }
    case g.EOF: {
      this._err(B.eofInCdata), this._emitEOFToken();
      break
    }
    default:
      this._emitCodePoint(t)
    }
  }
  _stateCdataSectionBracket(t) {
    t === g.RIGHT_SQUARE_BRACKET ? this.state = _.CDATA_SECTION_END : (this._emitChars("]"), this.state = _.CDATA_SECTION, this._stateCdataSection(t))
  }
  _stateCdataSectionEnd(t) {
    switch (t) {
    case g.GREATER_THAN_SIGN: {
      this.state = _.DATA;
      break
    }
    case g.RIGHT_SQUARE_BRACKET: {
      this._emitChars("]");
      break
    }
    default:
      this._emitChars("]]"), this.state = _.CDATA_SECTION, this._stateCdataSection(t)
    }
  }
  _stateCharacterReference() {
    let t = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
    if (t < 0)
      if (this.preprocessor.lastChunkWritten) t = this.entityDecoder.end();
      else {
        this.active = !1, this.preprocessor.pos = this.preprocessor.html.length - 1, this.consumedAfterSnapshot = 0, this.preprocessor.endOfChunkHit = !0;
        return
      } t === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(g.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && os(this.preprocessor.peek(1)) ? _.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState
  }
  _stateAmbiguousAmpersand(t) {
    os(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === g.SEMICOLON && this._err(B.unknownNamedCharacterReference), this.state = this.returnState, this._callState(t))
  }
};
const xd = new Set([d.DD, d.DT, d.LI, d.OPTGROUP, d.OPTION, d.P, d.RB, d.RP, d.RT, d.RTC]),
  ds = new Set([...xd, d.CAPTION, d.COLGROUP, d.TBODY, d.TD, d.TFOOT, d.TH, d.THEAD, d.TR]),
  ru = new Set([d.APPLET, d.CAPTION, d.HTML, d.MARQUEE, d.OBJECT, d.TABLE, d.TD, d.TEMPLATE, d.TH]),
  Ap = new Set([...ru, d.OL, d.UL]),
  Tp = new Set([...ru, d.BUTTON]),
  ls = new Set([d.ANNOTATION_XML, d.MI, d.MN, d.MO, d.MS, d.MTEXT]),
  fs = new Set([d.DESC, d.FOREIGN_OBJECT, d.TITLE]),
  vp = new Set([d.TR, d.TEMPLATE, d.HTML]),
  _p = new Set([d.TBODY, d.TFOOT, d.THEAD, d.TEMPLATE, d.HTML]),
  yp = new Set([d.TABLE, d.TEMPLATE, d.HTML]),
  Cp = new Set([d.TD, d.TH]);
class Sp {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current
  }
  constructor(t, r, a) {
    this.treeAdapter = r, this.handler = a, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = d.UNKNOWN, this.current = t
  }
  _indexOf(t) {
    return this.items.lastIndexOf(t, this.stackTop)
  }
  _isInTemplate() {
    return this.currentTagId === d.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === Y.HTML
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop]
  }
  push(t, r) {
    this.stackTop++, this.items[this.stackTop] = t, this.current = t, this.tagIDs[this.stackTop] = r, this.currentTagId = r, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(t, r, !0)
  }
  pop() {
    const t = this.current;
    this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !0)
  }
  replace(t, r) {
    const a = this._indexOf(t);
    this.items[a] = r, a === this.stackTop && (this.current = r)
  }
  insertAfter(t, r, a) {
    const u = this._indexOf(t) + 1;
    this.items.splice(u, 0, r), this.tagIDs.splice(u, 0, a), this.stackTop++, u === this.stackTop && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, u === this.stackTop)
  }
  popUntilTagNamePopped(t) {
    let r = this.stackTop + 1;
    do r = this.tagIDs.lastIndexOf(t, r - 1); while (r > 0 && this.treeAdapter.getNamespaceURI(this.items[r]) !== Y.HTML);
    this.shortenToLength(Math.max(r, 0))
  }
  shortenToLength(t) {
    for (; this.stackTop >= t;) {
      const r = this.current;
      this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(r, this.stackTop < t)
    }
  }
  popUntilElementPopped(t) {
    const r = this._indexOf(t);
    this.shortenToLength(Math.max(r, 0))
  }
  popUntilPopped(t, r) {
    const a = this._indexOfTagNames(t, r);
    this.shortenToLength(Math.max(a, 0))
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(An, Y.HTML)
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(Cp, Y.HTML)
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0, this.shortenToLength(1)
  }
  _indexOfTagNames(t, r) {
    for (let a = this.stackTop; a >= 0; a--)
      if (t.has(this.tagIDs[a]) && this.treeAdapter.getNamespaceURI(this.items[a]) === r) return a;
    return -1
  }
  clearBackTo(t, r) {
    const a = this._indexOfTagNames(t, r);
    this.shortenToLength(a + 1)
  }
  clearBackToTableContext() {
    this.clearBackTo(yp, Y.HTML)
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(_p, Y.HTML)
  }
  clearBackToTableRowContext() {
    this.clearBackTo(vp, Y.HTML)
  }
  remove(t) {
    const r = this._indexOf(t);
    r >= 0 && (r === this.stackTop ? this.pop() : (this.items.splice(r, 1), this.tagIDs.splice(r, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !1)))
  }
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === d.BODY ? this.items[1] : null
  }
  contains(t) {
    return this._indexOf(t) > -1
  }
  getCommonAncestor(t) {
    const r = this._indexOf(t) - 1;
    return r >= 0 ? this.items[r] : null
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === d.HTML
  }
  hasInDynamicScope(t, r) {
    for (let a = this.stackTop; a >= 0; a--) {
      const u = this.tagIDs[a];
      switch (this.treeAdapter.getNamespaceURI(this.items[a])) {
      case Y.HTML: {
        if (u === t) return !0;
        if (r.has(u)) return !1;
        break
      }
      case Y.SVG: {
        if (fs.has(u)) return !1;
        break
      }
      case Y.MATHML: {
        if (ls.has(u)) return !1;
        break
      }
      }
    }
    return !0
  }
  hasInScope(t) {
    return this.hasInDynamicScope(t, ru)
  }
  hasInListItemScope(t) {
    return this.hasInDynamicScope(t, Ap)
  }
  hasInButtonScope(t) {
    return this.hasInDynamicScope(t, Tp)
  }
  hasNumberedHeaderInScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t];
      switch (this.treeAdapter.getNamespaceURI(this.items[t])) {
      case Y.HTML: {
        if (An.has(r)) return !0;
        if (ru.has(r)) return !1;
        break
      }
      case Y.SVG: {
        if (fs.has(r)) return !1;
        break
      }
      case Y.MATHML: {
        if (ls.has(r)) return !1;
        break
      }
      }
    }
    return !0
  }
  hasInTableScope(t) {
    for (let r = this.stackTop; r >= 0; r--)
      if (this.treeAdapter.getNamespaceURI(this.items[r]) === Y.HTML) switch (this.tagIDs[r]) {
      case t:
        return !0;
      case d.TABLE:
      case d.HTML:
        return !1
      }
    return !0
  }
  hasTableBodyContextInTableScope() {
    for (let t = this.stackTop; t >= 0; t--)
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === Y.HTML) switch (this.tagIDs[t]) {
      case d.TBODY:
      case d.THEAD:
      case d.TFOOT:
        return !0;
      case d.TABLE:
      case d.HTML:
        return !1
      }
    return !0
  }
  hasInSelectScope(t) {
    for (let r = this.stackTop; r >= 0; r--)
      if (this.treeAdapter.getNamespaceURI(this.items[r]) === Y.HTML) switch (this.tagIDs[r]) {
      case t:
        return !0;
      case d.OPTION:
      case d.OPTGROUP:
        break;
      default:
        return !1
      }
    return !0
  }
  generateImpliedEndTags() {
    for (; this.currentTagId !== void 0 && xd.has(this.currentTagId);) this.pop()
  }
  generateImpliedEndTagsThoroughly() {
    for (; this.currentTagId !== void 0 && ds.has(this.currentTagId);) this.pop()
  }
  generateImpliedEndTagsWithExclusion(t) {
    for (; this.currentTagId !== void 0 && this.currentTagId !== t && ds.has(this.currentTagId);) this.pop()
  }
}
const ju = 3;
var Je;
(function (e) {
  e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element"
})(Je || (Je = {}));
const hs = {
  type: Je.Marker
};
class Np {
  constructor(t) {
    this.treeAdapter = t, this.entries = [], this.bookmark = null
  }
  _getNoahArkConditionCandidates(t, r) {
    const a = [],
      u = r.length,
      n = this.treeAdapter.getTagName(t),
      s = this.treeAdapter.getNamespaceURI(t);
    for (let i = 0; i < this.entries.length; i++) {
      const o = this.entries[i];
      if (o.type === Je.Marker) break;
      const {
        element: c
      } = o;
      if (this.treeAdapter.getTagName(c) === n && this.treeAdapter.getNamespaceURI(c) === s) {
        const l = this.treeAdapter.getAttrList(c);
        l.length === u && a.push({
          idx: i,
          attrs: l
        })
      }
    }
    return a
  }
  _ensureNoahArkCondition(t) {
    if (this.entries.length < ju) return;
    const r = this.treeAdapter.getAttrList(t),
      a = this._getNoahArkConditionCandidates(t, r);
    if (a.length < ju) return;
    const u = new Map(r.map(s => [s.name, s.value]));
    let n = 0;
    for (let s = 0; s < a.length; s++) {
      const i = a[s];
      i.attrs.every(o => u.get(o.name) === o.value) && (n += 1, n >= ju && this.entries.splice(i.idx, 1))
    }
  }
  insertMarker() {
    this.entries.unshift(hs)
  }
  pushElement(t, r) {
    this._ensureNoahArkCondition(t), this.entries.unshift({
      type: Je.Element,
      element: t,
      token: r
    })
  }
  insertElementAfterBookmark(t, r) {
    const a = this.entries.indexOf(this.bookmark);
    this.entries.splice(a, 0, {
      type: Je.Element,
      element: t,
      token: r
    })
  }
  removeEntry(t) {
    const r = this.entries.indexOf(t);
    r !== -1 && this.entries.splice(r, 1)
  }
  clearToLastMarker() {
    const t = this.entries.indexOf(hs);
    t === -1 ? this.entries.length = 0 : this.entries.splice(0, t + 1)
  }
  getElementEntryInScopeWithTagName(t) {
    const r = this.entries.find(a => a.type === Je.Marker || this.treeAdapter.getTagName(a.element) === t);
    return r && r.type === Je.Element ? r : null
  }
  getElementEntry(t) {
    return this.entries.find(r => r.type === Je.Element && r.element === t)
  }
}
const ct = {
    createDocument() {
      return {
        nodeName: "#document",
        mode: Ue.NO_QUIRKS,
        childNodes: []
      }
    },
    createDocumentFragment() {
      return {
        nodeName: "#document-fragment",
        childNodes: []
      }
    },
    createElement(e, t, r) {
      return {
        nodeName: e,
        tagName: e,
        attrs: r,
        namespaceURI: t,
        childNodes: [],
        parentNode: null
      }
    },
    createCommentNode(e) {
      return {
        nodeName: "#comment",
        data: e,
        parentNode: null
      }
    },
    createTextNode(e) {
      return {
        nodeName: "#text",
        value: e,
        parentNode: null
      }
    },
    appendChild(e, t) {
      e.childNodes.push(t), t.parentNode = e
    },
    insertBefore(e, t, r) {
      const a = e.childNodes.indexOf(r);
      e.childNodes.splice(a, 0, t), t.parentNode = e
    },
    setTemplateContent(e, t) {
      e.content = t
    },
    getTemplateContent(e) {
      return e.content
    },
    setDocumentType(e, t, r, a) {
      const u = e.childNodes.find(n => n.nodeName === "#documentType");
      if (u) u.name = t, u.publicId = r, u.systemId = a;
      else {
        const n = {
          nodeName: "#documentType",
          name: t,
          publicId: r,
          systemId: a,
          parentNode: null
        };
        ct.appendChild(e, n)
      }
    },
    setDocumentMode(e, t) {
      e.mode = t
    },
    getDocumentMode(e) {
      return e.mode
    },
    detachNode(e) {
      if (e.parentNode) {
        const t = e.parentNode.childNodes.indexOf(e);
        e.parentNode.childNodes.splice(t, 1), e.parentNode = null
      }
    },
    insertText(e, t) {
      if (e.childNodes.length > 0) {
        const r = e.childNodes[e.childNodes.length - 1];
        if (ct.isTextNode(r)) {
          r.value += t;
          return
        }
      }
      ct.appendChild(e, ct.createTextNode(t))
    },
    insertTextBefore(e, t, r) {
      const a = e.childNodes[e.childNodes.indexOf(r) - 1];
      a && ct.isTextNode(a) ? a.value += t : ct.insertBefore(e, ct.createTextNode(t), r)
    },
    adoptAttributes(e, t) {
      const r = new Set(e.attrs.map(a => a.name));
      for (let a = 0; a < t.length; a++) r.has(t[a].name) || e.attrs.push(t[a])
    },
    getFirstChild(e) {
      return e.childNodes[0]
    },
    getChildNodes(e) {
      return e.childNodes
    },
    getParentNode(e) {
      return e.parentNode
    },
    getAttrList(e) {
      return e.attrs
    },
    getTagName(e) {
      return e.tagName
    },
    getNamespaceURI(e) {
      return e.namespaceURI
    },
    getTextNodeContent(e) {
      return e.value
    },
    getCommentNodeContent(e) {
      return e.data
    },
    getDocumentTypeNodeName(e) {
      return e.name
    },
    getDocumentTypeNodePublicId(e) {
      return e.publicId
    },
    getDocumentTypeNodeSystemId(e) {
      return e.systemId
    },
    isTextNode(e) {
      return e.nodeName === "#text"
    },
    isCommentNode(e) {
      return e.nodeName === "#comment"
    },
    isDocumentTypeNode(e) {
      return e.nodeName === "#documentType"
    },
    isElementNode(e) {
      return Object.prototype.hasOwnProperty.call(e, "tagName")
    },
    setNodeSourceCodeLocation(e, t) {
      e.sourceCodeLocation = t
    },
    getNodeSourceCodeLocation(e) {
      return e.sourceCodeLocation
    },
    updateNodeSourceCodeLocation(e, t) {
      e.sourceCodeLocation = {
        ...e.sourceCodeLocation,
        ...t
      }
    }
  },
  Ed = "html",
  wp = "about:legacy-compat",
  Ip = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",
  gd = ["+//silmaril//dtd html pro v0r11 19970101//", "-//as//dtd html 3.0 aswedit + extensions//", "-//advasoft ltd//dtd html 3.0 aswedit + extensions//", "-//ietf//dtd html 2.0 level 1//", "-//ietf//dtd html 2.0 level 2//", "-//ietf//dtd html 2.0 strict level 1//", "-//ietf//dtd html 2.0 strict level 2//", "-//ietf//dtd html 2.0 strict//", "-//ietf//dtd html 2.0//", "-//ietf//dtd html 2.1e//", "-//ietf//dtd html 3.0//", "-//ietf//dtd html 3.2 final//", "-//ietf//dtd html 3.2//", "-//ietf//dtd html 3//", "-//ietf//dtd html level 0//", "-//ietf//dtd html level 1//", "-//ietf//dtd html level 2//", "-//ietf//dtd html level 3//", "-//ietf//dtd html strict level 0//", "-//ietf//dtd html strict level 1//", "-//ietf//dtd html strict level 2//", "-//ietf//dtd html strict level 3//", "-//ietf//dtd html strict//", "-//ietf//dtd html//", "-//metrius//dtd metrius presentational//", "-//microsoft//dtd internet explorer 2.0 html strict//", "-//microsoft//dtd internet explorer 2.0 html//", "-//microsoft//dtd internet explorer 2.0 tables//", "-//microsoft//dtd internet explorer 3.0 html strict//", "-//microsoft//dtd internet explorer 3.0 html//", "-//microsoft//dtd internet explorer 3.0 tables//", "-//netscape comm. corp.//dtd html//", "-//netscape comm. corp.//dtd strict html//", "-//o'reilly and associates//dtd html 2.0//", "-//o'reilly and associates//dtd html extended 1.0//", "-//o'reilly and associates//dtd html extended relaxed 1.0//", "-//sq//dtd html 2.0 hotmetal + extensions//", "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//", "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//", "-//spyglass//dtd html 2.0 extended//", "-//sun microsystems corp.//dtd hotjava html//", "-//sun microsystems corp.//dtd hotjava strict html//", "-//w3c//dtd html 3 1995-03-24//", "-//w3c//dtd html 3.2 draft//", "-//w3c//dtd html 3.2 final//", "-//w3c//dtd html 3.2//", "-//w3c//dtd html 3.2s draft//", "-//w3c//dtd html 4.0 frameset//", "-//w3c//dtd html 4.0 transitional//", "-//w3c//dtd html experimental 19960712//", "-//w3c//dtd html experimental 970421//", "-//w3c//dtd w3 html//", "-//w3o//dtd w3 html 3.0//", "-//webtechs//dtd mozilla html 2.0//", "-//webtechs//dtd mozilla html//"],
  Dp = [...gd, "-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"],
  Op = new Set(["-//w3o//dtd w3 html strict 3.0//en//", "-/w3c/dtd html 4.0 transitional/en", "html"]),
  Ad = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"],
  Lp = [...Ad, "-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"];

function ms(e, t) {
  return t.some(r => e.startsWith(r))
}

function Rp(e) {
  return e.name === Ed && e.publicId === null && (e.systemId === null || e.systemId === wp)
}

function kp(e) {
  if (e.name !== Ed) return Ue.QUIRKS;
  const {
    systemId: t
  } = e;
  if (t && t.toLowerCase() === Ip) return Ue.QUIRKS;
  let {
    publicId: r
  } = e;
  if (r !== null) {
    if (r = r.toLowerCase(), Op.has(r)) return Ue.QUIRKS;
    let a = t === null ? Dp : gd;
    if (ms(r, a)) return Ue.QUIRKS;
    if (a = t === null ? Ad : Lp, ms(r, a)) return Ue.LIMITED_QUIRKS
  }
  return Ue.NO_QUIRKS
}
const ps = {
    TEXT_HTML: "text/html",
    APPLICATION_XML: "application/xhtml+xml"
  },
  Bp = "definitionurl",
  Fp = "definitionURL",
  Pp = new Map(["attributeName", "attributeType", "baseFrequency", "baseProfile", "calcMode", "clipPathUnits", "diffuseConstant", "edgeMode", "filterUnits", "glyphRef", "gradientTransform", "gradientUnits", "kernelMatrix", "kernelUnitLength", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "limitingConeAngle", "markerHeight", "markerUnits", "markerWidth", "maskContentUnits", "maskUnits", "numOctaves", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "refX", "refY", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "specularConstant", "specularExponent", "spreadMethod", "startOffset", "stdDeviation", "stitchTiles", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textLength", "viewBox", "viewTarget", "xChannelSelector", "yChannelSelector", "zoomAndPan"].map(e => [e.toLowerCase(), e])),
  Mp = new Map([
    ["xlink:actuate", {
      prefix: "xlink",
      name: "actuate",
      namespace: Y.XLINK
    }],
    ["xlink:arcrole", {
      prefix: "xlink",
      name: "arcrole",
      namespace: Y.XLINK
    }],
    ["xlink:href", {
      prefix: "xlink",
      name: "href",
      namespace: Y.XLINK
    }],
    ["xlink:role", {
      prefix: "xlink",
      name: "role",
      namespace: Y.XLINK
    }],
    ["xlink:show", {
      prefix: "xlink",
      name: "show",
      namespace: Y.XLINK
    }],
    ["xlink:title", {
      prefix: "xlink",
      name: "title",
      namespace: Y.XLINK
    }],
    ["xlink:type", {
      prefix: "xlink",
      name: "type",
      namespace: Y.XLINK
    }],
    ["xml:lang", {
      prefix: "xml",
      name: "lang",
      namespace: Y.XML
    }],
    ["xml:space", {
      prefix: "xml",
      name: "space",
      namespace: Y.XML
    }],
    ["xmlns", {
      prefix: "",
      name: "xmlns",
      namespace: Y.XMLNS
    }],
    ["xmlns:xlink", {
      prefix: "xmlns",
      name: "xlink",
      namespace: Y.XMLNS
    }]
  ]),
  Up = new Map(["altGlyph", "altGlyphDef", "altGlyphItem", "animateColor", "animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "glyphRef", "linearGradient", "radialGradient", "textPath"].map(e => [e.toLowerCase(), e])),
  Hp = new Set([d.B, d.BIG, d.BLOCKQUOTE, d.BODY, d.BR, d.CENTER, d.CODE, d.DD, d.DIV, d.DL, d.DT, d.EM, d.EMBED, d.H1, d.H2, d.H3, d.H4, d.H5, d.H6, d.HEAD, d.HR, d.I, d.IMG, d.LI, d.LISTING, d.MENU, d.META, d.NOBR, d.OL, d.P, d.PRE, d.RUBY, d.S, d.SMALL, d.SPAN, d.STRONG, d.STRIKE, d.SUB, d.SUP, d.TABLE, d.TT, d.U, d.UL, d.VAR]);

function $p(e) {
  const t = e.tagID;
  return t === d.FONT && e.attrs.some(({
    name: a
  }) => a === Lt.COLOR || a === Lt.SIZE || a === Lt.FACE) || Hp.has(t)
}

function Td(e) {
  for (let t = 0; t < e.attrs.length; t++)
    if (e.attrs[t].name === Bp) {
      e.attrs[t].name = Fp;
      break
    }
}

function vd(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const r = Pp.get(e.attrs[t].name);
    r != null && (e.attrs[t].name = r)
  }
}

function Qn(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const r = Mp.get(e.attrs[t].name);
    r && (e.attrs[t].prefix = r.prefix, e.attrs[t].name = r.name, e.attrs[t].namespace = r.namespace)
  }
}

function qp(e) {
  const t = Up.get(e.tagName);
  t != null && (e.tagName = t, e.tagID = Au(e.tagName))
}

function Wp(e, t) {
  return t === Y.MATHML && (e === d.MI || e === d.MO || e === d.MN || e === d.MS || e === d.MTEXT)
}

function Yp(e, t, r) {
  if (t === Y.MATHML && e === d.ANNOTATION_XML) {
    for (let a = 0; a < r.length; a++)
      if (r[a].name === Lt.ENCODING) {
        const u = r[a].value.toLowerCase();
        return u === ps.TEXT_HTML || u === ps.APPLICATION_XML
      }
  }
  return t === Y.SVG && (e === d.FOREIGN_OBJECT || e === d.DESC || e === d.TITLE)
}

function zp(e, t, r, a) {
  return (!a || a === Y.HTML) && Yp(e, t, r) || (!a || a === Y.MATHML) && Wp(e, t)
}
const Vp = "hidden",
  Gp = 8,
  jp = 3;
var y;
(function (e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET"
})(y || (y = {}));
const Kp = {
    startLine: -1,
    startCol: -1,
    startOffset: -1,
    endLine: -1,
    endCol: -1,
    endOffset: -1
  },
  _d = new Set([d.TABLE, d.TBODY, d.TFOOT, d.THEAD, d.TR]),
  bs = {
    scriptingEnabled: !0,
    sourceCodeLocationInfo: !1,
    treeAdapter: ct,
    onParseError: null
  };
let yd = class {
  constructor(t, r, a = null, u = null) {
    this.fragmentContext = a, this.scriptHandler = u, this.currentToken = null, this.stopped = !1, this.insertionMode = y.INITIAL, this.originalInsertionMode = y.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...bs,
      ...t
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = r ?? this.treeAdapter.createDocument(), this.tokenizer = new gp(this.options, this), this.activeFormattingElements = new Np(this.treeAdapter), this.fragmentContextID = a ? Au(this.treeAdapter.getTagName(a)) : d.UNKNOWN, this._setContextModes(a ?? this.document, this.fragmentContextID), this.openElements = new Sp(this.document, this.treeAdapter, this)
  }
  static parse(t, r) {
    const a = new this(r);
    return a.tokenizer.write(t, !0), a.document
  }
  static getFragmentParser(t, r) {
    const a = {
      ...bs,
      ...r
    };
    t ?? (t = a.treeAdapter.createElement(O.TEMPLATE, Y.HTML, []));
    const u = a.treeAdapter.createElement("documentmock", Y.HTML, []),
      n = new this(a, u, t);
    return n.fragmentContextID === d.TEMPLATE && n.tmplInsertionModeStack.unshift(y.IN_TEMPLATE), n._initTokenizerForFragmentParsing(), n._insertFakeRootElement(), n._resetInsertionMode(), n._findFormInFragmentContext(), n
  }
  getFragment() {
    const t = this.treeAdapter.getFirstChild(this.document),
      r = this.treeAdapter.createDocumentFragment();
    return this._adoptNodes(t, r), r
  }
  _err(t, r, a) {
    var u;
    if (!this.onParseError) return;
    const n = (u = t.location) !== null && u !== void 0 ? u : Kp,
      s = {
        code: r,
        startLine: n.startLine,
        startCol: n.startCol,
        startOffset: n.startOffset,
        endLine: a ? n.startLine : n.endLine,
        endCol: a ? n.startCol : n.endCol,
        endOffset: a ? n.startOffset : n.endOffset
      };
    this.onParseError(s)
  }
  onItemPush(t, r, a) {
    var u, n;
    (n = (u = this.treeAdapter).onItemPush) === null || n === void 0 || n.call(u, t), a && this.openElements.stackTop > 0 && this._setContextModes(t, r)
  }
  onItemPop(t, r) {
    var a, u;
    if (this.options.sourceCodeLocationInfo && this._setEndLocation(t, this.currentToken), (u = (a = this.treeAdapter).onItemPop) === null || u === void 0 || u.call(a, t, this.openElements.current), r) {
      let n, s;
      this.openElements.stackTop === 0 && this.fragmentContext ? (n = this.fragmentContext, s = this.fragmentContextID) : {
        current: n,
        currentTagId: s
      } = this.openElements, this._setContextModes(n, s)
    }
  }
  _setContextModes(t, r) {
    const a = t === this.document || t && this.treeAdapter.getNamespaceURI(t) === Y.HTML;
    this.currentNotInHTML = !a, this.tokenizer.inForeignNode = !a && t !== void 0 && r !== void 0 && !this._isIntegrationPoint(r, t)
  }
  _switchToTextParsing(t, r) {
    this._insertElement(t, Y.HTML), this.tokenizer.state = r, this.originalInsertionMode = this.insertionMode, this.insertionMode = y.TEXT
  }
  switchToPlaintextParsing() {
    this.insertionMode = y.TEXT, this.originalInsertionMode = y.IN_BODY, this.tokenizer.state = Be.PLAINTEXT
  }
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current
  }
  _findFormInFragmentContext() {
    let t = this.fragmentContext;
    for (; t;) {
      if (this.treeAdapter.getTagName(t) === O.FORM) {
        this.formElement = t;
        break
      }
      t = this.treeAdapter.getParentNode(t)
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== Y.HTML)) switch (this.fragmentContextID) {
    case d.TITLE:
    case d.TEXTAREA: {
      this.tokenizer.state = Be.RCDATA;
      break
    }
    case d.STYLE:
    case d.XMP:
    case d.IFRAME:
    case d.NOEMBED:
    case d.NOFRAMES:
    case d.NOSCRIPT: {
      this.tokenizer.state = Be.RAWTEXT;
      break
    }
    case d.SCRIPT: {
      this.tokenizer.state = Be.SCRIPT_DATA;
      break
    }
    case d.PLAINTEXT: {
      this.tokenizer.state = Be.PLAINTEXT;
      break
    }
    }
  }
  _setDocumentType(t) {
    const r = t.name || "",
      a = t.publicId || "",
      u = t.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, r, a, u), t.location) {
      const s = this.treeAdapter.getChildNodes(this.document).find(i => this.treeAdapter.isDocumentTypeNode(i));
      s && this.treeAdapter.setNodeSourceCodeLocation(s, t.location)
    }
  }
  _attachElementToTree(t, r) {
    if (this.options.sourceCodeLocationInfo) {
      const a = r && {
        ...r,
        startTag: r
      };
      this.treeAdapter.setNodeSourceCodeLocation(t, a)
    }
    if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(t);
    else {
      const a = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(a ?? this.document, t)
    }
  }
  _appendElement(t, r) {
    const a = this.treeAdapter.createElement(t.tagName, r, t.attrs);
    this._attachElementToTree(a, t.location)
  }
  _insertElement(t, r) {
    const a = this.treeAdapter.createElement(t.tagName, r, t.attrs);
    this._attachElementToTree(a, t.location), this.openElements.push(a, t.tagID)
  }
  _insertFakeElement(t, r) {
    const a = this.treeAdapter.createElement(t, Y.HTML, []);
    this._attachElementToTree(a, null), this.openElements.push(a, r)
  }
  _insertTemplate(t) {
    const r = this.treeAdapter.createElement(t.tagName, Y.HTML, t.attrs),
      a = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(r, a), this._attachElementToTree(r, t.location), this.openElements.push(r, t.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(a, null)
  }
  _insertFakeRootElement() {
    const t = this.treeAdapter.createElement(O.HTML, Y.HTML, []);
    this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(t, null), this.treeAdapter.appendChild(this.openElements.current, t), this.openElements.push(t, d.HTML)
  }
  _appendCommentNode(t, r) {
    const a = this.treeAdapter.createCommentNode(t.data);
    this.treeAdapter.appendChild(r, a), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(a, t.location)
  }
  _insertCharacters(t) {
    let r, a;
    if (this._shouldFosterParentOnInsertion() ? ({
        parent: r,
        beforeElement: a
      } = this._findFosterParentingLocation(), a ? this.treeAdapter.insertTextBefore(r, t.chars, a) : this.treeAdapter.insertText(r, t.chars)) : (r = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(r, t.chars)), !t.location) return;
    const u = this.treeAdapter.getChildNodes(r),
      n = a ? u.lastIndexOf(a) : u.length,
      s = u[n - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(s)) {
      const {
        endLine: o,
        endCol: c,
        endOffset: l
      } = t.location;
      this.treeAdapter.updateNodeSourceCodeLocation(s, {
        endLine: o,
        endCol: c,
        endOffset: l
      })
    } else this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(s, t.location)
  }
  _adoptNodes(t, r) {
    for (let a = this.treeAdapter.getFirstChild(t); a; a = this.treeAdapter.getFirstChild(t)) this.treeAdapter.detachNode(a), this.treeAdapter.appendChild(r, a)
  }
  _setEndLocation(t, r) {
    if (this.treeAdapter.getNodeSourceCodeLocation(t) && r.location) {
      const a = r.location,
        u = this.treeAdapter.getTagName(t),
        n = r.type === le.END_TAG && u === r.tagName ? {
          endTag: {
            ...a
          },
          endLine: a.endLine,
          endCol: a.endCol,
          endOffset: a.endOffset
        } : {
          endLine: a.startLine,
          endCol: a.startCol,
          endOffset: a.startOffset
        };
      this.treeAdapter.updateNodeSourceCodeLocation(t, n)
    }
  }
  shouldProcessStartTagTokenInForeignContent(t) {
    if (!this.currentNotInHTML) return !1;
    let r, a;
    return this.openElements.stackTop === 0 && this.fragmentContext ? (r = this.fragmentContext, a = this.fragmentContextID) : {
      current: r,
      currentTagId: a
    } = this.openElements, t.tagID === d.SVG && this.treeAdapter.getTagName(r) === O.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(r) === Y.MATHML ? !1 : this.tokenizer.inForeignNode || (t.tagID === d.MGLYPH || t.tagID === d.MALIGNMARK) && a !== void 0 && !this._isIntegrationPoint(a, r, Y.HTML)
  }
  _processToken(t) {
    switch (t.type) {
    case le.CHARACTER: {
      this.onCharacter(t);
      break
    }
    case le.NULL_CHARACTER: {
      this.onNullCharacter(t);
      break
    }
    case le.COMMENT: {
      this.onComment(t);
      break
    }
    case le.DOCTYPE: {
      this.onDoctype(t);
      break
    }
    case le.START_TAG: {
      this._processStartTag(t);
      break
    }
    case le.END_TAG: {
      this.onEndTag(t);
      break
    }
    case le.EOF: {
      this.onEof(t);
      break
    }
    case le.WHITESPACE_CHARACTER: {
      this.onWhitespaceCharacter(t);
      break
    }
    }
  }
  _isIntegrationPoint(t, r, a) {
    const u = this.treeAdapter.getNamespaceURI(r),
      n = this.treeAdapter.getAttrList(r);
    return zp(t, u, n, a)
  }
  _reconstructActiveFormattingElements() {
    const t = this.activeFormattingElements.entries.length;
    if (t) {
      const r = this.activeFormattingElements.entries.findIndex(u => u.type === Je.Marker || this.openElements.contains(u.element)),
        a = r === -1 ? t - 1 : r - 1;
      for (let u = a; u >= 0; u--) {
        const n = this.activeFormattingElements.entries[u];
        this._insertElement(n.token, this.treeAdapter.getNamespaceURI(n.element)), n.element = this.openElements.current
      }
    }
  }
  _closeTableCell() {
    this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = y.IN_ROW
  }
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(d.P), this.openElements.popUntilTagNamePopped(d.P)
  }
  _resetInsertionMode() {
    for (let t = this.openElements.stackTop; t >= 0; t--) switch (t === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[t]) {
    case d.TR: {
      this.insertionMode = y.IN_ROW;
      return
    }
    case d.TBODY:
    case d.THEAD:
    case d.TFOOT: {
      this.insertionMode = y.IN_TABLE_BODY;
      return
    }
    case d.CAPTION: {
      this.insertionMode = y.IN_CAPTION;
      return
    }
    case d.COLGROUP: {
      this.insertionMode = y.IN_COLUMN_GROUP;
      return
    }
    case d.TABLE: {
      this.insertionMode = y.IN_TABLE;
      return
    }
    case d.BODY: {
      this.insertionMode = y.IN_BODY;
      return
    }
    case d.FRAMESET: {
      this.insertionMode = y.IN_FRAMESET;
      return
    }
    case d.SELECT: {
      this._resetInsertionModeForSelect(t);
      return
    }
    case d.TEMPLATE: {
      this.insertionMode = this.tmplInsertionModeStack[0];
      return
    }
    case d.HTML: {
      this.insertionMode = this.headElement ? y.AFTER_HEAD : y.BEFORE_HEAD;
      return
    }
    case d.TD:
    case d.TH: {
      if (t > 0) {
        this.insertionMode = y.IN_CELL;
        return
      }
      break
    }
    case d.HEAD: {
      if (t > 0) {
        this.insertionMode = y.IN_HEAD;
        return
      }
      break
    }
    }
    this.insertionMode = y.IN_BODY
  }
  _resetInsertionModeForSelect(t) {
    if (t > 0)
      for (let r = t - 1; r > 0; r--) {
        const a = this.openElements.tagIDs[r];
        if (a === d.TEMPLATE) break;
        if (a === d.TABLE) {
          this.insertionMode = y.IN_SELECT_IN_TABLE;
          return
        }
      }
    this.insertionMode = y.IN_SELECT
  }
  _isElementCausesFosterParenting(t) {
    return _d.has(t)
  }
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId)
  }
  _findFosterParentingLocation() {
    for (let t = this.openElements.stackTop; t >= 0; t--) {
      const r = this.openElements.items[t];
      switch (this.openElements.tagIDs[t]) {
      case d.TEMPLATE: {
        if (this.treeAdapter.getNamespaceURI(r) === Y.HTML) return {
          parent: this.treeAdapter.getTemplateContent(r),
          beforeElement: null
        };
        break
      }
      case d.TABLE: {
        const a = this.treeAdapter.getParentNode(r);
        return a ? {
          parent: a,
          beforeElement: r
        } : {
          parent: this.openElements.items[t - 1],
          beforeElement: null
        }
      }
      }
    }
    return {
      parent: this.openElements.items[0],
      beforeElement: null
    }
  }
  _fosterParentElement(t) {
    const r = this._findFosterParentingLocation();
    r.beforeElement ? this.treeAdapter.insertBefore(r.parent, t, r.beforeElement) : this.treeAdapter.appendChild(r.parent, t)
  }
  _isSpecialElement(t, r) {
    const a = this.treeAdapter.getNamespaceURI(t);
    return hp[a].has(r)
  }
  onCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      C3(this, t);
      return
    }
    switch (this.insertionMode) {
    case y.INITIAL: {
      mr(this, t);
      break
    }
    case y.BEFORE_HTML: {
      yr(this, t);
      break
    }
    case y.BEFORE_HEAD: {
      Cr(this, t);
      break
    }
    case y.IN_HEAD: {
      Sr(this, t);
      break
    }
    case y.IN_HEAD_NO_SCRIPT: {
      Nr(this, t);
      break
    }
    case y.AFTER_HEAD: {
      wr(this, t);
      break
    }
    case y.IN_BODY:
    case y.IN_CAPTION:
    case y.IN_CELL:
    case y.IN_TEMPLATE: {
      Sd(this, t);
      break
    }
    case y.TEXT:
    case y.IN_SELECT:
    case y.IN_SELECT_IN_TABLE: {
      this._insertCharacters(t);
      break
    }
    case y.IN_TABLE:
    case y.IN_TABLE_BODY:
    case y.IN_ROW: {
      Ku(this, t);
      break
    }
    case y.IN_TABLE_TEXT: {
      Ld(this, t);
      break
    }
    case y.IN_COLUMN_GROUP: {
      au(this, t);
      break
    }
    case y.AFTER_BODY: {
      uu(this, t);
      break
    }
    case y.AFTER_AFTER_BODY: {
      sa(this, t);
      break
    }
    }
  }
  onNullCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      y3(this, t);
      return
    }
    switch (this.insertionMode) {
    case y.INITIAL: {
      mr(this, t);
      break
    }
    case y.BEFORE_HTML: {
      yr(this, t);
      break
    }
    case y.BEFORE_HEAD: {
      Cr(this, t);
      break
    }
    case y.IN_HEAD: {
      Sr(this, t);
      break
    }
    case y.IN_HEAD_NO_SCRIPT: {
      Nr(this, t);
      break
    }
    case y.AFTER_HEAD: {
      wr(this, t);
      break
    }
    case y.TEXT: {
      this._insertCharacters(t);
      break
    }
    case y.IN_TABLE:
    case y.IN_TABLE_BODY:
    case y.IN_ROW: {
      Ku(this, t);
      break
    }
    case y.IN_COLUMN_GROUP: {
      au(this, t);
      break
    }
    case y.AFTER_BODY: {
      uu(this, t);
      break
    }
    case y.AFTER_AFTER_BODY: {
      sa(this, t);
      break
    }
    }
  }
  onComment(t) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      Tn(this, t);
      return
    }
    switch (this.insertionMode) {
    case y.INITIAL:
    case y.BEFORE_HTML:
    case y.BEFORE_HEAD:
    case y.IN_HEAD:
    case y.IN_HEAD_NO_SCRIPT:
    case y.AFTER_HEAD:
    case y.IN_BODY:
    case y.IN_TABLE:
    case y.IN_CAPTION:
    case y.IN_COLUMN_GROUP:
    case y.IN_TABLE_BODY:
    case y.IN_ROW:
    case y.IN_CELL:
    case y.IN_SELECT:
    case y.IN_SELECT_IN_TABLE:
    case y.IN_TEMPLATE:
    case y.IN_FRAMESET:
    case y.AFTER_FRAMESET: {
      Tn(this, t);
      break
    }
    case y.IN_TABLE_TEXT: {
      pr(this, t);
      break
    }
    case y.AFTER_BODY: {
      rb(this, t);
      break
    }
    case y.AFTER_AFTER_BODY:
    case y.AFTER_AFTER_FRAMESET: {
      ab(this, t);
      break
    }
    }
  }
  onDoctype(t) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
    case y.INITIAL: {
      ub(this, t);
      break
    }
    case y.BEFORE_HEAD:
    case y.IN_HEAD:
    case y.IN_HEAD_NO_SCRIPT:
    case y.AFTER_HEAD: {
      this._err(t, B.misplacedDoctype);
      break
    }
    case y.IN_TABLE_TEXT: {
      pr(this, t);
      break
    }
    }
  }
  onStartTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this._processStartTag(t), t.selfClosing && !t.ackSelfClosing && this._err(t, B.nonVoidHtmlElementStartTagWithTrailingSolidus)
  }
  _processStartTag(t) {
    this.shouldProcessStartTagTokenInForeignContent(t) ? S3(this, t) : this._startTagOutsideForeignContent(t)
  }
  _startTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
    case y.INITIAL: {
      mr(this, t);
      break
    }
    case y.BEFORE_HTML: {
      nb(this, t);
      break
    }
    case y.BEFORE_HEAD: {
      ib(this, t);
      break
    }
    case y.IN_HEAD: {
      Ke(this, t);
      break
    }
    case y.IN_HEAD_NO_SCRIPT: {
      db(this, t);
      break
    }
    case y.AFTER_HEAD: {
      fb(this, t);
      break
    }
    case y.IN_BODY: {
      De(this, t);
      break
    }
    case y.IN_TABLE: {
      Jt(this, t);
      break
    }
    case y.IN_TABLE_TEXT: {
      pr(this, t);
      break
    }
    case y.IN_CAPTION: {
      o3(this, t);
      break
    }
    case y.IN_COLUMN_GROUP: {
      e0(this, t);
      break
    }
    case y.IN_TABLE_BODY: {
      _u(this, t);
      break
    }
    case y.IN_ROW: {
      yu(this, t);
      break
    }
    case y.IN_CELL: {
      l3(this, t);
      break
    }
    case y.IN_SELECT: {
      Bd(this, t);
      break
    }
    case y.IN_SELECT_IN_TABLE: {
      h3(this, t);
      break
    }
    case y.IN_TEMPLATE: {
      p3(this, t);
      break
    }
    case y.AFTER_BODY: {
      x3(this, t);
      break
    }
    case y.IN_FRAMESET: {
      E3(this, t);
      break
    }
    case y.AFTER_FRAMESET: {
      A3(this, t);
      break
    }
    case y.AFTER_AFTER_BODY: {
      v3(this, t);
      break
    }
    case y.AFTER_AFTER_FRAMESET: {
      _3(this, t);
      break
    }
    }
  }
  onEndTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this.currentNotInHTML ? N3(this, t) : this._endTagOutsideForeignContent(t)
  }
  _endTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
    case y.INITIAL: {
      mr(this, t);
      break
    }
    case y.BEFORE_HTML: {
      sb(this, t);
      break
    }
    case y.BEFORE_HEAD: {
      ob(this, t);
      break
    }
    case y.IN_HEAD: {
      cb(this, t);
      break
    }
    case y.IN_HEAD_NO_SCRIPT: {
      lb(this, t);
      break
    }
    case y.AFTER_HEAD: {
      hb(this, t);
      break
    }
    case y.IN_BODY: {
      vu(this, t);
      break
    }
    case y.TEXT: {
      Jb(this, t);
      break
    }
    case y.IN_TABLE: {
      kr(this, t);
      break
    }
    case y.IN_TABLE_TEXT: {
      pr(this, t);
      break
    }
    case y.IN_CAPTION: {
      c3(this, t);
      break
    }
    case y.IN_COLUMN_GROUP: {
      d3(this, t);
      break
    }
    case y.IN_TABLE_BODY: {
      vn(this, t);
      break
    }
    case y.IN_ROW: {
      kd(this, t);
      break
    }
    case y.IN_CELL: {
      f3(this, t);
      break
    }
    case y.IN_SELECT: {
      Fd(this, t);
      break
    }
    case y.IN_SELECT_IN_TABLE: {
      m3(this, t);
      break
    }
    case y.IN_TEMPLATE: {
      b3(this, t);
      break
    }
    case y.AFTER_BODY: {
      Md(this, t);
      break
    }
    case y.IN_FRAMESET: {
      g3(this, t);
      break
    }
    case y.AFTER_FRAMESET: {
      T3(this, t);
      break
    }
    case y.AFTER_AFTER_BODY: {
      sa(this, t);
      break
    }
    }
  }
  onEof(t) {
    switch (this.insertionMode) {
    case y.INITIAL: {
      mr(this, t);
      break
    }
    case y.BEFORE_HTML: {
      yr(this, t);
      break
    }
    case y.BEFORE_HEAD: {
      Cr(this, t);
      break
    }
    case y.IN_HEAD: {
      Sr(this, t);
      break
    }
    case y.IN_HEAD_NO_SCRIPT: {
      Nr(this, t);
      break
    }
    case y.AFTER_HEAD: {
      wr(this, t);
      break
    }
    case y.IN_BODY:
    case y.IN_TABLE:
    case y.IN_CAPTION:
    case y.IN_COLUMN_GROUP:
    case y.IN_TABLE_BODY:
    case y.IN_ROW:
    case y.IN_CELL:
    case y.IN_SELECT:
    case y.IN_SELECT_IN_TABLE: {
      Dd(this, t);
      break
    }
    case y.TEXT: {
      Zb(this, t);
      break
    }
    case y.IN_TABLE_TEXT: {
      pr(this, t);
      break
    }
    case y.IN_TEMPLATE: {
      Pd(this, t);
      break
    }
    case y.AFTER_BODY:
    case y.IN_FRAMESET:
    case y.AFTER_FRAMESET:
    case y.AFTER_AFTER_BODY:
    case y.AFTER_AFTER_FRAMESET: {
      Zn(this, t);
      break
    }
    }
  }
  onWhitespaceCharacter(t) {
    if (this.skipNextNewLine && (this.skipNextNewLine = !1, t.chars.charCodeAt(0) === g.LINE_FEED)) {
      if (t.chars.length === 1) return;
      t.chars = t.chars.substr(1)
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(t);
      return
    }
    switch (this.insertionMode) {
    case y.IN_HEAD:
    case y.IN_HEAD_NO_SCRIPT:
    case y.AFTER_HEAD:
    case y.TEXT:
    case y.IN_COLUMN_GROUP:
    case y.IN_SELECT:
    case y.IN_SELECT_IN_TABLE:
    case y.IN_FRAMESET:
    case y.AFTER_FRAMESET: {
      this._insertCharacters(t);
      break
    }
    case y.IN_BODY:
    case y.IN_CAPTION:
    case y.IN_CELL:
    case y.IN_TEMPLATE:
    case y.AFTER_BODY:
    case y.AFTER_AFTER_BODY:
    case y.AFTER_AFTER_FRAMESET: {
      Cd(this, t);
      break
    }
    case y.IN_TABLE:
    case y.IN_TABLE_BODY:
    case y.IN_ROW: {
      Ku(this, t);
      break
    }
    case y.IN_TABLE_TEXT: {
      Od(this, t);
      break
    }
    }
  }
};

function Xp(e, t) {
  let r = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
  return r ? e.openElements.contains(r.element) ? e.openElements.hasInScope(t.tagID) || (r = null) : (e.activeFormattingElements.removeEntry(r), r = null) : Id(e, t), r
}

function Qp(e, t) {
  let r = null,
    a = e.openElements.stackTop;
  for (; a >= 0; a--) {
    const u = e.openElements.items[a];
    if (u === t.element) break;
    e._isSpecialElement(u, e.openElements.tagIDs[a]) && (r = u)
  }
  return r || (e.openElements.shortenToLength(Math.max(a, 0)), e.activeFormattingElements.removeEntry(t)), r
}

function Jp(e, t, r) {
  let a = t,
    u = e.openElements.getCommonAncestor(t);
  for (let n = 0, s = u; s !== r; n++, s = u) {
    u = e.openElements.getCommonAncestor(s);
    const i = e.activeFormattingElements.getElementEntry(s),
      o = i && n >= jp;
    !i || o ? (o && e.activeFormattingElements.removeEntry(i), e.openElements.remove(s)) : (s = Zp(e, i), a === t && (e.activeFormattingElements.bookmark = i), e.treeAdapter.detachNode(a), e.treeAdapter.appendChild(s, a), a = s)
  }
  return a
}

function Zp(e, t) {
  const r = e.treeAdapter.getNamespaceURI(t.element),
    a = e.treeAdapter.createElement(t.token.tagName, r, t.token.attrs);
  return e.openElements.replace(t.element, a), t.element = a, a
}

function eb(e, t, r) {
  const a = e.treeAdapter.getTagName(t),
    u = Au(a);
  if (e._isElementCausesFosterParenting(u)) e._fosterParentElement(r);
  else {
    const n = e.treeAdapter.getNamespaceURI(t);
    u === d.TEMPLATE && n === Y.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, r)
  }
}

function tb(e, t, r) {
  const a = e.treeAdapter.getNamespaceURI(r.element),
    {
      token: u
    } = r,
    n = e.treeAdapter.createElement(u.tagName, a, u.attrs);
  e._adoptNodes(t, n), e.treeAdapter.appendChild(t, n), e.activeFormattingElements.insertElementAfterBookmark(n, u), e.activeFormattingElements.removeEntry(r), e.openElements.remove(r.element), e.openElements.insertAfter(t, n, u.tagID)
}

function Jn(e, t) {
  for (let r = 0; r < Gp; r++) {
    const a = Xp(e, t);
    if (!a) break;
    const u = Qp(e, a);
    if (!u) break;
    e.activeFormattingElements.bookmark = a;
    const n = Jp(e, u, a.element),
      s = e.openElements.getCommonAncestor(a.element);
    e.treeAdapter.detachNode(n), s && eb(e, s, n), tb(e, u, a)
  }
}

function Tn(e, t) {
  e._appendCommentNode(t, e.openElements.currentTmplContentOrNode)
}

function rb(e, t) {
  e._appendCommentNode(t, e.openElements.items[0])
}

function ab(e, t) {
  e._appendCommentNode(t, e.document)
}

function Zn(e, t) {
  if (e.stopped = !0, t.location) {
    const r = e.fragmentContext ? 0 : 2;
    for (let a = e.openElements.stackTop; a >= r; a--) e._setEndLocation(e.openElements.items[a], t);
    if (!e.fragmentContext && e.openElements.stackTop >= 0) {
      const a = e.openElements.items[0],
        u = e.treeAdapter.getNodeSourceCodeLocation(a);
      if (u && !u.endTag && (e._setEndLocation(a, t), e.openElements.stackTop >= 1)) {
        const n = e.openElements.items[1],
          s = e.treeAdapter.getNodeSourceCodeLocation(n);
        s && !s.endTag && e._setEndLocation(n, t)
      }
    }
  }
}

function ub(e, t) {
  e._setDocumentType(t);
  const r = t.forceQuirks ? Ue.QUIRKS : kp(t);
  Rp(t) || e._err(t, B.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, r), e.insertionMode = y.BEFORE_HTML
}

function mr(e, t) {
  e._err(t, B.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, Ue.QUIRKS), e.insertionMode = y.BEFORE_HTML, e._processToken(t)
}

function nb(e, t) {
  t.tagID === d.HTML ? (e._insertElement(t, Y.HTML), e.insertionMode = y.BEFORE_HEAD) : yr(e, t)
}

function sb(e, t) {
  const r = t.tagID;
  (r === d.HTML || r === d.HEAD || r === d.BODY || r === d.BR) && yr(e, t)
}

function yr(e, t) {
  e._insertFakeRootElement(), e.insertionMode = y.BEFORE_HEAD, e._processToken(t)
}

function ib(e, t) {
  switch (t.tagID) {
  case d.HTML: {
    De(e, t);
    break
  }
  case d.HEAD: {
    e._insertElement(t, Y.HTML), e.headElement = e.openElements.current, e.insertionMode = y.IN_HEAD;
    break
  }
  default:
    Cr(e, t)
  }
}

function ob(e, t) {
  const r = t.tagID;
  r === d.HEAD || r === d.BODY || r === d.HTML || r === d.BR ? Cr(e, t) : e._err(t, B.endTagWithoutMatchingOpenElement)
}

function Cr(e, t) {
  e._insertFakeElement(O.HEAD, d.HEAD), e.headElement = e.openElements.current, e.insertionMode = y.IN_HEAD, e._processToken(t)
}

function Ke(e, t) {
  switch (t.tagID) {
  case d.HTML: {
    De(e, t);
    break
  }
  case d.BASE:
  case d.BASEFONT:
  case d.BGSOUND:
  case d.LINK:
  case d.META: {
    e._appendElement(t, Y.HTML), t.ackSelfClosing = !0;
    break
  }
  case d.TITLE: {
    e._switchToTextParsing(t, Be.RCDATA);
    break
  }
  case d.NOSCRIPT: {
    e.options.scriptingEnabled ? e._switchToTextParsing(t, Be.RAWTEXT) : (e._insertElement(t, Y.HTML), e.insertionMode = y.IN_HEAD_NO_SCRIPT);
    break
  }
  case d.NOFRAMES:
  case d.STYLE: {
    e._switchToTextParsing(t, Be.RAWTEXT);
    break
  }
  case d.SCRIPT: {
    e._switchToTextParsing(t, Be.SCRIPT_DATA);
    break
  }
  case d.TEMPLATE: {
    e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = y.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(y.IN_TEMPLATE);
    break
  }
  case d.HEAD: {
    e._err(t, B.misplacedStartTagForHeadElement);
    break
  }
  default:
    Sr(e, t)
  }
}

function cb(e, t) {
  switch (t.tagID) {
  case d.HEAD: {
    e.openElements.pop(), e.insertionMode = y.AFTER_HEAD;
    break
  }
  case d.BODY:
  case d.BR:
  case d.HTML: {
    Sr(e, t);
    break
  }
  case d.TEMPLATE: {
    Mt(e, t);
    break
  }
  default:
    e._err(t, B.endTagWithoutMatchingOpenElement)
  }
}

function Mt(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== d.TEMPLATE && e._err(t, B.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(d.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, B.endTagWithoutMatchingOpenElement)
}

function Sr(e, t) {
  e.openElements.pop(), e.insertionMode = y.AFTER_HEAD, e._processToken(t)
}

function db(e, t) {
  switch (t.tagID) {
  case d.HTML: {
    De(e, t);
    break
  }
  case d.BASEFONT:
  case d.BGSOUND:
  case d.HEAD:
  case d.LINK:
  case d.META:
  case d.NOFRAMES:
  case d.STYLE: {
    Ke(e, t);
    break
  }
  case d.NOSCRIPT: {
    e._err(t, B.nestedNoscriptInHead);
    break
  }
  default:
    Nr(e, t)
  }
}

function lb(e, t) {
  switch (t.tagID) {
  case d.NOSCRIPT: {
    e.openElements.pop(), e.insertionMode = y.IN_HEAD;
    break
  }
  case d.BR: {
    Nr(e, t);
    break
  }
  default:
    e._err(t, B.endTagWithoutMatchingOpenElement)
  }
}

function Nr(e, t) {
  const r = t.type === le.EOF ? B.openElementsLeftAfterEof : B.disallowedContentInNoscriptInHead;
  e._err(t, r), e.openElements.pop(), e.insertionMode = y.IN_HEAD, e._processToken(t)
}

function fb(e, t) {
  switch (t.tagID) {
  case d.HTML: {
    De(e, t);
    break
  }
  case d.BODY: {
    e._insertElement(t, Y.HTML), e.framesetOk = !1, e.insertionMode = y.IN_BODY;
    break
  }
  case d.FRAMESET: {
    e._insertElement(t, Y.HTML), e.insertionMode = y.IN_FRAMESET;
    break
  }
  case d.BASE:
  case d.BASEFONT:
  case d.BGSOUND:
  case d.LINK:
  case d.META:
  case d.NOFRAMES:
  case d.SCRIPT:
  case d.STYLE:
  case d.TEMPLATE:
  case d.TITLE: {
    e._err(t, B.abandonedHeadElementChild), e.openElements.push(e.headElement, d.HEAD), Ke(e, t), e.openElements.remove(e.headElement);
    break
  }
  case d.HEAD: {
    e._err(t, B.misplacedStartTagForHeadElement);
    break
  }
  default:
    wr(e, t)
  }
}

function hb(e, t) {
  switch (t.tagID) {
  case d.BODY:
  case d.HTML:
  case d.BR: {
    wr(e, t);
    break
  }
  case d.TEMPLATE: {
    Mt(e, t);
    break
  }
  default:
    e._err(t, B.endTagWithoutMatchingOpenElement)
  }
}

function wr(e, t) {
  e._insertFakeElement(O.BODY, d.BODY), e.insertionMode = y.IN_BODY, Tu(e, t)
}

function Tu(e, t) {
  switch (t.type) {
  case le.CHARACTER: {
    Sd(e, t);
    break
  }
  case le.WHITESPACE_CHARACTER: {
    Cd(e, t);
    break
  }
  case le.COMMENT: {
    Tn(e, t);
    break
  }
  case le.START_TAG: {
    De(e, t);
    break
  }
  case le.END_TAG: {
    vu(e, t);
    break
  }
  case le.EOF: {
    Dd(e, t);
    break
  }
  }
}

function Cd(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t)
}

function Sd(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1
}

function mb(e, t) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs)
}

function pb(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  r && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(r, t.attrs))
}

function bb(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && r && (e.treeAdapter.detachNode(r), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, Y.HTML), e.insertionMode = y.IN_FRAMESET)
}

function xb(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, Y.HTML)
}

function Eb(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && An.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, Y.HTML)
}

function gb(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, Y.HTML), e.skipNextNewLine = !0, e.framesetOk = !1
}

function Ab(e, t) {
  const r = e.openElements.tmplCount > 0;
  (!e.formElement || r) && (e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, Y.HTML), r || (e.formElement = e.openElements.current))
}

function Tb(e, t) {
  e.framesetOk = !1;
  const r = t.tagID;
  for (let a = e.openElements.stackTop; a >= 0; a--) {
    const u = e.openElements.tagIDs[a];
    if (r === d.LI && u === d.LI || (r === d.DD || r === d.DT) && (u === d.DD || u === d.DT)) {
      e.openElements.generateImpliedEndTagsWithExclusion(u), e.openElements.popUntilTagNamePopped(u);
      break
    }
    if (u !== d.ADDRESS && u !== d.DIV && u !== d.P && e._isSpecialElement(e.openElements.items[a], u)) break
  }
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, Y.HTML)
}

function vb(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, Y.HTML), e.tokenizer.state = Be.PLAINTEXT
}

function _b(e, t) {
  e.openElements.hasInScope(d.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, Y.HTML), e.framesetOk = !1
}

function yb(e, t) {
  const r = e.activeFormattingElements.getElementEntryInScopeWithTagName(O.A);
  r && (Jn(e, t), e.openElements.remove(r.element), e.activeFormattingElements.removeEntry(r)), e._reconstructActiveFormattingElements(), e._insertElement(t, Y.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t)
}

function Cb(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, Y.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t)
}

function Sb(e, t) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(d.NOBR) && (Jn(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, Y.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t)
}

function Nb(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, Y.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1
}

function wb(e, t) {
  e.treeAdapter.getDocumentMode(e.document) !== Ue.QUIRKS && e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, Y.HTML), e.framesetOk = !1, e.insertionMode = y.IN_TABLE
}

function Nd(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, Y.HTML), e.framesetOk = !1, t.ackSelfClosing = !0
}

function wd(e) {
  const t = pd(e, Lt.TYPE);
  return t != null && t.toLowerCase() === Vp
}

function Ib(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, Y.HTML), wd(t) || (e.framesetOk = !1), t.ackSelfClosing = !0
}

function Db(e, t) {
  e._appendElement(t, Y.HTML), t.ackSelfClosing = !0
}

function Ob(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._appendElement(t, Y.HTML), e.framesetOk = !1, t.ackSelfClosing = !0
}

function Lb(e, t) {
  t.tagName = O.IMG, t.tagID = d.IMG, Nd(e, t)
}

function Rb(e, t) {
  e._insertElement(t, Y.HTML), e.skipNextNewLine = !0, e.tokenizer.state = Be.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = y.TEXT
}

function kb(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, Be.RAWTEXT)
}

function Bb(e, t) {
  e.framesetOk = !1, e._switchToTextParsing(t, Be.RAWTEXT)
}

function xs(e, t) {
  e._switchToTextParsing(t, Be.RAWTEXT)
}

function Fb(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, Y.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === y.IN_TABLE || e.insertionMode === y.IN_CAPTION || e.insertionMode === y.IN_TABLE_BODY || e.insertionMode === y.IN_ROW || e.insertionMode === y.IN_CELL ? y.IN_SELECT_IN_TABLE : y.IN_SELECT
}

function Pb(e, t) {
  e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, Y.HTML)
}

function Mb(e, t) {
  e.openElements.hasInScope(d.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, Y.HTML)
}

function Ub(e, t) {
  e.openElements.hasInScope(d.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(d.RTC), e._insertElement(t, Y.HTML)
}

function Hb(e, t) {
  e._reconstructActiveFormattingElements(), Td(t), Qn(t), t.selfClosing ? e._appendElement(t, Y.MATHML) : e._insertElement(t, Y.MATHML), t.ackSelfClosing = !0
}

function $b(e, t) {
  e._reconstructActiveFormattingElements(), vd(t), Qn(t), t.selfClosing ? e._appendElement(t, Y.SVG) : e._insertElement(t, Y.SVG), t.ackSelfClosing = !0
}

function Es(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, Y.HTML)
}

function De(e, t) {
  switch (t.tagID) {
  case d.I:
  case d.S:
  case d.B:
  case d.U:
  case d.EM:
  case d.TT:
  case d.BIG:
  case d.CODE:
  case d.FONT:
  case d.SMALL:
  case d.STRIKE:
  case d.STRONG: {
    Cb(e, t);
    break
  }
  case d.A: {
    yb(e, t);
    break
  }
  case d.H1:
  case d.H2:
  case d.H3:
  case d.H4:
  case d.H5:
  case d.H6: {
    Eb(e, t);
    break
  }
  case d.P:
  case d.DL:
  case d.OL:
  case d.UL:
  case d.DIV:
  case d.DIR:
  case d.NAV:
  case d.MAIN:
  case d.MENU:
  case d.ASIDE:
  case d.CENTER:
  case d.FIGURE:
  case d.FOOTER:
  case d.HEADER:
  case d.HGROUP:
  case d.DIALOG:
  case d.DETAILS:
  case d.ADDRESS:
  case d.ARTICLE:
  case d.SEARCH:
  case d.SECTION:
  case d.SUMMARY:
  case d.FIELDSET:
  case d.BLOCKQUOTE:
  case d.FIGCAPTION: {
    xb(e, t);
    break
  }
  case d.LI:
  case d.DD:
  case d.DT: {
    Tb(e, t);
    break
  }
  case d.BR:
  case d.IMG:
  case d.WBR:
  case d.AREA:
  case d.EMBED:
  case d.KEYGEN: {
    Nd(e, t);
    break
  }
  case d.HR: {
    Ob(e, t);
    break
  }
  case d.RB:
  case d.RTC: {
    Mb(e, t);
    break
  }
  case d.RT:
  case d.RP: {
    Ub(e, t);
    break
  }
  case d.PRE:
  case d.LISTING: {
    gb(e, t);
    break
  }
  case d.XMP: {
    kb(e, t);
    break
  }
  case d.SVG: {
    $b(e, t);
    break
  }
  case d.HTML: {
    mb(e, t);
    break
  }
  case d.BASE:
  case d.LINK:
  case d.META:
  case d.STYLE:
  case d.TITLE:
  case d.SCRIPT:
  case d.BGSOUND:
  case d.BASEFONT:
  case d.TEMPLATE: {
    Ke(e, t);
    break
  }
  case d.BODY: {
    pb(e, t);
    break
  }
  case d.FORM: {
    Ab(e, t);
    break
  }
  case d.NOBR: {
    Sb(e, t);
    break
  }
  case d.MATH: {
    Hb(e, t);
    break
  }
  case d.TABLE: {
    wb(e, t);
    break
  }
  case d.INPUT: {
    Ib(e, t);
    break
  }
  case d.PARAM:
  case d.TRACK:
  case d.SOURCE: {
    Db(e, t);
    break
  }
  case d.IMAGE: {
    Lb(e, t);
    break
  }
  case d.BUTTON: {
    _b(e, t);
    break
  }
  case d.APPLET:
  case d.OBJECT:
  case d.MARQUEE: {
    Nb(e, t);
    break
  }
  case d.IFRAME: {
    Bb(e, t);
    break
  }
  case d.SELECT: {
    Fb(e, t);
    break
  }
  case d.OPTION:
  case d.OPTGROUP: {
    Pb(e, t);
    break
  }
  case d.NOEMBED:
  case d.NOFRAMES: {
    xs(e, t);
    break
  }
  case d.FRAMESET: {
    bb(e, t);
    break
  }
  case d.TEXTAREA: {
    Rb(e, t);
    break
  }
  case d.NOSCRIPT: {
    e.options.scriptingEnabled ? xs(e, t) : Es(e, t);
    break
  }
  case d.PLAINTEXT: {
    vb(e, t);
    break
  }
  case d.COL:
  case d.TH:
  case d.TD:
  case d.TR:
  case d.HEAD:
  case d.FRAME:
  case d.TBODY:
  case d.TFOOT:
  case d.THEAD:
  case d.CAPTION:
  case d.COLGROUP:
    break;
  default:
    Es(e, t)
  }
}

function qb(e, t) {
  if (e.openElements.hasInScope(d.BODY) && (e.insertionMode = y.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const r = e.openElements.tryPeekProperlyNestedBodyElement();
    r && e._setEndLocation(r, t)
  }
}

function Wb(e, t) {
  e.openElements.hasInScope(d.BODY) && (e.insertionMode = y.AFTER_BODY, Md(e, t))
}

function Yb(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r))
}

function zb(e) {
  const t = e.openElements.tmplCount > 0,
    {
      formElement: r
    } = e;
  t || (e.formElement = null), (r || t) && e.openElements.hasInScope(d.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(d.FORM) : r && e.openElements.remove(r))
}

function Vb(e) {
  e.openElements.hasInButtonScope(d.P) || e._insertFakeElement(O.P, d.P), e._closePElement()
}

function Gb(e) {
  e.openElements.hasInListItemScope(d.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(d.LI), e.openElements.popUntilTagNamePopped(d.LI))
}

function jb(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.popUntilTagNamePopped(r))
}

function Kb(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped())
}

function Xb(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r), e.activeFormattingElements.clearToLastMarker())
}

function Qb(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(O.BR, d.BR), e.openElements.pop(), e.framesetOk = !1
}

function Id(e, t) {
  const r = t.tagName,
    a = t.tagID;
  for (let u = e.openElements.stackTop; u > 0; u--) {
    const n = e.openElements.items[u],
      s = e.openElements.tagIDs[u];
    if (a === s && (a !== d.UNKNOWN || e.treeAdapter.getTagName(n) === r)) {
      e.openElements.generateImpliedEndTagsWithExclusion(a), e.openElements.stackTop >= u && e.openElements.shortenToLength(u);
      break
    }
    if (e._isSpecialElement(n, s)) break
  }
}

function vu(e, t) {
  switch (t.tagID) {
  case d.A:
  case d.B:
  case d.I:
  case d.S:
  case d.U:
  case d.EM:
  case d.TT:
  case d.BIG:
  case d.CODE:
  case d.FONT:
  case d.NOBR:
  case d.SMALL:
  case d.STRIKE:
  case d.STRONG: {
    Jn(e, t);
    break
  }
  case d.P: {
    Vb(e);
    break
  }
  case d.DL:
  case d.UL:
  case d.OL:
  case d.DIR:
  case d.DIV:
  case d.NAV:
  case d.PRE:
  case d.MAIN:
  case d.MENU:
  case d.ASIDE:
  case d.BUTTON:
  case d.CENTER:
  case d.FIGURE:
  case d.FOOTER:
  case d.HEADER:
  case d.HGROUP:
  case d.DIALOG:
  case d.ADDRESS:
  case d.ARTICLE:
  case d.DETAILS:
  case d.SEARCH:
  case d.SECTION:
  case d.SUMMARY:
  case d.LISTING:
  case d.FIELDSET:
  case d.BLOCKQUOTE:
  case d.FIGCAPTION: {
    Yb(e, t);
    break
  }
  case d.LI: {
    Gb(e);
    break
  }
  case d.DD:
  case d.DT: {
    jb(e, t);
    break
  }
  case d.H1:
  case d.H2:
  case d.H3:
  case d.H4:
  case d.H5:
  case d.H6: {
    Kb(e);
    break
  }
  case d.BR: {
    Qb(e);
    break
  }
  case d.BODY: {
    qb(e, t);
    break
  }
  case d.HTML: {
    Wb(e, t);
    break
  }
  case d.FORM: {
    zb(e);
    break
  }
  case d.APPLET:
  case d.OBJECT:
  case d.MARQUEE: {
    Xb(e, t);
    break
  }
  case d.TEMPLATE: {
    Mt(e, t);
    break
  }
  default:
    Id(e, t)
  }
}

function Dd(e, t) {
  e.tmplInsertionModeStack.length > 0 ? Pd(e, t) : Zn(e, t)
}

function Jb(e, t) {
  var r;
  t.tagID === d.SCRIPT && ((r = e.scriptHandler) === null || r === void 0 || r.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode
}

function Zb(e, t) {
  e._err(t, B.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t)
}

function Ku(e, t) {
  if (e.openElements.currentTagId !== void 0 && _d.has(e.openElements.currentTagId)) switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = y.IN_TABLE_TEXT, t.type) {
  case le.CHARACTER: {
    Ld(e, t);
    break
  }
  case le.WHITESPACE_CHARACTER: {
    Od(e, t);
    break
  }
  } else $r(e, t)
}

function e3(e, t) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, Y.HTML), e.insertionMode = y.IN_CAPTION
}

function t3(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, Y.HTML), e.insertionMode = y.IN_COLUMN_GROUP
}

function r3(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(O.COLGROUP, d.COLGROUP), e.insertionMode = y.IN_COLUMN_GROUP, e0(e, t)
}

function a3(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, Y.HTML), e.insertionMode = y.IN_TABLE_BODY
}

function u3(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(O.TBODY, d.TBODY), e.insertionMode = y.IN_TABLE_BODY, _u(e, t)
}

function n3(e, t) {
  e.openElements.hasInTableScope(d.TABLE) && (e.openElements.popUntilTagNamePopped(d.TABLE), e._resetInsertionMode(), e._processStartTag(t))
}

function s3(e, t) {
  wd(t) ? e._appendElement(t, Y.HTML) : $r(e, t), t.ackSelfClosing = !0
}

function i3(e, t) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, Y.HTML), e.formElement = e.openElements.current, e.openElements.pop())
}

function Jt(e, t) {
  switch (t.tagID) {
  case d.TD:
  case d.TH:
  case d.TR: {
    u3(e, t);
    break
  }
  case d.STYLE:
  case d.SCRIPT:
  case d.TEMPLATE: {
    Ke(e, t);
    break
  }
  case d.COL: {
    r3(e, t);
    break
  }
  case d.FORM: {
    i3(e, t);
    break
  }
  case d.TABLE: {
    n3(e, t);
    break
  }
  case d.TBODY:
  case d.TFOOT:
  case d.THEAD: {
    a3(e, t);
    break
  }
  case d.INPUT: {
    s3(e, t);
    break
  }
  case d.CAPTION: {
    e3(e, t);
    break
  }
  case d.COLGROUP: {
    t3(e, t);
    break
  }
  default:
    $r(e, t)
  }
}

function kr(e, t) {
  switch (t.tagID) {
  case d.TABLE: {
    e.openElements.hasInTableScope(d.TABLE) && (e.openElements.popUntilTagNamePopped(d.TABLE), e._resetInsertionMode());
    break
  }
  case d.TEMPLATE: {
    Mt(e, t);
    break
  }
  case d.BODY:
  case d.CAPTION:
  case d.COL:
  case d.COLGROUP:
  case d.HTML:
  case d.TBODY:
  case d.TD:
  case d.TFOOT:
  case d.TH:
  case d.THEAD:
  case d.TR:
    break;
  default:
    $r(e, t)
  }
}

function $r(e, t) {
  const r = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, Tu(e, t), e.fosterParentingEnabled = r
}

function Od(e, t) {
  e.pendingCharacterTokens.push(t)
}

function Ld(e, t) {
  e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0
}

function pr(e, t) {
  let r = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; r < e.pendingCharacterTokens.length; r++) $r(e, e.pendingCharacterTokens[r]);
  else
    for (; r < e.pendingCharacterTokens.length; r++) e._insertCharacters(e.pendingCharacterTokens[r]);
  e.insertionMode = e.originalInsertionMode, e._processToken(t)
}
const Rd = new Set([d.CAPTION, d.COL, d.COLGROUP, d.TBODY, d.TD, d.TFOOT, d.TH, d.THEAD, d.TR]);

function o3(e, t) {
  const r = t.tagID;
  Rd.has(r) ? e.openElements.hasInTableScope(d.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = y.IN_TABLE, Jt(e, t)) : De(e, t)
}

function c3(e, t) {
  const r = t.tagID;
  switch (r) {
  case d.CAPTION:
  case d.TABLE: {
    e.openElements.hasInTableScope(d.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = y.IN_TABLE, r === d.TABLE && kr(e, t));
    break
  }
  case d.BODY:
  case d.COL:
  case d.COLGROUP:
  case d.HTML:
  case d.TBODY:
  case d.TD:
  case d.TFOOT:
  case d.TH:
  case d.THEAD:
  case d.TR:
    break;
  default:
    vu(e, t)
  }
}

function e0(e, t) {
  switch (t.tagID) {
  case d.HTML: {
    De(e, t);
    break
  }
  case d.COL: {
    e._appendElement(t, Y.HTML), t.ackSelfClosing = !0;
    break
  }
  case d.TEMPLATE: {
    Ke(e, t);
    break
  }
  default:
    au(e, t)
  }
}

function d3(e, t) {
  switch (t.tagID) {
  case d.COLGROUP: {
    e.openElements.currentTagId === d.COLGROUP && (e.openElements.pop(), e.insertionMode = y.IN_TABLE);
    break
  }
  case d.TEMPLATE: {
    Mt(e, t);
    break
  }
  case d.COL:
    break;
  default:
    au(e, t)
  }
}

function au(e, t) {
  e.openElements.currentTagId === d.COLGROUP && (e.openElements.pop(), e.insertionMode = y.IN_TABLE, e._processToken(t))
}

function _u(e, t) {
  switch (t.tagID) {
  case d.TR: {
    e.openElements.clearBackToTableBodyContext(), e._insertElement(t, Y.HTML), e.insertionMode = y.IN_ROW;
    break
  }
  case d.TH:
  case d.TD: {
    e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(O.TR, d.TR), e.insertionMode = y.IN_ROW, yu(e, t);
    break
  }
  case d.CAPTION:
  case d.COL:
  case d.COLGROUP:
  case d.TBODY:
  case d.TFOOT:
  case d.THEAD: {
    e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE, Jt(e, t));
    break
  }
  default:
    Jt(e, t)
  }
}

function vn(e, t) {
  const r = t.tagID;
  switch (t.tagID) {
  case d.TBODY:
  case d.TFOOT:
  case d.THEAD: {
    e.openElements.hasInTableScope(r) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE);
    break
  }
  case d.TABLE: {
    e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE, kr(e, t));
    break
  }
  case d.BODY:
  case d.CAPTION:
  case d.COL:
  case d.COLGROUP:
  case d.HTML:
  case d.TD:
  case d.TH:
  case d.TR:
    break;
  default:
    kr(e, t)
  }
}

function yu(e, t) {
  switch (t.tagID) {
  case d.TH:
  case d.TD: {
    e.openElements.clearBackToTableRowContext(), e._insertElement(t, Y.HTML), e.insertionMode = y.IN_CELL, e.activeFormattingElements.insertMarker();
    break
  }
  case d.CAPTION:
  case d.COL:
  case d.COLGROUP:
  case d.TBODY:
  case d.TFOOT:
  case d.THEAD:
  case d.TR: {
    e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE_BODY, _u(e, t));
    break
  }
  default:
    Jt(e, t)
  }
}

function kd(e, t) {
  switch (t.tagID) {
  case d.TR: {
    e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE_BODY);
    break
  }
  case d.TABLE: {
    e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE_BODY, vn(e, t));
    break
  }
  case d.TBODY:
  case d.TFOOT:
  case d.THEAD: {
    (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(d.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = y.IN_TABLE_BODY, vn(e, t));
    break
  }
  case d.BODY:
  case d.CAPTION:
  case d.COL:
  case d.COLGROUP:
  case d.HTML:
  case d.TD:
  case d.TH:
    break;
  default:
    kr(e, t)
  }
}

function l3(e, t) {
  const r = t.tagID;
  Rd.has(r) ? (e.openElements.hasInTableScope(d.TD) || e.openElements.hasInTableScope(d.TH)) && (e._closeTableCell(), yu(e, t)) : De(e, t)
}

function f3(e, t) {
  const r = t.tagID;
  switch (r) {
  case d.TD:
  case d.TH: {
    e.openElements.hasInTableScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = y.IN_ROW);
    break
  }
  case d.TABLE:
  case d.TBODY:
  case d.TFOOT:
  case d.THEAD:
  case d.TR: {
    e.openElements.hasInTableScope(r) && (e._closeTableCell(), kd(e, t));
    break
  }
  case d.BODY:
  case d.CAPTION:
  case d.COL:
  case d.COLGROUP:
  case d.HTML:
    break;
  default:
    vu(e, t)
  }
}

function Bd(e, t) {
  switch (t.tagID) {
  case d.HTML: {
    De(e, t);
    break
  }
  case d.OPTION: {
    e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e._insertElement(t, Y.HTML);
    break
  }
  case d.OPTGROUP: {
    e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e.openElements.currentTagId === d.OPTGROUP && e.openElements.pop(), e._insertElement(t, Y.HTML);
    break
  }
  case d.HR: {
    e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e.openElements.currentTagId === d.OPTGROUP && e.openElements.pop(), e._appendElement(t, Y.HTML), t.ackSelfClosing = !0;
    break
  }
  case d.INPUT:
  case d.KEYGEN:
  case d.TEXTAREA:
  case d.SELECT: {
    e.openElements.hasInSelectScope(d.SELECT) && (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode(), t.tagID !== d.SELECT && e._processStartTag(t));
    break
  }
  case d.SCRIPT:
  case d.TEMPLATE: {
    Ke(e, t);
    break
  }
  }
}

function Fd(e, t) {
  switch (t.tagID) {
  case d.OPTGROUP: {
    e.openElements.stackTop > 0 && e.openElements.currentTagId === d.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === d.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === d.OPTGROUP && e.openElements.pop();
    break
  }
  case d.OPTION: {
    e.openElements.currentTagId === d.OPTION && e.openElements.pop();
    break
  }
  case d.SELECT: {
    e.openElements.hasInSelectScope(d.SELECT) && (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode());
    break
  }
  case d.TEMPLATE: {
    Mt(e, t);
    break
  }
  }
}

function h3(e, t) {
  const r = t.tagID;
  r === d.CAPTION || r === d.TABLE || r === d.TBODY || r === d.TFOOT || r === d.THEAD || r === d.TR || r === d.TD || r === d.TH ? (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : Bd(e, t)
}

function m3(e, t) {
  const r = t.tagID;
  r === d.CAPTION || r === d.TABLE || r === d.TBODY || r === d.TFOOT || r === d.THEAD || r === d.TR || r === d.TD || r === d.TH ? e.openElements.hasInTableScope(r) && (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : Fd(e, t)
}

function p3(e, t) {
  switch (t.tagID) {
  case d.BASE:
  case d.BASEFONT:
  case d.BGSOUND:
  case d.LINK:
  case d.META:
  case d.NOFRAMES:
  case d.SCRIPT:
  case d.STYLE:
  case d.TEMPLATE:
  case d.TITLE: {
    Ke(e, t);
    break
  }
  case d.CAPTION:
  case d.COLGROUP:
  case d.TBODY:
  case d.TFOOT:
  case d.THEAD: {
    e.tmplInsertionModeStack[0] = y.IN_TABLE, e.insertionMode = y.IN_TABLE, Jt(e, t);
    break
  }
  case d.COL: {
    e.tmplInsertionModeStack[0] = y.IN_COLUMN_GROUP, e.insertionMode = y.IN_COLUMN_GROUP, e0(e, t);
    break
  }
  case d.TR: {
    e.tmplInsertionModeStack[0] = y.IN_TABLE_BODY, e.insertionMode = y.IN_TABLE_BODY, _u(e, t);
    break
  }
  case d.TD:
  case d.TH: {
    e.tmplInsertionModeStack[0] = y.IN_ROW, e.insertionMode = y.IN_ROW, yu(e, t);
    break
  }
  default:
    e.tmplInsertionModeStack[0] = y.IN_BODY, e.insertionMode = y.IN_BODY, De(e, t)
  }
}

function b3(e, t) {
  t.tagID === d.TEMPLATE && Mt(e, t)
}

function Pd(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(d.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : Zn(e, t)
}

function x3(e, t) {
  t.tagID === d.HTML ? De(e, t) : uu(e, t)
}

function Md(e, t) {
  var r;
  if (t.tagID === d.HTML) {
    if (e.fragmentContext || (e.insertionMode = y.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === d.HTML) {
      e._setEndLocation(e.openElements.items[0], t);
      const a = e.openElements.items[1];
      a && !(!((r = e.treeAdapter.getNodeSourceCodeLocation(a)) === null || r === void 0) && r.endTag) && e._setEndLocation(a, t)
    }
  } else uu(e, t)
}

function uu(e, t) {
  e.insertionMode = y.IN_BODY, Tu(e, t)
}

function E3(e, t) {
  switch (t.tagID) {
  case d.HTML: {
    De(e, t);
    break
  }
  case d.FRAMESET: {
    e._insertElement(t, Y.HTML);
    break
  }
  case d.FRAME: {
    e._appendElement(t, Y.HTML), t.ackSelfClosing = !0;
    break
  }
  case d.NOFRAMES: {
    Ke(e, t);
    break
  }
  }
}

function g3(e, t) {
  t.tagID === d.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== d.FRAMESET && (e.insertionMode = y.AFTER_FRAMESET))
}

function A3(e, t) {
  switch (t.tagID) {
  case d.HTML: {
    De(e, t);
    break
  }
  case d.NOFRAMES: {
    Ke(e, t);
    break
  }
  }
}

function T3(e, t) {
  t.tagID === d.HTML && (e.insertionMode = y.AFTER_AFTER_FRAMESET)
}

function v3(e, t) {
  t.tagID === d.HTML ? De(e, t) : sa(e, t)
}

function sa(e, t) {
  e.insertionMode = y.IN_BODY, Tu(e, t)
}

function _3(e, t) {
  switch (t.tagID) {
  case d.HTML: {
    De(e, t);
    break
  }
  case d.NOFRAMES: {
    Ke(e, t);
    break
  }
  }
}

function y3(e, t) {
  t.chars = pe, e._insertCharacters(t)
}

function C3(e, t) {
  e._insertCharacters(t), e.framesetOk = !1
}

function Ud(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== Y.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current);) e.openElements.pop()
}

function S3(e, t) {
  if ($p(t)) Ud(e), e._startTagOutsideForeignContent(t);
  else {
    const r = e._getAdjustedCurrentElement(),
      a = e.treeAdapter.getNamespaceURI(r);
    a === Y.MATHML ? Td(t) : a === Y.SVG && (qp(t), vd(t)), Qn(t), t.selfClosing ? e._appendElement(t, a) : e._insertElement(t, a), t.ackSelfClosing = !0
  }
}

function N3(e, t) {
  if (t.tagID === d.P || t.tagID === d.BR) {
    Ud(e), e._endTagOutsideForeignContent(t);
    return
  }
  for (let r = e.openElements.stackTop; r > 0; r--) {
    const a = e.openElements.items[r];
    if (e.treeAdapter.getNamespaceURI(a) === Y.HTML) {
      e._endTagOutsideForeignContent(t);
      break
    }
    const u = e.treeAdapter.getTagName(a);
    if (u.toLowerCase() === t.tagName) {
      t.tagName = u, e.openElements.shortenToLength(r);
      break
    }
  }
}

function Hd(e, t) {
  return function (a) {
    let u, n = 0,
      s = "";
    for (; u = e.exec(a);) n !== u.index && (s += a.substring(n, u.index)), s += t.get(u[0].charCodeAt(0)), n = u.index + 1;
    return s + a.substring(n)
  }
}
const w3 = Hd(/["&\u00A0]/g, new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ])),
  I3 = Hd(/[&<>\u00A0]/g, new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ])),
  D3 = new Set([O.AREA, O.BASE, O.BASEFONT, O.BGSOUND, O.BR, O.COL, O.EMBED, O.FRAME, O.HR, O.IMG, O.INPUT, O.KEYGEN, O.LINK, O.META, O.PARAM, O.SOURCE, O.TRACK, O.WBR]);

function O3(e, t) {
  return t.treeAdapter.isElementNode(e) && t.treeAdapter.getNamespaceURI(e) === Y.HTML && D3.has(t.treeAdapter.getTagName(e))
}
const L3 = {
  treeAdapter: ct,
  scriptingEnabled: !0
};

function R3(e, t) {
  const r = {
    ...L3,
    ...t
  };
  return $d(e, r)
}

function k3(e, t) {
  let r = "";
  const a = t.treeAdapter.isElementNode(e) && t.treeAdapter.getTagName(e) === O.TEMPLATE && t.treeAdapter.getNamespaceURI(e) === Y.HTML ? t.treeAdapter.getTemplateContent(e) : e,
    u = t.treeAdapter.getChildNodes(a);
  if (u)
    for (const n of u) r += $d(n, t);
  return r
}

function $d(e, t) {
  return t.treeAdapter.isElementNode(e) ? B3(e, t) : t.treeAdapter.isTextNode(e) ? P3(e, t) : t.treeAdapter.isCommentNode(e) ? M3(e, t) : t.treeAdapter.isDocumentTypeNode(e) ? U3(e, t) : ""
}

function B3(e, t) {
  const r = t.treeAdapter.getTagName(e);
  return `<${r}${F3(e,t)}>${O3(e,t)?"":`${k3(e,t)}</${r}>`}`
}

function F3(e, {
  treeAdapter: t
}) {
  let r = "";
  for (const a of t.getAttrList(e)) {
    if (r += " ", a.namespace) switch (a.namespace) {
    case Y.XML: {
      r += `xml:${a.name}`;
      break
    }
    case Y.XMLNS: {
      a.name !== "xmlns" && (r += "xmlns:"), r += a.name;
      break
    }
    case Y.XLINK: {
      r += `xlink:${a.name}`;
      break
    }
    default:
      r += `${a.prefix}:${a.name}`
    } else r += a.name;
    r += `="${w3(a.value)}"`
  }
  return r
}

function P3(e, t) {
  const {
    treeAdapter: r
  } = t, a = r.getTextNodeContent(e), u = r.getParentNode(e), n = u && r.isElementNode(u) && r.getTagName(u);
  return n && r.getNamespaceURI(u) === Y.HTML && pp(n, t.scriptingEnabled) ? a : I3(a)
}

function M3(e, {
  treeAdapter: t
}) {
  return `<!--${t.getCommentNodeContent(e)}-->`
}

function U3(e, {
  treeAdapter: t
}) {
  return `<!DOCTYPE ${t.getDocumentTypeNodeName(e)}>`
}

function H3(e, t) {
  return yd.parse(e, t)
}

function $3(e, t, r) {
  typeof e == "string" && (r = t, t = e, e = null);
  const a = yd.getFragmentParser(e, r);
  return a.tokenizer.write(t, !0), a.getFragment()
}

function gs(e) {
  const t = e.includes('"') ? "'" : '"';
  return t + e + t
}

function q3(e, t, r) {
  let a = "!DOCTYPE ";
  return e && (a += e), t ? a += ` PUBLIC ${gs(t)}` : r && (a += " SYSTEM"), r && (a += ` ${gs(r)}`), a
}
const gt = {
  isCommentNode: pu,
  isElementNode: ae,
  isTextNode: rt,
  createDocument() {
    const e = new kt([]);
    return e["x-mode"] = Ue.NO_QUIRKS, e
  },
  createDocumentFragment() {
    return new kt([])
  },
  createElement(e, t, r) {
    const a = Object.create(null),
      u = Object.create(null),
      n = Object.create(null);
    for (let i = 0; i < r.length; i++) {
      const o = r[i].name;
      a[o] = r[i].value, u[o] = r[i].namespace, n[o] = r[i].prefix
    }
    const s = new Pn(e, a, []);
    return s.namespace = t, s["x-attribsNamespace"] = u, s["x-attribsPrefix"] = n, s
  },
  createCommentNode(e) {
    return new kn(e)
  },
  createTextNode(e) {
    return new Or(e)
  },
  appendChild(e, t) {
    const r = e.children[e.children.length - 1];
    r && (r.next = t, t.prev = r), e.children.push(t), t.parent = e
  },
  insertBefore(e, t, r) {
    const a = e.children.indexOf(r),
      {
        prev: u
      } = r;
    u && (u.next = t, t.prev = u), r.prev = t, t.next = r, e.children.splice(a, 0, t), t.parent = e
  },
  setTemplateContent(e, t) {
    gt.appendChild(e, t)
  },
  getTemplateContent(e) {
    return e.children[0]
  },
  setDocumentType(e, t, r, a) {
    const u = q3(t, r, a);
    let n = e.children.find(s => dn(s) && s.name === "!doctype");
    n ? n.data = u ?? null : (n = new Bn("!doctype", u), gt.appendChild(e, n)), n["x-name"] = t, n["x-publicId"] = r, n["x-systemId"] = a
  },
  setDocumentMode(e, t) {
    e["x-mode"] = t
  },
  getDocumentMode(e) {
    return e["x-mode"]
  },
  detachNode(e) {
    if (e.parent) {
      const t = e.parent.children.indexOf(e),
        {
          prev: r,
          next: a
        } = e;
      e.prev = null, e.next = null, r && (r.next = a), a && (a.prev = r), e.parent.children.splice(t, 1), e.parent = null
    }
  },
  insertText(e, t) {
    const r = e.children[e.children.length - 1];
    r && rt(r) ? r.data += t : gt.appendChild(e, gt.createTextNode(t))
  },
  insertTextBefore(e, t, r) {
    const a = e.children[e.children.indexOf(r) - 1];
    a && rt(a) ? a.data += t : gt.insertBefore(e, gt.createTextNode(t), r)
  },
  adoptAttributes(e, t) {
    for (let r = 0; r < t.length; r++) {
      const a = t[r].name;
      e.attribs[a] === void 0 && (e.attribs[a] = t[r].value, e["x-attribsNamespace"][a] = t[r].namespace, e["x-attribsPrefix"][a] = t[r].prefix)
    }
  },
  getFirstChild(e) {
    return e.children[0]
  },
  getChildNodes(e) {
    return e.children
  },
  getParentNode(e) {
    return e.parent
  },
  getAttrList(e) {
    return e.attributes
  },
  getTagName(e) {
    return e.name
  },
  getNamespaceURI(e) {
    return e.namespace
  },
  getTextNodeContent(e) {
    return e.data
  },
  getCommentNodeContent(e) {
    return e.data
  },
  getDocumentTypeNodeName(e) {
    var t;
    return (t = e["x-name"]) !== null && t !== void 0 ? t : ""
  },
  getDocumentTypeNodePublicId(e) {
    var t;
    return (t = e["x-publicId"]) !== null && t !== void 0 ? t : ""
  },
  getDocumentTypeNodeSystemId(e) {
    var t;
    return (t = e["x-systemId"]) !== null && t !== void 0 ? t : ""
  },
  isDocumentTypeNode(e) {
    return dn(e) && e.name === "!doctype"
  },
  setNodeSourceCodeLocation(e, t) {
    t && (e.startIndex = t.startOffset, e.endIndex = t.endOffset), e.sourceCodeLocation = t
  },
  getNodeSourceCodeLocation(e) {
    return e.sourceCodeLocation
  },
  updateNodeSourceCodeLocation(e, t) {
    t.endOffset != null && (e.endIndex = t.endOffset), e.sourceCodeLocation = {
      ...e.sourceCodeLocation,
      ...t
    }
  }
};

function W3(e, t, r, a) {
  const u = {
    scriptingEnabled: typeof t.scriptingEnabled == "boolean" ? t.scriptingEnabled : !0,
    treeAdapter: gt,
    sourceCodeLocationInfo: t.sourceCodeLocationInfo
  };
  return r ? H3(e, u) : $3(a, e, u)
}
const Y3 = {
  treeAdapter: gt
};

function z3(e) {
  const t = "length" in e ? e : [e];
  for (let a = 0; a < t.length; a += 1) {
    const u = t[a];
    Ft(u) && Array.prototype.splice.call(t, a, 1, ...u.children)
  }
  let r = "";
  for (let a = 0; a < t.length; a += 1) {
    const u = t[a];
    r += R3(u, Y3)
  }
  return r
}
var X;
(function (e) {
  e[e.Tab = 9] = "Tab", e[e.NewLine = 10] = "NewLine", e[e.FormFeed = 12] = "FormFeed", e[e.CarriageReturn = 13] = "CarriageReturn", e[e.Space = 32] = "Space", e[e.ExclamationMark = 33] = "ExclamationMark", e[e.Number = 35] = "Number", e[e.Amp = 38] = "Amp", e[e.SingleQuote = 39] = "SingleQuote", e[e.DoubleQuote = 34] = "DoubleQuote", e[e.Dash = 45] = "Dash", e[e.Slash = 47] = "Slash", e[e.Zero = 48] = "Zero", e[e.Nine = 57] = "Nine", e[e.Semi = 59] = "Semi", e[e.Lt = 60] = "Lt", e[e.Eq = 61] = "Eq", e[e.Gt = 62] = "Gt", e[e.Questionmark = 63] = "Questionmark", e[e.UpperA = 65] = "UpperA", e[e.LowerA = 97] = "LowerA", e[e.UpperF = 70] = "UpperF", e[e.LowerF = 102] = "LowerF", e[e.UpperZ = 90] = "UpperZ", e[e.LowerZ = 122] = "LowerZ", e[e.LowerX = 120] = "LowerX", e[e.OpeningSquareBracket = 91] = "OpeningSquareBracket"
})(X || (X = {}));
var W;
(function (e) {
  e[e.Text = 1] = "Text", e[e.BeforeTagName = 2] = "BeforeTagName", e[e.InTagName = 3] = "InTagName", e[e.InSelfClosingTag = 4] = "InSelfClosingTag", e[e.BeforeClosingTagName = 5] = "BeforeClosingTagName", e[e.InClosingTagName = 6] = "InClosingTagName", e[e.AfterClosingTagName = 7] = "AfterClosingTagName", e[e.BeforeAttributeName = 8] = "BeforeAttributeName", e[e.InAttributeName = 9] = "InAttributeName", e[e.AfterAttributeName = 10] = "AfterAttributeName", e[e.BeforeAttributeValue = 11] = "BeforeAttributeValue", e[e.InAttributeValueDq = 12] = "InAttributeValueDq", e[e.InAttributeValueSq = 13] = "InAttributeValueSq", e[e.InAttributeValueNq = 14] = "InAttributeValueNq", e[e.BeforeDeclaration = 15] = "BeforeDeclaration", e[e.InDeclaration = 16] = "InDeclaration", e[e.InProcessingInstruction = 17] = "InProcessingInstruction", e[e.BeforeComment = 18] = "BeforeComment", e[e.CDATASequence = 19] = "CDATASequence", e[e.InSpecialComment = 20] = "InSpecialComment", e[e.InCommentLike = 21] = "InCommentLike", e[e.BeforeSpecialS = 22] = "BeforeSpecialS", e[e.SpecialStartSequence = 23] = "SpecialStartSequence", e[e.InSpecialTag = 24] = "InSpecialTag", e[e.BeforeEntity = 25] = "BeforeEntity", e[e.BeforeNumericEntity = 26] = "BeforeNumericEntity", e[e.InNamedEntity = 27] = "InNamedEntity", e[e.InNumericEntity = 28] = "InNumericEntity", e[e.InHexEntity = 29] = "InHexEntity"
})(W || (W = {}));

function ot(e) {
  return e === X.Space || e === X.NewLine || e === X.Tab || e === X.FormFeed || e === X.CarriageReturn
}

function Zr(e) {
  return e === X.Slash || e === X.Gt || ot(e)
}

function As(e) {
  return e >= X.Zero && e <= X.Nine
}

function V3(e) {
  return e >= X.LowerA && e <= X.LowerZ || e >= X.UpperA && e <= X.UpperZ
}

function G3(e) {
  return e >= X.UpperA && e <= X.UpperF || e >= X.LowerA && e <= X.LowerF
}
var Ze;
(function (e) {
  e[e.NoValue = 0] = "NoValue", e[e.Unquoted = 1] = "Unquoted", e[e.Single = 2] = "Single", e[e.Double = 3] = "Double"
})(Ze || (Ze = {}));
const Re = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101])
};
class j3 {
  constructor({
    xmlMode: t = !1,
    decodeEntities: r = !0
  }, a) {
    this.cbs = a, this.state = W.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = W.Text, this.isSpecial = !1, this.running = !0, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.trieIndex = 0, this.trieCurrent = 0, this.entityResult = 0, this.entityExcess = 0, this.xmlMode = t, this.decodeEntities = r, this.entityTrie = t ? wc : Nc
  }
  reset() {
    this.state = W.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = W.Text, this.currentSequence = void 0, this.running = !0, this.offset = 0
  }
  write(t) {
    this.offset += this.buffer.length, this.buffer = t, this.parse()
  }
  end() {
    this.running && this.finish()
  }
  pause() {
    this.running = !1
  }
  resume() {
    this.running = !0, this.index < this.buffer.length + this.offset && this.parse()
  }
  getIndex() {
    return this.index
  }
  getSectionStart() {
    return this.sectionStart
  }
  stateText(t) {
    t === X.Lt || !this.decodeEntities && this.fastForwardTo(X.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = W.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && t === X.Amp && (this.state = W.BeforeEntity)
  }
  stateSpecialStartSequence(t) {
    const r = this.sequenceIndex === this.currentSequence.length;
    if (!(r ? Zr(t) : (t | 32) === this.currentSequence[this.sequenceIndex])) this.isSpecial = !1;
    else if (!r) {
      this.sequenceIndex++;
      return
    }
    this.sequenceIndex = 0, this.state = W.InTagName, this.stateInTagName(t)
  }
  stateInSpecialTag(t) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (t === X.Gt || ot(t)) {
        const r = this.index - this.currentSequence.length;
        if (this.sectionStart < r) {
          const a = this.index;
          this.index = r, this.cbs.ontext(this.sectionStart, r), this.index = a
        }
        this.isSpecial = !1, this.sectionStart = r + 2, this.stateInClosingTagName(t);
        return
      }
      this.sequenceIndex = 0
    }(t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === Re.TitleEnd ? this.decodeEntities && t === X.Amp && (this.state = W.BeforeEntity) : this.fastForwardTo(X.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === X.Lt)
  }
  stateCDATASequence(t) {
    t === Re.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === Re.Cdata.length && (this.state = W.InCommentLike, this.currentSequence = Re.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = W.InDeclaration, this.stateInDeclaration(t))
  }
  fastForwardTo(t) {
    for (; ++this.index < this.buffer.length + this.offset;)
      if (this.buffer.charCodeAt(this.index - this.offset) === t) return !0;
    return this.index = this.buffer.length + this.offset - 1, !1
  }
  stateInCommentLike(t) {
    t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === Re.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = W.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0)
  }
  isTagStartChar(t) {
    return this.xmlMode ? !Zr(t) : V3(t)
  }
  startSpecial(t, r) {
    this.isSpecial = !0, this.currentSequence = t, this.sequenceIndex = r, this.state = W.SpecialStartSequence
  }
  stateBeforeTagName(t) {
    if (t === X.ExclamationMark) this.state = W.BeforeDeclaration, this.sectionStart = this.index + 1;
    else if (t === X.Questionmark) this.state = W.InProcessingInstruction, this.sectionStart = this.index + 1;
    else if (this.isTagStartChar(t)) {
      const r = t | 32;
      this.sectionStart = this.index, !this.xmlMode && r === Re.TitleEnd[2] ? this.startSpecial(Re.TitleEnd, 3) : this.state = !this.xmlMode && r === Re.ScriptEnd[2] ? W.BeforeSpecialS : W.InTagName
    } else t === X.Slash ? this.state = W.BeforeClosingTagName : (this.state = W.Text, this.stateText(t))
  }
  stateInTagName(t) {
    Zr(t) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = W.BeforeAttributeName, this.stateBeforeAttributeName(t))
  }
  stateBeforeClosingTagName(t) {
    ot(t) || (t === X.Gt ? this.state = W.Text : (this.state = this.isTagStartChar(t) ? W.InClosingTagName : W.InSpecialComment, this.sectionStart = this.index))
  }
  stateInClosingTagName(t) {
    (t === X.Gt || ot(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = W.AfterClosingTagName, this.stateAfterClosingTagName(t))
  }
  stateAfterClosingTagName(t) {
    (t === X.Gt || this.fastForwardTo(X.Gt)) && (this.state = W.Text, this.baseState = W.Text, this.sectionStart = this.index + 1)
  }
  stateBeforeAttributeName(t) {
    t === X.Gt ? (this.cbs.onopentagend(this.index), this.isSpecial ? (this.state = W.InSpecialTag, this.sequenceIndex = 0) : this.state = W.Text, this.baseState = this.state, this.sectionStart = this.index + 1) : t === X.Slash ? this.state = W.InSelfClosingTag : ot(t) || (this.state = W.InAttributeName, this.sectionStart = this.index)
  }
  stateInSelfClosingTag(t) {
    t === X.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = W.Text, this.baseState = W.Text, this.sectionStart = this.index + 1, this.isSpecial = !1) : ot(t) || (this.state = W.BeforeAttributeName, this.stateBeforeAttributeName(t))
  }
  stateInAttributeName(t) {
    (t === X.Eq || Zr(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = -1, this.state = W.AfterAttributeName, this.stateAfterAttributeName(t))
  }
  stateAfterAttributeName(t) {
    t === X.Eq ? this.state = W.BeforeAttributeValue : t === X.Slash || t === X.Gt ? (this.cbs.onattribend(Ze.NoValue, this.index), this.state = W.BeforeAttributeName, this.stateBeforeAttributeName(t)) : ot(t) || (this.cbs.onattribend(Ze.NoValue, this.index), this.state = W.InAttributeName, this.sectionStart = this.index)
  }
  stateBeforeAttributeValue(t) {
    t === X.DoubleQuote ? (this.state = W.InAttributeValueDq, this.sectionStart = this.index + 1) : t === X.SingleQuote ? (this.state = W.InAttributeValueSq, this.sectionStart = this.index + 1) : ot(t) || (this.sectionStart = this.index, this.state = W.InAttributeValueNq, this.stateInAttributeValueNoQuotes(t))
  }
  handleInAttributeValue(t, r) {
    t === r || !this.decodeEntities && this.fastForwardTo(r) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(r === X.DoubleQuote ? Ze.Double : Ze.Single, this.index), this.state = W.BeforeAttributeName) : this.decodeEntities && t === X.Amp && (this.baseState = this.state, this.state = W.BeforeEntity)
  }
  stateInAttributeValueDoubleQuotes(t) {
    this.handleInAttributeValue(t, X.DoubleQuote)
  }
  stateInAttributeValueSingleQuotes(t) {
    this.handleInAttributeValue(t, X.SingleQuote)
  }
  stateInAttributeValueNoQuotes(t) {
    ot(t) || t === X.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(Ze.Unquoted, this.index), this.state = W.BeforeAttributeName, this.stateBeforeAttributeName(t)) : this.decodeEntities && t === X.Amp && (this.baseState = this.state, this.state = W.BeforeEntity)
  }
  stateBeforeDeclaration(t) {
    t === X.OpeningSquareBracket ? (this.state = W.CDATASequence, this.sequenceIndex = 0) : this.state = t === X.Dash ? W.BeforeComment : W.InDeclaration
  }
  stateInDeclaration(t) {
    (t === X.Gt || this.fastForwardTo(X.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = W.Text, this.sectionStart = this.index + 1)
  }
  stateInProcessingInstruction(t) {
    (t === X.Gt || this.fastForwardTo(X.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = W.Text, this.sectionStart = this.index + 1)
  }
  stateBeforeComment(t) {
    t === X.Dash ? (this.state = W.InCommentLike, this.currentSequence = Re.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = W.InDeclaration
  }
  stateInSpecialComment(t) {
    (t === X.Gt || this.fastForwardTo(X.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = W.Text, this.sectionStart = this.index + 1)
  }
  stateBeforeSpecialS(t) {
    const r = t | 32;
    r === Re.ScriptEnd[3] ? this.startSpecial(Re.ScriptEnd, 4) : r === Re.StyleEnd[3] ? this.startSpecial(Re.StyleEnd, 4) : (this.state = W.InTagName, this.stateInTagName(t))
  }
  stateBeforeEntity(t) {
    this.entityExcess = 1, this.entityResult = 0, t === X.Number ? this.state = W.BeforeNumericEntity : t === X.Amp || (this.trieIndex = 0, this.trieCurrent = this.entityTrie[0], this.state = W.InNamedEntity, this.stateInNamedEntity(t))
  }
  stateInNamedEntity(t) {
    if (this.entityExcess += 1, this.trieIndex = Oc(this.entityTrie, this.trieCurrent, this.trieIndex + 1, t), this.trieIndex < 0) {
      this.emitNamedEntity(), this.index--;
      return
    }
    this.trieCurrent = this.entityTrie[this.trieIndex];
    const r = this.trieCurrent & Ve.VALUE_LENGTH;
    if (r) {
      const a = (r >> 14) - 1;
      if (!this.allowLegacyEntity() && t !== X.Semi) this.trieIndex += a;
      else {
        const u = this.index - this.entityExcess + 1;
        u > this.sectionStart && this.emitPartial(this.sectionStart, u), this.entityResult = this.trieIndex, this.trieIndex += a, this.entityExcess = 0, this.sectionStart = this.index + 1, a === 0 && this.emitNamedEntity()
      }
    }
  }
  emitNamedEntity() {
    if (this.state = this.baseState, this.entityResult === 0) return;
    switch ((this.entityTrie[this.entityResult] & Ve.VALUE_LENGTH) >> 14) {
    case 1: {
      this.emitCodePoint(this.entityTrie[this.entityResult] & ~Ve.VALUE_LENGTH);
      break
    }
    case 2: {
      this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
      break
    }
    case 3:
      this.emitCodePoint(this.entityTrie[this.entityResult + 1]), this.emitCodePoint(this.entityTrie[this.entityResult + 2])
    }
  }
  stateBeforeNumericEntity(t) {
    (t | 32) === X.LowerX ? (this.entityExcess++, this.state = W.InHexEntity) : (this.state = W.InNumericEntity, this.stateInNumericEntity(t))
  }
  emitNumericEntity(t) {
    const r = this.index - this.entityExcess - 1;
    r + 2 + +(this.state === W.InHexEntity) !== this.index && (r > this.sectionStart && this.emitPartial(this.sectionStart, r), this.sectionStart = this.index + Number(t), this.emitCodePoint(Ic(this.entityResult))), this.state = this.baseState
  }
  stateInNumericEntity(t) {
    t === X.Semi ? this.emitNumericEntity(!0) : As(t) ? (this.entityResult = this.entityResult * 10 + (t - X.Zero), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--)
  }
  stateInHexEntity(t) {
    t === X.Semi ? this.emitNumericEntity(!0) : As(t) ? (this.entityResult = this.entityResult * 16 + (t - X.Zero), this.entityExcess++) : G3(t) ? (this.entityResult = this.entityResult * 16 + ((t | 32) - X.LowerA + 10), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--)
  }
  allowLegacyEntity() {
    return !this.xmlMode && (this.baseState === W.Text || this.baseState === W.InSpecialTag)
  }
  cleanup() {
    this.running && this.sectionStart !== this.index && (this.state === W.Text || this.state === W.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === W.InAttributeValueDq || this.state === W.InAttributeValueSq || this.state === W.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index))
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running
  }
  parse() {
    for (; this.shouldContinue();) {
      const t = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
      case W.Text: {
        this.stateText(t);
        break
      }
      case W.SpecialStartSequence: {
        this.stateSpecialStartSequence(t);
        break
      }
      case W.InSpecialTag: {
        this.stateInSpecialTag(t);
        break
      }
      case W.CDATASequence: {
        this.stateCDATASequence(t);
        break
      }
      case W.InAttributeValueDq: {
        this.stateInAttributeValueDoubleQuotes(t);
        break
      }
      case W.InAttributeName: {
        this.stateInAttributeName(t);
        break
      }
      case W.InCommentLike: {
        this.stateInCommentLike(t);
        break
      }
      case W.InSpecialComment: {
        this.stateInSpecialComment(t);
        break
      }
      case W.BeforeAttributeName: {
        this.stateBeforeAttributeName(t);
        break
      }
      case W.InTagName: {
        this.stateInTagName(t);
        break
      }
      case W.InClosingTagName: {
        this.stateInClosingTagName(t);
        break
      }
      case W.BeforeTagName: {
        this.stateBeforeTagName(t);
        break
      }
      case W.AfterAttributeName: {
        this.stateAfterAttributeName(t);
        break
      }
      case W.InAttributeValueSq: {
        this.stateInAttributeValueSingleQuotes(t);
        break
      }
      case W.BeforeAttributeValue: {
        this.stateBeforeAttributeValue(t);
        break
      }
      case W.BeforeClosingTagName: {
        this.stateBeforeClosingTagName(t);
        break
      }
      case W.AfterClosingTagName: {
        this.stateAfterClosingTagName(t);
        break
      }
      case W.BeforeSpecialS: {
        this.stateBeforeSpecialS(t);
        break
      }
      case W.InAttributeValueNq: {
        this.stateInAttributeValueNoQuotes(t);
        break
      }
      case W.InSelfClosingTag: {
        this.stateInSelfClosingTag(t);
        break
      }
      case W.InDeclaration: {
        this.stateInDeclaration(t);
        break
      }
      case W.BeforeDeclaration: {
        this.stateBeforeDeclaration(t);
        break
      }
      case W.BeforeComment: {
        this.stateBeforeComment(t);
        break
      }
      case W.InProcessingInstruction: {
        this.stateInProcessingInstruction(t);
        break
      }
      case W.InNamedEntity: {
        this.stateInNamedEntity(t);
        break
      }
      case W.BeforeEntity: {
        this.stateBeforeEntity(t);
        break
      }
      case W.InHexEntity: {
        this.stateInHexEntity(t);
        break
      }
      case W.InNumericEntity: {
        this.stateInNumericEntity(t);
        break
      }
      default:
        this.stateBeforeNumericEntity(t)
      }
      this.index++
    }
    this.cleanup()
  }
  finish() {
    this.state === W.InNamedEntity && this.emitNamedEntity(), this.sectionStart < this.index && this.handleTrailingData(), this.cbs.onend()
  }
  handleTrailingData() {
    const t = this.buffer.length + this.offset;
    this.state === W.InCommentLike ? this.currentSequence === Re.CdataEnd ? this.cbs.oncdata(this.sectionStart, t, 0) : this.cbs.oncomment(this.sectionStart, t, 0) : this.state === W.InNumericEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === W.InHexEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === W.InTagName || this.state === W.BeforeAttributeName || this.state === W.BeforeAttributeValue || this.state === W.AfterAttributeName || this.state === W.InAttributeName || this.state === W.InAttributeValueSq || this.state === W.InAttributeValueDq || this.state === W.InAttributeValueNq || this.state === W.InClosingTagName || this.cbs.ontext(this.sectionStart, t)
  }
  emitPartial(t, r) {
    this.baseState !== W.Text && this.baseState !== W.InSpecialTag ? this.cbs.onattribdata(t, r) : this.cbs.ontext(t, r)
  }
  emitCodePoint(t) {
    this.baseState !== W.Text && this.baseState !== W.InSpecialTag ? this.cbs.onattribentity(t) : this.cbs.ontextentity(t)
  }
}
const Vt = new Set(["input", "option", "optgroup", "select", "button", "datalist", "textarea"]),
  me = new Set(["p"]),
  Ts = new Set(["thead", "tbody"]),
  vs = new Set(["dd", "dt"]),
  _s = new Set(["rt", "rp"]),
  K3 = new Map([
    ["tr", new Set(["tr", "th", "td"])],
    ["th", new Set(["th"])],
    ["td", new Set(["thead", "th", "td"])],
    ["body", new Set(["head", "link", "script"])],
    ["li", new Set(["li"])],
    ["p", me],
    ["h1", me],
    ["h2", me],
    ["h3", me],
    ["h4", me],
    ["h5", me],
    ["h6", me],
    ["select", Vt],
    ["input", Vt],
    ["output", Vt],
    ["button", Vt],
    ["datalist", Vt],
    ["textarea", Vt],
    ["option", new Set(["option"])],
    ["optgroup", new Set(["optgroup", "option"])],
    ["dd", vs],
    ["dt", vs],
    ["address", me],
    ["article", me],
    ["aside", me],
    ["blockquote", me],
    ["details", me],
    ["div", me],
    ["dl", me],
    ["fieldset", me],
    ["figcaption", me],
    ["figure", me],
    ["footer", me],
    ["form", me],
    ["header", me],
    ["hr", me],
    ["main", me],
    ["nav", me],
    ["ol", me],
    ["pre", me],
    ["section", me],
    ["table", me],
    ["ul", me],
    ["rt", _s],
    ["rp", _s],
    ["tbody", Ts],
    ["tfoot", Ts]
  ]),
  X3 = new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"]),
  ys = new Set(["math", "svg"]),
  Cs = new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignobject", "desc", "title"]),
  Q3 = /\s|\//;
class J3 {
  constructor(t, r = {}) {
    var a, u, n, s, i;
    this.options = r, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.foreignContext = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1, this.cbs = t ?? {}, this.lowerCaseTagNames = (a = r.lowerCaseTags) !== null && a !== void 0 ? a : !r.xmlMode, this.lowerCaseAttributeNames = (u = r.lowerCaseAttributeNames) !== null && u !== void 0 ? u : !r.xmlMode, this.tokenizer = new((n = r.Tokenizer) !== null && n !== void 0 ? n : j3)(this.options, this), (i = (s = this.cbs).onparserinit) === null || i === void 0 || i.call(s, this)
  }
  ontext(t, r) {
    var a, u;
    const n = this.getSlice(t, r);
    this.endIndex = r - 1, (u = (a = this.cbs).ontext) === null || u === void 0 || u.call(a, n), this.startIndex = r
  }
  ontextentity(t) {
    var r, a;
    const u = this.tokenizer.getSectionStart();
    this.endIndex = u - 1, (a = (r = this.cbs).ontext) === null || a === void 0 || a.call(r, ln(t)), this.startIndex = u
  }
  isVoidElement(t) {
    return !this.options.xmlMode && X3.has(t)
  }
  onopentagname(t, r) {
    this.endIndex = r;
    let a = this.getSlice(t, r);
    this.lowerCaseTagNames && (a = a.toLowerCase()), this.emitOpenTag(a)
  }
  emitOpenTag(t) {
    var r, a, u, n;
    this.openTagStart = this.startIndex, this.tagname = t;
    const s = !this.options.xmlMode && K3.get(t);
    if (s)
      for (; this.stack.length > 0 && s.has(this.stack[this.stack.length - 1]);) {
        const i = this.stack.pop();
        (a = (r = this.cbs).onclosetag) === null || a === void 0 || a.call(r, i, !0)
      }
    this.isVoidElement(t) || (this.stack.push(t), ys.has(t) ? this.foreignContext.push(!0) : Cs.has(t) && this.foreignContext.push(!1)), (n = (u = this.cbs).onopentagname) === null || n === void 0 || n.call(u, t), this.cbs.onopentag && (this.attribs = {})
  }
  endOpenTag(t) {
    var r, a;
    this.startIndex = this.openTagStart, this.attribs && ((a = (r = this.cbs).onopentag) === null || a === void 0 || a.call(r, this.tagname, this.attribs, t), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = ""
  }
  onopentagend(t) {
    this.endIndex = t, this.endOpenTag(!1), this.startIndex = t + 1
  }
  onclosetag(t, r) {
    var a, u, n, s, i, o;
    this.endIndex = r;
    let c = this.getSlice(t, r);
    if (this.lowerCaseTagNames && (c = c.toLowerCase()), (ys.has(c) || Cs.has(c)) && this.foreignContext.pop(), this.isVoidElement(c)) !this.options.xmlMode && c === "br" && ((u = (a = this.cbs).onopentagname) === null || u === void 0 || u.call(a, "br"), (s = (n = this.cbs).onopentag) === null || s === void 0 || s.call(n, "br", {}, !0), (o = (i = this.cbs).onclosetag) === null || o === void 0 || o.call(i, "br", !1));
    else {
      const l = this.stack.lastIndexOf(c);
      if (l !== -1)
        if (this.cbs.onclosetag) {
          let h = this.stack.length - l;
          for (; h--;) this.cbs.onclosetag(this.stack.pop(), h !== 0)
        } else this.stack.length = l;
      else !this.options.xmlMode && c === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0))
    }
    this.startIndex = r + 1
  }
  onselfclosingtag(t) {
    this.endIndex = t, this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1] ? (this.closeCurrentTag(!1), this.startIndex = t + 1) : this.onopentagend(t)
  }
  closeCurrentTag(t) {
    var r, a;
    const u = this.tagname;
    this.endOpenTag(t), this.stack[this.stack.length - 1] === u && ((a = (r = this.cbs).onclosetag) === null || a === void 0 || a.call(r, u, !t), this.stack.pop())
  }
  onattribname(t, r) {
    this.startIndex = t;
    const a = this.getSlice(t, r);
    this.attribname = this.lowerCaseAttributeNames ? a.toLowerCase() : a
  }
  onattribdata(t, r) {
    this.attribvalue += this.getSlice(t, r)
  }
  onattribentity(t) {
    this.attribvalue += ln(t)
  }
  onattribend(t, r) {
    var a, u;
    this.endIndex = r, (u = (a = this.cbs).onattribute) === null || u === void 0 || u.call(a, this.attribname, this.attribvalue, t === Ze.Double ? '"' : t === Ze.Single ? "'" : t === Ze.NoValue ? void 0 : null), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = ""
  }
  getInstructionName(t) {
    const r = t.search(Q3);
    let a = r < 0 ? t : t.substr(0, r);
    return this.lowerCaseTagNames && (a = a.toLowerCase()), a
  }
  ondeclaration(t, r) {
    this.endIndex = r;
    const a = this.getSlice(t, r);
    if (this.cbs.onprocessinginstruction) {
      const u = this.getInstructionName(a);
      this.cbs.onprocessinginstruction(`!${u}`, `!${a}`)
    }
    this.startIndex = r + 1
  }
  onprocessinginstruction(t, r) {
    this.endIndex = r;
    const a = this.getSlice(t, r);
    if (this.cbs.onprocessinginstruction) {
      const u = this.getInstructionName(a);
      this.cbs.onprocessinginstruction(`?${u}`, `?${a}`)
    }
    this.startIndex = r + 1
  }
  oncomment(t, r, a) {
    var u, n, s, i;
    this.endIndex = r, (n = (u = this.cbs).oncomment) === null || n === void 0 || n.call(u, this.getSlice(t, r - a)), (i = (s = this.cbs).oncommentend) === null || i === void 0 || i.call(s), this.startIndex = r + 1
  }
  oncdata(t, r, a) {
    var u, n, s, i, o, c, l, h, f, m;
    this.endIndex = r;
    const p = this.getSlice(t, r - a);
    this.options.xmlMode || this.options.recognizeCDATA ? ((n = (u = this.cbs).oncdatastart) === null || n === void 0 || n.call(u), (i = (s = this.cbs).ontext) === null || i === void 0 || i.call(s, p), (c = (o = this.cbs).oncdataend) === null || c === void 0 || c.call(o)) : ((h = (l = this.cbs).oncomment) === null || h === void 0 || h.call(l, `[CDATA[${p}]]`), (m = (f = this.cbs).oncommentend) === null || m === void 0 || m.call(f)), this.startIndex = r + 1
  }
  onend() {
    var t, r;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let a = this.stack.length; a > 0; this.cbs.onclosetag(this.stack[--a], !0));
    }(r = (t = this.cbs).onend) === null || r === void 0 || r.call(t)
  }
  reset() {
    var t, r, a, u;
    (r = (t = this.cbs).onreset) === null || r === void 0 || r.call(t), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (u = (a = this.cbs).onparserinit) === null || u === void 0 || u.call(a, this), this.buffers.length = 0, this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1
  }
  parseComplete(t) {
    this.reset(), this.end(t)
  }
  getSlice(t, r) {
    for (; t - this.bufferOffset >= this.buffers[0].length;) this.shiftBuffer();
    let a = this.buffers[0].slice(t - this.bufferOffset, r - this.bufferOffset);
    for (; r - this.bufferOffset > this.buffers[0].length;) this.shiftBuffer(), a += this.buffers[0].slice(0, r - this.bufferOffset);
    return a
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift()
  }
  write(t) {
    var r, a;
    if (this.ended) {
      (a = (r = this.cbs).onerror) === null || a === void 0 || a.call(r, new Error(".write() after done!"));
      return
    }
    this.buffers.push(t), this.tokenizer.running && (this.tokenizer.write(t), this.writeIndex++)
  }
  end(t) {
    var r, a;
    if (this.ended) {
      (a = (r = this.cbs).onerror) === null || a === void 0 || a.call(r, new Error(".end() after done!"));
      return
    }
    t && this.write(t), this.ended = !0, this.tokenizer.end()
  }
  pause() {
    this.tokenizer.pause()
  }
  resume() {
    for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length;) this.tokenizer.write(this.buffers[this.writeIndex++]);
    this.ended && this.tokenizer.end()
  }
  parseChunk(t) {
    this.write(t)
  }
  done(t) {
    this.end(t)
  }
}

function Z3(e, t) {
  const r = new K1(void 0, t);
  return new J3(r, t).end(e), r.root
}
const e6 = A2((e, t, r, a) => t.xmlMode || t._useHtmlParser2 ? Z3(e, t) : W3(e, t, r, a)),
  be = X2(e6, (e, t) => t.xmlMode || t._useHtmlParser2 ? bu(e, t) : z3(e));
be([]);
let t6 = e => crypto.getRandomValues(new Uint8Array(e)),
  r6 = (e, t, r) => {
    let a = (2 << Math.log(e.length - 1) / Math.LN2) - 1,
      u = -~(1.6 * a * t / e.length);
    return (n = t) => {
      let s = "";
      for (;;) {
        let i = r(u),
          o = u | 0;
        for (; o--;)
          if (s += e[i[o] & a] || "", s.length === n) return s
      }
    }
  },
  a6 = (e, t = 21) => r6(e, t, t6);
var It = {},
  Ss;

function u6() {
  if (Ss) return It;
  Ss = 1, Object.defineProperty(It, "__esModule", {
    value: !0
  }), It.unpack = It.detect = void 0;

  function e(a) {
    return a.replace(" ", "").startsWith("eval(function(p,a,c,k,e,")
  }
  It.detect = e;

  function t(a) {
    let {
      payload: u,
      symtab: n,
      radix: s,
      count: i
    } = l(a);
    if (i != n.length) throw Error("Malformed p.a.c.k.e.r. symtab.");
    let o;
    try {
      o = new r(s)
    } catch {
      throw Error("Unknown p.a.c.k.e.r. encoding.")
    }

    function c(f) {
      const m = f;
      let p;
      return s == 1 ? p = n[parseInt(m)] : p = n[o.unbase(m)], p || m
    }
    return a = u.replace(/\b\w+\b/g, c), a;

    function l(f) {
      const m = [/}\('(.*)', *(\d+|\[\]), *(\d+), *'(.*)'\.split\('\|'\), *(\d+), *(.*)\)\)/, /}\('(.*)', *(\d+|\[\]), *(\d+), *'(.*)'\.split\('\|'\)/];
      for (const p of m) {
        const b = p.exec(f);
        if (b) {
          let x = b;
          x[2] == "[]";
          try {
            return {
              payload: x[1],
              symtab: x[4].split("|"),
              radix: parseInt(x[2]),
              count: parseInt(x[3])
            }
          } catch {
            throw Error("Corrupted p.a.c.k.e.r. data.")
          }
        }
      }
      throw Error("Could not make sense of p.a.c.k.e.r data (unexpected code structure)")
    }

    function h(f) {
      return f
    }
  }
  It.unpack = t;
  class r {
    constructor(u) {
      if (this.ALPHABET = {
          62: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
          95: "' !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'"
        }, this.dictionary = {}, this.base = u, 36 < u && u < 62 && (this.ALPHABET[u] = this.ALPHABET[u] || this.ALPHABET[62].substr(0, u)), 2 <= u && u <= 36) this.unbase = n => parseInt(n, u);
      else {
        try {
          [...this.ALPHABET[u]].forEach((n, s) => {
            this.dictionary[n] = s
          })
        } catch {
          throw Error("Unsupported base encoding.")
        }
        this.unbase = this._dictunbaser
      }
    }
    _dictunbaser(u) {
      let n = 0;
      return [...u].reverse().forEach((s, i) => {
        n = n + Math.pow(this.base, i) * this.dictionary[s]
      }), n
    }
  }
  return It
}
var t0 = u6(),
  ia = {
    exports: {}
  };

function n6(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')
}
var oa = {
  exports: {}
};
const s6 = {},
  i6 = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: s6
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  o6 = Ql(i6);
var c6 = oa.exports,
  Ns;

function ce() {
  return Ns || (Ns = 1, (function (e, t) {
    (function (r, a) {
      e.exports = a()
    })(c6, function () {
      var r = r || (function (a, u) {
        var n;
        if (typeof window < "u" && window.crypto && (n = window.crypto), typeof self < "u" && self.crypto && (n = self.crypto), typeof globalThis < "u" && globalThis.crypto && (n = globalThis.crypto), !n && typeof window < "u" && window.msCrypto && (n = window.msCrypto), !n && typeof Nu < "u" && Nu.crypto && (n = Nu.crypto), !n && typeof n6 == "function") try {
          n = o6
        } catch {}
        var s = function () {
            if (n) {
              if (typeof n.getRandomValues == "function") try {
                return n.getRandomValues(new Uint32Array(1))[0]
              } catch {}
              if (typeof n.randomBytes == "function") try {
                return n.randomBytes(4).readInt32LE()
              } catch {}
            }
            throw new Error("Native crypto module could not be used to get secure random number.")
          },
          i = Object.create || (function () {
            function E() {}
            return function (A) {
              var v;
              return E.prototype = A, v = new E, E.prototype = null, v
            }
          })(),
          o = {},
          c = o.lib = {},
          l = c.Base = (function () {
            return {
              extend: function (E) {
                var A = i(this);
                return E && A.mixIn(E), (!A.hasOwnProperty("init") || this.init === A.init) && (A.init = function () {
                  A.$super.init.apply(this, arguments)
                }), A.init.prototype = A, A.$super = this, A
              },
              create: function () {
                var E = this.extend();
                return E.init.apply(E, arguments), E
              },
              init: function () {},
              mixIn: function (E) {
                for (var A in E) E.hasOwnProperty(A) && (this[A] = E[A]);
                E.hasOwnProperty("toString") && (this.toString = E.toString)
              },
              clone: function () {
                return this.init.prototype.extend(this)
              }
            }
          })(),
          h = c.WordArray = l.extend({
            init: function (E, A) {
              E = this.words = E || [], A != u ? this.sigBytes = A : this.sigBytes = E.length * 4
            },
            toString: function (E) {
              return (E || m).stringify(this)
            },
            concat: function (E) {
              var A = this.words,
                v = E.words,
                C = this.sigBytes,
                N = E.sigBytes;
              if (this.clamp(), C % 4)
                for (var D = 0; D < N; D++) {
                  var w = v[D >>> 2] >>> 24 - D % 4 * 8 & 255;
                  A[C + D >>> 2] |= w << 24 - (C + D) % 4 * 8
                } else
                  for (var U = 0; U < N; U += 4) A[C + U >>> 2] = v[U >>> 2];
              return this.sigBytes += N, this
            },
            clamp: function () {
              var E = this.words,
                A = this.sigBytes;
              E[A >>> 2] &= 4294967295 << 32 - A % 4 * 8, E.length = a.ceil(A / 4)
            },
            clone: function () {
              var E = l.clone.call(this);
              return E.words = this.words.slice(0), E
            },
            random: function (E) {
              for (var A = [], v = 0; v < E; v += 4) A.push(s());
              return new h.init(A, E)
            }
          }),
          f = o.enc = {},
          m = f.Hex = {
            stringify: function (E) {
              for (var A = E.words, v = E.sigBytes, C = [], N = 0; N < v; N++) {
                var D = A[N >>> 2] >>> 24 - N % 4 * 8 & 255;
                C.push((D >>> 4).toString(16)), C.push((D & 15).toString(16))
              }
              return C.join("")
            },
            parse: function (E) {
              for (var A = E.length, v = [], C = 0; C < A; C += 2) v[C >>> 3] |= parseInt(E.substr(C, 2), 16) << 24 - C % 8 * 4;
              return new h.init(v, A / 2)
            }
          },
          p = f.Latin1 = {
            stringify: function (E) {
              for (var A = E.words, v = E.sigBytes, C = [], N = 0; N < v; N++) {
                var D = A[N >>> 2] >>> 24 - N % 4 * 8 & 255;
                C.push(String.fromCharCode(D))
              }
              return C.join("")
            },
            parse: function (E) {
              for (var A = E.length, v = [], C = 0; C < A; C++) v[C >>> 2] |= (E.charCodeAt(C) & 255) << 24 - C % 4 * 8;
              return new h.init(v, A)
            }
          },
          b = f.Utf8 = {
            stringify: function (E) {
              try {
                return decodeURIComponent(escape(p.stringify(E)))
              } catch {
                throw new Error("Malformed UTF-8 data")
              }
            },
            parse: function (E) {
              return p.parse(unescape(encodeURIComponent(E)))
            }
          },
          x = c.BufferedBlockAlgorithm = l.extend({
            reset: function () {
              this._data = new h.init, this._nDataBytes = 0
            },
            _append: function (E) {
              typeof E == "string" && (E = b.parse(E)), this._data.concat(E), this._nDataBytes += E.sigBytes
            },
            _process: function (E) {
              var A, v = this._data,
                C = v.words,
                N = v.sigBytes,
                D = this.blockSize,
                w = D * 4,
                U = N / w;
              E ? U = a.ceil(U) : U = a.max((U | 0) - this._minBufferSize, 0);
              var I = U * D,
                L = a.min(I * 4, N);
              if (I) {
                for (var M = 0; M < I; M += D) this._doProcessBlock(C, M);
                A = C.splice(0, I), v.sigBytes -= L
              }
              return new h.init(A, L)
            },
            clone: function () {
              var E = l.clone.call(this);
              return E._data = this._data.clone(), E
            },
            _minBufferSize: 0
          });
        c.Hasher = x.extend({
          cfg: l.extend(),
          init: function (E) {
            this.cfg = this.cfg.extend(E), this.reset()
          },
          reset: function () {
            x.reset.call(this), this._doReset()
          },
          update: function (E) {
            return this._append(E), this._process(), this
          },
          finalize: function (E) {
            E && this._append(E);
            var A = this._doFinalize();
            return A
          },
          blockSize: 16,
          _createHelper: function (E) {
            return function (A, v) {
              return new E.init(v).finalize(A)
            }
          },
          _createHmacHelper: function (E) {
            return function (A, v) {
              return new T.HMAC.init(E, v).finalize(A)
            }
          }
        });
        var T = o.algo = {};
        return o
      })(Math);
      return r
    })
  })(oa)), oa.exports
}
var ca = {
    exports: {}
  },
  d6 = ca.exports,
  ws;

function Cu() {
  return ws || (ws = 1, (function (e, t) {
    (function (r, a) {
      e.exports = a(ce())
    })(d6, function (r) {
      return (function (a) {
        var u = r,
          n = u.lib,
          s = n.Base,
          i = n.WordArray,
          o = u.x64 = {};
        o.Word = s.extend({
          init: function (c, l) {
            this.high = c, this.low = l
          }
        }), o.WordArray = s.extend({
          init: function (c, l) {
            c = this.words = c || [], l != a ? this.sigBytes = l : this.sigBytes = c.length * 8
          },
          toX32: function () {
            for (var c = this.words, l = c.length, h = [], f = 0; f < l; f++) {
              var m = c[f];
              h.push(m.high), h.push(m.low)
            }
            return i.create(h, this.sigBytes)
          },
          clone: function () {
            for (var c = s.clone.call(this), l = c.words = this.words.slice(0), h = l.length, f = 0; f < h; f++) l[f] = l[f].clone();
            return c
          }
        })
      })(), r
    })
  })(ca)), ca.exports
}
var da = {
    exports: {}
  },
  l6 = da.exports,
  Is;

function f6() {
  return Is || (Is = 1, (function (e, t) {
    (function (r, a) {
      e.exports = a(ce())
    })(l6, function (r) {
      return (function () {
        if (typeof ArrayBuffer == "function") {
          var a = r,
            u = a.lib,
            n = u.WordArray,
            s = n.init,
            i = n.init = function (o) {
              if (o instanceof ArrayBuffer && (o = new Uint8Array(o)), (o instanceof Int8Array || typeof Uint8ClampedArray < "u" && o instanceof Uint8ClampedArray || o instanceof Int16Array || o instanceof Uint16Array || o instanceof Int32Array || o instanceof Uint32Array || o instanceof Float32Array || o instanceof Float64Array) && (o = new Uint8Array(o.buffer, o.byteOffset, o.byteLength)), o instanceof Uint8Array) {
                for (var c = o.byteLength, l = [], h = 0; h < c; h++) l[h >>> 2] |= o[h] << 24 - h % 4 * 8;
                s.call(this, l, c)
              } else s.apply(this, arguments)
            };
          i.prototype = n
        }
      })(), r.lib.WordArray
    })
  })(da)), da.exports
}
var la = {
    exports: {}
  },
  h6 = la.exports,
  Ds;

function m6() {
  return Ds || (Ds = 1, (function (e, t) {
    (function (r, a) {
      e.exports = a(ce())
    })(h6, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.WordArray,
          s = a.enc;
        s.Utf16 = s.Utf16BE = {
          stringify: function (o) {
            for (var c = o.words, l = o.sigBytes, h = [], f = 0; f < l; f += 2) {
              var m = c[f >>> 2] >>> 16 - f % 4 * 8 & 65535;
              h.push(String.fromCharCode(m))
            }
            return h.join("")
          },
          parse: function (o) {
            for (var c = o.length, l = [], h = 0; h < c; h++) l[h >>> 1] |= o.charCodeAt(h) << 16 - h % 2 * 16;
            return n.create(l, c * 2)
          }
        }, s.Utf16LE = {
          stringify: function (o) {
            for (var c = o.words, l = o.sigBytes, h = [], f = 0; f < l; f += 2) {
              var m = i(c[f >>> 2] >>> 16 - f % 4 * 8 & 65535);
              h.push(String.fromCharCode(m))
            }
            return h.join("")
          },
          parse: function (o) {
            for (var c = o.length, l = [], h = 0; h < c; h++) l[h >>> 1] |= i(o.charCodeAt(h) << 16 - h % 2 * 16);
            return n.create(l, c * 2)
          }
        };

        function i(o) {
          return o << 8 & 4278255360 | o >>> 8 & 16711935
        }
      })(), r.enc.Utf16
    })
  })(la)), la.exports
}
var fa = {
    exports: {}
  },
  p6 = fa.exports,
  Os;

function Ut() {
  return Os || (Os = 1, (function (e, t) {
    (function (r, a) {
      e.exports = a(ce())
    })(p6, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.WordArray,
          s = a.enc;
        s.Base64 = {
          stringify: function (o) {
            var c = o.words,
              l = o.sigBytes,
              h = this._map;
            o.clamp();
            for (var f = [], m = 0; m < l; m += 3)
              for (var p = c[m >>> 2] >>> 24 - m % 4 * 8 & 255, b = c[m + 1 >>> 2] >>> 24 - (m + 1) % 4 * 8 & 255, x = c[m + 2 >>> 2] >>> 24 - (m + 2) % 4 * 8 & 255, T = p << 16 | b << 8 | x, E = 0; E < 4 && m + E * .75 < l; E++) f.push(h.charAt(T >>> 6 * (3 - E) & 63));
            var A = h.charAt(64);
            if (A)
              for (; f.length % 4;) f.push(A);
            return f.join("")
          },
          parse: function (o) {
            var c = o.length,
              l = this._map,
              h = this._reverseMap;
            if (!h) {
              h = this._reverseMap = [];
              for (var f = 0; f < l.length; f++) h[l.charCodeAt(f)] = f
            }
            var m = l.charAt(64);
            if (m) {
              var p = o.indexOf(m);
              p !== -1 && (c = p)
            }
            return i(o, c, h)
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };

        function i(o, c, l) {
          for (var h = [], f = 0, m = 0; m < c; m++)
            if (m % 4) {
              var p = l[o.charCodeAt(m - 1)] << m % 4 * 2,
                b = l[o.charCodeAt(m)] >>> 6 - m % 4 * 2,
                x = p | b;
              h[f >>> 2] |= x << 24 - f % 4 * 8, f++
            } return n.create(h, f)
        }
      })(), r.enc.Base64
    })
  })(fa)), fa.exports
}
var ha = {
    exports: {}
  },
  b6 = ha.exports,
  Ls;

function x6() {
  return Ls || (Ls = 1, (function (e, t) {
    (function (r, a) {
      e.exports = a(ce())
    })(b6, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.WordArray,
          s = a.enc;
        s.Base64url = {
          stringify: function (o, c) {
            c === void 0 && (c = !0);
            var l = o.words,
              h = o.sigBytes,
              f = c ? this._safe_map : this._map;
            o.clamp();
            for (var m = [], p = 0; p < h; p += 3)
              for (var b = l[p >>> 2] >>> 24 - p % 4 * 8 & 255, x = l[p + 1 >>> 2] >>> 24 - (p + 1) % 4 * 8 & 255, T = l[p + 2 >>> 2] >>> 24 - (p + 2) % 4 * 8 & 255, E = b << 16 | x << 8 | T, A = 0; A < 4 && p + A * .75 < h; A++) m.push(f.charAt(E >>> 6 * (3 - A) & 63));
            var v = f.charAt(64);
            if (v)
              for (; m.length % 4;) m.push(v);
            return m.join("")
          },
          parse: function (o, c) {
            c === void 0 && (c = !0);
            var l = o.length,
              h = c ? this._safe_map : this._map,
              f = this._reverseMap;
            if (!f) {
              f = this._reverseMap = [];
              for (var m = 0; m < h.length; m++) f[h.charCodeAt(m)] = m
            }
            var p = h.charAt(64);
            if (p) {
              var b = o.indexOf(p);
              b !== -1 && (l = b)
            }
            return i(o, l, f)
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
        };

        function i(o, c, l) {
          for (var h = [], f = 0, m = 0; m < c; m++)
            if (m % 4) {
              var p = l[o.charCodeAt(m - 1)] << m % 4 * 2,
                b = l[o.charCodeAt(m)] >>> 6 - m % 4 * 2,
                x = p | b;
              h[f >>> 2] |= x << 24 - f % 4 * 8, f++
            } return n.create(h, f)
        }
      })(), r.enc.Base64url
    })
  })(ha)), ha.exports
}
var ma = {
    exports: {}
  },
  E6 = ma.exports,
  Rs;

function Ht() {
  return Rs || (Rs = 1, (function (e, t) {
    (function (r, a) {
      e.exports = a(ce())
    })(E6, function (r) {
      return (function (a) {
        var u = r,
          n = u.lib,
          s = n.WordArray,
          i = n.Hasher,
          o = u.algo,
          c = [];
        (function () {
          for (var b = 0; b < 64; b++) c[b] = a.abs(a.sin(b + 1)) * 4294967296 | 0
        })();
        var l = o.MD5 = i.extend({
          _doReset: function () {
            this._hash = new s.init([1732584193, 4023233417, 2562383102, 271733878])
          },
          _doProcessBlock: function (b, x) {
            for (var T = 0; T < 16; T++) {
              var E = x + T,
                A = b[E];
              b[E] = (A << 8 | A >>> 24) & 16711935 | (A << 24 | A >>> 8) & 4278255360
            }
            var v = this._hash.words,
              C = b[x + 0],
              N = b[x + 1],
              D = b[x + 2],
              w = b[x + 3],
              U = b[x + 4],
              I = b[x + 5],
              L = b[x + 6],
              M = b[x + 7],
              F = b[x + 8],
              V = b[x + 9],
              K = b[x + 10],
              Z = b[x + 11],
              re = b[x + 12],
              R = b[x + 13],
              G = b[x + 14],
              j = b[x + 15],
              P = v[0],
              $ = v[1],
              q = v[2],
              H = v[3];
            P = h(P, $, q, H, C, 7, c[0]), H = h(H, P, $, q, N, 12, c[1]), q = h(q, H, P, $, D, 17, c[2]), $ = h($, q, H, P, w, 22, c[3]), P = h(P, $, q, H, U, 7, c[4]), H = h(H, P, $, q, I, 12, c[5]), q = h(q, H, P, $, L, 17, c[6]), $ = h($, q, H, P, M, 22, c[7]), P = h(P, $, q, H, F, 7, c[8]), H = h(H, P, $, q, V, 12, c[9]), q = h(q, H, P, $, K, 17, c[10]), $ = h($, q, H, P, Z, 22, c[11]), P = h(P, $, q, H, re, 7, c[12]), H = h(H, P, $, q, R, 12, c[13]), q = h(q, H, P, $, G, 17, c[14]), $ = h($, q, H, P, j, 22, c[15]), P = f(P, $, q, H, N, 5, c[16]), H = f(H, P, $, q, L, 9, c[17]), q = f(q, H, P, $, Z, 14, c[18]), $ = f($, q, H, P, C, 20, c[19]), P = f(P, $, q, H, I, 5, c[20]), H = f(H, P, $, q, K, 9, c[21]), q = f(q, H, P, $, j, 14, c[22]), $ = f($, q, H, P, U, 20, c[23]), P = f(P, $, q, H, V, 5, c[24]), H = f(H, P, $, q, G, 9, c[25]), q = f(q, H, P, $, w, 14, c[26]), $ = f($, q, H, P, F, 20, c[27]), P = f(P, $, q, H, R, 5, c[28]), H = f(H, P, $, q, D, 9, c[29]), q = f(q, H, P, $, M, 14, c[30]), $ = f($, q, H, P, re, 20, c[31]), P = m(P, $, q, H, I, 4, c[32]), H = m(H, P, $, q, F, 11, c[33]), q = m(q, H, P, $, Z, 16, c[34]), $ = m($, q, H, P, G, 23, c[35]), P = m(P, $, q, H, N, 4, c[36]), H = m(H, P, $, q, U, 11, c[37]), q = m(q, H, P, $, M, 16, c[38]), $ = m($, q, H, P, K, 23, c[39]), P = m(P, $, q, H, R, 4, c[40]), H = m(H, P, $, q, C, 11, c[41]), q = m(q, H, P, $, w, 16, c[42]), $ = m($, q, H, P, L, 23, c[43]), P = m(P, $, q, H, V, 4, c[44]), H = m(H, P, $, q, re, 11, c[45]), q = m(q, H, P, $, j, 16, c[46]), $ = m($, q, H, P, D, 23, c[47]), P = p(P, $, q, H, C, 6, c[48]), H = p(H, P, $, q, M, 10, c[49]), q = p(q, H, P, $, G, 15, c[50]), $ = p($, q, H, P, I, 21, c[51]), P = p(P, $, q, H, re, 6, c[52]), H = p(H, P, $, q, w, 10, c[53]), q = p(q, H, P, $, K, 15, c[54]), $ = p($, q, H, P, N, 21, c[55]), P = p(P, $, q, H, F, 6, c[56]), H = p(H, P, $, q, j, 10, c[57]), q = p(q, H, P, $, L, 15, c[58]), $ = p($, q, H, P, R, 21, c[59]), P = p(P, $, q, H, U, 6, c[60]), H = p(H, P, $, q, Z, 10, c[61]), q = p(q, H, P, $, D, 15, c[62]), $ = p($, q, H, P, V, 21, c[63]), v[0] = v[0] + P | 0, v[1] = v[1] + $ | 0, v[2] = v[2] + q | 0, v[3] = v[3] + H | 0
          },
          _doFinalize: function () {
            var b = this._data,
              x = b.words,
              T = this._nDataBytes * 8,
              E = b.sigBytes * 8;
            x[E >>> 5] |= 128 << 24 - E % 32;
            var A = a.floor(T / 4294967296),
              v = T;
            x[(E + 64 >>> 9 << 4) + 15] = (A << 8 | A >>> 24) & 16711935 | (A << 24 | A >>> 8) & 4278255360, x[(E + 64 >>> 9 << 4) + 14] = (v << 8 | v >>> 24) & 16711935 | (v << 24 | v >>> 8) & 4278255360, b.sigBytes = (x.length + 1) * 4, this._process();
            for (var C = this._hash, N = C.words, D = 0; D < 4; D++) {
              var w = N[D];
              N[D] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360
            }
            return C
          },
          clone: function () {
            var b = i.clone.call(this);
            return b._hash = this._hash.clone(), b
          }
        });

        function h(b, x, T, E, A, v, C) {
          var N = b + (x & T | ~x & E) + A + C;
          return (N << v | N >>> 32 - v) + x
        }

        function f(b, x, T, E, A, v, C) {
          var N = b + (x & E | T & ~E) + A + C;
          return (N << v | N >>> 32 - v) + x
        }

        function m(b, x, T, E, A, v, C) {
          var N = b + (x ^ T ^ E) + A + C;
          return (N << v | N >>> 32 - v) + x
        }

        function p(b, x, T, E, A, v, C) {
          var N = b + (T ^ (x | ~E)) + A + C;
          return (N << v | N >>> 32 - v) + x
        }
        u.MD5 = i._createHelper(l), u.HmacMD5 = i._createHmacHelper(l)
      })(Math), r.MD5
    })
  })(ma)), ma.exports
}
var pa = {
    exports: {}
  },
  g6 = pa.exports,
  ks;

function qd() {
  return ks || (ks = 1, (function (e, t) {
    (function (r, a) {
      e.exports = a(ce())
    })(g6, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.WordArray,
          s = u.Hasher,
          i = a.algo,
          o = [],
          c = i.SHA1 = s.extend({
            _doReset: function () {
              this._hash = new n.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
            },
            _doProcessBlock: function (l, h) {
              for (var f = this._hash.words, m = f[0], p = f[1], b = f[2], x = f[3], T = f[4], E = 0; E < 80; E++) {
                if (E < 16) o[E] = l[h + E] | 0;
                else {
                  var A = o[E - 3] ^ o[E - 8] ^ o[E - 14] ^ o[E - 16];
                  o[E] = A << 1 | A >>> 31
                }
                var v = (m << 5 | m >>> 27) + T + o[E];
                E < 20 ? v += (p & b | ~p & x) + 1518500249 : E < 40 ? v += (p ^ b ^ x) + 1859775393 : E < 60 ? v += (p & b | p & x | b & x) - 1894007588 : v += (p ^ b ^ x) - 899497514, T = x, x = b, b = p << 30 | p >>> 2, p = m, m = v
              }
              f[0] = f[0] + m | 0, f[1] = f[1] + p | 0, f[2] = f[2] + b | 0, f[3] = f[3] + x | 0, f[4] = f[4] + T | 0
            },
            _doFinalize: function () {
              var l = this._data,
                h = l.words,
                f = this._nDataBytes * 8,
                m = l.sigBytes * 8;
              return h[m >>> 5] |= 128 << 24 - m % 32, h[(m + 64 >>> 9 << 4) + 14] = Math.floor(f / 4294967296), h[(m + 64 >>> 9 << 4) + 15] = f, l.sigBytes = h.length * 4, this._process(), this._hash
            },
            clone: function () {
              var l = s.clone.call(this);
              return l._hash = this._hash.clone(), l
            }
          });
        a.SHA1 = s._createHelper(c), a.HmacSHA1 = s._createHmacHelper(c)
      })(), r.SHA1
    })
  })(pa)), pa.exports
}
var ba = {
    exports: {}
  },
  A6 = ba.exports,
  Bs;

function r0() {
  return Bs || (Bs = 1, (function (e, t) {
    (function (r, a) {
      e.exports = a(ce())
    })(A6, function (r) {
      return (function (a) {
        var u = r,
          n = u.lib,
          s = n.WordArray,
          i = n.Hasher,
          o = u.algo,
          c = [],
          l = [];
        (function () {
          function m(T) {
            for (var E = a.sqrt(T), A = 2; A <= E; A++)
              if (!(T % A)) return !1;
            return !0
          }

          function p(T) {
            return (T - (T | 0)) * 4294967296 | 0
          }
          for (var b = 2, x = 0; x < 64;) m(b) && (x < 8 && (c[x] = p(a.pow(b, 1 / 2))), l[x] = p(a.pow(b, 1 / 3)), x++), b++
        })();
        var h = [],
          f = o.SHA256 = i.extend({
            _doReset: function () {
              this._hash = new s.init(c.slice(0))
            },
            _doProcessBlock: function (m, p) {
              for (var b = this._hash.words, x = b[0], T = b[1], E = b[2], A = b[3], v = b[4], C = b[5], N = b[6], D = b[7], w = 0; w < 64; w++) {
                if (w < 16) h[w] = m[p + w] | 0;
                else {
                  var U = h[w - 15],
                    I = (U << 25 | U >>> 7) ^ (U << 14 | U >>> 18) ^ U >>> 3,
                    L = h[w - 2],
                    M = (L << 15 | L >>> 17) ^ (L << 13 | L >>> 19) ^ L >>> 10;
                  h[w] = I + h[w - 7] + M + h[w - 16]
                }
                var F = v & C ^ ~v & N,
                  V = x & T ^ x & E ^ T & E,
                  K = (x << 30 | x >>> 2) ^ (x << 19 | x >>> 13) ^ (x << 10 | x >>> 22),
                  Z = (v << 26 | v >>> 6) ^ (v << 21 | v >>> 11) ^ (v << 7 | v >>> 25),
                  re = D + Z + F + l[w] + h[w],
                  R = K + V;
                D = N, N = C, C = v, v = A + re | 0, A = E, E = T, T = x, x = re + R | 0
              }
              b[0] = b[0] + x | 0, b[1] = b[1] + T | 0, b[2] = b[2] + E | 0, b[3] = b[3] + A | 0, b[4] = b[4] + v | 0, b[5] = b[5] + C | 0, b[6] = b[6] + N | 0, b[7] = b[7] + D | 0
            },
            _doFinalize: function () {
              var m = this._data,
                p = m.words,
                b = this._nDataBytes * 8,
                x = m.sigBytes * 8;
              return p[x >>> 5] |= 128 << 24 - x % 32, p[(x + 64 >>> 9 << 4) + 14] = a.floor(b / 4294967296), p[(x + 64 >>> 9 << 4) + 15] = b, m.sigBytes = p.length * 4, this._process(), this._hash
            },
            clone: function () {
              var m = i.clone.call(this);
              return m._hash = this._hash.clone(), m
            }
          });
        u.SHA256 = i._createHelper(f), u.HmacSHA256 = i._createHmacHelper(f)
      })(Math), r.SHA256
    })
  })(ba)), ba.exports
}
var xa = {
    exports: {}
  },
  T6 = xa.exports,
  Fs;

function v6() {
  return Fs || (Fs = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), r0())
    })(T6, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.WordArray,
          s = a.algo,
          i = s.SHA256,
          o = s.SHA224 = i.extend({
            _doReset: function () {
              this._hash = new n.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
            },
            _doFinalize: function () {
              var c = i._doFinalize.call(this);
              return c.sigBytes -= 4, c
            }
          });
        a.SHA224 = i._createHelper(o), a.HmacSHA224 = i._createHmacHelper(o)
      })(), r.SHA224
    })
  })(xa)), xa.exports
}
var Ea = {
    exports: {}
  },
  _6 = Ea.exports,
  Ps;

function Wd() {
  return Ps || (Ps = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Cu())
    })(_6, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.Hasher,
          s = a.x64,
          i = s.Word,
          o = s.WordArray,
          c = a.algo;

        function l() {
          return i.create.apply(i, arguments)
        }
        var h = [l(1116352408, 3609767458), l(1899447441, 602891725), l(3049323471, 3964484399), l(3921009573, 2173295548), l(961987163, 4081628472), l(1508970993, 3053834265), l(2453635748, 2937671579), l(2870763221, 3664609560), l(3624381080, 2734883394), l(310598401, 1164996542), l(607225278, 1323610764), l(1426881987, 3590304994), l(1925078388, 4068182383), l(2162078206, 991336113), l(2614888103, 633803317), l(3248222580, 3479774868), l(3835390401, 2666613458), l(4022224774, 944711139), l(264347078, 2341262773), l(604807628, 2007800933), l(770255983, 1495990901), l(1249150122, 1856431235), l(1555081692, 3175218132), l(1996064986, 2198950837), l(2554220882, 3999719339), l(2821834349, 766784016), l(2952996808, 2566594879), l(3210313671, 3203337956), l(3336571891, 1034457026), l(3584528711, 2466948901), l(113926993, 3758326383), l(338241895, 168717936), l(666307205, 1188179964), l(773529912, 1546045734), l(1294757372, 1522805485), l(1396182291, 2643833823), l(1695183700, 2343527390), l(1986661051, 1014477480), l(2177026350, 1206759142), l(2456956037, 344077627), l(2730485921, 1290863460), l(2820302411, 3158454273), l(3259730800, 3505952657), l(3345764771, 106217008), l(3516065817, 3606008344), l(3600352804, 1432725776), l(4094571909, 1467031594), l(275423344, 851169720), l(430227734, 3100823752), l(506948616, 1363258195), l(659060556, 3750685593), l(883997877, 3785050280), l(958139571, 3318307427), l(1322822218, 3812723403), l(1537002063, 2003034995), l(1747873779, 3602036899), l(1955562222, 1575990012), l(2024104815, 1125592928), l(2227730452, 2716904306), l(2361852424, 442776044), l(2428436474, 593698344), l(2756734187, 3733110249), l(3204031479, 2999351573), l(3329325298, 3815920427), l(3391569614, 3928383900), l(3515267271, 566280711), l(3940187606, 3454069534), l(4118630271, 4000239992), l(116418474, 1914138554), l(174292421, 2731055270), l(289380356, 3203993006), l(460393269, 320620315), l(685471733, 587496836), l(852142971, 1086792851), l(1017036298, 365543100), l(1126000580, 2618297676), l(1288033470, 3409855158), l(1501505948, 4234509866), l(1607167915, 987167468), l(1816402316, 1246189591)],
          f = [];
        (function () {
          for (var p = 0; p < 80; p++) f[p] = l()
        })();
        var m = c.SHA512 = n.extend({
          _doReset: function () {
            this._hash = new o.init([new i.init(1779033703, 4089235720), new i.init(3144134277, 2227873595), new i.init(1013904242, 4271175723), new i.init(2773480762, 1595750129), new i.init(1359893119, 2917565137), new i.init(2600822924, 725511199), new i.init(528734635, 4215389547), new i.init(1541459225, 327033209)])
          },
          _doProcessBlock: function (p, b) {
            for (var x = this._hash.words, T = x[0], E = x[1], A = x[2], v = x[3], C = x[4], N = x[5], D = x[6], w = x[7], U = T.high, I = T.low, L = E.high, M = E.low, F = A.high, V = A.low, K = v.high, Z = v.low, re = C.high, R = C.low, G = N.high, j = N.low, P = D.high, $ = D.low, q = w.high, H = w.low, de = U, oe = I, se = L, ue = M, Xe = F, We = V, St = K, Qe = Z, Ye = re, Fe = R, qr = G, ir = j, Wr = P, or = $, Su = q, cr = H, ze = 0; ze < 80; ze++) {
              var $e, pt, Yr = f[ze];
              if (ze < 16) pt = Yr.high = p[b + ze * 2] | 0, $e = Yr.low = p[b + ze * 2 + 1] | 0;
              else {
                var d0 = f[ze - 15],
                  $t = d0.high,
                  dr = d0.low,
                  Ml = ($t >>> 1 | dr << 31) ^ ($t >>> 8 | dr << 24) ^ $t >>> 7,
                  l0 = (dr >>> 1 | $t << 31) ^ (dr >>> 8 | $t << 24) ^ (dr >>> 7 | $t << 25),
                  f0 = f[ze - 2],
                  qt = f0.high,
                  lr = f0.low,
                  Ul = (qt >>> 19 | lr << 13) ^ (qt << 3 | lr >>> 29) ^ qt >>> 6,
                  h0 = (lr >>> 19 | qt << 13) ^ (lr << 3 | qt >>> 29) ^ (lr >>> 6 | qt << 26),
                  m0 = f[ze - 7],
                  Hl = m0.high,
                  $l = m0.low,
                  p0 = f[ze - 16],
                  ql = p0.high,
                  b0 = p0.low;
                $e = l0 + $l, pt = Ml + Hl + ($e >>> 0 < l0 >>> 0 ? 1 : 0), $e = $e + h0, pt = pt + Ul + ($e >>> 0 < h0 >>> 0 ? 1 : 0), $e = $e + b0, pt = pt + ql + ($e >>> 0 < b0 >>> 0 ? 1 : 0), Yr.high = pt, Yr.low = $e
              }
              var Wl = Ye & qr ^ ~Ye & Wr,
                x0 = Fe & ir ^ ~Fe & or,
                Yl = de & se ^ de & Xe ^ se & Xe,
                zl = oe & ue ^ oe & We ^ ue & We,
                Vl = (de >>> 28 | oe << 4) ^ (de << 30 | oe >>> 2) ^ (de << 25 | oe >>> 7),
                E0 = (oe >>> 28 | de << 4) ^ (oe << 30 | de >>> 2) ^ (oe << 25 | de >>> 7),
                Gl = (Ye >>> 14 | Fe << 18) ^ (Ye >>> 18 | Fe << 14) ^ (Ye << 23 | Fe >>> 9),
                jl = (Fe >>> 14 | Ye << 18) ^ (Fe >>> 18 | Ye << 14) ^ (Fe << 23 | Ye >>> 9),
                g0 = h[ze],
                Kl = g0.high,
                A0 = g0.low,
                Pe = cr + jl,
                bt = Su + Gl + (Pe >>> 0 < cr >>> 0 ? 1 : 0),
                Pe = Pe + x0,
                bt = bt + Wl + (Pe >>> 0 < x0 >>> 0 ? 1 : 0),
                Pe = Pe + A0,
                bt = bt + Kl + (Pe >>> 0 < A0 >>> 0 ? 1 : 0),
                Pe = Pe + $e,
                bt = bt + pt + (Pe >>> 0 < $e >>> 0 ? 1 : 0),
                T0 = E0 + zl,
                Xl = Vl + Yl + (T0 >>> 0 < E0 >>> 0 ? 1 : 0);
              Su = Wr, cr = or, Wr = qr, or = ir, qr = Ye, ir = Fe, Fe = Qe + Pe | 0, Ye = St + bt + (Fe >>> 0 < Qe >>> 0 ? 1 : 0) | 0, St = Xe, Qe = We, Xe = se, We = ue, se = de, ue = oe, oe = Pe + T0 | 0, de = bt + Xl + (oe >>> 0 < Pe >>> 0 ? 1 : 0) | 0
            }
            I = T.low = I + oe, T.high = U + de + (I >>> 0 < oe >>> 0 ? 1 : 0), M = E.low = M + ue, E.high = L + se + (M >>> 0 < ue >>> 0 ? 1 : 0), V = A.low = V + We, A.high = F + Xe + (V >>> 0 < We >>> 0 ? 1 : 0), Z = v.low = Z + Qe, v.high = K + St + (Z >>> 0 < Qe >>> 0 ? 1 : 0), R = C.low = R + Fe, C.high = re + Ye + (R >>> 0 < Fe >>> 0 ? 1 : 0), j = N.low = j + ir, N.high = G + qr + (j >>> 0 < ir >>> 0 ? 1 : 0), $ = D.low = $ + or, D.high = P + Wr + ($ >>> 0 < or >>> 0 ? 1 : 0), H = w.low = H + cr, w.high = q + Su + (H >>> 0 < cr >>> 0 ? 1 : 0)
          },
          _doFinalize: function () {
            var p = this._data,
              b = p.words,
              x = this._nDataBytes * 8,
              T = p.sigBytes * 8;
            b[T >>> 5] |= 128 << 24 - T % 32, b[(T + 128 >>> 10 << 5) + 30] = Math.floor(x / 4294967296), b[(T + 128 >>> 10 << 5) + 31] = x, p.sigBytes = b.length * 4, this._process();
            var E = this._hash.toX32();
            return E
          },
          clone: function () {
            var p = n.clone.call(this);
            return p._hash = this._hash.clone(), p
          },
          blockSize: 1024 / 32
        });
        a.SHA512 = n._createHelper(m), a.HmacSHA512 = n._createHmacHelper(m)
      })(), r.SHA512
    })
  })(Ea)), Ea.exports
}
var ga = {
    exports: {}
  },
  y6 = ga.exports,
  Ms;

function C6() {
  return Ms || (Ms = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Cu(), Wd())
    })(y6, function (r) {
      return (function () {
        var a = r,
          u = a.x64,
          n = u.Word,
          s = u.WordArray,
          i = a.algo,
          o = i.SHA512,
          c = i.SHA384 = o.extend({
            _doReset: function () {
              this._hash = new s.init([new n.init(3418070365, 3238371032), new n.init(1654270250, 914150663), new n.init(2438529370, 812702999), new n.init(355462360, 4144912697), new n.init(1731405415, 4290775857), new n.init(2394180231, 1750603025), new n.init(3675008525, 1694076839), new n.init(1203062813, 3204075428)])
            },
            _doFinalize: function () {
              var l = o._doFinalize.call(this);
              return l.sigBytes -= 16, l
            }
          });
        a.SHA384 = o._createHelper(c), a.HmacSHA384 = o._createHmacHelper(c)
      })(), r.SHA384
    })
  })(ga)), ga.exports
}
var Aa = {
    exports: {}
  },
  S6 = Aa.exports,
  Us;

function N6() {
  return Us || (Us = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Cu())
    })(S6, function (r) {
      return (function (a) {
        var u = r,
          n = u.lib,
          s = n.WordArray,
          i = n.Hasher,
          o = u.x64,
          c = o.Word,
          l = u.algo,
          h = [],
          f = [],
          m = [];
        (function () {
          for (var x = 1, T = 0, E = 0; E < 24; E++) {
            h[x + 5 * T] = (E + 1) * (E + 2) / 2 % 64;
            var A = T % 5,
              v = (2 * x + 3 * T) % 5;
            x = A, T = v
          }
          for (var x = 0; x < 5; x++)
            for (var T = 0; T < 5; T++) f[x + 5 * T] = T + (2 * x + 3 * T) % 5 * 5;
          for (var C = 1, N = 0; N < 24; N++) {
            for (var D = 0, w = 0, U = 0; U < 7; U++) {
              if (C & 1) {
                var I = (1 << U) - 1;
                I < 32 ? w ^= 1 << I : D ^= 1 << I - 32
              }
              C & 128 ? C = C << 1 ^ 113 : C <<= 1
            }
            m[N] = c.create(D, w)
          }
        })();
        var p = [];
        (function () {
          for (var x = 0; x < 25; x++) p[x] = c.create()
        })();
        var b = l.SHA3 = i.extend({
          cfg: i.cfg.extend({
            outputLength: 512
          }),
          _doReset: function () {
            for (var x = this._state = [], T = 0; T < 25; T++) x[T] = new c.init;
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
          },
          _doProcessBlock: function (x, T) {
            for (var E = this._state, A = this.blockSize / 2, v = 0; v < A; v++) {
              var C = x[T + 2 * v],
                N = x[T + 2 * v + 1];
              C = (C << 8 | C >>> 24) & 16711935 | (C << 24 | C >>> 8) & 4278255360, N = (N << 8 | N >>> 24) & 16711935 | (N << 24 | N >>> 8) & 4278255360;
              var D = E[v];
              D.high ^= N, D.low ^= C
            }
            for (var w = 0; w < 24; w++) {
              for (var U = 0; U < 5; U++) {
                for (var I = 0, L = 0, M = 0; M < 5; M++) {
                  var D = E[U + 5 * M];
                  I ^= D.high, L ^= D.low
                }
                var F = p[U];
                F.high = I, F.low = L
              }
              for (var U = 0; U < 5; U++)
                for (var V = p[(U + 4) % 5], K = p[(U + 1) % 5], Z = K.high, re = K.low, I = V.high ^ (Z << 1 | re >>> 31), L = V.low ^ (re << 1 | Z >>> 31), M = 0; M < 5; M++) {
                  var D = E[U + 5 * M];
                  D.high ^= I, D.low ^= L
                }
              for (var R = 1; R < 25; R++) {
                var I, L, D = E[R],
                  G = D.high,
                  j = D.low,
                  P = h[R];
                P < 32 ? (I = G << P | j >>> 32 - P, L = j << P | G >>> 32 - P) : (I = j << P - 32 | G >>> 64 - P, L = G << P - 32 | j >>> 64 - P);
                var $ = p[f[R]];
                $.high = I, $.low = L
              }
              var q = p[0],
                H = E[0];
              q.high = H.high, q.low = H.low;
              for (var U = 0; U < 5; U++)
                for (var M = 0; M < 5; M++) {
                  var R = U + 5 * M,
                    D = E[R],
                    de = p[R],
                    oe = p[(U + 1) % 5 + 5 * M],
                    se = p[(U + 2) % 5 + 5 * M];
                  D.high = de.high ^ ~oe.high & se.high, D.low = de.low ^ ~oe.low & se.low
                }
              var D = E[0],
                ue = m[w];
              D.high ^= ue.high, D.low ^= ue.low
            }
          },
          _doFinalize: function () {
            var x = this._data,
              T = x.words;
            this._nDataBytes * 8;
            var E = x.sigBytes * 8,
              A = this.blockSize * 32;
            T[E >>> 5] |= 1 << 24 - E % 32, T[(a.ceil((E + 1) / A) * A >>> 5) - 1] |= 128, x.sigBytes = T.length * 4, this._process();
            for (var v = this._state, C = this.cfg.outputLength / 8, N = C / 8, D = [], w = 0; w < N; w++) {
              var U = v[w],
                I = U.high,
                L = U.low;
              I = (I << 8 | I >>> 24) & 16711935 | (I << 24 | I >>> 8) & 4278255360, L = (L << 8 | L >>> 24) & 16711935 | (L << 24 | L >>> 8) & 4278255360, D.push(L), D.push(I)
            }
            return new s.init(D, C)
          },
          clone: function () {
            for (var x = i.clone.call(this), T = x._state = this._state.slice(0), E = 0; E < 25; E++) T[E] = T[E].clone();
            return x
          }
        });
        u.SHA3 = i._createHelper(b), u.HmacSHA3 = i._createHmacHelper(b)
      })(Math), r.SHA3
    })
  })(Aa)), Aa.exports
}
var Ta = {
    exports: {}
  },
  w6 = Ta.exports,
  Hs;

function I6() {
  return Hs || (Hs = 1, (function (e, t) {
    (function (r, a) {
      e.exports = a(ce())
    })(w6, function (r) {
      /** @preserve
      			(c) 2012 by Cédric Mesnil. All rights reserved.

      			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

      			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
      			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

      			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
      			*/
      return (function (a) {
        var u = r,
          n = u.lib,
          s = n.WordArray,
          i = n.Hasher,
          o = u.algo,
          c = s.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
          l = s.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
          h = s.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
          f = s.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
          m = s.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
          p = s.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
          b = o.RIPEMD160 = i.extend({
            _doReset: function () {
              this._hash = s.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
            },
            _doProcessBlock: function (N, D) {
              for (var w = 0; w < 16; w++) {
                var U = D + w,
                  I = N[U];
                N[U] = (I << 8 | I >>> 24) & 16711935 | (I << 24 | I >>> 8) & 4278255360
              }
              var L = this._hash.words,
                M = m.words,
                F = p.words,
                V = c.words,
                K = l.words,
                Z = h.words,
                re = f.words,
                R, G, j, P, $, q, H, de, oe, se;
              q = R = L[0], H = G = L[1], de = j = L[2], oe = P = L[3], se = $ = L[4];
              for (var ue, w = 0; w < 80; w += 1) ue = R + N[D + V[w]] | 0, w < 16 ? ue += x(G, j, P) + M[0] : w < 32 ? ue += T(G, j, P) + M[1] : w < 48 ? ue += E(G, j, P) + M[2] : w < 64 ? ue += A(G, j, P) + M[3] : ue += v(G, j, P) + M[4], ue = ue | 0, ue = C(ue, Z[w]), ue = ue + $ | 0, R = $, $ = P, P = C(j, 10), j = G, G = ue, ue = q + N[D + K[w]] | 0, w < 16 ? ue += v(H, de, oe) + F[0] : w < 32 ? ue += A(H, de, oe) + F[1] : w < 48 ? ue += E(H, de, oe) + F[2] : w < 64 ? ue += T(H, de, oe) + F[3] : ue += x(H, de, oe) + F[4], ue = ue | 0, ue = C(ue, re[w]), ue = ue + se | 0, q = se, se = oe, oe = C(de, 10), de = H, H = ue;
              ue = L[1] + j + oe | 0, L[1] = L[2] + P + se | 0, L[2] = L[3] + $ + q | 0, L[3] = L[4] + R + H | 0, L[4] = L[0] + G + de | 0, L[0] = ue
            },
            _doFinalize: function () {
              var N = this._data,
                D = N.words,
                w = this._nDataBytes * 8,
                U = N.sigBytes * 8;
              D[U >>> 5] |= 128 << 24 - U % 32, D[(U + 64 >>> 9 << 4) + 14] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360, N.sigBytes = (D.length + 1) * 4, this._process();
              for (var I = this._hash, L = I.words, M = 0; M < 5; M++) {
                var F = L[M];
                L[M] = (F << 8 | F >>> 24) & 16711935 | (F << 24 | F >>> 8) & 4278255360
              }
              return I
            },
            clone: function () {
              var N = i.clone.call(this);
              return N._hash = this._hash.clone(), N
            }
          });

        function x(N, D, w) {
          return N ^ D ^ w
        }

        function T(N, D, w) {
          return N & D | ~N & w
        }

        function E(N, D, w) {
          return (N | ~D) ^ w
        }

        function A(N, D, w) {
          return N & w | D & ~w
        }

        function v(N, D, w) {
          return N ^ (D | ~w)
        }

        function C(N, D) {
          return N << D | N >>> 32 - D
        }
        u.RIPEMD160 = i._createHelper(b), u.HmacRIPEMD160 = i._createHmacHelper(b)
      })(), r.RIPEMD160
    })
  })(Ta)), Ta.exports
}
var va = {
    exports: {}
  },
  D6 = va.exports,
  $s;

function a0() {
  return $s || ($s = 1, (function (e, t) {
    (function (r, a) {
      e.exports = a(ce())
    })(D6, function (r) {
      (function () {
        var a = r,
          u = a.lib,
          n = u.Base,
          s = a.enc,
          i = s.Utf8,
          o = a.algo;
        o.HMAC = n.extend({
          init: function (c, l) {
            c = this._hasher = new c.init, typeof l == "string" && (l = i.parse(l));
            var h = c.blockSize,
              f = h * 4;
            l.sigBytes > f && (l = c.finalize(l)), l.clamp();
            for (var m = this._oKey = l.clone(), p = this._iKey = l.clone(), b = m.words, x = p.words, T = 0; T < h; T++) b[T] ^= 1549556828, x[T] ^= 909522486;
            m.sigBytes = p.sigBytes = f, this.reset()
          },
          reset: function () {
            var c = this._hasher;
            c.reset(), c.update(this._iKey)
          },
          update: function (c) {
            return this._hasher.update(c), this
          },
          finalize: function (c) {
            var l = this._hasher,
              h = l.finalize(c);
            l.reset();
            var f = l.finalize(this._oKey.clone().concat(h));
            return f
          }
        })
      })()
    })
  })(va)), va.exports
}
var _a = {
    exports: {}
  },
  O6 = _a.exports,
  qs;

function L6() {
  return qs || (qs = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), r0(), a0())
    })(O6, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.Base,
          s = u.WordArray,
          i = a.algo,
          o = i.SHA256,
          c = i.HMAC,
          l = i.PBKDF2 = n.extend({
            cfg: n.extend({
              keySize: 128 / 32,
              hasher: o,
              iterations: 25e4
            }),
            init: function (h) {
              this.cfg = this.cfg.extend(h)
            },
            compute: function (h, f) {
              for (var m = this.cfg, p = c.create(m.hasher, h), b = s.create(), x = s.create([1]), T = b.words, E = x.words, A = m.keySize, v = m.iterations; T.length < A;) {
                var C = p.update(f).finalize(x);
                p.reset();
                for (var N = C.words, D = N.length, w = C, U = 1; U < v; U++) {
                  w = p.finalize(w), p.reset();
                  for (var I = w.words, L = 0; L < D; L++) N[L] ^= I[L]
                }
                b.concat(C), E[0]++
              }
              return b.sigBytes = A * 4, b
            }
          });
        a.PBKDF2 = function (h, f, m) {
          return l.create(m).compute(h, f)
        }
      })(), r.PBKDF2
    })
  })(_a)), _a.exports
}
var ya = {
    exports: {}
  },
  R6 = ya.exports,
  Ws;

function Ct() {
  return Ws || (Ws = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), qd(), a0())
    })(R6, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.Base,
          s = u.WordArray,
          i = a.algo,
          o = i.MD5,
          c = i.EvpKDF = n.extend({
            cfg: n.extend({
              keySize: 128 / 32,
              hasher: o,
              iterations: 1
            }),
            init: function (l) {
              this.cfg = this.cfg.extend(l)
            },
            compute: function (l, h) {
              for (var f, m = this.cfg, p = m.hasher.create(), b = s.create(), x = b.words, T = m.keySize, E = m.iterations; x.length < T;) {
                f && p.update(f), f = p.update(l).finalize(h), p.reset();
                for (var A = 1; A < E; A++) f = p.finalize(f), p.reset();
                b.concat(f)
              }
              return b.sigBytes = T * 4, b
            }
          });
        a.EvpKDF = function (l, h, f) {
          return c.create(f).compute(l, h)
        }
      })(), r.EvpKDF
    })
  })(ya)), ya.exports
}
var Ca = {
    exports: {}
  },
  k6 = Ca.exports,
  Ys;

function Se() {
  return Ys || (Ys = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Ct())
    })(k6, function (r) {
      r.lib.Cipher || (function (a) {
        var u = r,
          n = u.lib,
          s = n.Base,
          i = n.WordArray,
          o = n.BufferedBlockAlgorithm,
          c = u.enc;
        c.Utf8;
        var l = c.Base64,
          h = u.algo,
          f = h.EvpKDF,
          m = n.Cipher = o.extend({
            cfg: s.extend(),
            createEncryptor: function (I, L) {
              return this.create(this._ENC_XFORM_MODE, I, L)
            },
            createDecryptor: function (I, L) {
              return this.create(this._DEC_XFORM_MODE, I, L)
            },
            init: function (I, L, M) {
              this.cfg = this.cfg.extend(M), this._xformMode = I, this._key = L, this.reset()
            },
            reset: function () {
              o.reset.call(this), this._doReset()
            },
            process: function (I) {
              return this._append(I), this._process()
            },
            finalize: function (I) {
              I && this._append(I);
              var L = this._doFinalize();
              return L
            },
            keySize: 128 / 32,
            ivSize: 128 / 32,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: (function () {
              function I(L) {
                return typeof L == "string" ? U : N
              }
              return function (L) {
                return {
                  encrypt: function (M, F, V) {
                    return I(F).encrypt(L, M, F, V)
                  },
                  decrypt: function (M, F, V) {
                    return I(F).decrypt(L, M, F, V)
                  }
                }
              }
            })()
          });
        n.StreamCipher = m.extend({
          _doFinalize: function () {
            var I = this._process(!0);
            return I
          },
          blockSize: 1
        });
        var p = u.mode = {},
          b = n.BlockCipherMode = s.extend({
            createEncryptor: function (I, L) {
              return this.Encryptor.create(I, L)
            },
            createDecryptor: function (I, L) {
              return this.Decryptor.create(I, L)
            },
            init: function (I, L) {
              this._cipher = I, this._iv = L
            }
          }),
          x = p.CBC = (function () {
            var I = b.extend();
            I.Encryptor = I.extend({
              processBlock: function (M, F) {
                var V = this._cipher,
                  K = V.blockSize;
                L.call(this, M, F, K), V.encryptBlock(M, F), this._prevBlock = M.slice(F, F + K)
              }
            }), I.Decryptor = I.extend({
              processBlock: function (M, F) {
                var V = this._cipher,
                  K = V.blockSize,
                  Z = M.slice(F, F + K);
                V.decryptBlock(M, F), L.call(this, M, F, K), this._prevBlock = Z
              }
            });

            function L(M, F, V) {
              var K, Z = this._iv;
              Z ? (K = Z, this._iv = a) : K = this._prevBlock;
              for (var re = 0; re < V; re++) M[F + re] ^= K[re]
            }
            return I
          })(),
          T = u.pad = {},
          E = T.Pkcs7 = {
            pad: function (I, L) {
              for (var M = L * 4, F = M - I.sigBytes % M, V = F << 24 | F << 16 | F << 8 | F, K = [], Z = 0; Z < F; Z += 4) K.push(V);
              var re = i.create(K, F);
              I.concat(re)
            },
            unpad: function (I) {
              var L = I.words[I.sigBytes - 1 >>> 2] & 255;
              I.sigBytes -= L
            }
          };
        n.BlockCipher = m.extend({
          cfg: m.cfg.extend({
            mode: x,
            padding: E
          }),
          reset: function () {
            var I;
            m.reset.call(this);
            var L = this.cfg,
              M = L.iv,
              F = L.mode;
            this._xformMode == this._ENC_XFORM_MODE ? I = F.createEncryptor : (I = F.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == I ? this._mode.init(this, M && M.words) : (this._mode = I.call(F, this, M && M.words), this._mode.__creator = I)
          },
          _doProcessBlock: function (I, L) {
            this._mode.processBlock(I, L)
          },
          _doFinalize: function () {
            var I, L = this.cfg.padding;
            return this._xformMode == this._ENC_XFORM_MODE ? (L.pad(this._data, this.blockSize), I = this._process(!0)) : (I = this._process(!0), L.unpad(I)), I
          },
          blockSize: 128 / 32
        });
        var A = n.CipherParams = s.extend({
            init: function (I) {
              this.mixIn(I)
            },
            toString: function (I) {
              return (I || this.formatter).stringify(this)
            }
          }),
          v = u.format = {},
          C = v.OpenSSL = {
            stringify: function (I) {
              var L, M = I.ciphertext,
                F = I.salt;
              return F ? L = i.create([1398893684, 1701076831]).concat(F).concat(M) : L = M, L.toString(l)
            },
            parse: function (I) {
              var L, M = l.parse(I),
                F = M.words;
              return F[0] == 1398893684 && F[1] == 1701076831 && (L = i.create(F.slice(2, 4)), F.splice(0, 4), M.sigBytes -= 16), A.create({
                ciphertext: M,
                salt: L
              })
            }
          },
          N = n.SerializableCipher = s.extend({
            cfg: s.extend({
              format: C
            }),
            encrypt: function (I, L, M, F) {
              F = this.cfg.extend(F);
              var V = I.createEncryptor(M, F),
                K = V.finalize(L),
                Z = V.cfg;
              return A.create({
                ciphertext: K,
                key: M,
                iv: Z.iv,
                algorithm: I,
                mode: Z.mode,
                padding: Z.padding,
                blockSize: I.blockSize,
                formatter: F.format
              })
            },
            decrypt: function (I, L, M, F) {
              F = this.cfg.extend(F), L = this._parse(L, F.format);
              var V = I.createDecryptor(M, F).finalize(L.ciphertext);
              return V
            },
            _parse: function (I, L) {
              return typeof I == "string" ? L.parse(I, this) : I
            }
          }),
          D = u.kdf = {},
          w = D.OpenSSL = {
            execute: function (I, L, M, F, V) {
              if (F || (F = i.random(64 / 8)), V) var K = f.create({
                keySize: L + M,
                hasher: V
              }).compute(I, F);
              else var K = f.create({
                keySize: L + M
              }).compute(I, F);
              var Z = i.create(K.words.slice(L), M * 4);
              return K.sigBytes = L * 4, A.create({
                key: K,
                iv: Z,
                salt: F
              })
            }
          },
          U = n.PasswordBasedCipher = N.extend({
            cfg: N.cfg.extend({
              kdf: w
            }),
            encrypt: function (I, L, M, F) {
              F = this.cfg.extend(F);
              var V = F.kdf.execute(M, I.keySize, I.ivSize, F.salt, F.hasher);
              F.iv = V.iv;
              var K = N.encrypt.call(this, I, L, V.key, F);
              return K.mixIn(V), K
            },
            decrypt: function (I, L, M, F) {
              F = this.cfg.extend(F), L = this._parse(L, F.format);
              var V = F.kdf.execute(M, I.keySize, I.ivSize, L.salt, F.hasher);
              F.iv = V.iv;
              var K = N.decrypt.call(this, I, L, V.key, F);
              return K
            }
          })
      })()
    })
  })(Ca)), Ca.exports
}
var Sa = {
    exports: {}
  },
  B6 = Sa.exports,
  zs;

function F6() {
  return zs || (zs = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Se())
    })(B6, function (r) {
      return r.mode.CFB = (function () {
        var a = r.lib.BlockCipherMode.extend();
        a.Encryptor = a.extend({
          processBlock: function (n, s) {
            var i = this._cipher,
              o = i.blockSize;
            u.call(this, n, s, o, i), this._prevBlock = n.slice(s, s + o)
          }
        }), a.Decryptor = a.extend({
          processBlock: function (n, s) {
            var i = this._cipher,
              o = i.blockSize,
              c = n.slice(s, s + o);
            u.call(this, n, s, o, i), this._prevBlock = c
          }
        });

        function u(n, s, i, o) {
          var c, l = this._iv;
          l ? (c = l.slice(0), this._iv = void 0) : c = this._prevBlock, o.encryptBlock(c, 0);
          for (var h = 0; h < i; h++) n[s + h] ^= c[h]
        }
        return a
      })(), r.mode.CFB
    })
  })(Sa)), Sa.exports
}
var Na = {
    exports: {}
  },
  P6 = Na.exports,
  Vs;

function M6() {
  return Vs || (Vs = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Se())
    })(P6, function (r) {
      return r.mode.CTR = (function () {
        var a = r.lib.BlockCipherMode.extend(),
          u = a.Encryptor = a.extend({
            processBlock: function (n, s) {
              var i = this._cipher,
                o = i.blockSize,
                c = this._iv,
                l = this._counter;
              c && (l = this._counter = c.slice(0), this._iv = void 0);
              var h = l.slice(0);
              i.encryptBlock(h, 0), l[o - 1] = l[o - 1] + 1 | 0;
              for (var f = 0; f < o; f++) n[s + f] ^= h[f]
            }
          });
        return a.Decryptor = u, a
      })(), r.mode.CTR
    })
  })(Na)), Na.exports
}
var wa = {
    exports: {}
  },
  U6 = wa.exports,
  Gs;

function H6() {
  return Gs || (Gs = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Se())
    })(U6, function (r) {
      /** @preserve
       * Counter block mode compatible with  Dr Brian Gladman fileenc.c
       * derived from CryptoJS.mode.CTR
       * Jan Hruby jhruby.web@gmail.com
       */
      return r.mode.CTRGladman = (function () {
        var a = r.lib.BlockCipherMode.extend();

        function u(i) {
          if ((i >> 24 & 255) === 255) {
            var o = i >> 16 & 255,
              c = i >> 8 & 255,
              l = i & 255;
            o === 255 ? (o = 0, c === 255 ? (c = 0, l === 255 ? l = 0 : ++l) : ++c) : ++o, i = 0, i += o << 16, i += c << 8, i += l
          } else i += 1 << 24;
          return i
        }

        function n(i) {
          return (i[0] = u(i[0])) === 0 && (i[1] = u(i[1])), i
        }
        var s = a.Encryptor = a.extend({
          processBlock: function (i, o) {
            var c = this._cipher,
              l = c.blockSize,
              h = this._iv,
              f = this._counter;
            h && (f = this._counter = h.slice(0), this._iv = void 0), n(f);
            var m = f.slice(0);
            c.encryptBlock(m, 0);
            for (var p = 0; p < l; p++) i[o + p] ^= m[p]
          }
        });
        return a.Decryptor = s, a
      })(), r.mode.CTRGladman
    })
  })(wa)), wa.exports
}
var Ia = {
    exports: {}
  },
  $6 = Ia.exports,
  js;

function q6() {
  return js || (js = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Se())
    })($6, function (r) {
      return r.mode.OFB = (function () {
        var a = r.lib.BlockCipherMode.extend(),
          u = a.Encryptor = a.extend({
            processBlock: function (n, s) {
              var i = this._cipher,
                o = i.blockSize,
                c = this._iv,
                l = this._keystream;
              c && (l = this._keystream = c.slice(0), this._iv = void 0), i.encryptBlock(l, 0);
              for (var h = 0; h < o; h++) n[s + h] ^= l[h]
            }
          });
        return a.Decryptor = u, a
      })(), r.mode.OFB
    })
  })(Ia)), Ia.exports
}
var Da = {
    exports: {}
  },
  W6 = Da.exports,
  Ks;

function Y6() {
  return Ks || (Ks = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Se())
    })(W6, function (r) {
      return r.mode.ECB = (function () {
        var a = r.lib.BlockCipherMode.extend();
        return a.Encryptor = a.extend({
          processBlock: function (u, n) {
            this._cipher.encryptBlock(u, n)
          }
        }), a.Decryptor = a.extend({
          processBlock: function (u, n) {
            this._cipher.decryptBlock(u, n)
          }
        }), a
      })(), r.mode.ECB
    })
  })(Da)), Da.exports
}
var Oa = {
    exports: {}
  },
  z6 = Oa.exports,
  Xs;

function V6() {
  return Xs || (Xs = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Se())
    })(z6, function (r) {
      return r.pad.AnsiX923 = {
        pad: function (a, u) {
          var n = a.sigBytes,
            s = u * 4,
            i = s - n % s,
            o = n + i - 1;
          a.clamp(), a.words[o >>> 2] |= i << 24 - o % 4 * 8, a.sigBytes += i
        },
        unpad: function (a) {
          var u = a.words[a.sigBytes - 1 >>> 2] & 255;
          a.sigBytes -= u
        }
      }, r.pad.Ansix923
    })
  })(Oa)), Oa.exports
}
var La = {
    exports: {}
  },
  G6 = La.exports,
  Qs;

function j6() {
  return Qs || (Qs = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Se())
    })(G6, function (r) {
      return r.pad.Iso10126 = {
        pad: function (a, u) {
          var n = u * 4,
            s = n - a.sigBytes % n;
          a.concat(r.lib.WordArray.random(s - 1)).concat(r.lib.WordArray.create([s << 24], 1))
        },
        unpad: function (a) {
          var u = a.words[a.sigBytes - 1 >>> 2] & 255;
          a.sigBytes -= u
        }
      }, r.pad.Iso10126
    })
  })(La)), La.exports
}
var Ra = {
    exports: {}
  },
  K6 = Ra.exports,
  Js;

function X6() {
  return Js || (Js = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Se())
    })(K6, function (r) {
      return r.pad.Iso97971 = {
        pad: function (a, u) {
          a.concat(r.lib.WordArray.create([2147483648], 1)), r.pad.ZeroPadding.pad(a, u)
        },
        unpad: function (a) {
          r.pad.ZeroPadding.unpad(a), a.sigBytes--
        }
      }, r.pad.Iso97971
    })
  })(Ra)), Ra.exports
}
var ka = {
    exports: {}
  },
  Q6 = ka.exports,
  Zs;

function J6() {
  return Zs || (Zs = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Se())
    })(Q6, function (r) {
      return r.pad.ZeroPadding = {
        pad: function (a, u) {
          var n = u * 4;
          a.clamp(), a.sigBytes += n - (a.sigBytes % n || n)
        },
        unpad: function (a) {
          for (var u = a.words, n = a.sigBytes - 1, n = a.sigBytes - 1; n >= 0; n--)
            if (u[n >>> 2] >>> 24 - n % 4 * 8 & 255) {
              a.sigBytes = n + 1;
              break
            }
        }
      }, r.pad.ZeroPadding
    })
  })(ka)), ka.exports
}
var Ba = {
    exports: {}
  },
  Z6 = Ba.exports,
  ei;

function ex() {
  return ei || (ei = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Se())
    })(Z6, function (r) {
      return r.pad.NoPadding = {
        pad: function () {},
        unpad: function () {}
      }, r.pad.NoPadding
    })
  })(Ba)), Ba.exports
}
var Fa = {
    exports: {}
  },
  tx = Fa.exports,
  ti;

function rx() {
  return ti || (ti = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Se())
    })(tx, function (r) {
      return (function (a) {
        var u = r,
          n = u.lib,
          s = n.CipherParams,
          i = u.enc,
          o = i.Hex,
          c = u.format;
        c.Hex = {
          stringify: function (l) {
            return l.ciphertext.toString(o)
          },
          parse: function (l) {
            var h = o.parse(l);
            return s.create({
              ciphertext: h
            })
          }
        }
      })(), r.format.Hex
    })
  })(Fa)), Fa.exports
}
var Pa = {
    exports: {}
  },
  ax = Pa.exports,
  ri;

function ux() {
  return ri || (ri = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Ut(), Ht(), Ct(), Se())
    })(ax, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.BlockCipher,
          s = a.algo,
          i = [],
          o = [],
          c = [],
          l = [],
          h = [],
          f = [],
          m = [],
          p = [],
          b = [],
          x = [];
        (function () {
          for (var A = [], v = 0; v < 256; v++) v < 128 ? A[v] = v << 1 : A[v] = v << 1 ^ 283;
          for (var C = 0, N = 0, v = 0; v < 256; v++) {
            var D = N ^ N << 1 ^ N << 2 ^ N << 3 ^ N << 4;
            D = D >>> 8 ^ D & 255 ^ 99, i[C] = D, o[D] = C;
            var w = A[C],
              U = A[w],
              I = A[U],
              L = A[D] * 257 ^ D * 16843008;
            c[C] = L << 24 | L >>> 8, l[C] = L << 16 | L >>> 16, h[C] = L << 8 | L >>> 24, f[C] = L;
            var L = I * 16843009 ^ U * 65537 ^ w * 257 ^ C * 16843008;
            m[D] = L << 24 | L >>> 8, p[D] = L << 16 | L >>> 16, b[D] = L << 8 | L >>> 24, x[D] = L, C ? (C = w ^ A[A[A[I ^ w]]], N ^= A[A[N]]) : C = N = 1
          }
        })();
        var T = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
          E = s.AES = n.extend({
            _doReset: function () {
              var A;
              if (!(this._nRounds && this._keyPriorReset === this._key)) {
                for (var v = this._keyPriorReset = this._key, C = v.words, N = v.sigBytes / 4, D = this._nRounds = N + 6, w = (D + 1) * 4, U = this._keySchedule = [], I = 0; I < w; I++) I < N ? U[I] = C[I] : (A = U[I - 1], I % N ? N > 6 && I % N == 4 && (A = i[A >>> 24] << 24 | i[A >>> 16 & 255] << 16 | i[A >>> 8 & 255] << 8 | i[A & 255]) : (A = A << 8 | A >>> 24, A = i[A >>> 24] << 24 | i[A >>> 16 & 255] << 16 | i[A >>> 8 & 255] << 8 | i[A & 255], A ^= T[I / N | 0] << 24), U[I] = U[I - N] ^ A);
                for (var L = this._invKeySchedule = [], M = 0; M < w; M++) {
                  var I = w - M;
                  if (M % 4) var A = U[I];
                  else var A = U[I - 4];
                  M < 4 || I <= 4 ? L[M] = A : L[M] = m[i[A >>> 24]] ^ p[i[A >>> 16 & 255]] ^ b[i[A >>> 8 & 255]] ^ x[i[A & 255]]
                }
              }
            },
            encryptBlock: function (A, v) {
              this._doCryptBlock(A, v, this._keySchedule, c, l, h, f, i)
            },
            decryptBlock: function (A, v) {
              var C = A[v + 1];
              A[v + 1] = A[v + 3], A[v + 3] = C, this._doCryptBlock(A, v, this._invKeySchedule, m, p, b, x, o);
              var C = A[v + 1];
              A[v + 1] = A[v + 3], A[v + 3] = C
            },
            _doCryptBlock: function (A, v, C, N, D, w, U, I) {
              for (var L = this._nRounds, M = A[v] ^ C[0], F = A[v + 1] ^ C[1], V = A[v + 2] ^ C[2], K = A[v + 3] ^ C[3], Z = 4, re = 1; re < L; re++) {
                var R = N[M >>> 24] ^ D[F >>> 16 & 255] ^ w[V >>> 8 & 255] ^ U[K & 255] ^ C[Z++],
                  G = N[F >>> 24] ^ D[V >>> 16 & 255] ^ w[K >>> 8 & 255] ^ U[M & 255] ^ C[Z++],
                  j = N[V >>> 24] ^ D[K >>> 16 & 255] ^ w[M >>> 8 & 255] ^ U[F & 255] ^ C[Z++],
                  P = N[K >>> 24] ^ D[M >>> 16 & 255] ^ w[F >>> 8 & 255] ^ U[V & 255] ^ C[Z++];
                M = R, F = G, V = j, K = P
              }
              var R = (I[M >>> 24] << 24 | I[F >>> 16 & 255] << 16 | I[V >>> 8 & 255] << 8 | I[K & 255]) ^ C[Z++],
                G = (I[F >>> 24] << 24 | I[V >>> 16 & 255] << 16 | I[K >>> 8 & 255] << 8 | I[M & 255]) ^ C[Z++],
                j = (I[V >>> 24] << 24 | I[K >>> 16 & 255] << 16 | I[M >>> 8 & 255] << 8 | I[F & 255]) ^ C[Z++],
                P = (I[K >>> 24] << 24 | I[M >>> 16 & 255] << 16 | I[F >>> 8 & 255] << 8 | I[V & 255]) ^ C[Z++];
              A[v] = R, A[v + 1] = G, A[v + 2] = j, A[v + 3] = P
            },
            keySize: 256 / 32
          });
        a.AES = n._createHelper(E)
      })(), r.AES
    })
  })(Pa)), Pa.exports
}
var Ma = {
    exports: {}
  },
  nx = Ma.exports,
  ai;

function sx() {
  return ai || (ai = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Ut(), Ht(), Ct(), Se())
    })(nx, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.WordArray,
          s = u.BlockCipher,
          i = a.algo,
          o = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
          c = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
          l = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
          h = [{
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378
          }, {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672
          }, {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792
          }, {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464
          }, {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040
          }, {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656
          }, {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577
          }, {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848
          }],
          f = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
          m = i.DES = s.extend({
            _doReset: function () {
              for (var T = this._key, E = T.words, A = [], v = 0; v < 56; v++) {
                var C = o[v] - 1;
                A[v] = E[C >>> 5] >>> 31 - C % 32 & 1
              }
              for (var N = this._subKeys = [], D = 0; D < 16; D++) {
                for (var w = N[D] = [], U = l[D], v = 0; v < 24; v++) w[v / 6 | 0] |= A[(c[v] - 1 + U) % 28] << 31 - v % 6, w[4 + (v / 6 | 0)] |= A[28 + (c[v + 24] - 1 + U) % 28] << 31 - v % 6;
                w[0] = w[0] << 1 | w[0] >>> 31;
                for (var v = 1; v < 7; v++) w[v] = w[v] >>> (v - 1) * 4 + 3;
                w[7] = w[7] << 5 | w[7] >>> 27
              }
              for (var I = this._invSubKeys = [], v = 0; v < 16; v++) I[v] = N[15 - v]
            },
            encryptBlock: function (T, E) {
              this._doCryptBlock(T, E, this._subKeys)
            },
            decryptBlock: function (T, E) {
              this._doCryptBlock(T, E, this._invSubKeys)
            },
            _doCryptBlock: function (T, E, A) {
              this._lBlock = T[E], this._rBlock = T[E + 1], p.call(this, 4, 252645135), p.call(this, 16, 65535), b.call(this, 2, 858993459), b.call(this, 8, 16711935), p.call(this, 1, 1431655765);
              for (var v = 0; v < 16; v++) {
                for (var C = A[v], N = this._lBlock, D = this._rBlock, w = 0, U = 0; U < 8; U++) w |= h[U][((D ^ C[U]) & f[U]) >>> 0];
                this._lBlock = D, this._rBlock = N ^ w
              }
              var I = this._lBlock;
              this._lBlock = this._rBlock, this._rBlock = I, p.call(this, 1, 1431655765), b.call(this, 8, 16711935), b.call(this, 2, 858993459), p.call(this, 16, 65535), p.call(this, 4, 252645135), T[E] = this._lBlock, T[E + 1] = this._rBlock
            },
            keySize: 64 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });

        function p(T, E) {
          var A = (this._lBlock >>> T ^ this._rBlock) & E;
          this._rBlock ^= A, this._lBlock ^= A << T
        }

        function b(T, E) {
          var A = (this._rBlock >>> T ^ this._lBlock) & E;
          this._lBlock ^= A, this._rBlock ^= A << T
        }
        a.DES = s._createHelper(m);
        var x = i.TripleDES = s.extend({
          _doReset: function () {
            var T = this._key,
              E = T.words;
            if (E.length !== 2 && E.length !== 4 && E.length < 6) throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            var A = E.slice(0, 2),
              v = E.length < 4 ? E.slice(0, 2) : E.slice(2, 4),
              C = E.length < 6 ? E.slice(0, 2) : E.slice(4, 6);
            this._des1 = m.createEncryptor(n.create(A)), this._des2 = m.createEncryptor(n.create(v)), this._des3 = m.createEncryptor(n.create(C))
          },
          encryptBlock: function (T, E) {
            this._des1.encryptBlock(T, E), this._des2.decryptBlock(T, E), this._des3.encryptBlock(T, E)
          },
          decryptBlock: function (T, E) {
            this._des3.decryptBlock(T, E), this._des2.encryptBlock(T, E), this._des1.decryptBlock(T, E)
          },
          keySize: 192 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        a.TripleDES = s._createHelper(x)
      })(), r.TripleDES
    })
  })(Ma)), Ma.exports
}
var Ua = {
    exports: {}
  },
  ix = Ua.exports,
  ui;

function ox() {
  return ui || (ui = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Ut(), Ht(), Ct(), Se())
    })(ix, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.StreamCipher,
          s = a.algo,
          i = s.RC4 = n.extend({
            _doReset: function () {
              for (var l = this._key, h = l.words, f = l.sigBytes, m = this._S = [], p = 0; p < 256; p++) m[p] = p;
              for (var p = 0, b = 0; p < 256; p++) {
                var x = p % f,
                  T = h[x >>> 2] >>> 24 - x % 4 * 8 & 255;
                b = (b + m[p] + T) % 256;
                var E = m[p];
                m[p] = m[b], m[b] = E
              }
              this._i = this._j = 0
            },
            _doProcessBlock: function (l, h) {
              l[h] ^= o.call(this)
            },
            keySize: 256 / 32,
            ivSize: 0
          });

        function o() {
          for (var l = this._S, h = this._i, f = this._j, m = 0, p = 0; p < 4; p++) {
            h = (h + 1) % 256, f = (f + l[h]) % 256;
            var b = l[h];
            l[h] = l[f], l[f] = b, m |= l[(l[h] + l[f]) % 256] << 24 - p * 8
          }
          return this._i = h, this._j = f, m
        }
        a.RC4 = n._createHelper(i);
        var c = s.RC4Drop = i.extend({
          cfg: i.cfg.extend({
            drop: 192
          }),
          _doReset: function () {
            i._doReset.call(this);
            for (var l = this.cfg.drop; l > 0; l--) o.call(this)
          }
        });
        a.RC4Drop = n._createHelper(c)
      })(), r.RC4
    })
  })(Ua)), Ua.exports
}
var Ha = {
    exports: {}
  },
  cx = Ha.exports,
  ni;

function dx() {
  return ni || (ni = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Ut(), Ht(), Ct(), Se())
    })(cx, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.StreamCipher,
          s = a.algo,
          i = [],
          o = [],
          c = [],
          l = s.Rabbit = n.extend({
            _doReset: function () {
              for (var f = this._key.words, m = this.cfg.iv, p = 0; p < 4; p++) f[p] = (f[p] << 8 | f[p] >>> 24) & 16711935 | (f[p] << 24 | f[p] >>> 8) & 4278255360;
              var b = this._X = [f[0], f[3] << 16 | f[2] >>> 16, f[1], f[0] << 16 | f[3] >>> 16, f[2], f[1] << 16 | f[0] >>> 16, f[3], f[2] << 16 | f[1] >>> 16],
                x = this._C = [f[2] << 16 | f[2] >>> 16, f[0] & 4294901760 | f[1] & 65535, f[3] << 16 | f[3] >>> 16, f[1] & 4294901760 | f[2] & 65535, f[0] << 16 | f[0] >>> 16, f[2] & 4294901760 | f[3] & 65535, f[1] << 16 | f[1] >>> 16, f[3] & 4294901760 | f[0] & 65535];
              this._b = 0;
              for (var p = 0; p < 4; p++) h.call(this);
              for (var p = 0; p < 8; p++) x[p] ^= b[p + 4 & 7];
              if (m) {
                var T = m.words,
                  E = T[0],
                  A = T[1],
                  v = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360,
                  C = (A << 8 | A >>> 24) & 16711935 | (A << 24 | A >>> 8) & 4278255360,
                  N = v >>> 16 | C & 4294901760,
                  D = C << 16 | v & 65535;
                x[0] ^= v, x[1] ^= N, x[2] ^= C, x[3] ^= D, x[4] ^= v, x[5] ^= N, x[6] ^= C, x[7] ^= D;
                for (var p = 0; p < 4; p++) h.call(this)
              }
            },
            _doProcessBlock: function (f, m) {
              var p = this._X;
              h.call(this), i[0] = p[0] ^ p[5] >>> 16 ^ p[3] << 16, i[1] = p[2] ^ p[7] >>> 16 ^ p[5] << 16, i[2] = p[4] ^ p[1] >>> 16 ^ p[7] << 16, i[3] = p[6] ^ p[3] >>> 16 ^ p[1] << 16;
              for (var b = 0; b < 4; b++) i[b] = (i[b] << 8 | i[b] >>> 24) & 16711935 | (i[b] << 24 | i[b] >>> 8) & 4278255360, f[m + b] ^= i[b]
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });

        function h() {
          for (var f = this._X, m = this._C, p = 0; p < 8; p++) o[p] = m[p];
          m[0] = m[0] + 1295307597 + this._b | 0, m[1] = m[1] + 3545052371 + (m[0] >>> 0 < o[0] >>> 0 ? 1 : 0) | 0, m[2] = m[2] + 886263092 + (m[1] >>> 0 < o[1] >>> 0 ? 1 : 0) | 0, m[3] = m[3] + 1295307597 + (m[2] >>> 0 < o[2] >>> 0 ? 1 : 0) | 0, m[4] = m[4] + 3545052371 + (m[3] >>> 0 < o[3] >>> 0 ? 1 : 0) | 0, m[5] = m[5] + 886263092 + (m[4] >>> 0 < o[4] >>> 0 ? 1 : 0) | 0, m[6] = m[6] + 1295307597 + (m[5] >>> 0 < o[5] >>> 0 ? 1 : 0) | 0, m[7] = m[7] + 3545052371 + (m[6] >>> 0 < o[6] >>> 0 ? 1 : 0) | 0, this._b = m[7] >>> 0 < o[7] >>> 0 ? 1 : 0;
          for (var p = 0; p < 8; p++) {
            var b = f[p] + m[p],
              x = b & 65535,
              T = b >>> 16,
              E = ((x * x >>> 17) + x * T >>> 15) + T * T,
              A = ((b & 4294901760) * b | 0) + ((b & 65535) * b | 0);
            c[p] = E ^ A
          }
          f[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0, f[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0, f[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0, f[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0, f[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0, f[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0, f[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0, f[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0
        }
        a.Rabbit = n._createHelper(l)
      })(), r.Rabbit
    })
  })(Ha)), Ha.exports
}
var $a = {
    exports: {}
  },
  lx = $a.exports,
  si;

function fx() {
  return si || (si = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Ut(), Ht(), Ct(), Se())
    })(lx, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.StreamCipher,
          s = a.algo,
          i = [],
          o = [],
          c = [],
          l = s.RabbitLegacy = n.extend({
            _doReset: function () {
              var f = this._key.words,
                m = this.cfg.iv,
                p = this._X = [f[0], f[3] << 16 | f[2] >>> 16, f[1], f[0] << 16 | f[3] >>> 16, f[2], f[1] << 16 | f[0] >>> 16, f[3], f[2] << 16 | f[1] >>> 16],
                b = this._C = [f[2] << 16 | f[2] >>> 16, f[0] & 4294901760 | f[1] & 65535, f[3] << 16 | f[3] >>> 16, f[1] & 4294901760 | f[2] & 65535, f[0] << 16 | f[0] >>> 16, f[2] & 4294901760 | f[3] & 65535, f[1] << 16 | f[1] >>> 16, f[3] & 4294901760 | f[0] & 65535];
              this._b = 0;
              for (var x = 0; x < 4; x++) h.call(this);
              for (var x = 0; x < 8; x++) b[x] ^= p[x + 4 & 7];
              if (m) {
                var T = m.words,
                  E = T[0],
                  A = T[1],
                  v = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360,
                  C = (A << 8 | A >>> 24) & 16711935 | (A << 24 | A >>> 8) & 4278255360,
                  N = v >>> 16 | C & 4294901760,
                  D = C << 16 | v & 65535;
                b[0] ^= v, b[1] ^= N, b[2] ^= C, b[3] ^= D, b[4] ^= v, b[5] ^= N, b[6] ^= C, b[7] ^= D;
                for (var x = 0; x < 4; x++) h.call(this)
              }
            },
            _doProcessBlock: function (f, m) {
              var p = this._X;
              h.call(this), i[0] = p[0] ^ p[5] >>> 16 ^ p[3] << 16, i[1] = p[2] ^ p[7] >>> 16 ^ p[5] << 16, i[2] = p[4] ^ p[1] >>> 16 ^ p[7] << 16, i[3] = p[6] ^ p[3] >>> 16 ^ p[1] << 16;
              for (var b = 0; b < 4; b++) i[b] = (i[b] << 8 | i[b] >>> 24) & 16711935 | (i[b] << 24 | i[b] >>> 8) & 4278255360, f[m + b] ^= i[b]
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });

        function h() {
          for (var f = this._X, m = this._C, p = 0; p < 8; p++) o[p] = m[p];
          m[0] = m[0] + 1295307597 + this._b | 0, m[1] = m[1] + 3545052371 + (m[0] >>> 0 < o[0] >>> 0 ? 1 : 0) | 0, m[2] = m[2] + 886263092 + (m[1] >>> 0 < o[1] >>> 0 ? 1 : 0) | 0, m[3] = m[3] + 1295307597 + (m[2] >>> 0 < o[2] >>> 0 ? 1 : 0) | 0, m[4] = m[4] + 3545052371 + (m[3] >>> 0 < o[3] >>> 0 ? 1 : 0) | 0, m[5] = m[5] + 886263092 + (m[4] >>> 0 < o[4] >>> 0 ? 1 : 0) | 0, m[6] = m[6] + 1295307597 + (m[5] >>> 0 < o[5] >>> 0 ? 1 : 0) | 0, m[7] = m[7] + 3545052371 + (m[6] >>> 0 < o[6] >>> 0 ? 1 : 0) | 0, this._b = m[7] >>> 0 < o[7] >>> 0 ? 1 : 0;
          for (var p = 0; p < 8; p++) {
            var b = f[p] + m[p],
              x = b & 65535,
              T = b >>> 16,
              E = ((x * x >>> 17) + x * T >>> 15) + T * T,
              A = ((b & 4294901760) * b | 0) + ((b & 65535) * b | 0);
            c[p] = E ^ A
          }
          f[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0, f[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0, f[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0, f[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0, f[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0, f[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0, f[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0, f[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0
        }
        a.RabbitLegacy = n._createHelper(l)
      })(), r.RabbitLegacy
    })
  })($a)), $a.exports
}
var qa = {
    exports: {}
  },
  hx = qa.exports,
  ii;

function mx() {
  return ii || (ii = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Ut(), Ht(), Ct(), Se())
    })(hx, function (r) {
      return (function () {
        var a = r,
          u = a.lib,
          n = u.BlockCipher,
          s = a.algo;
        const i = 16,
          o = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731],
          c = [
            [3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946],
            [1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055],
            [3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504],
            [976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462]
          ];
        var l = {
          pbox: [],
          sbox: []
        };

        function h(x, T) {
          let E = T >> 24 & 255,
            A = T >> 16 & 255,
            v = T >> 8 & 255,
            C = T & 255,
            N = x.sbox[0][E] + x.sbox[1][A];
          return N = N ^ x.sbox[2][v], N = N + x.sbox[3][C], N
        }

        function f(x, T, E) {
          let A = T,
            v = E,
            C;
          for (let N = 0; N < i; ++N) A = A ^ x.pbox[N], v = h(x, A) ^ v, C = A, A = v, v = C;
          return C = A, A = v, v = C, v = v ^ x.pbox[i], A = A ^ x.pbox[i + 1], {
            left: A,
            right: v
          }
        }

        function m(x, T, E) {
          let A = T,
            v = E,
            C;
          for (let N = i + 1; N > 1; --N) A = A ^ x.pbox[N], v = h(x, A) ^ v, C = A, A = v, v = C;
          return C = A, A = v, v = C, v = v ^ x.pbox[1], A = A ^ x.pbox[0], {
            left: A,
            right: v
          }
        }

        function p(x, T, E) {
          for (let D = 0; D < 4; D++) {
            x.sbox[D] = [];
            for (let w = 0; w < 256; w++) x.sbox[D][w] = c[D][w]
          }
          let A = 0;
          for (let D = 0; D < i + 2; D++) x.pbox[D] = o[D] ^ T[A], A++, A >= E && (A = 0);
          let v = 0,
            C = 0,
            N = 0;
          for (let D = 0; D < i + 2; D += 2) N = f(x, v, C), v = N.left, C = N.right, x.pbox[D] = v, x.pbox[D + 1] = C;
          for (let D = 0; D < 4; D++)
            for (let w = 0; w < 256; w += 2) N = f(x, v, C), v = N.left, C = N.right, x.sbox[D][w] = v, x.sbox[D][w + 1] = C;
          return !0
        }
        var b = s.Blowfish = n.extend({
          _doReset: function () {
            if (this._keyPriorReset !== this._key) {
              var x = this._keyPriorReset = this._key,
                T = x.words,
                E = x.sigBytes / 4;
              p(l, T, E)
            }
          },
          encryptBlock: function (x, T) {
            var E = f(l, x[T], x[T + 1]);
            x[T] = E.left, x[T + 1] = E.right
          },
          decryptBlock: function (x, T) {
            var E = m(l, x[T], x[T + 1]);
            x[T] = E.left, x[T + 1] = E.right
          },
          blockSize: 64 / 32,
          keySize: 128 / 32,
          ivSize: 64 / 32
        });
        a.Blowfish = n._createHelper(b)
      })(), r.Blowfish
    })
  })(qa)), qa.exports
}
var px = ia.exports,
  oi;

function bx() {
  return oi || (oi = 1, (function (e, t) {
    (function (r, a, u) {
      e.exports = a(ce(), Cu(), f6(), m6(), Ut(), x6(), Ht(), qd(), r0(), v6(), Wd(), C6(), N6(), I6(), a0(), L6(), Ct(), Se(), F6(), M6(), H6(), q6(), Y6(), V6(), j6(), X6(), J6(), ex(), rx(), ux(), sx(), ox(), dx(), fx(), mx())
    })(px, function (r) {
      return r
    })
  })(ia)), ia.exports
}
var xx = bx();
const Ex = mt(xx);
var ea = {};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var ci;

function gx() {
  if (ci) return ea;
  ci = 1, ea.parse = r, ea.serialize = a;
  var e = Object.prototype.toString,
    t = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

  function r(o, c) {
    if (typeof o != "string") throw new TypeError("argument str must be a string");
    for (var l = {}, h = c || {}, f = h.decode || u, m = 0; m < o.length;) {
      var p = o.indexOf("=", m);
      if (p === -1) break;
      var b = o.indexOf(";", m);
      if (b === -1) b = o.length;
      else if (b < p) {
        m = o.lastIndexOf(";", p - 1) + 1;
        continue
      }
      var x = o.slice(m, p).trim();
      if (l[x] === void 0) {
        var T = o.slice(p + 1, b).trim();
        T.charCodeAt(0) === 34 && (T = T.slice(1, -1)), l[x] = i(T, f)
      }
      m = b + 1
    }
    return l
  }

  function a(o, c, l) {
    var h = l || {},
      f = h.encode || n;
    if (typeof f != "function") throw new TypeError("option encode is invalid");
    if (!t.test(o)) throw new TypeError("argument name is invalid");
    var m = f(c);
    if (m && !t.test(m)) throw new TypeError("argument val is invalid");
    var p = o + "=" + m;
    if (h.maxAge != null) {
      var b = h.maxAge - 0;
      if (isNaN(b) || !isFinite(b)) throw new TypeError("option maxAge is invalid");
      p += "; Max-Age=" + Math.floor(b)
    }
    if (h.domain) {
      if (!t.test(h.domain)) throw new TypeError("option domain is invalid");
      p += "; Domain=" + h.domain
    }
    if (h.path) {
      if (!t.test(h.path)) throw new TypeError("option path is invalid");
      p += "; Path=" + h.path
    }
    if (h.expires) {
      var x = h.expires;
      if (!s(x) || isNaN(x.valueOf())) throw new TypeError("option expires is invalid");
      p += "; Expires=" + x.toUTCString()
    }
    if (h.httpOnly && (p += "; HttpOnly"), h.secure && (p += "; Secure"), h.partitioned && (p += "; Partitioned"), h.priority) {
      var T = typeof h.priority == "string" ? h.priority.toLowerCase() : h.priority;
      switch (T) {
      case "low":
        p += "; Priority=Low";
        break;
      case "medium":
        p += "; Priority=Medium";
        break;
      case "high":
        p += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid")
      }
    }
    if (h.sameSite) {
      var E = typeof h.sameSite == "string" ? h.sameSite.toLowerCase() : h.sameSite;
      switch (E) {
      case !0:
        p += "; SameSite=Strict";
        break;
      case "lax":
        p += "; SameSite=Lax";
        break;
      case "strict":
        p += "; SameSite=Strict";
        break;
      case "none":
        p += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid")
      }
    }
    return p
  }

  function u(o) {
    return o.indexOf("%") !== -1 ? decodeURIComponent(o) : o
  }

  function n(o) {
    return encodeURIComponent(o)
  }

  function s(o) {
    return e.call(o) === "[object Date]" || o instanceof Date
  }

  function i(o, c) {
    try {
      return c(o)
    } catch {
      return o
    }
  }
  return ea
}
var Ax = gx();
const Tx = mt(Ax);
var br = {
    exports: {}
  },
  di;

function vx() {
  if (di) return br.exports;
  di = 1;
  const {
    AbortController: e,
    AbortSignal: t
  } = typeof self < "u" ? self : typeof window < "u" ? window : void 0;
  return br.exports = e, br.exports.AbortSignal = t, br.exports.default = e, br.exports
}
var _x = vx();
const Yd = mt(_x);
var Xu, li;

function yx() {
  return li || (li = 1, Xu = typeof self == "object" ? self.FormData : window.FormData), Xu
}
var Cx = yx();
const Sx = mt(Cx);
class S extends Error {
  constructor(t) {
    super(`Couldn't find a stream: ${t??"not found"}`), this.name = "NotFoundError"
  }
}

function zd(e) {
  const t = [];
  return e.scrapeMovie && t.push("movie"), e.scrapeShow && t.push("show"), {
    type: "source",
    id: e.id,
    rank: e.rank,
    name: e.name,
    mediaTypes: t
  }
}

function Vd(e) {
  return {
    type: "embed",
    id: e.id,
    rank: e.rank,
    name: e.name
  }
}

function Nx(e) {
  return e.sources.sort((t, r) => r.rank - t.rank).map(zd)
}

function wx(e) {
  return e.embeds.sort((t, r) => r.rank - t.rank).map(Vd)
}

function Ix(e, t) {
  const r = e.sources.find(u => u.id === t);
  if (r) return zd(r);
  const a = e.embeds.find(u => u.id === t);
  return a ? Vd(a) : null
}

function Gd(e, t) {
  let r = (t == null ? void 0 : t.baseUrl) ?? "",
    a = e;
  r.length > 0 && !r.endsWith("/") && (r += "/"), a.startsWith("/") && (a = a.slice(1));
  const u = r + a;
  if (!u.startsWith("http://") && !u.startsWith("https://") && !u.startsWith("data:")) throw new Error(`Invald URL -- URL doesn't start with a http scheme: '${u}'`);
  const n = new URL(u);
  return Object.entries((t == null ? void 0 : t.query) ?? {}).forEach(([s, i]) => {
    n.searchParams.set(s, i)
  }), n.toString()
}

function fi(e) {
  const t = (a, u) => e(a, {
      headers: (u == null ? void 0 : u.headers) ?? {},
      method: (u == null ? void 0 : u.method) ?? "GET",
      query: (u == null ? void 0 : u.query) ?? {},
      baseUrl: (u == null ? void 0 : u.baseUrl) ?? "",
      readHeaders: (u == null ? void 0 : u.readHeaders) ?? [],
      body: u == null ? void 0 : u.body,
      credentials: u == null ? void 0 : u.credentials
    }),
    r = async (a, u) => (await t(a, u)).body;
  return r.full = t, r
}
const k = {
    CORS_ALLOWED: "cors-allowed",
    IP_LOCKED: "ip-locked",
    PROXY_BLOCKED: "proxy-blocked"
  },
  $g = {
    BROWSER: "browser"
  },
  Dx = {
    browser: {
      requires: [k.CORS_ALLOWED],
      disallowed: []
    },
    "browser-extension": {
      requires: [],
      disallowed: []
    },
    native: {
      requires: [],
      disallowed: []
    },
    any: {
      requires: [],
      disallowed: []
    }
  };

function Ox(e, t, r) {
  const a = Dx[e];
  return t || a.disallowed.push(k.IP_LOCKED), r && a.disallowed.push(k.PROXY_BLOCKED), a
}

function Br(e, t) {
  return !(!e.requires.every(u => t.includes(u)) || e.disallowed.some(u => t.includes(u)))
}
const Lx = {
  srt: "srt",
  vtt: "vtt"
};

function u0(e) {
  const r = Object.keys(Lx).find(a => e.endsWith(`.${a}`));
  return r || null
}

function lt(e) {
  const r = {
    "chinese - hong kong": "zh",
    "chinese - traditional": "zh",
    czech: "cs",
    danish: "da",
    dutch: "nl",
    english: "en",
    "english - sdh": "en",
    finnish: "fi",
    french: "fr",
    german: "de",
    greek: "el",
    hungarian: "hu",
    italian: "it",
    korean: "ko",
    norwegian: "no",
    polish: "pl",
    portuguese: "pt",
    "portuguese - brazilian": "pt",
    romanian: "ro",
    "spanish - european": "es",
    "spanish - latin american": "es",
    spanish: "es",
    swedish: "sv",
    turkish: "tr",
    "اَ لْ عَ رَ بِ يَّ ةُ": "ar",
    "বাংলা": "bn",
    filipino: "tl",
    indonesia: "id",
    "اردو": "ur",
    English: "en",
    Arabic: "ar",
    Bosnian: "bs",
    Bulgarian: "bg",
    Croatian: "hr",
    Czech: "cs",
    Danish: "da",
    Dutch: "nl",
    Estonian: "et",
    Finnish: "fi",
    French: "fr",
    German: "de",
    Greek: "el",
    Hebrew: "he",
    Hungarian: "hu",
    Indonesian: "id",
    Italian: "it",
    Norwegian: "no",
    Persian: "fa",
    Polish: "pl",
    Portuguese: "pt",
    "Protuguese (BR)": "pt-br",
    Romanian: "ro",
    Russian: "ru",
    russian: "ru",
    Serbian: "sr",
    Slovenian: "sl",
    Spanish: "es",
    Swedish: "sv",
    Thai: "th",
    Turkish: "tr",
    ng: "en",
    re: "fr",
    pa: "es"
  } [e.toLowerCase()];
  if (r) return r;
  const a = M1.getCode(e);
  return a.length === 0 ? null : a
}
async function Rx(e) {
  const t = new URL("https://libre-subs.fifthwit.net/search");
  Object.entries(e).forEach(([a, u]) => {
    u !== void 0 && t.searchParams.append(a, Array.isArray(u) ? u.join(",") : String(u))
  });
  const r = await fetch(t.toString());
  if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
  return r.json()
}
async function kx(e, t, r, a, u) {
  try {
    const n = {
      format: "srt",
      encoding: "utf-8",
      source: "all",
      imdb_id: r
    };
    t && !r ? n.tmdb_id = typeof t == "string" ? parseInt(t, 10) : t : r && (n.imdb_id = r), a && u && (n.season = a, n.episode = u);
    const i = (await Rx(n)).map(o => ({
      id: o.id,
      url: o.url,
      type: o.format,
      hasCorsRestrictions: !1,
      language: o.language,
      flagUrl: o.flagUrl,
      display: o.display,
      media: o.media,
      isHearingImpaired: o.isHearingImpaired,
      source: typeof o.source == "number" ? o.source.toString() : o.source,
      encoding: o.encoding
    }));
    return [...e, ...i]
  } catch (n) {
    return console.error("Error fetching Wyzie subtitles:", n), e
  }
}
const hi = (e, t) => new Promise(r => {
  setTimeout(() => {
    console.error(`${t} captions request timed out after ${e}ms`), r(null)
  }, e)
});
async function nu(e, t, r) {
  var a, u;
  try {
    const [n, s, i] = atob(r).split(".").map((m, p) => p === 0 ? m : Number(m) || null);
    if (!n) return e;
    const o = [...e],
      c = kx([], ((u = (a = t.media) == null ? void 0 : a.tmdbId) == null ? void 0 : u.toString()) || "", n.toString(), typeof s == "number" ? s : void 0, typeof i == "number" ? i : void 0).then(m => m && m.length > 0 ? m.map(p => ({
        ...p,
        opensubtitles: !0
      })) : []).catch(m => (console.error("Wyzie subtitles fetch failed:", m), [])),
      l = t.proxiedFetcher(`https://rest.opensubtitles.org/search/${s&&i?`episode-${i}/`:""}imdbid-${n.slice(2)}${s&&i?`/season-${s}`:""}`, {
        headers: {
          "X-User-Agent": "VLSub 0.10.2"
        }
      }).then(m => {
        const p = [];
        for (const b of m) {
          const x = b.SubDownloadLink.replace(".gz", "").replace("download/", "download/subencoding-utf8/"),
            T = lt(b.LanguageName);
          !x || !T || p.push({
            id: x,
            opensubtitles: !0,
            url: x,
            type: b.SubFormat || "srt",
            hasCorsRestrictions: !1,
            language: T
          })
        }
        return p
      }).catch(m => (console.error("OpenSubtitles fetch failed:", m), [])),
      [h, f] = await Promise.all([Promise.race([c, hi(2e3, "Wyzie")]), Promise.race([l, hi(5e3, "OpenSubtitles")])]);
    return h && o.push(...h), f && o.push(...f), o
  } catch (n) {
    return console.error("Error in addOpenSubtitlesCaptions:", n), e
  }
}
const Bx = [{
    url: "https://hahoy.server.arlen.icu",
    rank: 5
  }, {
    url: "https://hahoy.server.arlen.icu",
    rank: 3
  }],
  Fx = [{
    url: "/.netlify/functions/hahoy-server/mp4",
    rank: 5
  }, {
    url: "/.netlify/functions/hahoy-server/mp4",
    rank: 2
  }],
  Px = () => {
    const e = [];
    for (const r of Bx)
      for (let a = 0; a < r.rank; a++) e.push(r.url);
    const t = Math.floor(Math.random() * e.length);
    return e[t]
  },
  Mx = () => {
    const e = [];
    for (const r of Fx)
      for (let a = 0; a < r.rank; a++) e.push(r.url);
    const t = Math.floor(Math.random() * e.length);
    return e[t]
  },
  mi = "https://kal-proxy.netlify.app/";
let jd = Px();
const Ux = Mx();

function su(e) {
  return !!(!e.flags.includes(k.CORS_ALLOWED) || e.headers && Object.keys(e.headers).length > 0)
}

function iu(e) {
  const t = e.headers && Object.keys(e.headers).length > 0 ? e.headers : void 0,
    r = {
      ...e.type === "hls" && {
        depth: e.proxyDepth ?? 0
      }
    },
    a = {
      headers: t,
      options: r
    };
  return e.type === "hls" && (a.type = "hls", a.url = e.playlist, e.playlist = `${mi}?${new URLSearchParams({payload:Buffer.from(JSON.stringify(a)).toString("base64url")})}`), e.type === "file" && (a.type = "mp4", Object.entries(e.qualities).forEach(u => {
    a.url = u[1].url, u[1].url = `${mi}?${new URLSearchParams({payload:Buffer.from(JSON.stringify(a)).toString("base64url")})}`
  })), e.headers = {}, e.flags = [k.CORS_ALLOWED], e
}

function Ie(e, t = {}) {
  const r = encodeURIComponent(e),
    a = encodeURIComponent(JSON.stringify(t));
  return `${jd}/m3u8-proxy?url=${r}${t?`&headers=${a}`:""}`
}

function Hx(e) {
  return e.includes("/m3u8-proxy?url=") ? e.replace(/https:\/\/[^/]+\/m3u8-proxy/, `${jd}/m3u8-proxy`) : e
}

function we(e, t = {}) {
  const r = document && document.querySelector('meta[name="referrer"]');
  r && r.setAttribute("content", "origin");
  const a = encodeURIComponent(e),
    u = encodeURIComponent(JSON.stringify(t));
  return `${Ux}?url=${a}${t&&Object.keys(t).length?`&headers=${u}`:""}`
}

function ee(e) {
  const t = [];
  return e.scrapeMovie && t.push("movie"), e.scrapeShow && t.push("show"), {
    ...e,
    type: "source",
    disabled: e.disabled ?? !1,
    externalSource: e.externalSource ?? !1,
    mediaTypes: t
  }
}

function he(e) {
  return {
    ...e,
    type: "embed",
    disabled: e.disabled ?? !1,
    mediaTypes: void 0
  }
}
const $x = atob("aHR0cHM6Ly9jaW5lbWFvcy12My52ZXJjZWwuYXBwL2FwaS9uZW8vYmFja2VuZGZldGNo");

function qx(e, t) {
  return he({
    id: `cinemaos-${e}`,
    name: `${e.charAt(0).toUpperCase()+e.slice(1)}`,
    rank: t,
    async scrape(r) {
      var a;
      const u = JSON.parse(r.url),
        {
          tmdbId: n,
          type: s,
          season: i,
          episode: o
        } = u;
      let c = `${$x}?requestID=${s==="show"?"tvVideoProvider":"movieVideoProvider"}&id=${n}&service=${e}`;
      s === "show" && (c += `&season=${i}&episode=${o}`);
      const l = await r.proxiedFetcher(c),
        h = typeof l == "string" ? JSON.parse(l) : l,
        f = (a = h == null ? void 0 : h.data) == null ? void 0 : a.sources;
      if (!f || !Array.isArray(f) || f.length === 0) throw new S("No sources found");
      if (r.progress(80), f.length === 1) return {
        stream: [{
          id: "primary",
          type: "hls",
          playlist: f[0].url,
          flags: [k.CORS_ALLOWED],
          captions: []
        }]
      };
      const m = {};
      for (const p of f) {
        const b = (p.quality || p.source || "unknown").toString();
        let x;
        b === "4K" ? x = 2160 : x = parseInt(b.replace("P", ""), 10), !(Number.isNaN(x) || m[x]) && (m[x] = {
          type: "mp4",
          url: p.url
        })
      }
      return {
        stream: [{
          id: "primary",
          type: "file",
          flags: [k.CORS_ALLOWED],
          qualities: m,
          captions: []
        }]
      }
    }
  })
}
const Wx = ["shadow", "asiacloud", "ophim"],
  Yx = Wx.map((e, t) => qx(e, 300 - t));

function zx(e, t = 100) {
  return he({
    id: `cinemaos-hexa-${e}`,
    name: `Hexa ${e.charAt(0).toUpperCase()+e.slice(1)}`,
    disabled: !0,
    rank: t,
    async scrape(r) {
      const u = JSON.parse(r.url).directUrl;
      if (!u) throw new S("No directUrl provided for Hexa embed");
      return {
        stream: [{
          id: "primary",
          type: "hls",
          playlist: Ie(u, {
            referer: "https://megacloud.store/",
            origin: "https://megacloud.store"
          }),
          flags: [k.CORS_ALLOWED],
          captions: []
        }]
      }
    }
  })
}
const Vx = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india"],
  Gx = Vx.map((e, t) => zx(e, 315 - t)),
  jx = [{
    id: "vidsrc-comet",
    name: "Comet",
    rank: 39
  }, {
    id: "vidsrc-pulsar",
    name: "Pulsar",
    rank: 38
  }, {
    id: "vidsrc-nova",
    name: "Nova",
    rank: 37
  }],
  Kx = {
    referer: "https://vidsrc.vip/",
    origin: "https://vidsrc.vip"
  };

function Xx(e) {
  return he({
    id: e.id,
    name: e.name,
    rank: e.rank,
    async scrape(t) {
      return t.url.includes("https://cdn.niggaflix.xyz") ? {
        stream: [{
          id: "primary",
          type: "hls",
          playlist: Ie(t.url, Kx),
          flags: [k.CORS_ALLOWED],
          captions: []
        }]
      } : {
        stream: [{
          id: "primary",
          type: "hls",
          playlist: t.url,
          flags: [k.CORS_ALLOWED],
          captions: []
        }]
      }
    }
  })
}
const [Qx, Jx, Kd] = jx.map(Xx), Tr = "https://embed.warezcdn.link", Qu = "https://warezcdn.link/player", Zx = "https://workerproxy.warezcdn.workers.dev";

function eE(e) {
  let t = atob(e);
  t = t.trim(), t = t.split("").reverse().join("");
  let r = t.slice(-5);
  return r = r.split("").reverse().join(""), t = t.slice(0, -5), `${t}${r}`
}
async function Xd(e) {
  var t;
  const a = (t = (await e.proxiedFetcher("/player.php", {
    baseUrl: Qu,
    headers: {
      Referer: `${Qu}/getEmbed.php?${new URLSearchParams({id:e.url,sv:"warezcdn"})}`
    },
    query: {
      id: e.url
    }
  })).match(/let allowanceKey = "(.*?)";/)) == null ? void 0 : t[1];
  if (!a) throw new S("Failed to get allowanceKey");
  const u = await e.proxiedFetcher("/functions.php", {
      baseUrl: Qu,
      method: "POST",
      body: new URLSearchParams({
        getVideo: e.url,
        key: a
      })
    }),
    n = JSON.parse(u);
  if (!n.id) throw new S("can't get stream id");
  const s = eE(n.id);
  if (!s) throw new S("can't get file id");
  return s
}
const tE = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
async function rE(e, t) {
  for (const r of tE) {
    const a = `https://cloclo${r}.cloud.mail.ru/weblink/view/${t}`;
    if ((await e.proxiedFetcher.full(a, {
        method: "GET",
        headers: {
          Range: "bytes=0-1"
        }
      })).statusCode === 206) return a
  }
  return null
}
const n0 = he({
    id: "warezcdnembedmp4",
    name: "WarezCDN MP4",
    rank: 82,
    disabled: !0,
    async scrape(e) {
      const t = await Xd(e);
      if (!t) throw new S("can't get file id");
      const r = await rE(e, t);
      if (!r) throw new S("can't get stream id");
      return {
        stream: [{
          id: "primary",
          captions: [],
          qualities: {
            unknown: {
              type: "mp4",
              url: `${Zx}/?${new URLSearchParams({url:r})}`
            }
          },
          type: "file",
          flags: [k.CORS_ALLOWED]
        }]
      }
    }
  }),
  aE = "https://xprime.tv/foxtemp",
  uE = "https://kendrickl-3amar.site",
  nE = "https://xprime.tv/primebox",
  sE = "https://backend.xprime.tv/marant",
  s0 = {
    "chinese - hong kong": "zh",
    "chinese - traditional": "zh",
    czech: "cs",
    danish: "da",
    dutch: "nl",
    english: "en",
    "english - sdh": "en",
    finnish: "fi",
    french: "fr",
    german: "de",
    greek: "el",
    hungarian: "hu",
    italian: "it",
    korean: "ko",
    norwegian: "no",
    polish: "pl",
    portuguese: "pt",
    "portuguese - brazilian": "pt",
    romanian: "ro",
    "spanish - european": "es",
    "spanish - latin american": "es",
    swedish: "sv",
    turkish: "tr",
    "اَ لْ عَ رَ بِ يَّ ةُ": "ar",
    "বাংলা": "bn",
    filipino: "tl",
    indonesia: "id",
    اردو: "ur"
  },
  Qd = he({
    id: "xprime-fox",
    name: "Fox",
    rank: 241,
    async scrape(e) {
      var t;
      const r = JSON.parse(e.url),
        a = new URLSearchParams({
          name: r.title,
          pstream: "true"
        });
      r.type === "show" && (a.append("season", r.season.toString()), a.append("episode", r.episode.toString()));
      const u = await e.fetcher(`${aE}?${a.toString()}`);
      if (!u) throw new S("No response received");
      const n = await JSON.parse(u);
      if (!n.url) throw new S("No stream URL found in response");
      const s = ((t = n.subtitles) == null ? void 0 : t.map(i => ({
        type: "vtt",
        url: i.file,
        language: s0[i.label.toLowerCase()] || "unknown"
      }))) || [];
      return e.progress(90), {
        stream: [{
          type: "hls",
          id: "primary",
          playlist: `https://oca.kendrickl-3amar.site/?v=${encodeURIComponent(n.url)}&headers=${encodeURIComponent(JSON.stringify({referer:"https://megacloud.store/",origin:"https://megacloud.store"}))}`,
          flags: [k.CORS_ALLOWED],
          captions: s
        }]
      }
    }
  }),
  Jd = he({
    id: "xprime-apollo",
    name: "Appolo",
    rank: 243,
    async scrape(e) {
      var t, r;
      const a = JSON.parse(e.url);
      let u = `${uE}/${a.tmdbId}`;
      a.type === "show" && (u += `/${a.season}/${a.episode}`);
      const n = await e.fetcher(u);
      if (!n) throw new S("No response received");
      if (n.error) throw new S(n.error);
      if (!n.url) throw new S("No stream URL found in response");
      const s = ((t = n.subtitles) == null ? void 0 : t.map(i => ({
        type: "vtt",
        url: i.file,
        language: s0[i.label.toLowerCase()] || "unknown"
      }))) || [];
      return e.progress(90), {
        stream: [{
          type: "hls",
          id: "primary",
          playlist: n.url,
          flags: [k.CORS_ALLOWED],
          captions: s,
          ...(r = n.thumbnails) != null && r.file ? {
            thumbnailTrack: {
              type: "vtt",
              url: n.thumbnails.file
            }
          } : {}
        }]
      }
    }
  }),
  Zd = he({
    id: "xprime-streambox",
    name: "Streambox",
    rank: 242,
    async scrape(e) {
      var t;
      const r = JSON.parse(e.url);
      let a = nE;
      r.type === "show" ? a += `?id=${r.tmdbId}&season=${r.season}&episode=${r.episode}` : a += `?id=${r.tmdbId}`;
      const u = await e.fetcher(a);
      if (!u) throw new S("No response received");
      if (u.error) throw new S(u.error);
      if (!u.streams) throw new S("No streams found in response");
      return {
        stream: [{
          id: "primary",
          captions: ((t = u.subtitles) == null ? void 0 : t.map(s => ({
            id: s.label,
            url: s.file,
            language: s0[s.label.toLowerCase()] || "unknown",
            type: "srt"
          }))) || [],
          qualities: {
            ...u.streams["1080p"] && {
              1080: {
                type: "mp4",
                url: u.streams["1080p"]
              }
            },
            ...u.streams["720p"] && {
              720: {
                type: "mp4",
                url: u.streams["720p"]
              }
            },
            ...u.streams["480p"] && {
              480: {
                type: "mp4",
                url: u.streams["480p"]
              }
            },
            ...u.streams["360p"] && {
              360: {
                type: "mp4",
                url: u.streams["360p"]
              }
            }
          },
          type: "file",
          flags: [k.CORS_ALLOWED]
        }]
      }
    }
  }),
  el = he({
    id: "xprime-marant",
    name: "Marant",
    rank: 240,
    async scrape(e) {
      const t = JSON.parse(e.url);
      let r = `${sE}?id=${t.tmdbId}`;
      t.type === "show" && (r += `&season=${t.season}&episode=${t.episode}`);
      const a = await await e.fetcher(r);
      if (!a) throw new S("No response received");
      if (a.error) throw new S(a.error);
      if (!a.url) throw new S("No stream URL found in response");
      return e.progress(90), {
        stream: [{
          type: "hls",
          id: "primary",
          playlist: a.url,
          flags: [k.CORS_ALLOWED],
          captions: []
        }]
      }
    }
  }),
  iE = [{
    url: "https://hahoy.server.arlen.icu",
    rank: 6
  }, {
    url: "https://hahoy.server.arlen.icu",
    rank: 5
  }, {
    url: "https://hahoy.server.arlen.icu",
    rank: 1
  }],
  oE = () => {
    const e = [];
    for (const r of iE)
      for (let a = 0; a < r.rank; a++) e.push(r.url);
    const t = Math.floor(Math.random() * e.length);
    return e[t]
  },
  Ee = oE(),
  pi = `${Ee}/aether`;
async function bi(e) {
  const t = e.media.type === "movie" ? `${pi}/${e.media.tmdbId}` : `${pi}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams) throw new S("No streams found");
  const u = Array.isArray(a.streams) ? a.streams : [a.streams];
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((i, o) => {
      let c = "";
      return o.quality === "2160P" || o.quality === "4K" ? c = "4k" : c = o.quality.toLowerCase(), i[c] || (i[c] = []), o.format === "mp4" && i[c].push({
        type: o.format || "mkv",
        url: o.url
      }), i
    }, {}),
    s = Object.entries(n).reduce((i, [o, c]) => (c.forEach((l, h) => {
      const f = c.length > 1 ? `${o}-${h+1}` : o;
      i[f] = l
    }), i), {});
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: s,
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const tl = ee({
    id: "aether",
    name: "Aether",
    rank: 25,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: bi,
    scrapeShow: bi
  }),
  xi = `${Ee}/autobahn`;
async function cE(e) {
  const t = e.media.type === "movie" ? `${xi}/${e.media.tmdbId}` : `${xi}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams) throw new S("No streams found");
  const u = Array.isArray(a.streams) ? a.streams : [a.streams];
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((i, o) => {
      let c = "";
      return o.quality === "2160P" || o.quality === "4K" ? c = "4k" : c = o.quality.toLowerCase(), i[c] || (i[c] = []), i[c].push({
        type: o.format || "mkv",
        url: o.url,
        language: o.language || "english"
      }), i
    }, {}),
    s = Object.entries(n).reduce((i, [o, c]) => (c.forEach(l => {
      const h = c.length > 1 ? `${o}-${l.language}` : o;
      i[h] = l
    }), i), {});
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: s,
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const rl = ee({
    id: "autobahn",
    name: "Autobahn",
    rank: 85,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeShow: cE
  }),
  Ei = `${Ee}/berlin`;
async function gi(e) {
  const t = e.media.type === "movie" ? `${Ei}/${e.media.tmdbId}` : `${Ei}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams || a.streams.length === 0) throw new S("No valid stream found");
  const u = document && document.querySelector('meta[name="referrer"]');
  u && u.setAttribute("content", "origin");
  const n = a.streams[0].url;
  return {
    embeds: [],
    stream: [{
      id: "primary",
      type: "hls",
      playlist: n,
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}
const al = ee({
    id: "berlin",
    name: "berlin",
    rank: 66,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: gi,
    scrapeShow: gi
  }),
  Ai = `${Ee}/bloop`;
async function Ti(e) {
  const t = e.media.type === "movie" ? `${Ai}/${e.media.tmdbId}` : `${Ai}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams) throw new S("No streams found");
  const u = Array.isArray(a.streams) ? a.streams : [a.streams];
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((i, o) => {
      const c = parseInt(o.quality.replace("p", ""), 10);
      return Number.isNaN(c) || i[c] || (i[c] = o.url), i
    }, {}),
    s = a.info.headers || {};
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        ...n[2160] && {
          "4k": {
            type: "mp4",
            url: we(n[2160], s)
          }
        },
        ...n[1080] && {
          1080: {
            type: "mp4",
            url: we(n[1080], s)
          }
        },
        ...n[720] && {
          720: {
            type: "mp4",
            url: we(n[720], s)
          }
        },
        ...n[480] && {
          480: {
            type: "mp4",
            url: we(n[480], s)
          }
        },
        ...n[360] && {
          360: {
            type: "mp4",
            url: we(n[360], s)
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const ul = ee({
    id: "bloop",
    name: "Bloop",
    rank: 37,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Ti,
    scrapeShow: Ti
  }),
  vi = `${Ee}/clumsy`;
async function _i(e) {
  const t = e.media.type === "movie" ? `${vi}/${e.media.tmdbId}` : `${vi}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams) throw new S("No streams found");
  const u = Array.isArray(a.streams) ? a.streams : [a.streams];
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((i, o) => {
      let c = "";
      const l = o.url.toLowerCase();
      return l.includes("4k") && l.includes("hdr") ? c = "4k-hdr" : l.includes("1080") && l.includes("hdr") ? c = "1080-hdr" : l.includes("720") && l.includes("hdr") ? c = "720-hdr" : o.quality === "ORG" ? c = "original" : o.quality === "2160P" || o.quality === "4K" ? c = "4k" : c = o.quality.replace("P", ""), i[c] || (i[c] = []), i[c].push({
        type: "mp4",
        url: o.url
      }), i
    }, {}),
    s = Object.entries(n).reduce((i, [o, c]) => (c.forEach((l, h) => {
      const f = c.length > 1 ? `${o}-${h+1}` : o;
      i[f] = l
    }), i), {});
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: s,
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const nl = ee({
    id: "clumsy",
    name: "Clumsy",
    rank: 23,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: _i,
    scrapeShow: _i
  }),
  yi = `${Ee}/cosmic`,
  dE = () => {
    try {
      return typeof window < "u" ? window.localStorage.getItem("ui-token") : null
    } catch (e) {
      return console.warn("Unable to access localStorage:", e), null
    }
  };
async function Ci(e) {
  var t;
  const r = dE();
  if (!r) throw new S("no 4k token");
  const a = e.media.type === "movie" ? `${yi}/${e.media.tmdbId}` : `${yi}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    u = await e.fetcher(a, {
      headers: {
        "ui-token": r || ""
      }
    });
  if (!u) throw new S("No response from API");
  const n = await u;
  if (!n.streams) throw new S("No streams found");
  const s = Array.isArray(n.streams) ? n.streams : [n.streams];
  if (s.length === 0 || !s[0].url) throw new S("No valid streams found");
  const i = ((t = n.subtitles) == null ? void 0 : t.map(l => ({
      id: l.subtitleName,
      url: l.url,
      language: lt(l.langCode) || "en",
      hasCorsRestrictions: !1,
      type: "srt"
    }))) || [],
    o = s.reduce((l, h) => {
      let f = "";
      const m = h.url.toLowerCase();
      return m.includes("4k") && m.includes("hdr") ? f = "4k-hdr" : m.includes("1080") && m.includes("hdr") ? f = "1080-hdr" : m.includes("720") && m.includes("hdr") ? f = "720-hdr" : h.quality === "ORG" ? f = "original" : h.quality === "2160P" || h.quality === "4K" ? f = "4k" : f = h.quality.replace("P", ""), l[f] || (l[f] = []), l[f].push({
        type: h.type,
        url: h.url
      }), l
    }, {}),
    c = Object.entries(o).reduce((l, [h, f]) => (f.forEach((m, p) => {
      const b = f.length > 1 ? `${h}-${p+1}` : h;
      l[b] = m
    }), l), {});
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: i,
      qualities: c,
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const sl = ee({
    id: "cosmic",
    name: "Cosmic(4k)",
    rank: 100,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Ci,
    scrapeShow: Ci
  }),
  Si = "https://hahoy.server.arlen.icu/dandy";
async function Ni(e) {
  const t = e.media.type === "movie" ? `${Si}/${e.media.tmdbId}` : `${Si}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a) throw new S("No streams found");
  const u = a.streams;
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((s, i) => {
    const o = i.quality.split("p")[0];
    return Number.isNaN(Number(o)) || (s[o] = i.url), s
  }, {});
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        ...n[480] && {
          480: {
            type: "mkv",
            url: n[480]
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const il = ee({
    id: "dandy",
    name: "Dandy",
    rank: 13,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Ni,
    scrapeShow: Ni
  }),
  wi = "https://hahoy.server.arlen.icu/drear";
async function Ii(e) {
  const t = e.media.type === "movie" ? `${wi}/${e.media.tmdbId}` : `${wi}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a) throw new S("No streams found");
  const u = a.streams;
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((s, i) => {
    const o = i.quality.split("p")[0];
    return Number.isNaN(Number(o)) || (s[o] = i.url), s
  }, {});
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        ...n[720] && {
          720: {
            type: "mkv",
            url: n[720]
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const ol = ee({
    id: "drear",
    name: "Drear",
    rank: 18,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Ii,
    scrapeShow: Ii
  }),
  Di = `${Ee}/fanta`;
async function Oi(e) {
  var t;
  const r = e.media.type === "movie" ? `${Di}/${e.media.tmdbId}` : `${Di}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    a = await e.fetcher(r);
  if (!a) throw new S("No response from API");
  const u = await a;
  if (!u) throw new S("No streams found");
  const n = u.streams;
  if (n.length === 0 || !n[0].url) throw new S("No valid streams found");
  const s = n.reduce((o, c) => {
      const l = c.quality.split("p")[0];
      return Number.isNaN(Number(l)) || (o[l] = c.url), o
    }, {}),
    i = ((t = u.info) == null ? void 0 : t.headers) || {};
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        ...s[720] && {
          720: {
            type: "mkv",
            url: we(s[720], i)
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const cl = ee({
    id: "fanta",
    name: "Fanta",
    rank: 8,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Oi,
    scrapeShow: Oi
  }),
  Li = "https://hahoy.server.arlen.icu/floon";
async function Ri(e) {
  const t = e.media.type === "movie" ? `${Li}/${e.media.tmdbId}` : `${Li}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a) throw new S("No streams found");
  const u = a.streams;
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((s, i) => {
    const o = i.quality.split("p")[0];
    return Number.isNaN(Number(o)) || (s[o] = i.url), s
  }, {});
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        ...n[480] && {
          480: {
            type: "mkv",
            url: n[480]
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const dl = ee({
    id: "floon",
    name: "Floon",
    rank: 20,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Ri,
    scrapeShow: Ri
  }),
  ki = `${Ee}/florp`;
async function Bi(e) {
  const t = e.media.type === "movie" ? `${ki}/${e.media.tmdbId}` : `${ki}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams) throw new S("No streams found");
  const u = Array.isArray(a.streams) ? a.streams : [a.streams];
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((i, o) => {
      const c = parseInt(o.quality.replace("p", ""), 10);
      return Number.isNaN(c) || i[c] || (i[c] = o.url), i
    }, {}),
    s = a.info.headers || {};
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        ...n[2160] && {
          "4k": {
            type: "mp4",
            url: we(n[2160], s)
          }
        },
        ...n[1080] && {
          1080: {
            type: "mp4",
            url: we(n[1080], s)
          }
        },
        ...n[720] && {
          720: {
            type: "mp4",
            url: we(n[720], s)
          }
        },
        ...n[480] && {
          480: {
            type: "mp4",
            url: we(n[480], s)
          }
        },
        ...n[360] && {
          360: {
            type: "mp4",
            url: we(n[360], s)
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const ll = ee({
    id: "florp",
    name: "Florp",
    rank: 43,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Bi,
    scrapeShow: Bi
  }),
  lE = `${Ee}/nimble`;
async function fE(e) {
  const t = `${lE}/${e.media.tmdbId}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams) throw new S("No streams found");
  const u = Array.isArray(a.streams) ? a.streams : [a.streams];
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = {},
    s = {},
    i = {};
  return u.forEach(c => {
    const l = c.quality.toLowerCase();
    let h, f = !1,
      m = !1;
    if (l.includes("hevc") && (f = !0), l.includes("untouch") && (m = !0), l.includes("4k") || l.includes("2160p")) h = 2160;
    else if (l.includes("1080p")) h = 1080;
    else if (l.includes("720p")) h = 720;
    else if (l.includes("480p")) h = 480;
    else if (l.includes("360p")) h = 360;
    else {
      const p = l.match(/(\d+)p/i);
      h = p ? parseInt(p[1], 10) : 0
    }
    h > 0 && (m ? i[h] = c.url : f ? s[h] = c.url : n[h] = c.url)
  }), {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        ...n[2160] && {
          "4k": {
            type: "mp4",
            url: n[2160]
          }
        },
        ...n[1080] && {
          1080: {
            type: "mp4",
            url: n[1080]
          }
        },
        ...n[720] && {
          720: {
            type: "mp4",
            url: n[720]
          }
        },
        ...n[480] && {
          480: {
            type: "mp4",
            url: n[480]
          }
        },
        ...n[360] && {
          360: {
            type: "mp4",
            url: n[360]
          }
        },
        ...s[2160] && {
          "4k-hevc": {
            type: "mp4",
            url: s[2160]
          }
        },
        ...s[1080] && {
          "1080-hevc": {
            type: "mp4",
            url: s[1080]
          }
        },
        ...s[720] && {
          "720-hevc": {
            type: "mp4",
            url: s[720]
          }
        },
        ...i[2160] && {
          "4k-untouched": {
            type: "mp4",
            url: i[2160]
          }
        },
        ...i[1080] && {
          "1080-untouched": {
            type: "mp4",
            url: i[1080]
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const hE = ee({
    id: "nimble",
    name: "Nimble(Hindi+english)",
    rank: 96,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: fE
  }),
  Fi = `${Ee}/glint`;
async function Pi(e) {
  const t = e.media.type === "movie" ? `${Fi}/${e.media.tmdbId}` : `${Fi}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a) throw new S("No streams found");
  const u = a.streams;
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((s, i) => {
    const o = i.quality.split("p")[0];
    return Number.isNaN(Number(o)) || (s[o] = i.url), s
  }, {});
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        ...n[720] && {
          720: {
            type: "mp4",
            url: n[720]
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const fl = ee({
    id: "glint",
    name: "Glint",
    rank: 35,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Pi,
    scrapeShow: Pi
  }),
  Mi = `${Ee}/halycon`;
async function Ui(e) {
  const t = e.media.type === "movie" ? `${Mi}/${e.media.tmdbId}` : `${Mi}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams || a.streams.length === 0) throw new S("No valid stream found");
  const u = document && document.querySelector('meta[name="referrer"]');
  u && u.setAttribute("content", "origin");
  const n = a.streams[0].url;
  return {
    embeds: [],
    stream: [{
      id: "primary",
      type: "hls",
      playlist: n,
      flags: [k.CORS_ALLOWED],
      captions: []
    }, {
      id: "second",
      type: "hls",
      playlist: a.streams[1].url ?? "",
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}
const hl = ee({
    id: "halycon",
    name: "Halycon",
    rank: 86,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Ui,
    scrapeShow: Ui
  }),
  Hi = `${Ee}/meepet`;
async function $i(e) {
  const t = e.media.type === "movie" ? `${Hi}/${e.media.tmdbId}` : `${Hi}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams) throw new S("No streams found");
  const u = Array.isArray(a.streams) ? a.streams : [a.streams];
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((i, o) => {
      let c;
      return o.resolutions === "2160" || o.resolutions.includes("4K") ? c = 2160 : c = parseInt(o.resolutions.replace("P", ""), 10), Number.isNaN(c) || i[c] || (i[c] = o.url), i
    }, {}),
    s = {
      Referer: "https://moviebox.ph"
    };
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        ...n[2160] && {
          "4k": {
            type: "mp4",
            url: we(n[2160], s)
          }
        },
        ...n[1080] && {
          1080: {
            type: "mp4",
            url: we(n[1080], s)
          }
        },
        ...n[720] && {
          720: {
            type: "mp4",
            url: we(n[720], s)
          }
        },
        ...n[480] && {
          480: {
            type: "mp4",
            url: we(n[480], s)
          }
        },
        ...n[360] && {
          360: {
            type: "mp4",
            url: we(n[360], s)
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const ml = ee({
    id: "meepet",
    name: "Meepet",
    rank: 60,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: $i,
    scrapeShow: $i
  }),
  qi = `${Ee}/nimbus`;
async function Wi(e) {
  const t = e.media.type === "movie" ? `${qi}/${e.media.tmdbId}` : `${qi}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a) throw new S("No streams found");
  const u = a.stream;
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        480: {
          type: "mp4",
          url: u.url
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const pl = ee({
    id: "nimbus",
    name: "Nimbus",
    rank: 30,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Wi,
    scrapeShow: Wi
  }),
  Yi = `${Ee}/shimmer`;
async function zi(e) {
  const t = e.media.type === "movie" ? `${Yi}/${e.media.tmdbId}` : `${Yi}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams) throw new S("No streams found");
  const u = Array.isArray(a.streams) ? a.streams : [a.streams];
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((s, i) => {
    var o;
    const c = (o = i.quality) == null ? void 0 : o.trim();
    return !c || s[c] || (s[c] = i.url), s
  }, {});
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: Object.fromEntries(Object.entries(n).map(([s, i]) => [s, {
        type: "mp4",
        url: i
      }])),
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const bl = ee({
    id: "shimmer",
    name: "Shimmer(hindi+english)",
    rank: 40,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: zi,
    scrapeShow: zi
  }),
  Vi = `${Ee}/trenches`;
async function Gi(e) {
  const t = e.media.type === "movie" ? `${Vi}/${e.media.tmdbId}` : `${Vi}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams || !a.streams.hls) throw new S("No valid 1080p stream found");
  const u = Ie(a.streams.hls);
  return {
    embeds: [],
    stream: [{
      id: "primary",
      type: "hls",
      playlist: u,
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}
const xl = ee({
    id: "trenches",
    name: "Trenches",
    rank: 70,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Gi,
    scrapeShow: Gi
  }),
  ji = `${Ee}/twopack`;
async function Ki(e) {
  const t = e.media.type === "movie" ? `${ji}/${e.media.tmdbId}` : `${ji}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams || !a.streams.hls) throw new S("No valid stream found");
  const u = document && document.querySelector('meta[name="referrer"]');
  u && u.setAttribute("content", "origin");
  const n = a.streams.hls;
  return {
    embeds: [],
    stream: [{
      id: "primary",
      type: "hls",
      playlist: n,
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}
const El = ee({
    id: "twopack",
    name: "Tupac",
    rank: 80,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Ki,
    scrapeShow: Ki
  }),
  Xi = `${Ee}/umbra`;
async function Qi(e) {
  const t = e.media.type === "movie" ? `${Xi}/${e.media.tmdbId}` : `${Xi}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams || !a.streams.hls) throw new S("No valid stream found");
  const u = Ie(a.streams.hls, {
    referer: a.info.headers.referer
  });
  return {
    embeds: [],
    stream: [{
      id: "primary",
      type: "hls",
      playlist: u,
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}
const gl = ee({
    id: "umbra",
    name: "Umbra",
    rank: 50,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Qi,
    scrapeShow: Qi
  }),
  Ji = `${Ee}/wither`;
async function Zi(e) {
  const t = e.media.type === "movie" ? `${Ji}/${e.media.tmdbId}` : `${Ji}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams || !a.streams.hls) throw new S("No valid stream found");
  const u = document && document.querySelector('meta[name="referrer"]');
  u && u.setAttribute("content", "origin");
  const n = a.streams.hls;
  return {
    embeds: [],
    stream: [{
      id: "primary",
      type: "hls",
      playlist: n,
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}
const Al = ee({
    id: "wither",
    name: "Wither",
    rank: 75,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Zi,
    scrapeShow: Zi
  }),
  eo = `${Ee}/woot`;
async function to(e) {
  const t = e.media.type === "movie" ? `${eo}/${e.media.tmdbId}` : `${eo}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.stream.url) throw new S("No valid 1080p stream found");
  const u = document && document.querySelector('meta[name="referrer"]');
  return u && u.setAttribute("content", "origin"), {
    embeds: [],
    stream: [{
      id: "primary",
      type: "file",
      flags: [k.CORS_ALLOWED],
      captions: [],
      qualities: {
        1080: {
          type: "mp4",
          url: a.stream.url
        }
      }
    }]
  }
}
const Tl = ee({
  id: "wooter",
  name: "Wooter (1080p)",
  rank: 65,
  disabled: !1,
  flags: [k.CORS_ALLOWED],
  scrapeMovie: to,
  scrapeShow: to
});
async function Ju(e) {
  const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    r = e.replace(/=+$/, "");
  let a = "";
  if (r.length % 4 === 1) throw new Error("The string to be decoded is not correctly encoded.");
  for (let u = 0, n = 0, s = 0; s < r.length; s++) {
    const i = r.charAt(s),
      o = t.indexOf(i);
    o !== -1 && (n = u % 4 ? n * 64 + o : o, u++ % 4 && (a += String.fromCharCode(255 & n >> (-2 * u & 6))))
  }
  return a
}
async function ro(e) {
  const t = `https://embed.su/embed/${e.media.type==="movie"?`movie/${e.media.tmdbId}`:`tv/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`}`,
    a = (await e.proxiedFetcher(t, {
      headers: {
        Referer: "https://embed.su/",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
      }
    })).match(/window\.vConfig\s*=\s*JSON\.parse\(atob\(`([^`]+)/i),
    u = a == null ? void 0 : a[1];
  if (!u) throw new S("No encoded config found");
  const n = JSON.parse(await Ju(u));
  if (!(n != null && n.hash)) throw new S("No stream hash found");
  const s = (await Ju(n.hash)).split(".").map(c => c.split("").reverse().join("")),
    i = JSON.parse(await Ju(s.join("").split("").reverse().join("")));
  if (!(i != null && i.length)) throw new S("No servers found");
  e.progress(50);
  const o = i.map(c => ({
    embedId: "viper",
    url: `https://embed.su/api/e/${c.hash}`
  }));
  return e.progress(90), {
    embeds: o
  }
}
const vl = ee({
  id: "embedsu",
  name: "embed.su",
  rank: 230,
  disabled: !0,
  flags: [k.CORS_ALLOWED],
  scrapeMovie: ro,
  scrapeShow: ro
});

function ao(e) {
  let t = e.trim().toLowerCase();
  return t !== "the movie" && t.endsWith("the movie") && (t = t.replace("the movie", "")), t !== "the series" && t.endsWith("the series") && (t = t.replace("the series", "")), t.replace(/['":]/g, "").replace(/[^a-zA-Z0-9]+/g, "_")
}

function i0(e, t) {
  return ao(e) === ao(t)
}

function Zt(e, t, r) {
  const a = r === void 0 ? !0 : e.releaseYear === r;
  return i0(e.title, t) && a
}
const it = "https://soaper.live",
  uo = async e => {
    var t;
    const r = await e.proxiedFetcher("/search.html", {
        baseUrl: it,
        query: {
          keyword: e.media.title
        }
      }),
      a = be(r),
      u = [];
    a(".thumbnail").each((b, x) => {
      const T = a(x).find("h5").find("a").first().text().trim(),
        E = a(x).find(".img-tip").first().text().trim(),
        A = a(x).find("h5").find("a").first().attr("href");
      !T || !A || u.push({
        title: T,
        year: E ? parseInt(E, 10) : void 0,
        url: A
      })
    });
    let n = (t = u.find(b => b && Zt(e.media, b.title, b.year))) == null ? void 0 : t.url;
    if (!n) throw new S("Content not found");
    if (e.media.type === "show") {
      const b = e.media.season.number,
        x = e.media.episode.number,
        T = await e.proxiedFetcher(n, {
          baseUrl: it
        }),
        E = be(T),
        v = E("h4").filter((C, N) => E(N).text().trim().split(":")[0].trim() === `Season${b}`).parent().find("a").toArray();
      n = E(v.find(C => parseInt(E(C).text().split(".")[0], 10) === x)).attr("href")
    }
    if (!n) throw new S("Content not found");
    const s = await e.proxiedFetcher(n, {
        baseUrl: it
      }),
      o = be(s)("#hId").attr("value");
    if (!o) throw new S("Content not found");
    e.progress(50);
    const c = new URLSearchParams;
    c.append("pass", o), c.append("e2", "0"), c.append("server", "0");
    const l = e.media.type === "show" ? "/home/index/getEInfoAjax" : "/home/index/getMInfoAjax",
      h = await e.proxiedFetcher(l, {
        baseUrl: it,
        method: "POST",
        body: c,
        headers: {
          referer: `${it}${n}`,
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
          "Viewport-Width": "375"
        }
      }),
      f = JSON.parse(h),
      m = [];
    if (Array.isArray(f.subs))
      for (const b of f.subs) {
        let x = "";
        if (b.name.includes(".srt")) {
          const T = b.name.split(".srt")[0].trim();
          x = lt(T)
        } else if (b.name.includes(":")) {
          const T = b.name.split(":")[0].trim();
          x = lt(T)
        } else {
          const T = b.name.trim();
          x = lt(T)
        }
        x && m.push({
          id: b.path,
          url: `${it}${b.path}`,
          type: "srt",
          hasCorsRestrictions: !1,
          language: x
        })
      }
    e.progress(90);
    const p = {
      referer: `${it}${n}`,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
      "Viewport-Width": "375"
    };
    return {
      embeds: [],
      stream: [{
        id: "primary",
        playlist: Ie(`${it}/${f.val}`, p),
        type: "hls",
        proxyDepth: 2,
        flags: [k.CORS_ALLOWED],
        captions: m
      }, ...f.val_bak ? [{
        id: "backup",
        playlist: Ie(`${it}/${f.val_bak}`, p),
        type: "hls",
        flags: [k.CORS_ALLOWED],
        proxyDepth: 2,
        captions: m
      }] : []]
    }
  }, _l = ee({
    id: "soapertv",
    name: "SoaperTV",
    rank: 45,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: uo,
    scrapeShow: uo
  }), mE = "https://xj4h5qk3tf7v2mlr9s.uira.live/";
async function no(e) {
  const t = `${mE}all/${e.media.tmdbId}${e.media.type==="movie"?"":`?s=${e.media.season.number}&e=${e.media.episode.number}`}`;
  let r;
  try {
    r = await e.fetcher(t)
  } catch (a) {
    throw a instanceof S ? new S(`${a.message}`) : a
  }
  if (!r) try {
    r = await e.fetcher(t)
  } catch (a) {
    throw a instanceof S ? new S(`${a.message}`) : a
  }
  if (!r || !r.sources || r.sources.length === 0) throw new S("No sources found");
  if (e.progress(90), !r.sources[0].url) throw new Error("Source URL is missing");
  return {
    embeds: [],
    stream: [{
      id: "primary",
      playlist: r.sources[0].url,
      type: "hls",
      flags: [k.CORS_ALLOWED],
      captions: r.captions || []
    }]
  }
}
const yl = ee({
    id: "uiralive",
    name: "uira.live",
    rank: 240,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: no,
    scrapeShow: no
  }),
  vr = "ABCDEFGHIJKLMabcdefghijklmNOPQRSTUVWXYZnopqrstuvwxyz",
  Ne = e => String.fromCharCode(e),
  ou = {
    _keyStr: `${vr}0123456789+/=`,
    e(e) {
      let t = "",
        r, a, u, n, s, i, o, c = 0;
      for (e = ou._ue(e); c < e.length;) r = e.charCodeAt(c++), a = e.charCodeAt(c++), u = e.charCodeAt(c++), n = r >> 2, s = (r & 3) << 4 | a >> 4, i = (a & 15) << 2 | u >> 6, o = u & 63, Number.isNaN(a) ? (i = 64, o = 64) : Number.isNaN(u) && (o = 64), t += this._keyStr.charAt(n) + this._keyStr.charAt(s) + this._keyStr.charAt(i) + this._keyStr.charAt(o);
      return t
    },
    d(e) {
      let t = "",
        r, a, u, n, s, i, o, c = 0;
      for (e = e.replace(/[^A-Za-z0-9+/=]/g, ""); c < e.length;) n = this._keyStr.indexOf(e.charAt(c++)), s = this._keyStr.indexOf(e.charAt(c++)), i = this._keyStr.indexOf(e.charAt(c++)), o = this._keyStr.indexOf(e.charAt(c++)), r = n << 2 | s >> 4, a = (s & 15) << 4 | i >> 2, u = (i & 3) << 6 | o, t += Ne(r), i !== 64 && (t += Ne(a)), o !== 64 && (t += Ne(u));
      return t = ou._ud(t), t
    },
    _ue(e) {
      e = e.replace(/\r\n/g, `
`);
      let t = "";
      for (let r = 0; r < e.length; r++) {
        const a = e.charCodeAt(r);
        a < 128 ? t += Ne(a) : a > 127 && a < 2048 ? (t += Ne(a >> 6 | 192), t += Ne(a & 63 | 128)) : (t += Ne(a >> 12 | 224), t += Ne(a >> 6 & 63 | 128), t += Ne(a & 63 | 128))
      }
      return t
    },
    _ud(e) {
      let t = "",
        r = 0,
        a, u, n;
      for (; r < e.length;) a = e.charCodeAt(r), a < 128 ? (t += Ne(a), r++) : a > 191 && a < 224 ? (u = e.charCodeAt(r + 1), t += Ne((a & 31) << 6 | u & 63), r += 2) : (u = e.charCodeAt(r + 1), n = e.charCodeAt(r + 2), t += Ne((a & 15) << 12 | (u & 63) << 6 | n & 63), r += 3);
      return t
    }
  },
  pE = e => {
    const t = e.split(Ne(61));
    let r = "";
    const a = Ne(120);
    for (const u of t) {
      let n = "";
      for (let i = 0; i < u.length; i++) n += u[i] === a ? Ne(49) : Ne(48);
      const s = parseInt(n, 2);
      r += Ne(s)
    }
    return r.substring(0, r.length - 1)
  },
  bE = (e, t) => {
    e = e.replace(/\+/g, "#"), e = e.replace(/#/g, "+");
    let a = Number(pE("xx??x?=xx?xx?=")) * t;
    a += vr.length / 2;
    const u = vr.substr(a * 2) + vr.substr(0, a * 2);
    return e.replace(/[A-Za-z]/g, n => u.charAt(vr.indexOf(n)))
  },
  xE = e => e.substr(0, 2) === "#1" ? ou.d(bE(e.substr(2), -1)) : e.substr(0, 2) === "#0" ? ou.d(e.substr(2)) : e,
  EE = (e, t) => {
    let r = e.substring(2);
    for (let u = 4; u >= 0; u--)
      if (t[`bk${u}`]) {
        const n = s => btoa(encodeURIComponent(s).replace(/%([0-9A-F]{2})/g, (i, o) => String.fromCharCode(parseInt(o, 16))));
        r = r.replace(t.file3_separator + n(t[`bk${u}`]), "")
      } return (u => decodeURIComponent(atob(u).split("").map(n => `%${`00${n.charCodeAt(0).toString(16)}`.slice(-2)}`).join("")))(r)
  },
  gE = {
    u: "#1RyJzl3JYmljm0mkJWOGYWNyI6MfwVNGYXmj9uQj5tQkeYIWoxLCJXNkawOGF5QZ9sQj1YIWowLCJXO20VbVJ1OZ11QGiSlni0QG9uIn19"
  };
async function so(e) {
  var t, r;
  const a = e.media.imdbId;
  if (!a) throw new S("IMDb ID not found");
  const u = e.media.type === "show";
  let n, s;
  if (u) {
    const v = e.media;
    n = (t = v.season) == null ? void 0 : t.number, s = (r = v.episode) == null ? void 0 : r.number
  }
  const i = u ? `https://vidsrc.net/embed/tv?imdb=${a}&season=${n}&episode=${s}` : `https://vidsrc.net/embed/${a}`;
  e.progress(10);
  const o = await e.proxiedFetcher(i, {
    headers: {
      Referer: "https://vidsrc.net/",
      "User-Agent": "Mozilla/5.0"
    }
  });
  e.progress(30);
  const c = o.match(/<iframe[^>]*id="player_iframe"[^>]*src="([^"]*)"[^>]*>/);
  if (!c) throw new S("Initial iframe not found");
  const l = c[1].startsWith("//") ? `https:${c[1]}` : c[1];
  e.progress(50);
  const f = (await e.proxiedFetcher(l, {
    headers: {
      Referer: i,
      "User-Agent": "Mozilla/5.0"
    }
  })).match(/src\s*:\s*['"]([^'"]+)['"]/);
  if (!f) throw new S("prorcp iframe not found");
  const m = f[1].startsWith("/") ? `https://cloudnestra.com${f[1]}` : f[1];
  e.progress(70);
  const b = (await e.proxiedFetcher(m, {
    headers: {
      Referer: l,
      "User-Agent": "Mozilla/5.0"
    }
  })).split("<script");
  let x = "";
  for (const v of b)
    if (v.includes("Playerjs")) {
      x = v;
      break
    } if (!x) throw new S("No Playerjs config found");
  const T = x.match(/file\s*:\s*['"]([^'"]+)['"]/);
  if (!T) throw new S("No file field in Playerjs");
  let E = T[1];
  if (!E.includes(".m3u8")) {
    const v = JSON.parse(xE(gE.u));
    E = EE(E, v)
  }
  return e.progress(90), {
    stream: [{
      id: "vidsrc-cloudnestra",
      type: "hls",
      playlist: Ie(E, {
        referer: "https://cloudnestra.com/",
        origin: "https://cloudnestra.com"
      }),
      flags: [k.CORS_ALLOWED],
      captions: []
    }],
    embeds: []
  }
}
const Cl = ee({
    id: "cloudnestra",
    name: "Cloudy",
    rank: 55,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: so,
    scrapeShow: so
  }),
  Sl = [n0.id, yl.id, vl.id, Qd.id, Jd.id, Zd.id, el.id, nl.id, sl.id, fl.id, tl.id, il.id, dl.id, ol.id, xl.id, _l.id, ml.id, gl.id, El.id, bl.id, hE.id, ...Gx.map(e => e.id), Cl.id, Kd.id, ul.id, ll.id, cl.id, pl.id, Tl.id, al.id, hl.id, Al.id, rl.id];

function cu(e) {
  return e ? e.type === "hls" ? !!e.playlist : e.type === "file" ? Object.values(e.qualities).filter(r => r.url.length > 0).length !== 0 : !1 : !1
}
async function _n(e, t, r) {
  if (Sl.includes(r)) return e;
  if (e.type === "hls") {
    if (e.playlist.startsWith("data:")) return e;
    const a = await t.proxiedFetcher.full(e.playlist, {
      method: "GET",
      headers: {
        ...e.preferredHeaders,
        ...e.headers
      }
    });
    return a.statusCode < 200 || a.statusCode >= 400 ? null : e
  }
  if (e.type === "file") {
    const a = await Promise.all(Object.values(e.qualities).map(n => t.proxiedFetcher.full(n.url, {
        method: "GET",
        headers: {
          ...e.preferredHeaders,
          ...e.headers,
          Range: "bytes=0-1"
        }
      }))),
      u = e.qualities;
    return Object.keys(e.qualities).forEach((n, s) => {
      (a[s].statusCode < 200 || a[s].statusCode >= 400) && delete u[n]
    }), Object.keys(u).length === 0 ? null : {
      ...e,
      qualities: u
    }
  }
  return null
}
async function Nl(e, t, r) {
  return Sl.includes(r) ? e : (await Promise.all(e.map(a => _n(a, t, r)))).filter(a => a !== null)
}
async function AE(e, t) {
  const r = e.sources.find(n => t.id === n.id);
  if (!r) throw new Error("Source with ID not found");
  if (t.media.type === "movie" && !r.scrapeMovie) throw new Error("Source is not compatible with movies");
  if (t.media.type === "show" && !r.scrapeShow) throw new Error("Source is not compatible with shows");
  const a = {
    fetcher: t.fetcher,
    proxiedFetcher: t.proxiedFetcher,
    progress(n) {
      var s, i;
      (i = (s = t.events) == null ? void 0 : s.update) == null || i.call(s, {
        id: r.id,
        percentage: n,
        status: "pending"
      })
    }
  };
  let u = null;
  if (t.media.type === "movie" && r.scrapeMovie ? u = await r.scrapeMovie({
      ...a,
      media: t.media
    }) : t.media.type === "show" && r.scrapeShow && (u = await r.scrapeShow({
      ...a,
      media: t.media
    })), u != null && u.stream && (u.stream = u.stream.filter(n => cu(n)).filter(n => Br(t.features, n.flags)), u.stream = u.stream.map(n => su(n) && t.proxyStreams ? iu(n) : n)), !u) throw new Error("output is null");
  if (u.embeds = u.embeds.filter(n => {
      const s = e.embeds.find(i => i.id === n.embedId);
      return !(!s || s.disabled)
    }), !t.disableOpensubtitles)
    for (const n of u.embeds) n.url = `${n.url}${btoa("MEDIA=")}${btoa(`${t.media.imdbId}${t.media.type==="show"?`.${t.media.season.number}.${t.media.episode.number}`:""}`)}`;
  if ((!u.stream || u.stream.length === 0) && u.embeds.length === 0) throw new S("No streams found");
  if (u.stream && u.stream.length > 0 && u.embeds.length === 0) {
    const n = await Nl(u.stream, t, r.id);
    if (n.length === 0) throw new S("No playable streams found");
    if (!t.disableOpensubtitles)
      for (const s of n) s.captions = await nu(s.captions, t, btoa(`${t.media.imdbId}${t.media.type==="show"?`.${t.media.season.number}.${t.media.episode.number}`:""}`));
    u.stream = n
  }
  return u
}
async function TE(e, t) {
  const r = e.embeds.find(i => t.id === i.id);
  if (!r) throw new Error("Embed with ID not found");
  let a = t.url,
    u;
  t.url.includes(btoa("MEDIA=")) && ([a, u] = a.split(btoa("MEDIA=")));
  const n = await r.scrape({
    fetcher: t.fetcher,
    proxiedFetcher: t.proxiedFetcher,
    url: a,
    progress(i) {
      var o, c;
      (c = (o = t.events) == null ? void 0 : o.update) == null || c.call(o, {
        id: r.id,
        percentage: i,
        status: "pending"
      })
    }
  });
  if (n.stream = n.stream.filter(i => cu(i)).filter(i => Br(t.features, i.flags)), n.stream.length === 0) throw new S("No streams found");
  n.stream = n.stream.map(i => su(i) && t.proxyStreams ? iu(i) : i);
  const s = await Nl(n.stream, t, r.id);
  if (s.length === 0) throw new S("No playable streams found");
  if (u && !t.disableOpensubtitles) {
    const [i, o, c] = atob(u).split(".").map((h, f) => f === 0 ? h : Number(h) || null), l = {
      ...t,
      media: {
        type: o && c ? "show" : "movie",
        imdbId: (i == null ? void 0 : i.toString()) || "",
        ...o && c ? {
          season: {
            number: o
          },
          episode: {
            number: c
          }
        } : {}
      }
    };
    for (const h of s) h.captions = await nu(h.captions, l, u)
  }
  return n.stream = s, n
}

function io(e, t) {
  const r = [...t];
  return r.sort((a, u) => {
    const n = e.indexOf(a.id),
      s = e.indexOf(u.id);
    return n >= 0 && s >= 0 ? n - s : s >= 0 ? 1 : n >= 0 ? -1 : u.rank - a.rank
  }), r
}
async function vE(e, t) {
  var r, a, u, n, s, i, o, c, l, h, f, m, p, b;
  const x = io(t.sourceOrder ?? [], e.sources).filter(C => t.media.type === "movie" ? !!C.scrapeMovie : t.media.type === "show" ? !!C.scrapeShow : !1),
    T = io(t.embedOrder ?? [], e.embeds),
    E = T.map(C => C.id);
  let A = "";
  const v = {
    fetcher: t.fetcher,
    proxiedFetcher: t.proxiedFetcher,
    progress(C) {
      var N, D;
      (D = (N = t.events) == null ? void 0 : N.update) == null || D.call(N, {
        id: A,
        percentage: C,
        status: "pending"
      })
    }
  };
  (a = (r = t.events) == null ? void 0 : r.init) == null || a.call(r, {
    sourceIds: x.map(C => C.id)
  });
  for (const C of x) {
    (n = (u = t.events) == null ? void 0 : u.start) == null || n.call(u, C.id), A = C.id;
    let N = null;
    try {
      if (t.media.type === "movie" && C.scrapeMovie ? N = await C.scrapeMovie({
          ...v,
          media: t.media
        }) : t.media.type === "show" && C.scrapeShow && (N = await C.scrapeShow({
          ...v,
          media: t.media
        })), N && (N.stream = (N.stream ?? []).filter(cu).filter(w => Br(t.features, w.flags)), N.stream = N.stream.map(w => su(w) && t.proxyStreams ? iu(w) : w)), !N || !((s = N.stream) != null && s.length) && !N.embeds.length) throw new S("No streams found")
    } catch (w) {
      const U = {
        id: C.id,
        percentage: 100,
        status: w instanceof S ? "notfound" : "failure",
        reason: w instanceof S ? w.message : void 0,
        error: w instanceof S ? void 0 : w
      };
      (o = (i = t.events) == null ? void 0 : i.update) == null || o.call(i, U);
      continue
    }
    if (!N) throw new Error("Invalid media type");
    if ((c = N.stream) != null && c[0]) {
      const w = await _n(N.stream[0], t, C.id);
      if (!w) throw new S("No streams found");
      return t.disableOpensubtitles || t.media.imdbId && (w.captions = await nu(w.captions, t, btoa(`${t.media.imdbId}${t.media.type==="show"?`.${t.media.season.number}.${t.media.episode.number}`:""}`))), {
        sourceId: C.id,
        stream: w
      }
    }
    const D = N.embeds.filter(w => {
      const U = e.embeds.find(I => I.id === w.embedId);
      return U && !U.disabled
    }).sort((w, U) => E.indexOf(w.embedId) - E.indexOf(U.embedId));
    D.length > 0 && ((h = (l = t.events) == null ? void 0 : l.discoverEmbeds) == null || h.call(l, {
      embeds: D.map((w, U) => ({
        id: [C.id, U].join("-"),
        embedScraperId: w.embedId
      })),
      sourceId: C.id
    }));
    for (const [w, U] of D.entries()) {
      const I = T.find(F => F.id === U.embedId);
      if (!I) throw new Error("Invalid embed returned");
      const L = [C.id, w].join("-");
      (m = (f = t.events) == null ? void 0 : f.start) == null || m.call(f, L), A = L;
      let M;
      try {
        if (M = await I.scrape({
            ...v,
            url: U.url
          }), M.stream = M.stream.filter(cu).filter(V => Br(t.features, V.flags)), M.stream = M.stream.map(V => su(V) && t.proxyStreams ? iu(V) : V), M.stream.length === 0) throw new S("No streams found");
        const F = await _n(M.stream[0], t, U.embedId);
        if (!F) throw new S("No streams found");
        t.disableOpensubtitles || t.media.imdbId && (F.captions = await nu(F.captions, t, btoa(`${t.media.imdbId}${t.media.type==="show"?`.${t.media.season.number}.${t.media.episode.number}`:""}`))), M.stream = [F]
      } catch (F) {
        const V = {
          id: L,
          percentage: 100,
          status: F instanceof S ? "notfound" : "failure",
          reason: F instanceof S ? F.message : void 0,
          error: F instanceof S ? void 0 : F
        };
        (b = (p = t.events) == null ? void 0 : p.update) == null || b.call(p, V);
        continue
      }
      return {
        sourceId: C.id,
        embedId: I.id,
        stream: M.stream[0]
      }
    }
  }
  return null
}

function _E(e) {
  const t = {
      embeds: e.embeds,
      sources: e.sources
    },
    r = {
      features: e.features,
      fetcher: fi(e.fetcher),
      proxiedFetcher: fi(e.proxiedFetcher ?? e.fetcher),
      proxyStreams: e.proxyStreams
    };
  return {
    runAll(a) {
      return vE(t, {
        ...r,
        ...a
      })
    },
    runSourceScraper(a) {
      return AE(t, {
        ...r,
        ...a
      })
    },
    runEmbedScraper(a) {
      return TE(t, {
        ...r,
        ...a
      })
    },
    getMetadata(a) {
      return Ix(t, a)
    },
    listSources() {
      return Nx(t)
    },
    listEmbeds() {
      return wx(t)
    }
  }
}
const yE = a6("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 10),
  ta = "https://d000d.com",
  CE = he({
    id: "dood",
    name: "dood",
    rank: 173,
    async scrape(e) {
      var t, r;
      let a = e.url;
      e.url.includes("primewire") && (a = (await e.proxiedFetcher.full(e.url)).finalUrl);
      const u = a.split("/d/")[1] || a.split("/e/")[1],
        n = await e.proxiedFetcher(`/e/${u}`, {
          method: "GET",
          baseUrl: ta
        }),
        s = (t = n.match(/\?token=([^&]+)&expiry=/)) == null ? void 0 : t[1],
        i = (r = n.match(/\$\.get\('\/pass_md5([^']+)/)) == null ? void 0 : r[1],
        o = n.match(/thumbnails:\s\{\s*vtt:\s'([^']*)'/),
        l = `${await e.proxiedFetcher(`/pass_md5${i}`,{headers:{Referer:`${ta}/e/${u}`},method:"GET",baseUrl:ta})}${yE()}?token=${s}&expiry=${Date.now()}`;
      if (!l.startsWith("http")) throw new Error("Invalid URL");
      return {
        stream: [{
          id: "primary",
          type: "file",
          flags: [],
          captions: [],
          qualities: {
            unknown: {
              type: "mp4",
              url: l
            }
          },
          headers: {
            Referer: ta
          },
          ...o ? {
            thumbnailTrack: {
              type: "vtt",
              url: `https:${o[1]}`
            }
          } : {}
        }]
      }
    }
  }),
  SE = he({
    id: "hianime-hd1-dub",
    name: "HD-1 (Dub)",
    rank: 250,
    async scrape(e) {
      var t, r, a, u, n;
      const i = `https://hianime.pstream.org/api/v2/hianime/episode/sources?animeEpisodeId=${JSON.parse(e.url).episodeId}&server=hd-1&category=dub`,
        o = await e.fetcher(i);
      if (!o) throw new S("No response received");
      if (!((a = (r = (t = o.data) == null ? void 0 : t.sources) == null ? void 0 : r[0]) != null && a.url)) throw new S("No stream URL found in response");
      const c = (n = (u = o.data.tracks) == null ? void 0 : u.find(l => l.kind === "thumbnails")) == null ? void 0 : n.file;
      return {
        stream: [{
          type: "hls",
          id: "primary",
          playlist: Ie(o.data.sources[0].url, o.data.headers),
          flags: [k.CORS_ALLOWED],
          captions: [],
          ...c ? {
            thumbnailTrack: {
              type: "vtt",
              url: c
            }
          } : {}
        }]
      }
    }
  }),
  NE = he({
    id: "hianime-hd2-dub",
    name: "HD-2 (Dub)",
    rank: 251,
    async scrape(e) {
      var t, r, a, u, n;
      const i = `https://hianime.pstream.org/api/v2/hianime/episode/sources?animeEpisodeId=${JSON.parse(e.url).episodeId}&server=hd-2&category=dub`,
        o = await e.fetcher(i);
      if (!o) throw new S("No response received");
      if (!((a = (r = (t = o.data) == null ? void 0 : t.sources) == null ? void 0 : r[0]) != null && a.url)) throw new S("No stream URL found in response");
      const c = (n = (u = o.data.tracks) == null ? void 0 : u.find(l => l.kind === "thumbnails")) == null ? void 0 : n.file;
      return {
        stream: [{
          type: "hls",
          id: "primary",
          playlist: Ie(o.data.sources[0].url, o.data.headers),
          flags: [k.CORS_ALLOWED],
          captions: [],
          ...c ? {
            thumbnailTrack: {
              type: "vtt",
              url: c
            }
          } : {}
        }]
      }
    }
  }),
  wE = he({
    id: "hianime-hd1-sub",
    name: "HD-1 (Sub)",
    rank: 252,
    async scrape(e) {
      var t, r, a, u, n;
      const i = `https://hianime.pstream.org/api/v2/hianime/episode/sources?animeEpisodeId=${JSON.parse(e.url).episodeId}&server=hd-1&category=sub`,
        o = await e.fetcher(i);
      if (!o) throw new S("No response received");
      if (!((a = (r = (t = o.data) == null ? void 0 : t.sources) == null ? void 0 : r[0]) != null && a.url)) throw new S("No stream URL found in response");
      const c = (n = (u = o.data.tracks) == null ? void 0 : u.find(l => l.kind === "thumbnails")) == null ? void 0 : n.file;
      return {
        stream: [{
          type: "hls",
          id: "primary",
          playlist: Ie(o.data.sources[0].url, o.data.headers),
          flags: [k.CORS_ALLOWED],
          captions: [],
          ...c ? {
            thumbnailTrack: {
              type: "vtt",
              url: c
            }
          } : {}
        }]
      }
    }
  }),
  IE = he({
    id: "hianime-hd2-sub",
    name: "HD-2 (Sub)",
    rank: 253,
    async scrape(e) {
      var t, r, a, u, n;
      const i = `https://hianime.pstream.org/api/v2/hianime/episode/sources?animeEpisodeId=${JSON.parse(e.url).episodeId}&server=hd-2&category=sub`,
        o = await e.fetcher(i);
      if (!o) throw new S("No response received");
      if (!((a = (r = (t = o.data) == null ? void 0 : t.sources) == null ? void 0 : r[0]) != null && a.url)) throw new S("No stream URL found in response");
      const c = (n = (u = o.data.tracks) == null ? void 0 : u.find(l => l.kind === "thumbnails")) == null ? void 0 : n.file;
      return {
        stream: [{
          type: "hls",
          id: "primary",
          playlist: Ie(o.data.sources[0].url, o.data.headers),
          flags: [k.CORS_ALLOWED],
          captions: [],
          ...c ? {
            thumbnailTrack: {
              type: "vtt",
              url: c
            }
          } : {}
        }]
      }
    }
  }),
  oo = "https://mixdrop.ag",
  DE = /(eval\(function\(p,a,c,k,e,d\){.*{}\)\))/,
  OE = /MDCore\.wurl="(.*?)";/,
  wl = he({
    id: "mixdrop",
    name: "MixDrop",
    rank: 198,
    async scrape(e) {
      let t = e.url;
      e.url.includes("primewire") && (t = (await e.fetcher.full(e.url)).finalUrl);
      const r = new URL(t).pathname.split("/")[2],
        u = (await e.proxiedFetcher(`/e/${r}`, {
          baseUrl: oo
        })).match(DE);
      if (!u) throw new Error("failed to find packed mixdrop JavaScript");
      const s = t0.unpack(u[1]).match(OE);
      if (!s) throw new Error("failed to find packed mixdrop source link");
      const i = s[1];
      return {
        stream: [{
          id: "primary",
          type: "file",
          flags: [k.IP_LOCKED],
          captions: [],
          qualities: {
            unknown: {
              type: "mp4",
              url: i.startsWith("http") ? i : `https:${i}`,
              headers: {
                Referer: oo
              }
            }
          }
        }]
      }
    }
  });

function LE(e) {
  return String.fromCharCode(parseInt(e, 16))
}

function RE(e, t) {
  var r;
  return (((r = e.match(/../g)) == null ? void 0 : r.map(LE).join("")) || "").split("").map((u, n) => String.fromCharCode(u.charCodeAt(0) ^ t.charCodeAt(n % t.length))).join("")
}
const kE = he({
    id: "turbovid",
    name: "Turbovid",
    rank: 122,
    async scrape(e) {
      var t, r;
      const a = new URL(e.url).origin,
        u = await e.proxiedFetcher(e.url);
      e.progress(30);
      const n = (t = u.match(/const\s+apkey\s*=\s*"(.*?)";/)) == null ? void 0 : t[1],
        s = (r = u.match(/const\s+xxid\s*=\s*"(.*?)";/)) == null ? void 0 : r[1];
      if (!n || !s) throw new Error("Failed to get required values");
      const i = JSON.parse(await e.proxiedFetcher("/api/cucked/juice_key", {
        baseUrl: a,
        headers: {
          referer: e.url
        }
      })).juice;
      if (!i) throw new Error("Failed to fetch the key");
      e.progress(60);
      const o = JSON.parse(await e.proxiedFetcher("/api/cucked/the_juice/", {
        baseUrl: a,
        query: {
          [n]: s
        },
        headers: {
          referer: e.url
        }
      })).data;
      if (!o) throw new Error("Failed to fetch required data");
      return e.progress(90), {
        stream: [{
          type: "hls",
          id: "primary",
          playlist: RE(o, i),
          headers: {
            referer: `${a}/`,
            origin: a
          },
          flags: [],
          captions: []
        }]
      }
    }
  }),
  BE = "https://rabbitstream.net",
  FE = "https://rabbitstream.net/",
  {
    AES: PE,
    enc: ME
  } = Ex;

function UE(e) {
  try {
    return JSON.parse(e), !0
  } catch {
    return !1
  }
}

function HE(e) {
  const t = e.lastIndexOf("switch"),
    r = e.indexOf("partKeyStartPosition"),
    a = e.slice(t, r),
    u = [],
    n = a.matchAll(/:[a-zA-Z0-9]+=([a-zA-Z0-9]+),[a-zA-Z0-9]+=([a-zA-Z0-9]+);/g);
  for (const s of n) {
    const i = [];
    for (const o of [s[1], s[2]]) {
      const c = new RegExp(`${o}=0x([a-zA-Z0-9]+)`, "g"),
        l = [...e.matchAll(c)],
        h = l[l.length - 1];
      if (!h) return null;
      const f = parseInt(h[1], 16);
      i.push(f)
    }
    u.push([i[0], i[1]])
  }
  return u
}
const Il = he({
    id: "upcloud",
    name: "UpCloud",
    rank: 200,
    disabled: !0,
    async scrape(e) {
      const t = new URL(e.url.replace("embed-5", "embed-4")),
        r = t.pathname.split("/"),
        a = r[r.length - 1],
        u = await e.proxiedFetcher(`${t.origin}/ajax/embed-4/getSources?id=${a}`, {
          headers: {
            Referer: t.origin,
            "X-Requested-With": "XMLHttpRequest"
          }
        });
      let n = null;
      if (!UE(u.sources)) {
        const i = await e.proxiedFetcher("https://rabbitstream.net/js/player/prod/e4-player.min.js", {
            query: {
              v: Date.now().toString()
            }
          }),
          o = HE(i);
        if (!o) throw new Error("Key extraction failed");
        let c = "",
          l = u.sources,
          h = 0;
        o.forEach(([p, b]) => {
          const x = p + h,
            T = x + b;
          c += u.sources.slice(x, T), l = l.replace(u.sources.substring(x, T), ""), h += b
        });
        const f = PE.decrypt(l, c).toString(ME.Utf8),
          m = JSON.parse(f)[0];
        if (!m) throw new Error("No stream found");
        n = m
      }
      if (!n) throw new Error("upcloud source not found");
      const s = [];
      return u.tracks.forEach(i => {
        if (i.kind !== "captions") return;
        const o = u0(i.file);
        if (!o) return;
        const c = lt(i.label.split(" ")[0]);
        c && s.push({
          id: i.file,
          language: c,
          hasCorsRestrictions: !1,
          type: o,
          url: i.file
        })
      }), {
        stream: [{
          id: "primary",
          type: "hls",
          playlist: n.file,
          flags: [k.CORS_ALLOWED],
          captions: s,
          preferredHeaders: {
            Referer: FE,
            Origin: BE
          }
        }]
      }
    }
  }),
  Zu = "https://tom.autoembed.cc";
async function co(e) {
  const t = e.media.type === "show" ? "tv" : "movie";
  let r = e.media.tmdbId;
  e.media.type === "show" && (r = `${r}/${e.media.season.number}/${e.media.episode.number}`);
  const a = await e.proxiedFetcher("/api/getVideoSource", {
    baseUrl: Zu,
    query: {
      type: t,
      id: r
    },
    headers: {
      Referer: Zu,
      Origin: Zu
    }
  });
  if (!a) throw new S("Failed to fetch video source");
  if (!a.videoSource) throw new S("No video source found");
  e.progress(50);
  const u = [{
    embedId: "autoembed-english",
    url: a.videoSource
  }];
  return e.progress(90), {
    embeds: u
  }
}
const $E = ee({
    id: "autoembed",
    name: "Autoembed",
    rank: 254,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: co,
    scrapeShow: co
  }),
  lo = "https://catflix.su";
async function fo(e) {
  const t = e.media.title.replace(/ /g, "-").replace(/[():]/g, "").toLowerCase(),
    r = e.media.type,
    a = e.media.tmdbId,
    u = r === "movie" ? `${lo}/movie/${t}-${a}` : `${lo}/episode/${t}-season-${e.media.season.number}-episode-${e.media.episode.number}/eid-${e.media.episode.tmdbId}`;
  e.progress(60);
  const n = await e.proxiedFetcher(u),
    i = be(n)("script").toArray().find(h => {
      const f = h.children[0];
      return f && "type" in f && f.type === "text" && "data" in f && f.data.includes("main_origin =")
    });
  if (!i) throw new S("No embed data found");
  const c = i.children[0].data.match(/main_origin = "(.*?)";/);
  if (!c) throw new S("Failed to extract embed URL");
  const l = atob(c[1]);
  return e.progress(90), {
    embeds: [{
      embedId: "turbovid",
      url: l
    }]
  }
}
const qE = ee({
  id: "catflix",
  name: "Catflix",
  rank: 160,
  disabled: !1,
  flags: [],
  scrapeMovie: fo,
  scrapeShow: fo
});

function Oe(e) {
  return Object.entries(e).map(([t, r]) => Tx.serialize(t, r)).join("; ")
}

function WE(e) {
  const t = N0.splitCookiesString(e);
  return N0.parse(t, {
    map: !0
  })
}
const Wa = "https://ee3.me",
  YE = "_sf_",
  zE = "defonotscraping";
async function VE(e, t, r) {
  const a = await r.proxiedFetcher.full("/login", {
      baseUrl: Wa,
      method: "POST",
      body: new URLSearchParams({
        user: e,
        pass: t,
        action: "login"
      }),
      readHeaders: ["Set-Cookie"]
    }),
    u = JSON.parse(a.body);
  return WE(u.status === 1 ? a.headers.get("Set-Cookie") ?? "" : "PHPSESSID=mk2p73c77qc28o5i5120843ruu;").PHPSESSID.value
}

function GE(e) {
  const t = [],
    r = be(e);
  return r("div").each((a, u) => {
    const n = r(u).find(".title").text().trim(),
      s = parseInt(r(u).find(".details span").first().text().trim(), 10),
      i = r(u).find(".control-buttons").attr("data-id");
    n && s && i && t.push({
      title: n,
      year: s,
      id: i
    })
  }), t
}
async function jE(e) {
  var t, r;
  const a = await VE(YE, zE, e);
  if (!a) throw new Error("Login failed");
  const n = (t = GE(await e.proxiedFetcher("/get", {
    baseUrl: Wa,
    method: "POST",
    body: new URLSearchParams({
      query: e.media.title,
      action: "search"
    }),
    headers: {
      cookie: Oe({
        PHPSESSID: a
      })
    }
  })).find(f => f && Zt(e.media, f.title, f.year))) == null ? void 0 : t.id;
  if (!n) throw new S("No watchable item found");
  e.progress(20);
  const s = JSON.parse(await e.proxiedFetcher("/get", {
    baseUrl: Wa,
    method: "POST",
    body: new URLSearchParams({
      id: n,
      action: "get_movie_info"
    }),
    headers: {
      cookie: Oe({
        PHPSESSID: a
      })
    }
  }));
  if (!s.message.video) throw new Error("Failed to get the stream");
  e.progress(40);
  const i = JSON.parse(await e.proxiedFetcher("/renew", {
    baseUrl: Wa,
    method: "POST",
    headers: {
      cookie: Oe({
        PHPSESSID: a
      })
    }
  }));
  if (!i.k) throw new Error("Failed to get the key");
  e.progress(60);
  const o = s.message.server === "1" ? "https://vid.ee3.me/vid/" : "https://vault.rips.cc/video/",
    c = i.k,
    l = `${o}${s.message.video}?${new URLSearchParams({k:c})}`,
    h = [];
  return ((r = s.message.subs) == null ? void 0 : r.toLowerCase()) === "yes" && s.message.imdbID && h.push({
    id: `https://rips.cc/subs/${s.message.imdbID}.vtt`,
    url: `https://rips.cc/subs/${s.message.imdbID}.vtt`,
    type: "vtt",
    hasCorsRestrictions: !1,
    language: "en"
  }), e.progress(90), {
    embeds: [],
    stream: [{
      id: "primary",
      type: "file",
      flags: [k.CORS_ALLOWED],
      captions: h,
      qualities: {
        720: {
          type: "mp4",
          url: l
        }
      }
    }]
  }
}
const KE = ee({
  id: "ee3",
  name: "EE3",
  rank: 120,
  disabled: !0,
  flags: [k.CORS_ALLOWED],
  scrapeMovie: jE
});

function o0(e) {
  switch (e.toLowerCase().replace("p", "")) {
  case "360":
    return "360";
  case "480":
    return "480";
  case "720":
    return "720";
  case "1080":
    return "1080";
  case "2160":
    return "4k";
  case "4k":
    return "4k";
  default:
    return "unknown"
  }
}
const ra = "https://fsharetv.co";
async function XE(e) {
  var t, r;
  const a = await e.proxiedFetcher("/search", {
      baseUrl: ra,
      query: {
        q: e.media.title
      }
    }),
    u = be(a),
    n = [];
  u(".movie-item").each((f, m) => {
    var p;
    const [, b, x] = ((p = u(m).find("b").text()) == null ? void 0 : p.match(/^(.*?)\s*(?:\(?\s*(\d{4})(?:\s*-\s*\d{0,4})?\s*\)?)?\s*$/)) || [], T = u(m).find("a").attr("href");
    !b || !T || n.push({
      title: b,
      year: Number(x) ?? void 0,
      url: T
    })
  });
  const s = (t = n.find(f => f && Zt(e.media, f.title, f.year))) == null ? void 0 : t.url;
  if (!s) throw new S("No watchable item found");
  e.progress(50);
  const o = (r = (await e.proxiedFetcher(s.replace("/movie", "/w"), {
    baseUrl: ra
  })).match(/Movie\.setSource\('([^']*)'/)) == null ? void 0 : r[1];
  if (!o) throw new Error("File ID not found");
  const c = await e.proxiedFetcher(`/api/file/${o}/source`, {
    baseUrl: ra,
    query: {
      type: "watch"
    }
  });
  if (!c.data.file.sources.length) throw new Error("No sources found");
  const l = new URL((await e.proxiedFetcher.full(c.data.file.sources[0].src, {
      baseUrl: ra
    })).finalUrl).origin,
    h = c.data.file.sources.reduce((f, m) => {
      const p = typeof m.quality == "number" ? m.quality.toString() : m.quality,
        b = o0(p);
      return f[b] = {
        type: "mp4",
        url: `${l}${m.src.replace("/api","")}`
      }, f
    }, {});
  return e.progress(90), {
    embeds: [],
    stream: [{
      id: "primary",
      type: "file",
      flags: [],
      headers: {
        referer: "https://fsharetv.co"
      },
      qualities: h,
      captions: []
    }]
  }
}
const QE = ee({
  id: "fsharetv",
  name: "FshareTV",
  rank: 170,
  flags: [],
  scrapeMovie: XE
});
async function JE(e) {
  const t = await fetch(`https://hianime.pstream.org/api/v2/hianime/search?q=${encodeURIComponent(e)}`);
  if (!t.ok) throw new Error("Failed to search anime");
  const r = await t.json();
  if (!r.success || !r.data.animes.length) throw new Error("Anime not found");
  const a = r.data.animes.find(u => u.name.toLowerCase() === e.toLowerCase());
  return (a == null ? void 0 : a.id) ?? r.data.animes[0].id
}
async function ZE(e, t) {
  const a = await fetch(`https://api.themoviedb.org/3/tv/${e}/season/${t}?api_key=5b9790d9305dca8713b9a0afad42ea8d`);
  if (!a.ok) throw new S("Failed to fetch season data from TMDB");
  return (await a.json()).episodes
}
async function e4(e, t, r) {
  return (await Promise.all(Array.from({
    length: t - 1
  }, (n, s) => ZE(e, s + 1)))).reduce((n, s) => n + s.length, 0) + r
}
async function t4(e) {
  const t = await fetch(`https://hianime.pstream.org/api/v2/hianime/anime/${e}/episodes`);
  if (!t.ok) throw new S("Failed to fetch episode data");
  return t.json()
}
async function r4(e) {
  const t = await JE(e.media.title),
    r = await e4(e.media.tmdbId, e.media.season.number, e.media.episode.number),
    u = (await t4(t)).data.episodes.find(s => s.number === r);
  if (!u) throw new S("Episode not found");
  return {
    embeds: [{
      embedId: "hianime-hd1-dub",
      url: JSON.stringify({
        episodeId: u.episodeId
      })
    }, {
      embedId: "hianime-hd2-dub",
      url: JSON.stringify({
        episodeId: u.episodeId
      })
    }, {
      embedId: "hianime-hd1-sub",
      url: JSON.stringify({
        episodeId: u.episodeId
      })
    }, {
      embedId: "hianime-hd2-sub",
      url: JSON.stringify({
        episodeId: u.episodeId
      })
    }]
  }
}
const a4 = ee({
    id: "hianime",
    name: "Zoro (Anime)",
    rank: 7,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeShow: r4
  }),
  u4 = "https://isut.streamflix.one";
async function ho(e) {
  const r = (await e.fetcher(`${u4}/api/source/${e.media.type==="movie"?`${e.media.tmdbId}`:`${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`}`)).sources;
  if (!r || r.length === 0) throw new S("No sources found");
  const a = r[0].file;
  if (!a) throw new S("No file URL found");
  return e.progress(90), {
    embeds: [],
    stream: [{
      id: "primary",
      playlist: a,
      type: "hls",
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}
const n4 = ee({
    id: "insertunit",
    name: "Insertunit",
    rank: 12,
    disabled: !0,
    flags: [k.CORS_ALLOWED, k.IP_LOCKED],
    scrapeMovie: ho,
    scrapeShow: ho
  }),
  mo = "https://mp4hydra.org/";
async function po(e) {
  var t;
  const r = await e.proxiedFetcher("/search", {
    baseUrl: mo,
    query: {
      q: e.media.title
    }
  });
  e.progress(40);
  const a = be(r),
    u = [];
  a(".search-details").each((o, c) => {
    var l;
    const [, h, f] = a(c).find("a").first().text().trim().match(/^(.*?)\s*(?:\(?\s*(\d{4})(?:\s*-\s*\d{0,4})?\s*\)?)?\s*$/) || [], m = (l = a(c).find("a").attr("href")) == null ? void 0 : l.split("/")[4];
    !h || !m || u.push({
      title: h,
      year: f ? parseInt(f, 10) : void 0,
      url: m
    })
  });
  const n = (t = u.find(o => o && Zt(e.media, o.title, o.year))) == null ? void 0 : t.url;
  if (!n) throw new S("No watchable item found");
  e.progress(60);
  const s = await e.proxiedFetcher("/info2?v=8", {
    method: "POST",
    body: new URLSearchParams({
      z: JSON.stringify([{
        s: n,
        t: "movie"
      }])
    }),
    baseUrl: mo
  });
  if (!s.playlist[0].src || !s.servers) throw new S("No watchable item found");
  e.progress(80);
  const i = [];
  return [s.servers[s.servers.auto], ...Object.values(s.servers).filter(o => o !== s.servers[s.servers.auto] && o !== s.servers.auto)].forEach((o, c) => i.push({
    embedId: `mp4hydra-${c+1}`,
    url: `${o}${s.playlist[0].src}|${s.playlist[0].label}`
  })), e.progress(90), {
    embeds: i
  }
}
const s4 = ee({
    id: "mp4hydra",
    name: "Mp4Hydra",
    rank: 5,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: po,
    scrapeShow: po
  }),
  bo = "https://nscrape.andresdev.org/api";
async function xo(e) {
  const t = e.media.tmdbId;
  let r;
  e.media.type === "movie" ? r = `${bo}/get-stream?tmdbId=${t}` : r = `${bo}/get-show-stream?tmdbId=${t}&season=${e.media.season.number}&episode=${e.media.episode.number}`;
  const a = await e.proxiedFetcher(r);
  if (!a.success || !a.rurl) throw new S("No stream found");
  return {
    stream: [{
      id: "neputo",
      type: "hls",
      playlist: a.rurl,
      flags: [k.CORS_ALLOWED],
      captions: []
    }],
    embeds: []
  }
}
const i4 = ee({
    id: "neputo",
    name: "Nepu.to",
    rank: 201,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: xo,
    scrapeShow: xo
  }),
  Eo = "https://tugaflix.best/";

function go(e) {
  const t = [],
    r = be(e);
  return r(".items .poster").each((a, u) => {
    var n;
    const s = r(u).find("a"),
      i = s.attr("href"),
      [, o, c] = ((n = s.attr("title")) == null ? void 0 : n.match(/^(.*?)\s*(?:\((\d{4})\))?\s*$/)) || [];
    !o || !i || t.push({
      title: o,
      year: c ? parseInt(c, 10) : void 0,
      url: i
    })
  }), t
}
const o4 = ee({
  id: "tugaflix",
  name: "Tugaflix",
  rank: 71,
  flags: [k.IP_LOCKED],
  scrapeMovie: async e => {
    var t;
    const r = go(await e.proxiedFetcher("/filmes/", {
      baseUrl: Eo,
      query: {
        s: e.media.title
      }
    }));
    if (r.length === 0) throw new S("No watchable item found");
    const a = (t = r.find(i => i && Zt(e.media, i.title, i.year))) == null ? void 0 : t.url;
    if (!a) throw new S("No watchable item found");
    e.progress(50);
    const u = await e.proxiedFetcher(a, {
        method: "POST",
        body: new URLSearchParams({
          play: ""
        })
      }),
      n = be(u),
      s = [];
    for (const i of n(".play a")) {
      const o = n(i).attr("href");
      if (!o) continue;
      const c = await e.proxiedFetcher.full(o.startsWith("https://") ? o : `https://${o}`),
        l = be(c.body)('a:contains("Download Filme")').attr("href");
      l && (l.includes("streamtape") ? s.push({
        embedId: "streamtape",
        url: l
      }) : l.includes("dood") && s.push({
        embedId: "dood",
        url: l
      }))
    }
    return e.progress(90), {
      embeds: s
    }
  },
  scrapeShow: async e => {
    var t;
    const r = go(await e.proxiedFetcher("/series/", {
      baseUrl: Eo,
      query: {
        s: e.media.title
      }
    }));
    if (r.length === 0) throw new S("No watchable item found");
    const a = (t = r.find(h => h && Zt(e.media, h.title, h.year))) == null ? void 0 : t.url;
    if (!a) throw new S("No watchable item found");
    e.progress(50);
    const u = e.media.season.number < 10 ? `0${e.media.season.number}` : e.media.season.number.toString(),
      n = e.media.episode.number < 10 ? `0${e.media.episode.number}` : e.media.episode.number.toString(),
      s = await e.proxiedFetcher(a, {
        method: "POST",
        body: new URLSearchParams({
          [`S${u}E${n}`]: ""
        })
      }),
      i = be(s)('iframe[name="player"]').attr("src");
    if (!i) throw new Error("Failed to find iframe");
    const o = await e.proxiedFetcher(i.startsWith("https:") ? i : `https:${i}`, {
        method: "POST",
        body: new URLSearchParams({
          submit: ""
        })
      }),
      c = [],
      l = be(o)('a:contains("Download Episodio")').attr("href");
    return l != null && l.includes("streamtape") ? c.push({
      embedId: "streamtape",
      url: l
    }) : l != null && l.includes("dood") && c.push({
      embedId: "dood",
      url: l
    }), e.progress(90), {
      embeds: c
    }
  }
});

function c4(e, t) {
  return Ie(e, {
    referer: t
  })
}

function d4(e) {
  if (e.includes("orbitproxy")) try {
    const t = e.split(/orbitproxy\.[^/]+\//);
    if (t.length >= 2) {
      const r = t[1].split(".m3u8")[0];
      try {
        const a = Buffer.from(r, "base64").toString("utf-8"),
          u = JSON.parse(a),
          n = u.u,
          s = u.r || "";
        return c4(n, s)
      } catch (a) {
        console.error("Error decoding/parsing orbitproxy data:", a)
      }
    }
  } catch (t) {
    console.error("Error processing orbitproxy URL:", t)
  }
  return e.includes("/m3u8-proxy?url=") ? Hx(e) : e
}
const Ao = () => {
  const e = new URL(window.location.href);
  return `${e.protocol}//${e.host}`
};
async function To(e) {
  const t = await e.proxiedFetcher(`https://vidsrc.su/embed/${e.media.type==="movie"?`movie/${e.media.tmdbId}`:`tv/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`}`, {
    headers: {
      Referer: Ao()
    }
  });
  console.log("host", Ao()), e.progress(30);
  const r = t.match(/decodeURIComponent\('([^']+)'\)/),
    a = r ? decodeURIComponent(r[1]) : null,
    n = [...t.matchAll(/label: 'Server (\d+)', url: '(https.*)'/g)].map(o => ({
      serverNumber: parseInt(o[1], 10),
      url: o[2]
    }));
  if (a && n.push({
      serverNumber: 40,
      url: a
    }), e.progress(60), !n.length) throw new S("No server playlist found");
  const i = n.map(o => ({
    ...o,
    url: d4(o.url)
  })).map(o => ({
    embedId: `server-${o.serverNumber}`,
    url: o.url
  }));
  return e.progress(90), {
    embeds: i
  }
}
const l4 = ee({
    id: "vidsrcsu",
    name: "vidsrc.su",
    rank: 150,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: To,
    scrapeShow: To
  }),
  f4 = "https://api2.vidsrc.vip";

function h4(e) {
  return ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"][parseInt(e, 10)]
}

function m4(e, t, r, a) {
  let u;
  t === "show" && r && a ? u = `${e}-${r}-${a}` : u = e.split("").map(h4).join("");
  const n = u.split("").reverse().join("");
  return btoa(btoa(n))
}
async function vo(e) {
  const t = e.media.type === "show" ? "tv" : "movie",
    r = m4(e.media.tmdbId, e.media.type, e.media.type === "show" ? e.media.season.number : void 0, e.media.type === "show" ? e.media.episode.number : void 0),
    a = `${f4}/${t}/${r}`,
    u = await e.proxiedFetcher(a);
  if (!u || !u.source1) throw new S("No sources found");
  const n = [],
    s = ["vidsrc-comet", "vidsrc-pulsar", "vidsrc-nova"];
  let i = 0;
  for (let o = 1; u[`source${o}`]; o++) {
    const c = u[`source${o}`];
    c != null && c.url && (n.push({
      embedId: s[i % s.length],
      url: c.url
    }), i++)
  }
  if (n.length === 0) throw new S("No embeds found");
  return {
    embeds: n
  }
}
const p4 = ee({
    id: "vidsrcvip",
    name: "Sentinel",
    disabled: !0,
    rank: 75,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: vo,
    scrapeShow: vo
  }),
  b4 = [{
    id: "autoembed-english",
    rank: 10
  }, {
    id: "autoembed-hindi",
    rank: 9,
    disabled: !0
  }, {
    id: "autoembed-tamil",
    rank: 8,
    disabled: !0
  }, {
    id: "autoembed-telugu",
    rank: 7,
    disabled: !0
  }, {
    id: "autoembed-bengali",
    rank: 6,
    disabled: !0
  }];

function x4(e) {
  return he({
    id: e.id,
    name: e.id.split("-").map(t => t[0].toUpperCase() + t.slice(1)).join(" "),
    disabled: e.disabled,
    rank: e.rank,
    async scrape(t) {
      return {
        stream: [{
          id: "primary",
          type: "hls",
          playlist: t.url,
          flags: [k.CORS_ALLOWED],
          captions: []
        }]
      }
    }
  })
}
const [E4, g4, A4, T4, v4] = b4.map(x4), _4 = "https://ridomovies.tv/", Dl = he({
  id: "closeload",
  name: "CloseLoad",
  rank: 106,
  async scrape(e) {
    var t;
    const r = new URL(e.url).origin,
      a = await e.proxiedFetcher(e.url, {
        headers: {
          referer: _4
        }
      }),
      u = be(a),
      n = u("track").map((h, f) => {
        const m = u(f),
          p = `${r}${m.attr("src")}`,
          b = m.attr("label") ?? "",
          x = lt(b),
          T = u0(p);
        return !x || !T ? null : {
          id: p,
          language: x,
          hasCorsRestrictions: !0,
          type: T,
          url: p
        }
      }).get().filter(h => h !== null),
      s = u("script").filter((h, f) => {
        var m;
        const p = u(f);
        return (p.attr("type") === "text/javascript" && ((m = p.html()) == null ? void 0 : m.includes("p,a,c,k,e,d"))) ?? !1
      }).html();
    if (!s) throw new Error("Couldn't find eval code");
    const i = t0.unpack(s),
      c = (t = /var\s+(\w+)\s*=\s*"([^"]+)";/g.exec(i)) == null ? void 0 : t[2];
    if (!c) throw new S("Unable to find source url");
    return {
      stream: [{
        id: "primary",
        type: "hls",
        playlist: atob(c),
        captions: n,
        flags: [k.IP_LOCKED],
        headers: {
          Referer: "https://closeload.top/",
          Origin: "https://closeload.top"
        }
      }]
    }
  }
}), y4 = [{
  id: "consumet-vidcloud",
  rank: 405,
  name: "VidCloud",
  server: "vidcloud"
}, {
  id: "consumet-streamsb",
  rank: 404,
  name: "StreamSB",
  server: "streamsb",
  disabled: !0
}, {
  id: "consumet-vidstreaming",
  rank: 403,
  name: "VidStreaming",
  server: "vidstreaming",
  disabled: !0
}, {
  id: "consumet-streamtape",
  rank: 402,
  name: "StreamTape",
  server: "streamtape",
  disabled: !0
}], C4 = {
  English: "en",
  Spanish: "es",
  French: "fr",
  German: "de",
  Italian: "it",
  Portuguese: "pt",
  Arabic: "ar",
  Russian: "ru",
  Japanese: "ja",
  Korean: "ko",
  Chinese: "zh",
  Hindi: "hi",
  Turkish: "tr",
  Dutch: "nl",
  Polish: "pl",
  Swedish: "sv",
  Indonesian: "id",
  Thai: "th",
  Vietnamese: "vi"
};

function S4(e) {
  return he({
    id: e.id,
    name: e.name,
    rank: e.rank,
    disabled: e.disabled,
    async scrape(t) {
      var r;
      const u = `https://consumet.pstream.org/anime/zoro/watch?episodeId=${JSON.parse(t.url).episodeId}&server=${e.server}`,
        n = await t.fetcher(u);
      if (!((r = n == null ? void 0 : n.sources) != null && r.length)) throw new S("No stream found");
      t.progress(50);
      const s = n.subtitles.filter(l => l.lang !== "thumbnails").map(l => ({
          type: "vtt",
          id: l.url,
          url: l.url,
          language: C4[l.lang] || "unknown",
          hasCorsRestrictions: !1
        })),
        i = n.sources.reduce((l, h) => (h.isM3U8 && (l.unknown = h.url), l), {}),
        o = n.subtitles.find(l => l.lang === "thumbnails");
      t.progress(90);
      const c = {};
      return n.headers.Referer && (c.referer = n.headers.Referer), n.headers.Origin && (c.origin = n.headers.Origin), {
        stream: [{
          id: "primary",
          captions: s,
          playlist: Ie(i.unknown, c),
          type: "hls",
          flags: [k.CORS_ALLOWED],
          ...o && {
            thumbnailTrack: {
              type: "vtt",
              url: o.url
            }
          }
        }]
      }
    }
  })
}
const [N4, w4, I4, D4] = y4.map(S4), O4 = () => {
  var e;
  try {
    if (typeof window > "u") return null;
    const t = window.localStorage.getItem("__MW::region");
    if (!t) return null;
    const r = JSON.parse(t);
    return ((e = r == null ? void 0 : r.state) == null ? void 0 : e.region) ?? null
  } catch (t) {
    return console.warn("Unable to access localStorage or parse auth data:", t), null
  }
}, L4 = () => {
  switch (O4()) {
  case "us-east":
    return "https://fed-api-east.pstream.org";
  case "us-west":
    return "https://fed-api-west.pstream.org";
  case "south-america":
    return "https://fed-api-south.pstream.org";
  case "asia":
    return "https://fed-api-asia.pstream.org";
  case "europe":
    return "https://fed-api-europe.pstream.org";
  default:
    return "https://fed-api-east.pstream.org"
  }
}, aa = L4(), R4 = {
  English: "en",
  Spanish: "es",
  French: "fr",
  German: "de",
  Italian: "it",
  Portuguese: "pt",
  Arabic: "ar",
  Russian: "ru",
  Japanese: "ja",
  Korean: "ko",
  Chinese: "zh",
  Hindi: "hi",
  Turkish: "tr",
  Dutch: "nl",
  Polish: "pl",
  Swedish: "sv",
  Indonesian: "id",
  Thai: "th",
  Vietnamese: "vi"
}, k4 = [{
  id: "fedapi-private",
  rank: 303,
  name: "FED API (Private)",
  useToken: !0,
  useCacheUrl: !1
}, {
  id: "feddb",
  rank: 302,
  name: "FED DB",
  useToken: !1,
  useCacheUrl: !0
}];

function B4(e) {
  return he({
    id: e.id,
    name: e.name,
    rank: e.rank,
    disabled: e.disabled,
    async scrape(t) {
      var r;
      const a = JSON.parse(t.url);
      let u;
      e.useCacheUrl ? u = a.type === "movie" ? `${aa}/cache/${a.imdbId}` : `${aa}/cache/${a.imdbId}/${a.season}/${a.episode}` : u = a.type === "movie" ? `${aa}/movie/${a.imdbId}` : `${aa}/tv/${a.imdbId}/${a.season}/${a.episode}`;
      const n = {};
      e.useToken && a.token && (n["ui-token"] = a.token);
      const s = await t.fetcher(u, {
        headers: Object.keys(n).length > 0 ? n : void 0
      });
      if (s != null && s.error && s.error.startsWith("No results found in MovieBox search")) throw new S("No stream found");
      if ((s == null ? void 0 : s.error) === "No cached data found for this episode") throw new S("No stream found");
      if ((s == null ? void 0 : s.error) === "No cached data found for this ID") throw new S("No stream found");
      if (!s) throw new S("No response from API");
      t.progress(50);
      const i = Object.entries(s.streams).reduce((l, [h, f]) => {
          let m;
          return h === "ORG" ? (l.unknown = f, l) : (h === "4K" ? m = 2160 : m = parseInt(h.replace("P", ""), 10), Number.isNaN(m) || l[m] || (l[m] = f), l)
        }, {}),
        o = Object.entries(i).reduce((l, [h, f]) => (e.useCacheUrl && h === "unknown" || (l[h] = f), l), {}),
        c = [];
      if (s.subtitles)
        for (const [l, h] of Object.entries(s.subtitles)) {
          const f = l.split("_")[0],
            m = f.charAt(0).toUpperCase() + f.slice(1),
            p = ((r = R4[m]) == null ? void 0 : r.toLowerCase()) ?? "unknown";
          if (h.subtitle_link) {
            const b = h.subtitle_link,
              x = b.toLowerCase().endsWith(".vtt");
            c.push({
              type: x ? "vtt" : "srt",
              id: b,
              url: b,
              language: p,
              hasCorsRestrictions: !1
            })
          }
        }
      return t.progress(90), {
        stream: [{
          id: "primary",
          captions: c,
          qualities: {
            ...o[2160] && {
              "4k": {
                type: "mp4",
                url: o[2160]
              }
            },
            ...o[1080] && {
              1080: {
                type: "mp4",
                url: o[1080]
              }
            },
            ...o[720] && {
              720: {
                type: "mp4",
                url: o[720]
              }
            },
            ...o[480] && {
              480: {
                type: "mp4",
                url: o[480]
              }
            },
            ...o[360] && {
              360: {
                type: "mp4",
                url: o[360]
              }
            },
            ...o.unknown && {
              unknown: {
                type: "mp4",
                url: o.unknown
              }
            }
          },
          type: "file",
          flags: [k.CORS_ALLOWED]
        }]
      }
    }
  })
}
const [F4, P4] = k4.map(B4), M4 = [{
  id: "mp4hydra-1",
  name: "Server 1",
  rank: 36
}, {
  id: "mp4hydra-2",
  name: "Server 2",
  rank: 35,
  disabled: !0
}];

function U4(e) {
  return he({
    id: e.id,
    name: e.name,
    disabled: e.disabled,
    rank: e.rank,
    async scrape(t) {
      const [r, a] = t.url.split("|");
      return {
        stream: [{
          id: "primary",
          type: "file",
          qualities: {
            [o0(a || "")]: {
              url: r,
              type: "mp4"
            }
          },
          flags: [k.CORS_ALLOWED],
          captions: []
        }]
      }
    }
  })
}
const [H4, $4] = M4.map(U4), q4 = "https://ridomovies.tv/", Ol = he({
  id: "ridoo",
  name: "Ridoo",
  rank: 105,
  async scrape(e) {
    var t;
    const r = await e.proxiedFetcher(e.url, {
        headers: {
          referer: q4
        }
      }),
      u = (t = /file:"([^"]+)"/g.exec(r)) == null ? void 0 : t[1];
    if (!u) throw new S("Unable to find source url");
    return {
      stream: [{
        id: "primary",
        type: "hls",
        playlist: u,
        captions: [],
        flags: [k.CORS_ALLOWED]
      }]
    }
  }
}), W4 = he({
  id: "streamtape",
  name: "Streamtape",
  rank: 160,
  async scrape(e) {
    var t;
    const a = (await e.proxiedFetcher(e.url)).match(/robotlink'\).innerHTML = (.*)'/);
    if (!a) throw new Error("No match found");
    const [u, n] = ((t = a == null ? void 0 : a[1]) == null ? void 0 : t.split("+ ('")) ?? [];
    if (!u || !n) throw new Error("No match found");
    const s = `https:${u==null?void 0:u.replace(/'/g,"").trim()}${n==null?void 0:n.substring(3).trim()}`;
    return {
      stream: [{
        id: "primary",
        type: "file",
        flags: [k.CORS_ALLOWED, k.IP_LOCKED],
        captions: [],
        qualities: {
          unknown: {
            type: "mp4",
            url: s
          }
        },
        headers: {
          Referer: "https://streamtape.com"
        }
      }]
    }
  }
}), Y4 = /(eval\(function\(p,a,c,k,e,d\).*\)\)\))/, z4 = /src:"(https:\/\/[^"]+)"/, V4 = he({
  id: "streamvid",
  name: "Streamvid",
  rank: 215,
  async scrape(e) {
    const r = (await e.proxiedFetcher(e.url)).match(Y4);
    if (!r) throw new Error("streamvid packed not found");
    const u = t0.unpack(r[1]).match(z4);
    if (!u) throw new Error("streamvid link not found");
    return {
      stream: [{
        type: "hls",
        id: "primary",
        playlist: u[1],
        flags: [k.CORS_ALLOWED],
        captions: []
      }]
    }
  }
}), G4 = he({
  id: "vidcloud",
  name: "VidCloud",
  rank: 201,
  disabled: !0,
  async scrape(e) {
    return {
      stream: (await Il.scrape(e)).stream.map(r => ({
        ...r,
        flags: []
      }))
    }
  }
}), j4 = [{
  id: "server-13",
  rank: 112
}, {
  id: "server-18",
  rank: 111
}, {
  id: "server-11",
  rank: 102
}, {
  id: "server-7",
  rank: 92
}, {
  id: "server-10",
  rank: 82
}, {
  id: "server-1",
  rank: 72
}, {
  id: "server-16",
  rank: 64
}, {
  id: "server-3",
  rank: 62
}, {
  id: "server-17",
  rank: 52
}, {
  id: "server-2",
  rank: 42
}, {
  id: "server-4",
  rank: 32
}, {
  id: "server-5",
  rank: 24
}, {
  id: "server-14",
  rank: 22
}, {
  id: "server-6",
  rank: 21
}, {
  id: "server-15",
  rank: 20
}, {
  id: "server-8",
  rank: 19
}, {
  id: "server-9",
  rank: 18
}, {
  id: "server-19",
  rank: 17
}, {
  id: "server-12",
  rank: 16
}];

function K4(e) {
  return he({
    id: e.id,
    name: e.name || e.id.split("-").map(t => t[0].toUpperCase() + t.slice(1)).join(" "),
    disabled: e.disabled,
    rank: e.rank,
    async scrape(t) {
      return {
        stream: [{
          id: "primary",
          type: "hls",
          playlist: t.url,
          flags: [k.CORS_ALLOWED],
          captions: []
        }]
      }
    }
  })
}
const [X4, Q4, J4, Z4, e8, t8, r8, a8, u8, n8, s8, i8, o8] = j4.map(K4), c8 = he({
  id: "viper",
  name: "Viper",
  rank: 182,
  async scrape(e) {
    const t = await e.proxiedFetcher.full(e.url, {
      headers: {
        Accept: "application/json",
        Referer: "https://embed.su/"
      }
    });
    if (!t.body.source) throw new S("No source found");
    const r = t.body.source.replace(/^.*\/viper\//, "https://");
    return {
      stream: [{
        type: "hls",
        id: "primary",
        playlist: Ie(r, {
          referer: "https://megacloud.store/",
          origin: "https://megacloud.store"
        }),
        flags: [k.CORS_ALLOWED],
        captions: []
      }]
    }
  }
});
async function d8(e, t) {
  var r;
  const a = await e.proxiedFetcher("https://cloud.mail.ru/public/uaRH/2PYWcJRpH"),
    n = (r = /"videowl_view":\{"count":"(\d+)","url":"([^"]+)"\}/g.exec(a)) == null ? void 0 : r[2];
  if (!n) throw new S("Failed to get videoOwlUrl");
  return `${n}/0p/${btoa(t)}.m3u8?${new URLSearchParams({double_encode:"1"})}`
}
const Ll = he({
    id: "warezcdnembedhls",
    name: "WarezCDN HLS",
    disabled: !0,
    rank: 83,
    async scrape(e) {
      const t = await Xd(e);
      if (!t) throw new S("can't get file id");
      const r = await d8(e, t);
      return {
        stream: [{
          id: "primary",
          type: "hls",
          flags: [k.IP_LOCKED],
          captions: [],
          playlist: r
        }]
      }
    }
  }),
  Rl = he({
    id: "warezplayer",
    name: "warezPLAYER",
    disabled: !0,
    rank: 85,
    async scrape(e) {
      const t = new URL(e.url),
        r = t.pathname.split("/")[2],
        a = await e.proxiedFetcher("/player/index.php", {
          baseUrl: t.origin,
          query: {
            data: r,
            do: "getVideo"
          },
          method: "POST",
          body: new URLSearchParams({
            hash: r
          }),
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          }
        }),
        u = JSON.parse(a);
      if (!u.videoSource) throw new Error("Playlist not found");
      return {
        stream: [{
          id: "primary",
          type: "hls",
          flags: [],
          captions: [],
          playlist: u.videoSource,
          headers: {
            Accept: "*/*"
          }
        }]
      }
    }
  }),
  l8 = [{
    id: "webtor-1080",
    rank: 80
  }, {
    id: "webtor-4k",
    rank: 79
  }, {
    id: "webtor-720",
    rank: 78
  }, {
    id: "webtor-480",
    rank: 77
  }];

function f8(e) {
  return he({
    id: e.id,
    name: `Webtor ${e.id.split("-")[1].toUpperCase()}`,
    rank: e.rank,
    async scrape(t) {
      return {
        stream: [{
          id: "primary",
          type: "hls",
          playlist: t.url,
          flags: [k.CORS_ALLOWED],
          captions: []
        }]
      }
    }
  })
}
const [h8, m8, p8, b8] = l8.map(f8);
async function kl(e, t) {
  var r, a;
  try {
    const u = "https://ftmoh345xme.com",
      n = {
        Origin: "https://friness-cherlormur-i-275.site",
        Referer: "https://google.com/",
        Dnt: "1"
      },
      s = `${u}/play/${t}`,
      i = await e.proxiedFetcher(s, {
        headers: {
          ...n
        },
        method: "GET"
      }),
      c = be(i)("script").last().html();
    if (!c) throw new S("Failed to extract script data");
    const l = ((r = c.match(/(\{[^;]+});/)) == null ? void 0 : r[1]) || ((a = c.match(/\((\{.*\})\)/)) == null ? void 0 : a[1]);
    if (!l) throw new S("Media not found");
    const h = JSON.parse(l);
    let f = h.file;
    if (!f) throw new S("File not found");
    f.startsWith("/") && (f = u + f);
    const m = h.key,
      p = {
        Origin: "https://friness-cherlormur-i-275.site",
        Referer: "https://google.com/",
        Dnt: "1",
        "X-Csrf-Token": m
      };
    return {
      success: !0,
      data: {
        playlist: await e.proxiedFetcher(f, {
          headers: {
            ...p
          },
          method: "GET"
        }),
        key: m
      }
    }
  } catch (u) {
    throw u instanceof S ? u : new S("Failed to fetch media info")
  }
}
async function Bl(e, t, r) {
  const u = `${t.slice(1)}.txt`;
  try {
    const n = "https://ftmoh345xme.com",
      s = {
        Origin: "https://friness-cherlormur-i-275.site",
        Referer: "https://google.com/",
        Dnt: "1",
        "X-Csrf-Token": r
      },
      i = `${n}/playlist/${u}`;
    return {
      success: !0,
      data: {
        link: await e.proxiedFetcher(i, {
          headers: {
            ...s
          },
          method: "GET"
        })
      }
    }
  } catch {
    throw new S("Failed to fetch stream data")
  }
}
async function x8(e, t, r = "English") {
  var a, u;
  try {
    const n = await kl(e, t);
    if (n != null && n.success) {
      const s = (a = n == null ? void 0 : n.data) == null ? void 0 : a.playlist;
      if (!s || !Array.isArray(s)) throw new S("Playlist not found or invalid");
      let i = s.find(h => (h == null ? void 0 : h.title) === r);
      if (i || (i = s == null ? void 0 : s[0]), !i) throw new S("No file found");
      const o = s.map(h => h == null ? void 0 : h.title),
        c = (u = n == null ? void 0 : n.data) == null ? void 0 : u.key;
      e.progress(70);
      const l = await Bl(e, i == null ? void 0 : i.file, c);
      if (l != null && l.success) return {
        success: !0,
        data: l == null ? void 0 : l.data,
        availableLang: o
      };
      throw new S("No stream url found")
    }
    throw new S("No media info found")
  } catch (n) {
    throw n instanceof S ? n : new S("Failed to fetch movie data")
  }
}
async function E8(e, t, r, a, u) {
  var n, s, i;
  try {
    const o = await kl(e, t);
    if (!(o != null && o.success)) throw new S("No media info found");
    const l = ((n = o == null ? void 0 : o.data) == null ? void 0 : n.playlist).find(T => (T == null ? void 0 : T.id) === r.toString());
    if (!l) throw new S("No season found");
    const h = l == null ? void 0 : l.folder.find(T => (T == null ? void 0 : T.episode) === a.toString());
    if (!h) throw new S("No episode found");
    let f = h == null ? void 0 : h.folder.find(T => (T == null ? void 0 : T.title) === u);
    if (f || (f = (s = h == null ? void 0 : h.folder) == null ? void 0 : s[0]), !f) throw new S("No file found");
    const p = (h == null ? void 0 : h.folder.map(T => T == null ? void 0 : T.title)).filter(T => (T == null ? void 0 : T.length) > 0),
      b = (i = o == null ? void 0 : o.data) == null ? void 0 : i.key;
    e.progress(70);
    const x = await Bl(e, f == null ? void 0 : f.file, b);
    if (x != null && x.success) return {
      success: !0,
      data: x == null ? void 0 : x.data,
      availableLang: p
    };
    throw new S("No stream url found")
  } catch (o) {
    throw o instanceof S ? o : new S("Failed to fetch TV data")
  }
}
async function _o(e) {
  if (e.media.title, e.media.releaseYear, e.media.tmdbId, e.media.imdbId, e.media.type, e.media.type === "show" && (e.media.season.number.toString(), e.media.episode.number.toString()), e.media.type === "movie") {
    e.progress(40);
    const t = await x8(e, e.media.imdbId);
    if (t != null && t.success) return e.progress(90), {
      embeds: [],
      stream: [{
        id: "primary",
        captions: [],
        playlist: t.data.link,
        type: "hls",
        flags: [k.CORS_ALLOWED]
      }]
    };
    throw new S("No providers available")
  }
  if (e.media.type === "show") {
    e.progress(40);
    const r = await E8(e, e.media.imdbId, e.media.season.number, e.media.episode.number, "English");
    if (r != null && r.success) return e.progress(90), {
      embeds: [],
      stream: [{
        id: "primary",
        captions: [],
        playlist: r.data.link,
        type: "hls",
        flags: [k.CORS_ALLOWED]
      }]
    };
    throw new S("No providers available")
  }
  throw new S("No providers available")
}
const g8 = ee({
    id: "8stream",
    name: "8stream",
    rank: 111,
    flags: [],
    disabled: !1,
    scrapeMovie: _o,
    scrapeShow: _o
  }),
  A8 = ["flowcast", "shadow", "asiacloud", "ophim", "kage"];
async function yo(e) {
  const t = [],
    r = {
      type: e.media.type,
      tmdbId: e.media.tmdbId
    };
  e.media.type === "show" && (r.season = e.media.season.number, r.episode = e.media.episode.number);
  for (const a of A8) t.push({
    embedId: `cinemaos-${a}`,
    url: JSON.stringify({
      ...r,
      service: a
    })
  });
  return console.log(t), e.progress(50), {
    embeds: t
  }
}
const T8 = ee({
    id: "cinemaos",
    name: "CinemaOS",
    rank: 149,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: yo,
    scrapeShow: yo
  }),
  Co = "https://api.coitus.ca";
async function So(e) {
  const t = e.media.type === "movie" ? `${Co}/movie/${e.media.tmdbId}` : `${Co}/tv/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.proxiedFetcher(t);
  if (!r.videoSource) throw new S("No watchable item found");
  let a = r.videoSource;
  if (a.includes("orbitproxy")) try {
    const u = a.split(/orbitproxy\.[^/]+\//);
    if (u.length >= 2) {
      const n = u[1].split(".m3u8")[0];
      try {
        const s = Buffer.from(n, "base64").toString("utf-8"),
          i = JSON.parse(s),
          o = i.u,
          l = {
            referer: i.r || ""
          };
        a = Ie(o, l)
      } catch (s) {
        console.error("Error decoding/parsing orbitproxy data:", s)
      }
    }
  } catch (u) {
    console.error("Error processing orbitproxy URL:", u)
  }
  return console.log(r), e.progress(90), {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      playlist: a,
      type: "hls",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const v8 = ee({
  id: "coitus",
  name: "Autoembed+",
  rank: 245,
  disabled: !0,
  flags: [k.CORS_ALLOWED],
  scrapeMovie: So,
  scrapeShow: So
});
async function _8(e) {
  var t, r;
  const a = e.media.title,
    n = `https://consumet.pstream.org/anime/zoro/${encodeURIComponent(a)}?page=1`,
    s = await e.fetcher(n);
  if (!((t = s == null ? void 0 : s.results) != null && t.length)) throw new Error("No results found");
  const i = s.results.find(m => m.title.toLowerCase() === e.media.title.toLowerCase()) || s.results[0],
    o = `https://consumet.pstream.org/anime/zoro/info?id=${i.id}`,
    c = await e.fetcher(o);
  if (!((r = c == null ? void 0 : c.episodes) != null && r.length)) throw new Error("No episodes found");
  const l = c.episodes.find(m => m.number === e.media.episode.number);
  if (!l) throw new Error("Episode not found");
  const h = {
    episodeId: `${i.id}$${e.media.season.number}$${l.id}$both`
  };
  return {
    embeds: [{
      embedId: "consumet-vidcloud",
      url: JSON.stringify({
        ...h,
        server: "vidcloud"
      })
    }, {
      embedId: "consumet-streamsb",
      url: JSON.stringify({
        ...h,
        server: "streamsb"
      })
    }, {
      embedId: "consumet-vidstreaming",
      url: JSON.stringify({
        ...h,
        server: "vidstreaming"
      })
    }, {
      embedId: "consumet-streamtape",
      url: JSON.stringify({
        ...h,
        server: "streamtape"
      })
    }]
  }
}
const y8 = ee({
    id: "consumet",
    disabled: !0,
    name: "Consumet (Anime)",
    rank: 4,
    flags: [k.CORS_ALLOWED],
    scrapeShow: _8
  }),
  C8 = `${Ee}/gloomy`;
async function S8(e) {
  const t = `${C8}/${e.media.tmdbId}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a) throw new S("No streams found");
  const u = a;
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((s, i) => {
    const o = i.quality.split("p")[0];
    return Number.isNaN(Number(o)) || (s[o] = we(i.url)), s
  }, {});
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        ...n[2160] && {
          "4k": {
            type: "mp4",
            url: n[2160]
          }
        },
        ...n[1080] && {
          1080: {
            type: "mp4",
            url: n[1080]
          }
        },
        ...n[720] && {
          720: {
            type: "mp4",
            url: n[720]
          }
        },
        ...n[480] && {
          480: {
            type: "mp4",
            url: n[480]
          }
        },
        ...n[360] && {
          360: {
            type: "mp4",
            url: n[360]
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const N8 = ee({
    id: "gloomy",
    name: "Gloomy",
    rank: 246,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: S8
  }),
  No = `${Ee}/nimble`;
async function wo(e) {
  const t = e.media.type === "movie" ? `${No}/${e.media.tmdbId}` : `${No}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams) throw new S("No streams found");
  const u = Array.isArray(a.streams) ? a.streams : [a.streams];
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = a.streams.reduce((i, o) => {
      const c = o.stream || o.url;
      if (!c || c.startsWith("/download")) return i;
      const l = o.quality.toLowerCase(),
        h = l === "1080p untouch" ? "original" : l;
      return i[h] || (i[h] = []), i[h].push({
        type: "mp4",
        url: c
      }), i
    }, {}),
    s = Object.entries(n).reduce((i, [o, c]) => (c.forEach((l, h) => {
      const f = c.length > 1 ? `${o}-${h+1}` : o;
      i[f] = l
    }), i), {});
  if (Object.keys(s).length === 0) throw new S("No valid streams found");
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: s,
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const w8 = ee({
    id: "nimble",
    name: "Nimble(Hindi)",
    rank: 33,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: wo,
    scrapeShow: wo
  }),
  Io = `${Ee}/quasar`;
async function Do(e) {
  const t = e.media.type === "movie" ? `${Io}/${e.media.tmdbId}` : `${Io}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams || !a.streams.hls) throw new S("No valid stream found");
  const u = a.streams.hls;
  return {
    embeds: [],
    stream: [{
      id: "primary",
      type: "hls",
      playlist: u,
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}
const I8 = ee({
    id: "quasar",
    name: "Quasar",
    rank: 10,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Do,
    scrapeShow: Do
  }),
  Oo = `${Ee}/stammer`;
async function Lo(e) {
  const t = e.media.type === "movie" ? `${Oo}/${e.media.tmdbId}` : `${Oo}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a) throw new S("No streams found");
  const u = a.streams;
  if (u.length === 0 || !u[0].url) throw new S("No valid streams found");
  const n = u.reduce((s, i) => {
    const o = i.quality.split("p")[0];
    return Number.isNaN(Number(o)) || (s[o] = i.url), s
  }, {});
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        ...n[720] && {
          720: {
            type: "mp4",
            url: n[720]
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const D8 = ee({
    id: "stammer",
    name: "Stammer",
    rank: 15,
    flags: [k.CORS_ALLOWED],
    disabled: !1,
    scrapeMovie: Lo,
    scrapeShow: Lo
  }),
  Ro = "https://hahoy.server.arlen.icu/xeno/amazon";
async function ko(e) {
  const t = e.media.type === "movie" ? `${Ro}?id=${e.media.tmdbId}` : `${Ro}?id=${e.media.tmdbId}&season=${e.media.season.number}&episode=${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams) throw new S("No streams found");
  return {
    embeds: [],
    stream: [{
      type: "hls",
      id: "primary",
      playlist: a.streams.unknown,
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}
const O8 = ee({
    id: "xeno-amazon",
    name: "Xeno(amazon)",
    rank: 262,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: ko,
    scrapeShow: ko
  }),
  Bo = "https://hahoy.server.arlen.icu/xeno/marine";
async function Fo(e) {
  const t = e.media.type === "movie" ? `${Bo}?id=${e.media.tmdbId}` : `${Bo}?id=${e.media.tmdbId}&season=${e.media.season.number}&episode=${e.media.episode.number}`,
    r = await e.fetcher(t);
  if (!r) throw new S("No response from API");
  const a = await r;
  if (!a.streams) throw new S("No streams found");
  return {
    embeds: [],
    stream: [{
      type: "hls",
      id: "primary",
      playlist: a.streams.unknown,
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}
const L8 = ee({
    id: "xeno-marine",
    name: "Xeno(marine)",
    rank: 261,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Fo,
    scrapeShow: Fo
  }),
  R8 = () => {
    var e;
    try {
      if (typeof window > "u") return null;
      const t = window.localStorage.getItem("__MW::auth");
      if (!t) return null;
      const r = JSON.parse(t);
      return ((e = r == null ? void 0 : r.state) == null ? void 0 : e.febboxToken) || null
    } catch (t) {
      return console.warn("Unable to access localStorage or parse auth data:", t), null
    }
  };
async function Po(e) {
  const t = {
      type: e.media.type,
      imdbId: e.media.imdbId,
      tmdbId: e.media.tmdbId,
      ...e.media.type === "show" && {
        season: e.media.season.number,
        episode: e.media.episode.number
      }
    },
    r = R8(),
    a = [];
  return r && a.push({
    embedId: "fedapi-private",
    url: `${JSON.stringify({...t,token:r})}`
  }), r || a.push({
    embedId: "feddb",
    url: `${JSON.stringify(t)}`
  }), {
    embeds: a
  }
}
const k8 = ee({
  id: "fedapi",
  name: "FED API (4K)",
  rank: 260,
  disabled: !0,
  flags: [k.CORS_ALLOWED],
  scrapeMovie: Po,
  scrapeShow: Po
});

function B8() {
  const e = () => Math.floor(Math.random() * 16).toString(16),
    t = r => Array.from({
      length: r
    }, e).join("");
  return `${t(8)}-${t(4)}-${t(4)}-${t(4)}-${t(12)}`
}

function F8(e) {
  if (!e || typeof e == "boolean") return [];
  const t = e.split(","),
    r = [];
  return t.forEach(a => {
    const u = a.match(/\[([^\]]+)\](https?:\/\/\S+?)(?=,\[|$)/);
    if (u) {
      const n = u0(u[2]),
        s = lt(u[1]);
      if (!n || !s) return;
      r.push({
        id: u[2],
        language: s,
        hasCorsRestrictions: !1,
        type: n,
        url: u[2]
      })
    }
  }), r
}

function P8(e) {
  if (!e) throw new S("No video links found");
  try {
    const t = {};
    e.split(",").forEach(u => {
      const n = u.match(/\[([^\]]+)\](https?:\/\/[^\s,]+)/);
      if (n) {
        const [s, i, o] = n;
        if (o === "null") return;
        const c = i.replace(/<[^>]+>/g, "").toLowerCase().replace("p", "").trim();
        t[c] = {
          type: "mp4",
          url: o.trim()
        }
      }
    });
    const a = {};
    return Object.entries(t).forEach(([u, n]) => {
      const s = o0(u);
      a[s] = n
    }), a
  } catch (t) {
    throw console.error("Error parsing video links:", t), new S("Failed to parse video links")
  }
}
const yn = "https://hdrezka.ag/",
  c0 = {
    "X-Hdrezka-Android-App": "1",
    "X-Hdrezka-Android-App-Version": "2.2.0",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "CF-IPCountry": "RU"
  };
async function M8(e) {
  const t = await e.proxiedFetcher("/engine/ajax/search.php", {
      baseUrl: yn,
      headers: c0,
      query: {
        q: e.media.title
      }
    }),
    r = be(t),
    a = r("a").map((u, n) => {
      var s;
      const i = r(n),
        o = i.attr("href"),
        c = i.find("span.enty").text(),
        l = c.match(/\((\d{4})\)/) || (o == null ? void 0 : o.match(/-(\d{4})(?:-|\.html)/)) || c.match(/(\d{4})/),
        h = l ? l[1] : null,
        f = (s = o == null ? void 0 : o.match(/\/(\d+)-[^/]+\.html$/)) == null ? void 0 : s[1];
      return f ? {
        id: f,
        year: h ? parseInt(h, 10) : e.media.releaseYear,
        type: e.media.type,
        url: o || ""
      } : null
    }).get().filter(Boolean);
  return a.sort((u, n) => {
    const s = Math.abs(u.year - e.media.releaseYear),
      i = Math.abs(n.year - e.media.releaseYear);
    return s - i
  }), a[0] || null
}
async function U8(e, t, r) {
  const a = new URLSearchParams;
  a.append("id", e), a.append("translator_id", t), r.media.type === "show" && (a.append("season", r.media.season.number.toString()), a.append("episode", r.media.episode.number.toString())), a.append("favs", B8()), a.append("action", r.media.type === "show" ? "get_stream" : "get_movie"), a.append("t", Date.now().toString());
  const u = await r.proxiedFetcher("/ajax/get_cdn_series/", {
    baseUrl: yn,
    method: "POST",
    body: a,
    headers: {
      ...c0,
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
      Referer: `${yn}films/action/${e}-novokain-2025-latest.html`
    }
  });
  try {
    const n = JSON.parse(u);
    if (!n.url && n.success) throw new S("Movie found but no stream available (might be premium or not yet released)");
    if (!n.url) throw new S("No stream URL found in response");
    return n
  } catch (n) {
    throw console.error("Error parsing stream response:", n), new S("Failed to parse stream response")
  }
}
async function H8(e, t, r) {
  const a = await r.proxiedFetcher(e, {
    headers: c0
  });
  if (a.includes('data-translator_id="238"')) return "238";
  const u = r.media.type === "movie" ? "initCDNMoviesEvents" : "initCDNSeriesEvents",
    n = new RegExp(`sof\\.tv\\.${u}\\(${t}, ([^,]+)`, "i"),
    s = a.match(n);
  return s ? s[1] : null
}
const Mo = async e => {
  const t = await M8(e);
  if (!t || !t.id) throw new S("No result found");
  const r = await H8(t.url, t.id, e);
  if (!r) throw new S("No translator id found");
  const {
    url: a,
    subtitle: u
  } = await U8(t.id, r, e), n = P8(a), s = F8(u);
  return e.progress(90), {
    embeds: [],
    stream: [{
      id: "primary",
      type: "file",
      flags: [k.CORS_ALLOWED, k.IP_LOCKED],
      captions: s,
      qualities: n
    }]
  }
}, $8 = ee({
  id: "hdrezka",
  name: "HDRezka",
  rank: 110,
  flags: [k.CORS_ALLOWED, k.IP_LOCKED],
  scrapeShow: Mo,
  scrapeMovie: Mo
}), Uo = "https://iosmirror.cc", xr = "https://vercel-sucks.up.railway.app/iosmirror.cc:443", Ho = async e => {
  var t, r, a, u, n;
  const s = decodeURIComponent(await e.fetcher("https://iosmirror-hash.pstream.org/"));
  if (!s) throw new S("No hash found");
  e.progress(10);
  const i = await e.proxiedFetcher("/search.php", {
    baseUrl: xr,
    query: {
      s: e.media.title
    },
    headers: {
      cookie: Oe({
        t_hash_t: s,
        hd: "on"
      })
    }
  });
  if (i.status !== "y" || !i.searchResult) throw new S(i.error);
  async function o(b) {
    return e.proxiedFetcher("/post.php", {
      baseUrl: xr,
      query: {
        id: b
      },
      headers: {
        cookie: Oe({
          t_hash_t: s,
          hd: "on"
        })
      }
    })
  }
  e.progress(30);
  let c, l = (t = i.searchResult.find(async b => (c = await o(b.id), i0(b.t, e.media.title) && (Number(c.year) === e.media.releaseYear || c.type === (e.media.type === "movie" ? "m" : "t"))))) == null ? void 0 : t.id;
  if (!l) throw new S("No watchable item found");
  if (e.media.type === "show") {
    c = await o(l);
    const b = e.media,
      x = (r = c == null ? void 0 : c.season.find(C => Number(C.s) === b.season.number)) == null ? void 0 : r.id;
    if (!x) throw new S("Season not available");
    const T = await e.proxiedFetcher("/episodes.php", {
      baseUrl: xr,
      query: {
        s: x,
        series: l
      },
      headers: {
        cookie: Oe({
          t_hash_t: s,
          hd: "on"
        })
      }
    });
    let E = [...T.episodes],
      A = 2;
    for (; T.nextPageShow === 1;) {
      const C = await e.proxiedFetcher("/episodes.php", {
        baseUrl: xr,
        query: {
          s: x,
          series: l,
          page: A.toString()
        },
        headers: {
          cookie: Oe({
            t_hash_t: s,
            hd: "on"
          })
        }
      });
      E = [...E, ...C.episodes], T.nextPageShow = C.nextPageShow, A++
    }
    const v = (a = E.find(C => C.ep === `E${b.episode.number}` && C.s === `S${b.season.number}`)) == null ? void 0 : a.id;
    if (!v) throw new S("Episode not available");
    l = v
  }
  const h = await e.proxiedFetcher("/playlist.php?", {
    baseUrl: xr,
    query: {
      id: l
    },
    headers: {
      cookie: Oe({
        t_hash_t: s,
        hd: "on"
      })
    }
  });
  e.progress(50);
  let f = (u = h[0].sources.find(b => b.label === "Auto")) == null ? void 0 : u.file;
  if (f || (f = (n = h[0].sources.find(b => b.label === "Full HD")) == null ? void 0 : n.file), f || (console.log('"Full HD" or "Auto" file not found, falling back to first source'), f = h[0].sources[0].file), !f) throw new Error("Failed to fetch playlist");
  const m = {
      referer: Uo,
      cookie: Oe({
        hd: "on"
      })
    },
    p = Ie(`${Uo}${f}`, m);
  return e.progress(90), {
    embeds: [],
    stream: [{
      id: "primary",
      playlist: p,
      type: "hls",
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}, q8 = ee({
  id: "iosmirror",
  name: "NetMirror",
  rank: 182,
  disabled: !0,
  flags: [k.CORS_ALLOWED],
  scrapeMovie: Ho,
  scrapeShow: Ho
}), $o = "https://iosmirror.cc", Er = "https://vercel-sucks.up.railway.app/iosmirror.cc:443/pv", qo = async e => {
  var t, r, a, u, n;
  const s = decodeURIComponent(await e.fetcher("https://iosmirror-hash.pstream.org/"));
  if (!s) throw new S("No hash found");
  e.progress(10);
  const i = await e.proxiedFetcher("/search.php", {
    baseUrl: Er,
    query: {
      s: e.media.title
    },
    headers: {
      cookie: Oe({
        t_hash_t: s,
        hd: "on"
      })
    }
  });
  if (!i.searchResult) throw new S(i.error);
  async function o(p) {
    return e.proxiedFetcher("/post.php", {
      baseUrl: Er,
      query: {
        id: p
      },
      headers: {
        cookie: Oe({
          t_hash_t: s,
          hd: "on"
        })
      }
    })
  }
  e.progress(30);
  let c = (t = i.searchResult.find(async p => {
    const b = await o(p.id);
    return i0(p.t, e.media.title) && (Number(p.y) === e.media.releaseYear || b.type === (e.media.type === "movie" ? "m" : "t"))
  })) == null ? void 0 : t.id;
  if (!c) throw new S("No watchable item found");
  if (e.media.type === "show") {
    const p = await o(c),
      b = e.media,
      x = (r = p == null ? void 0 : p.season.find(C => Number(C.s) === b.season.number)) == null ? void 0 : r.id;
    if (!x) throw new S("Season not available");
    const T = await e.proxiedFetcher("/episodes.php", {
      baseUrl: Er,
      query: {
        s: x,
        series: c
      },
      headers: {
        cookie: Oe({
          t_hash_t: s,
          hd: "on"
        })
      }
    });
    let E = [...T.episodes],
      A = 2;
    for (; T.nextPageShow === 1;) {
      const C = await e.proxiedFetcher("/episodes.php", {
        baseUrl: Er,
        query: {
          s: x,
          series: c,
          page: A.toString()
        },
        headers: {
          cookie: Oe({
            t_hash_t: s,
            hd: "on"
          })
        }
      });
      E = [...E, ...C.episodes], T.nextPageShow = C.nextPageShow, A++
    }
    const v = (a = E.find(C => C.ep === `E${b.episode.number}` && C.s === `S${b.season.number}`)) == null ? void 0 : a.id;
    if (!v) throw new S("Episode not available");
    c = v
  }
  const l = await e.proxiedFetcher("/playlist.php?", {
    baseUrl: Er,
    query: {
      id: c
    },
    headers: {
      cookie: Oe({
        t_hash_t: s,
        hd: "on"
      })
    }
  });
  e.progress(50);
  let h = (u = l[0].sources.find(p => p.label === "Auto")) == null ? void 0 : u.file;
  if (h || (h = (n = l[0].sources.find(p => p.label === "Full HD")) == null ? void 0 : n.file), h || (console.log('"Full HD" or "Auto" file not found, falling back to first source'), h = l[0].sources[0].file), !h) throw new Error("Failed to fetch playlist");
  const f = {
      referer: $o,
      cookie: Oe({
        hd: "on"
      })
    },
    m = Ie(`${$o}${h}`, f);
  return e.progress(90), {
    embeds: [],
    stream: [{
      id: "primary",
      playlist: m,
      type: "hls",
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}, W8 = ee({
  id: "iosmirrorpv",
  name: "PrimeMirror",
  rank: 183,
  disabled: !0,
  flags: [k.CORS_ALLOWED],
  scrapeMovie: qo,
  scrapeShow: qo
}), Wo = "https://mama.up.railway.app/api/showbox", Y8 = () => {
  try {
    return typeof window < "u" ? window.localStorage.getItem("ui-token") : null
  } catch (e) {
    return console.warn("Unable to access localStorage:", e), null
  }
};
async function Yo(e) {
  const t = Y8(),
    r = e.media.type === "movie" ? `${Wo}/movie/${e.media.tmdbId}?token=${t}` : `${Wo}/tv/${e.media.tmdbId}?season=${e.media.season.number}&episode=${e.media.episode.number}&token=${t}`,
    a = await e.proxiedFetcher(r);
  if (!a) throw new S("No response from API");
  const u = await a;
  if (!u.success) throw new S("No streams found");
  const n = Array.isArray(u.streams) ? u.streams : [u.streams];
  if (n.length === 0 || !n[0].player_streams) throw new S("No valid streams found");
  let s = n[0];
  for (const o of n)
    if (o.quality.includes("4K") || o.quality.includes("2160p")) {
      s = o;
      break
    } const i = s.player_streams.reduce((o, c) => {
    let l;
    if (c.quality === "4K" || c.quality.includes("4K")) l = 2160;
    else {
      if (c.quality === "ORG" || c.quality.includes("ORG")) return o;
      l = parseInt(c.quality.replace("P", ""), 10)
    }
    return Number.isNaN(l) || o[l] || (o[l] = c.file), o
  }, {});
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: [],
      qualities: {
        ...i[2160] && {
          "4k": {
            type: "mp4",
            url: i[2160]
          }
        },
        ...i[1080] && {
          1080: {
            type: "mp4",
            url: i[1080]
          }
        },
        ...i[720] && {
          720: {
            type: "mp4",
            url: i[720]
          }
        },
        ...i[480] && {
          480: {
            type: "mp4",
            url: i[480]
          }
        },
        ...i[360] && {
          360: {
            type: "mp4",
            url: i[360]
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED]
    }]
  }
}
const z8 = ee({
    id: "nunflix",
    name: "NFlix",
    rank: 239,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Yo,
    scrapeShow: Yo
  }),
  Fl = "https://ridomovies.tv",
  zo = `${Fl}/core/api`,
  V8 = async e => {
    const a = (await e.proxiedFetcher("/search", {
      baseUrl: zo,
      query: {
        q: e.media.title
      }
    })).data.items.map(c => {
      const l = c.title,
        h = c.contentable.releaseYear,
        f = c.fullSlug;
      return {
        name: l,
        year: h,
        fullSlug: f
      }
    }).find(c => c.name === e.media.title && c.year === e.media.releaseYear.toString());
    if (!(a != null && a.fullSlug)) throw new S("No watchable item found");
    e.progress(40);
    let u = `/${a.fullSlug}/videos`;
    if (e.media.type === "show") {
      const c = await e.proxiedFetcher(`/${a.fullSlug}`, {
          baseUrl: Fl
        }),
        l = `season-${e.media.season.number}/episode-${e.media.episode.number}`,
        h = new RegExp(`\\\\"id\\\\":\\\\"(\\d+)\\\\"(?=.*?\\\\\\"fullSlug\\\\\\":\\\\\\"[^"]*${l}[^"]*\\\\\\")`, "g"),
        m = [...c.matchAll(h)].map(b => b[1]);
      if (m.length === 0) throw new S("No watchable item found");
      u = `/episodes/${m.at(-1)}/videos`
    }
    const n = await e.proxiedFetcher(u, {
        baseUrl: zo
      }),
      i = be(n.data[0].url)("iframe").attr("data-src");
    if (!i) throw new S("No watchable item found");
    e.progress(60);
    const o = [];
    return i.includes("closeload") && o.push({
      embedId: Dl.id,
      url: i
    }), i.includes("ridoo") && o.push({
      embedId: Ol.id,
      url: i
    }), e.progress(90), {
      embeds: o
    }
  }, G8 = ee({
    id: "ridomovies",
    name: "RidoMovies",
    rank: 190,
    flags: [],
    scrapeMovie: V8
  }), Vo = "https://pupp.slidemovies-dev.workers.dev";
async function Go(e) {
  const t = e.media.type === "movie" ? `${Vo}/movie/${e.media.tmdbId}` : `${Vo}/tv/${e.media.tmdbId}/${e.media.season.number}/-${e.media.episode.number}`,
    r = await e.proxiedFetcher(t),
    a = be(r);
  e.progress(50);
  const u = a("media-player").attr("src");
  if (!u) throw new S("Stream URL not found");
  const s = new URL(u).searchParams.get("url") || "",
    i = decodeURIComponent(s),
    o = a("media-provider track").map((c, l) => {
      const h = a(l).attr("src") || "",
        f = a(l).attr("lang") || "unknown",
        m = lt(f) || f;
      return {
        type: h.endsWith(".vtt") ? "vtt" : "srt",
        id: h,
        url: h,
        language: m,
        hasCorsRestrictions: !1
      }
    }).get();
  return e.progress(90), {
    embeds: [],
    stream: [{
      id: "primary",
      type: "hls",
      flags: [],
      playlist: i,
      captions: o
    }]
  }
}
const j8 = ee({
    id: "slidemovies",
    name: "SlideMovies",
    rank: 135,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Go,
    scrapeShow: Go
  }),
  jo = "https://vidjoy.pro/embed/api/fastfetch";
async function Ko(e) {
  var t, r;
  const a = await e.proxiedFetcher(e.media.type === "movie" ? `${jo}/${e.media.tmdbId}?sr=0` : `${jo}/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}?sr=0`);
  if (!a) throw new S("Failed to fetch StreamBox data");
  console.log(a);
  const u = await a,
    n = {};
  u.url.forEach(o => {
    n[o.resulation] = o.link
  });
  const s = u.tracks.map(o => ({
    id: o.lang,
    url: o.url,
    language: o.code,
    type: "srt"
  }));
  if (u.provider === "MovieBox") return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: s,
      qualities: {
        ...n[1080] && {
          1080: {
            type: "mp4",
            url: n[1080]
          }
        },
        ...n[720] && {
          720: {
            type: "mp4",
            url: n[720]
          }
        },
        ...n[480] && {
          480: {
            type: "mp4",
            url: n[480]
          }
        },
        ...n[360] && {
          360: {
            type: "mp4",
            url: n[360]
          }
        }
      },
      type: "file",
      flags: [k.CORS_ALLOWED],
      preferredHeaders: {
        Referer: (t = u.headers) == null ? void 0 : t.Referer
      }
    }]
  };
  const i = u.url.find(o => o.type === "hls") || u.url[0];
  return {
    embeds: [],
    stream: [{
      id: "primary",
      captions: s,
      playlist: i.link,
      type: "hls",
      flags: [k.CORS_ALLOWED],
      preferredHeaders: {
        Referer: (r = u.headers) == null ? void 0 : r.Referer
      }
    }]
  }
}
const K8 = ee({
    id: "streambox",
    name: "StreamBox",
    rank: 243,
    disabled: !0,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Ko,
    scrapeShow: Ko
  }),
  Xo = "https://vidapi.click";
async function Qo(e) {
  const t = e.media.type === "show" ? `${Xo}/api/video/tv/${e.media.tmdbId}/${e.media.season.number}/${e.media.episode.number}` : `${Xo}/api/video/movie/${e.media.tmdbId}`,
    r = await e.proxiedFetcher(t, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
  if (!r) throw new S("Failed to fetch video source");
  if (!r.sources[0].file) throw new S("No video source found");
  return e.progress(50), e.progress(90), {
    embeds: [],
    stream: [{
      id: "primary",
      type: "hls",
      playlist: r.sources[0].file,
      flags: [k.CORS_ALLOWED],
      captions: []
    }]
  }
}
const X8 = ee({
  id: "vidapi-click",
  name: "vidapi.click",
  rank: 89,
  disabled: !0,
  flags: [k.CORS_ALLOWED],
  scrapeMovie: Qo,
  scrapeShow: Qo
});
async function Q8(e, t, r) {
  var a;
  const u = [];
  for (const n of t.split(",")) {
    await r.proxiedFetcher("/getEmbed.php", {
      baseUrl: Tr,
      headers: {
        Referer: `${Tr}/getEmbed.php?${new URLSearchParams({id:e,sv:n})}`
      },
      method: "HEAD",
      query: {
        id: e,
        sv: n
      }
    });
    const i = (a = (await r.proxiedFetcher("/getPlay.php", {
      baseUrl: Tr,
      headers: {
        Referer: `${Tr}/getEmbed.php?${new URLSearchParams({id:e,sv:n})}`
      },
      query: {
        id: e,
        sv: n
      }
    })).match(/window.location.href\s*=\s*"([^"]+)"/)) == null ? void 0 : a[1];
    i && n === "warezcdn" ? u.push({
      embedId: Ll.id,
      url: i
    }, {
      embedId: n0.id,
      url: i
    }, {
      embedId: Rl.id,
      url: i
    }) : i && n === "mixdrop" && u.push({
      embedId: wl.id,
      url: i
    })
  }
  return {
    embeds: u
  }
}
const J8 = ee({
    id: "warezcdn",
    name: "WarezCDN",
    disabled: !0,
    rank: 115,
    flags: [],
    scrapeMovie: async e => {
      if (!e.media.imdbId) throw new S("This source requires IMDB id.");
      const t = await e.proxiedFetcher(`/filme/${e.media.imdbId}`, {
          baseUrl: Tr
        }),
        [, r, a] = t.match(/let\s+data\s*=\s*'\[\s*\{\s*"id":"([^"]+)".*?"servers":"([^"]+)"/);
      if (!r || !a) throw new S("Failed to find episode id");
      return e.progress(40), Q8(r, a, e)
    }
  }),
  Z8 = ["udp://tracker.opentrackr.org:1337/announce", "udp://open.demonii.com:1337/announce", "udp://open.tracker.cl:1337/announce", "udp://open.stealth.si:80/announce", "udp://tracker.torrent.eu.org:451/announce", "udp://explodie.org:6969/announce", "udp://tracker.qu.ax:6969/announce", "udp://tracker.ololosh.space:6969/announce", "udp://tracker.dump.cl:6969/announce", "udp://tracker.dler.org:6969/announce", "udp://tracker.bittor.pw:1337/announce", "udp://tracker-udp.gbitt.info:80/announce", "udp://opentracker.io:6969/announce", "udp://open.free-tracker.ga:6969/announce", "udp://ns-1.x-fins.com:6969/announce", "udp://leet-tracker.moe:1337/announce", "udp://isk.richardsw.club:6969/announce", "udp://discord.heihachi.pw:6969/announce", "http://www.torrentsnipe.info:2701/announce", "http://www.genesis-sp.org:2710/announce"];

function eg(e, t) {
  const r = encodeURIComponent(t),
    a = Z8.map(u => `&tr=${encodeURIComponent(u)}`).join("");
  return `magnet:?xt=urn:btih:${e}&dn=${r}${a}`
}

function tg(e) {
  return `https://savingshub.online/api/fetchHls?magnet=${encodeURIComponent(e)}`
}

function rg(e) {
  const t = {
    "4k": [],
    "1080p": [],
    "720p": [],
    "480p": []
  };
  return e.forEach(r => {
    const a = r.name.toLowerCase();
    a.includes("4k") ? t["4k"].push(r) : a.includes("1080p") ? t["1080p"].push(r) : a.includes("720p") ? t["720p"].push(r) : a.includes("480p") && t["480p"].push(r)
  }), t
}

function ag(e, t) {
  return e.sort((r, a) => {
    var u, n;
    const s = parseInt(((u = r.title.match(/👤 (\d+) /)) == null ? void 0 : u[1]) || "0", 10);
    return parseInt(((n = a.title.match(/👤 (\d+) /)) == null ? void 0 : n[1]) || "0", 10) - s
  }).slice(0, t)
}
async function Jo(e) {
  const t = e.media.type === "movie" ? `movie/${e.media.imdbId}.json` : `series/${e.media.imdbId}:${e.media.season.number}:${e.media.episode.number}.json`,
    r = await e.fetcher(`https://torrentio.strem.fun/providers=yts,eztv,rarbg,1337x,thepiratebay,kickasstorrents,torrentgalaxy,magnetdl,horriblesubs,nyaasi,tokyotosho,anidex/stream/${t}`).then(s => typeof s == "string" ? JSON.parse(s) : s);
  e.progress(50);
  const a = rg(r.streams),
    u = [];
  return (await Promise.all(Object.entries(a).map(async ([s, i]) => {
    const [o] = ag(i, 1);
    if (!o) return null;
    try {
      const c = eg(o.infoHash, o.name),
        l = tg(c),
        h = await e.fetcher(l),
        f = typeof h == "string" ? JSON.parse(h) : h;
      if (!(f != null && f.m3u8Link)) throw new Error("No m3u8 link in response");
      return {
        quality: s,
        url: f.m3u8Link
      }
    } catch (c) {
      return console.error(`Failed to fetch ${s}:`, c), null
    }
  }))).forEach(s => {
    s != null && s.url && u.push({
      embedId: `webtor-${s.quality.replace("p","")}`,
      url: s.url
    })
  }), e.progress(90), {
    embeds: u
  }
}
const ug = ee({
    id: "webtor",
    name: "Webtor",
    rank: 2,
    disabled: !1,
    flags: [k.CORS_ALLOWED],
    scrapeMovie: Jo,
    scrapeShow: Jo
  }),
  gr = "https://wecima.tube";
async function Zo(e) {
  const t = await e.proxiedFetcher(`/search/${encodeURIComponent(e.media.title)}/`, {
      baseUrl: gr
    }),
    a = be(t)(".Grid--WecimaPosts .GridItem a").first();
  if (!a.length) throw new S("No results found");
  const u = a.attr("href");
  if (!u) throw new S("No content URL found");
  e.progress(30);
  const n = await e.proxiedFetcher(u, {
      baseUrl: gr
    }),
    s = be(n);
  let i;
  if (e.media.type === "movie") i = s('meta[itemprop="embedURL"]').attr("content");
  else {
    const h = s(".List--Seasons--Episodes a");
    let f;
    for (const x of h)
      if (s(x).text().trim().includes(`موسم ${e.media.season}`)) {
        f = s(x).attr("href");
        break
      } if (!f) throw new S(`Season ${e.media.season} not found`);
    const m = await e.proxiedFetcher(f, {
        baseUrl: gr
      }),
      p = be(m),
      b = p(".Episodes--Seasons--Episodes a");
    for (const x of b)
      if (p(x).find("episodetitle").text().trim() === `الحلقة ${e.media.episode}`) {
        const E = p(x).attr("href");
        if (E) {
          const A = await e.proxiedFetcher(E, {
            baseUrl: gr
          });
          i = be(A)('meta[itemprop="embedURL"]').attr("content")
        }
        break
      }
  }
  if (!i) throw new S("No embed URL found");
  e.progress(60);
  const o = await e.proxiedFetcher(i),
    l = be(o)('source[type="video/mp4"]').attr("src");
  if (!l) throw new S("No video source found");
  return e.progress(90), {
    embeds: [],
    stream: [{
      id: "primary",
      type: "file",
      flags: [],
      headers: {
        referer: gr
      },
      qualities: {
        unknown: {
          type: "mp4",
          url: l
        }
      },
      captions: []
    }]
  }
}
const ng = ee({
  id: "wecima",
  name: "Wecima (Arabic)",
  rank: 97,
  flags: [],
  scrapeMovie: Zo,
  scrapeShow: Zo
});
async function ec(e) {
  const t = {
    type: e.media.type,
    title: e.media.title,
    tmdbId: e.media.tmdbId,
    ...e.media.type === "show" && {
      season: e.media.season.number,
      episode: e.media.episode.number
    }
  };
  return {
    embeds: [{
      embedId: "xprime-fox",
      url: JSON.stringify(t)
    }, {
      embedId: "xprime-apollo",
      url: JSON.stringify(t)
    }, {
      embedId: "xprime-streambox",
      url: JSON.stringify(t)
    }, {
      embedId: "xprime-marant",
      url: JSON.stringify(t)
    }]
  }
}
const sg = ee({
  id: "xprimetv",
  name: "xprime.tv",
  rank: 250,
  disabled: !0,
  flags: [k.CORS_ALLOWED],
  scrapeMovie: ec,
  scrapeShow: ec
});

function Pl() {
  return [qE, G8, $8, J8, n4, _l, $E, o4, KE, QE, l4, Cl, s4, ug, vl, k8, j8, q8, W8, yl, X8, v8, K8, z8, N8, ml, D8, fl, nl, w8, sl, g8, sg, y8, a4, O8, L8, Tl, tl, il, dl, ol, cl, xl, I8, gl, pl, ul, bl, ll, El, ng, T8, i4, p4, Al, hl, al, rl]
}

function ig() {
  return [Il, G4, wl, Ol, Dl, CE, V4, W4, Ll, n0, Rl, E4, g4, A4, T4, v4, kE, H4, $4, X4, Q4, J4, Z4, e8, t8, r8, a8, u8, n8, s8, i8, o8, h8, m8, p8, b8, c8, F4, P4, Qd, Jd, Zd, el, N4, w4, I4, D4, SE, NE, wE, IE, ...Yx, Kd, Qx, Jx]
}

function og() {
  return Pl().filter(e => !e.disabled && !e.externalSource)
}

function tc() {
  return Pl().filter(e => e.externalSource && !e.disabled)
}

function cg() {
  return ig().filter(e => !e.disabled)
}

function en(e, t) {
  const r = new Map;
  for (const a of e) {
    const u = t(a);
    r.has(u) || r.set(u, []), r.get(u).push(a)
  }
  return Array.from(r.entries()).filter(([a, u]) => u.length > 1).map(([a, u]) => ({
    key: a,
    items: u
  }))
}

function tn(e, t, r) {
  const a = t.map(({
    key: u,
    items: n
  }) => {
    const s = n.map(i => i.name || i.id).join(", ");
    return `  ${r} ${u}: ${s}`
  }).join(`
`);
  return `${e} have duplicate ${r}s:
${a}`
}

function dg(e, t) {
  const r = t.sources.filter(o => !(o != null && o.disabled)),
    a = t.embeds.filter(o => !(o != null && o.disabled)),
    u = [...r, ...a],
    n = en(u, o => o.id);
  if (n.length > 0) throw new Error(tn("Sources/embeds", n, "ID"));
  const s = en(r, o => o.rank);
  if (s.length > 0) throw new Error(tn("Sources", s, "rank"));
  const i = en(a, o => o.rank);
  if (i.length > 0) throw new Error(tn("Embeds", i, "rank"));
  return {
    sources: r.filter(o => Br(e, o.flags)),
    embeds: a
  }
}

function qg(e) {
  var t;
  const r = Ox(e.proxyStreams ? "any" : e.target, e.consistentIpForRequests ?? !1, e.proxyStreams),
    a = [...og()];
  e.externalSources === "all" ? a.push(...tc()) : (t = e.externalSources) == null || t.forEach(n => {
    const s = tc().find(i => i.id === n);
    s && a.push(s)
  });
  const u = dg(r, {
    embeds: cg(),
    sources: a
  });
  return _E({
    embeds: u.embeds,
    sources: u.sources,
    features: r,
    fetcher: e.fetcher,
    proxiedFetcher: e.proxiedFetcher,
    proxyStreams: e.proxyStreams
  })
}
const lg = () => {
  try {
    return require("react-native"), !0
  } catch {
    return !1
  }
};

function fg(e) {
  return e === void 0 || typeof e == "string" || e instanceof URLSearchParams || e instanceof Sx ? e instanceof URLSearchParams && lg() ? {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: e.toString()
  } : {
    headers: {},
    body: e
  } : {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(e)
  }
}

function hg(e, t) {
  const r = new Headers;
  return e.forEach(a => {
    var u;
    const n = a.toLowerCase(),
      s = t.headers.get(n),
      o = ((u = t.extraHeaders) == null ? void 0 : u.get(n)) ?? s;
    o && r.set(n, o)
  }), r
}

function mg(e) {
  return async (r, a) => {
    var u;
    const n = Gd(r, a),
      s = fg(a.body),
      i = new Yd,
      o = 15e3,
      c = setTimeout(() => i.abort(), o);
    try {
      const l = await e(n, {
        method: a.method,
        headers: {
          ...s.headers,
          ...a.headers
        },
        body: s.body,
        credentials: a.credentials,
        signal: i.signal
      });
      clearTimeout(c);
      let h;
      return ((u = l.headers.get("content-type")) == null ? void 0 : u.includes("application/json")) ? h = await l.json() : h = await l.text(), {
        body: h,
        finalUrl: l.extraUrl ?? l.url,
        headers: hg(a.readHeaders, l),
        statusCode: l.status
      }
    } catch (l) {
      throw l.name === "AbortError" ? new Error(`Fetch request to ${n} timed out after ${o}ms`) : l
    }
  }
}
const rc = {
    cookie: "X-Cookie",
    referer: "X-Referer",
    origin: "X-Origin",
    "user-agent": "X-User-Agent",
    "x-real-ip": "X-X-Real-Ip"
  },
  pg = {
    "x-set-cookie": "Set-Cookie"
  };

function Wg(e, t) {
  return async (a, u) => {
    const n = mg(async (o, c) => {
        const l = new Yd,
          h = 15e3,
          f = setTimeout(() => l.abort(), h);
        try {
          const m = await t(o, {
            method: (c == null ? void 0 : c.method) || "GET",
            headers: (c == null ? void 0 : c.headers) || {},
            body: c == null ? void 0 : c.body,
            credentials: c == null ? void 0 : c.credentials,
            signal: l.signal
          });
          return clearTimeout(f), m.extraHeaders = new Headers, Object.entries(pg).forEach(p => {
            var b;
            const x = m.headers.get(p[0]);
            x && ((b = m.extraHeaders) == null || b.set(p[1].toLowerCase(), x))
          }), m.extraUrl = m.headers.get("X-Final-Destination") ?? m.url, m
        } catch (m) {
          throw m.name === "AbortError" ? new Error(`Fetch request to ${o} timed out after ${h}ms`) : m
        }
      }),
      s = Gd(a, u),
      i = Object.entries(u.headers).map(o => {
        const c = o[0].toLowerCase();
        return rc[c] ? [rc[c], o[1]] : o
      });
    return n(e, {
      ...u,
      query: {
        destination: s
      },
      headers: Object.fromEntries(i),
      baseUrl: void 0
    })
  }
}
export {
  P0 as _, Ig as a, _g as b, Ag as c, Cg as d, Ng as e, yg as f, Tg as g, Sg as h, Eg as i, Og as j, Rg as k, wg as l, Lg as m, Dg as n, vg as o, e1 as p, Bg as q, xg as r, gg as s, kg as t, qg as u, Wg as v, $g as w, mg as x
};
