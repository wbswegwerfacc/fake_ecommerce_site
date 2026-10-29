'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context';
import { calculateLineTotal, formatPrice } from '@/utils';
import CartControls from './CartControls';

export default function CartTable() {
  const { cart, totalItems, totalCost, isHydrated } = useCart();

  if (!isHydrated) {
    return <p className="section-subtitle">Loading cart from localStorage...</p>;
  }

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your cart is currently empty</h2>
        <p className="section-subtitle">
          Browse our categories or products on the home page to add items.
        </p>
        <Link href="/" className="btn btn-primary">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="section-subtitle">
        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
      </p>

      <div className="cart-table-wrapper">
        <table className="cart-table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Category</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Quantity</th>
              <th scope="col" className="text-right">
                Line Total
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const lineSum = calculateLineTotal(item);
              return (
                <tr key={item.id}>
                  <td>
                    <div className="cart-product-cell">
                      <div className="cart-thumb-wrapper">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="60px"
                          className="cart-thumb"
                        />
                      </div>
                      <div>
                        <p className="cart-item-title">{item.title}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Link
                      href={`/categories/${encodeURIComponent(item.category)}`}
                      className="category-badge"
                    >
                      {item.category}
                    </Link>
                  </td>
                  <td>
                    <strong>{formatPrice(item.price)}</strong>
                  </td>
                  <td style={{ minWidth: '185px', maxWidth: '220px' }}>
                    <CartControls product={item} />
                  </td>
                  <td className="text-right">
                    <strong>{formatPrice(lineSum)}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>
                Total Amount ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </td>
              <td colSpan={2} className="text-right">
                {formatPrice(totalCost)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
