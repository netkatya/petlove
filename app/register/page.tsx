import RegistrationForm from "@/components/RegistrationForm";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export default function RegisterPage() {
  return (
    <main className="pt-20 md:pt-28.5 pb-5 md:pb-8">
      <div className="container grid grid-cols-1 xl:grid-cols-2 gap-2.5 lg:gap-8">
        <picture className="block w-full">
          {/* Desktop */}
          <source
            srcSet="
          /img/registration/reg-desc@1x.webp 1x,
          /img/registration/reg-desc@2x.webp 2x
        "
            media="(min-width: 1280px)"
          />

          {/* Tablet */}
          <source
            srcSet="
          /img/registration/reg-tablet@1x.webp 1x,
          /img/registration/reg-tablet@2x.webp 2x
        "
            media="(min-width: 768px)"
          />

          {/* Mobile */}
          <source
            srcSet="
          /img/registration/reg-mob@1x.webp 1x,
          /img/registration/reg-mob@1x.webp 2x
        "
            src="/images/hero-mobile@1x.jpg"
          />
          <img
            src="/img/main/main-tab@1x.webp"
            alt="Woman with a dog"
            className="object-contain w-full h-auto"
          />
        </picture>
        <div className="flex flex-col rounded-[30px] md:rounded-[60px] bg-(--light-text) px-5 md:px-35 xl:px-21 py-6.75 md:py-7.5 xl:py-19.25">
          <PageTitle>Registration</PageTitle>
          <p className="mt-3 md:mt-4 mb-5 md:mb-8 font-medium text-sm text-[18px] leading-[129%] md:leading-[122%] tracking-[-0.02em]">
            Thank you for your interest in our platform.
          </p>

          <RegistrationForm />

          <p className="mt-3 font-medium text-xs md:text-[14px] leading-[117%] tracking-[-0.03em] text-(--grey-text) text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-(--orange)">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
