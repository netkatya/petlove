"use client";

type Props = {
  onClick: () => void;
};

export default function EditUserBtn({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-(--light-orange-bg) rounded-full p-2.5"
    >
      <svg width={18} height={18}>
        <use
          href="/img/icons.svg#icon-edit"
          stroke="#f6b83d"
          fill="transparent"
        ></use>
      </svg>
    </button>
  );
}
