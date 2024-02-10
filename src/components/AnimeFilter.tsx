"use client";

import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter, useSearchParams } from "next/navigation";

type AnimeFilterType = {
  label: string;
  defaultValue: string;
  queryParam: string;
  options: { label: string; value: string }[];
};

export default function AnimeFilter({
  label,
  defaultValue,
  queryParam,
  options,
}: AnimeFilterType) {
  const router = useRouter();
  const params = useSearchParams();
  return (
    <div className="flex flex-col">
      <Label className="pb-3">{label}</Label>
      <Select
        defaultValue={defaultValue}
        onValueChange={(value) => {
          const newParams = new URLSearchParams(params);
          newParams.set(queryParam, value);
          router.replace(`?${newParams.toString()}`, { scroll: false });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="flex gap-2"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
