"use client";

import { RootState } from "@/src/app/store";
import { useSelector } from "react-redux";
import { Spotify } from "react-spotify-embed";
function SpotifyPlayer() {
  const { isOpenMusicPlayer } = useSelector(
    (state: RootState) => state.musicPlayer,
  );
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
