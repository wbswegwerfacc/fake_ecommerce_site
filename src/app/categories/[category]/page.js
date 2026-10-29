import Link from 'next/link';
import { fetchProductsByCategory, fetchCategories } from '@/utils/api';
import ProductCard from '@/components/ProductCard';

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const decodedCategory = decodeURIComponent(resolvedParams.category);

  const [products, allCategories] = await Promise.all([
    fetchProductsByCategory(decodedCategory),
    fetchCategories(),
  ]);

  return (
    <div>
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <Link href="/" className="breadcrumb-link">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span>Categories</span>
        <span aria-hidden="true">/</span>
        <span style={{ textTransform: 'capitalize', fontWeight: 800 }}>
          {decodedCategory}
        </span>
      </nav>

      {/* Category Switcher */}
      <section className="section-block" aria-label="Other categories">
        <div className="categories-grid">
          {allCategories.map((cat) => {
            const isActive = cat.toLowerCase() === decodedCategory.toLowerCase();
            return (
              <Link
                key={cat}
                href={`/categories/${encodeURIComponent(cat)}`}
                className="category-card"
                aria-current={isActive ? 'page' : undefined}
                style={
                  isActive
                    ? {
                        borderColor: 'var(--accent-primary)',
                        backgroundColor: 'var(--accent-badge-bg)',
                        color: 'var(--accent-badge-text)',
                      }
                    : undefined
                }
              >
                <span>{cat}</span>
                <span className="category-arrow" aria-hidden="true">
                  {isActive ? '✓' : '→'}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Products in Selected Category (Reusing ProductCard) */}
      <section className="section-block" aria-labelledby="category-title">
        <div className="section-header">
          <h1
            id="category-title"
            className="section-title"
            style={{ textTransform: 'capitalize' }}
          >
            {decodedCategory}
          </h1>
          <p className="section-subtitle">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <h2>No products found in &ldquo;{decodedCategory}&rdquo;</h2>
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

