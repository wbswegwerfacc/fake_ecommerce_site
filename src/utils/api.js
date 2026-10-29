const BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetches all product categories from FakeStoreAPI.
 * @returns {Promise<string[]>} List of category names
 */
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch categories from FakeStoreAPI');
  }
  return res.json();
}

/**
 * Fetches all products from FakeStoreAPI.
 * @returns {Promise<Array>} List of product objects
 */
export async function fetchAllProducts() {
  const res = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch products from FakeStoreAPI');
  }
  return res.json();
}

/**
 * Fetches all products belonging to a specific category from FakeStoreAPI.
 * @param {string} category - The raw (decoded) category name
 * @returns {Promise<Array>} List of product objects in that category
 */
export async function fetchProductsByCategory(category) {
  const encodedCategory = encodeURIComponent(category);
  const res = await fetch(`${BASE_URL}/products/category/${encodedCategory}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch products for category: ${category}`);
  }
  return res.json();
}

