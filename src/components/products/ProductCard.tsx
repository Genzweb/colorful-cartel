
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/context/CartContext';
import { useCartContext } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default' }) => {
  const { addToCart } = useCartContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <Card 
        className={cn(
          "group overflow-hidden hover-scale transition-all duration-300 h-full",
          variant === 'featured' && "md:flex md:flex-row"
        )}
      >
        <div 
          className={cn(
            "relative overflow-hidden",
            variant === 'default' && "aspect-[3/2]",
            variant === 'featured' && "aspect-[3/2] md:w-1/2 md:aspect-auto"
          )}
        >
          {/* Image with overlay on hover */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full w-10 h-10"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full w-10 h-10"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full w-10 h-10"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Category badge */}
          <Badge className="absolute top-3 left-3">
            {product.category}
          </Badge>
          
          {/* Featured badge - only show if product is featured */}
          {product.featured && (
            <Badge variant="secondary" className="absolute top-3 right-3">
              Featured
            </Badge>
          )}
        </div>
        
        <div className={cn(
          "",
          variant === 'featured' && "md:w-1/2"
        )}>
          <CardContent className={cn(
            "p-4",
            variant === 'featured' && "md:p-6"
          )}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={cn(
                "font-semibold text-foreground line-clamp-1",
                variant === 'default' && "text-lg",
                variant === 'featured' && "text-xl md:text-2xl"
              )}>
                {product.name}
              </h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <span className="text-sm ml-1">4.9</span>
              </div>
            </div>
            
            <p className={cn(
              "text-muted-foreground mb-4 line-clamp-2",
              variant === 'featured' && "md:line-clamp-4"
            )}>
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className={cn(
                "font-bold text-foreground",
                variant === 'default' && "text-lg",
                variant === 'featured' && "text-xl"
              )}>
                ${product.price.toFixed(2)}
              </span>
            </div>
          </CardContent>
          
          <CardFooter className={cn(
            "p-4 pt-0 flex justify-between",
            variant === 'featured' && "md:p-6 md:pt-0"
          )}>
            <Button 
              className="w-full"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
