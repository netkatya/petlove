"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Enter a valid Email",
    )
    .required("Email is required"),

  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);

  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const password = watch("password");
  const isPasswordValid = password?.length >= 7;

  const onSubmit = async (data: FormValues) => {
    try {
      setServerError(null);

      await signIn({
        email: data.email,
        password: data.password,
      });

      router.push("/profile");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Login failed";

      setServerError(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2.5 md:gap-4 w-full"
      onChange={() => setServerError(null)}
    >
      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="border border-(--light-grey) p-3 md:p-4 rounded-[30px] w-full font-medium text-sm md:text-[16px] leading-[129%] tracking-[-0.03em]"
        />

        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="relative overflow-hidden">
        <input
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          {...register("password")}
          placeholder="Password"
          style={{ appearance: "none" }}
          className={`p-3 md:p-4 rounded-[30px] w-full font-medium text-sm md:text-[16px] leading-[129%] tracking-[-0.03em]
            border outline-none pr-10 ${
              errors.password
                ? "border-red-500"
                : touchedFields.password && isPasswordValid
                  ? "border-green-600"
                  : "border-(--light-grey)"
            }
          `}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-5.5 md:top-6.5 -translate-y-1/2"
        >
          <svg width={20} height={20}>
            <use
              href={`/img/icons.svg#${
                showPassword ? "icon-eye-open" : "icon-eye-off"
              }`}
              stroke="var(--orange)"
              fill="transparent"
            />
          </svg>
        </button>

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {!errors.password && touchedFields.password && isPasswordValid && (
          <p className="text-green-600 text-sm">Password is secure</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-10 md:mt-12 mb-3 md:mb-4 bg-(--orange) text-(--light-text) py-3 md:py-4 rounded-[30px] disabled:opacity-50 uppercase"
      >
        Log In
      </button>

      {serverError && (
        <p className="text-red-600 text-sm text-center">{serverError}</p>
      )}
    </form>
  );
}
