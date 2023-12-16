import { finishEpisode } from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import renderTime from "@/app/util/renderTime";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";

function AnimeTimer() {
  const dispatch = useDispatch();
  const { time, key, isPlaying } = useSelector(
    (state: RootState) => state.timer,
  );

  return (
    <div>
      <h2 className="text-center">Anime Time</h2>
      <CountdownCircleTimer
        key={key}
        onComplete={() => {
          dispatch(finishEpisode());
          return { shouldRepeat: false };
        }}
        isPlaying={isPlaying}
        size={360}
        duration={time}
        strokeWidth={32}
        colors="#121212"
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default AnimeTimer;
