
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

const AdminProducts: React.FC = () => {
  const navigate = useNavigate();
  
  // Sample products data
  const products = [
    { id: 1, name: 'UI Kit', price: 49, stock: 124, category: 'Design' },
    { id: 2, name: 'Templates', price: 29, stock: 85, category: 'Design' },
    { id: 3, name: 'Icons', price: 19, stock: 321, category: 'Graphics' },
    { id: 4, name: 'Plugins', price: 39, stock: 65, category: 'Development' },
    { id: 5, name: 'Fonts', price: 14, stock: 176, category: 'Typography' },
  ];
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left bg-muted/50">
                  <tr>
                    <th className="p-3 font-medium">ID</th>
                    <th className="p-3 font-medium">Name</th>
                    <th className="p-3 font-medium">Price</th>
                    <th className="p-3 font-medium">Stock</th>
                    <th className="p-3 font-medium">Category</th>
                    <th className="p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-t">
                      <td className="p-3">{product.id}</td>
                      <td className="p-3">{product.name}</td>
                      <td className="p-3">${product.price}</td>
                      <td className="p-3">{product.stock}</td>
                      <td className="p-3">{product.category}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
