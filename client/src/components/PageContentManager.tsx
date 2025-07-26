import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Image, Type, Star, Users, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { PageContentSection } from "@shared/schema";

interface PageContentManagerProps {
  pageId: string;
  pageName: string;
}

interface SectionFormData {
  sectionType: "hero" | "feature" | "testimonial" | "gallery" | "text" | "cta";
  title: string;
  content: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  orderIndex: number;
  isVisible: boolean;
  metadata?: string;
}

const sectionTypeIcons = {
  hero: Star,
  feature: Type,
  testimonial: Users,
  gallery: Image,
  text: Type,
  cta: Star
};

const sectionTypeLabels = {
  hero: "Hero Section",
  feature: "Feature Section", 
  testimonial: "Testimonial",
  gallery: "Image Gallery",
  text: "Text Content",
  cta: "Call to Action"
};

export default function PageContentManager({ pageId, pageName }: PageContentManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<PageContentSection | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch page content sections
  const { data: sections = [], isLoading, refetch } = useQuery({
    queryKey: ['page-content-sections', pageId],
    queryFn: async () => {
      const response = await fetch(`/api/page-content-sections/${pageId}`);
      return response.ok ? response.json() : [];
    }
  });

  // Form state
  const [formData, setFormData] = useState<SectionFormData>({
    sectionType: "text",
    title: "",
    content: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    orderIndex: 0,
    isVisible: true,
    metadata: ""
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: async (data: SectionFormData) => {
      const response = await fetch('/api/page-content-sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, pageId })
      });
      if (!response.ok) throw new Error('Failed to create section');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-content-sections', pageId] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Section Created",
        description: "New section has been created successfully.",
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: SectionFormData }) => {
      const response = await fetch(`/api/page-content-sections/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, pageId })
      });
      if (!response.ok) throw new Error('Failed to update section');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-content-sections', pageId] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Section Updated",
        description: "Section has been updated successfully.",
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/page-content-sections/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete section');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-content-sections', pageId] });
      toast({
        title: "Section Deleted",
        description: "Section has been deleted successfully.",
      });
    }
  });

  const resetForm = () => {
    setFormData({
      sectionType: "text",
      title: "",
      content: "",
      image: "",
      buttonText: "",
      buttonLink: "",
      orderIndex: sections.length,
      isVisible: true,
      metadata: ""
    });
    setSelectedSection(null);
  };

  const openEditDialog = (section: PageContentSection) => {
    setSelectedSection(section);
    setFormData({
      sectionType: section.sectionType as any,
      title: section.title,
      content: section.content,
      image: section.image || "",
      buttonText: section.buttonText || "",
      buttonLink: section.buttonLink || "",
      orderIndex: section.orderIndex,
      isVisible: section.isVisible ?? true,
      metadata: section.metadata || ""
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSection) {
      updateMutation.mutate({
        id: selectedSection.id,
        data: formData
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this section?")) {
      deleteMutation.mutate(id);
    }
  };

  const moveSection = (id: number, direction: 'up' | 'down') => {
    const section = sections.find((s: PageContentSection) => s.id === id);
    if (!section) return;

    const newOrderIndex = direction === 'up' ? section.orderIndex - 1 : section.orderIndex + 1;
    
    updateMutation.mutate({
      id,
      data: {
        ...section,
        orderIndex: newOrderIndex
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Manage {pageName} Content</h3>
          <p className="text-gray-600 text-sm">Add and edit sections with images, text, and interactive elements</p>
        </div>
        
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
              Add Section
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedSection ? "Edit Section" : "Add New Section"}
              </DialogTitle>
              <DialogDescription>
                Create structured content with images, text, and interactive elements.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sectionType">Section Type</Label>
                  <Select 
                    value={formData.sectionType} 
                    onValueChange={(value: any) => setFormData({ ...formData, sectionType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero">Hero Section</SelectItem>
                      <SelectItem value="feature">Feature Section</SelectItem>
                      <SelectItem value="text">Text Content</SelectItem>
                      <SelectItem value="gallery">Image Gallery</SelectItem>
                      <SelectItem value="testimonial">Testimonial</SelectItem>
                      <SelectItem value="cta">Call to Action</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="orderIndex">Order Position</Label>
                  <Input
                    id="orderIndex"
                    type="number"
                    value={formData.orderIndex}
                    onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) })}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Section Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter section title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Section Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter section content (HTML supported)"
                  rows={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {(formData.sectionType === 'cta' || formData.sectionType === 'hero') && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input
                      id="buttonText"
                      value={formData.buttonText}
                      onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                      placeholder="Get Started"
                    />
                  </div>
                  <div>
                    <Label htmlFor="buttonLink">Button Link</Label>
                    <Input
                      id="buttonLink"
                      value={formData.buttonLink}
                      onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                      placeholder="/contact"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="metadata">Additional Settings (JSON)</Label>
                <Textarea
                  id="metadata"
                  value={formData.metadata}
                  onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
                  placeholder='{"backgroundColor": "#f0f0f0", "textAlign": "center"}'
                  rows={2}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="isVisible">Section is visible</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-brand-green hover:bg-dark-green"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending 
                    ? "Saving..." 
                    : selectedSection ? "Update Section" : "Create Section"
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

      <div className="space-y-4">
        {sections.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-gray-500">
              <Type className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No sections yet</h3>
              <p className="text-sm mb-4">Create your first content section to get started</p>
              <Button onClick={() => setIsDialogOpen(true)} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add First Section
              </Button>
            </div>
          </Card>
        ) : (
          sections
            .sort((a: PageContentSection, b: PageContentSection) => a.orderIndex - b.orderIndex)
            .map((section: PageContentSection) => {
              const IconComponent = sectionTypeIcons[section.sectionType as keyof typeof sectionTypeIcons];
              
              return (
                <Card key={section.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="w-5 h-5 text-brand-green" />
                        <h4 className="text-lg font-semibold">{section.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {sectionTypeLabels[section.sectionType as keyof typeof sectionTypeLabels]}
                          </Badge>
                          {!section.isVisible && (
                            <Badge variant="secondary" className="text-gray-500">
                              <EyeOff className="w-3 h-3 mr-1" />
                              Hidden
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{section.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Order: {section.orderIndex}</span>
                        {section.image && (
                          <div className="flex items-center">
                            <Image className="w-4 h-4 mr-1" />
                            Image included
                          </div>
                        )}
                        {section.buttonText && (
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            Button: {section.buttonText}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <div className="flex flex-col gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => moveSection(section.id, 'up')}
                          disabled={section.orderIndex === 0}
                        >
                          <ArrowUp className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => moveSection(section.id, 'down')}
                          disabled={section.orderIndex === sections.length - 1}
                        >
                          <ArrowDown className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openEditDialog(section)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(section.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
        )}
      </div>
    </div>
  );
}