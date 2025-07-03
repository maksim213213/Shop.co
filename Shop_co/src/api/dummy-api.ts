// src/api/dummy-api.ts

const API_BASE_URL = 'https://dummyjson.com';

// Описываем тип данных для одной категории, который мы получаем
export type Category = {
  slug: string;
  name: string;
  url: string;
};

// getCategory для получения списка категорий из апи
export const getCategories = async (): Promise<Category[]> => {
  try {
    // Используем эндпоинт для получения списка категорий
    const response = await fetch(`${API_BASE_URL}/products/category-list`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const categories: Category[] = await response.json();
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

export type Product = {
  id: number;
  category: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  discountPercentage: number;
};

// тайп для ответа с товарами
type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

// Функция для получения товаров по категории
export const getProductsByCategory = async (categorySlug: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${categorySlug}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ProductsResponse = await response.json();
    return data.products; // Возвращаем только массив продуктов
  } catch (error) {
    console.error(`Failed to fetch products for category ${categorySlug}:`, error);
    return [];
  }
};
export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const product: Product = await response.json();
    return product;
  } catch (error) {
    console.error(`Failed to fetch product with id ${productId}:`, error);
    return null;
  }
};