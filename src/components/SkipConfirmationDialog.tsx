import { finishTimer } from "@/src/features/timer/timerSlice";
import { RootState } from "@/src/app/store";
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
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import { SkipForward } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

function SkipConfirmationDialog() {
  const dispatch = useDispatch();

  const { currentStage } = useSelector((state: RootState) => state.timer);

  const currentStageLabel =
    currentStage === "longBreak" ? "long break" : currentStage;

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
            You will get credit for this {currentStageLabel} session and skip to
            the next timer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            No, continue my {currentStageLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className=""
            onClick={() => dispatch(finishTimer())}
          >
            Yes, skip this timer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SkipConfirmationDialog;
