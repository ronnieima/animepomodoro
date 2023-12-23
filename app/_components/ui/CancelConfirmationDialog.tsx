import { cancelTimer, finishTimer } from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";

function CancelConfirmationDialog() {
  const dispatch = useDispatch();

  const { timerState } = useSelector((state: RootState) => state.timer);

  function handleAction() {
    switch (timerState) {
      case "pomodoro":
        dispatch(cancelTimer());
        break;
      case "anime":
        dispatch(finishTimer());
        break;
      case "longBreak":
        dispatch(finishTimer());
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"destructive"}>Cancel</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {timerState === "pomodoro" &&
              "You won't be able to get credit for this pomodoro session."}
            {timerState === "anime" &&
              "You will be credited for this anime episode."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            No, continue my{" "}
            {timerState === "longBreak" ? "long break" : timerState}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>
            Yes, end early
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CancelConfirmationDialog;
