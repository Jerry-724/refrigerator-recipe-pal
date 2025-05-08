
import React, { useState } from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import InventoryItem from './InventoryItem';
import Modal from '../common/Modal';
import CustomButton from '../common/CustomButton';
import { X, Plus } from 'lucide-react';

const InventoryList: React.FC = () => {
  const { 
    items, 
    selectedCategory, 
    selectionMode, 
    toggleSelectionMode, 
    selectedItems, 
    removeItems 
  } = useInventory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Filter items by selected category
  const filteredItems = selectedCategory
    ? items.filter(item => item.category === selectedCategory)
    : items;

  // Group items by subcategory
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.subcategory]) {
      acc[item.subcategory] = [];
    }
    acc[item.subcategory].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  // Sort subcategories
  const sortedSubcategories = Object.keys(groupedItems).sort();

  const handleConfirmDelete = () => {
    removeItems(selectedItems);
    setShowDeleteModal(false);
  };

  const handleShowDelete = () => {
    if (selectedItems.length > 0) {
      setShowDeleteModal(true);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {sortedSubcategories.length > 0 ? (
        sortedSubcategories.map(subcategory => (
          <div key={subcategory} className="mb-4">
            <h2 className="text-sm font-medium bg-gray-50 px-4 py-2 sticky top-0">
              {subcategory}
            </h2>
            <div className="divide-y divide-gray-100">
              {groupedItems[subcategory].map(item => (
                <InventoryItem 
                  key={item.id} 
                  item={item}
                  onLongPress={toggleSelectionMode}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p>아직 등록된 식품이 없습니다.</p>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-5">
        <button 
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
            selectionMode ? 'bg-red-500 text-white' : 'bg-primary text-white'
          }`}
          onClick={selectionMode ? handleShowDelete : () => {/* Navigate to upload */}}
        >
          {selectionMode ? <X size={24} /> : <Plus size={24} />}
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">삭제하시겠습니까?</h3>
          <p className="text-gray-500 mb-6">
            선택한 {selectedItems.length}개의 항목을 삭제하시겠습니까?
          </p>
          <div className="flex space-x-4">
            <CustomButton
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="flex-1"
            >
              취소
            </CustomButton>
            <CustomButton
              onClick={handleConfirmDelete}
              className="flex-1 bg-red-500"
            >
              삭제
            </CustomButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InventoryList;
