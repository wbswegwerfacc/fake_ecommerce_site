export default function Loading() {
  return (
    <div className="status-state" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p className="section-subtitle">Loading products...</p>
    </div>
  );
}
