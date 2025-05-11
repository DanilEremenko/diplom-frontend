import React, { useState } from 'react';
import { Avatar } from 'antd';
import RoleSwitcher from './RoleSwitcher';
import ProfileModal from './ProfileModal';
import ChangePhotoPopup from './ChangePhotoPopup';
import NotificationBell from './NotificationBell'; // подключён работающий колокольчик
import '../styles/Header.css';

const Header = ({ onRoleChange, onToggleMainContent }) => {
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [userInitials, setUserInitials] = useState('');
    const [isChangePhotoVisible, setIsChangePhotoVisible] = useState(false);

    const handleAvatarClick = () => {
        setIsProfileVisible(true);
        onToggleMainContent?.(false);
    };

    const handleCloseProfile = () => {
        setIsProfileVisible(false);
        onToggleMainContent?.(true);
    };

    const handlePhotoChange = (newPhotoUrl) => {
        setProfilePhoto(newPhotoUrl);
    };

    const handleUserInitials = (firstName, lastName) => {
        const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
        setUserInitials(initials);
    };

    return (
        <>
            <div className="header-container">
                <RoleSwitcher onRoleChange={onRoleChange} />
                <div className="header-icons">
                    <NotificationBell /> {/* 👈 финальный колокольчик здесь */}
                    <Avatar
                        src={profilePhoto || undefined}
                        className="user-avatar"
                        onClick={handleAvatarClick}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: !profilePhoto ? '#1890ff' : 'transparent',
                            verticalAlign: 'middle',
                        }}
                    >
                        {!profilePhoto && userInitials}
                    </Avatar>
                </div>
            </div>

            <ProfileModal
                visible={isProfileVisible}
                onClose={handleCloseProfile}
                profilePhoto={profilePhoto}
                onPhotoChange={handlePhotoChange}
                onOpenChangePhoto={() => setIsChangePhotoVisible(true)}
                setUserInitials={handleUserInitials}
            />

            <ChangePhotoPopup
                visible={isChangePhotoVisible}
                onOk={() => setIsChangePhotoVisible(false)}
                onCancel={() => setIsChangePhotoVisible(false)}
                onPhotoChange={(url) => {
                    setProfilePhoto(url);
                    localStorage.setItem('pendingProfilePhoto', url);
                }}
            />
        </>
    );
};

export default Header;
