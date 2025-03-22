
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

const AdminCoupons: React.FC = () => {
  // Sample coupons data
  const coupons = [
    { id: 1, code: 'SUMMER20', discount: '20%', type: 'Percentage', usageLimit: 100, usageCount: 45, status: 'Active', expiry: '2023-12-31' },
    { id: 2, code: 'WELCOME10', discount: '10%', type: 'Percentage', usageLimit: 50, usageCount: 23, status: 'Active', expiry: '2023-12-15' },
    { id: 3, code: 'FREESHIP', discount: '$5.00', type: 'Fixed', usageLimit: 200, usageCount: 78, status: 'Active', expiry: '2023-11-30' },
    { id: 4, code: 'HOLIDAY25', discount: '25%', type: 'Percentage', usageLimit: 300, usageCount: 0, status: 'Inactive', expiry: '2023-12-25' },
    { id: 5, code: 'BLACKFRIDAY', discount: '50%', type: 'Percentage', usageLimit: 500, usageCount: 126, status: 'Active', expiry: '2023-11-27' },
  ];
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Coupons</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Coupon
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Coupon List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left bg-muted/50">
                  <tr>
                    <th className="p-3 font-medium">ID</th>
                    <th className="p-3 font-medium">Code</th>
                    <th className="p-3 font-medium">Discount</th>
                    <th className="p-3 font-medium">Type</th>
                    <th className="p-3 font-medium">Usage</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Expiry</th>
                    <th className="p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.id} className="border-t">
                      <td className="p-3">{coupon.id}</td>
                      <td className="p-3 font-medium">{coupon.code}</td>
                      <td className="p-3">{coupon.discount}</td>
                      <td className="p-3">{coupon.type}</td>
                      <td className="p-3">{coupon.usageCount}/{coupon.usageLimit}</td>
                      <td className="p-3">
                        <Badge variant={coupon.status === 'Active' ? 'success' : 'secondary'}>
                          {coupon.status}
                        </Badge>
                      </td>
                      <td className="p-3">{coupon.expiry}</td>
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

export default AdminCoupons;
