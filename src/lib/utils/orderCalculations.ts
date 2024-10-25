import { CartItem } from '../store';

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const TAX_RATE = 0.10; // 10% tax rate
const FREE_SHIPPING_THRESHOLD = 100; // Free shipping for orders over $100
const BASE_SHIPPING_COST = 9.99;

export function calculateOrderSummary(items: CartItem[]): OrderSummary {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * (item.quantity || 1));
  }, 0);

  // Calculate shipping
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : BASE_SHIPPING_COST;

  // Calculate tax (based on subtotal only, not shipping)
  const tax = subtotal * TAX_RATE;

  // Calculate total
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total
  };
}

export function formatOrderAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}