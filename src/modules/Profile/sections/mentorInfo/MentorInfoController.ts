import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/reactstore';
import { setMentorInfo } from '../../../../redux/slices/userProfileSlice';

export const useMentorInfoController = () => {
  const dispatch = useDispatch<AppDispatch>();

  const mentorInfo = useSelector(
    (state: RootState) => state.userProfile.mentorInfo
  );


  const [form,setForm] = useState({
    ...mentorInfo,
    amount: mentorInfo.amount ?? 0,
    discount: mentorInfo.discount ?? 0,
  });
  // ✅ VERY IMPORTANT: hydrate form from redux
  useEffect(() => {
    setForm({
      ...mentorInfo,
      amount: mentorInfo.amount || 0,
      discount: mentorInfo.discount || 0, 
    }
    );
  }, [mentorInfo]);

  useEffect(() => {
    setForm(prev => {
      if (prev.price === 'Free') {
        return {
          ...prev,
          amount: 0,
          discount: 0,
        };
      }
  
      if (prev.amount === 0 && prev.discount !== 0) {
        return {
          ...prev,
          discount: 0,
        };
      }
  
      return prev;
    });
  }, [form.price, form.amount, form.discount]);


  const updateField = (field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
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
