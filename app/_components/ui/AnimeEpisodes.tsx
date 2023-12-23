import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useQuery } from "@tanstack/react-query";
import { Anime, AnimeEpisodeVideo, JikanResponse } from "@tutkli/jikan-ts";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";

type AnimeEpisodesType = {
  selectedAnime: Anime;
};

function AnimeEpisodes({ selectedAnime }: AnimeEpisodesType) {
  return <div className="flex flex-wrap gap-8">{selectedAnime.episodes}</div>;
}

export default AnimeEpisodes;
