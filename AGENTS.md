# Project Rules

## Source Of Truth

Treat source files as the editable truth and generated files as build output.

- Edit EJS in `src/ejs/**/*.ejs`.
- Edit SCSS in `src/scss/**/*.scss`.
- Do not directly edit generated `index.html` or `assets/css/style.css` for normal implementation work.
- After changing EJS or SCSS, run `npm run build`.
- Review the rendered page from the generated `index.html` after build.
- If a generated file appears out of sync, rebuild instead of manually patching the generated file.

## EJS Partials

Use EJS partials for shared page structure, but avoid over-splitting one-off sections.

- Keep `header` and `footer` in partials.
- Consider partializing elements that are likely to be reused across pages or templates.
- Keep one-page-only sections in `index.ejs` unless partialization clearly improves maintenance.
- Preserve section comments such as `<!-- MainVisualSection -->` and `<!-- BannerSection -->` so EC integration points are easy to find.
- When moving markup into a partial, keep class names, ARIA attributes, and JS hook classes stable unless the task explicitly includes refactoring them.

## Asset Policy

Keep assets predictable and easy to replace during EC integration.

- CSS output belongs in `assets/css`.
- JavaScript belongs in `assets/js`.
- Images and icons belong in `assets/img`.
- Prefer external SVG files via `img` or CSS `background-image` over adding large inline SVG blocks to templates.
- Keep banner, icon, and product images easy to replace by using plain `img` elements where practical.
- For image hover effects, keep the visible frame stable and scale only the inner image.
- Do not introduce decorative image wrappers unless they are needed for masking, aspect ratio, or hover behavior.

## EC Mockup Policy

Build EC-oriented sections so they are easy to convert into real product data later.

- Product cards should use a reusable structure such as `product-card`, `product-card__image`, `product-card__title`, `product-card__price`, and `product-card__tags`.
- Ranking, pickup, and similar product lists should share the same card structure unless the design requires a real difference.
- Keep image, product name, price, tags, and link URL easy to replace.
- Temporary links such as `href="#"` are acceptable in mockups, but should remain obvious and easy to replace before integration.
- Prefer semantic list structures for repeated items: `ul` or `ol` with `li`, then `article` or `a` as appropriate.
- Avoid copying Figma group hierarchy directly when it produces poor HTML. Rebuild into semantic markup that matches the user-facing content.

## Tailwind And SCSS Balance

Use Tailwind CSS for fast, local layout composition, but do not force every visual rule into long HTML class strings.

Default responsibility split:

- Tailwind is for page layout, section spacing, responsive grids, simple flex/grid alignment, and one-off adjustments.
- SCSS component classes are for reusable UI parts, repeated patterns, hover/focus states, transitions, animation, and complex selectors.
- `tailwind.config.js` is for design tokens that should be reused across sections, such as colors, spacing, font sizes, max widths, and clamp values.

Keep HTML readable:

- Avoid long class attributes when the element has a clear UI role.
- If a class string becomes hard to scan, or is repeated more than twice, create a semantic class in SCSS.
- Prefer meaningful classes such as `product-card`, `product-card__image`, `section-action-link`, `feature-card__link`, or `category-link`.
- Keep Tailwind utility classes in HTML when they describe the surrounding layout clearly, such as `grid grid-cols-2 md:grid-cols-4`, `mx-auto max-w-*`, `px-*`, `py-*`, or `md:*` section-level changes.
- Do not hide complex component behavior inside many Tailwind state utilities when a small SCSS block is clearer.

Move these patterns to SCSS component classes:

- Repeated `hover:*`, `focus-visible:*`, `transition-*`, and `duration-*` combinations.
- Repeated image hover behavior such as fixed mask plus inner image scale.
- Repeated product/card structures including image, title, price, tags, and focus ring.
- Shared text links such as section header action links.
- Header, footer, accordion, dropdown, drawer, banner, carousel, and Swiper-specific controls.
- Any selector that needs child targeting, such as `:hover img`, `.is-open &`, or reduced-motion overrides.

Keep these patterns in Tailwind HTML:

- Section-level layout and spacing that is unique to that section.
- Simple responsive layout utilities like `md:flex`, `md:grid-cols-4`, or `md:px-16`.
- Small one-off utility combinations that remain readable.
- Swiper's required structural classes, such as `swiper`, `swiper-wrapper`, and `swiper-slide`.

Naming guidance:

- Use BEM-like component names for SCSS-managed UI: `block`, `block__element`, and limited modifier classes when needed.
- Keep JavaScript hook classes separate with a `js-` prefix, for example `js-feature-swiper`.
- Do not style primarily through `js-` classes unless the style is explicitly tied to initialization state.
- Do not create vague utility-like SCSS classes that duplicate Tailwind, such as `.flex-center`, `.mt-large`, or `.text-small`.

Build workflow:

- When converting long Tailwind strings to SCSS classes, keep visual behavior unchanged.
- Change one component family at a time, then run `npm run build`.
- After conversion, check that long class strings are reduced and that interactive states still work.
- When Chrome MCP is available, verify PC/SP rendering after larger class refactors.

