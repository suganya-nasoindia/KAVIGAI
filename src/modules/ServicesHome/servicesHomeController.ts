import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reactstore';
import { UserService } from './servicesHomeModel';

export const useServicesController = () => {
  const userServices = useSelector(
    (state: RootState) => state.userProfile.services
  ) as UserService[];
  console.log('All User Services:', userServices);
  const activeServices = useMemo(
    () => userServices.filter(service => service.isActive === true),
    [userServices]
  );
  console.log('Active Services:', activeServices);
  const SERVICE_ICON_MAP: Record<string, any> = {
    EVENT: require('../../assets/events.png'),
    MEETING: require('../../assets/meeting.png'),
    WEBSITE: require('../../assets/website.png'),
    BOOK: require('../../assets/book.png'),
  };

  const getServiceIcon = (serviceType?: string) => {
    console.log('Getting icon for service type:', serviceType);
    return SERVICE_ICON_MAP[serviceType ?? ''] ?? require('../../assets/todo.png');
  };

  return {
    services: activeServices,
    getServiceIcon,
  };
};
