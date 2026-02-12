"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";

import { editUser } from "@/lib/api/clientApi";
import { EditUserRequest } from "@/types/user";
import Image from "next/image";
import { uploadAvatar } from "@/lib/cloudinary/cloudinary";

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
  onUpdated: () => void;
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
  onUpdated,
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
      onUpdated();
      onClose();
    } catch {
      alert("Failed to update profile");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-(--light-text) rounded-[30px] px-7 md:px-18 py-10 w-[95%] md:w-full max-w-83.75 md:max-w-118.5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BTN */}
        <button onClick={onClose} className="absolute right-5 top-5 text-xl">
          ✕
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

            <label className="bg-(--light-orange-bg) text-(--orange) font-medium text-sm rounded-[30px] px-4 py-2 cursor-pointer">
              {uploading ? "Uploading..." : "Upload photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
          </div>

          <input type="hidden" {...register("avatar")} />

          {/* NAME */}
          <div>
            <input {...register("name")} className="input" placeholder="Name" />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <input
              {...register("email")}
              className="input"
              placeholder="Email"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          {/* PHONE */}
          <div>
            <input
              {...register("phone")}
              className="input"
              placeholder="+380XXXXXXXXX"
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button
              disabled={isSubmitting}
              className="bg-(--orange) text-white rounded-[30px] px-5 py-2"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="border rounded-[30px] px-5 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
