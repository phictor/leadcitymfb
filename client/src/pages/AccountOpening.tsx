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
  UserPlus, 
  Upload, 
  Check, 
  PiggyBank, 
  CreditCard, 
  FileText,
  Shield,
  Clock,
  Phone
} from "lucide-react";
import { insertAccountApplicationSchema, type InsertAccountApplication } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PRODUCTS } from "@/lib/constants";

export default function AccountOpening() {
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<InsertAccountApplication>({
    resolver: zodResolver(insertAccountApplicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      idType: "",
      idNumber: "",
      accountType: "",
      initialDeposit: 0,
    },
  });

  const accountMutation = useMutation({
    mutationFn: async (data: InsertAccountApplication) => {
      const response = await apiRequest("POST", "/api/account-applications", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Application Submitted Successfully",
        description: "Your account opening application has been received. We'll contact you within 24 hours.",
      });
      setApplicationSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertAccountApplication) => {
    accountMutation.mutate(data);
  };

  const handleAccountSelect = (accountType: string) => {
    setSelectedAccount(accountType);
    form.setValue("accountType", accountType);
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
              Application Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for choosing Lead City Microfinance Bank. Your account opening application has been received and is being processed.
            </p>
            <div className="bg-light-green rounded-lg p-4 mb-6">
              <h3 className="font-semibold dark-green mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-brand-green" />
                  We'll review your application within 24 hours
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-brand-green" />
                  Our team will contact you for document verification
                </li>
                <li className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-brand-green" />
                  Your account will be activated upon successful verification
                </li>
              </ul>
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
            Open Your Account Today
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers and start your financial journey with Lead City MFB
          </p>
        </div>

        <Tabs defaultValue="choose" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="choose">Choose Account</TabsTrigger>
            <TabsTrigger value="apply" disabled={!selectedAccount}>Application</TabsTrigger>
            <TabsTrigger value="documents" disabled={!selectedAccount}>Documents</TabsTrigger>
          </TabsList>

          {/* Account Selection */}
          <TabsContent value="choose">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold dark-green mb-4">Choose Your Account Type</h2>
                <p className="text-gray-600">Select the account that best fits your financial needs</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {PRODUCTS.filter(p => p.id === 'savings' || p.id === 'current').map((product) => (
                  <Card 
                    key={product.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedAccount === product.id ? 'ring-2 ring-brand-green bg-light-green' : ''
                    }`}
                    onClick={() => handleAccountSelect(product.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center">
                          {product.id === 'savings' ? 
                            <PiggyBank className="w-6 h-6 text-white" /> : 
                            <CreditCard className="w-6 h-6 text-white" />
                          }
                        </div>
                        {selectedAccount === product.id && (
                          <Badge className="bg-brand-green">Selected</Badge>
                        )}
                      </div>
                      <CardTitle className="dark-green">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <Check className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedAccount && (
                <div className="text-center">
                  <Button 
                    onClick={() => {
                      const tabElement = document.querySelector('[value="apply"]') as HTMLElement;
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

          {/* Application Form */}
          <TabsContent value="apply">
            <Card>
              <CardHeader>
                <CardTitle className="dark-green">Personal Information</CardTitle>
                <CardDescription>
                  Please provide your personal details accurately
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Residential Address *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your full residential address"
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
                      <h3 className="text-lg font-semibold dark-green">Identification</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="idType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ID Type *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select ID type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="national-id">National ID Card</SelectItem>
                                  <SelectItem value="drivers-license">Driver's License</SelectItem>
                                  <SelectItem value="passport">International Passport</SelectItem>
                                  <SelectItem value="voters-card">Voter's Card</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="idNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ID Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your ID number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold dark-green">Account Details</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label>Selected Account Type</Label>
                          <div className="mt-2 p-3 bg-light-green rounded-lg">
                            <span className="font-semibold dark-green">
                              {PRODUCTS.find(p => p.id === selectedAccount)?.name}
                            </span>
                          </div>
                        </div>
                        <FormField
                          control={form.control}
                          name="initialDeposit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Initial Deposit Amount *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder={selectedAccount === 'savings' ? '1,000' : '5,000'}
                                  {...field} 
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                              <p className="text-sm text-gray-600 mt-1">
                                Minimum: ₦{selectedAccount === 'savings' ? '1,000' : '5,000'}
                              </p>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-brand-green hover:bg-dark-green text-lg py-6"
                      disabled={accountMutation.isPending}
                    >
                      {accountMutation.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-5 h-5 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Upload */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="dark-green">Required Documents</CardTitle>
                <CardDescription>
                  Upload clear copies of the following documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Valid ID Document",
                      description: "Upload a clear copy of your selected ID type",
                      required: true
                    },
                    {
                      title: "Passport Photograph",
                      description: "Recent passport-sized photograph",
                      required: true
                    },
                    {
                      title: "Proof of Address",
                      description: "Utility bill or bank statement (not older than 3 months)",
                      required: true
                    },
                    {
                      title: "Additional Documents",
                      description: "Any other supporting documents",
                      required: false
                    }
                  ].map((doc, index) => (
                    <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-green transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-semibold dark-green mb-2">
                        {doc.title} {doc.required && <span className="text-red-500">*</span>}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                      <Button variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                        <FileText className="w-4 h-4 mr-2" />
                        Upload File
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Document Guidelines</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• All documents must be clear and readable</li>
                    <li>• Accepted formats: PDF, JPG, PNG (Max 5MB per file)</li>
                    <li>• Ensure all information is visible and not cut off</li>
                    <li>• Documents should not be older than 6 months (except ID)</li>
                  </ul>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    You can also bring these documents to any of our branches for verification
                  </p>
                  <Button className="bg-brand-green hover:bg-dark-green">
                    Complete Document Submission
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
