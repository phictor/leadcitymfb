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
import { Plus, Edit, Trash2, CreditCard, Percent, Calendar } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  features: string;
  benefits: string;
  requirements: string;
  interestRate?: string;
  minimumAmount?: string;
  maximumAmount?: string;
  tenure?: string;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function ProductPageManager() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
  });

  const createProduct = useMutation({
    mutationFn: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsDialogOpen(false);
      setEditingProduct(null);
      toast({ title: "Product created successfully" });
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, ...data }: Product) => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsDialogOpen(false);
      setEditingProduct(null);
      toast({ title: "Product updated successfully" });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Product deleted successfully" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      features: formData.get('features') as string,
      benefits: formData.get('benefits') as string,
      requirements: formData.get('requirements') as string,
      interestRate: formData.get('interestRate') as string || undefined,
      minimumAmount: formData.get('minimumAmount') as string || undefined,
      maximumAmount: formData.get('maximumAmount') as string || undefined,
      tenure: formData.get('tenure') as string || undefined,
      category: formData.get('category') as string,
      imageUrl: formData.get('imageUrl') as string || undefined,
      isActive: formData.get('isActive') === 'on',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
    };

    if (editingProduct) {
      updateProduct.mutate({ ...editingProduct, ...data });
    } else {
      createProduct.mutate(data);
    }
  };

  const categories = [
    { value: 'savings', label: 'Savings Account' },
    { value: 'current', label: 'Current Account' },
    { value: 'fixed', label: 'Fixed Deposit' },
    { value: 'loan', label: 'Loan Product' },
    { value: 'investment', label: 'Investment Product' },
    { value: 'insurance', label: 'Insurance Product' },
  ];

  const groupedProducts = products.reduce((acc: Record<string, Product[]>, product: Product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products Page Management</h2>
          <p className="text-muted-foreground">Manage banking products, services, and their details</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
                <DialogDescription>
                  {editingProduct ? 'Update the product details' : 'Add a new banking product or service'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Regular Savings Account"
                      defaultValue={editingProduct?.name}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" defaultValue={editingProduct?.category}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Product description"
                    defaultValue={editingProduct?.description}
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="features">Features (JSON array format)</Label>
                    <Textarea
                      id="features"
                      name="features"
                      placeholder='["Online banking", "ATM access", "SMS alerts"]'
                      defaultValue={editingProduct?.features}
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="benefits">Benefits (JSON array format)</Label>
                    <Textarea
                      id="benefits"
                      name="benefits"
                      placeholder='["High interest rates", "No hidden charges", "24/7 support"]'
                      defaultValue={editingProduct?.benefits}
                      rows={3}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements (JSON array format)</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    placeholder='["Valid ID", "Proof of address", "Passport photograph"]'
                    defaultValue={editingProduct?.requirements}
                    rows={2}
                    required
                  />
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Interest Rate</Label>
                    <Input
                      id="interestRate"
                      name="interestRate"
                      placeholder="e.g., 12% p.a."
                      defaultValue={editingProduct?.interestRate}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="minimumAmount">Minimum Amount</Label>
                    <Input
                      id="minimumAmount"
                      name="minimumAmount"
                      placeholder="e.g., ₦1,000"
                      defaultValue={editingProduct?.minimumAmount}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maximumAmount">Maximum Amount</Label>
                    <Input
                      id="maximumAmount"
                      name="maximumAmount"
                      placeholder="e.g., ₦10,000,000"
                      defaultValue={editingProduct?.maximumAmount}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tenure">Tenure</Label>
                    <Input
                      id="tenure"
                      name="tenure"
                      placeholder="e.g., 1-5 years"
                      defaultValue={editingProduct?.tenure}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      placeholder="https://example.com/product-image.jpg"
                      defaultValue={editingProduct?.imageUrl}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sortOrder">Sort Order</Label>
                    <Input
                      id="sortOrder"
                      name="sortOrder"
                      type="number"
                      placeholder="0"
                      defaultValue={editingProduct?.sortOrder}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    defaultChecked={editingProduct?.isActive ?? true}
                    className="rounded"
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createProduct.isPending || updateProduct.isPending}>
                  {editingProduct ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.label.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  {categories.find(c => c.value === category)?.label || category}
                  <Badge variant="secondary" className="ml-2">
                    {categoryProducts.length} products
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {categoryProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {product.interestRate && (
                              <Badge variant="outline" className="text-xs">
                                <Percent className="w-3 h-3 mr-1" />
                                {product.interestRate}
                              </Badge>
                            )}
                            {product.minimumAmount && (
                              <Badge variant="outline" className="text-xs">
                                Min: {product.minimumAmount}
                              </Badge>
                            )}
                            {product.tenure && (
                              <Badge variant="outline" className="text-xs">
                                <Calendar className="w-3 h-3 mr-1" />
                                {product.tenure}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingProduct(product);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteProduct.mutate(product.id)}
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

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value} className="space-y-4">
            <div className="grid gap-4">
              {(groupedProducts[category.value] || []).map((product) => (
                <Card key={product.id}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                          <div>
                            <span className="font-medium">Features:</span>
                            <p className="text-muted-foreground">{product.features}</p>
                          </div>
                          <div>
                            <span className="font-medium">Benefits:</span>
                            <p className="text-muted-foreground">{product.benefits}</p>
                          </div>
                        </div>
                        
                        {product.imageUrl && (
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="mt-2 w-24 h-24 object-cover rounded"
                          />
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingProduct(product);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteProduct.mutate(product.id)}
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