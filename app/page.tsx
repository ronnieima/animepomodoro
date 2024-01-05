"use client";
import AnimeSection from "./_components/AnimeSection";
import MainHeader from "./_components/ui/MainHeader";
import SpotifyPlayer from "./_components/ui/SpotifyPlayer";
import Stats from "./_components/ui/Stats";
import Timer from "./_components/ui/Timer";
import TimerControl from "./_components/ui/TimerControls";
import TypeTabs from "./_components/ui/TypeTabs";

export default function Home() {
  return (
    <main className=" min-h-[100svh] ">
      <section className="relative flex flex-col  items-center justify-center gap-8 py-32">
        <video
          autoPlay
          muted
          loop
          className="absolute -z-10 h-full w-full object-cover opacity-20 "
        >
          <source src="https://res.cloudinary.com/dfpbpun9z/video/upload/v1704475712/animepomodoro/bg1.mp4" />
        </video>
        <MainHeader />
        <TypeTabs />
        <Timer />
        <TimerControl />
        <Stats />
        <SpotifyPlayer />
      </section>
      <AnimeSection />
    </main>
  );
}
