# Jaltech Design System

A B2B brand system for technology accessories, built for distributors, wholesalers and commercial partners. Friendly, reliable, expert, direct — never cold, generic or low-cost-marketplace.

This repository is the visual source of truth: official logos, the Jalbot character, color and type tokens, iconography, and reusable UI kit components. **Do not invent logos, colors, names, symbols, or character variations** — pull from this system.

---

## Index

| File / Folder | What's in it |
|---|---|
| `README.md` | This document — context, content fundamentals, visual foundations, iconography. |
| `SKILL.md` | Front-matter so this folder works as an Agent Skill in Claude Code. |
| `colors_and_type.css` | All color, type, spacing, radius, shadow tokens. Import into any HTML file. |
| `assets/logo/` | Official Jaltech logos — isotipo, horizontal, vertical, in black and green-gradient. |
| `assets/jalbot/` | Jalbot character renders — the kawaii green astronaut. |
| `assets/campaigns/` | Real campaign artwork (POS, holiday banners, freight/charger promos). Reference for tone & composition. |
| `assets/icons/` | Flat duotone illustration-icons (orange + dark gray) for capability/category. |
| `preview/` | Cards rendered in the Design System tab — color swatches, type specimens, components, brand. |
| `ui_kits/partner-portal/` | UI kit for the B2B partner portal — sidebar, product cards, order screens. |
| `fonts/` | (placeholder) drop official Mont / Aptos files here when available. |

---

## Sources used to build this system

The following files were uploaded by the user as the visual source of truth. They have been copied/normalized into `assets/`:

- **Logos:** `uploads/jaltech1.svg` … `jaltech7.svg` — black isotipo, black horizontal/vertical wordmark, and green-gradient renders (with photoreal bake).
- **Jalbot character:** `uploads/jalbot saludando2.png`, `uploads/jalbotito2.png`, `uploads/ChatGPT Image 20 jun 2025, 13_00_24.png`.
- **Campaign artwork:** `uploads/promociones.png` (% off), `uploads/pos.png` (POS terminal), `uploads/banner vacaciones.png` (Semana Santa banner), `uploads/WhatsApp Image 2026-04-28...jpeg` (Montos Mínimos truck flyer), `uploads/WhatsApp Image 2026-04-29...jpeg` (Cargadores Premium charger flyer).
- **Flat duotone icons:** `uploads/hombre-de-influencia (1).svg`, `mercadeo-en-linea.svg`, `mundial.svg`, `publicidad-digital.svg`, `publicidad.svg`, `terminal-de-punto-de-venta.svg`.

No live codebase or Figma was attached — the system was reconstructed from the official assets and the brand brief above. **If a Jaltech codebase or Figma exists, please attach it so the UI kit can match production exactly.**

---

## Brand context

**Jaltech** sells and distributes technology accessories (chargers, cables, peripherals, charging POS displays, etc.) to **distributors, wholesalers, and commercial partners** — not to end consumers. The system's job is to help partners:

1. **Sell more** — clear price/discount communication.
2. **Rotate inventory better** — visible terms, return guarantees, minimum orders.
3. **Trust the brand** — warranties, on-time despatch, named sales advisors.

The visual feel must read **modern · friendly · reliable · expert** with a clean tech aesthetic, with **Jalbot** appearing intentionally — never as decoration.

---

## Content fundamentals

**Language:** Spanish (Latin American / Colombian). Currency in COP (`$1.750.000`).

**Voice:** Direct, useful, optimistic. Speaks to a partner ("tú"), not a consumer. Uses imperative verbs framed around the partner's outcome ("Arma tu exhibición", "Consulta con tu asesor", "Realiza tu primer pedido").

**Tone qualities:**
- **Close** — informal "tú", warm phrasing.
- **Useful** — every line carries a fact: price, deadline, terms, contact.
- **Reliable** — explicit guarantees, dates, minimums.
- **Expert** — confident product framing ("Cargadores Premium", "Garantía de rotación").
- **Direct** — short clauses, bold key numbers/dates, no fluff.

**Casing:**
- Headlines often **ALL CAPS** in the heaviest weight, especially for promotional/key phrases — `MONTOS MÍNIMOS`, `CARGADORES PREMIUM`, `VACACIONES`.
- Body and labels use sentence case.
- A descriptor often follows the all-caps headline in a smaller weight: `NUEVOS / MONTOS MÍNIMOS / DE PEDIDO PARA LA EMPRESA`.

**Pronouns & address:**
- "tú" / "tu" (close, partner-direct).
- Sometimes "nosotros" for the brand ("Nos vamos de vacaciones", "construyendo eficiencia y valor juntos").

**Emoji:** Not used in commercial communication. Don't add any.

