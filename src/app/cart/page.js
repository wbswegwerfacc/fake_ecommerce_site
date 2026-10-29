import { CartTable } from '@/components';

export const metadata = {
  title: 'Your Shopping Cart | FakeStore eCommerce',
};

export default function CartPage() {
  return (
    <section className="section-block" aria-labelledby="cart-heading">
      <div className="section-header">
        <h1 id="cart-heading" className="section-title">
          Your Shopping Cart
        </h1>
      </div>

      <CartTable />
    </section>
  );
}
