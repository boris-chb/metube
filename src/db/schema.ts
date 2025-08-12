import {
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    authId: varchar({ length: 32 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
    avatarUrl: varchar({ length: 255 }).notNull(),
    // TODO: add coverUrl
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("clerk_id_idx").on(table.authId)]
);
