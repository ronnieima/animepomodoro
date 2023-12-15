import { CountdownCircleTimer } from "react-countdown-circle-timer";
// const initialState = {
//   isPlaying: false,
//   time: 1,
//   shortBreakCount: 0,
//   longBreakCount: 0,
//   key: 0,
// };
function Timer() {
  return (
    <CountdownCircleTimer
      onComplete={() => {
        toggleTimer;
        console.log(isPlaying);
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
