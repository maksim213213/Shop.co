// src/api/dummy-api.ts

const API_BASE_URL = 'https://dummyjson.com';

// Описываем тип данных для одной категории, который мы получаем
export type Category = {
  slug: string;
  name: string;
  url: string;
};

// Функция теперь возвращает Promise с массивом объектов типа Category
export const getCategories = async (): Promise<Category[]> => {
  try {
    // Используем правильный эндпоинт для получения списка объектов
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
  title: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  discountPercentage: number;
};

// API возвращает объект, внутри которого есть массив продуктов
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