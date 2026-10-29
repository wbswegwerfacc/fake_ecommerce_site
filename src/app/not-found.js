import Link from 'next/link';

export const metadata = {
  title: 'Page not found | FakeStore eCommerce',
};

export default function NotFound() {
  return (
    <div className="empty-state">
      <h1 className="section-title">404 – Page not found</h1>
      <p className="section-subtitle">
        The page or category you are looking for does not exist.
      </p>
      <Link href="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
