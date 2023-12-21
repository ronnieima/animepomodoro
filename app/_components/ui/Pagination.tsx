import { decrementPage, incrementPage } from "@/app/features/anime/animeSlice";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, MoveLeft } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Pagination() {
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state.anime);
  return (
    <div className="flex items-center justify-center gap-16">
      <Button onClick={() => dispatch(decrementPage())}>
        <ChevronLeft />
      </Button>
      <p className="text-2xl">Page {page}</p>
      <Button onClick={() => dispatch(incrementPage())}>
        <ChevronRight />
      </Button>
    </div>
  );
}

export default Pagination;
