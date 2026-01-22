import Header from "@/components/header";

export default function Home() {
  return (
    <main className="py-2.5">
      <div className="container">
        <div className="rounded-[30px] md:rounded-[60px] bg-(--orange) min-h-72.5 px-5 md:px-8 xl:px-16 pt-29.5 md:pt-44.5 pb-12.5 md:pb-11 xl:pb-8 xl:flex items-baseline-last">
          <h1 className="font-bold text-[50px] md:text-[80px] xl:text-[90px] leading-[0.96] tracking-[-0.03em] text-(--light-text) mb-6 md:mb-8 max-w-73.75 md:max-w-160 xl:max-w-190">
            Take good <span className="text-amber-200">care </span>of your small
            pets
          </h1>
          <p className="font-medium text-sm md:text-lg leading-[1.29] tracking-[-0.02em] text-(--light-text) max-w-73.75 md:max-w-63.75 md:ml-auto md:w-max">
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
        <picture className="block w-full">
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
          <img
            src="/img/main/main-tab@1x.webp"
            alt="Woman with a dog"
            className="w-full h-auto object-contain"
          />
        </picture>
      </div>
    </main>
  );
}
