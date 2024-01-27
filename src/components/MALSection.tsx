import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";

export default async function MALSection() {
  const session = await getServerSession(options);
  //   const res = await fetch(
  //     `https://api.myanimelist.net/v2/users/@me/animelist`,
  //     {
  //       headers: { "Authentication": `Bearer ${session?.user?.token}` },
  //     },
  //   );
  //   const animeList = await res.json();
  //   console.log(animeList);
  return (
    <>
      {session && (
        <section className="mx-auto max-w-6xl">
          <p>Hello, {session.user?.name}</p>
        </section>
      )}
    </>
  );
}
