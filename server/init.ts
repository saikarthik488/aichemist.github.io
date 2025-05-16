import { db } from "./db";
import { users, insertUserSchema } from "@shared/schema";
import { eq } from "drizzle-orm";

// Initialize the database with a default guest user
export async function initializeDatabase() {
  try {
    console.log("Checking for existing guest user...");
    // Check if guest user already exists
    const existingUser = await db.select().from(users).where(eq(users.username, "guest")).limit(1);
    
    if (existingUser.length === 0) {
      console.log("Creating guest user...");
      // Create the guest user
      const guestUser = {
        username: "guest",
        password: "guest123" // In a real app, this would be properly hashed
      };
      
      // Validate and insert user
      const validUser = insertUserSchema.parse(guestUser);
      const [user] = await db.insert(users).values(validUser).returning();
      
      console.log("Guest user created with ID:", user.id);
    } else {
      console.log("Guest user already exists with ID:", existingUser[0].id);
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}