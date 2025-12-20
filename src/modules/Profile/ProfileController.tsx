// ProfileController.tsx
import React, { useState } from 'react';
import ProfileView from './ProfileView';

const TABS = ['User Info', 'Mentor Info', 'Services', 'Reset Password'];

const ProfileController = () => {
  const [selectedTab, setSelectedTab] = useState<string>('User Info');

  const onTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <ProfileView
      tabs={TABS}
      selectedTab={selectedTab}
      onTabChange={onTabChange}
    />
  );
};

export default ProfileController;
