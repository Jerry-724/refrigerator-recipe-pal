
import React, { useState } from 'react';
import CategoryTabs from '@/components/inventory/CategoryTabs';
import InventoryList from '@/components/inventory/InventoryList';
import OCRScan from '@/components/inventory/OCRScan';
import Modal from '@/components/common/Modal';
import { useInventory } from '@/contexts/InventoryContext';

const InventoryPage: React.FC = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [showOCR, setShowOCR] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');
  
  const { addItem } = useInventory();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setShowUpload(false);
      setShowOCR(true);
    }
  };
  
  const handleOCRComplete = (name: string, expiryDate: string) => {
    // Add the new item to inventory
    addItem({
      name,
      expiryDate,
      category: '동물성', // Default category
      subcategory: '기타', // Default subcategory
      registrationDate: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
    });
    
    setShowOCR(false);
    setUploadedImage('');
  };
  
  const handleOCRCancel = () => {
    setShowOCR(false);
    setUploadedImage('');
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold mb-4">내 냉장고</h1>
        <CategoryTabs />
      </div>
      
      <InventoryList />
      
      {/* Upload Modal */}
      <Modal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
      >
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">식품 추가하기</h3>
          <p className="text-gray-500 mb-6">
            식품 정보를 스캔하려면 사진을 업로드하세요
          </p>
          <label className="block w-full cursor-pointer">
            <div className="bg-primary/10 text-primary rounded-lg py-8 text-center">
              <div className="mb-2">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#8DD07E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 8L12 3L7 8" stroke="#8DD07E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3V15" stroke="#8DD07E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-medium">사진 업로드</span>
            </div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange}
            />
          </label>
        </div>
      </Modal>
      
      {/* OCR Scanning Screen */}
      {showOCR && uploadedImage && (
        <OCRScan 
          imageUrl={uploadedImage} 
          onComplete={handleOCRComplete}
          onCancel={handleOCRCancel}
        />
      )}
    </div>
  );
};

export default InventoryPage;
