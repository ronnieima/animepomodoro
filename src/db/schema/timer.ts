import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const timerSessionHistory = pgTable("timerSessionHistory ", {
  userId: text("userId").references(() => users.id),
  sessionMode: text("sessionMode"),
  sessionLengthInSeconds: integer("sessionLengthInSeconds"),
  completed: timestamp("completed"),
});
