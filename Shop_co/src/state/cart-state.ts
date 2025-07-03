import type { Product } from '../api/dummy-api';

export type CartItem = Product & {
  quantity: number;
};

const CART_STORAGE_KEY = 'user_cart';

// Функция для получения корзины из localStorage
export const getCart = (): CartItem[] => {
  const cartJson = localStorage.getItem(CART_STORAGE_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
};

// Функция для сохранения корзины в localStorage
const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Главная функция: добавление товара в корзину
export const addToCart = (productToAdd: Product, quantity: number) => {
  const cart = getCart();
  
  // Проверяем, есть ли уже такой товар в корзине
  const existingItem = cart.find(item => item.id === productToAdd.id);

  if (existingItem) {
    // Если есть - просто увеличиваем его количество
    existingItem.quantity += quantity;
  } else {
    // Если нет - добавляем новый товар с указанным количеством
    cart.push({ ...productToAdd, quantity: quantity });
  }

  saveCart(cart); // Сохраняем обновленную корзину
  console.log('Cart updated:', getCart()); // Для отладки
};

// Функция для подсчета общего количества товаров в корзине
export const getCartTotalItems = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const removeFromCart = (productId: number) => {
  let cart = getCart();
  // Создаем новый массив, в который не войдет товар с удаляемым ID
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
};

// Функция для полной очистки корзины
export const clearCart = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
};