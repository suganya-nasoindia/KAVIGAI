import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setMentorInfo } from '../../../../redux/slices/userProfileSlice';
import type { RootState } from '../../../../redux/reactstore';

export const useMentorInfoController = () => {
  const dispatch = useDispatch();
  const mentorInfo = useSelector(
    (state: RootState) => state.userProfile.mentorInfo
  );

  const [form, setForm] = useState(mentorInfo);

  const updateField = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const saveMentorInfo = () => {
    dispatch(setMentorInfo(form));
  };

  return {
    form,
    updateField,
    saveMentorInfo,
  };
};