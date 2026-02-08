"use client";

import { useEffect, useState } from "react";
import Select, {
  type GroupBase,
  type IndicatorsContainerProps,
  type FormatOptionLabelMeta,
} from "react-select";

import {
  getCategories,
  getSex,
  getSpecies,
  searchCities,
} from "@/lib/api/clientApi";

import type { Category, Sex, Species, City, PetsFilters } from "@/types/pets";

import SearchInput from "./SearchInput";
import BaseSelect from "./BaseSelect";
import SelectIndicators from "./SelectIndicators";

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
  const [cityInput, setCityInput] = useState("");

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

  const toOptions = (list: string[]) => [
    { value: "", label: "Show all" },
    ...list.map((item) => ({
      value: item,
      label: item.charAt(0).toUpperCase() + item.slice(1),
    })),
  ];

  return (
    <div className="xl:-mx-8 bg-(--light-orange-bg) p-5 rounded-[30px] flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-4 my-10">
      <SearchInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSearch}
        onClear={handleClear}
      />

      <div className="grid grid-cols-2 gap-2 md:gap-4 w-full md:w-auto">
        <BaseSelect
          instanceId="category-select"
          placeholder="Category"
          className="text-sm md:text-base font-medium tracking-[-0.03em] w-full md:w-42.5 xl:w-47.5 2xl:w-60"
          value={
            category
              ? {
                  value: category,
                  label: category.charAt(0).toUpperCase() + category.slice(1),
                }
              : null
          }
          onChange={(option: SelectOption | null) => {
            if (!option || option.value === "") {
              handleClear();
            } else {
              setCategory(option.value as Category);
            }
          }}
          options={toOptions(categories)}
        />

        <BaseSelect
          instanceId="sex-select"
          placeholder="By gender"
          className="text-sm md:text-base font-medium tracking-[-0.03em] w-full md:w-42.5 xl:w-47.5 2xl:w-60"
          value={
            sex
              ? {
                  value: sex,
                  label: sex.charAt(0).toUpperCase() + sex.slice(1),
                }
              : null
          }
          onChange={(option: SelectOption | null) =>
            setSex(option ? (option.value as Sex) : "")
          }
          options={toOptions(sexList)}
        />
      </div>

      <BaseSelect
        instanceId="species-select"
        placeholder="By type"
        className="text-sm md:text-base font-medium tracking-[-0.03em] w-full md:w-42.5 xl:w-47.5 2xl:w-60"
        value={
          species
            ? {
                value: species,
                label: species.charAt(0).toUpperCase() + species.slice(1),
              }
            : null
        }
        onChange={(option: SelectOption | null) =>
          setSpecies(option ? (option.value as Species) : "")
        }
        options={toOptions(speciesList)}
      />

      <Select
        instanceId="city-select"
        className="text-sm md:text-base font-medium tracking-[-0.03em] w-full md:max-w-56.75"
        options={locationOptions}
        value={selectedLocation}
        onInputChange={(value: string) => {
          setCityInput(value);
          handleCitySearch(value);
          return value;
        }}
        onChange={(option: SelectOption | null) => setSelectedLocation(option)}
        placeholder="Location"
        isClearable
        formatOptionLabel={(option) => {
          const label = option.label;

          if (!cityInput) {
            return <span style={{ color: "var(--grey-text)" }}>{label}</span>;
          }

          const lowerLabel = label.toLowerCase();
          const lowerInput = cityInput.toLowerCase();

          const index = lowerLabel.indexOf(lowerInput);

          if (index === -1) {
            return <span style={{ color: "var(--grey-text)" }}>{label}</span>;
          }

          return (
            <span style={{ color: "var(--grey-text)" }}>
              <span>{label.substring(0, index)}</span>

              <span style={{ color: "var(--foreground)", fontWeight: 700 }}>
                {label.substring(index, index + cityInput.length)}
              </span>

              <span>{label.substring(index + cityInput.length)}</span>
            </span>
          );
        }}
        components={{
          IndicatorsContainer: (
            p: IndicatorsContainerProps<SelectOption, false>,
          ) => (
            <SelectIndicators clearValue={p.clearValue} hasValue={p.hasValue}>
              {p.children}
            </SelectIndicators>
          ),
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          ClearIndicator: () => null,
        }}
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "30px",
            backgroundColor: "var(--light-text)",
            padding: "3px 10px 3px 8px",
            boxShadow: "none",
            minHeight: "auto",
            border: state.isFocused
              ? "1px solid orange"
              : "1px solid var(--light-grey)",
            "&:hover": {
              border: "1px solid orange",
              transition: "all 0.3s ease-in-out",
              cursor: "text",
            },
          }),

          menu: (base) => ({
            ...base,
            borderRadius: "20px",
          }),

          placeholder: (base) => ({
            ...base,
            color: "#9ca3af",
          }),

          valueContainer: (base) => ({
            ...base,
            padding: "4px 8px",
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

      <div className="h-px w-full bg-(--light-grey) my-3"></div>

      <div className="flex gap-2.5 flex-wrap">
        {[
          { key: "popular", label: "Popular" },
          { key: "notPopular", label: "Unpopular" },
          { key: "cheap", label: "Cheap" },
          { key: "expensive", label: "Expensive" },
        ].map((item) => (
          <div
            key={item.key}
            className={`bg-(--light-text) p-3 md:p-3.5 border border-(--light-grey) rounded-[30px] font-medium text-sm md:text-[16px] leading-[129%] md:leading-[125%] tracking-[-0.03em] flex items-center gap-2 hover:border-(--orange) ${
              sort === item.key
                ? "bg-(--orange) text-(--light-text)"
                : "bg-background text-(--grey-text)"
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
                className="ml-1 text-white cursor-pointer"
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
