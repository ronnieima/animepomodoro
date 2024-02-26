import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const timerSessionHistory = pgTable("timerSessionHistory ", {
  sessionId: uuid("sessionId").defaultRandom().primaryKey(),
  userId: text("userId")
    .references(() => users.id)
    .notNull(),
  sessionMode: text("sessionMode").notNull(),
  sessionLengthInSeconds: integer("sessionLengthInSeconds").notNull(),
  completed: timestamp("completed").notNull(),
});
