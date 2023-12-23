import { cancelTimer } from "@/app/features/timer/timerSlice";
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
import { SkipForward } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

function SkipConfirmationDialog() {
  const dispatch = useDispatch();

  const { timerState } = useSelector((state: RootState) => state.timer);

  const timerStateLabel =
    timerState === "longBreak" ? "long break" : timerState;

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"secondary"}>
          <SkipForward />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will get credit for this {timerStateLabel} session and skip to
            the next timer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            No, continue my {timerStateLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className=""
            onClick={() => dispatch(cancelTimer())}
          >
            Yes, skip this timer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SkipConfirmationDialog;
