import { Grip } from "lucide-react";
import Draggable from "react-draggable";
import { Spotify } from "react-spotify-embed";

function SpotifyPlayer() {
  return (
    <Draggable handle=".handle" defaultPosition={{ x: 0, y: 0 }}>
      <div className="handle absolute bottom-24  left-32 flex hidden flex-col items-center rounded-xl bg-muted-foreground p-2 hover:cursor-pointer xl:block">
        <div className="flex items-center">
          <Grip size={32} />
        </div>

        <Spotify
          width={400}
          height={400}
          className=" shadow-md shadow-foreground "
          link="https://open.spotify.com/playlist/2bohAjZj98rDVLoWn5d3V5?si=38e36128437c424e"
        />
      </div>
    </Draggable>
  );
}

export default SpotifyPlayer;
