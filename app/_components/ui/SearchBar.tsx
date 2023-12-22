import { updateSearchQuery } from "@/app/features/anime/animeSlice";
import { RootState } from "@/app/store";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.anime);
  return (
    <Input
      className="w-full"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => dispatch(updateSearchQuery(e.target.value))}
    />
  );
}

export default SearchBar;
