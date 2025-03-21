
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCartContext } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartContext();
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };
  
  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-6 border-b animate-fade-in">
      <div className="aspect-square w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <Link to={`/products/${item.id}`} className="hover:underline">
          <h3 className="font-medium text-lg line-clamp-1">{item.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-2">{item.category}</p>
        <p className="font-medium">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center border rounded-md">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={decrementQuantity}
            className="h-9 w-9 rounded-none"
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="w-12 h-9 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={incrementQuantity}
            className="h-9 w-9 rounded-none"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="sm:hidden">
          <span className="text-muted-foreground">Subtotal:</span>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-medium text-lg">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(item.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