**Numbers & dates:**
- Numbers receive visual weight — bolded, often with currency and units (`$600.000`, `70 DÍAS`, `10%`).
- Dates are in conversational Spanish ("a partir del 6 de abril", "MAYO 2026").

**Examples (verbatim from real campaigns):**
- *"Realiza tu primer pedido por un valor mínimo de **$600.000** en referencias mixtas y recibe: **10% DE DESCUENTO + 70 DÍAS DE PLAZO**."*
- *"¡Nos vamos de **VACACIONES** por Semana Santa! Puedes seguir realizando pedidos y pagos en **nuestra página web**. Los despachos se realizarán a partir del **6 de abril**."*
- *"**NUEVOS MONTOS MÍNIMOS** DE PEDIDO PARA LA EMPRESA — CUBRIR LOS FLETES ESTE 2026. Nuevas condiciones para seguir construyendo eficiencia y valor juntos."*
- *"Garantía de rotación incluida: si al finalizar los 70 días cuentas con producto sin rotación, Jaltech recibe de vuelta el inventario, previa verificación de empaque y estado del producto."*

**What NOT to write:**
- ❌ Aspirational / lifestyle copy ("Transforma tu negocio", "Innovamos juntos") — too generic.
- ❌ Marketplace voice ("¡Aprovecha!", "¡Solo hoy!") — too low-cost.
- ❌ Cold corporate ("Soluciones logísticas integrales") — too distant.

---

## Visual foundations

### Colors
The palette is built around **green primary + dark navy ink + complementary orange + tech purple**, on cream/white surfaces.

| Role | Token | Hex | Usage |
|---|---|---|---|
| Primary | `--jt-green` | `#529A00` | Brand mark, primary CTAs, success, key emphasis. |
| Ink | `--jt-ink` | `#1D2333` | Dark backgrounds, body text on light, navigation. |
| Promo | `--jt-orange` | `#FF8600` | Discount tags, urgency moments, secondary CTA on dark. |
| Tech | `--jt-purple` | `#6A2AE1` | Digital-only campaigns, data, info accents. |
| Surface | `--jt-cream` | `#FAFBF7` | Light page background, slight green tint. |

The campaign material uses **two distinct surface modes**:
1. **Light mode** — cream/white background, green headers, orange highlights, navy body text. Used for transactional flyers (Montos Mínimos, Vacaciones).
2. **Dark mode** — `--jt-ink` or near-black background with green metallic light streaks, white/silver text, green tactical accents. Used for premium product campaigns (Cargadores Premium).

### Typography
- **Display:** Mont (paid). Substituted with **Montserrat** at weights 800/900 for headlines, 700 for sub-heads. Tracking tight, often uppercase.
- **Body:** Poppins at 400/500/600 (Aptos as an alternative if a Microsoft surface is needed). 16px base, 1.55 line-height.
- **Hierarchy on flyers** — uppercase display headline → smaller uppercase descriptor → sentence-case lead → bolded key facts inside paragraphs.

### Backgrounds
- Cream/white as the default neutral.
- **Photographic 3D renders** on hero flats — Jalbot in scenes (warehouse, beach, POS), shot at front-left or front-right with the product anchoring composition.
- **Dark green metallic** with directional light streaks for premium product campaigns — feels like backlit electronics packaging.
- Subtle green-tint gradients (cream → very pale green) on light marketing sections.
- No noise/grain textures, no hand-drawn squiggles.

### Imagery — color & vibe
- **Warm-saturated** — the campaigns use sunny, contrasty 3D renders. Even greens read warm-leaning, never cool minty.
- **Render style** — soft plastic/matte 3D, slightly toy-like, consistent lighting across the Jalbot library.
- Avoid: cold flat-design illustrations, blue-leaning gradients, generic stock photography of office workers.

### Cards
- White surface (`var(--jt-white)`), `--radius-lg` (16px) corners.
- Subtle shadow `--shadow-md`, no border by default.
- Cards on dark surfaces invert: white text, very thin white border at ~8% opacity, no shadow, sometimes a green metallic gradient edge.

### Borders & radii
- **Radii** — buttons & chips at `--radius-pill`; cards at `--radius-lg`; inputs at `--radius-md`. Modals/sheets `--radius-xl`.
- **Borders** — 1px solid `--jt-gray-200` is the default hairline; 1.5px solid `--jt-green` for focus/active states; 2px solid `--jt-orange` for promotional emphasis (% off, deadline blocks).

### Buttons
- **Primary:** green pill, white text, weight 600, 12–14px vertical padding, mild `--shadow-brand` glow on hover.
- **Secondary on dark:** orange pill (`--jt-orange`) — used as the urgency CTA in dark-mode contexts.
- **Tertiary / link:** ink text, green underline on hover.
- Hover = darkens by one step (`--jt-green-600`); press = darkens two steps + scale(0.98).

