import { decrementTime, incrementTime } from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";

function Timer() {
  const time = useSelector((state: RootState) => state.timer.time);
  const dispatch = useDispatch();
  console.log(time);
  return (
    <section className="flex items-center justify-center gap-16">
      <Button onClick={() => dispatch(decrementTime())}>-</Button>
      <CountdownCircleTimer
        onComplete={() => {
          return { shouldRepeat: false };
        }}
        isPlaying={false}
        size={360}
        duration={time}
        strokeWidth={32}
        colors="#004777"
      >
        {renderTime}
      </CountdownCircleTimer>
      <Button onClick={() => dispatch(incrementTime())}>+</Button>
    </section>
  );
}

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  function str_pad_left(string: string, pad: string, length: number) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  const finalTime =
    str_pad_left(minutes.toString(), "0", 2) +
    ":" +
    str_pad_left(seconds.toString(), "0", 2);

  return (
    <div className="timer">
      <div className="text-6xl font-semibold">{finalTime}</div>
    </div>
  );
};

export default Timer;
