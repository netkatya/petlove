"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { editUser } from "@/lib/api/clientApi";
import { EditUserRequest } from "@/types/user";

const schema: yup.ObjectSchema<EditUserRequest> = yup.object({
  name: yup.string().optional(),
  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .optional(),
  avatar: yup
    .string()
    .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/)
    .optional(),
  phone: yup
    .string()
    .matches(/^\+38\d{10}$/)
    .optional(),
});

type Props = {
  onClose: () => void;
  onUpdated: () => void;
};

export default function ModalEditUser({ onClose, onUpdated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserRequest>({
    resolver: yupResolver(schema),
  });

  const submit = async (data: EditUserRequest) => {
    try {
      await editUser(data);
      onUpdated();
      onClose();
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
        <input {...register("name")} placeholder="Name" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input {...register("email")} placeholder="Email" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input {...register("avatar")} placeholder="Avatar URL" />
        {errors.avatar && (
          <p className="text-red-500">{errors.avatar.message}</p>
        )}

        <input {...register("phone")} placeholder="+38XXXXXXXXXX" />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <div className="flex gap-3">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
