/* =====================================================================
   JALBOT · Storytelling · Brand Hub Jaltech
   GSAP 3 + ScrollTrigger
   ---------------------------------------------------------------------
   AJUSTES RÁPIDOS → bloque CONFIG (justo aquí abajo)
   ===================================================================== */
(() => {
  'use strict';

  const CONFIG = {
    parallax: 1,          // Intensidad del parallax. 0 = apagado · 1 = normal · 1.5 = más marcado
    duration: 1,          // Velocidad general. 1 = normal · 1.4 = más lento · 0.7 = más rápido
    float: 1,             // Micro-movimiento de Jalbot en el hero. 0 = apagado
    rolesAutoplay: 6,     // Roles: segundos entre cambios automáticos hasta que alguien hace clic. 0 = apagado
    wordDim: 0.16,        // Opacidad inicial de las palabras en la sección "Una idea muy clara"
    ease: 'power3.out'
  };

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const D  = (s) => s * CONFIG.duration;

  document.documentElement.style.setProperty('--dur', CONFIG.duration);

  /* ---------- Utilidad: dividir texto en palabras (conserva <span>, ignora <br>) ---------- */
  function splitWords(el) {
    const walk = (node) => {
      Array.from(node.childNodes).forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const i = document.createElement('span'); i.className = 'wi'; i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR') {
          walk(ch);
        }
      });
    };
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    walk(el);
    $$('.w', el).forEach((w) => w.setAttribute('aria-hidden', 'true'));
    return $$('.wi', el);
  }

  // El texto se divide siempre (también sin animación) para mantener el mismo maquetado.
  $$('[data-split], [data-split-hero], [data-scrub-words]').forEach(splitWords);

  /* ---------- Nav (siempre activo, es ligero) ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 5. ROLES · paneles interactivos (funciona aunque GSAP no cargue) ----------
     Cada .role-panel declara sus variables de color (--a acento, --at texto, --t fondo) en index.html.
     El rol activo toma color; los demás quedan en gris. Celebrar cambia de pose a mitad (.peak). */
  (function roles() {
    const board = $('[data-roles]');
    if (!board) return;
    const tabs  = $$('.role-panel', board);
    const texts = $$('.role-text', board);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur = 0, peakTimer = null, autoTimer = null, stopped = false, visible = false, hovering = false;

    const set = (i) => {
      clearTimeout(peakTimer);
      cur = i;
      tabs.forEach((t, k) => {
        const on = k === i;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (!on) t.classList.remove('is-peak');
      });
      texts.forEach((x, k) => x.classList.toggle('is-active', k === i));
      ['--a', '--at', '--t'].forEach((v) => board.style.setProperty(v, tabs[i].style.getPropertyValue(v)));
      board.style.setProperty('--i', i);
      if ($('.peak', tabs[i])) peakTimer = setTimeout(() => tabs[i].classList.add('is-peak'), D(900));
    };

    const stopAuto = () => { clearInterval(autoTimer); autoTimer = null; };
    const startAuto = () => {
      if (stopped || reduce || !CONFIG.rolesAutoplay || autoTimer || !visible || hovering) return;
      autoTimer = setInterval(() => set((cur + 1) % tabs.length), CONFIG.rolesAutoplay * 1000);
    };
    const userStop = () => { stopped = true; stopAuto(); };

    tabs.forEach((t, i) => t.addEventListener('click', () => { userStop(); set(i); }));
    $('.role-tabs', board).addEventListener('keydown', (e) => {
      const k = e.key;
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(k)) return;
      e.preventDefault(); userStop();
      let n = cur;
      if (k === 'ArrowRight' || k === 'ArrowDown') n = (cur + 1) % tabs.length;
      if (k === 'ArrowLeft' || k === 'ArrowUp') n = (cur - 1 + tabs.length) % tabs.length;
      if (k === 'Home') n = 0;
      if (k === 'End') n = tabs.length - 1;
      set(n); tabs[n].focus();
    });
    board.addEventListener('pointerenter', () => { hovering = true; stopAuto(); });
    board.addEventListener('pointerleave', () => { hovering = false; startAuto(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((en) => {
        visible = en[0].isIntersecting;
        visible ? startAuto() : stopAuto();
      }, { threshold: 0.55 }).observe(board);
    }
    set(0);
  })();

  if (!window.gsap || !window.ScrollTrigger) return; // si no carga GSAP, la página queda completa y estática
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add(
    {
      desktop: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
      mobile:  '(max-width: 899px) and (prefers-reduced-motion: no-preference)'
    },
    (ctx) => {
      const isDesktop = ctx.conditions.desktop;
      const A = (isDesktop ? 70 : 38) * CONFIG.parallax; // amplitud base del parallax (px)

      /* ===== Barra de progreso + nav oscuro ===== */
      gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
      $$('[data-nav-dark]').forEach((sec) => {
        ScrollTrigger.create({ trigger: sec, start: 'top 36px', end: 'bottom 36px', toggleClass: { targets: nav, className: 'on-dark' } });
      });

      /* ===== 1. HERO · entrada suave ===== */
      const heroWords = $$('.hero-title .wi');
      const heroFade = $$('.hero [data-hero="fade"]');
      const heroTl = gsap.timeline({ defaults: { ease: CONFIG.ease }, delay: 0.15 });
      gsap.set(heroWords, { yPercent: 115 });
      gsap.set(heroFade, { opacity: 0, y: 18 });
      gsap.set('.hero .jb-hero', { opacity: 0, y: 40, scale: 0.965 });
      gsap.set('.hero-shape', { opacity: 0, scale: 0.94 });
      heroTl
        .to('.hero-shape', { opacity: 1, scale: 1, duration: D(1.6) }, 0)
        .to('.hero .pill-row', { opacity: 1, y: 0, duration: D(0.9) }, 0.1)
        .to(heroWords, { yPercent: 0, duration: D(1.1), stagger: 0.07 }, 0.2)
        .to('.hero .lead', { opacity: 1, y: 0, duration: D(1) }, 0.75)
        .to('.hero .jb-hero', { opacity: 1, y: 0, scale: 1, duration: D(1.5) }, 0.35)
        .to('.hero .hero-cta', { opacity: 1, y: 0, duration: D(0.9) }, 1.0)
        .to('.hero .chips', { opacity: 1, y: 0, duration: D(0.9) }, 1.15)
        .to('.hero .hero-card', { opacity: 1, y: 0, duration: D(1) }, 1.3);

      // micro movimiento (flotación muy sutil)
      if (CONFIG.float > 0) {
        gsap.to('.hero .float', { y: -7 * CONFIG.float, rotation: 0.4 * CONFIG.float, duration: D(4.2), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 });
      }

      /* ===== Parallax genérico: [data-parallax="0.3"] =====
         positivo = el elemento "sube" más rápido que el scroll (primer plano)
         negativo = se queda atrás (fondo)                                        */
      $$('[data-parallax]').forEach((el) => {
        const v = parseFloat(el.dataset.parallax) || 0;
        const inHero = !!el.closest('.hero');
        const trigger = el.closest('section');
        gsap.fromTo(el,
          { y: inHero ? 0 : v * A },
          { y: inHero ? -v * A * 1.4 : -v * A, ease: 'none',
            scrollTrigger: { trigger, start: inHero ? 'top top' : 'top bottom', end: 'bottom top', scrub: true } });
      });

      /* ===== Títulos: aparición por palabras ===== */
      $$('[data-split]').forEach((h) => {
        gsap.from($$('.wi', h), {
          yPercent: 115, duration: D(1), ease: CONFIG.ease, stagger: 0.05,
          scrollTrigger: { trigger: h, start: 'top 86%', once: true }
        });
      });

      /* ===== Aparición progresiva de textos ===== */
      $$('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 26, duration: D(0.9), ease: CONFIG.ease,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        });
      });
      $$('[data-stagger]').forEach((list) => {
        gsap.from(list.children, {
          opacity: 0, y: 24, duration: D(0.9), ease: CONFIG.ease, stagger: 0.12,
          scrollTrigger: { trigger: list, start: 'top 88%', once: true }
        });
      });

      /* ===== 2. ORIGEN · entrada lateral ===== */
      gsap.from('.origin .jb-origin', {
        opacity: 0, x: -70, y: 30, scale: 0.97, duration: D(1.4), ease: CONFIG.ease,
        scrollTrigger: { trigger: '.origin-visual', start: 'top 78%', once: true }
      });

      /* ===== 3. CREENCIA · animación tipográfica con scrub ===== */
      (function belief() {
        const words = $$('.belief-title .wi');
        gsap.set(words, { opacity: CONFIG.wordDim });
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '.belief-track',
            start: isDesktop ? 'top 35%' : 'top 70%',
            end:   isDesktop ? 'bottom bottom' : 'bottom 75%',
            scrub: 0.6
          }
        });
        tl.to(words, { opacity: 1, duration: 1, stagger: 0.55 }, 0);
        const wordsEnd = tl.duration();
        tl.fromTo('.belief-post', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.4 }, wordsEnd - 0.5);
        tl.fromTo('.belief-pills .pill', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.35 }, wordsEnd + 0.4);
        tl.fromTo('.belief-px', { scale: 0.9, y: 40, x: 70 }, { scale: 1, y: 0, x: 0, duration: wordsEnd }, 0);
        tl.fromTo('.halo', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: wordsEnd }, 0);
        tl.to({}, { duration: isDesktop ? 0.8 : 0.2 }); // pausa final antes de soltar el sticky
      })();

      /* ===== Bloque especial: subrayado ===== */
      gsap.fromTo('.obsession .underline', { '--u': 0 }, {
        '--u': 1, duration: D(1.2), ease: 'power2.inOut', delay: 0.5,
        scrollTrigger: { trigger: '.obsession', start: 'top 72%', once: true }
      });

      /* ===== 4. PERSONALIDAD · mosaico: tarjetas que entran en cascada ===== */
      (function mosaic() {
        const cards = $$('[data-tcard]');
        gsap.set(cards, { opacity: 0, y: 46 });
        ScrollTrigger.batch(cards, {
          start: 'top 90%', once: true,
          onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: D(0.9), ease: CONFIG.ease, stagger: 0.12 })
        });
      })();

      /* ===== 5. ROLES · entrada de los 4 paneles ===== */
      gsap.from('.role-panel', {
        opacity: 0, y: 44, duration: D(0.9), ease: CONFIG.ease, stagger: 0.1,
        scrollTrigger: { trigger: '.role-tabs', start: 'top 86%', once: true }
      });
      gsap.from('.role-detail', {
        opacity: 0, y: 24, duration: D(0.9), ease: CONFIG.ease, delay: 0.35,
        scrollTrigger: { trigger: '.role-tabs', start: 'top 86%', once: true }
      });

      /* ===== 6. JALBOT HOY · transición Jalbot → interfaz ===== */
      (function today() {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '.today-stage', start: 'top 85%', end: 'top 30%', scrub: 0.8 }
        });
        if (isDesktop) {
          tl.fromTo('.today-jalbot', { xPercent: 70, scale: 1.1, transformOrigin: '50% 100%' }, { xPercent: 0, scale: 1 }, 0)
            .fromTo('.today-card', { opacity: 0, x: 60, scale: 0.96 }, { opacity: 1, x: 0, scale: 1 }, 0);
        } else {
          tl.fromTo('.today-card', { opacity: 0, y: 40, scale: 0.97 }, { opacity: 1, y: 0, scale: 1 }, 0)
            .fromTo('.today-jalbot', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.3);
        }
        gsap.from('.opts li', {
          opacity: 0, y: 14, duration: D(0.7), ease: CONFIG.ease, stagger: 0.12,
          scrollTrigger: { trigger: '.today-card', start: 'top 55%', once: true }
        });
        gsap.from('.bubble', {
          opacity: 0, y: 10, duration: D(0.7), ease: CONFIG.ease,
          scrollTrigger: { trigger: '.today-card', start: 'top 60%', once: true }
        });
      })();

      /* ===== 7. CIERRE · composición con Jalbot ===== */
      gsap.from('.closing .jb-closing', {
        opacity: 0, x: 70, y: 30, scale: 0.97, duration: D(1.4), ease: CONFIG.ease,
        scrollTrigger: { trigger: '.closing-visual', start: 'top 80%', once: true }
      });

      // Recalcular cuando terminen de cargar fuentes e imágenes (altura de textos)
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
      window.addEventListener('load', () => ScrollTrigger.refresh());
    }
  );
})();
