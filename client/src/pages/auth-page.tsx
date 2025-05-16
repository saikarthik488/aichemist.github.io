import React, { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Wand2 } from "lucide-react";
import { loginAdmin, checkAdminCredentials } from "@/lib/authUtils";

// Define schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const AuthPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [isMatch] = useRoute("/auth");
  const { toast } = useToast();
  
  // Handle login with admin check
  const handleLogin = (data: LoginFormData) => {
    // Check for admin credentials
    if (checkAdminCredentials(data.email, data.password)) {
      // Login as admin
      loginAdmin(data.email, data.password);
      toast({
        title: "Admin Login Successful",
        description: "Welcome back, Admin!",
      });
      setLocation("/");
      return;
    }
    
    // Regular user login
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ 
        username: data.email.split('@')[0], 
        email: data.email,
        isAdmin: false
      }));
      toast({
        title: "Login Successful",
        description: `Welcome back!`,
      });
      setLocation("/");
    }, 500);
  };
  
  const handleRegister = (data: RegisterFormData) => {
    // Simulate registration
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ 
        username: data.username,
        isAdmin: false
      }));
      toast({
        title: "Registration Successful",
        description: "Your account has been created.",
      });
      setLocation("/");
    }, 500);
  };

  // Login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Text Alchemist</CardTitle>
            <CardDescription>
              Login or create an account to save your humanized text history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Enter your email address" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loginForm.formState.isSubmitting}
                    >
                      {loginForm.formState.isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              {/* Register Form */}
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Choose a username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Choose a password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirm your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={registerForm.formState.isSubmitting}
                    >
                      {registerForm.formState.isSubmitting ? "Registering..." : "Register"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-sm text-gray-500 text-center">
            <p>Note: Your data is stored locally in your browser cache, not in a database.</p>
          </CardFooter>
        </Card>
      </div>
      
      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-50 justify-center items-center p-12">
        <div className="max-w-lg">
          <div className="mb-8 flex items-center">
            <Wand2 className="h-12 w-12 text-primary mr-4" />
            <h2 className="text-3xl font-bold">Text Alchemist</h2>
          </div>
          
          <h3 className="text-2xl font-semibold mb-6">
            AI Text Humanizer with Best-in-Class Detection Avoidance
          </h3>
          
          <ul className="space-y-3">
            {[
              "Transform AI-generated text to evade AI detection",
              "Best-in-class AI detection avoidance",
              "Enterprise-grade plagiarism checking",
              "Multiple writing styles: Academic, Creative, Professional & more",
              "Save your humanization history for future reference",
              "Private mode - your data stays in your browser"
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;