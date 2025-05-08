
import { CategoryInfo } from '../types';

export const categoryData: CategoryInfo[] = [
  {
    name: '동물성',
    emoji: '🥩',
    subcategories: ['돼지', '소', '닭', '유제품', '계란', '해산물']
  },
  {
    name: '식물성',
    emoji: '🥬',
    subcategories: ['채소', '과일', '견과류', '콩류']
  },
  {
    name: '가공식품',
    emoji: '🥫',
    subcategories: ['냉동식품', '즉석식품', '통조림', '발효식품']
  },
  {
    name: '디저트',
    emoji: '🍰',
    subcategories: ['과자', '빵', '케이크', '아이스크림', '초콜릿']
  },
  {
    name: '조미료',
    emoji: '🧂',
    subcategories: ['기본양념', '소스', '드레싱', '허브']
  }
];

export const getCategoryByName = (name: string): CategoryInfo | undefined => {
  return categoryData.find(category => category.name === name);
};

export const getAllSubcategories = (): string[] => {
  return categoryData.flatMap(category => category.subcategories);
};
