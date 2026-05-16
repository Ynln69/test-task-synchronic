export function renderHero() {
  return `
    <section class="hero">
      <picture>
        <source media="(max-width: 767px)" srcset="images/hero-fs-mob.png" />
        <img class="hero__image" src="images/hero-fs.png" alt="2000 € Prize Fund in Daily Battle" />
      </picture>
    </section>
  `;
}
