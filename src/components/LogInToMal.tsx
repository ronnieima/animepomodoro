import Image from "next/image";
import SignInButton from "./SignInButton";

export default function LogInToMal() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 py-16">
      <Image
        src="/gojo.jpg"
        height={300}
        width={300}
        alt="gojo satoru"
        className="rounded-full"
      />
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-2xl font-bold">Want to track your anime?</h3>
        <p className="text-muted-foreground">
          Simply log into your MyAnimeList account to seamlessly manage your
          anime library.
        </p>
        <SignInButton className="mt-4" />
      </div>
    </div>
  );
}
