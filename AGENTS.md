# Project Rules

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
