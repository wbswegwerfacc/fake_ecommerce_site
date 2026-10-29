/**
 * Formats a numeric price into Euros (€) using Intl.NumberFormat.
 * @param {number} amount - The price to format.
 * @returns {string} Formatted currency string in EUR.
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(amount) || 0);
}

