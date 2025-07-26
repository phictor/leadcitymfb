import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Calendar, User, Eye, Mail, Phone, Building, DollarSign, FileText, Clock, LogOut, Settings, Home, MapPin, CreditCard } from "lucide-react";
import { useNewsArticles, useCreateNewsArticle, useUpdateNewsArticle, useDeleteNewsArticle, type NewsArticle } from "@/hooks/useNews";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import HomepageContentManager from "@/components/HomepageContentManager";
import ContactPageManager from "@/components/ContactPageManager";
import ProductPageManager from "@/components/ProductPageManager";
import AboutPageManager from "@/components/AboutPageManager";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch data
  const { data: articles = [], isLoading, refetch } = useNewsArticles();
  
  // Fetch applications and messages
  const { data: accountApplications = [] } = useQuery({
    queryKey: ['account-applications'],
    queryFn: async () => {
      const response = await fetch('/api/account-applications');
      return response.ok ? response.json() : [];
    }
  });

  const { data: loanApplications = [] } = useQuery({
    queryKey: ['loan-applications'], 
    queryFn: async () => {
      const response = await fetch('/api/loan-applications');
      return response.ok ? response.json() : [];
    }
  });

  const { data: contactMessages = [] } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const response = await fetch('/api/contact-messages');
      return response.ok ? response.json() : [];
    }
  });



  // Mutations
  const createMutation = useCreateNewsArticle();
  const updateMutation = useUpdateNewsArticle();
  const deleteMutation = useDeleteNewsArticle();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "Technology" as "Technology" | "Education" | "Business" | "Security",
    author: "",
    publishDate: "",
    readTime: "",
    featured: false,
    image: "",
    slug: ""
  });

  const resetForm = () => {
    setFormData({
      title: "",
      summary: "",
      content: "",
      category: "Technology" as "Technology" | "Education" | "Business" | "Security",
      author: "",
      publishDate: "",
      readTime: "",
      featured: false,
      image: "",
      slug: ""
    });
    setSelectedArticle(null);
  };

  const openEditDialog = (article: NewsArticle) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      summary: article.summary,
      content: article.content,
      category: article.category,
      author: article.author,
      publishDate: article.publishDate,
      readTime: article.readTime,
      featured: article.featured || false,
      image: article.image || "",
      slug: article.slug
    });
    setIsDialogOpen(true);
  };



  const handleArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedArticle) {
      updateMutation.mutate({
        id: selectedArticle.id,
        ...formData
      }, {
        onSuccess: () => {
          setIsDialogOpen(false);
          resetForm();
          toast({
            title: "Article Updated",
            description: "Article has been updated successfully.",
          });
        }
      });
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          setIsDialogOpen(false);
          resetForm();
          toast({
            title: "Article Created",
            description: "New article has been created successfully.",
          });
        }
      });
    }
  };

  const handleDeleteArticle = (id: number) => {
    if (confirm("Are you sure you want to delete this article?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast({
            title: "Article Deleted",
            description: "Article has been deleted successfully.",
          });
        }
      });
    }
  };



  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage your Lead City MFB website content</p>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="about">About Us</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">News Articles ({articles.length})</h2>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-brand-green hover:bg-dark-green"
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Article
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedArticle ? "Edit Article" : "Create New Article"}
                    </DialogTitle>
                    <DialogDescription>
                      {selectedArticle ? "Update the article details below." : "Fill in the form below to create a new news article."}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleArticleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Article title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          placeholder="Author name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value: "Technology" | "Education" | "Business" | "Security") => setFormData({ ...formData, category: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Security">Security</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="publishDate">Publish Date</Label>
                        <Input
                          id="publishDate"
                          type="date"
                          value={formData.publishDate}
                          onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="readTime">Read Time</Label>
                        <Input
                          id="readTime"
                          value={formData.readTime}
                          onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                          placeholder="5 min read"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="summary">Summary</Label>
                      <Textarea
                        id="summary"
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        placeholder="Brief article summary"
                        rows={2}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Article content (HTML supported)"
                        rows={8}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="image">Image URL (optional)</Label>
                        <Input
                          id="image"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div>
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          placeholder="article-url-slug"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="rounded"
                      />
                      <Label htmlFor="featured">Featured Article</Label>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button 
                        type="submit" 
                        className="flex-1 bg-brand-green hover:bg-dark-green"
                        disabled={createMutation.isPending || updateMutation.isPending}
                      >
                        {createMutation.isPending || updateMutation.isPending 
                          ? "Saving..." 
                          : selectedArticle ? "Update Article" : "Create Article"
                        }
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{article.title}</h3>
                        {article.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                        )}
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{article.summary}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {article.publishDate}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openEditDialog(article)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteArticle(article.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="homepage" className="space-y-6">
            <HomepageContentManager />
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <ContactPageManager />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <ProductPageManager />
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <AboutPageManager />
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Account Applications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Account Applications ({accountApplications.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {accountApplications.slice(0, 5).map((app: any) => (
                      <div key={app.id} className="border rounded p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{app.firstName} {app.lastName}</h4>
                            <p className="text-sm text-gray-600">{app.email}</p>
                            <div className="flex items-center mt-2">
                              <Badge variant={app.status === 'pending' ? 'secondary' : 'default'}>
                                {app.status}
                              </Badge>
                              <span className="text-xs text-gray-500 ml-2">
                                {app.accountType}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    {accountApplications.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No applications yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Loan Applications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Loan Applications ({loanApplications.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {loanApplications.slice(0, 5).map((app: any) => (
                      <div key={app.id} className="border rounded p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{app.firstName} {app.lastName}</h4>
                            <p className="text-sm text-gray-600">{app.businessName}</p>
                            <div className="flex items-center mt-2">
                              <Badge variant={app.status === 'pending' ? 'secondary' : 'default'}>
                                {app.status}
                              </Badge>
                              <span className="text-xs text-gray-500 ml-2">
                                ₦{app.loanAmount?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    {loanApplications.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No applications yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Messages ({contactMessages.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactMessages.map((message: any) => (
                    <Card key={message.id} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{message.firstName} {message.lastName}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {message.email}
                            </div>
                            {message.phone && (
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                {message.phone}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={message.status === 'new' ? 'secondary' : 'default'}>
                            {message.status}
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <h5 className="font-medium text-sm">Subject: {message.subject}</h5>
                      </div>
                      <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {message.message}
                      </div>
                    </Card>
                  ))}
                  {contactMessages.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No messages yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-brand-green" />
                    Articles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{articles.length}</div>
                  <p className="text-sm text-gray-600">Published articles</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Account Apps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{accountApplications.length}</div>
                  <p className="text-sm text-gray-600">Account applications</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-orange-600" />
                    Loan Apps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{loanApplications.length}</div>
                  <p className="text-sm text-gray-600">Loan applications</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-purple-600" />
                    Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contactMessages.length}</div>
                  <p className="text-sm text-gray-600">Contact messages</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>


      </div>
    </div>
  );
}
