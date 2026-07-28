/* Guía Creativa Jaltech — comportamiento
   Carruseles · lightbox · biblioteca de recursos · navegación · contenedores editables */
(function () {
  "use strict";

  /* ► Cuando exista la URL del banco de productos, pégala aquí. Vacío = "Enlace pendiente". */
  var BANCO_PRODUCTOS_URL = "";

  var KB = 1024;
  function fmtSize(b) {
    if (!b) return "";
    return b >= KB * KB ? (b / (KB * KB)).toFixed(1) + " MB" : Math.round(b / KB) + " KB";
  }

  /* ───────── Inventario real de recursos (rutas verificadas en el repositorio) ───────── */
  var A = function (name, path, format, bytes, opts) {
    opts = opts || {};
    return {
      name: name, path: path, format: format, bytes: bytes,
      dark: !!opts.dark, note: opts.note || "", alt: opts.alt || "",
      prev: opts.prev || (opts.preview === false ? "" : path)
    };
  };
  var P = function (name, note) { return { name: name, pending: true, note: note || "" }; };

  var PP = "assets/lineas-negocio/partners-pos/";
  var JP = "assets/lineas-negocio/jaltech-pos/";
  var TG = "assets/lineas-negocio/tecnigo/";
  var PROT = "assets/protection/";

  var IC = "assets/icons/";
  var ICONS = ["boton-icono","catalogo","colores","corporativo","distribuidores","firma-piezas","fotografia","hombre-de-influencia","mailing","mercadeo-en-linea","mundial","patron-visual","pin-jalbot","pop","publicidad","publicidad-digital","redes","sello-calidad","sello-marca","terminal-de-punto-de-venta","tipografia","web","whatsapp"];
  var ICON_VARIANTS = {
    accent: ["corporativo","distribuidores","hombre-de-influencia","mercadeo-en-linea","mundial","publicidad","publicidad-digital","terminal-de-punto-de-venta"],
    white: ["boton-icono","catalogo","corporativo","distribuidores","firma-piezas","hombre-de-influencia","mailing","mercadeo-en-linea","mundial","patron-visual","pin-jalbot","pop","publicidad","publicidad-digital","redes","sello-calidad","sello-marca","terminal-de-punto-de-venta","web","whatsapp"],
    outline: ["boton-icono","catalogo","colores","corporativo","distribuidores","firma-piezas","fotografia","hombre-de-influencia","mailing","mercadeo-en-linea","mundial","patron-visual","pin-jalbot","pop","publicidad","publicidad-digital","redes","sello-calidad","sello-marca","terminal-de-punto-de-venta","tipografia","web","whatsapp"]
  };

  var LIB = {
    "logos-jaltech": {
      title: "Logos Jaltech",
      desc: "Identidad principal de Corporativo y Distribuidores.",
      items: [
        A("Horizontal a color", "assets/logo/jaltech-horizontal-green-gradient.png", "PNG", 343870, { alt: "assets/logo/jaltech-horizontal-green-gradient.svg" }),
        A("Horizontal color sobre oscuro", "assets/logo/jaltech-horizontal-green-white-gradient.png", "PNG", 338405, { dark: true, alt: "assets/logo/jaltech-horizontal-green-white-gradient.svg" }),
        A("Horizontal blanco", "assets/logo/jaltech-horizontal-white.png", "PNG", 65000, { dark: true, alt: "assets/logo/jaltech-horizontal-white.svg" }),
        A("Vertical a color", "assets/logo/jaltech-vertical-green-gradient.png", "PNG", 273621, { alt: "assets/logo/jaltech-vertical-green-gradient.svg" }),
        A("Isotipo a color", "assets/logo/jaltech-isotipo-green-gradient.png", "PNG", 244895, { alt: "assets/logo/jaltech-isotipo-green-gradient.svg" }),
        A("Isotipo blanco", "assets/logo/jaltech-isotipo-white.png", "PNG", 28000, { dark: true, alt: "assets/logo/jaltech-isotipo-white.svg" }),
        A("Horizontal una tinta", "assets/logo/jaltech-horizontal-black.png", "PNG", 110478, { alt: "assets/logo/jaltech-horizontal-black.svg" }),
        A("Vertical una tinta", "assets/logo/jaltech-vertical-black.png", "PNG", 80172, { alt: "assets/logo/jaltech-vertical-black.svg" }),
        A("Isotipo una tinta", "assets/logo/jaltech-isotipo.png", "PNG", 39160, { alt: "assets/logo/jaltech-isotipo.svg" })
      ]
    },
    "logos-partner": {
      title: "Logos Partner POS",
      desc: "Identidad propia de la línea Partner POS.",
      items: [
        A("Logo a color", PP + "logo-3.png", "PNG", 14969, { alt: PP + "logo-3.svg" }),
        A("Logo color sobre oscuro", PP + "logo-2.png", "PNG", 13904, { dark: true, alt: PP + "logo-2.svg" }),
        A("Logo blanco", PP + "logo-1.png", "PNG", 13179, { dark: true, alt: PP + "logo-1.svg" }),
        A("Isotipo a color", PP + "isotipo-3.png", "PNG", 8219, { alt: PP + "isotipo-3.svg" }),
        A("Isotipo sobre oscuro", PP + "isotipo-2.png", "PNG", 7718, { dark: true, alt: PP + "isotipo-2.svg" }),
        A("Isotipo blanco", PP + "isotipo-1.png", "PNG", 7405, { dark: true, alt: PP + "isotipo-1.svg" })
      ]
    },
    "logo-jaltech-pos": {
      title: "Logo Jaltech POS",
      desc: "Categoría de producto y solución. No reemplaza automáticamente el logo principal de la línea de comunicación.",
      items: [
        A("Horizontal a color", JP + "logo-horizontal-2.png", "PNG", 9515, { alt: JP + "logo-horizontal-2.svg" }),
        A("Horizontal blanco", JP + "logo-horizontal-1.png", "PNG", 8529, { dark: true, alt: JP + "logo-horizontal-1.svg" }),
        A("Vertical a color", JP + "logo-vertical-2.png", "PNG", 9838, { alt: JP + "logo-vertical-2.svg" }),
        A("Vertical blanco", JP + "logo-vertical-1.png", "PNG", 9157, { dark: true, alt: JP + "logo-vertical-1.svg" }),
        A("Isotipo a color", JP + "isotipo-2.png", "PNG", 3109, { alt: JP + "isotipo-2.svg" }),
        A("Isotipo blanco", JP + "isotipo-1.png", "PNG", 2905, { dark: true, alt: JP + "isotipo-1.svg" })
      ]
    },
    "logos-tecnigo": {
      title: "Logos TecniGo",
      desc: "Marca independiente dentro del ecosistema.",
      items: [
        A("Logo a color", TG + "logo-3.png", "PNG", 9688, { alt: TG + "logo-3.svg" }),
        A("Logo blanco", TG + "logo-2.png", "PNG", 5854, { dark: true, alt: TG + "logo-2.svg" }),
        A("Logo una tinta", TG + "logo-1.png", "PNG", 6237, { alt: TG + "logo-1.svg" }),
        A("Variante oficial blanca", TG + "logo-v2-1.png", "PNG", 7594, { dark: true, alt: TG + "logo-v2-1.svg" }),
        A("Variante oficial una tinta", TG + "logo-v2-2.png", "PNG", 7943, { alt: TG + "logo-v2-2.svg" }),
        A("Isotipo a color", TG + "isotipo-3.png", "PNG", 2278, { alt: TG + "isotipo-3.svg" }),
        A("Isotipo blanco", TG + "isotipo-2.png", "PNG", 1153, { dark: true, alt: TG + "isotipo-2.svg" }),
        A("Isotipo una tinta", TG + "isotipo-1.png", "PNG", 1247, { alt: TG + "isotipo-1.svg" })
      ]
    },
    tipografias: {
      title: "Tipografías",
      desc: "Jaltech: Mont o Montserrat en títulos, Poppins o Apto en texto corrido. TecniGo: Oswald en títulos, Poppins o Apto en texto corrido.",
      type: "fonts",
      items: [
        { name: "Mont", weights: "Regular · SemiBold · Bold · Heavy", format: "TTF", use: "Jaltech · títulos y destacados",
          files: [["Regular","assets/fonts/mont/Mont-Regular.ttf"],["SemiBold","assets/fonts/mont/Mont-SemiBold.ttf"],["Bold","assets/fonts/mont/Mont-Bold.ttf"],["Heavy","assets/fonts/mont/Mont-Heavy.ttf"]] },
        { name: "Montserrat", weights: "Variable + itálica variable", format: "TTF", use: "Alternativa de títulos",
          files: [["Variable","assets/fonts/montserrat/Montserrat-VariableFont_wght.ttf"],["Itálica","assets/fonts/montserrat/Montserrat-Italic-VariableFont_wght.ttf"]] },
        { name: "Oswald", weights: "ExtraLight · SemiBold", format: "TTF", use: "TecniGo · títulos y destacados",
          files: [["ExtraLight","assets/fonts/Oswald-ExtraLight.ttf"],["SemiBold","assets/fonts/Oswald-SemiBold.ttf"]] },
        { name: "Poppins", weights: "Light · Regular · Medium · SemiBold", format: "TTF", use: "Texto corrido",
          files: [["Light","assets/fonts/poppins/Poppins-Light.ttf"],["Regular","assets/fonts/poppins/Poppins-Regular.ttf"],["Medium","assets/fonts/poppins/Poppins-Medium.ttf"],["SemiBold","assets/fonts/poppins/Poppins-SemiBold.ttf"]] },
        { name: "Apto", weights: "Alternativa del sistema", format: "—", use: "Texto corrido, cuando Poppins no esté disponible", files: [] }
      ]
    },
    paleta: {
      title: "Paleta",
      desc: "Verde como acento principal del sistema Jaltech. TecniGo maneja su propia paleta.",
      type: "palette",
      items: [
        { name: "Verde Jaltech", hex: "#529A00", role: "Acento principal" },
        { name: "Azul oscuro Jaltech", hex: "#1D2333", role: "Fondos oscuros y texto" },
        { name: "Blanco", hex: "#FFFFFF", role: "Superficie base" },
        { name: "Neutro claro", hex: "#FAFBF7", role: "Fondo claro" },
        { name: "Gris texto", hex: "#6E7580", role: "Texto secundario" },
        { name: "Naranja", hex: "#FF8600", role: "Complementario · promoción" },
        { name: "Morado", hex: "#6A2AE1", role: "Complementario · digital" },
        { name: "Amarillo TecniGo", hex: "#FFE000", role: "TecniGo · principal" },
        { name: "Carbón TecniGo", hex: "#3A3A3A", role: "TecniGo · texto y fondos" }
      ]
    },
    iconografia: {
      title: "Iconografía",
      desc: "Iconos usados en esta guía. La iconografía adicional se desarrolla según la necesidad de cada pieza, manteniendo el mismo criterio visual.",
      type: "icons"
    },
    productos: {
      title: "Banco de productos",
      desc: "Banco de productos oficial Jaltech.",
      type: "products"
    }
  };

  /* ───────── Utilidades DOM ───────── */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* ───────── Contenedores editables: si el archivo existe, se muestra ───────── */
  $$(".slot[data-img]").forEach(function (slot) {
    var path = slot.getAttribute("data-img");
    var probe = new Image();
    probe.onload = function () {
      var img = document.createElement("img");
      img.src = path; img.alt = ""; img.decoding = "async"; img.loading = "lazy";
      slot.innerHTML = "";
      slot.style.border = "none";
      slot.appendChild(img);
    };
    probe.src = path;
  });

  /* ───────── Iconos pendientes: ruta preparada, marcador limpio si no existe ───────── */
  $$("img[data-icon]").forEach(function (img) {
    var path = img.getAttribute("data-icon");
    var fallback = img.getAttribute("data-icon-fallback");
    var probe = new Image();
    probe.onload = function () { img.src = path; };
    probe.onerror = function () {
      if (fallback) { img.src = fallback; return; }
      var ph = document.createElement("span");
      ph.className = "ico-pending" + (img.classList.contains("ico") ? " ico-pending--dark" : "");
      ph.setAttribute("title", "Pendiente: " + path);
      img.replaceWith(ph);
    };
    probe.src = path;
  });

  /* ───────── Navegación lateral ───────── */
  var side = $(".side"), burger = $(".burger"), navItems = $$(".nav-item"), bar = $(".progress i");

  if (burger) {
    burger.addEventListener("click", function () {
      var open = side.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  var lockSpy = false, lockTimer = null, spyRAF = null;

  function setActive(id) {
    navItems.forEach(function (a) {
      a.setAttribute("aria-current", a.getAttribute("href") === "#" + id ? "true" : "false");
    });
  }

  navItems.forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = (a.getAttribute("href") || "").slice(1);
      var target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      side.classList.remove("open");
      if (burger) burger.setAttribute("aria-expanded", "false");

      // El scrollspy no debe robar la sección activa mientras el scroll está en curso
      lockSpy = true;
      if (lockTimer) window.clearTimeout(lockTimer);
      setActive(id);

      var top = target.getBoundingClientRect().top + window.pageYOffset;
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", "#" + id);

      // Libera el scrollspy cuando el scroll se detiene (o a los 1200 ms como máximo)
      var last = -1, still = 0;
      (function settle() {
        var y = window.pageYOffset;
        if (Math.abs(y - last) < 1) { still++; } else { still = 0; }
        last = y;
        if (still > 3) { lockSpy = false; return; }
        lockTimer = window.setTimeout(settle, 60);
      })();
      window.setTimeout(function () { lockSpy = false; }, 1600);
    });
  });

  var sections = $$("main section[id]");

  function updateSpy() {
    if (lockSpy) return;
    var probe = window.innerHeight * 0.35;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= probe) current = s;
    });
    if (current) setActive(current.id);
  }

  if ("IntersectionObserver" in window) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); } });
    }, { rootMargin: "200px 0px -5% 0px" });
    $$(".rv").forEach(function (el) { rio.observe(el); });
    setTimeout(function () {
      $$(".rv").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight + 400) el.classList.add("in");
      });
    }, 1200);
  } else {
    $$(".rv").forEach(function (el) { el.classList.add("in"); });
  }

  function onScroll() {
    var h = document.documentElement;
    var p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    if (bar) bar.style.width = (p * 100).toFixed(2) + "%";
  }
  window.addEventListener("scroll", function () {
    if (spyRAF) return;
    spyRAF = window.requestAnimationFrame(function () { spyRAF = null; onScroll(); updateSpy(); });
  }, { passive: true });
  onScroll();
  updateSpy();

  /* ───────── Carruseles ───────── */
  $$(".gal").forEach(function (gal) {
    var track = $(".track", gal), prev = $("[data-prev]", gal), next = $("[data-next]", gal), dots = $(".dots", gal);
    if (!track) return;
    var cards = $$(".piece", track);
    if (dots) dots.innerHTML = cards.map(function () { return "<b></b>"; }).join("");
    var marks = $$("b", dots || gal);

    function step() {
      var c = cards[0];
      return c ? c.getBoundingClientRect().width + 20 : 300;
    }
    function sync() {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
      var i = Math.round(track.scrollLeft / step());
      marks.forEach(function (m, k) { m.classList.toggle("on", k === Math.min(i, marks.length - 1)); });
    }
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("scroll", function () { window.requestAnimationFrame(sync); }, { passive: true });
    window.addEventListener("resize", sync);
    sync();

    var down = false, x0 = 0, l0 = 0, moved = 0;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return;
      down = true; moved = 0; x0 = e.clientX; l0 = track.scrollLeft;
    });
    track.addEventListener("pointermove", function (e) {
      if (!down) return;
      moved = Math.abs(e.clientX - x0);
      if (moved > 4) track.scrollLeft = l0 - (e.clientX - x0);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
      track.addEventListener(ev, function () { down = false; });
    });
    track.addEventListener("click", function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
  });

  /* ───────── Lightbox ───────── */
  var lb = $("#lightbox"), lbStage = $(".lb__stage", lb), lbTitle = $("[data-lb-title]", lb),
    lbType = $("[data-lb-type]", lb), lbZoom = $("[data-lb-zoom]", lb);
  var group = [], gi = 0, lastFocus = null;

  function lockScroll(on) { document.body.style.overflow = on ? "hidden" : ""; }

  function paint() {
    var it = group[gi];
    if (!it) return;
    lbTitle.textContent = it.title || "";
    lbType.textContent = it.type || "";
    lbStage.innerHTML = "";
    if (it.src) {
      var img = document.createElement("img");
      img.src = it.src; img.alt = it.title || "";
      img.addEventListener("click", function () { img.classList.toggle("zoom"); });
      lbStage.appendChild(img);
      lbZoom.hidden = false;
      lbZoom.onclick = function () { img.classList.toggle("zoom"); };
    } else {
      lbZoom.hidden = true;
      var d = document.createElement("div");
      d.className = "lb__slot";
      d.innerHTML = "<b>" + esc(it.title || "Contenedor editable") + "</b>Espacio preparado para la pieza. Al cargar el archivo se muestra aquí a tamaño completo.";
      lbStage.appendChild(d);
    }
  }
  function openLB(items, index) {
    group = items; gi = index; lastFocus = document.activeElement;
    paint(); lb.classList.add("on"); lb.setAttribute("aria-hidden", "false"); lockScroll(true);
    $("[data-lb-close]", lb).focus();
  }
  function closeLB() {
    lb.classList.remove("on"); lb.setAttribute("aria-hidden", "true"); lockScroll(false);
    if (lastFocus) lastFocus.focus();
  }
  function move(d) { if (!group.length) return; gi = (gi + d + group.length) % group.length; paint(); }

  $$(".gal").forEach(function (gal) {
    var cards = $$(".piece", gal);
    var items = cards.map(function (c) {
      return { src: c.getAttribute("data-src") || "", title: c.getAttribute("data-title") || "", type: c.getAttribute("data-type") || "" };
    });
    cards.forEach(function (c, i) { c.addEventListener("click", function () { openLB(items, i); }); });
  });

  $$("[data-zoom]").forEach(function (box) {
    var img = box.querySelector("img");
    if (!img) return;
    box.addEventListener("click", function () {
      openLB([{ src: img.getAttribute("src"), title: img.getAttribute("alt") || "Área de protección", type: "Área de protección" }], 0);
    });
  });

  $("[data-lb-close]", lb).addEventListener("click", closeLB);
  $(".lb__bar", lb).addEventListener("click", function (e) { if (e.target === e.currentTarget) closeLB(); });
  lbStage.addEventListener("click", function (e) { if (e.target === lbStage) closeLB(); });
  $("[data-lb-prev]", lb).addEventListener("click", function () { move(-1); });
  $("[data-lb-next]", lb).addEventListener("click", function () { move(1); });

  /* ───────── Biblioteca de recursos (panel lateral) ───────── */
  var drawer = $("#drawer"), dTitle = $("[data-d-title]"), dDesc = $("[data-d-desc]"), dBody = $("[data-d-body]");
  var dLastFocus = null;

  function fileName(p) { return p.split("/").pop(); }

  function tile(it) {
    if (it.pending) {
      return '<div class="rt rt--pend"><div class="rt__box"><span>—</span></div>' +
        '<div class="rt__body"><b>' + esc(it.name) + '</b><em>Pendiente</em>' +
        '<div class="rt__acts"><span aria-disabled="true">Abrir</span></div></div></div>';
    }
    var box = it.prev
      ? '<img src="' + it.prev + '" alt="" decoding="async">'
      : "<span>" + esc(it.format) + "</span>";
    return '<div class="rt"><div class="rt__box' + (it.dark ? " rt__box--dark" : "") + '">' + box + "</div>" +
      '<div class="rt__body"><b>' + esc(it.name) + "</b><em>" + esc(it.format) +
      (it.alt ? " · " + esc(it.alt.split(".").pop().toUpperCase()) : "") + "</em>" +
      '<div class="rt__acts">' +
      '<a href="' + it.path + '" target="_blank" rel="noopener">Abrir</a>' +
      '<a class="solid" href="' + it.path + '" download="' + fileName(it.path) + '">' + it.format + "</a>" +
      (it.alt ? '<a href="' + it.alt + '" download="' + fileName(it.alt) + '">' + it.alt.split(".").pop().toUpperCase() + "</a>" : "") +
      "</div></div></div>";
  }

  function paletteTile(c) {
    return '<div class="rt"><div class="rt__box" style="padding:0;background:' + c.hex + '"><span class="rt__sw"></span></div>' +
      '<div class="rt__body"><b>' + esc(c.name) + "</b><em>" + c.hex + " · " + esc(c.role) + "</em>" +
      '<div class="rt__acts"><button class="solid" data-copy="' + c.hex + '">Copiar HEX</button></div></div></div>';
  }

  function fontCard(f) {
    return '<div class="fontcard"><b>' + esc(f.name) + "</b>" +
      "<span>" + esc(f.weights) + " · " + esc(f.format) + "<br>" + esc(f.use) + "</span>" +
      (f.files.length
        ? '<div class="rt__acts">' + f.files.map(function (w) {
            return '<a class="solid" href="' + w[1] + '" download="' + fileName(w[1]) + '">' + esc(w[0]) + "</a>";
          }).join("") + "</div>"
        : '<div class="rt__acts"><span aria-disabled="true">Alternativa del sistema</span></div>') +
      "</div>";
  }

  function iconsBlock() {
    return '<div class="filters" role="group" aria-label="Versión del icono">' +
      '<button type="button" aria-pressed="true" data-iv="accent">Con acento</button>' +
      '<button type="button" aria-pressed="false" data-iv="white">Blanco</button>' +
      '<button type="button" aria-pressed="false" data-iv="outline">Lineal gris</button>' +
      "</div><div data-icon-list></div>";
  }
  function iconList(variant) {
    var names = ICON_VARIANTS[variant] || [];
    var box = variant === "white" ? " ig__box--dark" : "";
    return '<div class="icon-grid">' + names.map(function (n) {
      var path = IC + n + "-" + variant + ".svg";
      return '<div class="ig"><a class="ig__box' + box + '" href="' + path + '" target="_blank" rel="noopener" aria-label="Abrir ' + esc(n) + '">' +
        '<img src="' + path + '" alt="" decoding="async"></a>' +
        "<b>" + esc(n.replace(/-/g, " ")) + "</b>" +
        '<span class="ig__row">SVG<a class="ig__dl" href="' + path + '" download="' + n + "-" + variant + '.svg" aria-label="Descargar ' + esc(n) + '">↓</a></span></div>';
    }).join("") + "</div>";
  }

  function productsBlock() {
    var has = !!BANCO_PRODUCTOS_URL;
    return '<div class="empty"><b>Banco de productos oficial Jaltech</b><br>' +
      "Acceso al banco de fotografías oficiales de productos Jaltech.</div>" +
      (has
        ? '<div class="rt__acts" style="max-width:280px;margin-top:4px"><a class="solid" href="' + BANCO_PRODUCTOS_URL + '" target="_blank" rel="noopener">Acceder al banco de productos</a></div>'
        : '<div class="rt__acts" style="max-width:280px;margin-top:4px"><span aria-disabled="true">Enlace pendiente</span></div>');
  }

  function openDrawer(id) {
    var cat = LIB[id];
    if (!cat) return;
    dLastFocus = document.activeElement;
    dTitle.textContent = cat.title;
    dDesc.textContent = cat.desc || "";
    if (cat.type === "palette") {
      dBody.innerHTML = '<div class="res-tiles">' + cat.items.map(paletteTile).join("") + "</div>";
    } else if (cat.type === "fonts") {
      dBody.innerHTML = '<div class="font-list">' + cat.items.map(fontCard).join("") + "</div>";
    } else if (cat.type === "icons") {
      dBody.innerHTML = iconsBlock();
      $("[data-icon-list]", dBody).innerHTML = iconList("accent");
    } else if (cat.type === "products") {
      dBody.innerHTML = productsBlock();
    } else {
      dBody.innerHTML = '<div class="res-tiles">' + cat.items.map(tile).join("") + "</div>" +
        (cat.foot ? '<p class="muted" style="margin-top:12px">' + esc(cat.foot) + "</p>" : "");
    }
    drawer.classList.add("on");
    drawer.setAttribute("aria-hidden", "false");
    lockScroll(true);
    $("[data-d-close]", drawer).focus();
  }
  function closeDrawer() {
    drawer.classList.remove("on");
    drawer.setAttribute("aria-hidden", "true");
    lockScroll(false);
    if (dLastFocus) dLastFocus.focus();
  }

  $$("[data-res]").forEach(function (b) {
    b.addEventListener("click", function () { openDrawer(b.getAttribute("data-res")); });
  });
  $("[data-d-close]", drawer).addEventListener("click", closeDrawer);
  $(".drawer__back", drawer).addEventListener("click", closeDrawer);

  dBody.addEventListener("click", function (e) {
    var t = e.target;
    if (t.matches("[data-copy]")) {
      var hex = t.getAttribute("data-copy");
      if (navigator.clipboard) navigator.clipboard.writeText(hex);
      var old = t.textContent; t.textContent = "Copiado"; setTimeout(function () { t.textContent = old; }, 1200);
    }
    if (t.matches("[data-iv]")) {
      $$("[data-iv]", dBody).forEach(function (b) { b.setAttribute("aria-pressed", b === t ? "true" : "false"); });
      $("[data-icon-list]", dBody).innerHTML = iconList(t.getAttribute("data-iv"));
    }
  });

  /* ───────── Tabs de video (móvil) ───────── */
  $$(".vtabs button").forEach(function (b) {
    b.addEventListener("click", function () {
      var target = b.getAttribute("data-vtab");
      $$(".vtabs button").forEach(function (x) { x.setAttribute("aria-selected", x === b ? "true" : "false"); });
      $$(".vpane").forEach(function (p) { p.hidden = p.getAttribute("data-vpane") !== target; });
    });
  });

  /* ───────── Teclado global ───────── */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (lb.classList.contains("on")) closeLB();
      else if (drawer.classList.contains("on")) closeDrawer();
      else if (side.classList.contains("open")) { side.classList.remove("open"); if (burger) burger.focus(); }
    }
    if (lb.classList.contains("on")) {
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    }
  });
})();
