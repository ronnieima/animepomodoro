"use client";

import { Spotify } from "react-spotify-embed";
import { useBoundStore } from "../lib/zustand/bounded-store";
function SpotifyPlayer() {
  const isOpenMusicPlayer = useBoundStore((state) => state.isOpenMusicPlayer);
  return (
    <>
      {isOpenMusicPlayer && (
        <Spotify
          wide
          className="w-full max-w-3xl px-4"
          link="https://open.spotify.com/playlist/2bohAjZj98rDVLoWn5d3V5?si=38e36128437c424e"
        />
      )}
    </>
  );
}

export default SpotifyPlayer;
