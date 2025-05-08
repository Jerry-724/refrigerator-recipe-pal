
import React from 'react';
import { FoodItem } from '@/types';
import { useInventory } from '@/contexts/InventoryContext';

interface InventoryItemProps {
  item: FoodItem;
  onLongPress: () => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ item, onLongPress }) => {
  const { selectionMode, selectedItems, toggleItemSelection } = useInventory();
  const isSelected = selectedItems.includes(item.id);
  
  // Long press handling
  const startPressTimer = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const timer = setTimeout(() => {
      onLongPress();
    }, 700); // Long press after 700ms
    
    const cleanup = () => {
      document.removeEventListener('mouseup', clearPressTimer);
      document.removeEventListener('touchend', clearPressTimer);
      clearTimeout(timer);
    };
    
    const clearPressTimer = () => cleanup();
    
    document.addEventListener('mouseup', clearPressTimer);
    document.addEventListener('touchend', clearPressTimer);
    
    return () => cleanup();
  };
  
  // Handle normal click/tap based on selection mode
  const handleClick = () => {
    if (selectionMode) {
      toggleItemSelection(item.id);
    }
  };
  
  // Calculate days until expiry
  const getExpiryInfo = (): { daysLeft: number; status: string } => {
    const expiryDate = new Date(item.expiryDate.replace(/\./g, '-'));
    const today = new Date();
    
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let status = 'normal';
    if (diffDays < 0) status = 'expired';
    else if (diffDays < 3) status = 'soon';
    
    return { daysLeft: diffDays, status };
  };
  
  const { daysLeft, status } = getExpiryInfo();
  
  return (
    <div
      className={`p-3 border-b border-gray-100 flex items-center ${
        selectionMode ? 'bg-gray-50' : ''
      }`}
      onMouseDown={selectionMode ? undefined : startPressTimer}
      onTouchStart={selectionMode ? undefined : startPressTimer}
      onClick={handleClick}
    >
      {selectionMode && (
        <div className="mr-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleItemSelection(item.id)}
            className="custom-checkbox"
          />
        </div>
      )}
      
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{item.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            status === 'expired' ? 'bg-red-100 text-red-600' : 
            status === 'soon' ? 'bg-yellow-100 text-yellow-600' : 
            'bg-green-100 text-green-600'
          }`}>
            {status === 'expired' ? '만료됨' : 
             status === 'soon' ? `${daysLeft}일 남음` : 
             `${daysLeft}일 남음`}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">유통기한: {item.expiryDate}</p>
      </div>
    </div>
  );
};

export default InventoryItem;
