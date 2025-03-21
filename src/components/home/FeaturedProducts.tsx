
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../products/ProductCard';
import { Product } from '@/context/CartContext';

// Sample featured products data
const featuredProducts: Product[] = [
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
];

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title = "Featured Products",
  subtitle = "Discover our hand-picked selection of premium digital products"
}) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="space-y-1 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground max-w-2xl">{subtitle}</p>
          </div>
          <Link to="/products" className="group flex items-center gap-1 font-medium text-sm">
            View all products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="space-y-10">
          {featuredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              variant="featured" 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
