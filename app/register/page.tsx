import RegistrationForm from "@/components/RegistrationForm";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export default function RegisterPage() {
  return (
    <main className="pt-20 md:pt-28.5 pb-5 md:pb-8">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-2.5 lg:gap-8">
        <div className="flex flex-col">
          <PageTitle>Registration</PageTitle>
          <p className="mt-3 mb-5 font-medium text-sm leading-[129%] tracking-[-0.02em]">
            Thank you for your interest in our platform.
          </p>

          <RegistrationForm />

          <p className="mt-3 font-medium text-xs leading-[117%] tracking-[-0.03em] text-(--grey-text)">
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
