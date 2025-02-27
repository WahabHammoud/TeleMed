
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Search, RefreshCw, Package, MoreHorizontal, Pencil, Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string;
  image_url: string | null;
  created_at: string;
}

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "medication",
    image_url: ""
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load products",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateProduct = async (productId: string, updates: Partial<Product>) => {
    try {
      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', productId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      
      fetchProducts();
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update product",
      });
    }
  };

  const handleCreateProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.category || newProduct.price === undefined || newProduct.stock === undefined) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill in all required fields",
        });
        return;
      }
      
      const { error } = await supabase
        .from('products')
        .insert({
          name: newProduct.name,
          description: newProduct.description || null,
          price: newProduct.price,
          stock: newProduct.stock,
          category: newProduct.category,
          image_url: newProduct.image_url || null
        });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Product created successfully",
      });
      
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "medication",
        image_url: ""
      });
      
      fetchProducts();
      setCreateDialogOpen(false);
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create product",
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product",
      });
    }
  };

  const categories = ["medication", "device", "supplement", "wellness", "first-aid"];

  const filteredProducts = products.filter(product => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      product.name.toLowerCase().includes(searchLower) || 
      (product.description && product.description.toLowerCase().includes(searchLower));
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Product Management</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={fetchProducts}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        {product.name}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            setSelectedProduct(product);
                            setEditDialogOpen(true);
                          }}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product details and inventory
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Name</label>
                <Input
                  className="col-span-3"
                  value={selectedProduct.name}
                  onChange={(e) => 
                    setSelectedProduct({ ...selectedProduct, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Description</label>
                <Textarea
                  className="col-span-3"
                  value={selectedProduct.description || ''}
                  onChange={(e) => 
                    setSelectedProduct({ ...selectedProduct, description: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Category</label>
                <Select 
                  value={selectedProduct.category} 
                  onValueChange={(value) => 
                    setSelectedProduct({ ...selectedProduct, category: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Price ($)</label>
                <Input
                  className="col-span-3"
                  type="number"
                  min="0"
                  step="0.01"
                  value={selectedProduct.price}
                  onChange={(e) => 
                    setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Stock</label>
                <Input
                  className="col-span-3"
                  type="number"
                  min="0"
                  value={selectedProduct.stock}
                  onChange={(e) => 
                    setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Image URL</label>
                <Input
                  className="col-span-3"
                  value={selectedProduct.image_url || ''}
                  onChange={(e) => 
                    setSelectedProduct({ ...selectedProduct, image_url: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (selectedProduct) {
                  handleUpdateProduct(selectedProduct.id, {
                    name: selectedProduct.name,
                    description: selectedProduct.description,
                    category: selectedProduct.category,
                    price: selectedProduct.price,
                    stock: selectedProduct.stock,
                    image_url: selectedProduct.image_url
                  });
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Product Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product in the inventory
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Name</label>
              <Input
                className="col-span-3"
                value={newProduct.name}
                onChange={(e) => 
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Description</label>
              <Textarea
                className="col-span-3"
                value={newProduct.description || ''}
                onChange={(e) => 
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Category</label>
              <Select 
                value={newProduct.category} 
                onValueChange={(value) => 
                  setNewProduct({ ...newProduct, category: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Price ($)</label>
              <Input
                className="col-span-3"
                type="number"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => 
                  setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Stock</label>
              <Input
                className="col-span-3"
                type="number"
                min="0"
                value={newProduct.stock}
                onChange={(e) => 
                  setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Image URL</label>
              <Input
                className="col-span-3"
                value={newProduct.image_url || ''}
                onChange={(e) => 
                  setNewProduct({ ...newProduct, image_url: e.target.value })
                }
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProduct}>
              Create Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
