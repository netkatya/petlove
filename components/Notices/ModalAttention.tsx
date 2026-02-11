import Image from "next/image";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalAttention({ isOpen, onClose }: Props) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto bg-black/50"
          : "opacity-0 pointer-events-none bg-black/0"
      }`}
      onClick={onClose}
    >
      <div
        className="relative bg-(--light-text) max-w-83.75 md:max-w-116.5 px-5 md:px-15 py-15 md:py-20 rounded-[30px] flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5"
          aria-label="Close"
        >
          <svg width={14} height={14}>
            <use href="/img/icons.svg#icon-close" stroke="#262626" />
          </svg>
        </button>
        <div className="rounded-full bg-(--light-orange-bg) w-20 h-20 flex justify-center items-center mb-5">
          <Image
            src="/img/dog-icon.png"
            alt="icon dog"
            width={44}
            height={44}
          ></Image>
        </div>
        <h3 className="font-bold text-[20px] md:text-[24px] leading-none md:leading-[117%] tracking-[-0.03em] text-(--orange) mb-5">
          Attention
        </h3>
        <p className="font-medium text-[14px] leading-[129%] tracking-[-0.02em] text-center mb-6 md:mb-7">
          We would like to remind you that certain functionality is available
          only to authorized users.If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>

        <div className="flex gap-2">
          <Link
            href="/login"
            className="flex justify-center items-center py-3 md:py-3.5 bg-(--orange) text-(--light-text) rounded-[30px] w-34.25 h-10.5 font-bold text-[14px] md:text-[16px] leading-[129%] tracking-[-0.03em] hover:bg-(--hover-orange) transition-all duration-300"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="flex justify-center items-center py-3 md:py-3.5 bg-(--light-orange-bg) text-(--orange) rounded-[30px] w-34.25 h-10.5 font-bold text-[14px] md:text-[16px] leading-[129%] tracking-[-0.03em] hover:bg-(--light-orange-hover) transition-all duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
