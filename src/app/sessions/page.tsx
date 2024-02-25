import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import db from "@/src/db";
import { timerSessionHistory } from "@/src/db/schema/timer";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import SessionRowButtons from "./_components/SessionRowButtons";
import { redirect } from "next/navigation";

export default async function SessionsPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/");
  }

  const userId = session?.user.id;
  const sessions = await db
    .select()
    .from(timerSessionHistory)
    .where(eq(timerSessionHistory.userId, userId));
  return (
    <main className="">
      <div className="mx-auto max-w-3xl py-24">
        <h1 className="text-3xl">My Sessions</h1>
        <Table className="w-full">
          <TableCaption>A list of your recent sessions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Completed</TableHead>
              <TableHead>Time (in minutes)</TableHead>
              <TableHead>Mode</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((timerSession) => {
              return (
                <TableRow key={timerSession.sessionId}>
                  <TableCell className="font-medium">
                    {timerSession.completed?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {timerSession.sessionLengthInSeconds! / 60}
                  </TableCell>
                  <TableCell className="capitalize">
                    {timerSession.sessionMode}
                  </TableCell>
                  <TableCell className="text-right">
                    <SessionRowButtons sessionId={timerSession.sessionId} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
