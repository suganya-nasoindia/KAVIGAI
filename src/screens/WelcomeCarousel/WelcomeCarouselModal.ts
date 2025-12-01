export interface CarouselItem {
    id: any;
    title: string;
    description: string;
    image: any; // local image require or remote URL
  }
  export const carouselData: CarouselItem[] = [
    { id: 1, title: 'Realization of Goals', description: 'Set Goals for it determines what you are going to be and take necessary steps to achieve it.', image: require('../../assets/c_realization_goals.png') },
    { id: 2, title: 'Mentorship', description: 'Mentoring by experienced mentors to acquire the necessary knowledge and skills to bring out best in you.', image: require('../../assets/c_mentorship.png') },
    { id: 3, title: 'Mentorings', description: 'Specially Selected and Experienced mentors to provide Guidance and Continuing support.', image: require('../../assets/c_mentoring1.png') },
    { id: 4, title: 'Mentor Guidance', description: 'Builds Mentee a confidence environment for smooth mentorship, Mentor matching mentee  wavelength.', image: require('../../assets/c_mentor_guidance.png') },
    { id: 5, title: 'Succeed', description: 'Explore the possibilities discover yourself succeed!!', image: require('../../assets/c_succeed.png') },
];