import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ContactInfo {
  id: number;
  sectionKey: string;
  title: string;
  content: string;
  imageUrl?: string;
  metadata?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ContactPageManager() {
  const [editingItem, setEditingItem] = useState<ContactInfo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contactInfo = [], isLoading } = useQuery({
    queryKey: ['/api/contact-info'],
  });

  const createContactInfo = useMutation({
    mutationFn: async (data: Omit<ContactInfo, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await fetch('/api/contact-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create contact info');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-info'] });
      setIsDialogOpen(false);
      setEditingItem(null);
      toast({ title: "Contact information created successfully" });
    },
  });

  const updateContactInfo = useMutation({
    mutationFn: async ({ id, ...data }: ContactInfo) => {
      const response = await fetch(`/api/contact-info/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update contact info');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-info'] });
      setIsDialogOpen(false);
      setEditingItem(null);
      toast({ title: "Contact information updated successfully" });
    },
  });

  const deleteContactInfo = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/contact-info/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete contact info');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-info'] });
      toast({ title: "Contact information deleted successfully" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      sectionKey: formData.get('sectionKey') as string,
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      imageUrl: formData.get('imageUrl') as string || undefined,
      metadata: formData.get('metadata') as string || undefined,
      isActive: formData.get('isActive') === 'on',
    };

    if (editingItem) {
      updateContactInfo.mutate({ ...editingItem, ...data });
    } else {
      createContactInfo.mutate(data);
    }
  };

  const sectionTypes = [
    { value: 'header', label: 'Page Header' },
    { value: 'address', label: 'Office Address' },
    { value: 'phone', label: 'Phone Numbers' },
    { value: 'email', label: 'Email Addresses' },
    { value: 'hours', label: 'Business Hours' },
    { value: 'map', label: 'Map Information' },
    { value: 'social', label: 'Social Media' },
    { value: 'emergency', label: 'Emergency Contact' },
  ];

  const groupedInfo = contactInfo.reduce((acc: Record<string, ContactInfo[]>, item: ContactInfo) => {
    if (!acc[item.sectionKey]) acc[item.sectionKey] = [];
    acc[item.sectionKey].push(item);
    return acc;
  }, {});

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading contact information...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact Page Management</h2>
          <p className="text-muted-foreground">Manage contact information, addresses, and communication details</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Contact Info
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Contact Information' : 'Add Contact Information'}
                </DialogTitle>
                <DialogDescription>
                  {editingItem ? 'Update the contact information details' : 'Add new contact information to the page'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sectionKey">Section Type</Label>
                    <Select name="sectionKey" defaultValue={editingItem?.sectionKey}>
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
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Contact info title"
                      defaultValue={editingItem?.title}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Contact information content"
                    defaultValue={editingItem?.content}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    defaultValue={editingItem?.imageUrl}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metadata">Additional Data (JSON format, optional)</Label>
                  <Textarea
                    id="metadata"
                    name="metadata"
                    placeholder='{"phone": "+234...", "whatsapp": "+234..."}'
                    defaultValue={editingItem?.metadata}
                    rows={2}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    defaultChecked={editingItem?.isActive ?? true}
                    className="rounded"
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createContactInfo.isPending || updateContactInfo.isPending}>
                  {editingItem ? 'Update' : 'Create'}
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
          {Object.entries(groupedInfo).map(([sectionKey, items]) => (
            <Card key={sectionKey}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {sectionTypes.find(t => t.value === sectionKey)?.label || sectionKey}
                  <Badge variant="secondary" className="ml-2">
                    {items.length} items
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{item.content}</p>
                          {item.metadata && (
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
                              setEditingItem(item);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteContactInfo.mutate(item.id)}
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
          ))}
        </TabsContent>

        {sectionTypes.map((type) => (
          <TabsContent key={type.value} value={type.value} className="space-y-4">
            <div className="grid gap-4">
              {(groupedInfo[type.value] || []).map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.content}</p>
                        {item.imageUrl && (
                          <img 
                            src={item.imageUrl} 
                            alt={item.title}
                            className="mt-2 w-20 h-20 object-cover rounded"
                          />
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(item);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteContactInfo.mutate(item.id)}
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