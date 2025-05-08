
import React, { useRef, useState, useEffect } from 'react';
import { categoryData } from '@/utils/categoryData';
import { FoodCategory } from '@/types';
import { useInventory } from '@/contexts/InventoryContext';

const CategoryTabs: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { selectedCategory, selectCategory } = useInventory();
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Handle scroll events
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      return () => currentRef.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleCategoryClick = (category: FoodCategory) => {
    selectCategory(selectedCategory === category ? null : category);
  };

  return (
    <div className="relative pb-1">
      {/* Gradient indicators to show there's more content */}
      {scrollPosition > 10 && (
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10" />
      )}
      
      {scrollContainerRef.current && 
        scrollPosition < scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10 && (
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10" />
      )}
    
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto py-2 px-2 category-scroll"
      >
        {categoryData.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className={`flex flex-col items-center justify-center min-w-[70px] px-2 py-1 mx-1 rounded-xl transition-colors ${
              selectedCategory === category.name 
                ? 'bg-primary/20 text-primary' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <span className="text-2xl mb-1">{category.emoji}</span>
            <span className="text-xs whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
