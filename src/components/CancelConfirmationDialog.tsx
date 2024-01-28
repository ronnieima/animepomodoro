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
import { Ban } from "lucide-react";
import { useBoundStore } from "../lib/zustand/bounded-store";

function CancelConfirmationDialog() {
  const timerMode = useBoundStore((state) => state.timerMode);
  const cancelTimer = useBoundStore((state) => state.cancelTimer);

  const currentStageLabel =
    timerMode === "longBreak" ? "long break" : timerMode;

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
            onClick={cancelTimer}
          >
            Yes, cancel this timer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CancelConfirmationDialog;
