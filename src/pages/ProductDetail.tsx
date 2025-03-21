
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  Star,
  Package,
  Download,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCartContext, Product } from '@/context/CartContext';
import ProductCard from '@/components/products/ProductCard';

// Sample products data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium UI Kit',
    price: 49,
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1164&auto=format&fit=crop',
    description: 'A comprehensive UI kit with over 300 components, 100+ templates, and 5 design systems.',
    category: 'Design',
    featured: true,
  },
  {
    id: '2',
    name: 'Business Plan Template',
    price: 29,
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=1170&auto=format&fit=crop',
    description: 'Professional business plan template with financial projections and market analysis.',
    category: 'Business',
    featured: true,
  },
  {
    id: '3',
    name: 'Social Media Pack',
    price: 39,
    image: 'https://images.unsplash.com/photo-1584949202501-54c825ebe813?q=80&w=1470&auto=format&fit=crop',
    description: 'Complete social media kit with post templates, story templates, and content calendar.',
    category: 'Marketing',
    featured: true,
  },
  {
    id: '4',
    name: 'E-commerce Starter Kit',
    price: 59,
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1470&auto=format&fit=crop',
    description: 'Everything you need to start your e-commerce store, including templates, graphics, and guides.',
    category: 'E-commerce',
  },
  {
    id: '5',
    name: 'Photo Editing Presets',
    price: 19,
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1470&auto=format&fit=crop',
    description: 'Professional photo editing presets for Lightroom and Photoshop.',
    category: 'Photography',
  },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, cartItems } = useCartContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [mainImage, setMainImage] = useState<string>('');
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundProduct = sampleProducts.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.image);
        
        // Get related products (same category, excluding current product)
        const related = sampleProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 3);
        
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  const isInCart = () => {
    return cartItems.some(item => item.id === product?.id);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="animate-pulse bg-muted rounded-lg aspect-square" />
              <div className="space-y-6">
                <div className="animate-pulse bg-muted h-8 w-3/4 rounded-md" />
                <div className="animate-pulse bg-muted h-6 w-1/4 rounded-md" />
                <div className="space-y-2">
                  <div className="animate-pulse bg-muted h-4 w-full rounded-md" />
                  <div className="animate-pulse bg-muted h-4 w-full rounded-md" />
                  <div className="animate-pulse bg-muted h-4 w-3/4 rounded-md" />
                </div>
                <div className="animate-pulse bg-muted h-10 w-full rounded-md" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-16">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Product gallery images (for demo, we'll just use the same image with different crops)
  const galleryImages = [
    product.image,
    product.image.replace('?q=80&w=1164', '?q=80&w=1165'),
    product.image.replace('?q=80&w=1164', '?q=80&w=1166'),
    product.image.replace('?q=80&w=1164', '?q=80&w=1167'),
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden bg-muted border-2 ${
                      mainImage === image ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setMainImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{product.category}</Badge>
                  {product.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-1 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(24 reviews)</span>
                </div>
              </div>
              
              <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
              
              <p className="text-muted-foreground">{product.description}</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="font-medium">Key Features</div>
                  <ul className="space-y-1">
                    {[
                      'Instant digital download',
                      'Compatible with all major design software',
                      'Regular updates and improvements',
                      'Premium support for 12 months',
                      'Commercial license included',
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="gap-2 flex-1"
                  onClick={handleAddToCart}
                  disabled={isInCart()}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {isInCart() ? 'Added to Cart' : 'Add to Cart'}
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full h-11 w-11">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-11 w-11">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-4 border-t border-b">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Digital product - instant download</span>
                </div>
                <div>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Updated 2 weeks ago
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-1 px-4 data-[state=active]:shadow-none font-medium"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-1 px-4 data-[state=active]:shadow-none font-medium"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-1 px-4 data-[state=active]:shadow-none font-medium"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-6">
                <TabsContent value="description" className="pt-4 animate-fade-in">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                    <p>
                      This premium digital product is designed for professionals who value quality and efficiency. 
                      Created with attention to detail, it will help you elevate your projects to the next level.
                    </p>
                    <p className="mt-4">
                      Whether you're a designer, developer, marketer, or entrepreneur, this product offers the tools 
                      and resources you need to succeed. With regular updates and dedicated support, you can be confident 
                      that your investment will continue to deliver value.
                    </p>
                    
                    <h4 className="text-lg font-semibold mt-6 mb-3">Who is this for?</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Designers looking for high-quality resources</li>
                      <li>Developers seeking to speed up their workflow</li>
                      <li>Marketers wanting to create professional materials</li>
                      <li>Entrepreneurs building their brand</li>
                      <li>Agencies serving multiple clients</li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="pt-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Technical Details</h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 border-b pb-2">
                          <div className="font-medium">Format</div>
                          <div className="col-span-2">.sketch, .fig, .xd, .psd</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 border-b pb-2">
                          <div className="font-medium">File Size</div>
                          <div className="col-span-2">248 MB</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 border-b pb-2">
                          <div className="font-medium">Requirements</div>
                          <div className="col-span-2">Adobe Photoshop CC+, Sketch 69+, or Figma</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 border-b pb-2">
                          <div className="font-medium">Version</div>
                          <div className="col-span-2">2.3.0 (Updated 14 days ago)</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 border-b pb-2">
                          <div className="font-medium">License</div>
                          <div className="col-span-2">Commercial Use</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Download className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">Instant Download</div>
                            <p className="text-sm text-muted-foreground">
                              Get immediate access to all files after purchase
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">Detailed Documentation</div>
                            <p className="text-sm text-muted-foreground">
                              Step-by-step guides to help you get started
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">Free Updates</div>
                            <p className="text-sm text-muted-foreground">
                              Access to all future updates for 12 months
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="pt-4 animate-fade-in">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Customer Reviews</h3>
                      <Button>Write a Review</Button>
                    </div>
                    
                    <div className="flex items-center gap-4 my-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">4.8</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">24 reviews</div>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <div className="w-8 text-sm text-right">{rating} star</div>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-500" 
                                style={{ 
                                  width: `${rating === 5 ? '70' : rating === 4 ? '20' : rating === 3 ? '7' : rating === 2 ? '2' : '1'}%` 
                                }}
                              />
                            </div>
                            <div className="w-8 text-sm">
                              {rating === 5 ? '17' : rating === 4 ? '5' : rating === 3 ? '1' : rating === 2 ? '1' : '0'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-8">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                {['J', 'M', 'A'][i]}
                              </div>
                              <div className="font-medium">
                                {['John D.', 'Maria S.', 'Alex K.'][i]}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {['2 days ago', '1 week ago', '2 weeks ago'][i]}
                            </div>
                          </div>
                          
                          <div className="flex">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={`h-4 w-4 ${j < (i === 1 ? 4 : 5) ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                          
                          <p>
                            {[
                              'Absolutely incredible product! The quality exceeds expectations, and the customer support is top-notch. I would highly recommend this to anyone looking for professional-grade digital assets.',
                              'Great product overall, but I had some compatibility issues with older software versions. Customer support helped me resolve it quickly though.',
                              'This product has completely transformed my workflow. The attention to detail is amazing, and I love how easy it is to customize everything.',
                            ][i]}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 text-center">
                      <Button variant="outline">
                        Load More Reviews
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Related Products</h2>
                <Link to="/products" className="text-primary hover:underline flex items-center">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
