import { getServerSession } from "next-auth";
import JikanAnimeSection from "./JikanAnimeSection";
import { options } from "../app/api/auth/[...nextauth]/options";
import MALAuthenticatedSection from "./MALAuthenticatedSection";

export type SearchParamsType = {
  searchParams: { status: string };
};

export default async function AnimeSection({ searchParams }: SearchParamsType) {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
        <MALAuthenticatedSection searchParams={searchParams} />
      ) : (
        <JikanAnimeSection />
      )}
    </>
  );
}
