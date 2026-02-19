/* =========================
   ENUMS
========================= */

export enum PriceType {
  FREE = 'FREE',
  PAID = 'PAID',
}

export enum AvailabilityStatus {
  YES = 'yes',
  NO = 'no',
}

export enum CurrencyType {
  INR = 'INR',
  USD = 'USD',
  EUR = 'EUR',
  // Add more if needed
}

export enum MentorStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}


/* =========================
   MENTOR MODEL
========================= */

export interface MentorItem {
  serialNo: number;
  mentorID: number;
  userID: number;

  mentorTitle: string;
  mentorDescription: string;
  mentorTags: string[];
  mentoringField: string;

  price: PriceType;
  amount: number;
  discount: number;
  currencyType: CurrencyType;

  ratings: number;
  availability: AvailabilityStatus;
  mentorStatus: MentorStatus;

  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;

  photo: string;
  imageUrl?: string | null;

  location: string;
  linkedin?: string;
  education?: string;
  profession?: string;
  experience?: string;

  recognitions?: string | null;
  connectedStatus: number;
}


/* =========================
   API RESPONSE MODEL
========================= */

export interface MentorResponse {
  status: {
    statusCode: number;
    message: string;
  };
  data: {
    info: {
      actionType: string;
    };
    content: MentorItem[];
  };
}
