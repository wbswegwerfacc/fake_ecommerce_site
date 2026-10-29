'use client';

import Link from 'next/link';
import { useCart } from '@/context';
import { formatPrice } from '@/utils';

export default function CartStatusBadge() {
  const { totalItems, totalCost, isHydrated } = useCart();

  return (
    <Link
      href="/cart"
      className="nav-cart-link"
      aria-label={`Cart with ${isHydrated ? totalItems : 0} items, total ${formatPrice(isHydrated ? totalCost : 0)}`}
    >
      <span className="cart-icon-wrapper" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="21" r="1.5" />
          <circle cx="19" cy="21" r="1.5" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
        <span className="cart-count-badge">
          {isHydrated ? totalItems : 0}
        </span>
      </span>
      <span className="cart-summary-text">
        <span className="cart-label">Cart</span>
        <span className="cart-total-price">
          {formatPrice(isHydrated ? totalCost : 0)}
        </span>
      </span>
    </Link>
  );
}

