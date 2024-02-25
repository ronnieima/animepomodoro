import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const timerSessionHistory = pgTable("timerSessionHistory ", {
  sessionId: uuid("sessionId").defaultRandom().primaryKey(),
  userId: text("userId").references(() => users.id),
  sessionMode: text("sessionMode"),
  sessionLengthInSeconds: integer("sessionLengthInSeconds"),
  completed: timestamp("completed"),
});
