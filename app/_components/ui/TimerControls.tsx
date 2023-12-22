import {
  decrementTime,
  incrementTime,
  startTimer,
} from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import CancelConfirmationDialog from "./CancelConfirmationDialog";

function TimerControl() {
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state: RootState) => state.timer);

  return (
    <section className="flex gap-8">
      <Button
        onClick={() => dispatch(decrementTime())}
        className={`${isPlaying ? "hidden" : "block"}`}
      >
        -5
      </Button>

      {isPlaying ? (
        <CancelConfirmationDialog />
      ) : (
        <Button
          onClick={() => {
            dispatch(startTimer());
          }}
        >
          Start
        </Button>
      )}

      <Button
        onClick={() => dispatch(incrementTime())}
        className={`${isPlaying ? "hidden" : "block"}`}
      >
        +5
      </Button>
    </section>
  );
}

export default TimerControl;