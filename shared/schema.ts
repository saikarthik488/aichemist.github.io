import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Text humanization table
export const humanizedTexts = pgTable("humanized_texts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(), // Keep it required but we'll create a default user
  originalText: text("original_text").notNull(),
  humanizedText: text("humanized_text").notNull(),
  options: jsonb("options").notNull(),
  plagiarismScore: jsonb("plagiarism_score"),
  aiDetection: jsonb("ai_detection"),
  createdAt: text("created_at").notNull(),
});

export const insertHumanizedTextSchema = createInsertSchema(humanizedTexts).omit({
  id: true,
  createdAt: true,
});

export type InsertHumanizedText = z.infer<typeof insertHumanizedTextSchema>;
export type HumanizedText = typeof humanizedTexts.$inferSelect;

// File conversion table
export const convertedFiles = pgTable("converted_files", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(), // Keep it required but we'll create a default user
  originalFilename: text("original_filename").notNull(),
  convertedFilename: text("converted_filename").notNull(),
  originalFormat: text("original_format").notNull(),
  convertedFormat: text("converted_format").notNull(),
  operation: text("operation").notNull(),
  fileSize: integer("file_size").notNull(),
  downloadUrl: text("download_url").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertConvertedFileSchema = createInsertSchema(convertedFiles).omit({
  id: true,
  downloadUrl: true,
  createdAt: true,
});

export type InsertConvertedFile = z.infer<typeof insertConvertedFileSchema>;
export type ConvertedFile = typeof convertedFiles.$inferSelect;
