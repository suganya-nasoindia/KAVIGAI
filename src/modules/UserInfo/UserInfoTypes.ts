/* ======================================
   USER INFO API – SINGLE TYPE DEFINITION
   ====================================== */

export interface UserInfoApiResponse {
    status: {
      statusCode: number;
      message: string;
    };
  
    data: {
      info: {
        actionType: string;
      };
  
      content: Array<{
        user: {
          userID: number;
          loginName: string;
          firstName: string;
          lastName: string;
          email: string;
          mobile: string;
          gender: string | null;
          photo: string | null;
  
          education?: string;
          academicInstitutions?: string;
          profession?: string;
          experience?: string;
          companyInformation?: string;
          youtube?: string;
          awardsRecognitions?: string;
          nonProfit?: string;
          interests?: string;
          hobbies?: string;
          location?: string;
          languages?: string;
          linkedin?: string;
          twitter?: string;
          facebook?: string;
          instagram?: string;
  
          address: {
            addressID: number;
            street1: string | null;
            street2: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            zipcode: number | null;
          };
  
          mentor?: {
            mentorID: number;
            mentorType: string;
            mentorTitle: string;
            mentorDescription: string;
            mentorTags: string[];
            mentoringField: string;
            price: string;
            amount: number;
            discount: number;
            currencyType: string;
            ratings: number | string;
            availability: string;
            mentorStatus: number;
            firstName: string;
            lastName: string;
            email: string;
            mobile: string;
            gender: string;
            photo: string | null;
            location: string;
            archived: boolean;
          };
  
          pendingMentorRequest: boolean;
          isPaid: boolean;
          userSubscriptionID: number;
          subscriptionInfo: null | {
            userOrderID: number;
            orderID: string;
            orderType: string;
            orderAmount: number;
            currencyType: string;
            duration: string;
            frequency: string;
            orderStatus: boolean;
            userPaymentID: number;
            paymentID: string;
            userContact: string;
            userEmail: string;
            externalWallet: boolean;
            subscriptionPlanID: number;
            paymentStatus: boolean;
          };
  
          confirmed: boolean;
          apiKey: string;
          deviceToken: string | null;
  
          roles: Array<{
            userID: number;
            roleID: number;
            roleStatus: boolean;
          }>;
  
          permissions: Array<{
            roleID: number;
            permissionID: number;
            permissionName: string;
            permissionStatus: boolean;
          }>;
  
          services: Array<{
            serialNo: number;
            serviceID: number;
            serviceName: string;
            serviceType: string;
            description: string;
            menuStatus: boolean;
            userID: number;
            status: boolean;
          }>;
        };
  
        currentGoals: Array<{
          goalID: number;
          goalName: string;
          goalType: string;
          goalBeginDate: string;
          goalEndDate: string;
          goalUrl: string;
          goalImageUrl: string;
          goalDescription: string;
          isPaid: boolean;
          category: number;
          goalStatus: number;
          archived: boolean;
        }>;
  
        myMentors: Array<{
          mentorID: number;
          userID: number;
          mentorType: string;
          mentorTitle: string;
          mentorDescription: string;
          mentorTags: string[];
          mentoringField: string;
          price: string;
          amount: number;
          discount: number;
          currencyType: string;
          ratings: string;
          availability: string;
          mentorStatus: number;
          firstName: string;
          lastName: string;
          email: string;
          mobile: string;
          gender: string;
          photo: string | null;
          location: string;
          archived: number;
        }>;
  
        myMentees: Array<{
          userID: number;
          mentorID: number;
          menteeID: number;
          loginName: string;
          firstName: string;
          lastName: string;
          email: string;
          mobile: string;
          gender: string | null;
          location: string | null;
          linkedin: string | null;
          education: string | null;
          profession: string | null;
          experience: string | null;
          photo: string | null;
  
          address: {
            addressID: number;
            street1: string | null;
            street2: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            zipcode: number | null;
          };
  
          isPaid: boolean;
          confirmed: boolean;
          connectedStatus: number;
          archived: number;
        }>;
      }>;
    };
  }
  