import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="pt-20 md:pt-28.5 pb-5 md:pb-8">
      <div className="container">
        <div className="py-61.25 md:py-55.25 bg-(--orange) w-full rounded-[30px] flex flex-col justify-center items-center">
          <div className="flex gap-1.5 items-center mb-5 md:mb-10">
            <p className="font-extrabold text-[120px] md:text-[300px] leading-none text-(--light-text)">
              4
            </p>
            <div className="rounded-full bg-amber-300 overflow-hidden">
              <Image
                src="/img/not-found/not-found-cat.png"
                alt="cat"
                width={109}
                height={109}
                className="w-27.25 h-27.25 md:w-70 md:h-70"
              ></Image>
            </div>

            <p className="font-extrabold text-[120px] md:text-[300px] leading-none text-(--light-text)">
              4
            </p>
          </div>
          <p className="font-bold text-base md:text-2xl leading-tight tracking-[-0.03em] text-(--light-text) mb-5">
            Ooops! This page not found :({" "}
          </p>
          <Link
            href="/"
            className="text-(--orange) h-10.5 bg-(--light-orange-bg) rounded-[30px] px-7.5 py-3
            font-bold text-[14px] leading-[1.29] tracking-[-0.03em] hover:bg-(--light-text) transition duration-300"
          >
            To home page
          </Link>
        </div>
      </div>
    </main>
  );
}
