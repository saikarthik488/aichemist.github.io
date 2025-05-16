// Authentication and usage tracking utilities

// Admin user data
const ADMIN_EMAIL = "saikarthikmurari488@gmail.com";
const ADMIN_PASSWORD = "Karthik@787202";
 
// User types
export interface User {
  username: string;
  email?: string;
  isAdmin?: boolean;
}

// Get the current user from localStorage
export function getCurrentUser(): User | null {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (e) {
    console.error('Failed to parse user data:', e);
    return null;
  }
}

// Check if the current user is an admin
export function isAdmin(): boolean {
  const user = getCurrentUser();
  return !!user?.isAdmin;
}

// Check if the user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

// Track and check usage limit for non-logged in users
const DAILY_USAGE_LIMIT = 5;
const USAGE_KEY = 'textAlchemistUsage';

interface UsageData {
  count: number;
  date: string;
}

// Get today's date in YYYY-MM-DD format
function getTodayDateString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

// Get current usage data
export function getUsageData(): UsageData {
  const today = getTodayDateString();
  const usageJson = localStorage.getItem(USAGE_KEY);
  
  if (!usageJson) {
    return { count: 0, date: today };
  }
  
  try {
    const data = JSON.parse(usageJson) as UsageData;
    
    // Reset count if it's a new day
    if (data.date !== today) {
      return { count: 0, date: today };
    }
    
    return data;
  } catch (e) {
    console.error('Failed to parse usage data:', e);
    return { count: 0, date: today };
  }
}

// Increment usage count
export function incrementUsage(): void {
  if (isAuthenticated() || isAdmin()) {
    // Authenticated users have unlimited usage
    return;
  }
  
  const today = getTodayDateString();
  const currentUsage = getUsageData();
  
  const newUsage: UsageData = {
    count: currentUsage.date === today ? currentUsage.count + 1 : 1,
    date: today
  };
  
  localStorage.setItem(USAGE_KEY, JSON.stringify(newUsage));
}

// Check if user has reached their daily limit
export function hasReachedDailyLimit(): boolean {
  if (isAuthenticated() || isAdmin()) {
    // Authenticated users have unlimited usage
    return false;
  }
  
  const usage = getUsageData();
  return usage.count >= DAILY_USAGE_LIMIT;
}

// Get remaining uses for the day
export function getRemainingUses(): number {
  if (isAuthenticated() || isAdmin()) {
    // Authenticated users have unlimited usage
    return Infinity;
  }
  
  const usage = getUsageData();
  return Math.max(0, DAILY_USAGE_LIMIT - usage.count);
}

// Check if login credentials match admin
export function checkAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

// Create a login function for admin
export function loginAdmin(email: string, password: string): boolean {
  if (checkAdminCredentials(email, password)) {
    const adminUser: User = { 
      username: "Admin",
      email: email,
      isAdmin: true
    };
    localStorage.setItem('user', JSON.stringify(adminUser));
    return true;
  }
  return false;
}