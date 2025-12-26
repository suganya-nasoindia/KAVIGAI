export interface MentorInfo {
    mentorTitle: string;
    mentorDescription: string;
    mentoringField: string;
    price: 'Free' | 'Paid';
    amount: number;
    discount: number;
    currencyType: 'INR' | 'USD' | 'EUR';
    availability: string;
  }
  
  export const defaultMentorInfo: MentorInfo = {
    mentorTitle: '',
    mentorDescription: '',
    mentoringField: '',
    price: 'Free',
    amount: 0,
    discount: 0,
    currencyType: 'INR',
    availability: '',
  };
  