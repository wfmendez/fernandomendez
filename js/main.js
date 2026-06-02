/* ============================================================
   PORTFOLIO — main.js
   Three.js particles + WebGL scenes + GSAP-style interactions
============================================================ */

'use strict';

// ─── UTILITIES ───────────────────────────────────────────────
const qs  = (s, root = document) => root.querySelector(s);
const qsa = (s, root = document) => [...root.querySelectorAll(s)];
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

// ─── ENVIRONMENT FLAGS ───────────────────────────────────────
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

// Pause heavy rendering while the tab is hidden (saves battery / GPU).
let pageVisible = !document.hidden;
document.addEventListener('visibilitychange', () => { pageVisible = !document.hidden; });

// Returns a live { on } flag tracking whether `el` is on screen, so WebGL
// loops can skip rendering work while the user has scrolled past them.
function onScreenFlag(el) {
  const state = { on: true };
  if (!el || !('IntersectionObserver' in window)) return state;
  new IntersectionObserver(entries => {
    entries.forEach(e => { state.on = e.isIntersecting; });
  }, { rootMargin: '120px' }).observe(el);
  return state;
}

// ─── PRELOADER ───────────────────────────────────────────────
(function initPreloader() {
  const loader = qs('#preloader');
  const fill   = qs('.preloader-fill');

  // Reduced motion: skip the loading animation and reveal the page now.
  if (prefersReduced) {
    if (loader) loader.classList.add('done');
    document.body.classList.remove('loading');
    initAll();
    return;
  }

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    fill.style.width = progress + '%';
    if (progress === 100) {
      setTimeout(() => {
        loader.classList.add('done');
        document.body.classList.remove('loading');
        initAll();
      }, 400);
    }
  }, 80);
})();

// ─── MAIN INIT (after preloader) ─────────────────────────────
function initAll() {
  hideDecorativeSvgs();
  if (!prefersReduced && !isTouch) initCursor();
  initNavbar();
  initHamburger();
  if (!prefersReduced) {
    initHeroCanvas();
    initAboutCanvas();
    initProjectCanvases();
    initContactCanvas();
  }
  initScrollReveal();
  initStatCounters();
  initSkillBars();
  if (!prefersReduced && !isTouch) initMagnetic();
  initSignatureReveal();
  initFormEffects();
  setFooterYear();
}

// Hide purely-decorative SVGs from screen readers. Every SVG in this page is
// paired with visible text, so none of them convey unique information.
function hideDecorativeSvgs() {
  qsa('svg:not([aria-label]):not([role="img"])').forEach(s => s.setAttribute('aria-hidden', 'true'));
}

// ─── CUSTOM CURSOR ───────────────────────────────────────────
function initCursor() {
  const outer = qs('#cursor-outer');
  const inner = qs('#cursor-inner');
  if (!outer || !inner) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let ox = mx, oy = my;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function loop() {
    ox = lerp(ox, mx, 0.12);
    oy = lerp(oy, my, 0.12);
    outer.style.left = ox + 'px';
    outer.style.top  = oy + 'px';
    inner.style.left = mx + 'px';
    inner.style.top  = my + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  const hovers = 'a, button, .btn, .project-link, .skill-card, .timeline-card, .magnetic';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hovers)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hovers)) document.body.classList.remove('cursor-hover');
  });
  document.addEventListener('mousedown', () => { inner.style.transform = 'translate(-50%,-50%) scale(0.7)'; });
  document.addEventListener('mouseup',   () => { inner.style.transform = 'translate(-50%,-50%) scale(1)'; });
}

