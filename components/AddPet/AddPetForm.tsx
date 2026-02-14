"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { uploadAvatar } from "@/lib/cloudinary/cloudinary";
import { addPet } from "@/lib/api/clientApi";
import { AddPetRequest, Sex, Species } from "@/types/pets";
import { CloudUpload } from "lucide-react";

const speciesList: Species[] = [
  "dog",
  "cat",
  "monkey",
  "bird",
  "snake",
  "turtle",
  "lizard",
  "frog",
  "fish",
  "ants",
  "bees",
  "butterfly",
  "spider",
  "scorpion",
];

/* ---------------- VALIDATION ---------------- */

const schema: yup.ObjectSchema<AddPetRequest> = yup.object({
  title: yup.string().required("Title is required"),
  name: yup.string().required("Name is required"),
  imgURL: yup.string().required("Photo is required"),

  species: yup
    .mixed<Species>()
    .oneOf([
      "dog",
      "cat",
      "monkey",
      "bird",
      "snake",
      "turtle",
      "lizard",
      "frog",
      "fish",
      "ants",
      "bees",
      "butterfly",
      "spider",
      "scorpion",
    ])
    .required("Species is required"),

  sex: yup
    .mixed<Sex>()
    .oneOf(["female", "male", "multiple", "unknown"])
    .required("Sex is required"),

  birthday: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Format YYYY-MM-DD")
    .required("Birthday is required"),
});

/* ---------------- COMPONENT ---------------- */

export default function AddPetForm() {
  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddPetRequest>({
    resolver: yupResolver(schema),
  });

  /* ---------------- UPLOAD IMAGE ---------------- */

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const url = await uploadAvatar(file);

      setPreview(url);

      setValue("imgURL", url, { shouldValidate: true });
    } catch {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- SUBMIT ---------------- */

  const submit = async (data: AddPetRequest) => {
    try {
      await addPet(data);
      router.push("/profile");
      router.refresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to add pet");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-xl mx-auto flex flex-col gap-4"
    >
      {/* SEX RADIO */}
      <fieldset className="flex gap-2">
        <legend className="sr-only">Sex</legend>

        <label className="cursor-pointer">
          <input
            type="radio"
            value="female"
            {...register("sex")}
            className="peer sr-only "
          />

          <span
            className="
        inline-flex bg-[rgba(244,63,94,0.1)] h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-full
        transition hover:bg-[rgba(236,36,70,0.1)] active:scale-95
        peer-checked:bg-[rgba(236,36,70,0.1)]
        outline outline-[rgba(244,63,94,0.1)] peer-checked:outline-[#f43f5e]
        peer-focus-visible:outline peer-focus-visible:outline-[#f43f5e]
      "
            aria-label="Female"
          >
            <svg className=" " aria-hidden="true" width={20} height={20}>
              <use
                href="/img/icons.svg#icon-female"
                stroke="#f43f5e"
                fill="transparent"
              />
            </svg>
          </span>
        </label>

        <label className="cursor-pointer">
          <input
            type="radio"
            value="male"
            {...register("sex")}
            className="peer sr-only"
          />

          <span
            className="
        inline-flex bg-blue-200 h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-full
        transition hover:bg-[#54adff] active:scale-95
        outline outline-blue-100 peer-checked:outline-[#02305b]
        peer-focus-visible:outline peer-focus-visible:outline-[#02305b]
      "
            aria-label="Male"
          >
            <svg className="" aria-hidden="true" width={20} height={20}>
              <use
                href="/img/icons.svg#icon-male"
                stroke="#02305b"
                fill="transparent"
              />
            </svg>
          </span>
        </label>

        <label className="cursor-pointer">
          <input
            type="radio"
            value="multiple"
            {...register("sex")}
            className="peer sr-only bg-(--light-orange)"
          />

          <span
            className="
        inline-flex bg-(--light-orange-bg) h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-full
        transition hover:bg-(--light-orange-hover) active:scale-95
       outline outline-(--light-orange-bg) peer-checked:outline-(--orange)
        peer-focus-visible:outline peer-focus-visible:outline-(--orange)
      "
            aria-label="Multiple"
          >
            <svg width={20} height={20} aria-hidden="true">
              <use
                href="/img/icons.svg#icon-couple"
                stroke="#f6b83d"
                fill="#f6b83d"
              />
            </svg>
          </span>
        </label>
      </fieldset>
      {errors.sex && (
        <p className="text-red-500 text-sm">{errors.sex.message}</p>
      )}
      {/* IMAGE */}
      <div className="flex flex-col items-center gap-3 mb-3">
        <Image
          src={preview || "/img/add-pet-icon1.png"}
          alt="preview"
          width={68}
          height={68}
          className="rounded-xl object-cover w-17 md:w-21.5 h-17 md:h-21.5"
        />

        <label className="bg-(--light-orange-bg) text-(--orange) font-medium text-[12px] md:text-[14px] rounded-[30px] px-4 py-2 cursor-pointer flex gap-2 items-center hover:bg-(--light-orange-hover) transition-all duration-300">
          {uploading ? "Uploading..." : "Upload photo"}
          <CloudUpload size={18} className="text-(--orange)" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>

        {errors.imgURL && (
          <p className="text-red-500 text-sm">{errors.imgURL.message}</p>
        )}
      </div>
      {/* TITLE */}
      <input
        {...register("title")}
        placeholder="Title"
        className="rounded-[30px] border border-(--light-grey) font-medium text-sm md:text-[16px] leading-[1.29] tracking-[-0.03em] p-3 md:p-4 outline-none"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
      {/* NAME */}
      <input
        {...register("name")}
        placeholder="Pet name"
        className="rounded-[30px] border border-(--light-grey) font-medium text-sm md:text-[16px] leading-[1.29] tracking-[-0.03em] p-3 md:p-4 outline-none"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {/* BIRTHDAY */}
        <input
          type="date"
          {...register("birthday")}
          className="rounded-[30px] border border-(--light-grey) font-medium text-sm md:text-[16px] leading-[1.29] tracking-[-0.03em] text-(--grey-text) p-3 md:p-4 outline-none"
        />
        {errors.birthday && (
          <p className="text-red-500 text-sm">{errors.birthday.message}</p>
        )}
        {/* SPECIES */}
        <select
          {...register("species")}
          defaultValue=""
          className="rounded-[30px] border border-(--light-grey) font-medium text-sm md:text-[16px] text-(--grey-text) leading-[1.29] tracking-[-0.03em] p-3 md:p-4 outline-none"
        >
          <option value="" disabled hidden>
            Type of pet
          </option>

          {speciesList.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        {errors.species && (
          <p className="text-red-500 text-sm mt-1">{errors.species.message}</p>
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-2 justify-end mt-8">
        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="w-25 md:w-42.5 rounded-[30px] px-5 py-3 md:py-4 bg-(--light-grey) hover:bg-(--light-grey) font-bold text-sm md:text-[16px] leading-[1.29] tracking-[-0.03em]"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-25 md:w-42.5 bg-(--orange) text-(--light-text) rounded-[30px] px-5 py-3 md:py-4 hover:bg-(--hover-orange) font-bold text-sm md:text-[16px] leading-[1.29] tracking-[-0.03em]"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
