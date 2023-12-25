import { useSelector } from "react-redux";
import { RootState } from "../store";

const RenderTime = ({ remainingTime }: { remainingTime: number }) => {
  const { timerState } = useSelector((state: RootState) => state.timer);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  function str_pad_left(string: string, pad: string, length: number) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  const finalTime =
    str_pad_left(minutes.toString(), "0", 2) +
    ":" +
    str_pad_left(seconds.toString(), "0", 2);

  return (
    <div className=" flex flex-col items-center">
      <span>
        Next {timerState === "pomodoro" ? "episode" : "focus session"} in
      </span>
      <span className="text-6xl font-semibold">{finalTime}</span>
    </div>
  );
};

export default RenderTime;
