"use client";
import { Button } from "@/src/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { deleteSession } from "../../actions";
import { toast } from "react-toastify";
import { revalidatePath } from "next/cache";

export default function SessionRowButtons({
  sessionId,
}: {
  sessionId: string;
}) {
  return (
    <div className="flex">
      <Button size={"icon"} variant={"ghost"}>
        <Edit />
      </Button>
      <Button
        onClick={async () => {
          try {
            await deleteSession(sessionId);
            toast.success("Successfully deleted!");
          } catch (error) {
            toast.error(`${error}`);
          }
        }}
        size={"icon"}
        variant={"destructive"}
      >
        <Trash />
      </Button>
    </div>
  );
}
