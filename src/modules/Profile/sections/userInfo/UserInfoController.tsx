// UserInfoController.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateProfileField,
} from '../../../../redux/slices/userProfileSlice';

// import {
//   loadUserProfileFromStorage,
//   saveUserProfileToStorage,
//   updateUserProfile,
// } from '../../../controllers/UserProfileController';

import UserInfoView from './UserInfoView';

const UserInfoController = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.userProfile);
  // const { apiKey, accessToken, loginName } = useSelector(
  //   (state: any) => state.auth
  // );

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({
    personal: false,
    address: false,
    education: false,
    social: false,
    extras: false,
    about: false,
  });

  useEffect(() => {
    const loadData = async () => {
      // const storedProfile = await loadUserProfileFromStorage();
      // dispatch(setProfile(storedProfile));
    };
    loadData();
  }, [dispatch]);

  const toggle = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      dispatch(
        updateProfileField({
          field: parent,
          value: { ...profile[parent], [child]: value },
        })
      );
    } else {
      dispatch(updateProfileField({ field, value }));
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // await updateUserProfile({ apiKey, accessToken, loginName, profile });
      // await saveUserProfileToStorage({ profile });
      // alert('Profile updated!');
    } catch (e) {
      // alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserInfoView
      profile={profile}
      expanded={expanded}
      loading={loading}
      onToggle={toggle}
      onChange={handleChange}
      onUpdate={handleUpdate}
    />
  );
};

export default UserInfoController;
