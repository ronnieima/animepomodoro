"use client";
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
  const session = useSession();
  const userId = session.data?.user?.id;
  const timerMode = useBoundStore((state) => state.timerMode);
  const finishTimer = useBoundStore((state) => state.finishTimer);
  const timerModeWords = convertCamelCaseToWords(timerMode);


  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"secondary"} onClick={() => {}}>
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
          <AlertDialogAction
            className=""
            onClick={() => {
              const finishedSession = {
                userId: userId,
                sessionMode: timerMode,
                sessionLengthInSeconds: sessionDurations[timerMode],
                completed: new Date(),
              };
              insertSession(finishedSession);
              finishTimer();
            }}
          >
            Yes, skip this timer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SkipConfirmationDialog;
