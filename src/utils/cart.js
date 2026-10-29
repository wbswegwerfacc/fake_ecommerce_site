export const CART_STORAGE_KEY = 'fakestore_ecommerce_cart';

/**
 * Loads the cart items from localStorage (client-side only).
 * @returns {Array} Array of cart items with { id, title, price, image, category, quantity }
 */
export function getCartFromStorage() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read cart from localStorage:', error);
    return [];
  }
}

/**
 * Saves the given cart array to localStorage.
 * @param {Array} cart - Array of cart items
 */
export function saveCartToStorage(cart) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
}

/**
 * Adds one unit of a product to the cart (or initializes it with quantity 1)
 * and persists the updated cart in localStorage.
 * @param {Array} currentCart - Current cart state
 * @param {Object} product - Product object from FakeStoreAPI
 * @returns {Array} Updated cart array
 */
export function addItemToCart(currentCart, product) {
  const existingIndex = currentCart.findIndex((item) => item.id === product.id);
  let updatedCart;

  if (existingIndex > -1) {
    updatedCart = currentCart.map((item, index) =>
      index === existingIndex
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    updatedCart = [
      ...currentCart,
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1,
      },
    ];
  }

  saveCartToStorage(updatedCart);
  return updatedCart;
}

/**
 * Decrements one unit of a product from the cart.
 * If the quantity reaches 0, the item is removed completely so it never goes below zero.
 * Persists the updated cart in localStorage.
 * @param {Array} currentCart - Current cart state
 * @param {number} productId - Product ID to decrement
 * @returns {Array} Updated cart array
 */
export function removeItemFromCart(currentCart, productId) {
  const updatedCart = currentCart
    .map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    )
    .filter((item) => item.quantity > 0);

  saveCartToStorage(updatedCart);
  return updatedCart;
}

/**
 * Completely removes a product line from the cart regardless of its quantity.
 * @param {Array} currentCart - Current cart state
 * @param {number} productId - Product ID to remove
 * @returns {Array} Updated cart array
 */
export function clearProductFromCart(currentCart, productId) {
  const updatedCart = currentCart.filter((item) => item.id !== productId);
  saveCartToStorage(updatedCart);
  return updatedCart;
}

/**
 * Returns the quantity of a specific product currently in the cart.
 * @param {Array} cart - Current cart state
 * @param {number} productId - Product ID
 * @returns {number} Quantity in cart (0 if not present)
 */
export function getItemQuantity(cart, productId) {
  const found = cart.find((item) => item.id === productId);
  return found ? found.quantity : 0;
}

/**
 * Calculates the line total for a single cart item.
 * @param {Object} item - Cart item with price and quantity
 * @returns {number} Line total cost
 */
export function calculateLineTotal(item) {
  return (Number(item.price) || 0) * (Number(item.quantity) || 0);
}

/**
 * Calculates the total number of items and total cost across the entire cart.
 * @param {Array} cart - Current cart state
 * @returns {{ totalItems: number, totalCost: number }}
 */
export function calculateCartTotals(cart) {
  return cart.reduce(
    (acc, item) => {
      const quantity = Number(item.quantity) || 0;
      const lineTotal = calculateLineTotal(item);
      return {
        totalItems: acc.totalItems + quantity,
        totalCost: acc.totalCost + lineTotal,
      };
    },
    { totalItems: 0, totalCost: 0 }
  );
}

