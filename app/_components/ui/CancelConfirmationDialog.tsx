import { endTimer } from "@/app/features/timer/timerSlice";
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

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>End</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You won&apos;t be able to get credit for this {timerState}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, continue my {timerState}</AlertDialogCancel>
          <AlertDialogAction onClick={() => dispatch(endTimer())}>
            Yes, end it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CancelConfirmationDialog;
