import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { QrCode, Plus, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminSettings: React.FC = () => {
  const [cryptoAddresses, setCryptoAddresses] = useState([
    { id: 1, currency: 'Bitcoin', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', active: true },
    { id: 2, currency: 'Ethereum', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', active: true }
  ]);
  
  const [newCurrency, setNewCurrency] = useState('');
  const [newAddress, setNewAddress] = useState('');
  
  const addCryptoAddress = () => {
    if (newCurrency && newAddress) {
      setCryptoAddresses([
        ...cryptoAddresses,
        {
          id: cryptoAddresses.length + 1,
          currency: newCurrency,
          address: newAddress,
          active: true
        }
      ]);
      setNewCurrency('');
      setNewAddress('');
    }
  };
  
  const removeCryptoAddress = (id: number) => {
    setCryptoAddresses(cryptoAddresses.filter(address => address.id !== id));
  };
  
  const toggleAddressStatus = (id: number) => {
    setCryptoAddresses(
      cryptoAddresses.map(address => 
        address.id === id ? { ...address, active: !address.active } : address
      )
    );
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your store's general settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" defaultValue="Digital Market" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-url">Store URL</Label>
                    <Input id="store-url" defaultValue="https://digitalmarket.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Store Email</Label>
                    <Input id="store-email" defaultValue="info@digitalmarket.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Store Phone</Label>
                    <Input id="store-phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="store-address">Store Address</Label>
                  <Textarea id="store-address" defaultValue="123 Main Street, Suite 101, New York, NY 10001" />
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment methods and options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Accept Credit Cards</h3>
                      <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, and American Express</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Accept PayPal</h3>
                      <p className="text-sm text-muted-foreground">Allow customers to pay with PayPal</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Accept Apple Pay</h3>
                      <p className="text-sm text-muted-foreground">Allow customers to pay with Apple Pay</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Accept Google Pay</h3>
                      <p className="text-sm text-muted-foreground">Allow customers to pay with Google Pay</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="crypto">
            <Card>
              <CardHeader>
                <CardTitle>Cryptocurrency Settings</CardTitle>
                <CardDescription>Configure cryptocurrency payment options and wallet addresses.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enable Cryptocurrency Payments</h3>
                      <p className="text-sm text-muted-foreground">Allow customers to pay with cryptocurrencies</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Use NowPayments API</h3>
                      <p className="text-sm text-muted-foreground">Use NowPayments to automatically process crypto payments</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nowpayments-api">NowPayments API Key</Label>
                    <Input id="nowpayments-api" placeholder="Enter your NowPayments API key" />
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">My Cryptocurrency Addresses</h3>
                  
                  {cryptoAddresses.map((address) => (
                    <div key={address.id} className="flex items-center justify-between p-3 border rounded-md mb-3">
                      <div className="flex-1">
                        <p className="font-medium">{address.currency}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-md">{address.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Active</span>
                          <Switch 
                            checked={address.active}
                            onCheckedChange={() => toggleAddressStatus(address.id)}
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeCryptoAddress(address.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border rounded-md p-4 mt-4">
                    <h4 className="font-medium mb-3">Add New Cryptocurrency Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="crypto-currency">Cryptocurrency</Label>
                        <Select value={newCurrency} onValueChange={setNewCurrency}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select cryptocurrency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Bitcoin">Bitcoin (BTC)</SelectItem>
                            <SelectItem value="Ethereum">Ethereum (ETH)</SelectItem>
                            <SelectItem value="Litecoin">Litecoin (LTC)</SelectItem>
                            <SelectItem value="Ripple">Ripple (XRP)</SelectItem>
                            <SelectItem value="Dogecoin">Dogecoin (DOGE)</SelectItem>
                            <SelectItem value="Solana">Solana (SOL)</SelectItem>
                            <SelectItem value="Cardano">Cardano (ADA)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="crypto-address">Wallet Address</Label>
                        <Input 
                          id="crypto-address" 
                          placeholder="Enter wallet address" 
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button onClick={addCryptoAddress} className="w-full md:w-auto" disabled={!newCurrency || !newAddress}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Cryptocurrency Address
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email notifications and templates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Order Confirmation</h3>
                      <p className="text-sm text-muted-foreground">Send email when an order is placed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Order Shipped</h3>
                      <p className="text-sm text-muted-foreground">Send email when an order is shipped</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Order Delivered</h3>
                      <p className="text-sm text-muted-foreground">Send email when an order is delivered</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Abandoned Cart</h3>
                      <p className="text-sm text-muted-foreground">Send email for abandoned carts</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Configure advanced store settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Maintenance Mode</h3>
                      <p className="text-sm text-muted-foreground">Enable maintenance mode for your store</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Debug Mode</h3>
                      <p className="text-sm text-muted-foreground">Enable debug mode for developers</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enable API Access</h3>
                      <p className="text-sm text-muted-foreground">Allow API access to your store data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cache">Cache Expiration (hours)</Label>
                  <Input id="cache" type="number" defaultValue="24" />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