## Swiper-Ready UI

When implementing a horizontal UI that may later become a Swiper slider, keep the slider area close to Swiper's standard structure from the beginning.

Use this base structure:

```html
<div class="swiper js-example-swiper">
  <div class="swiper-wrapper">
    <article class="swiper-slide">
      ...
    </article>
  </div>
</div>
```

Rules:

- Do not add layout-heavy Tailwind classes such as `w-max`, `gap-*`, `snap-*`, or `px-*` directly to `.swiper-wrapper` when Swiper will control that element.
- Manage slide spacing with Swiper's `spaceBetween` option after Swiper is introduced.
- Define slide width with plain CSS on `.swiper-slide`, especially when using `slidesPerView: "auto"`.
- Prefer plain CSS for Swiper-specific layout behavior over complex Tailwind class combinations.
- Do not create custom loop duplicate DOM for Swiper. Let Swiper manage loop clones.
- Exception: for a main visual or similarly centered fixed-width slider with very few real slides, custom display-only duplicate slides are allowed when the product requirement is to keep pagination based on the real slide count. In that case, mark duplicates with `aria-hidden="true"`, remove them from keyboard focus, and document that it is a pseudo-loop rather than Swiper's native `loop: true`.
- If Swiper is disabled on mobile, put mobile fallback styles behind `.swiper:not(.swiper-initialized)` or a similarly explicit uninitialized-state selector.
- For centered, fixed-width sliders, prefer this Swiper configuration as the starting point:

```js
new Swiper(".js-example-swiper", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 24,
  centeredSlides: true,
});
```

Recommended CSS pattern:

```css
.js-example-swiper .swiper-slide {
  width: 364px;
}

@media (min-width: 768px) {
  .js-example-swiper {
    overflow: visible;
  }
}
```

Keep ownership clear: Swiper controls wrapper transforms and spacing; CSS controls slide dimensions and overflow; Tailwind handles the surrounding section, header, typography, and non-Swiper layout.

## Review Workflow

After implementation, always review the code as a reviewer.

Do not change code during review.
Only organize issues, impact, and the correction policy.

Classify review findings into:

- Issues that should be fixed immediately
- Minor issues
- Areas better adjusted manually by a human
- Areas that are fine to keep as-is

During review, pay special attention to Swiper, animation, overflow, z-index, and Tailwind complexity.

## Browser Review With Chrome MCP

When Chrome MCP is available, use it after implementation and build to review the rendered page in the browser.

Browser review should not replace code review. Use both:

- Code review checks structure, maintainability, Tailwind complexity, Swiper ownership, and accessibility intent.
- Browser review checks the actual rendered result after CSS, JavaScript, images, CDN assets, and responsive rules are applied.

For static HTML pages, open the local `index.html` with Chrome MCP. For app projects, start the appropriate local dev server first and open the local URL.

During Chrome MCP review, check:

- Console errors and warnings
- Failed network requests, especially CSS, JS, fonts, and images
- PC and SP viewport rendering
- Swiper or carousel behavior after JavaScript initialization
- DOM after JavaScript has added or modified elements
- Overflow, clipping, unwanted horizontal scroll, and hidden content
- z-index issues and controls hidden behind slides or cards
- Animation and hover/focus behavior
- Image loading, object-fit behavior, and layout shifts
- Accessibility snapshot for button names, link names, headings, and focusable elements

For responsive checks, use the project baseline widths when known. In this project, use:

- PC: 1280px baseline
- SP: 428px baseline

Report browser review results separately from code review findings. Include what was checked, what passed, and any visual or runtime issues found. Do not change code during review unless the user explicitly asks for implementation.

## Micro Animations

Add subtle micro animations during the initial build, not only as a final polish pass.

Default interaction rules:

- Text links should use a simple opacity hover, usually `opacity: 0.7` with `transition: opacity 0.3s ease`.
- Image cards may use a restrained image scale on hover/focus, around `scale(1.06)`, when it does not cause layout shift.
- Banners and large clickable visual blocks may use subtle opacity or image scale, but avoid distracting movement.
- Buttons and icon controls should have clear hover/focus states with short transitions.

State-change UI rules:

- Hamburger drawers, search panels, accordions, dropdowns, and other open/close UI should not switch abruptly when practical.
- Prefer subtle `opacity`, `transform`, `visibility`, `max-height`, or `grid-template-rows` transitions.
- Keep motion short and quiet, usually `0.2s` to `0.3s ease`.
- Avoid layout-jarring animations, large movement, bouncy easing, or decorative motion.
- Respect `prefers-reduced-motion: reduce` for continuous or larger animations.

Implementation guidance:

- Do not animate `display`; use `opacity`, `visibility`, `pointer-events`, `transform`, or height/grid techniques when a transition is needed.
- Keep animations scoped to the component class instead of spreading many one-off Tailwind arbitrary transition classes through the HTML.
- For header navigation, dropdowns, and accordions, prioritize maintainable CSS state selectors over complex JavaScript animation logic.
- Do not add micro animations that interfere with Swiper transforms, scroll-snap behavior, z-index, or accessibility.
