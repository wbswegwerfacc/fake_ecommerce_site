import Link from 'next/link';
import CartStatusBadge from './CartStatusBadge';

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main Navigation">
        <div className="nav-brand-group">
          <Link href="/" className="brand-link">
            <span className="brand-logo" aria-hidden="true">🛍️</span>
            <span>FakeStore</span>
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/cart" className="nav-link">
              Cart
            </Link>
          </div>
        </div>

        <CartStatusBadge />
      </nav>
    </header>
  );
}

