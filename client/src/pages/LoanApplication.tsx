import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  Upload, 
  Check, 
  User, 
  Leaf, 
  FileText,
  Building,
  DollarSign,
  Calculator,
  Shield
} from "lucide-react";
import { insertLoanApplicationSchema, type InsertLoanApplication } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { LOAN_PRODUCTS } from "@/lib/constants";

export default function LoanApplication() {
  const [selectedLoan, setSelectedLoan] = useState<string>("");
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<InsertLoanApplication>({
    resolver: zodResolver(insertLoanApplicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      businessName: "",
      businessType: "",
      businessAddress: "",
      loanAmount: 0,
      loanPurpose: "",
      monthlyIncome: 0,
      monthlyExpenses: 0,
      existingLoans: "",
      collateralType: "",
      collateralValue: 0,
    },
  });

  const loanMutation = useMutation({
    mutationFn: async (data: InsertLoanApplication) => {
      const response = await apiRequest("POST", "/api/loan-applications", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Loan Application Submitted",
        description: "Your loan application has been received and is under review.",
      });
      setApplicationSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit loan application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertLoanApplication) => {
    loanMutation.mutate(data);
  };

  const handleLoanSelect = (loanType: string) => {
    setSelectedLoan(loanType);
  };

  const getIconForLoan = (loanId: string) => {
    switch (loanId) {
      case 'business':
        return <TrendingUp className="w-6 h-6 text-white" />;
      case 'personal':
        return <User className="w-6 h-6 text-white" />;
      case 'agriculture':
        return <Leaf className="w-6 h-6 text-white" />;
      default:
        return <TrendingUp className="w-6 h-6 text-white" />;
    }
  };

  if (applicationSubmitted) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-2xl mx-4">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold dark-green mb-4">
              Loan Application Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for applying for a loan with Lead City Microfinance Bank. Your application is now under review.
            </p>
            <div className="bg-light-green rounded-lg p-4 mb-6">
              <h3 className="font-semibold dark-green mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-brand-green" />
                  Application review within 3-5 business days
                </li>
                <li className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-brand-green" />
                  Credit assessment and verification process
                </li>
                <li className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-brand-green" />
                  Loan approval and disbursement notification
                </li>
              </ul>
            </div>
            <div className="text-sm text-gray-600 mb-6">
              Application Reference: <span className="font-mono font-semibold">LCM{Date.now().toString().slice(-6)}</span>
            </div>
            <Button 
              onClick={() => window.location.href = "/"}
              className="bg-brand-green hover:bg-dark-green"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold dark-green mb-4">
            Apply for a Loan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the financing you need to grow your business or meet your personal goals
          </p>
        </div>

        <Tabs defaultValue="choose" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="choose">Choose Loan</TabsTrigger>
            <TabsTrigger value="personal" disabled={!selectedLoan}>Personal Info</TabsTrigger>
            <TabsTrigger value="business" disabled={!selectedLoan}>Business Details</TabsTrigger>
            <TabsTrigger value="financial" disabled={!selectedLoan}>Financial Info</TabsTrigger>
          </TabsList>

          {/* Loan Selection */}
          <TabsContent value="choose">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold dark-green mb-4">Choose Your Loan Type</h2>
                <p className="text-gray-600">Select the loan product that best meets your needs</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {LOAN_PRODUCTS.map((loan) => (
                  <Card 
                    key={loan.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedLoan === loan.id ? 'ring-2 ring-brand-green bg-light-green' : ''
                    }`}
                    onClick={() => handleLoanSelect(loan.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center">
                          {getIconForLoan(loan.id)}
                        </div>
                        {selectedLoan === loan.id && (
                          <Badge className="bg-brand-green">Selected</Badge>
                        )}
                      </div>
                      <CardTitle className="dark-green">{loan.name}</CardTitle>
                      <CardDescription>{loan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Maximum Amount:</span>
                          <span className="font-semibold">₦{loan.maxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Interest Rate:</span>
                          <span className="font-semibold">{loan.interestRate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tenure:</span>
                          <span className="font-semibold">{loan.tenure}</span>
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {loan.features.slice(0, 2).map((feature, index) => (
                          <li key={index} className="flex items-center text-xs text-gray-600">
                            <Check className="w-3 h-3 text-brand-green mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedLoan && (
                <div className="text-center">
                  <Button 
                    onClick={() => {
                      const tabElement = document.querySelector('[value="personal"]') as HTMLElement;
                      tabElement?.click();
                    }}
                    className="bg-brand-green hover:bg-dark-green"
                  >
                    Continue to Application
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="dark-green">Personal Information</CardTitle>
                <CardDescription>
                  Please provide your personal contact details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your first name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+234 800 000 0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Details */}
          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle className="dark-green">Business Information</CardTitle>
                <CardDescription>
                  Tell us about your business or income source
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business/Employer Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter business or employer name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="trading">Trading/Commerce</SelectItem>
                                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                <SelectItem value="services">Services</SelectItem>
                                <SelectItem value="agriculture">Agriculture/Farming</SelectItem>
                                <SelectItem value="transport">Transportation</SelectItem>
                                <SelectItem value="construction">Construction</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="businessAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Address *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your business address"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="loanAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loan Amount Needed *</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Enter amount in Naira"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                            {selectedLoan && (
                              <p className="text-sm text-gray-600">
                                Maximum: ₦{LOAN_PRODUCTS.find(l => l.id === selectedLoan)?.maxAmount.toLocaleString()}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="loanPurpose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Purpose of Loan *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select loan purpose" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="business-expansion">Business Expansion</SelectItem>
                                <SelectItem value="working-capital">Working Capital</SelectItem>
                                <SelectItem value="equipment-purchase">Equipment Purchase</SelectItem>
                                <SelectItem value="inventory">Inventory Stocking</SelectItem>
                                <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                                <SelectItem value="personal-needs">Personal Needs</SelectItem>
                                <SelectItem value="agriculture">Agricultural Activities</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Information */}
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle className="dark-green">Financial Information</CardTitle>
                <CardDescription>
                  Help us understand your financial capacity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="monthlyIncome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Income *</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Enter monthly income"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="monthlyExpenses"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Expenses *</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Enter monthly expenses"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="existingLoans"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Existing Loans (if any)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe any existing loans, their amounts and monthly payments"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold dark-green">Collateral Information</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="collateralType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Collateral Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select collateral type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="property">Real Estate/Property</SelectItem>
                                  <SelectItem value="vehicle">Vehicle</SelectItem>
                                  <SelectItem value="equipment">Business Equipment</SelectItem>
                                  <SelectItem value="inventory">Business Inventory</SelectItem>
                                  <SelectItem value="savings">Savings/Fixed Deposit</SelectItem>
                                  <SelectItem value="guarantor">Personal Guarantor</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                  <SelectItem value="none">No Collateral</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="collateralValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estimated Collateral Value</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Enter estimated value"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Loan Summary */}
                    <div className="bg-light-green rounded-lg p-6">
                      <h3 className="font-semibold dark-green mb-4 flex items-center">
                        <Calculator className="w-5 h-5 mr-2" />
                        Loan Summary
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Loan Type:</span>
                          <div className="font-semibold">
                            {selectedLoan ? LOAN_PRODUCTS.find(l => l.id === selectedLoan)?.name : 'Not selected'}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Interest Rate:</span>
                          <div className="font-semibold">
                            {selectedLoan ? LOAN_PRODUCTS.find(l => l.id === selectedLoan)?.interestRate : 'N/A'}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Requested Amount:</span>
                          <div className="font-semibold">₦{form.watch('loanAmount')?.toLocaleString() || '0'}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Repayment Period:</span>
                          <div className="font-semibold">
                            {selectedLoan ? LOAN_PRODUCTS.find(l => l.id === selectedLoan)?.tenure : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Important Notes</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• All information provided will be verified</li>
                        <li>• Loan approval is subject to credit assessment</li>
                        <li>• Processing may take 3-5 business days</li>
                        <li>• Additional documents may be requested</li>
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-brand-green hover:bg-dark-green text-lg py-6"
                      disabled={loanMutation.isPending}
                    >
                      {loanMutation.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <FileText className="w-5 h-5 mr-2" />
                          Submit Loan Application
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
