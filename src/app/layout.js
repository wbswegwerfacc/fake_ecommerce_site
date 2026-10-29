import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'FakeStore eCommerce | Next.js App Router',
  description: 'High-contrast eCommerce storefront powered by Next.js App Router and FakeStoreAPI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="main-content container">{children}</main>
          <footer className="site-footer">
            <div className="container">
              FakeStore eCommerce Skeleton — Built with Next.js App Router &amp; FakeStoreAPI
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

