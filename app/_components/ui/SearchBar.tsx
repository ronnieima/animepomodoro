import { setSearchQuery } from "@/app/features/anime/animeSlice";
import { RootState } from "@/app/store";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.anime);
  return (
    <Input
      className="h-16 w-[50%] border-foreground text-2xl"
      placeholder="What are you currently watching?"
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
    />
  );
}

export default SearchBar;
