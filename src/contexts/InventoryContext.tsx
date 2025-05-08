
import React, { createContext, useState, useContext, useEffect } from 'react';
import { FoodItem, FoodCategory } from '../types';

interface InventoryContextType {
  items: FoodItem[];
  selectedCategory: FoodCategory | null;
  selectCategory: (category: FoodCategory | null) => void;
  addItem: (item: Omit<FoodItem, 'id'>) => void;
  removeItems: (itemIds: string[]) => void;
  selectedItems: string[];
  selectionMode: boolean;
  toggleSelectionMode: () => void;
  toggleItemSelection: (itemId: string) => void;
  clearSelection: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Sample inventory data
const initialItems: FoodItem[] = [
  {
    id: '1',
    name: '돼지고기',
    category: '동물성',
    subcategory: '돼지',
    expiryDate: '2025.05.15',
    registrationDate: '2025.05.01'
  },
  {
    id: '2',
    name: '우유',
    category: '동물성',
    subcategory: '유제품',
    expiryDate: '2025.05.10',
    registrationDate: '2025.05.01'
  },
  {
    id: '3',
    name: '당근',
    category: '식물성',
    subcategory: '채소',
    expiryDate: '2025.05.12',
    registrationDate: '2025.05.01'
  },
  {
    id: '4',
    name: '사과',
    category: '식물성',
    subcategory: '과일',
    expiryDate: '2025.05.14',
    registrationDate: '2025.05.01'
  },
  {
    id: '5',
    name: '김치',
    category: '가공식품',
    subcategory: '발효식품',
    expiryDate: '2025.06.01',
    registrationDate: '2025.05.01'
  },
  {
    id: '6',
    name: '초콜릿',
    category: '디저트',
    subcategory: '간식',
    expiryDate: '2025.07.15',
    registrationDate: '2025.05.01'
  },
  {
    id: '7',
    name: '소금',
    category: '조미료',
    subcategory: '기본양념',
    expiryDate: '2026.05.01',
    registrationDate: '2025.05.01'
  },
];

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  useEffect(() => {
    // Load from localStorage or use initial data
    const savedItems = localStorage.getItem('inventoryItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(initialItems);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever items change
    localStorage.setItem('inventoryItems', JSON.stringify(items));
  }, [items]);

  const selectCategory = (category: FoodCategory | null) => {
    setSelectedCategory(category);
  };

  const addItem = (item: Omit<FoodItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    setItems(prevItems => [...prevItems, newItem]);
  };

  const removeItems = (itemIds: string[]) => {
    setItems(prevItems => prevItems.filter(item => !itemIds.includes(item.id)));
    setSelectedItems([]);
    setSelectionMode(false);
  };

  const toggleSelectionMode = () => {
    setSelectionMode(prev => !prev);
    setSelectedItems([]);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  return (
    <InventoryContext.Provider 
      value={{
        items,
        selectedCategory,
        selectCategory,
        addItem,
        removeItems,
        selectedItems,
        selectionMode,
        toggleSelectionMode,
        toggleItemSelection,
        clearSelection
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
