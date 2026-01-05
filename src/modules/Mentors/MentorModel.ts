// src/models/MentorModelTypes.ts
export interface Mentor {
    serialNo?: number;
    userID?: number;
    mentorID?: number;
    name?: string; // full name
    title?: string; // map mentorTitle
    description?: string; // map mentorDescription
    tags?: string[]; // map mentorTags
    field?: string; // mentoringField
    price?: string;
    ratings?: number;
    availability?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    email?: string;
    mobile?: string;
    photo?: string;
    location?: string;
    linkedin?: string;
    education?: string;
    profession?: string;
    experience?: string;
    imageUrl?: string;
    recognitions?: string | null;
    connectedStatus?: string;
  }

  const mapApiMentorToMentorCard = (apiMentor: any): Mentor => ({
    serialNo: apiMentor.serialNo,
    userID: apiMentor.userID,
    mentorID: apiMentor.mentorID,
    title: apiMentor.mentorTitle,
    description: apiMentor.mentorDescription,
    tags: apiMentor.mentorTags?.map((t: string) => t.trim()) ?? [],
    field: apiMentor.mentoringField,
    price: apiMentor.price,
    ratings: apiMentor.ratings ? Math.round(apiMentor.ratings * 5) : 0, // convert 0-1 scale to 0-5
    availability: apiMentor.availability,
    firstName: apiMentor.firstName,
    lastName: apiMentor.lastName,
    gender: apiMentor.gender,
    email: apiMentor.email,
    mobile: apiMentor.mobile,
    photo: apiMentor.photo,
    location: apiMentor.location,
    linkedin: apiMentor.linkedin,
    education: apiMentor.education,
    profession: apiMentor.profession,
    experience: apiMentor.experience,
    imageUrl: apiMentor.imageUrl,
    recognitions: apiMentor.recognitions,
    connectedStatus: apiMentor.connectedStatus,
  });
  
  