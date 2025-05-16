import { 
  users, type User, type InsertUser,
  humanizedTexts, type HumanizedText, type InsertHumanizedText,
  convertedFiles, type ConvertedFile, type InsertConvertedFile 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Text humanization methods
  async createHumanizedText(text: InsertHumanizedText): Promise<HumanizedText> {
    const [humanizedText] = await db
      .insert(humanizedTexts)
      .values({
        ...text,
        createdAt: new Date().toISOString()
      })
      .returning();
    return humanizedText;
  }
  
  async getHumanizedTexts(userId: number): Promise<HumanizedText[]> {
    return db
      .select()
      .from(humanizedTexts)
      .where(eq(humanizedTexts.userId, userId));
  }
  
  // File conversion methods
  async createConvertedFile(file: InsertConvertedFile): Promise<ConvertedFile> {
    const downloadUrl = `https://example.com/download/${Math.random().toString(36).substring(2, 11)}`;
    const [convertedFile] = await db
      .insert(convertedFiles)
      .values({
        ...file,
        downloadUrl,
        createdAt: new Date().toISOString()
      })
      .returning();
    return convertedFile;
  }
  
  async getConvertedFiles(userId: number): Promise<ConvertedFile[]> {
    return db
      .select()
      .from(convertedFiles)
      .where(eq(convertedFiles.userId, userId));
  }
  
  // Delete temporary file
  async deleteTemporaryFile(fileId: string): Promise<boolean> {
    // This would delete the actual file in a real implementation
    // In the future, we could integrate with a cloud storage solution
    return true;
  }
}