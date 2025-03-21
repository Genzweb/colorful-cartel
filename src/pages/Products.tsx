
import React, { useState, useEffect } from 'react';
import { X, Search, Filter, ArrowUpDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

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
  {
    id: '6',
    name: 'Resume Template',
    price: 9,
    image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=1470&auto=format&fit=crop',
    description: 'Modern resume template designed to stand out and impress employers.',
    category: 'Business',
  },
  {
    id: '7',
    name: 'Font Collection',
    price: 24,
    image: 'https://images.unsplash.com/photo-1609921141835-710b7fa6e438?q=80&w=2070&auto=format&fit=crop',
    description: 'Collection of 50 professional fonts for designers and creatives.',
    category: 'Design',
  },
  {
    id: '8',
    name: 'Video Editing Templates',
    price: 34,
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1470&auto=format&fit=crop',
    description: 'Templates for Adobe Premiere Pro and After Effects to create stunning videos.',
    category: 'Video',
  },
  {
    id: '9',
    name: 'Podcast Starter Kit',
    price: 29,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1470&auto=format&fit=crop',
    description: 'Everything you need to start your podcast, including templates, music, and guides.',
    category: 'Audio',
  },
];

const categories = [
  'All',
  'Design',
  'Business',
  'Marketing',
  'E-commerce',
  'Photography',
  'Video',
  'Audio',
];

const priceRanges = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $10', value: 'under-10' },
  { label: '$10 - $25', value: '10-25' },
  { label: '$25 - $50', value: '25-50' },
  { label: 'Over $50', value: 'over-50' },
];

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Popularity', value: 'popularity' },
];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [isFeaturedOnly, setIsFeaturedOnly] = useState(false);
  
  const applyFilters = () => {
    let filtered = [...products];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply price filter
    if (selectedPriceRange !== 'all') {
      switch(selectedPriceRange) {
        case 'under-10':
          filtered = filtered.filter(product => product.price < 10);
          break;
        case '10-25':
          filtered = filtered.filter(product => product.price >= 10 && product.price <= 25);
          break;
        case '25-50':
          filtered = filtered.filter(product => product.price > 25 && product.price <= 50);
          break;
        case 'over-50':
          filtered = filtered.filter(product => product.price > 50);
          break;
      }
    }
    
    // Apply featured filter
    if (isFeaturedOnly) {
      filtered = filtered.filter(product => product.featured);
    }
    
    // Apply sorting
    switch(sortOrder) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        // For demo purposes, we'll just use a random sort for "popularity"
        filtered.sort(() => Math.random() - 0.5);
        break;
      case 'newest':
      default:
        // For demo purposes, we'll just use the default order for "newest"
        break;
    }
    
    setFilteredProducts(filtered);
  };

  // Apply filters when any filter value changes
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, selectedPriceRange, sortOrder, isFeaturedOnly]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriceRange('all');
    setSortOrder('newest');
    setIsFeaturedOnly(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <h1 className="text-3xl font-bold">Digital Products</h1>
              
              <div className="flex items-center gap-2">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Filters</h3>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Categories</h4>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={`category-${category}`}
                                checked={selectedCategory === category}
                                onCheckedChange={() => setSelectedCategory(category)}
                              />
                              <Label htmlFor={`category-${category}`}>{category}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Price Range</h4>
                        <div className="space-y-2">
                          {priceRanges.map((range) => (
                            <div key={range.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={`price-${range.value}`}
                                checked={selectedPriceRange === range.value}
                                onCheckedChange={() => setSelectedPriceRange(range.value)}
                              />
                              <Label htmlFor={`price-${range.value}`}>{range.label}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Other Filters</h4>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="featured-mobile"
                            checked={isFeaturedOnly}
                            onCheckedChange={(checked) => setIsFeaturedOnly(checked as boolean)}
                          />
                          <Label htmlFor="featured-mobile">Featured Products Only</Label>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button onClick={clearFilters} variant="outline" className="w-full">
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Filters - Desktop */}
              <div className="hidden md:block w-64 space-y-8">
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </h3>
                  
                  <Button onClick={clearFilters} variant="outline" size="sm" className="w-full">
                    Clear Filters
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategory === category}
                          onCheckedChange={() => setSelectedCategory(category)}
                        />
                        <Label htmlFor={`category-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div key={range.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`price-${range.value}`}
                          checked={selectedPriceRange === range.value}
                          onCheckedChange={() => setSelectedPriceRange(range.value)}
                        />
                        <Label htmlFor={`price-${range.value}`}>{range.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Other Filters</h4>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={isFeaturedOnly}
                      onCheckedChange={(checked) => setIsFeaturedOnly(checked as boolean)}
                    />
                    <Label htmlFor="featured">Featured Products Only</Label>
                  </div>
                </div>
              </div>
              
              {/* Products List */}
              <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== 'All' && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {selectedCategory}
                        <button onClick={() => setSelectedCategory('All')}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    )}
                    
                    {selectedPriceRange !== 'all' && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {priceRanges.find(range => range.value === selectedPriceRange)?.label}
                        <button onClick={() => setSelectedPriceRange('all')}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    )}
                    
                    {isFeaturedOnly && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Featured Only
                        <button onClick={() => setIsFeaturedOnly(false)}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    )}
                    
                    {(selectedCategory !== 'All' || selectedPriceRange !== 'all' || isFeaturedOnly) && (
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 px-2">
                        Clear All
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="flex items-center gap-1">
                      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm hidden sm:inline-block">Sort:</span>
                    </div>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger className="w-36 sm:w-40 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No products found</h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      No products match your current filters. Try changing your search or clear filters.
                    </p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-6">
                      Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </p>
                    <ProductGrid products={filteredProducts} columns={3} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
