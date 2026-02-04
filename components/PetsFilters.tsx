"use client";

import { useEffect, useState } from "react";
import Select from "react-select";

import {
  getCategories,
  getSex,
  getSpecies,
  searchCities,
} from "@/lib/api/clientApi";

import type { Category, Sex, Species, City, PetsFilters } from "@/types/pets";
import SearchInput from "./SearchInput";

type Props = {
  onChange: (filters: PetsFilters) => void;
  onReset: () => void;
};

type SelectOption = {
  value: string;
  label: string;
};

export default function PetsFilters({ onChange, onReset }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const [category, setCategory] = useState<Category | "">("");
  const [sex, setSex] = useState<Sex | "">("");
  const [species, setSpecies] = useState<Species | "">("");

  const [sort, setSort] = useState<
    "popular" | "notPopular" | "cheap" | "expensive" | ""
  >("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [sexList, setSexList] = useState<Sex[]>([]);
  const [speciesList, setSpeciesList] = useState<Species[]>([]);

  const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SelectOption | null>(
    null,
  );

  // Load filter options
  useEffect(() => {
    getCategories().then(setCategories);
    getSex().then(setSexList);
    getSpecies().then(setSpeciesList);
  }, []);

  const handleSearch = () => {
    setKeyword(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue("");
    setKeyword("");

    setCategory("");
    setSex("");
    setSpecies("");
    setSelectedLocation(null);
    setSort("");
    setLocationOptions([]);

    onReset();
  };

  const handleCitySearch = async (input: string) => {
    if (input.length < 3) {
      setLocationOptions([]);
      return input;
    }

    try {
      const cities = await searchCities(input);

      if (!Array.isArray(cities)) {
        setLocationOptions([]);
        return input;
      }

      setLocationOptions(
        cities.map((c: City) => ({
          value: c._id,
          label: `${c.cityEn}, ${c.stateEn}`,
        })),
      );
    } catch {
      setLocationOptions([]);
    }

    return input;
  };

  useEffect(() => {
    onChange({
      keyword: keyword || undefined,
      category: category || undefined,
      sex: sex || undefined,
      species: species || undefined,
      locationId: selectedLocation?.value,

      byPopularity:
        sort === "popular" ? false : sort === "notPopular" ? true : undefined,

      byPrice:
        sort === "cheap" ? true : sort === "expensive" ? false : undefined,
    });
  }, [keyword, category, sex, species, selectedLocation, sort, onChange]);

  return (
    <div className="bg-(--light-orange-bg) p-5 rounded-[30px] flex flex-col gap-3 my-10">
      <SearchInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSearch}
        onClear={handleClear}
      />
      <div className="grid grid-cols-2 gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="rounded-[30px] bg-(--light-text) p-3 font-medium text-sm leading-[129%] tracking-[-0.03em] text-(--grey-text)"
        >
          <option value="">Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sex}
          onChange={(e) => setSex(e.target.value as Sex)}
          className="rounded-[30px] bg-(--light-text) p-3 font-medium text-sm leading-[129%] tracking-[-0.03em] text-(--grey-text)"
        >
          <option value="">By gender</option>
          {sexList.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value as Species)}
        className="rounded-[30px] bg-(--light-text) p-3 font-medium text-sm leading-[129%] tracking-[-0.03em] text-(--grey-text)"
      >
        <option value="">By type</option>
        {speciesList.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <Select
        instanceId="city-select"
        options={locationOptions}
        value={selectedLocation}
        onInputChange={(value) => {
          handleCitySearch(value);
          return value;
        }}
        onChange={(option) =>
          setSelectedLocation(option as SelectOption | null)
        }
        placeholder="Location"
        isClearable
        components={{ DropdownIndicator: null, IndicatorSeparator: null }}
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: "30px",
            backgroundColor: "var(--light-text)",
            padding: "6px 8px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "129%",
            letterSpacing: "-0.03em",
            border: "none",
            boxShadow: "none",
            minHeight: "auto",
          }),

          valueContainer: (base) => ({
            ...base,
            padding: "4px 8px",
          }),

          placeholder: (base) => ({
            ...base,
            color: "#9ca3af",
          }),

          menu: (base) => ({
            ...base,
            borderRadius: "16px",
          }),

          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused
              ? "var(--light-orange-bg)"
              : "transparent",
            color: "black",
          }),
        }}
      />

      <div className="flex gap-2.5 flex-wrap">
        {[
          { key: "popular", label: "Popular" },
          { key: "notPopular", label: "Unpopular" },
          { key: "cheap", label: "Cheap" },
          { key: "expensive", label: "Expensive" },
        ].map((item) => (
          <div
            key={item.key}
            className={`bg-(--light-text) p-3 rounded-[30px] font-medium text-sm leading-[129%] tracking-[-0.03em] flex items-center gap-2 ${
              sort === item.key ? "bg-(--orange) text-white" : ""
            }`}
          >
            <label className="cursor-pointer flex items-center gap-1">
              <input
                type="radio"
                name="sort"
                className="hidden"
                checked={sort === item.key}
                onChange={() =>
                  setSort(sort === item.key ? "" : (item.key as typeof sort))
                }
              />
              {item.label}
            </label>

            {sort === item.key && (
              <button
                onClick={() => setSort("")}
                className="ml-1 text-white"
                aria-label="Clear sort"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
