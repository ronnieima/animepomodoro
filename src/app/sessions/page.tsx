import db from "@/src/db";
import { timerSessionHistory } from "@/src/db/schema/timer";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";

export default async function SessionsPage() {
  const session = await getServerSession(options);
  const userId = session?.user.id;
  const sessions = await db
    .select()
    .from(timerSessionHistory)
    .where(eq(timerSessionHistory.userId, userId));
  console.log(sessions);
  return (
    <main>
      <div className="p-24">
        <h1 className="text-3xl">My Sessions</h1>
        {sessions.map((session) => {
          return (
            <div key={session.completed?.toString()} className="flex gap-4">
              <p>{session.sessionId}</p>
              <p>{session.completed?.toLocaleDateString()}</p>
              <p>{session?.sessionLengthInSeconds! / 60} minutes</p>
              <p>{session.sessionMode}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
