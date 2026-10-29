import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/utils';
import CartControls from './CartControls';

export default function ProductCard({ product }) {
  const categoryHref = `/categories/${encodeURIComponent(product.category)}`;

  return (
    <article className="product-card">
      <div className="product-image-container">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="product-image"
        />
      </div>

      <div className="product-card-body">
        <div className="product-meta">
          <Link href={categoryHref} className="category-badge">
            {product.category}
          </Link>
        </div>

        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>

        <div className="product-card-footer">
          <p className="product-price">{formatPrice(product.price)}</p>
          <CartControls
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              category: product.category,
            }}
          />
        </div>
      </div>
    </article>
  );
}

