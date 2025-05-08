
export interface User {
  id: string;
  nickname: string;
  email: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  subcategory: string;
  expiryDate: string;
  registrationDate: string;
  image?: string;
}

export type FoodCategory = 
  | '동물성' 
  | '식물성' 
  | '가공식품' 
  | '디저트' 
  | '조미료';

export interface CategoryInfo {
  name: FoodCategory;
  emoji: string;
  subcategories: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: number;
}
