
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CustomButton from "@/components/common/CustomButton";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">페이지를 찾을 수 없습니다</p>
        <div className="space-y-2">
          <CustomButton onClick={() => navigate('/inventory')}>
            내 냉장고로 가기
          </CustomButton>
          <div className="h-2"></div>
          <CustomButton variant="outline" onClick={() => navigate(-1)}>
            이전 페이지로 돌아가기
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
