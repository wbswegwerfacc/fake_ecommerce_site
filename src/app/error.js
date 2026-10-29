'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="empty-state" role="alert">
      <h1 className="section-title">Something went wrong</h1>
      <p className="section-subtitle">
        The products could not be loaded from FakeStoreAPI. Please try again.
      </p>
      <div className="status-actions">
        <button type="button" onClick={() => reset()} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
