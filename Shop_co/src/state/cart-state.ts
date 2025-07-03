

import type { Product } from '../api/dummy-api';

const API_BASE_URL = 'https://dummyjson.com';
const DEMO_CART_ID = 14; // Мы всегда будем использовать корзину №1

// Тип для корзины, как она приходит с сервера
export type Cart = {
  id: number;
  products: (Product & { quantity: number; total: number; discountedPrice: number; })[];
  total: number;
  discountedTotal: number;
  totalQuantity: number;
};

// Функция для загрузки демонстрационной корзины с сервера
export const fetchDemoCart = async (): Promise<Cart | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${DEMO_CART_ID}`);
    if (!response.ok) throw new Error('Demo cart not found');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch demo cart:", error);
    return null;
  }
};