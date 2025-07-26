import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel!",
        });
        localStorage.setItem('adminAuth', 'true');
        onLogin();
      } else {
        // If admin doesn't exist, show setup mode
        if (response.status === 401 && !isSetup) {
          setIsSetup(true);
          toast({
            title: "Setup Required",
            description: "Create your admin account to get started.",
          });
        } else {
          toast({
            title: "Login Failed",
            description: data.message || "Invalid credentials",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Admin Created",
          description: "Your admin account has been created. Please login.",
        });
        setIsSetup(false);
        setFormData({ username: "", password: "" });
      } else {
        toast({
          title: "Setup Failed",
          description: data.message || "Failed to create admin account",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-brand-green rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isSetup ? "Setup Admin Account" : "Admin Login"}
          </CardTitle>
          <p className="text-gray-600">
            {isSetup 
              ? "Create your administrator account to manage the website"
              : "Enter your credentials to access the admin panel"
            }
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={isSetup ? handleSetup : handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="Enter username"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter password"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-brand-green hover:bg-dark-green"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : (isSetup ? "Create Admin Account" : "Login")}
            </Button>

            {isSetup && (
              <Button 
                type="button" 
                variant="outline"
                className="w-full"
                onClick={() => setIsSetup(false)}
              >
                Back to Login
              </Button>
            )}
          </form>

          {!isSetup && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                First time here?{' '}
                <button 
                  onClick={() => setIsSetup(true)}
                  className="text-brand-green hover:underline"
                >
                  Setup Admin Account
                </button>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}