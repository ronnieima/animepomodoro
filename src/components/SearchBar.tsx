"use client";
import { setSearchQuery } from "@/src/features/anime/animeSlice";
import { RootState } from "@/src/app/store";
import { Input } from "@/src/components/ui/input";
import { useDispatch, useSelector } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.anime);
  return (
    <Input
      className="h-16 w-full border-foreground text-2xl sm:w-[50%]"
      placeholder="Search anime"
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
    />
  );
}

export default SearchBar;
