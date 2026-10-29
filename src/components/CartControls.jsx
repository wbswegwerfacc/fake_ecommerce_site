'use client';

import { useCart } from '@/context/CartContext';

export default function CartControls({ product }) {
  const { getQuantity, addToCart, removeFromCart, isHydrated } = useCart();
  const quantity = isHydrated ? getQuantity(product.id) : 0;

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="btn btn-primary btn-full"
      >
        + Add to Cart
      </button>
    );
  }

  return (
    <div className="cart-quantity-controls" aria-label="Manage item quantity in cart">
      <button
        type="button"
        onClick={() => removeFromCart(product.id)}
        className="btn btn-decrement"
        aria-label={`Remove one ${product.title} from cart`}
      >
        −
      </button>
      <span className="quantity-indicator" aria-live="polite">
        <strong>{quantity}</strong> in cart
      </span>
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="btn btn-increment"
        aria-label={`Add one more ${product.title} to cart`}
      >
        +
      </button>
    </div>
  );
}

