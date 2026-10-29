import Link from 'next/link';
import { fetchCategories, fetchAllProducts } from '@/utils/api';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchAllProducts(),
  ]);

  return (
    <div>
      {/* Categories Section */}
      <section className="section-block" aria-labelledby="categories-heading">
        <div className="section-header">
          <h1 id="categories-heading" className="section-title">
            Browse by Category
          </h1>
          <p className="section-subtitle">
            Select a category to filter products
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="category-card"
            >
              <span>{category}</span>
              <span className="category-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* All Products Section */}
      <section className="section-block" aria-labelledby="products-heading">
        <div className="section-header">
          <h2 id="products-heading" className="section-title">
            All Products
          </h2>
          <p className="section-subtitle">
            Showing {products.length} products from FakeStoreAPI
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

