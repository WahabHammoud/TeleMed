
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Search, RefreshCw, Edit, Trash2, Plus, Image } from "lucide-react";

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
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      setProducts(data);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
      setCategories(uniqueCategories);
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

  const handleUpdateProduct = async (product: Product) => {
    try {
      if (isNewProduct) {
        const { id, created_at, ...newProductData } = product;
        const { error } = await supabase
          .from('products')
          .insert(newProductData);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Product created successfully",
        });
      } else {
        const { created_at, ...updateData } = product;
        const { error } = await supabase
          .from('products')
          .update(updateData)
          .eq('id', product.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      }
      
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

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', selectedProduct.id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      
      fetchProducts();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product",
      });
    }
  };

  const addNewProduct = () => {
    setIsNewProduct(true);
    setSelectedProduct({
      id: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      image_url: null,
      created_at: new Date().toISOString()
    });
    setEditDialogOpen(true);
  };

  const editProduct = (product: Product) => {
    setIsNewProduct(false);
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

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
            <Button variant="outline" size="sm" onClick={fetchProducts}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={addNewProduct}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium">Category</label>
              <Select 
                value={categoryFilter} 
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
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
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded">
                            <Image className="h-5 w-5 text-slate-400" />
                          </div>
                        )}
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={product.stock > 0 ? "default" : "destructive"}
                      >
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => editProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600"
                          onClick={() => {
                            setSelectedProduct(product);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit/Add Product Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isNewProduct ? 'Add New Product' : 'Edit Product'}</DialogTitle>
            <DialogDescription>
              {isNewProduct 
                ? 'Add a new product to your store' 
                : 'Update product details and inventory'
              }
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
                <Input
                  className="col-span-3"
                  value={selectedProduct.category}
                  onChange={(e) => 
                    setSelectedProduct({ ...selectedProduct, category: e.target.value })
                  }
                  placeholder="e.g. Medications, Supplements, Equipment"
                />
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
                  step="1"
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
                  placeholder="https://example.com/image.jpg"
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
                  handleUpdateProduct(selectedProduct);
                }
              }}
            >
              {isNewProduct ? 'Add Product' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="py-4">
              <p className="font-medium">{selectedProduct.name}</p>
              <p className="text-sm text-muted-foreground">{selectedProduct.category} - ${selectedProduct.price.toFixed(2)}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteProduct}
            >
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
