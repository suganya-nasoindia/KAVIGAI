// models/MentorResponseModel.ts

export class MenteeResponseModel {
  status!: {
    statusCode: number;
    message: string;
  };

  data!: {
    info: {
      actionType: string;
    };
    content: MenteeItem[];
  };

  constructor(init?: Partial<MenteeResponseModel>) {
    Object.assign(this, init);
  }

  static fromJson(json: any): MenteeResponseModel {
    return new MenteeResponseModel({
      status: json.status,
      data: {
        info: json.data?.info,
        content: json.data?.content?.map(
          (item: any) => new MenteeItem(item)
        ) || [],
      },
    });
  }
}

export class MenteeItem {
  serialNo!: number;
  userID!: number;
  mentorID!: number;
  menteeID!: number;

  loginName!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  mobile!: string;

  photo!: string;
  gender!: string;
  location!: string;

  linkedin!: string;
  education!: string;
  profession!: string;
  experience!: string;
  academicInstitutions!: string;
  companyInformation!: string;

  youtube!: string;
  awardsRecognitions!: string;
  nonProfit!: string;
  interests!: string;
  hobbies!: string;
  languages!: string;

  twitter!: string;
  facebook!: string;
  instagram!: string;

  address!: Address;

  mentor!: any | null;

  isPaid!: boolean;
  userSubscriptionID!: number;
  subscriptionInfo!: SubscriptionInfo | null;

  confirmed!: boolean;
  apiKey!: string;
  deviceToken!: string;
  connectedStatus!: number;

  constructor(json: any) {
    Object.assign(this, json);

    this.address = json.address
      ? new Address(json.address)
      : new Address({});

    this.subscriptionInfo = json.subscriptionInfo
      ? new SubscriptionInfo(json.subscriptionInfo)
      : null;
  }
}

export class Address {
  addressID!: number;
  street1!: string;
  street2!: string;
  city!: string;
  state!: string;
  country!: string;
  zipcode!: number;

  constructor(json: any) {
    Object.assign(this, json);
  }
}

export class SubscriptionInfo {
  subscriptionID!: number;
  planName!: string;
  startDate!: string;
  endDate!: string;

  constructor(json: any) {
    Object.assign(this, json);
  }
}