### Animation
- **Subtle, brisk, not playful.** No bouncing or rubbery springs (Jalbot does the warmth — the UI shouldn't).
- Default easing: `cubic-bezier(0.2, 0.8, 0.2, 1)` (snappy ease-out).
- Durations: 120ms (micro/hover), 200ms (open/close), 360ms (page transitions).
- Fades and small Y-translates only. No rotating spinners with brand color — use a thin green progress bar instead.

### Hover & press states
- **Hover:** color step darker (link, button, card edge), `transform: translateY(-1px)` on cards, `--shadow-md` → `--shadow-lg`.
- **Press / active:** `transform: scale(0.985)`, color two steps darker, no shadow change.
- **Disabled:** 40% opacity + `cursor: not-allowed`, no hover transform.

### Shadows / elevation
Five tiers (`--shadow-xs` → `--shadow-xl`) plus brand-tinted glows (`--shadow-brand`, `--shadow-orange`) for hero CTAs. Inner shadows are not part of the system — depth is rendered with light shadow + clean fill.

### Transparency & blur
- Sparingly. Modal backdrop = `rgba(29,35,51,0.55)` with no blur.
- Sticky toolbars on top of imagery may use `backdrop-filter: blur(12px) saturate(140%)` on a near-white translucent layer — keep contrast strong.
- Never use frosted glass for primary content.

### Layout rules
- Generous breathing room — minimum 48px gutter on flyer-style sections.
- Fixed nav: 64px on desktop, 56px on mobile. Sticky bottom CTA on mobile order flows.
- Grid: 12-col desktop (1240 max width), 4-col mobile. Card grids prefer 3-up at desktop, 2-up at tablet, 1-up at mobile.
- Hero compositions place Jalbot at one edge (often right), leaving the opposite half for hierarchy of headline → descriptor → key fact → CTA.

---

## Iconography

Jaltech uses a **flat duotone illustrated-icon set** — not a thin-stroke utility set. Each icon is a small scene:

- **Fill colors:** Orange `#ff8e00` and a near-black dark gray `#5c5c63`/`#070606`. Sometimes a third subtle gray.
- **Style:** Soft shapes, no outline, generous padding inside the 500×500 viewBox, friendly proportions. Reads at 64–96px, not as tiny UI affordance.
- **Use case:** Capability/category illustrations on landing pages, partner portal feature blocks, marketing flyers — *not* small inline UI affordances (use `lucide-static` for those).

The bundled set covers the brand's commercial vocabulary:
- `terminal-de-punto-de-venta.svg` — POS terminal
- `publicidad.svg` — print advertising / signage
- `publicidad-digital.svg` — digital ads
- `mercadeo-en-linea.svg` — online marketing / e-commerce
- `mundial.svg` — global / distribution reach
- `hombre-de-influencia.svg` — sales rep / commercial advisor

**For small UI affordances** (kebab menus, search, chevrons, plus, filter, etc.), use **Lucide** (`https://unpkg.com/lucide-static@latest`) — a 1.5px line-weight set. Keep stroke `--jt-ink` on light, `--jt-white` on dark, never colored unless indicating state.

**Emoji:** Not used in commercial materials. Don't add them to UI either.

**Unicode glyphs:** Currency `$`, percent `%`, `→` (arrow) and `•` (bullet) only. No `★ ✓ ❌ ⚡` etc — they read as marketplace.

**The Jalbot mascot is not iconography** — it's a brand character. Treat its renders as photography (full-bleed or anchored on color), never as a tiny inline element.

---

## Jalbot rules

Jalbot is the official 3D kawaii green robot character. He is the brand's warmth and humanity — use him intentionally.

**Mandatory traits:**
- Round helmet with green visor
- Black headphones
- The **isotipo** (J leaf mark) on the chest — never the full wordmark
- Friendly closed-eye smile
- Consistent matte-plastic render style and lighting

**Use cases:**
- Hero imagery for partner-facing campaigns
- Empty states and onboarding moments in the portal
- Festive/seasonal banners (birthday, holidays)
- Loyalty / rewards / loyalty milestones

**Don't:**
- Don't redraw or remix Jalbot's face / proportions / accessories.
- Don't put him on top of busy textures (he has his own depth).
- Don't pair him with cold/utilitarian copy — he warms the message.
- Don't shrink him below 80px tall — render quality degrades.

---

## Caveats / open questions

- **Fonts:** Mont and Aptos are not bundled — Montserrat + Poppins are the substitutes. Drop official files into `fonts/` and the @font-face overrides in `colors_and_type.css` will pick them up.
- **No production codebase or Figma** was attached — UI kit components are reconstructed from the brief and visual references. If a real partner portal exists, please attach it for pixel-accuracy.
- **Spanish-only** copy is assumed. If English is needed, we'll add localized examples.
