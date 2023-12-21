import { updateSearchQuery } from "@/app/features/anime/animeSlice";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";

function SearchBar() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.anime);
  return (
    <div className="flex justify-center ">
      <Input
        className="w-64"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => dispatch(updateSearchQuery(e.target.value))}
      />
      <Button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["anime"] })}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
