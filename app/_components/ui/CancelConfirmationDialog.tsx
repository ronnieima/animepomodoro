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
import { Ban } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

function CancelConfirmationDialog() {
  const dispatch = useDispatch();

  const { currentStage } = useSelector((state: RootState) => state.timer);

  const currentStageLabel =
    currentStage === "longBreak" ? "long break" : currentStage;

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"destructive"}>
          <Ban />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You won&apos;t be able to get credit for this {currentStageLabel}{" "}
            session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            No, continue my {currentStageLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-foreground"
            onClick={() => dispatch(cancelTimer())}
          >
            Yes, cancel this timer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CancelConfirmationDialog;
