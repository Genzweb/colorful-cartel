
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Design', description: 'UI/UX and design templates', productCount: 7 },
    { id: 2, name: 'Development', description: 'Development tools and resources', productCount: 12 },
    { id: 3, name: 'Graphics', description: 'Graphics, illustrations and vectors', productCount: 15 },
    { id: 4, name: 'Typography', description: 'Fonts and typography resources', productCount: 8 },
    { id: 5, name: 'Marketing', description: 'Marketing and SEO resources', productCount: 5 },
  ]);

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleAddCategory = () => {
    // Here you would typically add the category to your database
    const newCategoryId = categories.length + 1;
    const categoryToAdd = {
      id: newCategoryId,
      name: newCategory.name,
      description: newCategory.description,
      productCount: 0
    };
    
    setCategories([...categories, categoryToAdd]);
    setIsAddCategoryOpen(false);
    
    // Reset form
    setNewCategory({ name: '', description: '' });
  };

  const handleEditClick = (category: any) => {
    setSelectedCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description
    });
    setIsEditCategoryOpen(true);
  };

  const handleDeleteClick = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteCategoryOpen(true);
  };

  const handleUpdateCategory = () => {
    // Here you would typically update the category in your database
    const updatedCategories = categories.map(category => {
      if (category.id === selectedCategory.id) {
        return {
          ...category,
          name: newCategory.name,
          description: newCategory.description
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
    setIsEditCategoryOpen(false);
  };

  const handleDeleteCategory = () => {
    // Here you would typically delete the category from your database
    const updatedCategories = categories.filter(category => category.id !== selectedCategory.id);
    setCategories(updatedCategories);
    setIsDeleteCategoryOpen(false);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Button onClick={() => setIsAddCategoryOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Category List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>{category.productCount}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditClick(category)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(category)}>
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

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category for your products.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
                placeholder="Enter category name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Category Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
                placeholder="Enter category name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCategoryOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleUpdateCategory}>Update Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteCategoryOpen} onOpenChange={setIsDeleteCategoryOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedCategory?.name}"? This may affect products assigned to this category.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setIsDeleteCategoryOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCategories;
