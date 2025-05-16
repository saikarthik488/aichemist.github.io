import { 
  users, type User, type InsertUser,
  humanizedTexts, type HumanizedText, type InsertHumanizedText,
  convertedFiles, type ConvertedFile, type InsertConvertedFile 
} from "@shared/schema";
import { DatabaseStorage } from "./storage.database";

// Interface defining all storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Text humanization methods
  createHumanizedText(text: InsertHumanizedText): Promise<HumanizedText>;
  getHumanizedTexts(userId: number): Promise<HumanizedText[]>;
  
  // File conversion methods
  createConvertedFile(file: InsertConvertedFile): Promise<ConvertedFile>;
  getConvertedFiles(userId: number): Promise<ConvertedFile[]>;
  
  // Delete temporary files
  deleteTemporaryFile(fileId: string): Promise<boolean>;
}

// Use the database storage implementation
export const storage = new DatabaseStorage();
