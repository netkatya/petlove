export default function Home() {
  return (
    <main>
      <div className="container">
        <div>
          <h1>
            Take good
            <span>care</span>of your small pets
          </h1>
          <p>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
        <picture>
          {/* Desktop */}
          <source
            srcSet="
          /img/main/main-desk@1x.webp 1x,
          /img/main/main-desk@2x.webp 2x
        "
            media="(min-width: 1280px)"
          />

          {/* Tablet */}
          <source
            srcSet="
          /img/main/main-tab@1x.webp 1x,
          /img/main/main-tab@2x.webp 2x
        "
            media="(min-width: 768px)"
          />

          {/* Mobile */}
          <source
            srcSet="
          /img/main/main-mob@1x.webp 1x,
          /img/main/main-mob@2x.webp 2x
        "
            src="/images/hero-mobile@1x.jpg"
          />
          <img src="/img/main/main-tab@1x.webp" alt="Woman with a dog" />
        </picture>
      </div>
    </main>
  );
}
