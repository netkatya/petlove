"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format",
    )
    .required("Email is required"),

  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export default function RegistrationForm() {
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);

  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  const confirmPassword = watch("confirmPassword");

  const isPasswordValid = password?.length >= 7;
  const isPasswordsMatch =
    password && confirmPassword && password === confirmPassword;

  const onSubmit = async (data: FormValues) => {
    try {
      setServerError(null);

      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      router.push("/profile");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Registration failed";

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
          {...register("name")}
          placeholder="Name"
          className="border border-(--light-grey) p-3 md:p-4 rounded-[30px] w-full font-medium text-sm md:text-[16px] leading-[129%] tracking-[-0.03em]"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

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

      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          {...register("confirmPassword")}
          placeholder="Confirm password"
          className={`p-3 md:p-4 rounded-[30px] w-full font-medium text-sm md:text-[16px] leading-[129%] tracking-[-0.03em]
      border outline-none pr-10 ${
        errors.confirmPassword
          ? "border-red-500"
          : touchedFields.confirmPassword && isPasswordsMatch
            ? "border-green-600"
            : "border-(--light-grey)"
      }
    `}
        />

        <button
          type="button"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute right-4 top-5.5 md:top-6.5 -translate-y-1/2"
          aria-label="show-hide password"
        >
          <svg width={20} height={20}>
            <use
              href={`/img/icons.svg#${
                showConfirmPassword ? "icon-eye-open" : "icon-eye-off"
              }`}
              stroke="var(--orange)"
              fill="transparent"
            />
          </svg>
        </button>

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        {!errors.confirmPassword &&
          touchedFields.confirmPassword &&
          isPasswordsMatch && (
            <p className="text-green-600 text-sm">Passwords match</p>
          )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3.5 md:mt-4 mb-3 md:mb-4 bg-(--orange) text-(--light-text) py-3 md:py-4 rounded-[30px] disabled:opacity-50 uppercase"
      >
        Registration
      </button>

      {serverError && (
        <p className="text-red-600 text-sm text-center">{serverError}</p>
      )}
    </form>
  );
}
