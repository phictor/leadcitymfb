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
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Eye, Move, Image, Link, Palette, BarChart3, HelpCircle, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Types for homepage content
interface HeroSlide {
  id?: number;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage: string;
  heroImage?: string;
  backgroundColor: string;
  statistic1Value?: string;
  statistic1Label?: string;
  statistic2Value?: string;
  statistic2Label?: string;
  statistic3Value?: string;
  statistic3Label?: string;
  isActive: boolean;
  sortOrder: number;
}

interface ProductCard {
  id?: number;
  title: string;
  description: string;
  features: string; // JSON string
  buttonText: string;
  buttonLink: string;
  iconName: string;
  backgroundColor: string;
  isActive: boolean;
  sortOrder: number;
}

interface FaqItem {
  id?: number;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
}

export default function HomepageContentManager() {
  const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isFaqDialogOpen, setIsFaqDialogOpen] = useState(false);
  const [selectedHeroSlide, setSelectedHeroSlide] = useState<HeroSlide | null>(null);
  const [selectedProductCard, setSelectedProductCard] = useState<ProductCard | null>(null);
  const [selectedFaqItem, setSelectedFaqItem] = useState<FaqItem | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch data
  const { data: heroSlides = [], isLoading: heroLoading } = useQuery({
    queryKey: ['hero-slides'],
    queryFn: async () => {
      const response = await fetch('/api/hero-slides');
      return response.ok ? response.json() : [];
    }
  });

  const { data: productCards = [], isLoading: productLoading } = useQuery({
    queryKey: ['product-cards'],
    queryFn: async () => {
      const response = await fetch('/api/product-cards');
      return response.ok ? response.json() : [];
    }
  });

  const { data: faqItems = [], isLoading: faqLoading } = useQuery({
    queryKey: ['faq-items'],
    queryFn: async () => {
      const response = await fetch('/api/faq-items');
      return response.ok ? response.json() : [];
    }
  });

  // Hero slide mutations
  const createHeroSlideMutation = useMutation({
    mutationFn: (data: Omit<HeroSlide, 'id'>) => apiRequest('/api/hero-slides', { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-slides'] });
      setIsHeroDialogOpen(false);
      setSelectedHeroSlide(null);
      toast({ title: "Hero slide created successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to create hero slide", variant: "destructive" });
    }
  });

  const updateHeroSlideMutation = useMutation({
    mutationFn: ({ id, ...data }: HeroSlide) => apiRequest(`/api/hero-slides/${id}`, { method: 'PUT', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-slides'] });
      setIsHeroDialogOpen(false);
      setSelectedHeroSlide(null);
      toast({ title: "Hero slide updated successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to update hero slide", variant: "destructive" });
    }
  });

  const deleteHeroSlideMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/hero-slides/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-slides'] });
      toast({ title: "Hero slide deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to delete hero slide", variant: "destructive" });
    }
  });

  // Product card mutations (similar pattern)
  const createProductCardMutation = useMutation({
    mutationFn: (data: Omit<ProductCard, 'id'>) => apiRequest('/api/product-cards', { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-cards'] });
      setIsProductDialogOpen(false);
      setSelectedProductCard(null);
      toast({ title: "Product card created successfully!" });
    }
  });

  const updateProductCardMutation = useMutation({
    mutationFn: ({ id, ...data }: ProductCard) => apiRequest(`/api/product-cards/${id}`, { method: 'PUT', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-cards'] });
      setIsProductDialogOpen(false);
      setSelectedProductCard(null);
      toast({ title: "Product card updated successfully!" });
    }
  });

  const deleteProductCardMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/product-cards/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-cards'] });
      toast({ title: "Product card deleted successfully!" });
    }
  });

  // FAQ mutations (similar pattern)
  const createFaqMutation = useMutation({
    mutationFn: (data: Omit<FaqItem, 'id'>) => apiRequest('/api/faq-items', { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq-items'] });
      setIsFaqDialogOpen(false);
      setSelectedFaqItem(null);
      toast({ title: "FAQ item created successfully!" });
    }
  });

  const updateFaqMutation = useMutation({
    mutationFn: ({ id, ...data }: FaqItem) => apiRequest(`/api/faq-items/${id}`, { method: 'PUT', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq-items'] });
      setIsFaqDialogOpen(false);
      setSelectedFaqItem(null);
      toast({ title: "FAQ item updated successfully!" });
    }
  });

  const deleteFaqMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/faq-items/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq-items'] });
      toast({ title: "FAQ item deleted successfully!" });
    }
  });

  const HeroSlideForm = ({ slide, onSubmit, isLoading }: { slide?: HeroSlide; onSubmit: (data: any) => void; isLoading: boolean }) => {
    const [formData, setFormData] = useState<Omit<HeroSlide, 'id'>>({
      title: slide?.title || '',
      description: slide?.description || '',
      primaryButtonText: slide?.primaryButtonText || 'Open Account Now',
      primaryButtonLink: slide?.primaryButtonLink || '/account-opening',
      secondaryButtonText: slide?.secondaryButtonText || 'Apply for Loan',
      secondaryButtonLink: slide?.secondaryButtonLink || '/loan-application',
      backgroundImage: slide?.backgroundImage || 'from-emerald-600 to-emerald-800',
      heroImage: slide?.heroImage || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      backgroundColor: slide?.backgroundColor || 'from-emerald-600 to-emerald-800',
      statistic1Value: slide?.statistic1Value || '5000+',
      statistic1Label: slide?.statistic1Label || 'Happy Customers',
      statistic2Value: slide?.statistic2Value || '₦2B+',
      statistic2Label: slide?.statistic2Label || 'Loans Disbursed',
      statistic3Value: slide?.statistic3Value || '1',
      statistic3Label: slide?.statistic3Label || 'Branch Location',
      isActive: slide?.isActive ?? true,
      sortOrder: slide?.sortOrder || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Banking Made Simple for You"
              required
            />
          </div>
          <div>
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input
              id="sortOrder"
              type="number"
              value={formData.sortOrder}
              onChange={(e) => setFormData({...formData, sortOrder: Number(e.target.value)})}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Experience modern banking with Lead City Microfinance Bank..."
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primaryButtonText">Primary Button Text</Label>
            <Input
              id="primaryButtonText"
              value={formData.primaryButtonText}
              onChange={(e) => setFormData({...formData, primaryButtonText: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="primaryButtonLink">Primary Button Link</Label>
            <Input
              id="primaryButtonLink"
              value={formData.primaryButtonLink}
              onChange={(e) => setFormData({...formData, primaryButtonLink: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="secondaryButtonText">Secondary Button Text</Label>
            <Input
              id="secondaryButtonText"
              value={formData.secondaryButtonText || ''}
              onChange={(e) => setFormData({...formData, secondaryButtonText: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="secondaryButtonLink">Secondary Button Link</Label>
            <Input
              id="secondaryButtonLink"
              value={formData.secondaryButtonLink || ''}
              onChange={(e) => setFormData({...formData, secondaryButtonLink: e.target.value})}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="heroImage">Hero Image URL</Label>
          <Input
            id="heroImage"
            value={formData.heroImage || ''}
            onChange={(e) => setFormData({...formData, heroImage: e.target.value})}
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="statistic1Value">Statistic 1 Value</Label>
            <Input
              id="statistic1Value"
              value={formData.statistic1Value || ''}
              onChange={(e) => setFormData({...formData, statistic1Value: e.target.value})}
              placeholder="5000+"
            />
          </div>
          <div>
            <Label htmlFor="statistic1Label">Statistic 1 Label</Label>
            <Input
              id="statistic1Label"
              value={formData.statistic1Label || ''}
              onChange={(e) => setFormData({...formData, statistic1Label: e.target.value})}
              placeholder="Happy Customers"
            />
          </div>
          <div className="flex items-center space-x-2 pt-6">
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
            />
            <Label>Active</Label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="statistic2Value">Statistic 2 Value</Label>
            <Input
              id="statistic2Value"
              value={formData.statistic2Value || ''}
              onChange={(e) => setFormData({...formData, statistic2Value: e.target.value})}
              placeholder="₦2B+"
            />
          </div>
          <div>
            <Label htmlFor="statistic2Label">Statistic 2 Label</Label>
            <Input
              id="statistic2Label"
              value={formData.statistic2Label || ''}
              onChange={(e) => setFormData({...formData, statistic2Label: e.target.value})}
              placeholder="Loans Disbursed"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="statistic3Value">Statistic 3 Value</Label>
            <Input
              id="statistic3Value"
              value={formData.statistic3Value || ''}
              onChange={(e) => setFormData({...formData, statistic3Value: e.target.value})}
              placeholder="1"
            />
          </div>
          <div>
            <Label htmlFor="statistic3Label">Statistic 3 Label</Label>
            <Input
              id="statistic3Label"
              value={formData.statistic3Label || ''}
              onChange={(e) => setFormData({...formData, statistic3Label: e.target.value})}
              placeholder="Branch Location"
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Saving..." : slide ? "Update Hero Slide" : "Create Hero Slide"}
        </Button>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Homepage Content Management</h2>
          <p className="text-gray-600">Manage all homepage content including hero carousel, product cards, and FAQ sections</p>
        </div>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Hero Carousel
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Product Cards
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQ Section
          </TabsTrigger>
        </TabsList>

        {/* Hero Carousel Management */}
        <TabsContent value="hero" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Hero Carousel Slides</h3>
            <Dialog open={isHeroDialogOpen} onOpenChange={setIsHeroDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedHeroSlide(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Slide
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {selectedHeroSlide ? "Edit Hero Slide" : "Create New Hero Slide"}
                  </DialogTitle>
                  <DialogDescription>
                    Configure the hero carousel slide content, images, and call-to-action buttons.
                  </DialogDescription>
                </DialogHeader>
                <HeroSlideForm
                  slide={selectedHeroSlide || undefined}
                  onSubmit={selectedHeroSlide ? updateHeroSlideMutation.mutate : createHeroSlideMutation.mutate}
                  isLoading={createHeroSlideMutation.isPending || updateHeroSlideMutation.isPending}
                />
              </DialogContent>
            </Dialog>
          </div>

          {heroLoading ? (
            <div className="text-center py-8">Loading hero slides...</div>
          ) : (
            <div className="grid gap-4">
              {heroSlides.map((slide: HeroSlide) => (
                <Card key={slide.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{slide.title}</h4>
                        <Badge variant={slide.isActive ? "default" : "secondary"}>
                          {slide.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">Order: {slide.sortOrder}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{slide.description}</p>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span>Primary: {slide.primaryButtonText}</span>
                        {slide.secondaryButtonText && <span>• Secondary: {slide.secondaryButtonText}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedHeroSlide(slide);
                          setIsHeroDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => slide.id && deleteHeroSlideMutation.mutate(slide.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Product Cards Management */}
        <TabsContent value="products" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Product Cards</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Product Card
            </Button>
          </div>
          <div className="text-center py-8 text-gray-500">
            Product card management interface will be implemented here...
          </div>
        </TabsContent>

        {/* FAQ Management */}
        <TabsContent value="faq" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">FAQ Items</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New FAQ
            </Button>
          </div>
          <div className="text-center py-8 text-gray-500">
            FAQ management interface will be implemented here...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}