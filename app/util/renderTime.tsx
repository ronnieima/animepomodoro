import { useSelector } from "react-redux";
import { RootState } from "../store";

const RenderTime = ({ remainingTime }: { remainingTime: number }) => {
  const { currentStage } = useSelector((state: RootState) => state.timer);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const formatTime = (timeValue: number) => {
    return timeValue < 10 ? `0${timeValue}` : timeValue.toString();
  };

  const finalTime = formatTime(minutes) + ":" + formatTime(seconds);

  return (
    <div className=" flex flex-col items-center">
      <span className="text-lg font-semibold">
        Next {currentStage === "pomodoro" ? "episode" : "focus session"} in
      </span>
      <span className="text-6xl font-semibold">{finalTime}</span>
    </div>
  );
};

export default RenderTime;
