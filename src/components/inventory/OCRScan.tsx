
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../common/CustomButton';

interface OCRScanProps {
  imageUrl: string;
  onComplete: (name: string, expiryDate: string) => void;
  onCancel: () => void;
}

const OCRScan: React.FC<OCRScanProps> = ({ imageUrl, onComplete, onCancel }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [foodName, setFoodName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  
  useEffect(() => {
    // Simulate OCR scanning
    const timer = setTimeout(() => {
      setIsScanning(false);
      
      // Generate mock OCR data
      const mockFoodItems = ['바나나', '사과', '우유', '소고기', '당근', '토마토'];
      const randomFood = mockFoodItems[Math.floor(Math.random() * mockFoodItems.length)];
      
      // Generate a random future date for expiry
      const today = new Date();
      const randomDays = Math.floor(Math.random() * 30) + 1; // 1-30 days in future
      const futureDate = new Date(today.setDate(today.getDate() + randomDays));
      const formattedDate = `${futureDate.getFullYear()}.${String(futureDate.getMonth() + 1).padStart(2, '0')}.${String(futureDate.getDate()).padStart(2, '0')}`;
      
      setFoodName(randomFood);
      setExpiryDate(formattedDate);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = () => {
    onComplete(foodName, expiryDate);
  };
  
  if (isScanning) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-6">OCR 인식 중...</h2>
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 text-gray-500">식품 정보를 인식하고 있습니다</p>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-white p-6">
      <h2 className="text-xl font-bold mb-6 text-center">식품 정보 확인</h2>
      
      {imageUrl && (
        <div className="mb-6 bg-gray-100 p-2 rounded-lg flex justify-center">
          <img src={imageUrl} alt="Uploaded food" className="h-40 object-contain" />
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            식품명
          </label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            유통기한
          </label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="YYYY.MM.DD"
          />
        </div>
      </div>
      
      <div className="mt-8 space-y-3">
        <CustomButton onClick={handleSubmit} fullWidth>
          정보 저장하기
        </CustomButton>
        <CustomButton onClick={onCancel} variant="outline" fullWidth>
          취소
        </CustomButton>
      </div>
    </div>
  );
};

export default OCRScan;
