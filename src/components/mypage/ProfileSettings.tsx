
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';
import Modal from '../common/Modal';

const ProfileSettings: React.FC = () => {
  const { user, logout, updateNickname, updatePassword, deleteAccount } = useAuth();
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [deleteConfirmPassword, setDeleteConfirmPassword] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };
  
  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(deleteConfirmPassword);
      setShowDeleteModal(false);
    } catch (error) {
      setError('계정 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };
  
  const handleUpdateNickname = async () => {
    try {
      await updateNickname(newNickname);
      setShowNicknameModal(false);
      setSuccess('닉네임이 변경되었습니다.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('닉네임 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };
  
  const handleUpdatePassword = async () => {
    try {
      await updatePassword(newPassword);
      setShowPasswordModal(false);
      setSuccess('비밀번호가 변경되었습니다.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };
  
  return (
    <div className="p-4 space-y-6">
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md">
          {success}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-primary text-xl font-medium">
              {user?.nickname?.[0] || 'U'}
            </span>
          </div>
          <div>
            <h2 className="font-medium">{user?.nickname || '사용자'}</h2>
            <p className="text-sm text-gray-500">{user?.email || 'email@example.com'}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm divide-y">
        <div className="p-4 flex justify-between items-center">
          <span>푸시 알림</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={notificationEnabled}
              onChange={() => setNotificationEnabled(!notificationEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <button 
          className="p-4 w-full text-left" 
          onClick={() => setShowNicknameModal(true)}
        >
          닉네임 변경
        </button>
        
        <button 
          className="p-4 w-full text-left" 
          onClick={() => setShowPasswordModal(true)}
        >
          비밀번호 변경
        </button>
        
        <button 
          className="p-4 w-full text-left text-red-500" 
          onClick={() => setShowDeleteModal(true)}
        >
          회원 탈퇴
        </button>
      </div>
      
      <CustomButton
        onClick={() => setShowLogoutModal(true)}
        variant="outline"
        fullWidth
      >
        로그아웃
      </CustomButton>
      
      {/* Logout Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      >
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">로그아웃 하시겠습니까?</h3>
          <div className="flex space-x-4 mt-6">
            <CustomButton
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
              className="flex-1"
            >
              취소
            </CustomButton>
            <CustomButton
              onClick={handleLogout}
              className="flex-1"
            >
              로그아웃
            </CustomButton>
          </div>
        </div>
      </Modal>
      
      {/* Delete Account Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">정말 탈퇴하시겠어요?</h3>
          <p className="text-gray-500 mb-4">계정을 삭제하면 모든 데이터가 사라집니다. 이 작업은 되돌릴 수 없습니다.</p>
          
          <div className="mb-4">
            <CustomInput 
              type="password"
              placeholder="비밀번호 확인"
              value={deleteConfirmPassword}
              onChange={e => setDeleteConfirmPassword(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-4">
            <CustomButton
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="flex-1"
            >
              취소
            </CustomButton>
            <CustomButton
              onClick={handleDeleteAccount}
              className="flex-1 bg-red-500"
            >
              탈퇴
            </CustomButton>
          </div>
        </div>
      </Modal>
      
      {/* Change Nickname Modal */}
      <Modal
        isOpen={showNicknameModal}
        onClose={() => setShowNicknameModal(false)}
      >
        <div>
          <h3 className="text-lg font-medium mb-4">닉네임 변경</h3>
          
          <div className="space-y-4">
            <CustomInput 
              type="password"
              label="현재 비밀번호"
              placeholder="현재 비밀번호를 입력하세요"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            
            <CustomInput 
              label="새 닉네임"
              placeholder="새 닉네임을 입력하세요"
              value={newNickname}
              onChange={e => setNewNickname(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-4 mt-6">
            <CustomButton
              variant="outline"
              onClick={() => setShowNicknameModal(false)}
              className="flex-1"
            >
              취소
            </CustomButton>
            <CustomButton
              onClick={handleUpdateNickname}
              className="flex-1"
              disabled={!currentPassword || !newNickname}
            >
              변경
            </CustomButton>
          </div>
        </div>
      </Modal>
      
      {/* Change Password Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      >
        <div>
          <h3 className="text-lg font-medium mb-4">비밀번호 변경</h3>
          
          <div className="space-y-4">
            <CustomInput 
              type="password"
              label="현재 비밀번호"
              placeholder="현재 비밀번호를 입력하세요"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            
            <CustomInput 
              type="password"
              label="새 비밀번호"
              placeholder="새 비밀번호를 입력하세요"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-4 mt-6">
            <CustomButton
              variant="outline"
              onClick={() => setShowPasswordModal(false)}
              className="flex-1"
            >
              취소
            </CustomButton>
            <CustomButton
              onClick={handleUpdatePassword}
              className="flex-1"
              disabled={!currentPassword || !newPassword}
            >
              변경
            </CustomButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileSettings;
