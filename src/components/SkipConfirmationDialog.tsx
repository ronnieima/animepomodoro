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
import { useBoundStore } from "../lib/zustand/bounded-store";
import { convertCamelCaseToWords } from "../lib/utils";

function SkipConfirmationDialog() {
  const timerMode = useBoundStore((state) => state.timerMode);
  const finishTimer = useBoundStore((state) => state.finishTimer);
  const timerModeWords = convertCamelCaseToWords(timerMode);

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
            You will get credit for this {timerModeWords} session and skip to
            the next timer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            No, continue my {timerModeWords}
          </AlertDialogCancel>
          <AlertDialogAction className="" onClick={finishTimer}>
            Yes, skip this timer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SkipConfirmationDialog;
