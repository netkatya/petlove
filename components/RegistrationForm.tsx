"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      router.push("/profile");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Registration failed";

      alert(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2.5 w-full"
    >
      <div>
        <input
          {...register("name")}
          placeholder="Name"
          className="border border-(--light-grey) p-3 rounded-[30px] w-full font-medium text-sm leading-[129%] tracking-[-0.03em]"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="border border-(--light-grey) p-3 rounded-[30px] w-full font-medium text-sm leading-[129%] tracking-[-0.03em]"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border border-(--light-grey) p-3 rounded-[30px] w-full font-medium text-sm leading-[129%] tracking-[-0.03em]"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm password"
          className="border border-(--light-grey) p-3 rounded-[30px] w-full font-medium text-sm leading-[129%] tracking-[-0.03em]"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3.5 mb-3 bg-(--orange) text-(--light-text) py-3 rounded-[30px] disabled:opacity-50 uppercase"
      >
        Registration
      </button>
    </form>
  );
}
