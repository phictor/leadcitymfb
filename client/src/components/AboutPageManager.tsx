import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Building, Users, Award, History } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface AboutSection {
  id: number;
  sectionType: string;
  title: string;
  content: string;
  imageUrl?: string;
  metadata?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function AboutPageManager() {
  const [editingSection, setEditingSection] = useState<AboutSection | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: aboutSections = [], isLoading } = useQuery({
    queryKey: ['/api/about-sections'],
  });

  const createAboutSection = useMutation({
    mutationFn: async (data: Omit<AboutSection, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await fetch('/api/about-sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create about section');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/about-sections'] });
      setIsDialogOpen(false);
      setEditingSection(null);
      toast({ title: "About section created successfully" });
    },
  });

  const updateAboutSection = useMutation({
    mutationFn: async ({ id, ...data }: AboutSection) => {
      const response = await fetch(`/api/about-sections/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update about section');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/about-sections'] });
      setIsDialogOpen(false);
      setEditingSection(null);
      toast({ title: "About section updated successfully" });
    },
  });

  const deleteAboutSection = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/about-sections/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete about section');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/about-sections'] });
      toast({ title: "About section deleted successfully" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      sectionType: formData.get('sectionType') as string,
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      imageUrl: formData.get('imageUrl') as string || undefined,
      metadata: formData.get('metadata') as string || undefined,
      isActive: formData.get('isActive') === 'on',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
    };

    if (editingSection) {
      updateAboutSection.mutate({ ...editingSection, ...data });
    } else {
      createAboutSection.mutate(data);
    }
  };

  const sectionTypes = [
    { value: 'mission', label: 'Mission Statement', icon: Building },
    { value: 'vision', label: 'Vision Statement', icon: Building },
    { value: 'values', label: 'Core Values', icon: Award },
    { value: 'history', label: 'Company History', icon: History },
    { value: 'team', label: 'Leadership Team', icon: Users },
    { value: 'achievement', label: 'Achievements', icon: Award },
    { value: 'culture', label: 'Company Culture', icon: Users },
    { value: 'overview', label: 'Company Overview', icon: Building },
  ];

  const groupedSections = aboutSections.reduce((acc: Record<string, AboutSection[]>, section: AboutSection) => {
    if (!acc[section.sectionType]) acc[section.sectionType] = [];
    acc[section.sectionType].push(section);
    return acc;
  }, {});

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading about sections...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">About Us Page Management</h2>
          <p className="text-muted-foreground">Manage company information, mission, vision, and team content</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingSection(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add About Section
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingSection ? 'Edit About Section' : 'Add About Section'}
                </DialogTitle>
                <DialogDescription>
                  {editingSection ? 'Update the about section details' : 'Add new content to the about page'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sectionType">Section Type</Label>
                    <Select name="sectionType" defaultValue={editingSection?.sectionType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section type" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectionTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Section Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., Our Mission"
                      defaultValue={editingSection?.title}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Section content..."
                    defaultValue={editingSection?.content}
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      placeholder="https://example.com/image.jpg"
                      defaultValue={editingSection?.imageUrl}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sortOrder">Sort Order</Label>
                    <Input
                      id="sortOrder"
                      name="sortOrder"
                      type="number"
                      placeholder="0"
                      defaultValue={editingSection?.sortOrder}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metadata">Additional Data (JSON format, optional)</Label>
                  <Textarea
                    id="metadata"
                    name="metadata"
                    placeholder='{"subtitle": "...", "stats": {...}}'
                    defaultValue={editingSection?.metadata}
                    rows={2}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    defaultChecked={editingSection?.isActive ?? true}
                    className="rounded"
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createAboutSection.isPending || updateAboutSection.isPending}>
                  {editingSection ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="all">All</TabsTrigger>
          {sectionTypes.map((type) => (
            <TabsTrigger key={type.value} value={type.value}>
              {type.label.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {Object.entries(groupedSections).map(([sectionType, sections]) => {
            const typeConfig = sectionTypes.find(t => t.value === sectionType);
            const Icon = typeConfig?.icon || Building;
            
            return (
              <Card key={sectionType}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon className="w-5 h-5 mr-2" />
                    {typeConfig?.label || sectionType}
                    <Badge variant="secondary" className="ml-2">
                      {sections.length} sections
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {sections.map((section) => (
                      <div key={section.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium">{section.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {section.content}
                            </p>
                            {section.metadata && (
                              <Badge variant="outline" className="mt-2">
                                Has additional data
                              </Badge>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingSection(section);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteAboutSection.mutate(section.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {sectionTypes.map((type) => (
          <TabsContent key={type.value} value={type.value} className="space-y-4">
            <div className="grid gap-4">
              {(groupedSections[type.value] || []).map((section) => (
                <Card key={section.id}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{section.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{section.content}</p>
                        
                        {section.imageUrl && (
                          <img 
                            src={section.imageUrl} 
                            alt={section.title}
                            className="mt-2 w-24 h-24 object-cover rounded"
                          />
                        )}
                        
                        {section.metadata && (
                          <div className="mt-2">
                            <span className="text-xs font-medium">Additional Data:</span>
                            <p className="text-xs text-muted-foreground bg-gray-50 p-2 rounded mt-1">
                              {section.metadata}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingSection(section);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteAboutSection.mutate(section.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}