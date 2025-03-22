
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Image, Edit, Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminProducts: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    acceptCrypto: true,
    image: null as File | null,
    imagePreview: ''
  });
  
  // Sample products data
  const [products, setProducts] = useState([
    { id: 1, name: 'UI Kit', price: 49, stock: 124, category: 'Design', acceptCrypto: true, description: 'Complete UI kit with over 100 components', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b' },
    { id: 2, name: 'Templates', price: 29, stock: 85, category: 'Design', acceptCrypto: true, description: 'Responsive templates for web applications', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6' },
    { id: 3, name: 'Icons', price: 19, stock: 321, category: 'Graphics', acceptCrypto: false, description: 'Premium icon collection for modern interfaces', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475' },
    { id: 4, name: 'Plugins', price: 39, stock: 65, category: 'Development', acceptCrypto: true, description: 'Productivity plugins for your workflow', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d' },
    { id: 5, name: 'Fonts', price: 14, stock: 176, category: 'Typography', acceptCrypto: false, description: 'Custom font family collection for designers', image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7' },
  ]);

  // Sample categories
  const categories = [
    'Design', 'Development', 'Graphics', 'Typography', 'Marketing'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setNewProduct({
      ...newProduct,
      acceptCrypto: checked
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: file,
          imagePreview: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    // Here you would typically add the product to your database
    const newProductId = products.length + 1;
    const productToAdd = {
      id: newProductId,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      category: newProduct.category,
      description: newProduct.description,
      acceptCrypto: newProduct.acceptCrypto,
      image: newProduct.imagePreview || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
    };
    
    setProducts([...products, productToAdd]);
    setIsAddProductOpen(false);
    
    // Reset form
    setNewProduct({
      name: '',
      price: '',
      stock: '',
      category: '',
      description: '',
      acceptCrypto: true,
      image: null,
      imagePreview: ''
    });
  };

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      description: product.description || '',
      acceptCrypto: product.acceptCrypto,
      image: null,
      imagePreview: product.image
    });
    setIsEditProductOpen(true);
  };

  const handleDeleteClick = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteProductOpen(true);
  };

  const handleUpdateProduct = () => {
    // Here you would typically update the product in your database
    const updatedProducts = products.map(product => {
      if (product.id === selectedProduct.id) {
        return {
          ...product,
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
          category: newProduct.category,
          description: newProduct.description,
          acceptCrypto: newProduct.acceptCrypto,
          image: newProduct.imagePreview || product.image
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    setIsEditProductOpen(false);
  };

  const handleDeleteProduct = () => {
    // Here you would typically delete the product from your database
    const updatedProducts = products.filter(product => product.id !== selectedProduct.id);
    setProducts(updatedProducts);
    setIsDeleteProductOpen(false);
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/admin/categories')}>
              Manage Categories
            </Button>
            <Button onClick={() => setIsAddProductOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Crypto Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="h-12 w-12 rounded overflow-hidden bg-muted">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {product.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {product.acceptCrypto ? 
                          <Badge variant="success">Enabled</Badge> : 
                          <Badge variant="outline">Disabled</Badge>}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditClick(product)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(product)}>
                            <Trash className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product to add to your inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Product Image</Label>
              <div className="flex items-center gap-4">
                <div
                  className="h-24 w-24 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer bg-muted/20"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {newProduct.imagePreview ? (
                    <img
                      src={newProduct.imagePreview}
                      alt="Product preview"
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <Image className="h-8 w-8 text-muted-foreground" />
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Click to upload an image</p>
                  <p>JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newProduct.category}
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="accept-crypto"
                checked={newProduct.acceptCrypto}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="accept-crypto">Accept Cryptocurrency Payments</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Product Image</Label>
              <div className="flex items-center gap-4">
                <div
                  className="h-24 w-24 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer bg-muted/20"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {newProduct.imagePreview ? (
                    <img
                      src={newProduct.imagePreview}
                      alt="Product preview"
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <Image className="h-8 w-8 text-muted-foreground" />
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Click to upload a new image</p>
                  <p>JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-stock">Stock</Label>
                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={newProduct.category}
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger id="edit-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-accept-crypto"
                checked={newProduct.acceptCrypto}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="edit-accept-crypto">Accept Cryptocurrency Payments</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleUpdateProduct}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteProductOpen} onOpenChange={setIsDeleteProductOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setIsDeleteProductOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProducts;
