"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";

import { editUser } from "@/lib/api/clientApi";
import { EditUserRequest } from "@/types/user";
import Image from "next/image";
import { uploadAvatar } from "@/lib/cloudinary/cloudinary";
import { CloudUpload } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import Portal from "../Portal";

/* ---------------- VALIDATION ---------------- */

const optionalString = () =>
  yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .optional();

const schema: yup.ObjectSchema<EditUserRequest> = yup.object({
  name: optionalString(),

  email: optionalString().matches(
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    { excludeEmptyString: true, message: "Invalid email format" },
  ),

  avatar: optionalString().matches(
    /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
    { excludeEmptyString: true, message: "Invalid image url" },
  ),

  phone: optionalString().matches(/^\+38\d{10}$/, {
    excludeEmptyString: true,
    message: "Phone must be +38XXXXXXXXXX",
  }),
});

/* ---------------- TYPES ---------------- */

type Props = {
  onClose: () => void;
  initialAvatar?: string | null;
  initialValues?: {
    name?: string;
    email?: string;
    phone?: string;
  };
};

/* ---------------- COMPONENT ---------------- */

export default function ModalEditUser({
  onClose,
  initialAvatar,
  initialValues,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialAvatar || null);

  /* ---------- FORM ---------- */

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditUserRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialValues?.name || "",
      email: initialValues?.email || "",
      phone: initialValues?.phone || "",
      avatar: initialAvatar || undefined,
    },
  });

  const updateUser = useAuthStore((s) => s.updateUserLocal);
  /* ---------- RESET WHEN USER CHANGED ---------- */

  useEffect(() => {
    reset({
      name: initialValues?.name || "",
      email: initialValues?.email || "",
      phone: initialValues?.phone || "",
      avatar: initialAvatar || undefined,
    });

    setPreview(initialAvatar ?? null);
  }, [initialValues, initialAvatar, reset]);

  /* ---------- CLOSE ON ESC ---------- */

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  /* ---------- AVATAR UPLOAD ---------- */

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const url = await uploadAvatar(file);

      setPreview(url);
      setValue("avatar", url, { shouldValidate: true });
    } catch {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------- SUBMIT ---------- */

  const submit = async (data: EditUserRequest) => {
    try {
      await editUser(data);

      updateUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatar: data.avatar,
      });

      onClose();
    } catch {
      alert("Failed to update profile");
    }
  };

  const phoneValue = watch("phone");
  /* ---------------- UI ---------------- */

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-(--light-text) rounded-[30px] p-5 md:p-10 w-[95%] md:w-full max-w-83.75 md:max-w-120 xl:max-w-130 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE BTN */}
          <button onClick={onClose} className="absolute right-5 top-5">
            <svg width={14} height={14}>
              <use
                href="/img/icons.svg#icon-close"
                stroke="#262626"
                className="hover:stroke-(--orange) transition-all duration-300"
              />
            </svg>
          </button>

          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
            {/* AVATAR PREVIEW */}
            <div className="flex flex-col items-center gap-3 mb-2">
              <Image
                src={preview || "/img/user-image.png"}
                width={94}
                height={94}
                className="rounded-full object-cover"
                alt="avatar"
              />

              <label className="bg-(--light-orange-bg) text-(--orange) font-medium text-[12px] md:text-[14px] rounded-[30px] px-4 py-2 md:py-3 cursor-pointer flex gap-2 items-center hover:bg-(--light-orange-hover) transition-all duration-300">
                {uploading ? "Uploading..." : "Upload photo"}
                <CloudUpload size={18} className="text-(--orange)" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>
            </div>
            <ul className="flex flex-col gap-2.5 w-full">
              {" "}
              {/* NAME */}
              <div>
                <input
                  {...register("name")}
                  className="rounded-[30px] p-3 md:p-4 border border-(--orange) w-full font-medium text-[14px] md:text-[16px] leading-[129%] tracking-[-0.03em] outline-none"
                  placeholder="Name"
                />
                {errors.name && <p className="error">{errors.name.message}</p>}
              </div>
              {/* EMAIL */}
              <div>
                <input
                  {...register("email")}
                  className="rounded-[30px] p-3 md:p-4 border border-(--orange) w-full font-medium text-[14px] md:text-[16px] leading-[129%] tracking-[-0.03em] outline-none"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>
              {/* PHONE */}
              <div>
                <input
                  {...register("phone")}
                  className={`rounded-[30px] p-3 md:p-4 border w-full font-medium text-[14px] md:text-[16px] leading-[129%] tracking-[-0.03em] outline-none ${
                    phoneValue ? "border-(--orange)" : "border-(--light-grey)"
                  }`}
                  placeholder="+380"
                />
                {errors.phone && (
                  <p className="error">{errors.phone.message}</p>
                )}
              </div>
            </ul>

            {/* BUTTONS */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                disabled={isSubmitting}
                className="border bg-(--orange) text-(--light-text) rounded-[30px] font-bold text-[14px] leading-[129%] tracking-[-0.03em] px-5 py-3 hover:bg-(--hover-orange) transition-all duration-300"
              >
                Save
              </button>

              <button
                type="button"
                onClick={onClose}
                className="border border-(--orange) rounded-[30px] text-(--orange) font-bold text-[14px] leading-[129%] tracking-[-0.03em] text-center px-5 py-3 hover:bg-(--orange) hover:text-(--light-text) transition-all duration-300"
              >
                Go to profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}
