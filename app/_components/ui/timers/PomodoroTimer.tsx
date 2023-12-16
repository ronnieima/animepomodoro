import { completePomodoro } from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import renderTime from "@/app/util/renderTime";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";

function PomodoroTimer() {
  const dispatch = useDispatch();
  const { time, key, isPlaying, timerState } = useSelector(
    (state: RootState) => state.timer,
  );

  return (
    <CountdownCircleTimer
      key={key}
      onComplete={() => {
        dispatch(completePomodoro());
        return { shouldRepeat: false };
      }}
      isPlaying={isPlaying}
      size={360}
      duration={time}
      strokeWidth={32}
      colors="#004777"
    >
      {renderTime}
    </CountdownCircleTimer>
  );
}

export default PomodoroTimer;
