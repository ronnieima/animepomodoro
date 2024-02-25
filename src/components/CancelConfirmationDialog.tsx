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
import { convertCamelCaseToWords } from "../lib/utils";

function CancelConfirmationDialog() {
  const timerMode = useBoundStore((state) => state.timerMode);
  const cancelTimer = useBoundStore((state) => state.cancelTimer);

  const timerModeWords = convertCamelCaseToWords(timerMode);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <>
            <Ban />
            <span className="sr-only">Cancel timer</span>
          </>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You won&apos;t be able to get credit for this {timerModeWords}{" "}
            session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            No, continue my {timerModeWords}
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
