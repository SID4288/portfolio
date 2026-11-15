/* =========================================================================
   Siddhanta Adhikari — portfolio
   Reveals · navigation · cursor · canvas field · nine project visuals
   ========================================================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var SVGNS = 'http://www.w3.org/2000/svg';

  /* ---------------------------------------------------------------- utils */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function rgba(color, a) {
    color = String(color || '').trim();
    if (color.charAt(0) === '#') {
      var hex = color.slice(1);
      if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      var n = parseInt(hex, 16);
      if (isNaN(n)) return color;
      return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
    }
    var m = color.match(/[\d.]+/g);
    if (m && m.length >= 3) return 'rgba(' + m[0] + ',' + m[1] + ',' + m[2] + ',' + a + ')';
    return color;
  }

  function paletteOf(el) {
    var cs = getComputedStyle(el);
    return {
      ink: (cs.getPropertyValue('--ink') || '#000').trim(),
      acc: (cs.getPropertyValue('--acc') || '#000').trim(),
      dim: (cs.getPropertyValue('--ink-2') || '#000').trim(),
      bg: (cs.getPropertyValue('--bg') || '#fff').trim()
    };
  }

  /* ============================================================ reveals === */
  var revealIO = null;
  function initReveals() {
    if (!('IntersectionObserver' in window)) return;
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    $$('[data-reveal], .reveal').forEach(function (el) {
      if (reduce) return;
      var r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.92) {
        el.classList.add('will-reveal');
        revealIO.observe(el);
      }
    });
  }

  /* ====================================================== word statement == */
  function initWords() {
    $$('[data-words]').forEach(function (el) {
      var words = (el.textContent || '').trim().split(/\s+/);
      el.textContent = '';
      el.setAttribute('aria-label', words.join(' '));
      words.forEach(function (w, i) {
        var s = document.createElement('span');
        s.className = 'w';
        s.style.setProperty('--wi', i);
        s.textContent = w;
        el.appendChild(s);
        el.appendChild(document.createTextNode(' '));
      });
      if (reduce || !('IntersectionObserver' in window)) { el.classList.add('on'); return; }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { el.classList.add('on'); io.disconnect(); }
        });
      }, { threshold: 0.3 });
      io.observe(el);
    });
  }

  /* ============================================================ nav ====== */
  function initNav() {
    var nav = $('#nav');
    var toggle = $('#nav-toggle');
    var menu = $('#menu');
    if (!nav) return;
    var sections = $$('[data-nav]');
    var links = $$('[data-navlink]');
    var ticking = false;

    function sample() {
      if (menu && !menu.hidden) { nav.setAttribute('data-tone', 'dark'); return; }
      var y = 42, cur = sections[0];
      for (var i = 0; i < sections.length; i++) {
        var r = sections[i].getBoundingClientRect();
        if (r.top <= y && r.bottom > y) { cur = sections[i]; break; }
      }
      if (!cur) return;
      nav.setAttribute('data-tone', cur.getAttribute('data-nav') || 'light');
      var id = cur.id;
      links.forEach(function (l) {
        if (id && l.getAttribute('href') === '#' + id) l.setAttribute('aria-current', 'true');
        else l.removeAttribute('aria-current');
      });
    }

    function progress() {
      var fill = $('#progress-fill');
      if (!fill) return;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      fill.style.width = (max > 0 ? clamp(window.scrollY / max, 0, 1) * 100 : 0) + '%';
    }

    function parallax() {
      if (reduce) return;
      $$('.secnum').forEach(function (n) {
        var host = n.parentElement;
        if (!host) return;
        var r = host.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        var p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        n.style.transform = 'translateY(' + ((p - 0.5) * -70).toFixed(1) + 'px)';
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { sample(); progress(); parallax(); ticking = false; });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    /* ---- mobile menu ---- */
    if (toggle && menu) {
      var closeTimer = 0;
      function setOpen(open) {
        toggle.setAttribute('aria-expanded', String(open));
        $('.nav__toggle-label', toggle).textContent = open ? 'Close' : 'Menu';
        if (open) {
          clearTimeout(closeTimer);
          menu.hidden = false;
          document.body.style.overflow = 'hidden';
          requestAnimationFrame(function () { menu.classList.add('open'); });
        } else {
          menu.classList.remove('open');
          document.body.style.overflow = '';
          closeTimer = setTimeout(function () { menu.hidden = true; }, 420);
        }
        onScroll();
      }
      toggle.addEventListener('click', function () {
        setOpen(toggle.getAttribute('aria-expanded') !== 'true');
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
      });
      menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
      });
    }
  }

  /* ==================================================== smooth anchors ==== */
  function initAnchors() {
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (!id || id.length < 2) return;
        var el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        if (history.replaceState) history.replaceState(null, '', id);
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
        el.addEventListener('blur', function once() { el.removeAttribute('tabindex'); el.removeEventListener('blur', once); });
      });
    });
  }

  /* ============================================================ ticker ==== */
  function initTicker() {
    var tk = $('[data-ticker]');
    if (!tk) return;
    var btn = $('.ticker__btn', tk);
    if (btn) {
      btn.addEventListener('click', function () {
        var paused = tk.classList.toggle('paused');
        btn.setAttribute('aria-pressed', String(paused));
        btn.setAttribute('aria-label', paused ? 'Play the ticker' : 'Pause the ticker');
      });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { tk.classList.toggle('off', !e.isIntersecting); });
      }, { threshold: 0 }).observe(tk);
    }
  }

  /* ============================================================ cursor ==== */
  function initCursor() {
    var el = $('#cursor');
    if (!el || reduce || !fine) return;
    var tx = -100, ty = -100, cx = -100, cy = -100;
    document.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY; el.classList.add('on');
    }, { passive: true });
    document.addEventListener('pointerover', function (e) {
      el.classList.toggle('hot', !!(e.target.closest && e.target.closest('a, button, .group__list li')));
    }, { passive: true });
    document.addEventListener('pointerleave', function () { el.classList.remove('on'); });
    (function loop() {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      el.style.setProperty('--x', cx.toFixed(1) + 'px');
      el.style.setProperty('--y', cy.toFixed(1) + 'px');
      requestAnimationFrame(loop);
    })();
  }

  /* ======================================================= liquid type ==== */
  function initLiquid() {
    var h1 = $('[data-liquid]');
    if (!h1 || reduce || !fine) return;
    var svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
    svg.innerHTML =
      '<filter id="ly-liquid" x="-15%" y="-25%" width="130%" height="150%" color-interpolation-filters="sRGB">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.005 0.014" numOctaves="2" seed="7" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter>';
    document.body.appendChild(svg);
    var disp = svg.querySelector('feDisplacementMap');
    if (!disp) return;

    var scale = 0, target = 0, raf = 0, idle = 0;
    function tick() {
      scale += (target - scale) * 0.14;
      disp.setAttribute('scale', scale.toFixed(2));
      if (target === 0 && scale < 0.15) {
        scale = 0; disp.setAttribute('scale', '0');
        h1.style.filter = ''; raf = 0; return;
      }
      raf = requestAnimationFrame(tick);
    }
    function kick() {
      h1.style.filter = 'url(#ly-liquid)';
      if (!raf) raf = requestAnimationFrame(tick);
    }
    h1.addEventListener('pointermove', function (e) {
      var r = h1.getBoundingClientRect();
      var d = Math.abs(e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      target = clamp(15 * (1 - d * 0.55), 5, 15);
      kick();
      clearTimeout(idle);
      idle = setTimeout(function () { target = 0; kick(); }, 620);
    });
    h1.addEventListener('pointerleave', function () { target = 0; clearTimeout(idle); kick(); });
  }

  /* ==================================================== hero field ======== */
  function initField() {
    var cv = $('#field');
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    var w = 0, h = 0, dpr = 1, pts = [], raf = 0, live = false, t = 0, last = 0;
    var mx = -9999, my = -9999, rx = -9999, ry = -9999, hasPointer = false;
    var C = paletteOf(cv);

    function build() {
      var count = clamp(Math.round((w * h) / 8600), 54, 210);
      pts = [];
      for (var i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
          big: Math.random() < 0.16, ph: Math.random() * 6.283
        });
      }
    }
    function resize() {
      var r = cv.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      C = paletteOf(cv);
      build();
      draw();
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);

      /* calibration grid */
      var step = 72;
      ctx.fillStyle = rgba(C.ink, 0.1);
      for (var gx = step * 0.5; gx < w; gx += step) {
        for (var gy = step * 0.5; gy < h; gy += step) ctx.fillRect(gx - 1, gy - 1, 2, 2);
      }

      /* links */
      var link = Math.min(132, Math.max(96, w * 0.1));
      for (var i = 0; i < pts.length; i++) {
        var a = pts[i];
        for (var j = i + 1; j < pts.length; j++) {
          var b = pts[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          if (dx > link || dx < -link || dy > link || dy < -link) continue;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d > link) continue;
          ctx.strokeStyle = rgba(C.ink, (1 - d / link) * 0.24);
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      /* points */
      for (var k = 0; k < pts.length; k++) {
        var p = pts[k];
        var near = hasPointer ? Math.hypot(p.x - rx, p.y - ry) : 1e9;
        var hot = near < 130;
        var s = p.big ? 4 : 2.4;
        if (hot) { s += (1 - near / 130) * 4; }
        ctx.fillStyle = hot ? C.acc : rgba(C.ink, 0.62);
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        if (p.big && !hot) {
          ctx.strokeStyle = rgba(C.ink, 0.35);
          ctx.lineWidth = 1;
          ctx.strokeRect(p.x - 6, p.y - 6, 12, 12);
        }
      }

      /* reticle */
      if (hasPointer) {
        var b2 = 34 + Math.sin(t * 2.4) * 2;
        ctx.strokeStyle = C.acc; ctx.lineWidth = 1.5;
        var c2 = 9;
        ctx.beginPath();
        ctx.moveTo(rx - b2, ry - b2 + c2); ctx.lineTo(rx - b2, ry - b2); ctx.lineTo(rx - b2 + c2, ry - b2);
        ctx.moveTo(rx + b2 - c2, ry - b2); ctx.lineTo(rx + b2, ry - b2); ctx.lineTo(rx + b2, ry - b2 + c2);
        ctx.moveTo(rx + b2, ry + b2 - c2); ctx.lineTo(rx + b2, ry + b2); ctx.lineTo(rx + b2 - c2, ry + b2);
        ctx.moveTo(rx - b2 + c2, ry + b2); ctx.lineTo(rx - b2, ry + b2); ctx.lineTo(rx - b2, ry + b2 - c2);
        ctx.stroke();
        ctx.fillStyle = C.acc;
        ctx.fillRect(rx - 1.5, ry - 1.5, 3, 3);
      }
    }
    function step(now) {
      raf = 0;
      if (!live) return;
      if (now - last < 24) { raf = requestAnimationFrame(step); return; }
      last = now; t += 0.03;
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < -12) p.x = w + 12; else if (p.x > w + 12) p.x = -12;
        if (p.y < -12) p.y = h + 12; else if (p.y > h + 12) p.y = -12;
        if (hasPointer) {
          var dx = p.x - rx, dy = p.y - ry, d2 = dx * dx + dy * dy;
          if (d2 < 15000 && d2 > 1) {
            var f = (1 - d2 / 15000) * 0.5, d = Math.sqrt(d2);
            p.x += (dx / d) * f; p.y += (dy / d) * f;
          }
        }
      }
      draw();
      raf = requestAnimationFrame(step);
    }
    function start() { if (!live) { live = true; last = 0; raf = requestAnimationFrame(step); } }
    function stop() { live = false; if (raf) cancelAnimationFrame(raf); raf = 0; }

    var host = cv.parentElement;
    if (host) {
      host.addEventListener('pointermove', function (e) {
        var r = cv.getBoundingClientRect();
        mx = e.clientX - r.left; my = e.clientY - r.top;
        if (!hasPointer) { rx = mx; ry = my; hasPointer = true; }
      }, { passive: true });
      host.addEventListener('pointerleave', function () { hasPointer = false; mx = -9999; my = -9999; }, { passive: true });
    }

    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(cv);
    window.addEventListener('resize', resize);
    resize();

    if (reduce) { draw(); return; }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { e.isIntersecting ? start() : stop(); });
      }, { threshold: 0 }).observe(cv);
    } else start();
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  }

  /* ================================================== project visuals ===== */
  function pointAt(P, p) {
    var segs = [], total = 0, i;
    for (i = 1; i < P.length; i++) {
      var d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
      segs.push(d); total += d;
    }
    var want = p * total, acc = 0;
    for (i = 0; i < segs.length; i++) {
      if (acc + segs[i] >= want) {
        var u = segs[i] ? (want - acc) / segs[i] : 0;
        return [P[i][0] + (P[i + 1][0] - P[i][0]) * u, P[i][1] + (P[i + 1][1] - P[i][1]) * u];
      }
      acc += segs[i];
    }
    return P[P.length - 1];
  }

  var R = {
    /* 01 · Aquila — radar backscatter and a thresholded water body */
    sar: function (c, w, h, t, C) {
      var rows = Math.max(4, Math.ceil(h / 7)), r, i;
      for (r = 0; r < rows; r++) {
        var v = 0.5 + 0.5 * Math.sin(r * 0.63 + t * 0.5) * Math.cos(r * 0.21 - t * 0.27);
        c.fillStyle = rgba(C.ink, 0.04 + v * 0.13);
        c.fillRect(0, r * (h / rows), w, h / rows + 1);
      }
      c.beginPath(); c.moveTo(0, h + 2);
      for (i = 0; i <= w; i += 5) {
        var y = h * 0.56 + Math.sin(i * 0.016 + t * 0.5) * h * 0.11 + Math.sin(i * 0.043 - t * 0.31) * h * 0.055;
        c.lineTo(i, y);
      }
      c.lineTo(w, h + 2); c.closePath();
      c.fillStyle = rgba(C.acc, 0.48); c.fill();
      c.lineWidth = 1.5; c.strokeStyle = C.acc; c.stroke();
      var sx = ((t * 0.11) % 1) * w;
      c.fillStyle = rgba(C.ink, 0.1); c.fillRect(sx - 26, 0, 26, h);
      c.fillStyle = rgba(C.ink, 0.5); c.fillRect(sx, 0, 1.5, h);
    },

    /* 02 · SFaceX — landmarks, detection bracket, liveness meter */
    face: function (c, w, h, t, C) {
      var cx = w / 2, cy = h * 0.45;
      var rx = Math.min(w * 0.22, h * 0.34), ry = Math.min(h * 0.34, w * 0.28);
      var bw = rx * 2.7, bh = ry * 2.7, k = Math.min(bw, bh) * 0.17;
      var x0 = cx - bw / 2, y0 = cy - bh / 2, x1 = cx + bw / 2, y1 = cy + bh / 2;
      c.strokeStyle = rgba(C.ink, 0.5); c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(x0, y0 + k); c.lineTo(x0, y0); c.lineTo(x0 + k, y0);
      c.moveTo(x1 - k, y0); c.lineTo(x1, y0); c.lineTo(x1, y0 + k);
      c.moveTo(x1, y1 - k); c.lineTo(x1, y1); c.lineTo(x1 - k, y1);
      c.moveTo(x0 + k, y1); c.lineTo(x0, y1); c.lineTo(x0, y1 - k);
      c.stroke();
      var N = 36, i;
      c.beginPath();
      for (i = 0; i <= N; i++) {
        var a = (i / N) * Math.PI * 2;
        var wob = 1 + Math.sin(t * 1.3 + i * 0.6) * 0.018;
        var px = cx + Math.cos(a) * rx * wob, py = cy + Math.sin(a) * ry * wob;
        i ? c.lineTo(px, py) : c.moveTo(px, py);
      }
      c.strokeStyle = rgba(C.ink, 0.35); c.lineWidth = 1; c.stroke();
      for (i = 0; i < N; i++) {
        var a2 = (i / N) * Math.PI * 2, w2 = 1 + Math.sin(t * 1.3 + i * 0.6) * 0.018;
        var qx = cx + Math.cos(a2) * rx * w2, qy = cy + Math.sin(a2) * ry * w2;
        c.fillStyle = i % 6 === 0 ? C.acc : rgba(C.ink, 0.8);
        var s = i % 6 === 0 ? 4 : 2.6;
        c.fillRect(qx - s / 2, qy - s / 2, s, s);
      }
      c.fillStyle = rgba(C.ink, 0.75);
      c.fillRect(cx - rx * 0.44, cy - ry * 0.2, rx * 0.24, 2.4);
      c.fillRect(cx + rx * 0.2, cy - ry * 0.2, rx * 0.24, 2.4);
      c.fillRect(cx - rx * 0.3, cy + ry * 0.36, rx * 0.6, 2.4);
      var barW = Math.min(w * 0.5, 220), bx = (w - barW) / 2, by = h - 18;
      c.fillStyle = rgba(C.ink, 0.18); c.fillRect(bx, by, barW, 4);
      c.fillStyle = C.acc;
      c.fillRect(bx, by, barW * (0.12 + 0.86 * (Math.sin(t * 0.85) * 0.5 + 0.5)), 4);
    },

    /* 03 · StyleMe — landmark skeleton with a tracking box */
    body: function (c, w, h, t, C) {
      var pts = [[0, -4.6], [-1.5, -3.4], [1.5, -3.4], [-2.5, -1.9], [2.5, -1.9], [-2.7, -0.3], [2.7, -0.3],
                 [-0.9, -0.4], [0.9, -0.4], [-1.1, 1.9], [1.1, 1.9], [-1.2, 3.7], [1.2, 3.7]];
      var bones = [[0, 1], [0, 2], [1, 3], [3, 5], [2, 4], [4, 6], [1, 2], [7, 8], [7, 9], [9, 11], [8, 10], [10, 12]];
      var s = Math.min(w / 7.4, h / 9.4);
      var ang = Math.sin(t * 0.8) * 0.06, ca = Math.cos(ang), sa = Math.sin(ang);
      var ox = w / 2 + Math.sin(t * 0.55) * w * 0.03, oy = h / 2 + Math.sin(t * 0.7) * 3;
      var P = pts.map(function (p) {
        var x = p[0] * ca - p[1] * sa, y = p[0] * sa + p[1] * ca;
        return [ox + x * s, oy + y * s];
      });
      var i;
      c.strokeStyle = rgba(C.ink, 0.75); c.lineWidth = 2;
      c.beginPath();
      bones.forEach(function (b) { c.moveTo(P[b[0]][0], P[b[0]][1]); c.lineTo(P[b[1]][0], P[b[1]][1]); });
      c.stroke();
      for (i = 0; i < P.length; i++) {
        c.fillStyle = i === 0 ? C.acc : rgba(C.ink, 0.95);
        c.fillRect(P[i][0] - 3, P[i][1] - 3, 6, 6);
      }
      var bx = P[0][0] - s * 3.4, by = P[0][1] - s * 1.4;
      var bw = s * 6.8, bh = s * 9.4;
      c.setLineDash([7, 6]);
      c.strokeStyle = rgba(C.acc, 0.95); c.lineWidth = 1.5;
      c.strokeRect(bx, by, bw, bh);
      c.setLineDash([]);
      c.fillStyle = C.acc;
      c.fillRect(bx - 2, by - 2, 10, 3); c.fillRect(bx - 2, by - 2, 3, 10);
      c.fillRect(bx + bw - 8, by + bh - 1, 10, 3); c.fillRect(bx + bw - 1, by + bh - 8, 3, 10);
    },

    /* 04 · CookeryKaa — parameter matching across two schemas */
    match: function (c, w, h, t, C) {
      var n = 5, padX = Math.min(w * 0.13, 58), padY = h * 0.15;
      var lx = padX, rx = w - padX;
      var ys = function (i) { return padY + (h - 2 * padY) * (i / (n - 1)); };
      var active = Math.floor(t * 0.7) % n, hit = (active + 2) % n, i, j;
      for (i = 0; i < n; i++) for (j = 0; j < n; j++) {
        var on = (i === active && j === hit);
        if (!on && (i + j) % 2) continue;
        c.beginPath(); c.moveTo(lx, ys(i));
        c.bezierCurveTo(w * 0.4, ys(i), w * 0.6, ys(j), rx, ys(j));
        c.strokeStyle = on ? C.acc : rgba(C.ink, 0.16);
        c.lineWidth = on ? 2.2 : 1;
        c.stroke();
      }
      for (i = 0; i < n; i++) {
        c.fillStyle = i === active ? C.acc : rgba(C.ink, 0.85);
        c.fillRect(lx - 7, ys(i) - 7, 14, 14);
        c.fillStyle = i === hit ? C.acc : rgba(C.ink, 0.85);
        c.fillRect(rx - 7, ys(i) - 7, 14, 14);
      }
      c.fillStyle = rgba(C.ink, 0.5);
      c.fillRect(lx - 7, h - 12, (rx - lx) * 0.34, 2);
      c.fillStyle = C.acc;
      c.fillRect(lx - 7, h - 12, (rx - lx) * 0.34 * (0.2 + 0.8 * (Math.sin(t * 0.9) * 0.5 + 0.5)), 2);
    },

    /* 05 · Cadence — telemetry bars and a trace */
    metrics: function (c, w, h, t, C) {
      var n = 24, bw = w / n, i;
      for (i = 0; i < n; i++) {
        var v = (0.22 + 0.5 * Math.abs(Math.sin(i * 0.5 + t * 1.05))) * (0.45 + 0.55 * Math.abs(Math.cos(i * 0.19 - t * 0.4)));
        var bh = v * (h * 0.6);
        c.fillStyle = rgba(C.ink, 0.24 + v * 0.4);
        c.fillRect(i * bw + 1, h - bh - 16, Math.max(1, bw - 2), bh);
      }
      c.beginPath();
      for (i = 0; i <= w; i += 4) {
        var y = h * 0.3 + Math.sin(i * 0.03 + t * 1.5) * h * 0.1 + Math.sin(i * 0.011 - t * 0.75) * h * 0.06;
        i ? c.lineTo(i, y) : c.moveTo(i, y);
      }
      c.strokeStyle = C.acc; c.lineWidth = 2; c.stroke();
      c.fillStyle = rgba(C.ink, 0.35); c.fillRect(0, h - 15, w, 1);
    },

    /* 06 · Zero Trust Sandbox — isolation layers and rejected probes */
    sandbox: function (c, w, h, t, C) {
      var cx = w / 2, cy = h / 2, m = Math.min(w, h);
      var rings = [0.46, 0.31, 0.17], i;
      for (i = 0; i < rings.length; i++) {
        var s = m * rings[i];
        c.strokeStyle = rgba(C.ink, 0.26 + i * 0.16); c.lineWidth = 1.5;
        if (i === 1) c.setLineDash([6, 5]);
        c.strokeRect(cx - s, cy - s * 0.76, s * 2, s * 1.52);
        c.setLineDash([]);
      }
      var si = m * 0.17;
      var px = cx + Math.sin(t * 1.25) * si * 0.5, py = cy + Math.cos(t * 1.65) * si * 0.38;
      c.fillStyle = C.acc; c.fillRect(px - 4, py - 4, 8, 8);
      for (i = 0; i < 3; i++) {
        var a = t * 0.75 + i * 2.094, rad = m * 0.47;
        var x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad * 0.76;
        c.strokeStyle = rgba(C.acc, 0.85); c.lineWidth = 1.5;
        c.beginPath();
        c.moveTo(x - 5, y - 5); c.lineTo(x + 5, y + 5);
        c.moveTo(x + 5, y - 5); c.lineTo(x - 5, y + 5);
        c.stroke();
      }
    },

    /* 07 · Aanubadh — tokens moving between two languages */
    tokens: function (c, w, h, t, C) {
      var n = 6, padY = h * 0.14;
      var ys = function (i) { return padY + (h - 2 * padY) * (i / (n - 1)); };
      var lx = Math.min(w * 0.17, 66), rx = w - Math.min(w * 0.17, 66), i;
      for (i = 0; i < n; i++) {
        c.fillStyle = rgba(C.ink, 0.8); c.fillRect(lx - 16, ys(i) - 9, 32, 18);
        c.fillStyle = rgba(C.ink, 0.8); c.fillRect(rx - 16, ys(i) - 9, 32, 18);
      }
      for (var k = 0; k < 3; k++) {
        var p = ((t * 0.3 + k / 3) % 1);
        var i0 = (k * 2) % n, j0 = (k * 2 + 3) % n;
        var e = p * p * (3 - 2 * p);
        var x = lx + (rx - lx) * p, y = ys(i0) + (ys(j0) - ys(i0)) * e;
        c.fillStyle = C.acc; c.fillRect(x - 9, y - 7, 18, 14);
        c.strokeStyle = rgba(C.acc, 0.4); c.lineWidth = 1;
        c.strokeRect(x - 13, y - 11, 26, 22);
      }
    },

    /* 08 · Flow — grid, obstacles, A* route, agents */
    path: function (c, w, h, t, C) {
      var g = 8, cw = w / g, ch = h / g, i;
      c.strokeStyle = rgba(C.ink, 0.16); c.lineWidth = 1;
      for (i = 1; i < g; i++) {
        c.beginPath(); c.moveTo(i * cw, 0); c.lineTo(i * cw, h); c.stroke();
        c.beginPath(); c.moveTo(0, i * ch); c.lineTo(w, i * ch); c.stroke();
      }
      var obs = [[2, 1], [2, 2], [5, 4], [5, 5], [6, 5], [3, 6]];
      c.fillStyle = rgba(C.ink, 0.3);
      obs.forEach(function (o) { c.fillRect(o[0] * cw + 1, o[1] * ch + 1, cw - 2, ch - 2); });
      var P = [[0, 7], [1, 7], [1, 3], [4, 3], [4, 0], [7, 0]].map(function (p) {
        return [p[0] * cw + cw / 2, p[1] * ch + ch / 2];
      });
      c.beginPath(); c.moveTo(P[0][0], P[0][1]);
      for (i = 1; i < P.length; i++) c.quadraticCurveTo(P[i][0], P[i - 1][1], P[i][0], P[i][1]);
      c.strokeStyle = C.acc; c.lineWidth = 2.5; c.stroke();
      for (var k = 0; k < 5; k++) {
        var pos = pointAt(P, (t * 0.14 + k * 0.19) % 1);
        c.fillStyle = rgba(C.ink, 0.95);
        c.beginPath(); c.arc(pos[0], pos[1], 3.4, 0, 6.2832); c.fill();
        c.strokeStyle = rgba(C.acc, 0.9); c.lineWidth = 1.2;
        c.beginPath(); c.arc(pos[0], pos[1], 6.4, 0, 6.2832); c.stroke();
      }
    },

    /* 09 · MemoryPalace — a rotating wireframe room */
    room: function (c, w, h, t, C) {
      var cx = w / 2, cy = h / 2, s = Math.min(w, h) * 0.3;
      var a = t * 0.32, ca = Math.cos(a), sa = Math.sin(a);
      function proj(x, y, z) {
        var X = x * ca - z * sa, Z = x * sa + z * ca;
        var Y = y * 0.9 + 0.16 * Z, d = 3.4 / (3.4 + Z);
        return [cx + X * s * d * 1.5, cy + Y * s * d];
      }
      function box(x0, y0, z0, x1, y1, z1, col, lw) {
        var v = [];
        [x0, x1].forEach(function (X) { [y0, y1].forEach(function (Y) { [z0, z1].forEach(function (Z) { v.push(proj(X, Y, Z)); }); }); });
        var E = [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]];
        c.strokeStyle = col; c.lineWidth = lw;
        c.beginPath();
        E.forEach(function (e) { c.moveTo(v[e[0]][0], v[e[0]][1]); c.lineTo(v[e[1]][0], v[e[1]][1]); });
        c.stroke();
      }
      box(-1, -1, -1, 1, 1, 1, rgba(C.ink, 0.45), 1.3);
      box(-0.75, -0.75, -0.7, -0.15, -0.15, -0.1, rgba(C.acc, 0.95), 1.7);
      box(0.15, -0.9, 0.1, 0.75, -0.3, 0.7, rgba(C.acc, 0.7), 1.5);
      box(-0.45, 0.2, 0.25, 0.5, 0.9, 0.8, rgba(C.ink, 0.85), 1.5);
    }
  };

  function initViz() {
    var items = [];
    $$('canvas[data-viz]').forEach(function (cv) {
      var fn = R[cv.getAttribute('data-viz')];
      if (!fn || !cv.getContext) return;
      var it = { cv: cv, ctx: cv.getContext('2d'), fn: fn, w: 0, h: 0, C: paletteOf(cv), t: Math.random() * 40, vis: false, dirty: true };
      items.push(it);
      function size() {
        var r = cv.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) return;
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        it.w = r.width; it.h = r.height;
        cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
        it.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        it.C = paletteOf(cv);
        it.dirty = true;
        render(it, 0);
      }
      it.size = size;
      if ('ResizeObserver' in window) new ResizeObserver(size).observe(cv);
      else window.addEventListener('resize', size);
      size();
      cv.addEventListener('pointerenter', function () { it.hover = true; });
      cv.addEventListener('pointerleave', function () { it.hover = false; });
    });

    function render(it, dt) {
      if (it.w < 2) return;
      it.t += dt;
      it.ctx.clearRect(0, 0, it.w, it.h);
      try { it.fn(it.ctx, it.w, it.h, it.t, it.C); } catch (err) { /* keep the frame */ }
      it.dirty = false;
    }

    if (!items.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (it) { render(it, 0); });
      window.addEventListener('resize', function () { items.forEach(function (it) { it.size(); }); });
      return;
    }

    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var it = items.filter(function (x) { return x.cv === e.target; })[0];
        if (it) it.vis = e.isIntersecting;
      });
    }, { rootMargin: '120px 0px', threshold: 0 });
    items.forEach(function (it) { io.observe(it.cv); });

    var last = 0;
    (function loop(now) {
      requestAnimationFrame(loop);
      if (document.hidden) return;
      if (now - last < 33) return;
      var dt = last ? Math.min(0.1, (now - last) / 1000) : 0.033;
      last = now;
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        if (!it.vis) continue;
        if (it.hover || it.cv.closest('.proj__frame')) render(it, dt);
        else if (it.dirty) render(it, 0);
      }
    })(0);

    window.addEventListener('resize', function () { items.forEach(function (it) { it.size(); }); });
  }

  /* ============================================================= boot ===== */
  function init() {
    initReveals();
    initWords();
    initNav();
    initAnchors();
    initTicker();
    initCursor();
    initLiquid();
    initField();
    initViz();
  }

  try {
    init();
    window.__ready = true;
  } catch (err) {
    document.documentElement.classList.add('reveal-all');
    if (window.console) console.error(err);
  }
})();
