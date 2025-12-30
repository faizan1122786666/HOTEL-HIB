// Currency Utility Functions

/**
 * Format amount in Pakistani Rupees
 * @param {number} amount - Amount to format
 * @param {boolean} includeSymbol - Whether to include Rs symbol
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, includeSymbol = true) => {
  const formatted = amount.toLocaleString('en-PK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  
  return includeSymbol ? `Rs ${formatted}` : formatted;
};

/**
 * Format currency for display
 * @param {number} amount 
 * @returns {string}
 */
export const formatPrice = (amount) => {
  return formatCurrency(amount, true);
};

/**
 * Get currency symbol
 * @returns {string}
 */
export const getCurrencySymbol = () => {
  return 'Rs';
};

/**
 * Get currency code
 * @returns {string}
 */
export const getCurrencyCode = () => {
  return 'PKR';
};

/**
 * Parse price string to number
 * @param {string} priceString - Price string like "Rs 1,500"
 * @returns {number}
 */
export const parsePrice = (priceString) => {
  if (typeof priceString === 'number') return priceString;
  return parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
};

export default {
  formatCurrency,
  formatPrice,
  getCurrencySymbol,
  getCurrencyCode,
  parsePrice,
};