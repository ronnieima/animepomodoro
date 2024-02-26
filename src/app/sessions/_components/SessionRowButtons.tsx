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
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import { deleteSession } from "../../actions";

export default function SessionRowButtons({
  session,
}: {
  session: {
    completed: Date;
    sessionId: string;
    userId: string;
    sessionMode: string;
    sessionLengthInSeconds: number;
  };
}) {
  return (
    <div className="flex items-center justify-end">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={"icon"} variant={"destructive"}>
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be unable to recover this session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, cancel.</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: "destructive" })}
              onClick={async () => {
                try {
                  await deleteSession(session.sessionId);
                  toast.success("Successfully deleted!");
                } catch (error) {
                  toast.error(`${error}`);
                }
              }}
            >
              Yes, delete this session.
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
