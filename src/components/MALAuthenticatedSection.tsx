import { getServerSession } from "next-auth";
import Image from "next/image";
import { options } from "../app/api/auth/[...nextauth]/options";
import AnimeGridLayoutWrapper from "./AnimeGridLayoutWrapper";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default async function MALAuthenticatedSection() {
  const session = await getServerSession(options);
  const res = await fetch(
    `https://api.myanimelist.net/v2/users/@me/animelist?status=watching&fields=list_status`,
    {
      headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
    },
  );
  const animeList: AnimeListResponse = await res.json();
  return (
    <>
      {session && (
        <section className="mx-auto max-w-6xl py-16">
          <div className="flex items-center gap-8">
            <h2>Jujutsu Kaisen</h2>
            <div>
              <Label>Status</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="watching">Watching</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On-Hold</SelectItem>
                  <SelectItem value="dropped">Dropped</SelectItem>
                  <SelectItem value="planToWatch">Plan to Watch</SelectItem>
                  <SelectItem value="reawtching">Rewatching</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Episode</Label>
              <div className="flex items-center">
                <Input type="number" className="w-20" min={0} />
                <span>/ 24</span>
              </div>
            </div>
            <div>
              <Label>Your Score</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="watching">Not Rated</SelectItem>
                  <SelectItem value="completed">10</SelectItem>
                  <SelectItem value="on-hold">9</SelectItem>
                  <SelectItem value="dropped">8</SelectItem>
                  <SelectItem value="planToWatch">7</SelectItem>
                  <SelectItem value="reawtching">6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <header className="flex flex-col items-center">
            <h2 className="py-8 text-center text-5xl font-bold">
              My Currently Watching Anime
            </h2>
          </header>
          <AnimeGridLayoutWrapper>
            {animeList.data.map((anime): any => {
              return (
                <div
                  key={anime.node.id}
                  className="flex w-32 flex-col items-center hover:scale-105 hover:cursor-pointer active:translate-y-2 sm:w-48"
                >
                  <Image
                    src={anime.node.main_picture?.large || "/no-image.png"}
                    alt={anime.node.title}
                    height={200}
                    width={300}
                    className="shadow-xl"
                    style={{ width: "200px", height: "auto" }}
                  />
                  <p className="h-full w-full text-center font-semibold">
                    {anime.node.title}
                  </p>

                  <Separator orientation="horizontal" />

                  <span className="text-center text-muted-foreground">
                    {anime?.list_status.num_episodes_watched} episodes watched
                  </span>
                </div>
              );
            })}
          </AnimeGridLayoutWrapper>
        </section>
      )}
    </>
  );
}

type AnimeListResponse = {
  data: Array<{
    node: {
      id: number;
      title: string;
      main_picture?: {
        medium: string;
        large: string;
      };
    };
    list_status: {
      status: string;
      score: number;
      num_episodes_watched: number;
      is_rewatching: boolean;
      updated_at: string;
    };
  }>;
  paging: {
    next: string;
  };
};
