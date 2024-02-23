"use client";

import { Spotify } from "react-spotify-embed";
import { useBoundStore } from "../lib/zustand/bounded-store";
function SpotifyPlayer() {
  const isOpenMusicPlayer = useBoundStore((state) => state.isOpenMusicPlayer);
  return (
    <div className="relative h-full w-96 rounded-full">
      {isOpenMusicPlayer && (
        <Spotify
          wide
          className=" absolute w-full max-w-3xl rounded-3xl"
          link="https://open.spotify.com/playlist/2bohAjZj98rDVLoWn5d3V5?si=38e36128437c424e"
        />
      )}
    </div>
  );
}

export default SpotifyPlayer;
