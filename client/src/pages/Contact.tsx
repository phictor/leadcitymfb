import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, MessageCircle, Send, Clock } from "lucide-react";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { BANK_INFO } from "@/lib/constants";

interface ContactInfo {
  id: number;
  sectionKey: string;
  title: string;
  content: string;
  imageUrl?: string;
  metadata?: string;
  isActive: boolean;
}

export default function Contact() {
  const { toast } = useToast();
  
  // Fetch contact information from database
  const { data: contactInfo = [], isLoading: isLoadingContact } = useQuery({
    queryKey: ['/api/contact-info'],
  });
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Group contact info by section
  const groupedInfo = (contactInfo as ContactInfo[]).reduce((acc: Record<string, ContactInfo[]>, item: ContactInfo) => {
    if (!acc[item.sectionKey]) acc[item.sectionKey] = [];
    acc[item.sectionKey].push(item);
    return acc;
  }, {});

  const getContactInfoBySection = (sectionKey: string) => {
    return groupedInfo[sectionKey] || [];
  };

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact-messages", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${BANK_INFO.whatsapp.replace(/\D/g, '')}?text=Hello, I would like to inquire about your banking services.`;
    window.open(whatsappUrl, '_blank');
  };

  const headerInfo = getContactInfoBySection('header')[0];
  const addressInfo = getContactInfoBySection('address');
  const phoneInfo = getContactInfoBySection('phone');
  const emailInfo = getContactInfoBySection('email');
  const hoursInfo = getContactInfoBySection('hours');

  if (isLoadingContact) {
    return <div className="pt-16 flex items-center justify-center h-64">Loading contact information...</div>;
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-light-green to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold dark-green mb-6">
              {headerInfo?.title || "Contact Us"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {headerInfo?.content || "Get in touch with us for all your banking needs. We're here to help you achieve your financial goals."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Address Information */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold dark-green mb-2">
                  {addressInfo[0]?.title || "Our Location"}
                </h3>
                <p className="text-gray-600">
                  {addressInfo[0]?.content || BANK_INFO.address}
                </p>
              </CardContent>
            </Card>

            {/* Phone Information */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold dark-green mb-2">
                  {phoneInfo[0]?.title || "Phone Numbers"}
                </h3>
                <div className="space-y-1">
                  {phoneInfo.length > 0 ? (
                    phoneInfo.map((phone) => (
                      <p key={phone.id} className="text-gray-600">{phone.content}</p>
                    ))
                  ) : (
                    <>
                      <p className="text-gray-600">{BANK_INFO.phone}</p>
                      <p className="text-gray-600">{BANK_INFO.whatsapp}</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Email Information */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold dark-green mb-2">
                  {emailInfo[0]?.title || "Email Address"}
                </h3>
                <div className="space-y-1">
                  {emailInfo.length > 0 ? (
                    emailInfo.map((email) => (
                      <p key={email.id} className="text-gray-600">{email.content}</p>
                    ))
                  ) : (
                    <p className="text-gray-600">{BANK_INFO.email}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Hours */}
          {hoursInfo.length > 0 && (
            <Card className="mb-16">
              <CardHeader>
                <CardTitle className="flex items-center text-center justify-center">
                  <Clock className="w-6 h-6 mr-2 text-brand-green" />
                  {hoursInfo[0]?.title || "Business Hours"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  {hoursInfo.map((hour) => (
                    <p key={hour.id} className="text-gray-600">{hour.content}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold dark-green mb-4">Send Us a Message</h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-brand-green" />
                  Contact Form
                </CardTitle>
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
                              <Input type="email" placeholder="Enter your email" {...field} />
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
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject *</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="account-inquiry">Account Inquiry</SelectItem>
                                <SelectItem value="loan-inquiry">Loan Inquiry</SelectItem>
                                <SelectItem value="technical-support">Technical Support</SelectItem>
                                <SelectItem value="complaint">Complaint</SelectItem>
                                <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe your inquiry or message"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-brand-green hover:bg-dark-green text-white"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-4">
              Need immediate assistance? Connect with us on WhatsApp
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white"
              size="lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}