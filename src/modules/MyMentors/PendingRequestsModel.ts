// {
//     "status": {
//         "statusCode": 200,
//         "message": "SUCCESS"
//     },
//     "data": {
//         "info": {
//             "actionType": "showall"
//         },
//         "content": [
//             {
//                 "serialNo": 3,
//                 "myMentorRequestID": 651,
//                 "userID": 3,
//                 "userLoginName": "sharwa",
//                 "userType": 0,
//                 "requestDate": "2025-07-24 18:30:00",
//                 "requestDescription": "I would like you to be my mentor",
//                 "mentorID": 33,
//                 "mentorTitle": "Startup and Technology Expert for Global",
//                 "mentorDescription": "Global Entrepreneurs",
//                 "mentorTags": [
//                     "Startup",
//                     " Entrepreneurship",
//                     " Investor",
//                     " Advisor",
//                     " Mentor"
//                 ],
//                 "mentoringField": null,
//                 "price": "PAID",
//                 "ratings": 0,
//                 "availability": null,
//                 "mentorStatus": 1,
//                 "firstName": "Shiva",
//                 "lastName": "Thirumazhusai",
//                 "email": "shiva@nasotech.com",
//                 "mobile": " 1 703-200-1755",
//                 "gender": null,
//                 "photo": "4a08fce082fec6eb729a681c86fe8e3eee4029db.jpg",
//                 "location": null,
//                 "linkedin": null,
//                 "education": null,
//                 "profession": null,
//                 "experience": null,
//                 "imageUrl": null,
//                 "recognitions": null,
//                 "approvalDate": null,
//                 "approvalStatus": 0,
//                 "comment": null,
//                 "status": 0,
//                 "archived": 0
//             }
//         ]
//     }
// }


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
  
  export interface PendingRequestItem {
    serialNo: number;
    myMentorRequestID: number;
    mentorID: number;
    userID: number;
    userLoginName: string;
    userType: number;
    requestDate: string; // ISO format date string
    requestDescription: string;
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
    approvalDate?: string | null; // ISO format date string
    approvalStatus: number;
    comment?: string | null;
    status: number;
    archived: number;
    connectedStatus?:number|0; // Optional field to track connection status
  }

  
  /* =========================
     API RESPONSE MODEL
  ========================= */
  
  export interface PendingRequestResponse {
    status: {
      statusCode: number;
      message: string;
    };
    data: {
      info: {
        actionType: string;
      };
      content: PendingRequestItem[];
    };
  }
  