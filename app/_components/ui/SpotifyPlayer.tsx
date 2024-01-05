import { useDispatch } from "react-redux";
import { Spotify } from "react-spotify-embed";
function SpotifyPlayer() {
  const dispatch = useDispatch();

  return (
    <Spotify
      wide
      className="b-0 h-70 sticky w-full max-w-3xl bg-background"
      link="https://open.spotify.com/playlist/2bohAjZj98rDVLoWn5d3V5?si=38e36128437c424e"
    />
  );
}

export default SpotifyPlayer;
