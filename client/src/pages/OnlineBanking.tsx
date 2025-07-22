import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Smartphone, Shield, Clock, Download, CreditCard, PiggyBank, Send, Receipt } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function OnlineBanking() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would authenticate with backend
    setIsLoggedIn(true);
    toast({
      title: "Login Successful",
      description: "Welcome to your internet banking dashboard",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  if (isLoggedIn) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold dark-green">Internet Banking Dashboard</h1>
                <p className="text-gray-600">Welcome back, John Doe</p>
              </div>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>

          {/* Account Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings Account</CardTitle>
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦1,248,500.00</div>
                <p className="text-xs text-muted-foreground">Available Balance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Account</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦542,300.00</div>
                <p className="text-xs text-muted-foreground">Available Balance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loan Balance</CardTitle>
                <Receipt className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦350,000.00</div>
                <p className="text-xs text-muted-foreground">Outstanding Amount</p>
              </CardContent>
            </Card>
          </div>

          {/* Banking Services */}
          <Tabs defaultValue="transfer" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
              <TabsTrigger value="bills">Bill Payment</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
              <TabsTrigger value="statements">Statements</TabsTrigger>
            </TabsList>

            <TabsContent value="transfer">
              <Card>
                <CardHeader>
                  <CardTitle>Transfer Funds</CardTitle>
                  <CardDescription>
                    Transfer money to other accounts within Lead City MFB or other banks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="from-account">From Account</Label>
                      <select id="from-account" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Savings Account - ₦1,248,500.00</option>
                        <option>Current Account - ₦542,300.00</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" placeholder="₦0.00" type="number" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Recipient Account Number</Label>
                    <Input id="account-number" placeholder="Enter 10-digit account number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank">Recipient Bank</Label>
                    <select id="bank" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>Lead City Microfinance Bank</option>
                      <option>Access Bank</option>
                      <option>GTBank</option>
                      <option>First Bank</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="narration">Narration</Label>
                    <Input id="narration" placeholder="Purpose of transfer" />
                  </div>
                  <Button className="w-full bg-brand-green hover:bg-dark-green">
                    <Send className="w-4 h-4 mr-2" />
                    Transfer Now
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bills">
              <Card>
                <CardHeader>
                  <CardTitle>Bill Payment</CardTitle>
                  <CardDescription>
                    Pay your utility bills, airtime, and other services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Electricity", "Water", "Internet", "Cable TV", "Airtime", "Data", "Insurance", "School Fees"].map((bill) => (
                      <Button key={bill} variant="outline" className="h-20 flex flex-col">
                        <div className="text-2xl mb-2">💡</div>
                        <span className="text-sm">{bill}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    View your recent account activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "Credit", amount: "+₦25,000", desc: "Salary Payment", date: "Today, 2:30 PM" },
                      { type: "Debit", amount: "-₦10,000", desc: "Transfer to John Smith", date: "Yesterday, 4:15 PM" },
                      { type: "Debit", amount: "-₦5,500", desc: "NEPA Electricity Bill", date: "Dec 20, 10:30 AM" },
                      { type: "Credit", amount: "+₦50,000", desc: "Business Loan Disbursement", date: "Dec 18, 9:00 AM" }
                    ].map((transaction, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'Credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                            <span className={transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'}>
                              {transaction.type === 'Credit' ? '+' : '-'}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold">{transaction.desc}</div>
                            <div className="text-sm text-gray-600">{transaction.date}</div>
                          </div>
                        </div>
                        <div className={`font-semibold ${transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statements">
              <Card>
                <CardHeader>
                  <CardTitle>Account Statements</CardTitle>
                  <CardDescription>
                    Download your account statements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="statement-account">Select Account</Label>
                      <select id="statement-account" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Savings Account</option>
                        <option>Current Account</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="statement-period">Period</Label>
                      <select id="statement-period" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Last 30 days</option>
                        <option>Last 3 months</option>
                        <option>Last 6 months</option>
                        <option>Last 12 months</option>
                      </select>
                    </div>
                  </div>
                  <Button className="w-full bg-brand-green hover:bg-dark-green">
                    <Download className="w-4 h-4 mr-2" />
                    Download Statement
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-light-green to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold dark-green mb-6">
              Internet Banking
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access your accounts anytime, anywhere with our secure online banking platform
            </p>
          </div>
        </div>
      </section>

      {/* Login & Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Login Form */}
            <div>
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl text-center dark-green">Login to Internet Banking</CardTitle>
                  <CardDescription className="text-center">
                    Enter your credentials to access your accounts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username / Account Number</Label>
                      <Input id="username" placeholder="Enter your username" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-brand-green hover:bg-dark-green">
                      Login
                    </Button>
                  </form>
                  
                  <div className="mt-6 text-center space-y-2">
                    <Button variant="link" className="text-brand-green">
                      Forgot Password?
                    </Button>
                    <div className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <Button variant="link" className="text-brand-green p-0">
                        Register Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold dark-green mb-6">
                  Why Choose Our Internet Banking?
                </h2>
                <p className="text-gray-600 mb-8">
                  Experience the convenience of managing your finances online with our secure and feature-rich platform.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark-green mb-2">Mobile Responsive</h3>
                    <p className="text-gray-600">Access your accounts from any device - desktop, tablet, or smartphone.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark-green mb-2">Bank-Level Security</h3>
                    <p className="text-gray-600">Your data is protected with 256-bit SSL encryption and multi-factor authentication.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark-green mb-2">24/7 Availability</h3>
                    <p className="text-gray-600">Bank anytime, anywhere with round-the-clock access to your accounts.</p>
                  </div>
                </div>
              </div>

              {/* Mobile App Download */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold dark-green mb-4">Download Our Mobile App</h3>
                <p className="text-gray-600 mb-4">Get even more features with our mobile banking app</p>
                <div className="flex space-x-3">
                  <a href="#" className="inline-block">
                    <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <div>
                        <div className="text-xs">Download on the</div>
                        <div className="text-sm font-semibold">App Store</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="inline-block">
                    <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <div>
                        <div className="text-xs">Get it on</div>
                        <div className="text-sm font-semibold">Google Play</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
