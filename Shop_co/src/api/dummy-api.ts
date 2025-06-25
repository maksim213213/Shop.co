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