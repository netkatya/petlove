import AddPetForm from "@/components/AddPet/AddPetForm";

export default function AddPet() {
  return (
    <main className="py-20 md:pt-28.5">
      <div className="container grid grid-cols-1 xl:grid-cols-2 gap-2.5 xl:gap-8 items-stretch">
        <div className="rounded-[30px] md:rounded-[60px] overflow-hidden">
          <picture className="block w-full h-full">
            {/* Desktop */}
            <source
              srcSet="
          /img/add-pet/add-desk@1x.webp 1x,
          /img/add-pet/add-desk@2x.webp 2x
        "
              media="(min-width: 1280px)"
            />

            {/* Tablet */}
            <source
              srcSet="
          /img/add-pet/add-tab@1x.webp 1x,
          /img/add-pet/add-tab@2x.webp 2x
        "
              media="(min-width: 768px)"
            />

            {/* Mobile */}
            <source
              srcSet="
          /img/add-pet/add-mob@1x.webp 1x,
          /img/add-pet/add-mob@1x.webp 2x
        "
              src="/img/add-pet/add-mob@1x.webp"
            />
            <img
              src="/img/add-pet/add-mob@1x.webp"
              alt="Dog"
              className="object-cover w-full h-full"
            />
          </picture>
        </div>

        <div className="bg-(--light-text) rounded-[30px] md:rounded-[60px] px-5 md:px-34 xl:px-20 py-7 md:py-10 xl:py-15">
          <h3 className="font-bold text-[28px] md:text-[32px] leading-none tracking-[-0.03em] mb-6">
            Add my pet /{" "}
            <span className="text-[14px] md:text-[16px] leading-[129%] text-[rgba(43, 43, 42, 0.4)]">
              Personal details
            </span>
          </h3>
          <AddPetForm />
        </div>
      </div>
    </main>
  );
}
