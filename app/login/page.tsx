import LoginForm from "@/components/Auth/LoginForm";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";

export default function LogIn() {
  return (
    <main className="pt-20 md:pt-28.5 pb-5 md:pb-8">
      <div className="container grid grid-cols-1 xl:grid-cols-2 gap-2.5 lg:gap-8">
        <div className="rounded-[30px] md:rounded-[60px] overflow-hidden">
          <picture className="block w-full h-full">
            {/* Desktop */}
            <source
              srcSet="
          /img/login/login-desc@1x.webp 1x,
          /img/login/login-desc@2x.webp 2x
        "
              media="(min-width: 1280px)"
            />

            {/* Tablet */}
            <source
              srcSet="
          /img/login/login-tab@1x.webp 1x,
          /img/login/login-tab@2x.webp 2x
        "
              media="(min-width: 768px)"
            />

            {/* Mobile */}
            <source
              srcSet="
          /img/login/login-mob@1x.webp 1x,
          /img/login/login-mob@1x.webp 2x
        "
            />
            <img
              src="/img/login/login-mob@1x.webp"
              alt="Dog"
              className="object-cover w-full h-full"
            />
          </picture>
        </div>

        <div className="flex flex-col rounded-[30px] md:rounded-[60px] bg-(--light-text) px-5 md:px-35 xl:px-21 py-15 md:py-17.75 xl:py-29.5">
          <PageTitle>Log in</PageTitle>
          <p className="mt-4 md:mt-8 mb-6 md:mb-8 font-medium text-[14px] md:text-[18px] leading-[129%] md:leading-[122%] tracking-[-0.02em]">
            Welcome! Please enter your credentials to login to the platform:
          </p>

          <LoginForm />

          <p className="mt-3 font-medium text-xs md:text-[14px] leading-[117%] tracking-[-0.03em] text-(--grey-text) text-center">
            Don’t have an account?{" "}
            <Link href="/register" className="text-(--orange)">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