// ─── NAVBAR ──────────────────────────────────────────────────
function initNavbar() {
  const nav = qs('#navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
  // Active link highlight
  const sections = qsa('section[id]');
  const links = qsa('#navbar .nav-links a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const match = links.find(l => l.getAttribute('href') === '#' + e.target.id);
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

// ─── HAMBURGER / MOBILE MENU ─────────────────────────────────
function initHamburger() {
  const btn  = qs('#hamburger');
  const menu = qs('#mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  qsa('#mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── HERO CANVAS — Three.js Particle Field ───────────────────
function initHeroCanvas() {
  const canvas = qs('#hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.z = 50;

  // Particle field
  const count = isTouch ? 1100 : 2200;
  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);
  const sizes     = new Float32Array(count);

  const palette = [
    new THREE.Color('#6C63FF'),
    new THREE.Color('#00D4FF'),
    new THREE.Color('#FF6B9D'),
    new THREE.Color('#00FFB2'),
    new THREE.Color('#ffffff'),
  ];

  for (let i = 0; i < count; i++) {
    positions[i*3]   = (Math.random() - 0.5) * 160;
    positions[i*3+1] = (Math.random() - 0.5) * 120;
    positions[i*3+2] = (Math.random() - 0.5) * 80;
    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i*3]   = c.r;
    colors[i*3+1] = c.g;
    colors[i*3+2] = c.b;
    sizes[i] = Math.random() * 1.8 + 0.4;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.ShaderMaterial({
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    vertexShader: `
      attribute float size;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vColor = color;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vAlpha = clamp(1.0 - (-mv.z / 80.0), 0.0, 1.0);
        gl_PointSize = size * (300.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.1, d) * vAlpha * 0.7;
        gl_FragColor = vec4(vColor, alpha);
      }
    `
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // Floating 3D objects
  const objects = [];
  const objGeos = [
    new THREE.IcosahedronGeometry(3, 1),
    new THREE.OctahedronGeometry(2.5, 0),
    new THREE.TorusGeometry(2, 0.6, 12, 32),
  ];
  const objMat = new THREE.MeshBasicMaterial({ color: 0x6C63FF, wireframe: true, transparent: true, opacity: 0.3 });

  objGeos.forEach((g, i) => {
    const mesh = new THREE.Mesh(g, objMat.clone());
    mesh.position.set(
      (i - 1) * 22 + (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 20,
      -20 + Math.random() * -20
    );
    const colors2 = [0x6C63FF, 0x00D4FF, 0xFF6B9D];
    mesh.material.color.set(colors2[i]);
    scene.add(mesh);
    objects.push(mesh);
  });

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const vis = onScreenFlag(qs('#hero'));
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    if (!pageVisible || !vis.on) return;
    t += 0.005;

    // Parallax camera
    camera.position.x += (mouseX * 6 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    // Rotate particles
    points.rotation.y = t * 0.04;
    points.rotation.x = t * 0.02;

    // Animate objects
    objects.forEach((obj, i) => {
      obj.rotation.x += 0.004 + i * 0.001;
      obj.rotation.y += 0.006 + i * 0.001;
      obj.position.y += Math.sin(t + i * 2) * 0.02;
    });

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ─── ABOUT CANVAS — Rotating DNA / Sphere ────────────────────
function initAboutCanvas() {
  const canvas = qs('#about-canvas');
  if (!canvas || typeof THREE === 'undefined') return;
  const wrap = canvas.parentElement;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function resize() {
    renderer.setSize(wrap.offsetWidth, wrap.offsetHeight);
    camera.aspect = wrap.offsetWidth / wrap.offsetHeight;
    camera.updateProjectionMatrix();
  }

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 14;
  resize();

  // Sphere of dots
  const count = isTouch ? 480 : 900;
  const sGeo  = new THREE.BufferGeometry();
  const pos   = new Float32Array(count * 3);
  const col   = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const phi   = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    const r = 5;
    pos[i*3]   = r * Math.cos(theta) * Math.sin(phi);
    pos[i*3+1] = r * Math.sin(theta) * Math.sin(phi);
    pos[i*3+2] = r * Math.cos(phi);
    const c = i % 3 === 0 ? new THREE.Color('#6C63FF')
            : i % 3 === 1 ? new THREE.Color('#00D4FF')
                           : new THREE.Color('#FF6B9D');
    col[i*3]   = c.r;
    col[i*3+1] = c.g;
    col[i*3+2] = c.b;
  }

  sGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  sGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  const sMat = new THREE.PointsMaterial({ vertexColors: true, size: 0.12, transparent: true, opacity: 0.85 });
  const sphere = new THREE.Points(sGeo, sMat);
  scene.add(sphere);

  // Inner ring
  const ringGeo = new THREE.TorusGeometry(3.5, 0.04, 8, 80);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x6C63FF, transparent: true, opacity: 0.3 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  scene.add(ring);

  const vis = onScreenFlag(wrap);
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    if (!pageVisible || !vis.on) return;
    t += 0.006;
    sphere.rotation.y = t;
    sphere.rotation.x = t * 0.3;
    ring.rotation.z = t * 0.4;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', resize);
}

// ─── PROJECT CANVASES ─────────────────────────────────────────
function initProjectCanvases() {
  if (typeof THREE === 'undefined') return;

  const configs = [
    { color: 0x6C63FF, shape: 'torus-knot' },
    { color: 0x00D4FF, shape: 'icosahedron' },
    { color: 0xFF6B9D, shape: 'octahedron'  },
  ];

  qsa('.project-canvas').forEach((canvas, i) => {
    const cfg  = configs[i] || configs[0];
    const wrap = canvas.parentElement;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 6;

    function resize() {
      const w = wrap.offsetWidth, h = wrap.offsetHeight || 260;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();

    let geo;
    if (cfg.shape === 'torus-knot')  geo = new THREE.TorusKnotGeometry(1.4, 0.35, 120, 16);
    else if (cfg.shape === 'icosahedron') geo = new THREE.IcosahedronGeometry(2, 1);
    else                              geo = new THREE.OctahedronGeometry(2, 0);

    const mat  = new THREE.MeshBasicMaterial({ color: cfg.color, wireframe: true, transparent: true, opacity: 0.5 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Particle halo
    const pCount = isTouch ? 140 : 300;
    const pPos   = new Float32Array(pCount * 3);
    for (let k = 0; k < pCount; k++) {
      pPos[k*3]   = (Math.random() - 0.5) * 10;
      pPos[k*3+1] = (Math.random() - 0.5) * 10;
      pPos[k*3+2] = (Math.random() - 0.5) * 6;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: cfg.color, size: 0.05, transparent: true, opacity: 0.5 });
    scene.add(new THREE.Points(pGeo, pMat));

    const vis = onScreenFlag(wrap);
    let t = 0, hover = false;
    const card = canvas.closest('.project-card');
    if (card) {
      card.addEventListener('mouseenter', () => { hover = true; });
      card.addEventListener('mouseleave', () => { hover = false; });
    }

    function animate() {
      requestAnimationFrame(animate);
      if (!pageVisible || !vis.on) return;
      t += hover ? 0.02 : 0.008;
      mesh.rotation.x = t * 0.5;
      mesh.rotation.y = t;
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', resize);
  });
}

// ─── CONTACT CANVAS — Aurora / Wave ──────────────────────────
function initContactCanvas() {
  const canvas = qs('#contact-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;

  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;
  }
  resize();
  window.addEventListener('resize', resize);

  const vis = onScreenFlag(canvas);
  let t = 0;
  function draw() {
    requestAnimationFrame(draw);
    if (!pageVisible || !vis.on) return;
    ctx.clearRect(0, 0, W, H);
    t += 0.008;

    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      const amp   = H * 0.08 + k * H * 0.04;
      const freq  = 0.008 - k * 0.001;
      const phase = t + k * 1.2;
      const yBase = H * (0.35 + k * 0.15);

      for (let x = 0; x <= W; x += 4) {
        const y = yBase + Math.sin(x * freq + phase) * amp
                        + Math.sin(x * freq * 2 + phase * 1.5) * amp * 0.4;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();

      const colors = [
        ['rgba(108,99,255,0.15)', 'rgba(108,99,255,0)'],
        ['rgba(0,212,255,0.12)',  'rgba(0,212,255,0)'],
        ['rgba(255,107,157,0.1)', 'rgba(255,107,157,0)'],
      ];
      const grad = ctx.createLinearGradient(0, yBase - amp, 0, H);
      grad.addColorStop(0, colors[k][0]);
      grad.addColorStop(1, colors[k][1]);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }
  draw();
}

// ─── SCROLL REVEAL ───────────────────────────────────────────
function initScrollReveal() {
  const els = qsa('.reveal-up');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0, 10);
        setTimeout(() => e.target.classList.add('visible'), delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

// ─── STAT COUNTERS ───────────────────────────────────────────
function initStatCounters() {
  const nums = qsa('.stat-num');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      if (prefersReduced) { el.textContent = target; obs.unobserve(el); return; }
      
      let current = 0;
      // If target is small, increment by 1 with a slower tick rate (e.g. 250ms)
      if (target <= 5) {
        const ticker = setInterval(() => {
          current += 1;
          el.textContent = current;
          if (current >= target) {
            clearInterval(ticker);
          }
        }, 250);
      } else {
        const step = target / 50;
        const ticker = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(ticker);
          }
          el.textContent = Math.floor(current) + '+';
        }, 30);
      }
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
}

// ─── SKILL BARS ──────────────────────────────────────────────
function initSkillBars() {
  const bars = qsa('.skill-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.width = e.target.dataset.width + '%';
      obs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  bars.forEach(b => obs.observe(b));
}

// ─── MAGNETIC BUTTONS ────────────────────────────────────────
function initMagnetic() {
  const magnets = qsa('.magnetic');
  magnets.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect   = el.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) * 0.35;
      const dy     = (e.clientY - cy) * 0.35;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0,0)';
    });
  });
}

// ─── SIGNATURE REVEAL ────────────────────────────────────────
function initSignatureReveal() {
  const sig = qs('.about-signature');
  if (!sig) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { sig.classList.add('visible'); obs.unobserve(sig); }
    });
  }, { threshold: 0.5 });
  obs.observe(sig);
}

// ─── CONTACT FORM ────────────────────────────────────────────
function initFormEffects() {
  const form = qs('#contact-form');
  if (!form) return;
  const btn      = form.querySelector('.form-submit');
  const span     = btn.querySelector('span');
  const status   = qs('#form-status');
  const keyInput = form.querySelector('input[name="access_key"]');
  const PLACEHOLDER = 'YOUR_WEB3FORMS_ACCESS_KEY';
  const EMAIL = 'wuillian.f.mendez@gmail.com';

  const setStatus = (msg, type) => {
    if (!status) return;
    status.textContent = msg || '';
    status.className = 'form-status' + (type ? ' ' + type : '');
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const keyReady = keyInput && keyInput.value.trim() && keyInput.value.trim() !== PLACEHOLDER;

    // No Web3Forms key configured yet → open the visitor's email app so the
    // form is never a dead end.
    if (!keyReady) {
      const name    = (qs('#name')    || {}).value || '';
      const email   = (qs('#email')   || {}).value || '';
      const subject = (qs('#subject') || {}).value || 'Portfolio contact';
      const message = (qs('#message') || {}).value || '';
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      window.location.href =
        `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('Opening your email app…', 'ok');
      return;
    }

    const original = span.textContent;
    span.textContent = 'Sending…';
    btn.disabled = true;
    setStatus('');

    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        span.textContent = 'Sent! ✓';
        btn.style.background = 'linear-gradient(135deg, #00FFB2, #00D4FF)';
        setStatus("Thanks! I'll get back to you within 24 hours.", 'ok');
        form.reset();
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch (err) {
      span.textContent = original;
      setStatus(`Something went wrong — please email me directly at ${EMAIL}`, 'error');
    } finally {
      setTimeout(() => {
        span.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }
  });
}

// ─── 3D CARD TILT ────────────────────────────────────────────
(function initTilt() {
  if (prefersReduced || isTouch) return;
  // Applied globally after init
  setTimeout(() => {
    qsa('.skill-card, .timeline-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateX(${-y*8}deg) rotateY(${x*8}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      });
    });
  }, 1000);
})();

// ─── PARALLAX on scroll ──────────────────────────────────────
(function initParallax() {
  if (prefersReduced) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const hero = qs('.hero-content');
    if (hero) hero.style.transform = `translateY(${y * 0.25}px)`;
  }, { passive: true });
})();

// ─── GLITCH effect on hero title hover ───────────────────────
(function initGlitch() {
  if (prefersReduced) return;
  setTimeout(() => {
    qsa('.title-line').forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.style.animation = 'none';
        el.classList.add('glitch');
        setTimeout(() => el.classList.remove('glitch'), 500);
      });
    });
  }, 2000);
})();

// ─── FOOTER YEAR ─────────────────────────────────────────────
function setFooterYear() {
  const el = qs('#current-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ─── SMOOTH ANCHOR SCROLLING ─────────────────────────────────
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = qs(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth' });
});
