import { getServerSession } from "next-auth";
import JikanAnimeSection from "./JikanAnimeSection";
import { options } from "../app/api/auth/[...nextauth]/options";
import MALAuthenticatedSection from "./MALAuthenticatedSection";

export default async function AnimeSection() {
  const session = await getServerSession(options);
  return <>{session ? <MALAuthenticatedSection /> : <JikanAnimeSection />}</>;
}
