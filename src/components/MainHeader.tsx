import { Info } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Bangers } from "next/font/google";
const bangers = Bangers({ weight: "400", subsets: ["latin"] });

function MainHeader() {
  return (
    <header className="z-10 flex flex-col items-center">
      <h1
        className={`${bangers.className} text-center text-5xl tracking-wider sm:text-6xl`}
      >
        Anime Pomodoro Timer
      </h1>
      <Dialog>
        <DialogTrigger className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground">
          <Info className="" />
          <p className="text-base">What is this?</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What is Anime Pomodoro?</DialogTitle>
            <DialogDescription>
              The Animedoro method, introduced by Josh Chen, is a twist on the
              Pomodoro technique. It involves working for 40-60 minutes,
              followed by a 20-minute break for activities like anime. This
              method adapts the original Pomodoro concept of shorter work and
              break periods.
              <br />
              <br />
              For a detailed explanation, refer to Josh Chen&apos;s video where
              he outlines this technique.
            </DialogDescription>
          </DialogHeader>
          <iframe
            className="h-fui w-full"
            height="315"
            src="https://www.youtube-nocookie.com/embed/bUjGZJIgse0?si=xQae4rJP4wMegALc"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default MainHeader;
