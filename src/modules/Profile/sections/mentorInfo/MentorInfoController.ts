import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/reactstore';
import { MentorInfoService } from './MentorInfoService';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  apiKey: string;
  authToken: string;
  loginName: string;
  mentorID: number | null;
};

export const useMentorInfoController = () => {
  const reduxAuth = useSelector((state: any) => state.auth);

  const mentorInfo = useSelector(
    (state: RootState) => state.userProfile.mentorInfo
  );

  const [saving, setSaving] = useState(false);

  const [auth, setAuth] = useState<AuthState>({
    apiKey: '',
    authToken: '',
    loginName: '',
    mentorID: null,
  });

  const [form, setForm] = useState({
    ...mentorInfo,
    amount: mentorInfo.amount ?? 0,
    discount: mentorInfo.discount ?? 0,
  });

  /* ---------------- LOAD AUTH ---------------- */
  useEffect(() => {
    const loadAuth = async () => {
      const values = await AsyncStorage.multiGet([
        'API_KEY',
        'AUTH_TOKEN',
        'LOGIN_NAME',
        'MENTOR_ID',
      ]);

      const [apiKey, authToken, loginName, mentorID] =
        values.map(v => v[1]);

      setAuth({
        apiKey: apiKey || reduxAuth?.apiKey || '',
        authToken: authToken || reduxAuth?.accessToken || '',
        loginName: loginName || reduxAuth?.loginName || '',
        mentorID: mentorID ? Number(mentorID) : reduxAuth?.mentorID ?? null,
      });
    };

    loadAuth();
  }, [reduxAuth]);

  /* ---------------- HYDRATE FORM FROM REDUX ---------------- */
  useEffect(() => {
    setForm({
      ...mentorInfo,
      amount: mentorInfo.amount ?? 0,
      discount: mentorInfo.discount ?? 0,
    });
  }, [mentorInfo]);

  /* ---------------- BUSINESS RULES ---------------- */
  useEffect(() => {
    setForm(prev => {
      let next = { ...prev };

      if (prev.price === 'Free') {
        next.amount = 0;
        next.discount = 0;
      }

      if (prev.amount === 0) {
        next.discount = 0;
      }

      return next;
    });
  }, [form.price, form.amount]);

  /* ---------------- UPDATE FIELD ---------------- */
  const updateField = (field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ---------------- SAVE ---------------- */
  const saveMentorInfo = async () => {
    if (saving) return;
    console.log('on save mentor',auth.loginName, auth.mentorID);
    if (!auth.loginName || !auth.mentorID) {
      return {
        success: false,
        message: 'Authentication not ready',
      };
    }

    try {
      setSaving(true);

      const payload = {
        info: {
          type: 'mobile',
          actionType: 'update',
          platformType: 'mobile',
          outputType: 'json',
        },
        data: {
          content: {
            loginName: auth.loginName,
            mentorID: auth.mentorID,
            mentorType: 'MENTOR',

            mentorTitle: form.mentorTitle,
            mentorDescription: form.mentorDescription,
            mentorTags: form.mentorTags,
            mentoringField: form.mentoringField,

            price: form.price.toUpperCase(),
            amount: form.price === 'Free' ? 0 : form.amount,
            discount:
              form.price === 'Free' || form.amount === 0
                ? 0
                : form.discount,

            currencyType: form.currencyType || 'INR',
            ratings: form.ratings,
            availability: form.availability,
            mentorStatus: 1,
          },
        },
      };

      const response = await MentorInfoService.updateMentorInfo(
        auth.apiKey,
        auth.authToken,
        payload
      );

      // await dispatch(loadUserProfile());

      return {
        success: true,
        message: response?.message || 'Mentor updated',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || 'Update failed',
      };
    } finally {
      setSaving(false);
    }
  };

  return {
    form,
    saving,
    auth,
    updateField,
    saveMentorInfo,
  };
};
// function loadUserProfile(): any {
//   throw new Error('Function not implemented.');
// }

